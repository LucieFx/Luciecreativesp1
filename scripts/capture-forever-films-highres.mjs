import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log('====================================================');
  console.log('🚀 Forever Films High-Resolution Capture & Optimization');
  console.log('====================================================\n');

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

  const currentDir = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1');
  const rootDir = path.resolve(currentDir, '../..');

  const outputDirs = [
    path.join(rootDir, 'src/public/projects'),
    path.join(rootDir, 'Luciecreativesp1/public/projects')
  ];

  for (const d of outputDirs) {
    if (!fs.existsSync(d)) {
      try { fs.mkdirSync(d, { recursive: true }); } catch (e) {}
    }
  }

  function saveToAllDirs(filename, buffer) {
    for (const d of outputDirs) {
      if (fs.existsSync(d)) {
        fs.writeFileSync(path.join(d, filename), buffer);
      }
    }
    console.log(`  💾 Saved ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  const templatePath = path.join(currentDir, 'forever-films-template.html');
  const fileUrl = `file:///${templatePath.replace(/\\/g, '/')}`;

  console.log(`Loading template: ${fileUrl}`);

  // 1. Desktop Screenshot (1440x900 @ 2x = 2880x1800)
  console.log('\n📸 1. Capturing Desktop Viewport at Retina Resolution...');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await desktopPage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1200));

  const desktopRaw = await desktopPage.screenshot();

  // 2. Mobile Screenshot (414x896 @ 2x = 828x1792)
  console.log('📱 2. Capturing Mobile Viewport at Retina Resolution...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await mobilePage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1200));

  const mobileRaw = await mobilePage.screenshot();
  await mobilePage.close();

  // 3. Full-Page Desktop Screenshot (1440px @ 2x = 2880px wide)
  console.log('📜 3. Capturing Full Page Scrollable at 2x Resolution...');
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 500));
  const fullRaw = await desktopPage.screenshot({ fullPage: true });
  await desktopPage.close();

  await browser.close();

  // 4. Sharp Super-Resolution / Zero-Blur Optimization
  console.log('\n⚡ 4. Processing and Optimizing Images with Sharp (Zero Blur)...');

  // Desktop WebP & PNG (1920x1080)
  const desktopWebp = await sharp(desktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 94, smartSubsample: true, effort: 6 })
    .toBuffer();
  const desktopPng = await sharp(desktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  saveToAllDirs('forever-films-desktop.webp', desktopWebp);
  saveToAllDirs('forever-films-desktop.png', desktopPng);

  // Mobile WebP & PNG (450x975)
  const mobileWebp = await sharp(mobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 94, smartSubsample: true, effort: 6 })
    .toBuffer();
  const mobilePng = await sharp(mobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  saveToAllDirs('forever-films-mobile.webp', mobileWebp);
  saveToAllDirs('forever-films-mobile.png', mobilePng);

  // Full-Desktop WebP & PNG (Full resolution, width 2880 or scaled to 1440 crisp)
  const fullWebp = await sharp(fullRaw)
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();
  const fullPng = await sharp(fullRaw)
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  saveToAllDirs('forever-films-full-desktop.webp', fullWebp);
  saveToAllDirs('forever-films-full-desktop.png', fullPng);
  saveToAllDirs('forever-films-full.png', fullPng);

  console.log('\n✨ Forever Films capture & processing completed successfully!');
}

run().catch(err => {
  console.error('❌ Error during capture:', err);
  process.exit(1);
});
