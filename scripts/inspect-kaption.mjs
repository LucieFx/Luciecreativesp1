import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
  
  const info = await page.evaluate(() => {
    // Check cookie banner element
    const btns = Array.from(document.querySelectorAll('button'));
    const acceptBtn = btns.find(b => b.textContent && b.textContent.includes('Accept'));
    let cookieBannerPath = null;
    if (acceptBtn) {
      let curr = acceptBtn.parentElement;
      while (curr && curr.parentElement && curr.parentElement.tagName !== 'BODY') {
        curr = curr.parentElement;
      }
      cookieBannerPath = {
        tag: curr?.tagName,
        className: curr?.className,
        id: curr?.id,
        htmlSnippet: curr?.outerHTML.slice(0, 300)
      };
    }

    // Check headings
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5')).map(h => ({
      tag: h.tagName,
      text: h.textContent.trim(),
    }));

    // Check stats element
    const stat = Array.from(document.querySelectorAll('*')).find(el => el.textContent === '50+');
    let statBox = null;
    if (stat) {
      statBox = {
        parentTag: stat.parentElement?.tagName,
        parentClass: stat.parentElement?.className,
        grandParentClass: stat.parentElement?.parentElement?.className,
        greatGrandParentClass: stat.parentElement?.parentElement?.parentElement?.className,
      };
    }

    return {
      cookieBannerPath,
      headings,
      statBox
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

inspect().catch(console.error);
