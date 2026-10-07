import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'oct7txvw',
  api_key: '967596342169591',
  api_secret: '22KeEHdid97HOQru3UtvvxHtvQQ',
  secure: true
});

const currentDir = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1');
const rootDir = path.resolve(currentDir, '../..');

const mapPaths = [
  path.join(rootDir, 'cloudinary-map.json'),
  path.join(rootDir, 'src/cloudinary-map.json'),
  path.join(rootDir, 'Luciecreativesp1/cloudinary-map.json')
];

let map = {};
for (const p of mapPaths) {
  if (fs.existsSync(p)) {
    try {
      map = JSON.parse(fs.readFileSync(p, 'utf8'));
      break;
    } catch (e) {}
  }
}

const filesToUpload = [
  'forever-films-desktop.webp',
  'forever-films-desktop.png',
  'forever-films-mobile.webp',
  'forever-films-mobile.png',
  'forever-films-full-desktop.webp',
  'forever-films-full-desktop.png',
  'forever-films-full.png',
  'forever-films-lighthouse-report.png',
  'forever-films-lighthouse-report.webp',
  'abhi-portrait-highres.jpg'
];

async function run() {
  console.log('====================================================');
  console.log('🚀 Uploading Forever Films Assets to Cloudinary');
  console.log('====================================================\n');

  const baseDir = path.join(rootDir, 'src/public/projects');

  for (const filename of filesToUpload) {
    const localPath = path.join(baseDir, filename);
    if (!fs.existsSync(localPath)) {
      console.warn(`File not found: ${localPath}`);
      continue;
    }

    const sitePath = `/projects/${filename}`;
    const filenameWithoutExt = path.basename(filename, path.extname(filename));
    const stat = fs.statSync(localPath);

    console.log(`📤 Uploading ${sitePath} (${(stat.size / 1024).toFixed(1)} KB)...`);

    const result = await cloudinary.uploader.upload(localPath, {
      folder: 'lucie-creatives/projects',
      public_id: filenameWithoutExt,
      overwrite: true,
      resource_type: 'image'
    });

    map[sitePath] = result.secure_url;
    console.log(`  ✅ ${sitePath} -> ${result.secure_url}`);
  }

  // Save map to all paths
  for (const p of mapPaths) {
    fs.writeFileSync(p, JSON.stringify(map, null, 2));
    console.log(`Saved updated map to: ${p}`);
  }

  console.log('\n🎉 Forever Films assets successfully uploaded and mapped!');
}

run().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
