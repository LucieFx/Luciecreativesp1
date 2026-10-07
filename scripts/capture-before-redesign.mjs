import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot hero
  const heroEl1440 = await page.$('section');
  if (heroEl1440) {
    await heroEl1440.screenshot({ path: path.join(__dirname, '../../scratch/hero-before-1440.png') });
  }

  // Screenshot services
  const servicesEl1440 = await page.$('#services');
  if (servicesEl1440) {
    await servicesEl1440.screenshot({ path: path.join(__dirname, '../../scratch/services-before-1440.png') });
  }

  // 375px
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const heroEl375 = await page.$('section');
  if (heroEl375) {
    await heroEl375.screenshot({ path: path.join(__dirname, '../../scratch/hero-before-375.png') });
  }

  const servicesEl375 = await page.$('#services');
  if (servicesEl375) {
    await servicesEl375.screenshot({ path: path.join(__dirname, '../../scratch/services-before-375.png') });
  }

  console.log('BEFORE screenshots captured successfully.');
  await browser.close();
}

capture().catch(console.error);
