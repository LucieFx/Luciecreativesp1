import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  '/',
  '/video-editing',
  '/graphic-design',
  '/web-development',
  '/about',
  '/careers',
  '/contact',
  '/testimonials'
];

async function scanAllRoutes() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allIssues = {};

  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    try {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));

      const issues = await page.evaluate(() => {
        const list = [];

        // 1. Buttons without name
        document.querySelectorAll('button, [role="button"]').forEach(btn => {
          const text = btn.innerText?.trim() || '';
          const ariaLabel = btn.getAttribute('aria-label')?.trim();
          const ariaLabelledBy = btn.getAttribute('aria-labelledby')?.trim();
          const title = btn.getAttribute('title')?.trim();
          if (!ariaLabel && !ariaLabelledBy && !text && !title) {
            list.push({ type: 'btn-no-name', snippet: btn.outerHTML.slice(0, 100) });
          }
        });

        // 2. Links without name
        document.querySelectorAll('a').forEach(a => {
          const text = a.innerText?.trim() || '';
          const ariaLabel = a.getAttribute('aria-label')?.trim();
          const ariaLabelledBy = a.getAttribute('aria-labelledby')?.trim();
          const title = a.getAttribute('title')?.trim();
          if (!ariaLabel && !ariaLabelledBy && !text && !title) {
            list.push({ type: 'link-no-name', snippet: a.outerHTML.slice(0, 100) });
          }
        });

        // 3. Inputs without label
        document.querySelectorAll('input, select, textarea').forEach(inp => {
          const type = inp.getAttribute('type');
          if (type === 'hidden' || type === 'submit' || type === 'button') return;
          const id = inp.id;
          const ariaLabel = inp.getAttribute('aria-label');
          const hasLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
          const parentLabel = inp.closest('label');
          if (!ariaLabel && !hasLabel && !parentLabel) {
            list.push({ type: 'input-no-label', snippet: inp.outerHTML.slice(0, 100) });
          }
        });

        // 4. Duplicate IDs
        const ids = {};
        document.querySelectorAll('[id]').forEach(el => {
          const id = el.id.trim();
          if (!id) return;
          ids[id] = (ids[id] || 0) + 1;
        });
        for (const [id, count] of Object.entries(ids)) {
          if (count > 1) {
            list.push({ type: 'duplicate-id', id, count });
          }
        }

        return list;
      });

      if (issues.length > 0) {
        allIssues[route] = issues;
      }
    } catch (e) {
      console.error(`Error scanning ${route}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('SCAN RESULTS ACROSS ALL ROUTES:');
  console.log(JSON.stringify(allIssues, null, 2));
}

scanAllRoutes().catch(console.error);
