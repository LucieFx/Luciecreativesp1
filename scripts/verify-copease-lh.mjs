import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/web-development', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Find CopEase card and scroll into view
  await page.evaluate(() => {
    const el = document.getElementById('copease') || Array.from(document.querySelectorAll('article')).find(a => a.textContent && a.textContent.includes('CopEase'));
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/copease-grid-card.png' });
  console.log('Saved copease-grid-card.png');

  // Open Lighthouse Audit modal for CopEase
  await page.evaluate(() => {
    const el = document.getElementById('copease') || Array.from(document.querySelectorAll('article')).find(a => a.textContent && a.textContent.includes('CopEase'));
    if (el) {
      const lhBar = el.querySelector('[title*="Lighthouse"]') || Array.from(el.querySelectorAll('div')).find(d => d.getAttribute('aria-label') && d.getAttribute('aria-label').includes('Lighthouse'));
      if (lhBar) {
        lhBar.click();
      } else {
        const previewBtn = el.querySelector('button');
        if (previewBtn) previewBtn.click();
      }
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  // Switch to Lighthouse Audit tab if modal is open
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && b.textContent.includes('Lighthouse Audit'));
    if (tabs.length > 0) tabs[tabs.length - 1].click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scratch/copease-modal-lh.png' });
  console.log('Saved copease-modal-lh.png');

  await browser.close();
}

test().catch(console.error);
