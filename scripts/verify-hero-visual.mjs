import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'scratch/hero-verification';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// 12 diverse design IDs spanning portrait, square, landscape, and extreme ratios
const TEST_DESIGNS = [
  'fp-nandanvan-estates-luxury-archi', // 1:1 square
  'fp-speczo-eyewear-monolithic-iden', // 1:1 square
  'fp-onirique-parfums-3d-cgi-visual', // 1:1 square
  'rhyme-haute-joaillerie',            // 1:1 square
  'bright-minds-education-campaigns',  // 4:5 portrait (clamped, 0.8)
  'gal-kalpvriksh-multi-cuisine-fine-', // 4:5 portrait (clamped, 0.8)
  'travel-festival-social-campaigns', // extreme portrait (0.707)
  'gal-3-4-reception-sports-club-memb', // extreme portrait (0.75)
  'monolithic-logo-systems',          // 1.218 landscape
  'crancho-fmcg-packaging',           // 1.333 landscape
  'nirva-resort-environmental-branding', // extreme 2:1 landscape
  'gal-grand-inauguration-evening-ban',  // extreme 2:1 landscape
];

const LAYOUTS = ['A', 'B', 'C', 'D', 'E'];
const MOTIONS = [1, 2, 3, 4, 5, 6];
const VIEWPORTS = [
  { width: 375, height: 812, name: '375_mobile' },
  { width: 768, height: 1024, name: '768_tablet' },
  { width: 1280, height: 900, name: '1280_desktop' },
];

