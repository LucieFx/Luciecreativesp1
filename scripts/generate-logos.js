const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const sourceFile = 'C:/Users/lucie/.gemini/antigravity-ide/brain/f3a37939-8d54-4aca-9a86-d6cfb0e9de10/.user_uploaded/media_1787241664618.png';
const outDir = path.join(__dirname, '../public/logo');

// Helper: PNG CRC table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = chunk.subarray(4, 8 + len);
  const crcVal = crc32(toCrc);
  chunk.writeUInt32BE(crcVal, 8 + len);
  return chunk;
}

function encodePNG(width, height, rgbaBuffer) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk('IHDR', ihdrData);

  const rawData = Buffer.alloc(height * (1 + width * 4));
  let srcPos = 0;
  let dstPos = 0;
  for (let y = 0; y < height; y++) {
    rawData[dstPos++] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      rawData[dstPos++] = rgbaBuffer[srcPos++];
      rawData[dstPos++] = rgbaBuffer[srcPos++];
      rawData[dstPos++] = rgbaBuffer[srcPos++];
      rawData[dstPos++] = rgbaBuffer[srcPos++];
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

function decodePNG(buf) {
  let pos = 8;
  const idat = [];
  let width = 0, height = 0, colorType = 0;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idat.push(buf.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idat));
  const bpp = colorType === 6 ? 4 : 3;
  const stride = width * bpp;
  const prevRow = Buffer.alloc(stride);
  const currRow = Buffer.alloc(stride);
  let srcOffset = 0;
  const rgba = Buffer.alloc(width * height * 4);
  let dstOffset = 0;

  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcOffset++];
    for (let x = 0; x < stride; x++) {
      const rawByte = decompressed[srcOffset++];
      let val = rawByte;
      if (filter === 1) val = (val + (x >= bpp ? currRow[x - bpp] : 0)) & 0xFF;
      else if (filter === 2) val = (val + prevRow[x]) & 0xFF;
      else if (filter === 3) val = (val + Math.floor(((x >= bpp ? currRow[x - bpp] : 0) + prevRow[x]) / 2)) & 0xFF;
      else if (filter === 4) {
        const a = x >= bpp ? currRow[x - bpp] : 0;
        const b = prevRow[x];
        const c = x >= bpp ? prevRow[x - bpp] : 0;
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        val = (val + (pb < pa && pb <= pc ? b : pc < pa && pc <= pb ? c : a)) & 0xFF;
      }
      currRow[x] = val;
    }
    currRow.copy(prevRow);

    for (let x = 0; x < width; x++) {
      rgba[dstOffset++] = currRow[x * bpp];
      rgba[dstOffset++] = currRow[x * bpp + 1];
      rgba[dstOffset++] = currRow[x * bpp + 2];
      rgba[dstOffset++] = bpp === 4 ? currRow[x * bpp + 3] : 255;
    }
  }
  return { width, height, rgba };
}

// Read and decode source
const srcBuf = fs.readFileSync(sourceFile);
const { width, height, rgba } = decodePNG(srcBuf);

// Bounding box of full logo: x: 224..885, y: 414..606
const pad = 12;
const logoMinX = Math.max(0, 224 - pad);
const logoMaxX = Math.min(width - 1, 885 + pad);
const logoMinY = Math.max(0, 414 - pad);
const logoMaxY = Math.min(height - 1, 606 + pad);
const logoW = logoMaxX - logoMinX + 1;
const logoH = logoMaxY - logoMinY + 1;

// Crop full logo and generate transparent & white PNGs
const logoRGBA = Buffer.alloc(logoW * logoH * 4);
const logoWhiteRGBA = Buffer.alloc(logoW * logoH * 4);

