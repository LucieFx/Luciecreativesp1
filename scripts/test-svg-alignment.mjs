import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSvg() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(`
    <div style="position:relative; width:1000px; height:800px;">
      <svg style="position:absolute; inset:0; width:100%; height:100%;">
        <circle id="c" cx="50%" cy="46%" r="200" stroke="red" fill="none" />
      </svg>
      <div id="dot" style="position:absolute; left:calc(50% + 200px); top:46%; width:10px; height:10px; background:blue; transform:translate(-50%, -50%);"></div>
    </div>
  `);
  const bounds = await page.evaluate(() => {
    const c = document.getElementById('c').getBoundingClientRect();
    const d = document.getElementById('dot').getBoundingClientRect();
    return {
      circleCenter: { x: c.x + c.width / 2, y: c.y + c.height / 2 },
      circleRadius: c.width / 2,
      dotCenter: { x: d.x + d.width / 2, y: d.y + d.height / 2 }
    };
  });
  console.log('MEASUREMENT:', bounds);
  await browser.close();
}
testSvg().catch(console.error);
