import { execSync } from 'child_process';
import fs from 'fs';

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

async function scan() {
  console.log(`Auditing all 17 routes (1 initial run to check targets)...`);
  const results = [];

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    const tmpM = `src/scripts/tmp-scan-m-${Date.now()}.json`;
    const tmpD = `src/scripts/tmp-scan-d-${Date.now()}.json`;

    let mScores = {};
    let dScores = {};

    try {
      execSync(
        `npx --yes lighthouse "${url}" --output=json --output-path="${tmpM}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
        { stdio: 'pipe' }
      );
      const dm = JSON.parse(fs.readFileSync(tmpM, 'utf-8'));
      mScores = {
        perf: Math.round(dm.categories.performance.score * 100),
        a11y: Math.round(dm.categories.accessibility.score * 100),
        bp: Math.round(dm.categories['best-practices'].score * 100),
        seo: Math.round(dm.categories.seo.score * 100),
        lcp: dm.audits['largest-contentful-paint']?.displayValue,
        cls: dm.audits['cumulative-layout-shift']?.displayValue,
      };
      fs.unlinkSync(tmpM);
    } catch (e) {
      mScores = { error: e.message };
    }

    try {
      execSync(
        `npx --yes lighthouse "${url}" --output=json --output-path="${tmpD}" --chrome-flags="--headless=new --no-sandbox" --preset=desktop --quiet`,
        { stdio: 'pipe' }
      );
      const dd = JSON.parse(fs.readFileSync(tmpD, 'utf-8'));
      dScores = {
        perf: Math.round(dd.categories.performance.score * 100),
        a11y: Math.round(dd.categories.accessibility.score * 100),
        bp: Math.round(dd.categories['best-practices'].score * 100),
        seo: Math.round(dd.categories.seo.score * 100),
        lcp: dd.audits['largest-contentful-paint']?.displayValue,
        cls: dd.audits['cumulative-layout-shift']?.displayValue,
      };
      fs.unlinkSync(tmpD);
    } catch (e) {
      dScores = { error: e.message };
    }

    console.log(
      `[${route.padEnd(35)}] Mobile: P:${mScores.perf} A:${mScores.a11y} BP:${mScores.bp} SEO:${mScores.seo} (LCP: ${mScores.lcp}, CLS: ${mScores.cls}) | Desktop: P:${dScores.perf} A:${dScores.a11y} BP:${dScores.bp} SEO:${dScores.seo}`
    );

    results.push({ route, mobile: mScores, desktop: dScores });
  }

  fs.writeFileSync('src/scripts/initial-scan-results.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\nInitial scan finished and saved.');
}

scan().catch(console.error);
