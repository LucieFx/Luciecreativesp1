import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkDetails() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  for (const w of [375, 768, 1440]) {
    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.getBoundingClientRect();
      const btns = document.querySelector('div.flex.flex-col.sm\\:flex-row')?.getBoundingClientRect();
      const showcase = document.querySelector('div.lg\\:col-span-5')?.getBoundingClientRect();
      const stack = document.querySelector('div.group\\/stack, div.relative.flex.flex-col')?.getBoundingClientRect();

      const chips = Array.from(document.querySelectorAll('div[class*="rounded-full"][class*="border-[#8B1A1A]/15"]'))
        .filter(el => el.offsetWidth >= 36 && el.offsetWidth <= 56)
        .map((el, i) => {
          const r = el.getBoundingClientRect();
          return { i, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
        });

      function check(r1, r2, name) {
        if (!r1 || !r2) return null;
        if (!(r1.x + r1.w < r2.x || r1.x > r2.x + r2.width || r1.y + r1.h < r2.y || r1.y > r2.y + r2.height)) {
          return `${name} (r2: [${Math.round(r2.x)}, ${Math.round(r2.y)}, ${Math.round(r2.width)}, ${Math.round(r2.height)}])`;
        }
        return null;
      }

      return {
        h1: h1 ? [Math.round(h1.x), Math.round(h1.y), Math.round(h1.width), Math.round(h1.height)] : null,
        showcase: showcase ? [Math.round(showcase.x), Math.round(showcase.y), Math.round(showcase.width), Math.round(showcase.height)] : null,
        chips: chips.map(c => ({
          i: c.i,
          bounds: [c.x, c.y, c.w, c.h],
          hitsH1: check(c, h1, 'H1'),
          hitsBtns: check(c, btns, 'Btns'),
          hitsShowcase: check(c, showcase, 'Showcase'),
          hitsStack: check(c, stack, 'Stack'),
        }))
      };
    });

    console.log(`=== WIDTH ${w} ===`);
    console.log(JSON.stringify(data, null, 2));
  }

  await browser.close();
}

checkDetails().catch(console.error);
