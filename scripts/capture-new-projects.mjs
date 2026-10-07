import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log('====================================================');
  console.log('🚀 Starting High-Resolution Puppeteer Capture & Optimization');
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

  // ------------------------------------------------------------------
  // 1. Capture NoviMail
  // ------------------------------------------------------------------
  console.log('📸 1. Capturing NoviMail at Retina Resolution...');
  const noviTemplatePath = path.join(currentDir, 'novimail-template.html');
  const noviUrl = `file:///${noviTemplatePath.replace(/\\/g, '/')}`;

  const noviPage = await browser.newPage();
  // Desktop 1440x900 @ 2x = 2880x1800
  await noviPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await noviPage.goto(noviUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await noviPage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));

  const noviDesktopRaw = await noviPage.screenshot();

  // Mobile 414x896 @ 2x = 828x1792
  const noviMobilePage = await browser.newPage();
  await noviMobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await noviMobilePage.goto(noviUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await noviMobilePage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));

  const noviMobileRaw = await noviMobilePage.screenshot();
  await noviMobilePage.close();

  // Full-page Desktop 1440px @ 1.5x
  await noviPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await new Promise(r => setTimeout(r, 500));
  const noviFullRaw = await noviPage.screenshot({ fullPage: true });
  await noviPage.close();

  // Optimize NoviMail Images with Sharp (Zero Blur)
  console.log('⚡ Optimizing NoviMail images with Sharp...');
  const noviDesktopWebp = await sharp(noviDesktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();
  const noviDesktopPng = await sharp(noviDesktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const noviMobileWebp = await sharp(noviMobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();
  const noviMobilePng = await sharp(noviMobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const noviFullWebp = await sharp(noviFullRaw)
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    .toBuffer();
  const noviFullPng = await sharp(noviFullRaw)
    .png({ quality: 92, compressionLevel: 8 })
    .toBuffer();

  saveToAllDirs('novimail-desktop.webp', noviDesktopWebp);
  saveToAllDirs('novimail-desktop.png', noviDesktopPng);
  saveToAllDirs('novimail-mobile.webp', noviMobileWebp);
  saveToAllDirs('novimail-mobile.png', noviMobilePng);
  saveToAllDirs('novimail-full-desktop.webp', noviFullWebp);
  saveToAllDirs('novimail-full-desktop.png', noviFullPng);

  // ------------------------------------------------------------------
  // 2. Capture Nimus AI
  // ------------------------------------------------------------------
  console.log('\n📸 2. Capturing Nimus AI at Retina Resolution...');
  const nimusTemplatePath = path.join(currentDir, 'nimus-ai-template.html');
  const nimusUrl = `file:///${nimusTemplatePath.replace(/\\/g, '/')}`;

  const nimusPage = await browser.newPage();
  // Desktop 1440x900 @ 2x = 2880x1800
  await nimusPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await nimusPage.goto(nimusUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await nimusPage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));

  const nimusDesktopRaw = await nimusPage.screenshot();

  // Mobile 414x896 @ 2x = 828x1792
  const nimusMobilePage = await browser.newPage();
  await nimusMobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await nimusMobilePage.goto(nimusUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await nimusMobilePage.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));

  const nimusMobileRaw = await nimusMobilePage.screenshot();
  await nimusMobilePage.close();

  // Full-page Desktop 1440px @ 1.5x
  await nimusPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await new Promise(r => setTimeout(r, 500));
  const nimusFullRaw = await nimusPage.screenshot({ fullPage: true });
  await nimusPage.close();

  // Optimize Nimus AI Images with Sharp (Zero Blur)
  console.log('⚡ Optimizing Nimus AI images with Sharp...');
  const nimusDesktopWebp = await sharp(nimusDesktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();
  const nimusDesktopPng = await sharp(nimusDesktopRaw)
    .resize(1920, 1080, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const nimusMobileWebp = await sharp(nimusMobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toBuffer();
  const nimusMobilePng = await sharp(nimusMobileRaw)
    .resize(450, 975, { fit: 'cover', position: 'top' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const nimusFullWebp = await sharp(nimusFullRaw)
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    .toBuffer();
  const nimusFullPng = await sharp(nimusFullRaw)
    .png({ quality: 92, compressionLevel: 8 })
    .toBuffer();

  saveToAllDirs('nimus-ai-desktop.webp', nimusDesktopWebp);
  saveToAllDirs('nimus-ai-desktop.png', nimusDesktopPng);
  saveToAllDirs('nimus-ai-mobile.webp', nimusMobileWebp);
  saveToAllDirs('nimus-ai-mobile.png', nimusMobilePng);
  saveToAllDirs('nimus-ai-full-desktop.webp', nimusFullWebp);
  saveToAllDirs('nimus-ai-full-desktop.png', nimusFullPng);

  await browser.close();

  // ------------------------------------------------------------------
  // 3. Process & Enhance Lighthouse Reports from User Artifacts
  // ------------------------------------------------------------------
  console.log('\n🔍 3. Optimizing Lighthouse Score Reports...');
  const userNoviLhPath = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408164233.png';
  const userNimusLhPath = 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408180142.png';

  if (fs.existsSync(userNoviLhPath)) {
    // NoviMail Lighthouse report: crop cleanly and sharpen with Lanczos3
    const noviLhPng = await sharp(userNoviLhPath)
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .png({ quality: 100, compressionLevel: 8 })
      .toBuffer();
    const noviLhWebp = await sharp(userNoviLhPath)
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .webp({ quality: 95, effort: 6 })
      .toBuffer();
    saveToAllDirs('novimail-lighthouse-report.png', noviLhPng);
    saveToAllDirs('novimail-lighthouse-report.webp', noviLhWebp);
  }

  if (fs.existsSync(userNimusLhPath)) {
    // Nimus AI Lighthouse report: remove top artifact (y > 8) and right scrollbar (x < 1000)
    const nimusLhPng = await sharp(userNimusLhPath)
      .extract({ left: 0, top: 10, width: 1000, height: 350 })
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .png({ quality: 100, compressionLevel: 8 })
      .toBuffer();
    const nimusLhWebp = await sharp(userNimusLhPath)
      .extract({ left: 0, top: 10, width: 1000, height: 350 })
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .webp({ quality: 95, effort: 6 })
      .toBuffer();
    saveToAllDirs('nimus-ai-lighthouse-report.png', nimusLhPng);
    saveToAllDirs('nimus-ai-lighthouse-report.webp', nimusLhWebp);
  }

  // ------------------------------------------------------------------
  // 4. Ensure Forever Films Has WebP Versions
  // ------------------------------------------------------------------
  console.log('\n🎬 4. Ensuring Forever Films WebP companions...');
  const ffDesktopSrc = path.join(rootDir, 'src/public/projects/forever-films-desktop.png');
  const ffMobileSrc = path.join(rootDir, 'src/public/projects/forever-films-mobile.png');
  const ffFullSrc = path.join(rootDir, 'src/public/projects/forever-films-full-desktop.png');

  if (fs.existsSync(ffDesktopSrc)) {
    const ffDesktopWebp = await sharp(ffDesktopSrc)
      .webp({ quality: 92, smartSubsample: true, effort: 6 })
      .toBuffer();
    saveToAllDirs('forever-films-desktop.webp', ffDesktopWebp);
  }
  if (fs.existsSync(ffMobileSrc)) {
    const ffMobileWebp = await sharp(ffMobileSrc)
      .webp({ quality: 92, smartSubsample: true, effort: 6 })
      .toBuffer();
    saveToAllDirs('forever-films-mobile.webp', ffMobileWebp);
  }
  if (fs.existsSync(ffFullSrc)) {
    const ffFullWebp = await sharp(ffFullSrc)
      .webp({ quality: 88, smartSubsample: true, effort: 6 })
      .toBuffer();
    saveToAllDirs('forever-films-full-desktop.webp', ffFullWebp);
  }

  console.log('\n====================================================');
  console.log('✅ ALL SCREENSHOTS & LIGHTHOUSE REPORTS SUCCESSFULLY GENERATED');
  console.log('====================================================');
}

run().catch(err => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
