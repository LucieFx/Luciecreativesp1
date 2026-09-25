const fs = require('fs');
const path = require('path');

process.env.npm_package_config_libvips = '8.15.2';
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/logo');

// High-fidelity SVG with LC monogram symbol and "Lucie Creatives." typography
function getLogoSvg(color = '#8B1A1A', isOutline = false) {
  const strokeAttr = isOutline ? `stroke="${color}" stroke-width="6" fill="none"` : `fill="${color}"`;
  const textFill = isOutline ? `stroke="${color}" stroke-width="2" fill="none"` : `fill="${color}"`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 130" width="520" height="130" fill="none">
    <g transform="translate(10, 10)">
      <!-- LC Monogram Mark -->
      <path d="M 28 8 L 54 8 L 38 102 L 78 102 L 72 108 L 22 108 L 22 18 Z" ${strokeAttr} />
      <path d="M 68 8 L 102 8 L 96 22 L 68 22 L 64 48 L 90 48 L 86 60 L 52 60 L 46 88 L 88 88 L 84 102 L 36 102 Z" ${strokeAttr} />
      <!-- Stylized Monogram geometric path -->
      <g transform="translate(0, 0)">
        <path d="M 12 18 L 42 18 L 36 78 L 84 78 L 80 96 L 2 96 L 2 30 Z" ${strokeAttr} />
        <path d="M 52 18 L 98 18 L 92 34 L 64 34 L 58 54 L 88 54 L 82 70 L 52 70 Z" ${strokeAttr} />
      </g>
    </g>
    <!-- Brand Typography: Lucie Creatives. -->
    <text x="140" y="58" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" letter-spacing="-1.5" ${textFill}>Lucie</text>
    <text x="140" y="102" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" letter-spacing="-1.5" ${textFill}>Creatives<tspan fill="#8B1A1A">.</tspan></text>
  </svg>`;
}

// Dedicated LC Monogram Mark SVG (Square icon / favicon / transition / badge)
function getMarkSvg(color = '#8B1A1A', isOutline = false) {
  const strokeAttr = isOutline ? `stroke="${color}" stroke-width="7" stroke-linejoin="round" fill="none"` : `fill="${color}"`;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
    <g transform="translate(10, 10)">
      <!-- Outer L shape with angled slant -->
      <path d="M 8 6 L 36 6 L 30 76 L 80 76 L 75 96 L 0 96 L 0 18 Z" ${strokeAttr} />
      <!-- Interlocking C shape -->
      <path d="M 44 6 L 94 6 L 88 24 L 62 24 L 56 46 L 88 46 L 82 64 L 50 64 L 46 80 L 32 80 Z" ${strokeAttr} />
    </g>
  </svg>`;
}

// Also process rasterized direct extraction from media_1787225687588.png and media_1787218079600.png
async function generateAllAssets() {
  const uploadedPath = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a1030769-f0f2-471f-bd37-1fd58720bd90/.user_uploaded/media_1787225687588.png';
  const source1 = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a1030769-f0f2-471f-bd37-1fd58720bd90/.user_uploaded/media_1787218079600.png';

  // 1. Direct extract from uploaded outline logo
  // Bounding box: { minX: 223, minY: 413, maxX: 888, maxY: 607, w: 665, h: 194 }
  const outlineFull = await sharp(uploadedPath)
    .extract({ left: 215, top: 405, width: 680, height: 210 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'lucie-logo-outline.png'), outlineFull);

  // Outline LC Mark
  const outlineMark = await sharp(uploadedPath)
    .extract({ left: 215, top: 405, width: 270, height: 210 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'lucie-mark-outline.png'), outlineMark);

  // 2. Extract from solid source1 if exists
  if (fs.existsSync(source1)) {
    const solidMeta = await sharp(source1).metadata();
    console.log('Source 1 meta:', solidMeta);
    // Trim transparent / white borders
    const trimmed = await sharp(source1)
      .trim({ background: '#FFFFFF', threshold: 20 })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'lucie-logo-solid-source.png'), trimmed);
  }

  // 3. Generate color variants from the outline/source using color tinting
  // (A) Solid Crimson (#8B1A1A)
  const crimsonSvg = getLogoSvg('#8B1A1A', false);
  fs.writeFileSync(path.join(outDir, 'lucie-logo.svg'), crimsonSvg);
  await sharp(Buffer.from(crimsonSvg)).png().toFile(path.join(outDir, 'lucie-logo.png'));

  // (B) Pure White (#FFFFFF)
  const whiteSvg = getLogoSvg('#FFFFFF', false);
  fs.writeFileSync(path.join(outDir, 'lucie-logo-white.svg'), whiteSvg);
  await sharp(Buffer.from(whiteSvg)).png().toFile(path.join(outDir, 'lucie-logo-white.png'));

  // (C) Crimson LC Mark
  const crimsonMarkSvg = getMarkSvg('#8B1A1A', false);
  fs.writeFileSync(path.join(outDir, 'lucie-mark.svg'), crimsonMarkSvg);
  await sharp(Buffer.from(crimsonMarkSvg)).resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha:0 } }).png().toFile(path.join(outDir, 'lucie-mark.png'));

  // (D) White LC Mark
  const whiteMarkSvg = getMarkSvg('#FFFFFF', false);
  fs.writeFileSync(path.join(outDir, 'lucie-mark-white.svg'), whiteMarkSvg);
  await sharp(Buffer.from(whiteMarkSvg)).resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha:0 } }).png().toFile(path.join(outDir, 'lucie-mark-white.png'));

  // (E) Outline SVGs
  const outlineLogoSvg = getLogoSvg('#8B1A1A', true);
  fs.writeFileSync(path.join(outDir, 'lucie-logo-outline.svg'), outlineLogoSvg);
  const outlineMarkSvg = getMarkSvg('#8B1A1A', true);
  fs.writeFileSync(path.join(outDir, 'lucie-mark-outline.svg'), outlineMarkSvg);

  console.log('All logo and mark assets successfully generated in public/logo!');
}

generateAllAssets().catch(console.error);
