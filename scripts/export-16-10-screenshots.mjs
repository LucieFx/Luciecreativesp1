import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generateScreenshots() {
  console.log('🚀 Generating 16:10 (1600x1000) Project Screenshots...');

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

  const outDir = path.resolve('public/projects');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Media House Agency
  console.log('📸 1. Capturing Media House Agency (1440x900 viewport)...');
  const mhPage = await browser.newPage();
  await mhPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const mhUrl = 'file:///E:/Projects-Coding/mediahouse_site/index.html';
  await mhPage.goto(mhUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await mhPage.evaluate(async () => {
    const style = document.createElement('style');
    style.textContent = '.reveal { opacity: 1 !important; transform: none !important; } .cursor-glow { display: none !important; }';
    document.head.appendChild(style);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    if (document.fonts) await document.fonts.ready;
  });
  await new Promise(r => setTimeout(r, 1000));
  const mhRaw = await mhPage.screenshot();
  await mhPage.close();

  // 2. Forever Films
  console.log('📸 2. Capturing Forever Films (1440x900 viewport)...');
  const ffPage = await browser.newPage();
  await ffPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const ffUrl = `file:///${path.resolve('scripts/forever-films-template.html').replace(/\\/g, '/')}`;
  await ffPage.goto(ffUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await ffPage.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));
  const ffRaw = await ffPage.screenshot();
  await ffPage.close();

  // 3. NoviMail
  console.log('📸 3. Capturing NoviMail (1440x900 viewport)...');
  const noviPage = await browser.newPage();
  await noviPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const noviUrl = `file:///${path.resolve('scripts/novimail-template.html').replace(/\\/g, '/')}`;
  await noviPage.goto(noviUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await noviPage.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));
  const noviRaw = await noviPage.screenshot();
  await noviPage.close();

  // 4. Nimus AI
  console.log('📸 4. Capturing Nimus AI (1440x900 viewport)...');
  const nimusPage = await browser.newPage();
  await nimusPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const nimusUrl = `file:///${path.resolve('scripts/nimus-ai-template.html').replace(/\\/g, '/')}`;
  await nimusPage.goto(nimusUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await nimusPage.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));
  const nimusRaw = await nimusPage.screenshot();
  await nimusPage.close();

  // 5. CopEase
  console.log('📸 5. Capturing CopEase (1440x900 viewport)...');
  const copeasePage = await browser.newPage();
  await copeasePage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const copeaseUrl = `file:///${path.resolve('scripts/copease-template.html').replace(/\\/g, '/')}`;
  await copeasePage.goto(copeaseUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await copeasePage.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 1000));
  const copeaseRaw = await copeasePage.screenshot();
  await copeasePage.close();

  await browser.close();

  // Process and save all 6 as 1600x1000 (16:10) WebP
  async function processAndSave(name, rawBuffer) {
    const webpBuffer = await sharp(rawBuffer)
      .resize(1600, 1000, { fit: 'cover', position: 'top' })
      .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
      .webp({ quality: 92, smartSubsample: true, effort: 6 })
      .toBuffer();

    const dest = path.join(outDir, `${name}.webp`);
    fs.writeFileSync(dest, webpBuffer);
    console.log(`✅ Saved ${name}.webp (${(webpBuffer.length / 1024).toFixed(1)} KB, 1600x1000 16:10)`);
  }

  await processAndSave('mediahouse-desktop', mhRaw);
  await processAndSave('forever-films-desktop', ffRaw);
  await processAndSave('novimail-desktop', noviRaw);
  await processAndSave('nimus-ai-desktop', nimusRaw);
  await processAndSave('copease-desktop', copeaseRaw);

  // 6. Kaption from existing 2880x1800 screenshot
  console.log('📸 6. Processing Kaption from 2880x1800 asset to 1600x1000 WebP...');
  const kaptionSrc = path.resolve('public/projects/kaption-desktop.png');
  if (fs.existsSync(kaptionSrc)) {
    const kaptionRaw = fs.readFileSync(kaptionSrc);
    await processAndSave('kaption-desktop', kaptionRaw);
  } else {
    console.warn('⚠️ kaption-desktop.png not found!');
  }

  console.log('\n🎉 ALL 6 IMAGES EXPORTED AS EXACT 16:10 (1600x1000) WEBP!');
}

generateScreenshots().catch(err => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
