import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testPositions() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  for (const w of [375, 768, 1024, 1440, 1920]) {
    await page.setViewport({ width: w, height: 950 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const info = await page.evaluate(() => {
      const nav = document.querySelector('header')?.getBoundingClientRect();
      const hero = document.querySelector('section')?.getBoundingClientRect();
      const textEls = [
        document.querySelector('div.lg\\:col-span-7 > div:first-child'), // eyebrow
        document.querySelector('h1'),
        document.querySelector('h1 + p'), // subtext
        document.querySelector('div.flex.flex-col.sm\\:flex-row'), // buttons
        document.querySelector('div.w-full.max-w-md'), // stack
        document.querySelector('div.lg\\:col-span-5') // showcase
      ].filter(Boolean).map(el => {
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
      });

      return {
        width: window.innerWidth,
        navBottom: nav ? Math.round(nav.bottom) : 0,
        heroTop: hero ? Math.round(hero.top) : 0,
        heroBottom: hero ? Math.round(hero.bottom) : 0,
        heroHeight: hero ? Math.round(hero.height) : 0,
        textEls
      };
    });

    console.log(`\n=== W: ${w} ===`);
    console.log(`Nav bottom: ${info.navBottom}, Hero: top ${info.heroTop}, bottom ${info.heroBottom}, height ${info.heroHeight}`);
    console.log('Obstacles:');
    info.textEls.forEach((t, i) => console.log(`  [${i}]: top=${t.top}, bottom=${t.bottom}, left=${t.left}, right=${t.right}`));
  }

  await browser.close();
}

testPositions().catch(console.error);
