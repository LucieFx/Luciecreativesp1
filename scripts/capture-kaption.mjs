import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureKaption() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop Screenshot (1440x900)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    const acceptBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Accept'));
    if (acceptBtn) acceptBtn.click();
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    // If still present, remove container
    document.querySelectorAll('div').forEach(d => {
      if (d.textContent && d.textContent.includes('Your cookie choices') && d.parentElement && d.parentElement.tagName === 'BODY') {
        d.remove();
      }
    });
  });

  const desktopPath = path.resolve('public/projects/kaption-desktop.png');
  await page.screenshot({ path: desktopPath });
  console.log('Saved Kaption desktop to:', desktopPath);

  // 2. Mobile Screenshot (414x896)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await mobilePage.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    const acceptBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Accept'));
    if (acceptBtn) acceptBtn.click();
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  const mobilePath = path.resolve('public/projects/kaption-mobile.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('Saved Kaption mobile to:', mobilePath);

  // 3. Full Page Scrollable Desktop
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    const acceptBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Accept'));
    if (acceptBtn) acceptBtn.click();
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();
  });
  await new Promise(r => setTimeout(r, 600));

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

  const fullPagePath = path.resolve('public/projects/kaption-full-desktop.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('Saved high-res Kaption full page to:', fullPagePath);

  await browser.close();
  console.log('Kaption capture complete!');
}

captureKaption().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
