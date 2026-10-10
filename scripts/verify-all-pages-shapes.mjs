import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'web-development', path: '/services/web-development' },
  { name: 'video-editing', path: '/services/video-editing' },
  { name: 'graphic-design', path: '/services/graphic-design' },
  { name: 'careers', path: '/careers' },
  { name: 'insights', path: '/insights' },
  { name: 'contact', path: '/contact' },
  { name: '404', path: '/404' },
];

const VIEWPORTS = [
  { width: 360, height: 800, label: '360' },
  { width: 768, height: 1024, label: '768' },
  { width: 1280, height: 900, label: '1280' },
  { width: 1920, height: 1080, label: '1920' },
];

const outDir = path.resolve('../scratch/visual-verification');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runAudit() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const violations = [];

  for (const pageInfo of PAGES) {
    console.log(`\n=== Auditing ${pageInfo.name} (${pageInfo.path}) ===`);
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const targetUrl = `${BASE_URL}${pageInfo.path}`;
      
      try {
        await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        // wait a brief moment for any layout animations
        await new Promise(r => setTimeout(r, 600));

        // Evaluate all DOM elements
        const pageViolations = await page.evaluate((pageName, vpLabel) => {
          const results = [];
          const elements = document.querySelectorAll('*');
          
          for (const el of elements) {
            // Ignore SVG internals or script/style
            if (['svg', 'path', 'g', 'circle', 'script', 'style', 'head', 'meta', 'link'].includes(el.tagName.toLowerCase())) {
              continue;
            }
            
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            
            const style = window.getComputedStyle(el);
            const radiusTopLeft = parseFloat(style.borderTopLeftRadius) || 0;
            const radiusTopRight = parseFloat(style.borderTopRightRadius) || 0;
            const radiusBottomLeft = parseFloat(style.borderBottomLeftRadius) || 0;
            const radiusBottomRight = parseFloat(style.borderBottomRightRadius) || 0;
            
            const maxRadius = Math.max(radiusTopLeft, radiusTopRight, radiusBottomLeft, radiusBottomRight);
            if (maxRadius === 0) continue;

            // True circles: avatars, status dots, circular progress indicators
            const isCircle = Math.abs(rect.width - rect.height) < 4 && maxRadius >= (rect.width / 2 - 2);
            if (isCircle && (rect.width <= 48 || el.closest('[data-circle-allowed]'))) {
              continue;
            }

            // Exclude phone hardware frame mockup image wrapper
            const isPhoneFrame = el.className.includes('rounded-[48px]') || el.className.includes('rounded-[28px]') || el.className.includes('rounded-[36px]') || el.closest('[class*="rounded-[48px]"]');
            if (isPhoneFrame) continue;

            // Exclude thin decorative divider / progress track lines (height <= 8px)
            if (rect.height <= 8) continue;

            // A pill shape is when width > height * 1.25 and border radius >= height / 2.2 (height >= 16px)
            const isPill = (rect.height >= 16) && (rect.width > rect.height * 1.2) && (maxRadius >= (rect.height / 2.2));

            // Radius greater than 16px on controls, cards, or media
            const isTooLarge = maxRadius > 16.5;

            if (isPill || (isTooLarge && !isCircle)) {
              results.push({
                page: pageName,
                viewport: vpLabel,
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 120),
                text: (el.innerText || '').slice(0, 40).trim(),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                maxRadius: Math.round(maxRadius),
                reason: isPill ? 'PILL_SHAPED' : 'RADIUS_TOO_LARGE'
              });
            }
          }
          return results;
        }, pageInfo.name, vp.label);

        if (pageViolations.length > 0) {
          console.log(`[VIOLATION] Found ${pageViolations.length} violations on ${pageInfo.name} at ${vp.label}px:`);
          for (const v of pageViolations) {
            console.log(`  - <${v.tag}> "${v.text}" (w:${v.width}, h:${v.height}, r:${v.maxRadius}) [${v.reason}] class: ${v.className}`);
            violations.push(v);
          }
        } else {
          console.log(`[PASS] ${pageInfo.name} at ${vp.label}px - All shapes compliant!`);
        }

        // Take screenshot at 1280px for visual confirmation
        if (vp.width === 1280) {
          const screenshotPath = path.join(outDir, `${pageInfo.name}-1280.png`);
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }

      } catch (err) {
        console.error(`Error auditing ${pageInfo.name} at ${vp.label}:`, err.message);
      }
    }
  }

  await browser.close();
  console.log(`\n========================================`);
  console.log(`AUDIT COMPLETE. Total violations: ${violations.length}`);
  console.log(`========================================`);
  
  if (violations.length > 0) {
    fs.writeFileSync(path.join(outDir, 'violations.json'), JSON.stringify(violations, null, 2));
  }
}

runAudit();
