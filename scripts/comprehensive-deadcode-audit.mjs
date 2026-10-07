import fs from 'fs';
import path from 'path';

const SRC = 'src';

// Helper to recursively get files
function getFiles(dir, filter = () => true) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next' || item === '.git') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getFiles(full, filter));
    } else if (filter(full)) {
      res.push(full);
    }
  }
  return res;
}

console.log('--- 1. SCANNING CODE FILES ---');
const codeFiles = getFiles(SRC, (f) => /\.(ts|tsx|js|mjs)$/.test(f) && !f.includes('src\\scripts') && !f.includes('src/scripts'));
console.log(`Total code files in src (excluding scripts): ${codeFiles.length}`);

// Read all code file contents into memory
const fileContents = new Map();
for (const f of codeFiles) {
  fileContents.set(f, fs.readFileSync(f, 'utf8'));
}

// 1. UNUSED CODE FILES
console.log('\n--- CHECKING UNUSED COMPONENTS / LIB / UTILS ---');
const specialNextFiles = [
  'page.tsx', 'layout.tsx', 'loading.tsx', 'error.tsx', 'global-error.tsx',
  'not-found.tsx', 'template.tsx', 'route.ts', 'sitemap.ts', 'robots.ts',
  'opengraph-image.tsx', 'manifest.ts', 'default.tsx'
];

const unusedFiles = [];
for (const f of codeFiles) {
  const base = path.basename(f);
  if (specialNextFiles.includes(base)) continue;
  if (base.endsWith('.config.ts') || base.endsWith('.config.js') || base.endsWith('.config.mjs')) continue;

  const relFromSrc = path.relative(SRC, f).replace(/\\/g, '/');
  const importNameNoExt = relFromSrc.replace(/\.(tsx|ts|js|mjs)$/, '');
  const baseNoExt = path.basename(f, path.extname(f));

  // Check if imported anywhere
  let referenced = false;
  for (const [otherFile, content] of fileContents.entries()) {
    if (otherFile === f) continue;
    // Check various import styles
    if (
      content.includes(`@/${importNameNoExt}`) ||
      content.includes(`@/${relFromSrc}`) ||
      content.includes(`/${baseNoExt}`) ||
      content.includes(`"${baseNoExt}"`) ||
      content.includes(`'${baseNoExt}'`) ||
      content.includes(base)
    ) {
      referenced = true;
      break;
    }
  }

  // Also check next.config.ts
  const nextConfig = fileContents.get(path.join(SRC, 'next.config.ts')) || '';
  if (nextConfig.includes(baseNoExt) || nextConfig.includes(relFromSrc)) {
    referenced = true;
  }

  if (!referenced) {
    unusedFiles.push(f);
  }
}

console.log(`Potential unused files found: ${unusedFiles.length}`);
for (const u of unusedFiles) {
  console.log(` - ${u}`);
}

// 2. UNUSED ASSETS IN PUBLIC
console.log('\n--- CHECKING ASSETS IN PUBLIC ---');
const publicFiles = getFiles(path.join(SRC, 'public'));
const unusedAssets = [];
const allTextContent = [...fileContents.values()].join('\n');
const nextConfigText = fs.readFileSync(path.join(SRC, 'next.config.ts'), 'utf8');
const cloudinaryMapText = fs.existsSync(path.join(SRC, 'cloudinary-map.json'))
  ? fs.readFileSync(path.join(SRC, 'cloudinary-map.json'), 'utf8')
  : '';

for (const asset of publicFiles) {
  const rel = path.relative(path.join(SRC, 'public'), asset).replace(/\\/g, '/');
  const name = path.basename(asset);
  const size = fs.statSync(asset).size;

  const isReferenced =
    allTextContent.includes(name) ||
    allTextContent.includes(`/${rel}`) ||
    allTextContent.includes(rel) ||
    nextConfigText.includes(name) ||
    cloudinaryMapText.includes(rel) ||
    cloudinaryMapText.includes(name);

  if (!isReferenced) {
    unusedAssets.push({ file: asset, rel, name, size });
  }
}

console.log(`Unused assets in public: ${unusedAssets.length}`);
for (const a of unusedAssets) {
  console.log(` - ${a.rel} (${(a.size / 1024).toFixed(1)} KB)`);
}

// 3. CHECK PACKAGE.JSON DEPENDENCIES
console.log('\n--- CHECKING DEPENDENCIES IN PACKAGE.JSON ---');
const pkg = JSON.parse(fs.readFileSync(path.join(SRC, 'package.json'), 'utf8'));
const allDeps = Object.keys(pkg.dependencies || {});
const unusedDeps = [];

for (const dep of allDeps) {
  let used = false;
  for (const [, content] of fileContents.entries()) {
    if (content.includes(`from "${dep}"`) || content.includes(`from '${dep}'`) || content.includes(`require("${dep}")`) || content.includes(`require('${dep}')`) || content.includes(`import("${dep}")`) || content.includes(`import('${dep}')`)) {
      used = true;
      break;
    }
  }
  if (dep === 'next' || dep === 'react' || dep === 'react-dom') used = true;
  if (!used) {
    unusedDeps.push(dep);
  }
}
console.log('Unused dependencies:', unusedDeps);

fs.writeFileSync('src/scripts/deadcode-scan-raw.json', JSON.stringify({
  unusedFiles,
  unusedAssets,
  unusedDeps
}, null, 2));
console.log('Raw scan saved to src/scripts/deadcode-scan-raw.json');
