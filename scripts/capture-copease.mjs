import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureCopEase() {
  console.log('Starting Puppeteer capture for CopEase...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--enable-font-antialiasing',
      '--force-device-scale-factor=2',
    ]
  });

  const templatePath = path.resolve('src/scripts/copease-template.html');
  const fileUrl = `file:///${templatePath.replace(/\\/g, '/')}`;
  console.log('Loading template from:', fileUrl);

  // 1. Desktop Screenshot (1440x900 at 2x = 2880x1800)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await new Promise(r => setTimeout(r, 1200));

  const rawDesktopPng = path.resolve('src/public/projects/copease-desktop-raw.png');
  await page.screenshot({ path: rawDesktopPng });
  console.log('Saved raw desktop screenshot to:', rawDesktopPng);

  // 2. Mobile Screenshot (414x896 at 2x = 828x1792)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await mobilePage.evaluate(async () => {
    await document.fonts.ready;
  });
  await new Promise(r => setTimeout(r, 1200));

  const rawMobilePng = path.resolve('src/public/projects/copease-mobile-raw.png');
  await mobilePage.screenshot({ path: rawMobilePng });
  console.log('Saved raw mobile screenshot to:', rawMobilePng);

  // 3. Full-page Desktop Screenshot (1440px wide at 1.5x)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await new Promise(r => setTimeout(r, 800));

  const rawFullPng = path.resolve('src/public/projects/copease-full-raw.png');
  await page.screenshot({ path: rawFullPng, fullPage: true });
  console.log('Saved raw full-page screenshot to:', rawFullPng);

  await browser.close();

  // Now optimize all with sharp into ultra-sharp WebP & PNGs
  console.log('Optimizing images with sharp...');

  const targets = [
    { dir: 'src/public/projects' },
    { dir: 'Luciecreativesp1/public/projects' }
  ];

  // Optimize Desktop (1440x900 base, crop/resize nicely)
  const desktopWebpBuffer = await sharp(rawDesktopPng)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();

  const desktopPngBuffer = await sharp(rawDesktopPng)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  // Optimize Mobile
  const mobileWebpBuffer = await sharp(rawMobilePng)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();

  const mobilePngBuffer = await sharp(rawMobilePng)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  // Optimize Full Page
  const fullWebpBuffer = await sharp(rawFullPng)
    .webp({ quality: 88, smartSubsample: true, effort: 6 })
    .toBuffer();

  const fullPngBuffer = await sharp(rawFullPng)
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer();

  for (const t of targets) {
    if (!fs.existsSync(t.dir)) continue;

    // CopEase branded assets
    fs.writeFileSync(path.join(t.dir, 'copease-desktop.webp'), desktopWebpBuffer);
    fs.writeFileSync(path.join(t.dir, 'copease-desktop.png'), desktopPngBuffer);
    fs.writeFileSync(path.join(t.dir, 'copease-mobile.webp'), mobileWebpBuffer);
    fs.writeFileSync(path.join(t.dir, 'copease-mobile.png'), mobilePngBuffer);
    fs.writeFileSync(path.join(t.dir, 'copease-full-desktop.webp'), fullWebpBuffer);
    fs.writeFileSync(path.join(t.dir, 'copease-full-desktop.png'), fullPngBuffer);

    // Overwrite doxx legacy assets as well to guarantee zero blurriness anywhere
    fs.writeFileSync(path.join(t.dir, 'doxx.png'), desktopPngBuffer);
    fs.writeFileSync(path.join(t.dir, 'doxx-mobile.png'), mobilePngBuffer);
    fs.writeFileSync(path.join(t.dir, 'doxx-full.png'), fullPngBuffer);

    console.log(`Updated assets in ${t.dir}`);
  }

  // Cleanup temporary raw files
  if (fs.existsSync(rawDesktopPng)) fs.unlinkSync(rawDesktopPng);
  if (fs.existsSync(rawMobilePng)) fs.unlinkSync(rawMobilePng);
  if (fs.existsSync(rawFullPng)) fs.unlinkSync(rawFullPng);

  console.log('CopEase high-quality image generation and optimization complete!');
}

captureCopEase().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
