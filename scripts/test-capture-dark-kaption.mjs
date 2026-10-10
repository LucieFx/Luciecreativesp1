import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testCapture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });

  const page = await browser.newPage();
  // 1440 width, deviceScaleFactor 2 -> renders at 2880px width ultra crisp retina
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  // Let's inspect the page theme and structure
  const pageInfo = await page.evaluate(() => {
    // Ensure dark theme
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    
    // Remove any dev overlays
    const nextDevBadge = document.querySelector('nextjs-portal');
    if (nextDevBadge) nextDevBadge.remove();

    return {
      title: document.title,
      htmlClass: document.documentElement.className,
      bodyHeight: document.body.scrollHeight,
      viewportWidth: window.innerWidth,
    };
  });

  console.log('Page info:', pageInfo);

  // Scroll smoothly down the page to trigger any lazy-loaded elements / Framer Motion / IntersectionObservers
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
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

  await new Promise(r => setTimeout(r, 2000));

  // Take full desktop screenshot
  const testFull = path.resolve('scratch/test-kaption-full.png');
  await page.screenshot({ path: testFull, fullPage: true });
  console.log('Saved test full screenshot to:', testFull);

  // Take top viewport (hero) desktop screenshot
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  windowScroll: await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  const testHero = path.resolve('scratch/test-kaption-hero.png');
  await page.screenshot({ path: testHero });
  console.log('Saved test hero screenshot to:', testHero);

  await browser.close();
}

testCapture().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
