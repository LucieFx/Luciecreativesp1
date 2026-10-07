import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop Screenshot
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Hide Next.js dev indicator if present
  await page.evaluate(() => {
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });

  const desktopPath = path.resolve('public/projects/forever-films-desktop.png');
  await page.screenshot({ path: desktopPath });
  console.log('Saved desktop to:', desktopPath);

  // 2. Mobile Screenshot
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await mobilePage.evaluate(() => {
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });

  const mobilePath = path.resolve('public/projects/forever-films-mobile.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('Saved mobile to:', mobilePath);

  // 3. Full Page Scrollable Desktop with triggered animations
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll smoothly down the entire page to trigger in-view animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });

  const fullPagePath = path.resolve('public/projects/forever-films-full-desktop.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('Saved high-res full page to:', fullPagePath);

  await browser.close();
  console.log('Done!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
