const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const inv = JSON.parse(fs.readFileSync('scripts/inventory_data.json', 'utf8'));
const uniqueUrls = Array.from(new Set(inv.map(i => i.src)));

const outDir = path.resolve('scratch/audit_images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function download(url, index) {
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  const filename = `img_${String(index).padStart(3, '0')}_${path.basename(new URL(url).pathname)}`;
  const destPath = path.join(outDir, filename);

  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, index).then(resolve);
      }
      if (res.statusCode !== 200) {
        resolve({ url, success: false, statusCode: res.statusCode });
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(destPath);
        resolve({
          url,
          success: true,
          statusCode: res.statusCode,
          localPath: destPath,
          filename,
          sizeBytes: stats.size,
          contentType: res.headers['content-type'],
        });
      });
    });
    req.on('error', (err) => {
      resolve({ url, success: false, error: err.message });
    });
    req.setTimeout(15000, () => {
      req.abort();
      resolve({ url, success: false, error: 'Timeout' });
    });
  });
}

(async () => {
  console.log(`Starting download of ${uniqueUrls.length} unique images...`);
  const results = [];
  for (let i = 0; i < uniqueUrls.length; i++) {
    const res = await download(uniqueUrls[i], i + 1);
    results.push(res);
    process.stdout.write(`\rDownloaded ${i + 1}/${uniqueUrls.length}: ${res.success ? 'OK' : 'FAIL (' + (res.statusCode || res.error) + ')'}`);
  }
  console.log('\nFinished downloading.');
  fs.writeFileSync('scratch/download_results.json', JSON.stringify(results, null, 2));
})();