let outIdx = 0;
for (let y = logoMinY; y <= logoMaxY; y++) {
  for (let x = logoMinX; x <= logoMaxX; x++) {
    const srcIdx = (y * width + x) * 4;
    const r = rgba[srcIdx];
    const g = rgba[srcIdx + 1];
    const b = rgba[srcIdx + 2];

    // Background brightness metric (white is ~255)
    // The red logo has low green and blue values
    // Alpha is derived from the darkness of green/blue relative to white background
    const bgLuminance = Math.min(g, b) / 255.0;
    let alpha = Math.max(0, Math.min(1, 1 - bgLuminance));

    // Smooth curve threshold to eliminate background noise
    if (alpha < 0.03) alpha = 0;
    else if (alpha > 0.88) alpha = 1;
    else {
      alpha = Math.pow(alpha, 1.15);
    }

    const aByte = Math.round(alpha * 255);

    // Primary Brand Red Logo: #8B1A1A / rgb(139, 26, 26)
    logoRGBA[outIdx] = 139;     // R
    logoRGBA[outIdx + 1] = 26;  // G
    logoRGBA[outIdx + 2] = 26;  // B
    logoRGBA[outIdx + 3] = aByte;

    // White Logo for Dark Backgrounds
    logoWhiteRGBA[outIdx] = 255;
    logoWhiteRGBA[outIdx + 1] = 255;
    logoWhiteRGBA[outIdx + 2] = 255;
    logoWhiteRGBA[outIdx + 3] = aByte;

    outIdx += 4;
  }
}

fs.writeFileSync(path.join(outDir, 'lucie-logo.png'), encodePNG(logoW, logoH, logoRGBA));
fs.writeFileSync(path.join(outDir, 'lucie-logo-white.png'), encodePNG(logoW, logoH, logoWhiteRGBA));
console.log('Generated lucie-logo.png & lucie-logo-white.png:', logoW, 'x', logoH);

// Mark (LC icon only): x: 224..459, y: 414..606
// Make it a clean square with centering: size 256 x 256
const markW_raw = 459 - 224 + 1;
const markH_raw = 606 - 414 + 1;
const markSize = 256;
const markRGBA = Buffer.alloc(markSize * markSize * 4);
const markWhiteRGBA = Buffer.alloc(markSize * markSize * 4);

const offsetX = Math.floor((markSize - markW_raw) / 2);
const offsetY = Math.floor((markSize - markH_raw) / 2);

for (let y = 0; y < markSize; y++) {
  for (let x = 0; x < markSize; x++) {
    const srcX = 224 + (x - offsetX);
    const srcY = 414 + (y - offsetY);
    const outPos = (y * markSize + x) * 4;

    if (srcX >= 224 && srcX <= 459 && srcY >= 414 && srcY <= 606) {
      const srcIdx = (srcY * width + srcX) * 4;
      const g = rgba[srcIdx + 1];
      const b = rgba[srcIdx + 2];
      const bgLum = Math.min(g, b) / 255.0;
      let alpha = Math.max(0, Math.min(1, 1 - bgLum));
      if (alpha < 0.03) alpha = 0;
      else if (alpha > 0.88) alpha = 1;
      else alpha = Math.pow(alpha, 1.15);

      const aByte = Math.round(alpha * 255);

      markRGBA[outPos] = 139;
      markRGBA[outPos + 1] = 26;
      markRGBA[outPos + 2] = 26;
      markRGBA[outPos + 3] = aByte;

      markWhiteRGBA[outPos] = 255;
      markWhiteRGBA[outPos + 1] = 255;
      markWhiteRGBA[outPos + 2] = 255;
      markWhiteRGBA[outPos + 3] = aByte;
    }
  }
}

fs.writeFileSync(path.join(outDir, 'lucie-mark.png'), encodePNG(markSize, markSize, markRGBA));
fs.writeFileSync(path.join(outDir, 'lucie-mark-white.png'), encodePNG(markSize, markSize, markWhiteRGBA));
console.log('Generated lucie-mark.png & lucie-mark-white.png:', markSize, 'x', markSize);
