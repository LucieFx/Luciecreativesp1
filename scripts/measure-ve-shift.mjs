import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });

  // Collect layout shifts via PerformanceObserver
  await page.evaluateOnNewDocument(() => {
    window.__clsEntries = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__clsEntries.push({
            value: entry.value,
            sources: entry.sources.map(s => ({
              node: s.node ? s.node.outerHTML?.slice(0, 100) : null,
              curRect: s.currentRect,
              prevRect: s.previousRect
            }))
          });
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto('http://localhost:3000/video-editing', { waitUntil: 'networkidle0' });

  const shifts = await page.evaluate(() => window.__clsEntries);
  console.log('Layout Shifts Detected:', JSON.stringify(shifts, null, 2));

  await browser.close();
}

main().catch(console.error);
