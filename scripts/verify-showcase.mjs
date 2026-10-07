import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Home page with Web card active
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page1.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Find and click the Web tab
  const tabs = await page1.$$('button[role="tab"]');
  for (const tab of tabs) {
    const text = await page1.evaluate(el => el.textContent, tab);
    if (text && text.trim() === 'Web') {
      await tab.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  const heroScreenshot = await page1.screenshot();
  await sharp(heroScreenshot).toFile('../scratch/verify-home-hero-web.png');
  console.log('Saved verify-home-hero-web.png');

  // 2. Web Development page
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await page2.goto('http://localhost:3000/web-development', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const devHeroScreenshot = await page2.screenshot();
  await sharp(devHeroScreenshot).toFile('../scratch/verify-webdev-hero.png');
  console.log('Saved verify-webdev-hero.png');

  // 3. Open Preview Modal on Media House Agency in Web Development page
  const previewCard = await page2.$('article div[role="button"]');
  if (previewCard) {
    await previewCard.click();
    await new Promise(r => setTimeout(r, 1500));
    const modalScreenshot = await page2.screenshot();
    await sharp(modalScreenshot).toFile('../scratch/verify-webdev-modal.png');
    console.log('Saved verify-webdev-modal.png');
  }

  await browser.close();
  console.log('All verification captures saved successfully!');
}

main().catch(console.error);
