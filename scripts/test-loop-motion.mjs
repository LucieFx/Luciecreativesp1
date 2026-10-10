import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/web-development', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Get initial transform of the track
  const getTrackTransform = async () => {
    return page.evaluate(() => {
      const stage = document.querySelector('[role="region"][aria-label*="continuous showcase"]');
      if (!stage) return null;
      const track = stage.querySelector('.will-change-transform');
      return track ? window.getComputedStyle(track).transform : null;
    });
  };

  const t0 = await getTrackTransform();
  console.log('T0 (initial):', t0);

  // Wait 1.5 seconds while not hovering
  await new Promise(r => setTimeout(r, 1500));
  const t1 = await getTrackTransform();
  console.log('T1 (after 1.5s unhovered):', t1);

  await page.screenshot({ path: 'scratch/loop-unhovered.png' });

  // Hover over the stage
  const stageBox = await page.evaluate(() => {
    const stage = document.querySelector('[role="region"][aria-label*="continuous showcase"]');
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (stageBox) {
    await page.mouse.move(stageBox.x, stageBox.y);
  }
  await new Promise(r => setTimeout(r, 500));
  const tHover0 = await getTrackTransform();
  console.log('THover0 (just hovered):', tHover0);

  // Wait 1.5 seconds while hovered
  await new Promise(r => setTimeout(r, 1500));
  const tHover1 = await getTrackTransform();
  console.log('THover1 (after 1.5s hovered):', tHover1);

  await page.screenshot({ path: 'scratch/loop-hovered-paused.png' });

  // Move mouse away
  await page.mouse.move(50, 50);
  await new Promise(r => setTimeout(r, 1500));
  const tResumed = await getTrackTransform();
  console.log('TResumed (after 1.5s unhovered again):', tResumed);

  // Test Mobile view
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/web-development', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scratch/loop-mobile.png' });
  console.log('Saved loop-mobile.png');

  await browser.close();

  const moving = t0 !== t1;
  const paused = tHover0 === tHover1;
  const resumed = tHover1 !== tResumed;
  console.log('\n--- RESULTS ---');
  console.log('Is constantly moving when not hovered:', moving);
  console.log('Is paused when hovered:', paused);
  console.log('Resumes when unhovered:', resumed);
}

test().catch(console.error);
