import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function measure() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  for (const w of [375, 768, 1024, 1440, 1920]) {
    await page.setViewport({ width: w, height: 950 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const bounds = await page.evaluate(() => {
      const nav = document.querySelector('header')?.getBoundingClientRect();
      const eyebrow = document.querySelector('div.lg\\:col-span-7 > div:first-child')?.getBoundingClientRect();
      const h1 = document.querySelector('h1')?.getBoundingClientRect();
      const p = document.querySelector('h1 + p')?.getBoundingClientRect();
      const btns = document.querySelector('div.flex.flex-col.sm\\:flex-row')?.getBoundingClientRect();
      const stack = document.querySelector('div.w-full.max-w-md')?.getBoundingClientRect();
      const showcase = document.querySelector('div.lg\\:col-span-5')?.getBoundingClientRect();

      function fmt(r) {
        if (!r) return null;
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom), right: Math.round(r.right) };
      }

      return {
        width: window.innerWidth,
        nav: fmt(nav),
        eyebrow: fmt(eyebrow),
        h1: fmt(h1),
        p: fmt(p),
        btns: fmt(btns),
        stack: fmt(stack),
        showcase: fmt(showcase)
      };
    });

    console.log(`=== WIDTH ${w} ===`, JSON.stringify(bounds, null, 2));
  }

  await browser.close();
}
measure().catch(console.error);
