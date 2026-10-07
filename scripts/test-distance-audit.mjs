import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

export async function runAudit() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const breakpoints = [375, 768, 1024, 1440, 1920];
  const results = {};

  for (const w of breakpoints) {
    await page.setViewport({ width: w, height: 950 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      const nav = document.querySelector('header')?.getBoundingClientRect();
      const textElements = [
        document.querySelector('div.lg\\:col-span-7 > div:first-child'), // eyebrow
        document.querySelector('h1'),
        document.querySelector('h1 + p'), // subtext
        document.querySelector('div.flex.flex-col.sm\\:flex-row'), // buttons
        document.querySelector('div.w-full.max-w-md'), // stack
        document.querySelector('div.lg\\:col-span-5') // showcase
      ].filter(Boolean).map(el => el.getBoundingClientRect());

      const chips = Array.from(document.querySelectorAll('div[class*="rounded-full"][class*="border-[#8B1A1A]/15"]'))
        .filter(el => el.offsetWidth >= 34 && el.offsetWidth <= 56)
        .map(el => el.getBoundingClientRect());

      function getDist(r1, r2) {
        const dx = Math.max(0, Math.max(r1.left - r2.right, r2.left - r1.right));
        const dy = Math.max(0, Math.max(r1.top - r2.bottom, r2.top - r1.bottom));
        if (dx === 0 && dy === 0) return 0;
        if (dx === 0) return dy;
        if (dy === 0) return dx;
        return Math.sqrt(dx * dx + dy * dy);
      }

      const chipAudit = chips.map((c, i) => {
        const distFromNav = nav ? (c.top - nav.bottom) : 999;
        let minDist = 999;
        textElements.forEach(t => {
          const d = getDist(c, t);
          if (d < minDist) minDist = d;
        });
        return {
          chipIndex: i,
          top: Math.round(c.top),
          left: Math.round(c.left),
          distFromNav: Math.round(distFromNav),
          minDistToContent: Math.round(minDist),
          clearsNav24px: distFromNav >= 24,
          clearsContent32px: minDist >= 32
        };
      });

      const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

      return {
        width: window.innerWidth,
        hasHorizontalScroll,
        totalChips: chips.length,
        allClearNav: chipAudit.every(c => c.clearsNav24px),
        allClearContent: chipAudit.every(c => c.clearsContent32px),
        chipAudit
      };
    });

    results[w] = data;
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

runAudit().catch(console.error);
