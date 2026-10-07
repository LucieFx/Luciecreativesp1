import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function scanA11y() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const results = await page.evaluate(() => {
    const issues = {
      buttonsWithoutName: [],
      linksWithoutName: [],
      inputsWithoutLabel: [],
      duplicateIds: [],
      invalidAria: [],
      landmarks: {},
      headingOrder: [],
      labelMismatch: []
    };

    // 1. Duplicate IDs
    const idMap = {};
    document.querySelectorAll('[id]').forEach(el => {
      const id = el.id.trim();
      if (!id) return;
      if (!idMap[id]) idMap[id] = [];
      idMap[id].push({
        tag: el.tagName.toLowerCase(),
        classes: el.className,
        snippet: el.outerHTML.slice(0, 100)
      });
    });
    for (const [id, list] of Object.entries(idMap)) {
      if (list.length > 1) {
        issues.duplicateIds.push({ id, count: list.length, elements: list });
      }
    }

    // 2. Buttons without accessible name
    document.querySelectorAll('button, [role="button"]').forEach(btn => {
      const text = btn.innerText?.trim() || '';
      const ariaLabel = btn.getAttribute('aria-label')?.trim();
      const ariaLabelledBy = btn.getAttribute('aria-labelledby')?.trim();
      const title = btn.getAttribute('title')?.trim();
      const accName = ariaLabel || ariaLabelledBy || text || title;

      if (!accName) {
        issues.buttonsWithoutName.push({
          tag: btn.tagName.toLowerCase(),
          role: btn.getAttribute('role'),
          classes: btn.className,
          snippet: btn.outerHTML.slice(0, 150)
        });
      }

      // Check WCAG 2.5.3 label in name
      if (ariaLabel && text) {
        // If visible text is not included in aria-label
        const cleanAria = ariaLabel.toLowerCase().replace(/\s+/g, ' ');
        const cleanText = text.toLowerCase().replace(/\s+/g, ' ');
        // If text is short, e.g. < 40 chars, it should be in ariaLabel
        if (cleanText.length > 0 && cleanText.length < 50 && !cleanAria.includes(cleanText)) {
          issues.labelMismatch.push({
            tag: btn.tagName.toLowerCase(),
            ariaLabel,
            visibleText: text,
            snippet: btn.outerHTML.slice(0, 150)
          });
        }
      }
    });

    // 3. Links without accessible name
    document.querySelectorAll('a').forEach(a => {
      const text = a.innerText?.trim() || '';
      const ariaLabel = a.getAttribute('aria-label')?.trim();
      const ariaLabelledBy = a.getAttribute('aria-labelledby')?.trim();
      const title = a.getAttribute('title')?.trim();
      const accName = ariaLabel || ariaLabelledBy || text || title;

      if (!accName) {
        issues.linksWithoutName.push({
          href: a.getAttribute('href'),
          classes: a.className,
          snippet: a.outerHTML.slice(0, 150)
        });
      }

      // Check WCAG 2.5.3 label in name
      if (ariaLabel && text) {
        const cleanAria = ariaLabel.toLowerCase().replace(/\s+/g, ' ');
        const cleanText = text.toLowerCase().replace(/\s+/g, ' ');
        if (cleanText.length > 0 && cleanText.length < 50 && !cleanAria.includes(cleanText)) {
          issues.labelMismatch.push({
            tag: 'a',
            ariaLabel,
            visibleText: text,
            snippet: a.outerHTML.slice(0, 150)
          });
        }
      }
    });

    // 4. Form inputs without labels
    document.querySelectorAll('input, select, textarea').forEach(input => {
      const type = input.getAttribute('type');
      if (type === 'hidden' || type === 'submit' || type === 'button') return;
      const id = input.id;
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const hasLabelFor = id ? document.querySelector(`label[for="${id}"]`) : null;
      const parentLabel = input.closest('label');

      if (!ariaLabel && !ariaLabelledBy && !hasLabelFor && !parentLabel) {
        issues.inputsWithoutLabel.push({
          type: type || 'text',
          id: id || null,
          placeholder: input.getAttribute('placeholder'),
          snippet: input.outerHTML.slice(0, 150)
        });
      }
    });

    // 5. Landmarks
    issues.landmarks.header = document.querySelectorAll('header, [role="banner"]').length;
    issues.landmarks.nav = document.querySelectorAll('nav, [role="navigation"]').length;
    issues.landmarks.main = document.querySelectorAll('main, [role="main"]').length;
    issues.landmarks.footer = document.querySelectorAll('footer, [role="contentinfo"]').length;

    // 6. Heading Order
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]').forEach(h => {
      let level = parseInt(h.tagName.replace('H', ''), 10);
      if (isNaN(level) && h.getAttribute('aria-level')) {
        level = parseInt(h.getAttribute('aria-level'), 10);
      }
      headings.push({
        tag: h.tagName.toLowerCase(),
        level,
        text: h.innerText?.trim().slice(0, 60),
        classes: h.className
      });
    });

    // Check heading hierarchy
    let prevLevel = 0;
    headings.forEach((h, idx) => {
      if (h.level > prevLevel + 1 && prevLevel !== 0) {
        issues.headingOrder.push({
          index: idx,
          current: `${h.tag} (${h.level}) "${h.text}"`,
          previous: prevLevel,
          violation: `Skipped from h${prevLevel} to h${h.level}`
        });
      }
      prevLevel = h.level;
    });

    issues.allHeadings = headings;

    // 7. Check invalid ARIA roles / attributes
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox',
      'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition', 'dialog', 'directory',
      'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 'img', 'link',
      'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem',
      'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
      'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 'rowheader', 'scrollbar',
      'search', 'searchbox', 'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
      'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    document.querySelectorAll('[role]').forEach(el => {
      const role = el.getAttribute('role');
      if (!validRoles.includes(role)) {
        issues.invalidAria.push({
          role,
          snippet: el.outerHTML.slice(0, 100)
        });
      }
    });

    return issues;
  });

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

scanA11y().catch(console.error);
