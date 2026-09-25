const fs = require('fs');
const path = require('path');

process.env.npm_package_config_libvips = '8.15.2';
const sharp = require('sharp');

const uploadedPath = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a1030769-f0f2-471f-bd37-1fd58720bd90/.user_uploaded/media_1787225687588.png';
const userUpload1 = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a1030769-f0f2-471f-bd37-1fd58720bd90/.user_uploaded/media_1787218079600.png';
const userUpload2 = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a1030769-f0f2-471f-bd37-1fd58720bd90/.user_uploaded/media_1787218079769.jpg';
const outDir = path.join(__dirname, '../public/logo');

async function run() {
  console.log('Processing uploaded logo...');

  // Inspect uploadedPath
  const rawInfo = await sharp(uploadedPath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawInfo;
  
  // Find precise bounding box of non-transparent pixels
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx + 3] > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Detected full bounding box:', { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY });

  // Separate LC monogram mark bounding box (left side of logo)
  // Find the gap between LC mark and "Lucie" text
  let markMaxX = minX;
  for (let x = minX; x < minX + 300; x++) {
    let colHasPixel = false;
    for (let y = minY; y <= maxY; y++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx + 3] > 20) {
        colHasPixel = true;
        break;
      }
    }
    if (colHasPixel) {
      markMaxX = x;
    }
  }
  // The LC mark usually ends around x ~ 480-500
  console.log('Estimated Mark maxX:', markMaxX);

  // Let's refine markMaxX by checking column density
  let markEnd = minX + 240;
  for (let x = minX + 180; x < minX + 320; x++) {
    let count = 0;
    for (let y = minY; y <= maxY; y++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx + 3] > 20) count++;
    }
    if (count === 0) {
      markEnd = x;
      break;
    }
  }
  console.log('Refined Mark end:', markEnd);

  // 1. Save cropped raw full logo
  const pad = 10;
  const logoW = (maxX - minX) + pad * 2;
  const logoH = (maxY - minY) + pad * 2;
  
  await sharp(uploadedPath)
    .extract({
      left: Math.max(0, minX - pad),
      top: Math.max(0, minY - pad),
      width: Math.min(info.width - (minX - pad), logoW),
      height: Math.min(info.height - (minY - pad), logoH)
    })
    .png()
    .toFile(path.join(outDir, 'lucie-logo-uploaded.png'));

  // 2. Save cropped LC mark
  const markW = (markEnd - minX) + pad * 2;
  await sharp(uploadedPath)
    .extract({
      left: Math.max(0, minX - pad),
      top: Math.max(0, minY - pad),
      width: Math.min(info.width - (minX - pad), markW),
      height: Math.min(info.height - (minY - pad), logoH)
    })
    .png()
    .toFile(path.join(outDir, 'lucie-mark-uploaded.png'));

  console.log('Saved raw cropped uploaded assets.');

  // Let's generate:
  // (A) Solid Crimson LC Mark & Full Logo (#820303)
  // (B) Pure White LC Mark & Full Logo (#FFFFFF)
  // (C) Gradient / Theme LC Mark
  // (D) High-res vectors and cleanly trimmed PNGs

  // Let's create an SVG LC mark and SVG full logo from the exact geometry
  // and convert them to ultra crisp PNGs (512x512, 1024x1024, etc.)
  
  console.log('Done.');
}

run().catch(console.error);
