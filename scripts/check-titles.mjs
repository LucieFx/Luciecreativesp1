import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1200 });
await page.goto('http://localhost:3000');
await new Promise((r) => setTimeout(r, 600));

await page.evaluate(() => {
  const el = document.getElementById('portfolio');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await new Promise((r) => setTimeout(r, 300));

// Capture initial video tab screenshot
await page.screenshot({ path: 'scratch/tab-morph-verification/centered_video_view.png' });

// Click design tab
const buttons = await page.$$('#portfolio [role="tab"]');
await buttons[1].click();
await new Promise((r) => setTimeout(r, 800));

const info = await page.evaluate(() => {
  const toObj = (r) => (r ? { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) } : null);
  const el = document.getElementById('portfolio');
  const stage = el.querySelector('.relative.w-full.overflow-visible');
  const slot0 = stage.firstElementChild;
  const link = slot0.querySelector('a');
  const imgWrapper = link.firstElementChild;
  const titleBlock = link.lastElementChild;
  const h3s = Array.from(titleBlock.querySelectorAll('h3'));
  return {
    stage: toObj(stage.getBoundingClientRect()),
    slot0: toObj(slot0.getBoundingClientRect()),
    imgWrapper: toObj(imgWrapper.getBoundingClientRect()),
    titleBlock: toObj(titleBlock.getBoundingClientRect()),
    h3s: h3s.map(h => ({
      text: h.innerText,
      rect: toObj(h.getBoundingClientRect()),
      opacity: window.getComputedStyle(h).opacity,
      color: window.getComputedStyle(h).color,
      visibility: window.getComputedStyle(h).visibility,
    })),
    titleComputedStyle: {
      transform: window.getComputedStyle(titleBlock).transform,
      top: window.getComputedStyle(titleBlock).top,
      position: window.getComputedStyle(titleBlock).position,
    }
  };
});

console.log(JSON.stringify(info, null, 2));

await page.screenshot({ path: 'scratch/tab-morph-verification/centered_design_view.png' });

await browser.close();
