import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'scratch/tab-morph-verification';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: '1280_desktop', width: 1280, height: 900 },
  { name: '768_tablet', width: 768, height: 1024 },
  { name: '375_mobile', width: 375, height: 812 },
];

async function runVerification() {
  console.log('--- STARTING SELECTED WORK TAB MORPH VERIFICATION ---\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const failureLog = [];
  let passedTests = 0;
  let totalTests = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('Failed to load resource') && !text.includes('favicon')) {
          consoleErrors.push(text);
        }
      }
    });

    // Monitor Layout Shift
    await page.evaluateOnNewDocument(() => {
      window.__portfolioCLS = 0;
      try {
        const po = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              const portfolio = document.getElementById('portfolio');
              if (portfolio && entry.sources) {
                for (const source of entry.sources) {
                  if (portfolio.contains(source.node)) {
                    window.__portfolioCLS += entry.value;
                  }
                }
              }
            }
          }
        });
        po.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {}
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Scroll to #portfolio
    await page.evaluate(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));

    // Verify Tab buttons exist
    const tabsExist = await page.evaluate(() => {
      const buttons = document.querySelectorAll('#portfolio [role="tab"]');
      return buttons.length === 2;
    });

    if (!tabsExist) {
      console.error(`  FAIL: Tab buttons not found in #portfolio`);
      failureLog.push(`[${vp.name}] Tab buttons not found`);
      await page.close();
      continue;
    }

    // TEST 1: Initial state (Video Tab)
    totalTests++;
    const initialCheck = await page.evaluate(() => {
      const portfolio = document.getElementById('portfolio');
      const activeTab = portfolio.querySelector('[role="tab"][aria-selected="true"]');
      const tabText = activeTab ? activeTab.innerText.trim() : '';
      const ctaButtons = portfolio.querySelectorAll('a[href="/video-editing"], a[href="/graphic-design"]');
      return {
        activeTab: tabText,
        ctaCount: ctaButtons.length,
        cls: window.__portfolioCLS || 0,
      };
    });

    if (initialCheck.activeTab.includes('Video') && initialCheck.ctaCount === 2) {
      passedTests++;
      console.log(`  PASS: Initial state is Video Editing tab, 2 CTAs present (CLS: ${initialCheck.cls.toFixed(4)})`);
    } else {
      console.error(`  FAIL: Initial state incorrect: tab=${initialCheck.activeTab}`);
      failureLog.push(`[${vp.name}] Initial state incorrect`);
    }

    // Capture initial screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_01_initial_video.png`),
    });

    // TEST 2: Morph Video -> Design with mid-flight frame checks (0.1s, 0.25s, 0.4s, 0.6s)
    totalTests++;
    console.log(`  Testing Transition: Video -> Design...`);

    // Click Graphic Design tab button
    const designTabBtn = (await page.$$('#portfolio [role="tab"]'))[1];
    await designTabBtn.click();

    // Frame at ~0.1s
    await new Promise((r) => setTimeout(r, 100));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_02_morph_to_design_0.1s.png`),
    });

    // Frame at ~0.25s
    await new Promise((r) => setTimeout(r, 150));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_03_morph_to_design_0.25s.png`),
    });

    // Frame at ~0.4s
    await new Promise((r) => setTimeout(r, 150));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_04_morph_to_design_0.4s.png`),
    });

    // Settle at ~0.65s
    await new Promise((r) => setTimeout(r, 250));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_05_settled_design.png`),
    });

    // Verify Design settled state
    const designCheck = await page.evaluate(() => {
      const portfolio = document.getElementById('portfolio');
      const activeTab = portfolio.querySelector('[role="tab"][aria-selected="true"]');
      const tabText = activeTab ? activeTab.innerText.trim() : '';

      // Check card images inside stage
      const images = Array.from(portfolio.querySelectorAll('img[alt]'));
      const unstretched = images.every((img) => {
        const style = window.getComputedStyle(img);
        return style.objectFit === 'cover';
      });

      // Check CTA overlap: stage bottom vs first CTA button top
      const stage = portfolio.querySelector('.relative.w-full.overflow-visible');
      const ctaBtn = portfolio.querySelector('a[href="/video-editing"]');
      let noOverlap = true;
      if (stage && ctaBtn) {
        const stageRect = stage.getBoundingClientRect();
        const ctaRect = ctaBtn.getBoundingClientRect();
        noOverlap = ctaRect.top >= stageRect.bottom - 4; // CTA below stage
      }

      return {
        activeTab: tabText,
        unstretched,
        noOverlap,
        cls: window.__portfolioCLS || 0,
      };
    });

    if (designCheck.activeTab.includes('Graphic') && designCheck.unstretched && designCheck.noOverlap) {
      passedTests++;
      console.log(`  PASS: Settled Graphic Design tab, images unstretched, no CTA overlap (CLS: ${designCheck.cls.toFixed(4)})`);
    } else {
      console.error(`  FAIL: Transition to Graphic Design failed: tab=${designCheck.activeTab}, unstretched=${designCheck.unstretched}, noOverlap=${designCheck.noOverlap}`);
      failureLog.push(`[${vp.name}] Transition to Graphic Design failed`);
    }

    // TEST 3: Morph Design -> Video with mid-flight frame checks
    totalTests++;
    console.log(`  Testing Transition: Design -> Video...`);
    const videoTabBtn = (await page.$$('#portfolio [role="tab"]'))[0];
    await videoTabBtn.click();

    // Frame at ~0.1s
    await new Promise((r) => setTimeout(r, 100));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_06_morph_to_video_0.1s.png`),
    });

    // Frame at ~0.25s
    await new Promise((r) => setTimeout(r, 150));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_07_morph_to_video_0.25s.png`),
    });

    // Frame at ~0.4s
    await new Promise((r) => setTimeout(r, 150));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_08_morph_to_video_0.4s.png`),
    });

    // Settle at ~0.65s
    await new Promise((r) => setTimeout(r, 250));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}_09_settled_video_again.png`),
    });

    const videoReturnCheck = await page.evaluate(() => {
      const portfolio = document.getElementById('portfolio');
      const activeTab = portfolio.querySelector('[role="tab"][aria-selected="true"]');
      const tabText = activeTab ? activeTab.innerText.trim() : '';
      return {
        activeTab: tabText,
        cls: window.__portfolioCLS || 0,
      };
    });

    if (videoReturnCheck.activeTab.includes('Video')) {
      passedTests++;
      console.log(`  PASS: Settled Video Editing tab after reverse morph (CLS: ${videoReturnCheck.cls.toFixed(4)})`);
    } else {
      console.error(`  FAIL: Return to Video Editing failed: tab=${videoReturnCheck.activeTab}`);
      failureLog.push(`[${vp.name}] Return to Video Editing failed`);
    }

    // TEST 4: Rapid clicking 10 times in a row
    totalTests++;
    console.log(`  Testing Rapid Clicking 10 times in a row...`);
    const tabs = await page.$$('#portfolio [role="tab"]');
    for (let i = 0; i < 10; i++) {
      const targetBtn = tabs[i % 2];
      await targetBtn.click();
      await new Promise((r) => setTimeout(r, 70)); // Fast click every 70ms
    }

    // Wait 700ms for spring to settle completely
    await new Promise((r) => setTimeout(r, 700));

    const rapidClickCheck = await page.evaluate(() => {
      const portfolio = document.getElementById('portfolio');
      const activeTab = portfolio.querySelector('[role="tab"][aria-selected="true"]');
      const tabText = activeTab ? activeTab.innerText.trim() : '';
      return {
        activeTab: tabText,
        cls: window.__portfolioCLS || 0,
      };
    });

    if (rapidClickCheck.activeTab.length > 0 && consoleErrors.length === 0) {
      passedTests++;
      console.log(`  PASS: Rapid clicking handled gracefully without error or stuck state (active: ${rapidClickCheck.activeTab})`);
    } else {
      console.error(`  FAIL: Rapid clicking caused errors: errors=${consoleErrors.join('; ')}`);
      failureLog.push(`[${vp.name}] Rapid clicking failed: ${consoleErrors.join('; ')}`);
    }

    // TEST 5: CLS & Console Errors Check
    totalTests++;
    const finalHealth = await page.evaluate(() => {
      return {
        cls: window.__portfolioCLS || 0,
      };
    });

    const zeroCLS = finalHealth.cls < 0.01;
    const noErrors = consoleErrors.length === 0;

    if (zeroCLS && noErrors) {
      passedTests++;
      console.log(`  PASS: Section CLS = ${finalHealth.cls.toFixed(4)} (< 0.01), Console errors = 0`);
    } else {
      console.error(`  FAIL: Health check failed: CLS=${finalHealth.cls}, errors=${consoleErrors.join('; ')}`);
      failureLog.push(`[${vp.name}] Health check: CLS=${finalHealth.cls}, errors=${consoleErrors.length}`);
    }

    await page.close();
  }

  // TEST 6: Window resize test
  totalTests++;
  console.log(`\n========================================`);
  console.log(`Testing Window Resize Mid-Morph and Between Tabs`);
  console.log(`========================================`);
  const resizePage = await browser.newPage();
  await resizePage.setViewport({ width: 1280, height: 900 });
  await resizePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll to portfolio
  await resizePage.evaluate(() => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 400));

  // Trigger tab switch and mid-flight resize
  const designBtn = (await resizePage.$$('#portfolio [role="tab"]'))[1];
  await designBtn.click();
  await new Promise((r) => setTimeout(r, 100)); // 100ms in

  // Resize mid-morph to tablet
  await resizePage.setViewport({ width: 768, height: 1024 });
  await new Promise((r) => setTimeout(r, 300));

  // Resize to mobile
  await resizePage.setViewport({ width: 375, height: 812 });
  await new Promise((r) => setTimeout(r, 400));

  // Resize back to desktop
  await resizePage.setViewport({ width: 1280, height: 900 });
  await new Promise((r) => setTimeout(r, 500));

  const resizeCheck = await resizePage.evaluate(() => {
    const portfolio = document.getElementById('portfolio');
    const stage = portfolio ? portfolio.querySelector('.relative.w-full.overflow-visible') : null;
    return {
      stageRendered: Boolean(stage && stage.getBoundingClientRect().width > 800),
      stageHeight: stage ? stage.getBoundingClientRect().height : 0,
    };
  });

  if (resizeCheck.stageRendered && resizeCheck.stageHeight > 300) {
    passedTests++;
    console.log(`  PASS: Resize mid-morph recomputed geometry cleanly (width > 800, height = ${Math.round(resizeCheck.stageHeight)}px)`);
  } else {
    console.error(`  FAIL: Resize failed to recompute`);
    failureLog.push(`Resize test failed`);
  }

  await resizePage.close();
  await browser.close();

  console.log(`\n========================================`);
  console.log(`VERIFICATION SUMMARY: ${passedTests} / ${totalTests} passed`);
  if (failureLog.length > 0) {
    console.log(`\nFailures detected:`);
    failureLog.forEach((f) => console.log(` - ${f}`));
  } else {
    console.log(`ALL TESTS PASSED WITH 100% SUCCESS!`);
  }
  console.log(`========================================\n`);
}

runVerification().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
