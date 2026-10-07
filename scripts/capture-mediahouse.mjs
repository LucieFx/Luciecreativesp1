import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureMediahouse() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const fileUrl = 'file:///E:/Projects-Coding/mediahouse_site/index.html';

  // 1. Desktop Screenshot (1440x900)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  const desktopPath = path.resolve('public/projects/mediahouse-desktop.png');
  await page.screenshot({ path: desktopPath });
  console.log('Saved Mediahouse desktop to:', desktopPath);

  // 2. Mobile Screenshot (414x896)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  const mobilePath = path.resolve('public/projects/mediahouse-mobile.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('Saved Mediahouse mobile to:', mobilePath);

  // 3. Full Page Screenshot
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; } .cursor-glow { display: none !important; }';
    document.head.appendChild(style);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  });
  await new Promise(r => setTimeout(r, 1000));
  const fullPagePath = path.resolve('public/projects/mediahouse-full-desktop.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('Saved high-res Mediahouse full page to:', fullPagePath);

  await browser.close();
  console.log('Mediahouse capture complete!');
}

captureMediahouse().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
