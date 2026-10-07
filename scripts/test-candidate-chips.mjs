import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Let's test a candidate set of chip coordinates across all 5 viewports
async function evaluateCandidates() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const candidateChipsByBreakpoint = {
    // 375px: 2 chips at top (above eyebrow)
    375: [
      { id: 'mob-1', left: 24, top: 96, size: 36 },
      { id: 'mob-2', left: 315, top: 96, size: 36 }
    ],
    // 768px: 6 chips in wide side gutters beside buttons and stack
    768: [
      { id: 'tab-1', left: 40, top: 345, size: 40 },
      { id: 'tab-2', left: 688, top: 345, size: 40 },
      { id: 'tab-3', left: 40, top: 450, size: 40 },
      { id: 'tab-4', left: 688, top: 450, size: 40 },
      { id: 'tab-5', left: 40, top: 540, size: 40 },
      { id: 'tab-6', left: 688, top: 540, size: 40 },
    ],
    // 1024px: 8 chips positioned relative to content container
    1024: [
      // Top corridor above left col (Y: 112)
      { id: 'desk-0', left: 80, top: 112, size: 42 },
      { id: 'desk-1', left: 250, top: 112, size: 42 },
      { id: 'desk-2', left: 420, top: 112, size: 42 },
      // Bottom corridor below left col (Y: 775)
      { id: 'desk-3', left: 80, top: 775, size: 42 },
      { id: 'desk-4', left: 250, top: 775, size: 42 },
      { id: 'desk-5', left: 420, top: 775, size: 42 },
      // Below showcase (Y: 875)
      { id: 'desk-6', left: 750, top: 875, size: 42 },
      { id: 'desk-7', left: 880, top: 875, size: 42 },
    ],
    // 1440px: 8 chips
    1440: [
      { id: 'desk-0', left: 120, top: 110, size: 38 },
      { id: 'desk-1', left: 340, top: 110, size: 38 },
      { id: 'desk-2', left: 560, top: 110, size: 38 },
      { id: 'desk-3', left: 120, top: 785, size: 42 },
      { id: 'desk-4', left: 340, top: 785, size: 42 },
      { id: 'desk-5', left: 560, top: 785, size: 42 },
      { id: 'desk-6', left: 1000, top: 875, size: 42 },
      { id: 'desk-7', left: 1200, top: 875, size: 42 },
    ],
    // 1920px: 8 chips
    1920: [
      { id: 'desk-0', left: 360, top: 110, size: 38 },
      { id: 'desk-1', left: 580, top: 110, size: 38 },
      { id: 'desk-2', left: 800, top: 110, size: 38 },
      { id: 'desk-3', left: 360, top: 785, size: 42 },
      { id: 'desk-4', left: 580, top: 785, size: 42 },
      { id: 'desk-5', left: 800, top: 785, size: 42 },
      { id: 'desk-6', left: 1240, top: 875, size: 42 },
      { id: 'desk-7', left: 1450, top: 875, size: 42 },
    ]
  };

  for (const w of [375, 768, 1024, 1440, 1920]) {
    await page.setViewport({ width: w, height: 950 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const obstacles = await page.evaluate(() => {
      const nav = document.querySelector('header')?.getBoundingClientRect();
      const textEls = [
        document.querySelector('div.lg\\:col-span-7 > div:first-child'), // eyebrow
        document.querySelector('h1'),
        document.querySelector('h1 + p'), // subtext
        document.querySelector('div.flex.flex-col.sm\\:flex-row'), // buttons
        document.querySelector('div.w-full.max-w-md'), // stack
        document.querySelector('div.lg\\:col-span-5') // showcase
      ].filter(Boolean).map(el => {
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
      });

      return {
        navBottom: nav ? Math.round(nav.bottom) : 0,
        textEls
      };
    });

    function getDist(r1, r2) {
      const dx = Math.max(0, Math.max(r1.left - r2.right, r2.left - r1.right));
      const dy = Math.max(0, Math.max(r1.top - r2.bottom, r2.top - r1.bottom));
      if (dx === 0 && dy === 0) return 0;
      if (dx === 0) return dy;
      if (dy === 0) return dx;
      return Math.sqrt(dx * dx + dy * dy);
    }

    const chips = candidateChipsByBreakpoint[w];
    let allNavOk = true;
    let allContentOk = true;

    console.log(`\n=== AUDIT FOR WIDTH ${w} ===`);
    chips.forEach(chip => {
      const rChip = {
        top: chip.top,
        bottom: chip.top + chip.size,
        left: chip.left,
        right: chip.left + chip.size
      };
      const distFromNav = chip.top - obstacles.navBottom;
      let minDistToContent = 999;
      obstacles.textEls.forEach(obs => {
        const d = getDist(rChip, obs);
        if (d < minDistToContent) minDistToContent = d;
      });

      const navOk = distFromNav >= 24;
      const contentOk = minDistToContent >= 32;
      if (!navOk) allNavOk = false;
      if (!contentOk) allContentOk = false;

      console.log(`  Chip ${chip.id}: top=${chip.top}, left=${chip.left}, distNav=${distFromNav} (>=24: ${navOk}), minDist=${Math.round(minDistToContent)} (>=32: ${contentOk})`);
    });

    console.log(`RESULT ${w} => ALL_NAV_CLEAR: ${allNavOk}, ALL_CONTENT_CLEAR: ${allContentOk}`);
  }

  await browser.close();
}

evaluateCandidates().catch(console.error);
