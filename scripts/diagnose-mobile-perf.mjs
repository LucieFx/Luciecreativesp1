import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function diagnose(urlPath) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });

  await page.evaluateOnNewDocument(() => {
    window.__layoutShifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__layoutShifts.push({
            value: entry.value,
            sources: entry.sources?.map((s) => ({
              tag: s.node?.nodeName || '#text',
              className: typeof s.node?.className === 'string' ? s.node.className : '',
              id: s.node?.id || '',
              text: s.node?.textContent?.slice(0, 40) || '',
              currTop: s.currentRect?.top,
              prevTop: s.previousRect?.top,
            })),
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(`http://localhost:3000${urlPath}`, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2500));

  const recordedShifts = await page.evaluate(() => window.__layoutShifts);
  const totalShift = recordedShifts.reduce((acc, s) => acc + s.value, 0);

  console.log(`\n========================================`);
  console.log(`URL: ${urlPath} | Total Shift: ${totalShift.toFixed(4)}`);
  console.log(`========================================`);
  recordedShifts.forEach((s, idx) => {
    console.log(`  Shift #${idx + 1}: ${s.value.toFixed(4)}`);
    s.sources?.forEach((src) => {
      console.log(`    Node: <${src.tag}> class="${src.className.slice(0, 50)}" text="${src.text}" prevTop=${src.prevTop} -> currTop=${src.currTop}`);
    });
  });

  await browser.close();
}

async function run() {
  await diagnose('/video-editing');
  await diagnose('/graphic-design');
  await diagnose('/');
}

run().catch(console.error);
