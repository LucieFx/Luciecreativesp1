import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else if (fs.existsSync('src/.env.local')) {
  dotenv.config({ path: 'src/.env.local' });
} else {
  dotenv.config();
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'oct7txvw';
const apiKey = process.env.CLOUDINARY_API_KEY || '967596342169591';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '22KeEHdid97HOQru3UtvvxHtvQQ';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
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

async function uploadFile(sitePath, localPath) {
  if (!fs.existsSync(localPath)) {
    console.warn(`File not found: ${localPath}`);
    return null;
  }

  const stat = fs.statSync(localPath);
  console.log(`📤 Uploading ${sitePath} (${(stat.size / 1024).toFixed(1)} KB)...`);

  const filenameWithoutExt = path.basename(sitePath, path.extname(sitePath));
  const result = await cloudinary.uploader.upload(localPath, {
    folder: 'lucie-creatives/projects',
    public_id: filenameWithoutExt,
    overwrite: true,
    resource_type: 'image'
  });

  map[sitePath] = result.secure_url;
  console.log(`  ✅ ${sitePath} -> ${result.secure_url}`);
  return result.secure_url;
}

async function run() {
  console.log('====================================================');
  console.log('🚀 Uploading Web Development Assets to Cloudinary');
  console.log(`Cloud Name: ${cloudName}`);
  console.log('====================================================\n');

  const projectsDir = path.join(rootDir, 'src/public/projects');

  const allProjectFiles = fs.readdirSync(projectsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.webp', '.png', '.jpg', '.jpeg'].includes(ext);
  });

  for (const filename of allProjectFiles) {
    const sitePath = `/projects/${filename}`;
    if (map[sitePath]) {
      console.log(`⏩ Already mapped: ${sitePath}`);
      continue;
    }
    const localPath = path.join(projectsDir, filename);
    await uploadFile(sitePath, localPath);
  }

  // Save map to all map paths
  for (const p of mapPaths) {
    fs.writeFileSync(p, JSON.stringify(map, null, 2));
    console.log(`Saved updated map to: ${p}`);
  }

  console.log('\n====================================================');
  console.log('🎉 All Web Dev project assets successfully uploaded to Cloudinary!');
  console.log('====================================================');
}

run().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
