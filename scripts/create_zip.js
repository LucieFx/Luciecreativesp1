const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Standard zip file generator in pure Node.js
class SimpleZip {
  constructor(outputPath) {
    this.outputPath = outputPath;
    this.files = [];
    this.offset = 0;
    this.outStream = fs.createWriteStream(outputPath);
  }

  // CRC32 calculation table
  static crcTable = (() => {
    const table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c >>> 0;
    }
    return table;
  })();

  static crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = SimpleZip.crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  addFile(relativePath, buffer, isDir = false) {
    const cleanPath = relativePath.replace(/\\/g, '/').replace(/^\//, '') + (isDir && !relativePath.endsWith('/') ? '/' : '');
    const pathBuf = Buffer.from(cleanPath, 'utf8');
    
    let compressedBuf = Buffer.alloc(0);
    let crc = 0;
    let uncompressedSize = 0;
    let compressedSize = 0;
    let method = 0; // 0 = store, 8 = deflate

    if (!isDir && buffer && buffer.length > 0) {
      crc = SimpleZip.crc32(buffer);
      uncompressedSize = buffer.length;
      const deflated = zlib.deflateRawSync(buffer, { level: 9 });
      if (deflated.length < buffer.length) {
        compressedBuf = deflated;
        compressedSize = deflated.length;
        method = 8;
      } else {
        compressedBuf = buffer;
        compressedSize = buffer.length;
        method = 0;
      }
    }

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4);         // version needed
    localHeader.writeUInt16LE(0x0800, 6);     // flags (UTF-8)
    localHeader.writeUInt16LE(method, 8);     // compression method
    localHeader.writeUInt16LE(0, 10);         // mod time
    localHeader.writeUInt16LE(0, 12);         // mod date
    localHeader.writeUInt32LE(crc, 14);       // crc-32
    localHeader.writeUInt32LE(compressedSize, 18);   // compressed size
    localHeader.writeUInt32LE(uncompressedSize, 22); // uncompressed size
    localHeader.writeUInt16LE(pathBuf.length, 26);   // file name length
    localHeader.writeUInt16LE(0, 28);         // extra field length

    const headerOffset = this.offset;
    this.outStream.write(localHeader);
    this.outStream.write(pathBuf);
    if (compressedSize > 0) {
      this.outStream.write(compressedBuf);
    }
    this.offset += 30 + pathBuf.length + compressedSize;

    this.files.push({
      pathBuf,
      method,
      crc,
      compressedSize,
      uncompressedSize,
      headerOffset,
      isDir,
    });
  }

  finalize() {
    return new Promise((resolve, reject) => {
      const cdStart = this.offset;
      let cdSize = 0;

      for (const f of this.files) {
        const cdRecord = Buffer.alloc(46);
        cdRecord.writeUInt32LE(0x02014b50, 0); // signature
        cdRecord.writeUInt16LE(20, 4);         // version made by
        cdRecord.writeUInt16LE(20, 6);         // version needed
        cdRecord.writeUInt16LE(0x0800, 8);     // flags (UTF-8)
        cdRecord.writeUInt16LE(f.method, 10);   // compression method
        cdRecord.writeUInt16LE(0, 12);         // mod time
        cdRecord.writeUInt16LE(0, 14);         // mod date
        cdRecord.writeUInt32LE(f.crc, 16);     // crc-32
        cdRecord.writeUInt32LE(f.compressedSize, 20);
        cdRecord.writeUInt32LE(f.uncompressedSize, 24);
        cdRecord.writeUInt16LE(f.pathBuf.length, 28);
        cdRecord.writeUInt16LE(0, 30);         // extra len
        cdRecord.writeUInt16LE(0, 32);         // comment len
        cdRecord.writeUInt16LE(0, 34);         // disk start
        cdRecord.writeUInt16LE(0, 36);         // internal attr
        cdRecord.writeUInt32LE(f.isDir ? 0x10 : 0x20, 38); // external attr
        cdRecord.writeUInt32LE(f.headerOffset, 42); // relative offset

        this.outStream.write(cdRecord);
        this.outStream.write(f.pathBuf);
        cdSize += 46 + f.pathBuf.length;
      }

      // End of central directory
      const eocd = Buffer.alloc(22);
      eocd.writeUInt32LE(0x06054b50, 0); // signature
      eocd.writeUInt16LE(0, 4);          // disk number
      eocd.writeUInt16LE(0, 6);          // start disk
      eocd.writeUInt16LE(this.files.length, 8);  // total entries disk
      eocd.writeUInt16LE(this.files.length, 10); // total entries
      eocd.writeUInt32LE(cdSize, 12);            // size of central dir
      eocd.writeUInt32LE(cdStart, 16);           // offset of central dir
      eocd.writeUInt16LE(0, 20);                 // comment length

      this.outStream.write(eocd);
      this.outStream.end(() => resolve());
    });
  }
}

// Traverse and zip directory
async function zipProject(rootDir, outZipPath) {
  const zip = new SimpleZip(outZipPath);
  const ignorePatterns = [
    'node_modules',
    '.next',
    '.git',
    '.agents',
    'LC 1.zip',
    'LC_1.zip',
    '.env.local',
    '.DS_Store',
    'Thumbs.db',
  ];

  let fileCount = 0;

  function walk(currentDir, relDir = '') {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      if (ignorePatterns.includes(item)) continue;
      const fullPath = path.join(currentDir, item);
      const relPath = path.join(relDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        zip.addFile(relPath, null, true);
        walk(fullPath, relPath);
      } else {
        const fileBuf = fs.readFileSync(fullPath);
        zip.addFile(relPath, fileBuf, false);
        fileCount++;
      }
    }
  }

  walk(rootDir);
  await zip.finalize();
  const outStat = fs.statSync(outZipPath);
  console.log(`Successfully created: ${outZipPath}`);
  console.log(`Total files zipped: ${fileCount}`);
  console.log(`Zip size: ${(outStat.size / (1024 * 1024)).toFixed(2)} MB (${outStat.size} bytes)`);
}

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'LC 1.zip');
zipProject(root, outPath).catch(err => {
  console.error('Zip failed:', err);
  process.exit(1);
});
