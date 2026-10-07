import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function snap() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const sections = await page.$$('section');
  if (sections[1]) {
    const outPath = path.join(__dirname, '../../scratch/client-logos-fixed.png');
    await sections[1].screenshot({ path: outPath });
    console.log('Saved ' + outPath);
  }
  await browser.close();
}
snap().catch(console.error);
