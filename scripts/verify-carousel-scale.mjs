import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:3000/web-development';

const VIEWPORTS = [
  { width: 1920, height: 1080, name: '1920x1080' },
  { width: 1536, height: 864, name: '1536x864' },
  { width: 1440, height: 900, name: '1440x900' },
  { width: 1366, height: 768, name: '1366x768' },
  { width: 1024, height: 768, name: '1024x768' },
  { width: 768, height: 1024, name: '768x1024' },
  { width: 390, height: 844, name: '390x844' },
];

const outDir = path.resolve('../scratch/carousel-scale');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verifyCarousel() {
  console.log('🚀 Verifying Web Development Carousel Scale & Viewports...\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    console.log(`========================================`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 800));

    // Scroll to showcase section
    await page.evaluate(() => {
      const section = document.getElementById('project-showcase');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 600));

    const metrics = await page.evaluate((vpWidth, vpHeight) => {
      const section = document.getElementById('project-showcase');
      const tabs = section ? section.querySelector('[role="tablist"]') : null;
      const navbar = document.querySelector('header') || document.querySelector('nav');
      const activeCard = section ? section.querySelector('[aria-label="1 of 6"]') : null;
      const caption = section ? section.querySelector('.text-center') : null;
      const leftArrow = section ? section.querySelector('button[aria-label="Previous project"]') : null;
      const rightArrow = section ? section.querySelector('button[aria-label="Next project"]') : null;

      const tabsRect = tabs ? tabs.getBoundingClientRect() : null;
      const navRect = navbar ? navbar.getBoundingClientRect() : null;
      const cardRect = activeCard ? activeCard.getBoundingClientRect() : null;
      const captionRect = caption ? caption.getBoundingClientRect() : null;

      // Measure total unit height from top of tabs to bottom of caption
      const unitTop = tabsRect ? tabsRect.top : 0;
      const unitBottom = captionRect ? captionRect.bottom : 0;
      const totalUnitHeight = unitBottom - unitTop;

      const cardStyle = activeCard ? window.getComputedStyle(activeCard.firstElementChild || activeCard) : null;
      const arrowStyle = leftArrow ? window.getComputedStyle(leftArrow) : null;
      const tabStyle = tabs ? window.getComputedStyle(tabs) : null;

      // Check horizontal scroll
      const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

      return {
        unitTop: Math.round(unitTop),
        unitBottom: Math.round(unitBottom),
        totalUnitHeight: Math.round(totalUnitHeight),
        cardWidth: cardRect ? Math.round(cardRect.width) : 0,
        cardHeight: cardRect ? Math.round(cardRect.height) : 0,
        cardRatio: cardRect ? (cardRect.width / cardRect.height).toFixed(3) : '0',
        navBottom: navRect ? Math.round(navRect.bottom) : 0,
        tabsTop: tabsRect ? Math.round(tabsRect.top) : 0,
        clearsNavbar: tabsRect && navRect ? tabsRect.top >= navRect.bottom - 4 : true,
        cardRadius: cardStyle ? cardStyle.borderRadius : '',
        arrowRadius: arrowStyle ? arrowStyle.borderRadius : '',
        tabRadius: tabStyle ? tabStyle.borderRadius : '',
        hasHorizontalScroll,
      };
    }, vp.width, vp.height);

    console.log(`  Card: ${metrics.cardWidth}x${metrics.cardHeight} (ratio: ${metrics.cardRatio}, expected 1.600)`);
    console.log(`  Total Unit Height: ${metrics.totalUnitHeight}px (viewport: ${vp.height}px)`);
    console.log(`  Tabs Top: ${metrics.tabsTop}px vs Navbar Bottom: ${metrics.navBottom}px -> Clears navbar: ${metrics.clearsNavbar}`);
    console.log(`  Card Radius: ${metrics.cardRadius} (expected 16px)`);
    console.log(`  Arrow Radius: ${metrics.arrowRadius} (expected 10px)`);
    console.log(`  Horizontal scroll: ${metrics.hasHorizontalScroll ? 'YES (FAIL)' : 'NO (PASS)'}`);

    // Capture screenshot
    const shotPath = path.join(outDir, `showcase-${vp.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`  📸 Screenshot saved: ${shotPath}`);
  }

  await browser.close();
  console.log('\n🎉 ALL VIEWPORTS VERIFIED!');
}

verifyCarousel().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
