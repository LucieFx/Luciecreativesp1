import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\lucie\\.gemini\\antigravity-ide\\brain\\431e5ef0-ab6b-4e05-9da6-c61a2a22b6b9';

const viewports = [
  { name: 'hero-360px', width: 360, height: 800 },
  { name: 'hero-390px', width: 390, height: 844 },
  { name: 'hero-768px', width: 768, height: 1024 },
  { name: 'hero-1440px', width: 1440, height: 900 }
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 25000 });
    await new Promise(r => setTimeout(r, 1000));

    // Capture hero section screenshot
    const heroEl = await page.$('section');
    const outPath = path.join(OUT_DIR, `${vp.name}.png`);
    if (heroEl) {
      await heroEl.screenshot({ path: outPath });
    } else {
      await page.screenshot({ path: outPath });
    }
    console.log(`Saved screenshot: ${outPath} (${vp.width}x${vp.height})`);
    await page.close();
  }

  await browser.close();
  console.log('All breakpoint screenshots captured successfully.');
}

capture().catch(console.error);
