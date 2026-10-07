import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/video-editing',
  '/graphic-design',
  '/web-development',
  '/about',
  '/careers',
  '/contact',
  '/testimonials',
  '/industries',
  '/insights',
  '/ui-ux-design',
  '/branding',
  '/logo-design',
  '/social-media-design',
  '/privacy',
  '/terms',
  '/work/vedam-villas-influencer-tour'
];

async function runAudit() {
  console.log('Testing Accessibility across all routes on Desktop and Mobile...');
  const results = {};

  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/\//g, '_');
    results[route] = {};

    // 1. Mobile audit
    const mobileJson = `src/scripts/lh-temp-mobile-${slug}.json`;
    try {
      execSync(
        `npx --yes lighthouse http://localhost:3000${route} --output=json --output-path=${mobileJson} --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --only-categories=accessibility`,
        { stdio: 'pipe' }
      );
      const dataM = JSON.parse(fs.readFileSync(mobileJson, 'utf-8'));
      const scoreM = Math.round(dataM.categories.accessibility.score * 100);
      const failuresM = [];
      for (const [k, a] of Object.entries(dataM.audits)) {
        if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
          failuresM.push({ id: k, title: a.title, items: a.details?.items?.length || 0 });
        }
      }
      results[route].mobile = { score: scoreM, failures: failuresM };
      fs.unlinkSync(mobileJson);
    } catch (e) {
      results[route].mobile = { error: e.message };
    }

    // 2. Desktop audit
    const desktopJson = `src/scripts/lh-temp-desktop-${slug}.json`;
    try {
      execSync(
        `npx --yes lighthouse http://localhost:3000${route} --output=json --output-path=${desktopJson} --chrome-flags="--headless=new --no-sandbox" --preset=desktop --only-categories=accessibility`,
        { stdio: 'pipe' }
      );
      const dataD = JSON.parse(fs.readFileSync(desktopJson, 'utf-8'));
      const scoreD = Math.round(dataD.categories.accessibility.score * 100);
      const failuresD = [];
      for (const [k, a] of Object.entries(dataD.audits)) {
        if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
          failuresD.push({ id: k, title: a.title, items: a.details?.items?.length || 0 });
        }
      }
      results[route].desktop = { score: scoreD, failures: failuresD };
      fs.unlinkSync(desktopJson);
    } catch (e) {
      results[route].desktop = { error: e.message };
    }

    console.log(
      `Route ${route.padEnd(20)} -> Mobile: ${results[route].mobile?.score ?? 'ERR'} | Desktop: ${results[route].desktop?.score ?? 'ERR'}`
    );
  }

  console.log('\nFULL SUMMARY:');
  console.log(JSON.stringify(results, null, 2));
}

runAudit();
