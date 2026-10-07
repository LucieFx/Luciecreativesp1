import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent('<div id="t1" style="font-family: var(--non-existent), sans-serif;">Test 1</div><div id="t2" style="font-family: var(--non-existent, sans-serif);">Test 2</div>');
  const res = await page.evaluate(() => ({
    t1: window.getComputedStyle(document.getElementById('t1')).fontFamily,
    t2: window.getComputedStyle(document.getElementById('t2')).fontFamily,
  }));
  console.log('RESULT:', res);
  await browser.close();
}
test().catch(console.error);
