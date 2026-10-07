import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  const getChildrenRects = (col7) => {
    if (!col7) return [];
    return Array.from(col7.children).map((c, i) => {
      const r = c.getBoundingClientRect();
      return { idx: i, tag: c.tagName, text: c.innerText.slice(0, 30), height: r.height, top: r.top };
    });
  };

  const before = await page.evaluate(() => {
    const col7 = document.querySelector('div.lg\\:col-span-7');
    if (!col7) return [];
    return Array.from(col7.children).map((c, i) => {
      const r = c.getBoundingClientRect();
      return { idx: i, tag: c.tagName, text: c.innerText.slice(0, 30), height: r.height, top: r.top };
    });
  });

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));

  const after = await page.evaluate(() => {
    const col7 = document.querySelector('div.lg\\:col-span-7');
    if (!col7) return [];
    return Array.from(col7.children).map((c, i) => {
      const r = c.getBoundingClientRect();
      return { idx: i, tag: c.tagName, text: c.innerText.slice(0, 30), height: r.height, top: r.top };
    });
  });

  console.log('COL7 CHILDREN BEFORE:', before);
  console.log('COL7 CHILDREN AFTER:', after);
  before.forEach((b, i) => {
    const a = after[i];
    console.log(`Child [${i}] (${b.tag}): before height=${b.height}, after height=${a.height}, diff=${a.height - b.height}`);
  });

  console.log('BEFORE:', JSON.stringify(rectBefore, null, 2));
  console.log('AFTER:', JSON.stringify(rectAfter, null, 2));
  if (rectBefore.col5 && rectAfter.col5) {
    console.log('DIFF col5.top:', rectAfter.col5.top - rectBefore.col5.top);
    console.log('DIFF col7.height:', rectAfter.col7.height - rectBefore.col7.height);
    console.log('DIFF h1.height:', rectAfter.h1.height - rectBefore.h1.height);
  }
  await browser.close();
}

main().catch(console.error);
