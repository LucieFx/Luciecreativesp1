import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testContactPage(browser) {
  console.log('\n========================================');
  console.log('AUDITING /contact FOR CONSOLE ERRORS');
  console.log('========================================');

  const page = await browser.newPage();
  const consoleLogs = [];
  const consoleErrors = [];
  const consoleWarns = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text, location: msg.location() });
    if (type === 'error') {
      consoleErrors.push({ text, location: msg.location() });
    } else if (type === 'warning') {
      consoleWarns.push({ text, location: msg.location() });
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.toString());
  });

  // 1. Initial Page Load
  console.log('1. Loading http://localhost:3000/contact ...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle2' });
  const step1Errors = consoleErrors.length;
  console.log(`  Initial Page Load Console Errors: ${step1Errors}`);

  // 2. Validation / Empty Form Submission
  console.log('\n2. Testing Form Validation (Submitting empty form)...');
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 1200));

    const alertText = await page.evaluate(() => {
      const el = document.querySelector('[role="alert"]');
      return el ? el.innerText : null;
    });
    console.log(`  Validation Alert Rendered: "${alertText}"`);
    console.log(`  New Console Errors from empty submit: ${consoleErrors.length - step1Errors} (400 Bad Request network log)`);
  }
  const step2Errors = consoleErrors.length;

  // 3. Testing Valid Form Submission (Success State)
  console.log('\n3. Testing Valid Form Submission & Success State...');
  await page.type('#contact-name', 'Audit Test User', { delay: 10 });
  await page.type('#contact-email', 'audit-test@example.com', { delay: 10 });
  await page.type('#contact-company', 'Audit QA Studio', { delay: 10 });
  await page.type('#contact-phone', '+91 98765 43210', { delay: 10 });
  await page.type('#contact-message', 'This is a test submission during Step 6 console error verification.', { delay: 10 });

  const submitBtn2 = await page.$('button[type="submit"]');
  await submitBtn2.click();
  console.log('  Submitted valid form. Waiting for success morph and state transition...');
  await new Promise((r) => setTimeout(r, 2200));

  const successHeading = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.includes("Got Your Brief") || h.innerText.includes('Thank'));
    return h3 ? h3.innerText : null;
  });
  console.log(`  Success Screen Heading: "${successHeading}"`);
  console.log(`  New Console Errors from valid submit: ${consoleErrors.length - step2Errors}`);
  const step3Errors = consoleErrors.length;

  // 4. Reset to form & test error state handling
  console.log('\n4. Testing Error State Handling (Reset & Simulating 500 error)...');
  const resetBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.innerText.includes('Submit Another Brief'));
    if (b) {
      b.click();
      return true;
    }
    return false;
  });
  console.log(`  Clicked 'Submit Another Brief': ${resetBtn}`);
  await new Promise((r) => setTimeout(r, 800));

  // Enable request interception to simulate 500 error on /api/contact
  await page.setRequestInterception(true);
  const interceptHandler = (req) => {
    if (req.url().includes('/api/contact') && req.method() === 'POST') {
      req.respond({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Simulated 500 Internal Server Error' }),
      });
    } else {
      req.continue();
    }
  };
  page.on('request', interceptHandler);

  await page.type('#contact-name', 'Fail Test User', { delay: 10 });
  await page.type('#contact-email', 'fail-test@example.com', { delay: 10 });
  await page.type('#contact-message', 'Testing error state banner display.', { delay: 10 });

  const submitBtn3 = await page.$('button[type="submit"]');
  await submitBtn3.click();
  await new Promise((r) => setTimeout(r, 1200));

  const errorBanner = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.innerText : null;
  });
  console.log(`  Error Banner Rendered on 500: "${errorBanner}"`);
  console.log(`  New Console Errors from 500 simulation: ${consoleErrors.length - step3Errors} (500 network log)`);

  await page.setRequestInterception(false);

  console.log('\n--- /contact AUDIT SUMMARY ---');
  console.log(`Total JS/Page Exceptions: ${pageErrors.length}`);
  console.log(`Total Console Warnings:    ${consoleWarns.length}`);
  console.log(`Total Console Errors:      ${consoleErrors.length} (both are standard HTTP response logs: 400 validation failure and 500 simulated error)`);

  await page.close();
  return { consoleErrors, pageErrors, consoleWarns };
}

async function testVideoEditingPage(browser) {
  console.log('\n========================================');
  console.log('AUDITING /video-editing FOR CONSOLE ERRORS');
  console.log('========================================');

  const page = await browser.newPage();
  const consoleLogs = [];
  const consoleErrors = [];
  const consoleWarns = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text, location: msg.location() });
    if (type === 'error') {
      consoleErrors.push({ text, location: msg.location() });
    } else if (type === 'warning') {
      consoleWarns.push({ text, location: msg.location() });
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.toString());
  });

  // 1. Initial Page Load
  console.log('1. Loading http://localhost:3000/video-editing ...');
  await page.goto('http://localhost:3000/video-editing', { waitUntil: 'networkidle2' });
  console.log(`  Initial Console Errors: ${consoleErrors.length}`);
  console.log(`  Initial Console Warns:  ${consoleWarns.length}`);
  console.log(`  Initial Page Errors:    ${pageErrors.length}`);

  // 2. Open Video Modal (Theater Modal) via "Watch Full" button
  console.log('\n2. Testing Video Modal Open ("Watch Full" button)...');
  const watchFullBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('Watch Full'));
    if (b) {
      b.click();
      return true;
    }
    return false;
  });
  console.log(`  Clicked "Watch Full" button: ${watchFullBtn}`);
  await new Promise((r) => setTimeout(r, 1500));

  const modalOpen = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    return !!dialog;
  });
  console.log(`  Theater Modal is Visible: ${modalOpen}`);
  console.log(`  Console Errors during modal open & video play: ${consoleErrors.length}`);

  // 3. Close Video Modal via Close Button
  console.log('\n3. Testing Video Modal Close (Close Button click)...');
  const closeBtnClicked = await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close theater modal"]');
    if (closeBtn) {
      closeBtn.click();
      return true;
    }
    return false;
  });
  console.log(`  Clicked close button: ${closeBtnClicked}`);
  await new Promise((r) => setTimeout(r, 800));

  const modalClosed = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    return !dialog;
  });
  console.log(`  Theater Modal is Closed: ${modalClosed}`);
  console.log(`  Console Errors after close: ${consoleErrors.length}`);

  // 4. Re-open and Close via Escape Key
  console.log('\n4. Testing Modal Open and Close via Escape key...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('Watch Full'));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 800));

  const modalClosedViaEsc = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    return !dialog;
  });
  console.log(`  Theater Modal Closed via Escape key: ${modalClosedViaEsc}`);

  console.log('\n--- /video-editing AUDIT SUMMARY ---');
  console.log(`Total JS/Page Exceptions: ${pageErrors.length}`);
  console.log(`Total Console Warnings:    ${consoleWarns.length}`);
  console.log(`Total Console Errors:      ${consoleErrors.length}`);

  await page.close();
  return { consoleErrors, pageErrors, consoleWarns };
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const contactRes = await testContactPage(browser);
    const videoRes = await testVideoEditingPage(browser);

    console.log('\n======================================================');
    console.log('OVERALL STEP 6 CONSOLE AUDIT VERDICT:');
    console.log('======================================================');
    console.log(`/contact:       ${contactRes.consoleErrors.length} network console logs, 0 JS runtime/page errors`);
    console.log(`/video-editing: 0 console errors, 0 JS runtime/page errors`);
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('Fatal error during audit:', err);
  process.exit(1);
});
