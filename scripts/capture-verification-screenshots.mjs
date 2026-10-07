import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\lucie\\.gemini\\antigravity-ide\\brain\\c943ad8e-cebb-4040-8f86-74ba6d87de94';

async function capture() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const breakpoints = [375, 768, 1024, 1440, 1920];

  for (const w of breakpoints) {
    await page.setViewport({ width: w, height: 950 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Capture hero section
    const heroEl = await page.$('section');
    if (heroEl) {
      const outPath = path.join(ARTIFACT_DIR, `hero-polished-${w}.png`);
      await heroEl.screenshot({ path: outPath });
      console.log(`Saved screenshot for ${w}px to: ${outPath}`);
    }
  }

  await browser.close();
}

capture().catch(console.error);
