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
  
  // Find Kaption in WebDevBrowserShowcase
  await page.evaluate(() => {
    const el = document.getElementById('kaption') || Array.from(document.querySelectorAll('article')).find(a => a.textContent && a.textContent.includes('Kaption'));
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/kaption-grid-card.png' });
  console.log('Saved kaption-grid-card.png');

  // Open Preview Modal
  await page.evaluate(() => {
    const el = document.getElementById('kaption') || Array.from(document.querySelectorAll('article')).find(a => a.textContent && a.textContent.includes('Kaption'));
    if (el) {
      // Find the preview button
      const btns = Array.from(el.querySelectorAll('button'));
      const previewBtn = btns.find(b => b.textContent && b.textContent.includes('Preview')) || el.querySelector('img');
      if (previewBtn) previewBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scratch/kaption-modal-preview.png' });
  console.log('Saved kaption-modal-preview.png');

  // Scroll preview modal
  await page.evaluate(() => {
    const scrollables = Array.from(document.querySelectorAll('div')).filter(d => {
      const style = window.getComputedStyle(d);
      return (style.overflowY === 'auto' || style.overflowY === 'scroll') && d.scrollHeight > d.clientHeight;
    });
    for (const sc of scrollables) {
      sc.scrollTop = Math.floor(sc.scrollHeight * 0.4);
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/kaption-modal-scrolled.png' });
  console.log('Saved kaption-modal-scrolled.png');

  await browser.close();
}

test().catch(console.error);
