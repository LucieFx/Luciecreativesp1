const fs = require('fs');
const path = require('path');

// 1. Read graphic-work-data.ts
const graphicWorkContent = fs.readFileSync('lib/graphic-work-data.ts', 'utf8');

// 2. Read shared-work-assets.ts
const sharedAssetsContent = fs.readFileSync('lib/shared-work-assets.ts', 'utf8');

// 3. Read GraphicDesignShowcase.tsx
const showcaseContent = fs.readFileSync('components/work/GraphicDesignShowcase.tsx', 'utf8');

// 4. Read FeaturedPortfolio.tsx
const portfolioContent = fs.readFileSync('components/home/FeaturedPortfolio.tsx', 'utf8');

// 5. Read cloudinary-map.json if exists
let cloudinaryMap = {};
if (fs.existsSync('cloudinary-map.json')) {
  try {
    cloudinaryMap = JSON.parse(fs.readFileSync('cloudinary-map.json', 'utf8'));
  } catch (e) {}
}

let masterMap = {};
if (fs.existsSync('../portfolio-master-map.json')) {
  try {
    masterMap = JSON.parse(fs.readFileSync('../portfolio-master-map.json', 'utf8'));
  } catch (e) {}
}

const graphicAssetsInCloudinary = Object.entries(cloudinaryMap).filter(([k]) => k.includes('/graphic-design/'));
console.log('Total graphic design assets in cloudinary-map:', graphicAssetsInCloudinary.length);

const graphicAssetsInMaster = Object.entries(masterMap).filter(([k]) => k.includes('/graphic-design/'));
console.log('Total graphic design assets in portfolio-master-map:', graphicAssetsInMaster.length);

// Log folders / subdirectories under /graphic-design/
const subfolders = new Set();
graphicAssetsInCloudinary.forEach(([k]) => {
  const parts = k.split('/');
  const gdIdx = parts.indexOf('graphic-design');
  if (gdIdx !== -1 && parts[gdIdx + 1]) {
    subfolders.add(parts[gdIdx + 1]);
  }
});
console.log('Graphic design subfolders in Cloudinary:', Array.from(subfolders));

