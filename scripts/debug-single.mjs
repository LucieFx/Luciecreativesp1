import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`[BROWSER ${msg.type()}]:`, msg.text()));
  page.on('pageerror', err => console.log('[PAGE ERROR]:', err));

  console.log('Navigating to http://localhost:3000/?hero=layout:A,motion:1,design:fp-nandanvan-estates-luxury-archi');
  await page.goto('http://localhost:3000/?hero=layout:A,motion:1,design:fp-nandanvan-estates-luxury-archi', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 1000));

  const result = await page.evaluate(() => {
    const card = document.querySelector('.group\\/card');
    const heroShowcase = document.querySelector('.grid.place-items-center');
    return {
      hasCard: Boolean(card),
      cardTag: card ? card.tagName : null,
      cardClasses: card ? card.className : null,
      heroShowcaseHTML: heroShowcase ? heroShowcase.innerHTML.slice(0, 500) : 'NO SHOWCASE FOUND'
    };
  });

  console.log('Result:', result);
  await browser.close();
}

run().catch(console.error);
