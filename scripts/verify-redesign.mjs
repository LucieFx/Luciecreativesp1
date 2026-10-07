import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  const breakpoints = [320, 375, 768, 1024, 1440];
  const scrollResults = {};
  const overlapResults = {};

  for (const width of breakpoints) {
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Check horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    scrollResults[width] = { hasHorizontalScroll, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) };

    // Check if chips overlap headline, buttons, or phone showcase
    const overlapData = await page.evaluate(() => {
      const headline = document.querySelector('h1')?.getBoundingClientRect();
      const buttons = document.querySelector('div.flex.flex-col.sm\\:flex-row')?.getBoundingClientRect();
      const showcase = document.querySelector('div.lg\\:col-span-5')?.getBoundingClientRect();
      const stack = document.querySelector('div.group\\/stack, div.relative.flex.flex-col')?.getBoundingClientRect();
      
      const chips = Array.from(document.querySelectorAll('div[class*="rounded-full"][class*="border-[#8B1A1A]/15"]'))
        .filter(el => el.offsetWidth >= 36 && el.offsetWidth <= 56)
        .map(el => el.getBoundingClientRect());

      function overlaps(r1, r2) {
        if (!r1 || !r2) return false;
        return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
      }

      let overlapsCount = 0;
      chips.forEach(chip => {
        if (overlaps(chip, headline)) overlapsCount++;
        if (overlaps(chip, buttons)) overlapsCount++;
        if (overlaps(chip, showcase)) overlapsCount++;
        if (overlaps(chip, stack)) overlapsCount++;
      });

      return { totalChipsFound: chips.length, overlapsCount };
    });

    overlapResults[width] = overlapData;
  }

  // Capture After Screenshots at 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const hero1440 = await page.$('section');
  if (hero1440) {
    await hero1440.screenshot({ path: path.join(__dirname, '../../scratch/hero-after-1440.png') });
  }

  const services1440 = await page.$('#services');
  if (services1440) {
    await services1440.screenshot({ path: path.join(__dirname, '../../scratch/services-after-1440.png') });
  }

  // Capture After Screenshots at 375px
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const hero375 = await page.$('section');
  if (hero375) {
    await hero375.screenshot({ path: path.join(__dirname, '../../scratch/hero-after-375.png') });
  }

  const services375 = await page.$('#services');
  if (services375) {
    await services375.screenshot({ path: path.join(__dirname, '../../scratch/services-after-375.png') });
  }

  console.log('CONSOLE ERRORS:', consoleErrors);
  console.log('SCROLL RESULTS:', JSON.stringify(scrollResults, null, 2));
  console.log('OVERLAP RESULTS:', JSON.stringify(overlapResults, null, 2));

  await browser.close();
}

verify().catch(console.error);
