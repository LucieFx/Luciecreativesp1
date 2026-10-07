import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const res = await page.evaluate(() => {
    const col7 = document.querySelector('div.lg\\:col-span-7');
    const eyebrow = col7.children[0];
    const h1 = col7.children[1];
    const p = col7.children[2];
    const btns = col7.children[3];
    return {
      eyebrow: { height: eyebrow.getBoundingClientRect().height, innerText: eyebrow.innerText },
      h1: { height: h1.getBoundingClientRect().height },
      p: { height: p.getBoundingClientRect().height },
      btns: { height: btns.getBoundingClientRect().height }
    };
  });

  console.log('MEASUREMENTS AT 390px (Loaded):', JSON.stringify(res, null, 2));
  await browser.close();
}

test().catch(console.error);