async function run() {
  console.log('--- STARTING HERO VISUAL VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  let totalTests = 0;
  let passedTests = 0;
  const failureLog = [];

  // Track console errors & hydration warnings
  const consoleErrors = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' || text.includes('Hydration') || text.includes('Warning:')) {
      consoleErrors.push(text);
    }
  });

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);

    for (let i = 0; i < TEST_DESIGNS.length; i++) {
      const designId = TEST_DESIGNS[i];
      const layout = LAYOUTS[i % LAYOUTS.length];
      const motion = MOTIONS[i % MOTIONS.length];
      const url = `http://localhost:3000/?hero=layout:${layout},motion:${motion},design:${designId}`;

      totalTests++;
      consoleErrors.length = 0;

      // Enable PerformanceObserver for layout-shift CLS
      await page.evaluateOnNewDocument(() => {
        window.__heroCLS = 0;
        try {
          const po = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                window.__heroCLS += entry.value;
              }
            }
          });
          po.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {}
      });

      await page.goto(url, { waitUntil: 'networkidle2' });

      // Wait for card to appear
      try {
        await page.waitForSelector('.group\\/card', { timeout: 4000 });
      } catch (e) {
        failureLog.push(`[${vp.name}][Layout ${layout}][${designId}] Card did not appear within 4s`);
        console.error(`  FAIL: Card selector timed out for ${layout}-${designId}`);
        continue;
      }

      // Small pause after entrance settles
      await new Promise(r => setTimeout(r, 600));

      const measurementSettled = await page.evaluate(() => {
        const card = document.querySelector('.group\\/card');
        const showcase = document.querySelector('.grid.place-items-center');

        if (!card || !showcase) return null;

        const cardRect = card.getBoundingClientRect();
        const showcaseRect = showcase.getBoundingClientRect();

        return {
          card: {
            x: cardRect.x,
            y: cardRect.y,
            width: cardRect.width,
            height: cardRect.height,
            right: cardRect.right,
            bottom: cardRect.bottom
          },
          showcase: {
            x: showcaseRect.x,
            y: showcaseRect.y,
            width: showcaseRect.width,
            height: showcaseRect.height,
            right: showcaseRect.right,
            bottom: showcaseRect.bottom
          },
          cls: window.__heroCLS || 0,
        };
      });

      // Wait 1200ms more to test idle float
      await new Promise(r => setTimeout(r, 1200));

      const measurementFloat = await page.evaluate(() => {
        const card = document.querySelector('.group\\/card');
        const img = card ? card.querySelector('img:last-of-type') : null;
        const bgImg = card ? card.querySelector('img.blur-xl') : null;

        if (!card) return null;
        const cardRect = card.getBoundingClientRect();

        return {
          card: {
            x: cardRect.x,
            y: cardRect.y,
            width: cardRect.width,
            height: cardRect.height,
            right: cardRect.right,
            bottom: cardRect.bottom
          },
          hasBlurredBg: Boolean(bgImg),
          imgContain: img ? window.getComputedStyle(img).objectFit : null,
          naturalWidth: img ? img.naturalWidth : 0,
          naturalHeight: img ? img.naturalHeight : 0,
          cls: window.__heroCLS || 0,
        };
      });

      if (!measurementSettled || !measurementFloat) {
        failureLog.push(`[${vp.name}][${layout}-${designId}] Failed to measure`);
        continue;
      }

      const card = measurementFloat.card;
      const margin = 8;
      const windowWidth = vp.width;

      // 1. Margin & Clipping check: Card must stay on screen with >= 8px margin
      const insideViewport = card.x >= margin && card.right <= (windowWidth - margin);
      if (!insideViewport) {
        failureLog.push(`[${vp.name}][Layout ${layout}][${designId}] Clipped viewport: left=${card.x.toFixed(1)}, right=${card.right.toFixed(1)}, max=${windowWidth}`);
      }

      // 2. Position stability: max movement during idle float <= 16px
      const moveX = Math.abs(measurementFloat.card.x - measurementSettled.card.x);
      const moveY = Math.abs(measurementFloat.card.y - measurementSettled.card.y);
      const stable = moveX <= 16 && moveY <= 16;
      if (!stable) {
        failureLog.push(`[${vp.name}][Layout ${layout}] Position jump: dx=${moveX}, dy=${moveY}`);
      }

      // 3. CLS check: zero layout shift (CLS < 0.01)
      const zeroCLS = measurementFloat.cls < 0.01;
      if (!zeroCLS) {
        failureLog.push(`[${vp.name}][Layout ${layout}] CLS = ${measurementFloat.cls}`);
      }

      // 4. Non-cropping check
      let noCropping = true;
      if (measurementFloat.naturalWidth && measurementFloat.naturalHeight) {
        const rawRatio = measurementFloat.naturalWidth / measurementFloat.naturalHeight;
        if (rawRatio < 0.79 || rawRatio > 1.26) {
          if (!measurementFloat.hasBlurredBg || measurementFloat.imgContain !== 'contain') {
            noCropping = false;
            failureLog.push(`[${vp.name}][${designId}] Ratio ${rawRatio.toFixed(2)} outside clamp but missing contain+blur: bg=${measurementFloat.hasBlurredBg}, fit=${measurementFloat.imgContain}`);
          }
        }
      }

      // 5. Console errors check
      const noErrors = consoleErrors.length === 0;
      if (!noErrors) {
        failureLog.push(`[${vp.name}][Layout ${layout}] Console errors: ${consoleErrors.join('; ')}`);
      }

      const isPass = insideViewport && stable && zeroCLS && noCropping && noErrors;
      if (isPass) {
        passedTests++;
        console.log(`  PASS: [Layout ${layout}][Motion ${motion}] ${designId.slice(0, 25)} (${Math.round(card.width)}x${Math.round(card.height)}, CLS: ${measurementFloat.cls.toFixed(4)})`);
      } else {
        console.error(`  FAIL: [Layout ${layout}] ${designId.slice(0, 25)}`);
      }

      // Capture screenshot for visual inspection on desktop & mobile
      if (vp.width === 1280 || vp.width === 375) {
        const screenshotPath = `${SCREENSHOT_DIR}/${vp.name}_L${layout}_M${motion}_${designId.slice(0, 15)}.png`;
        await page.screenshot({ path: screenshotPath });
      }
    }
  }

  await browser.close();

  console.log('\n========================================');
  console.log(`VERIFICATION SUMMARY: ${passedTests} / ${totalTests} passed`);
  if (failureLog.length > 0) {
    console.log('\nFailures detected:');
    failureLog.forEach(f => console.log(' - ' + f));
  } else {
    console.log('ALL CHECKS PASSED: 0 CLS, no clipping, no cropping, no console errors, stable float.');
  }
  console.log('========================================');
}

run().catch(console.error);
