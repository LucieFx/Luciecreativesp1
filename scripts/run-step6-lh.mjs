import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const urls = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'Video Editing', path: '/video-editing' },
];

const results = [];

for (const item of urls) {
  const url = `http://localhost:3000${item.path}`;
  console.log(`\n========================================`);
  console.log(`RUNNING LIGHTHOUSE BEST PRACTICES: ${item.name} (${url})`);
  console.log(`========================================`);

  const tmpMobile = `src/scripts/lh-bp-${item.name.toLowerCase().replace(/\s+/g, '-')}-mobile.json`;
  const tmpDesktop = `src/scripts/lh-bp-${item.name.toLowerCase().replace(/\s+/g, '-')}-desktop.json`;

  try {
    // 1. Mobile run
    console.log(`  -> Running Mobile Best Practices...`);
    execSync(
      `npx --yes lighthouse "${url}" --output=json --output-path="${tmpMobile}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --only-categories=best-practices --quiet`,
      { stdio: 'pipe' }
    );
    const mData = JSON.parse(fs.readFileSync(tmpMobile, 'utf-8'));
    const mScore = Math.round((mData.categories['best-practices']?.score ?? 0) * 100);

    // 2. Desktop run
    console.log(`  -> Running Desktop Best Practices...`);
    execSync(
      `npx --yes lighthouse "${url}" --output=json --output-path="${tmpDesktop}" --chrome-flags="--headless=new --no-sandbox" --preset=desktop --only-categories=best-practices --quiet`,
      { stdio: 'pipe' }
    );
    const dData = JSON.parse(fs.readFileSync(tmpDesktop, 'utf-8'));
    const dScore = Math.round((dData.categories['best-practices']?.score ?? 0) * 100);

    // Extract failing or warning audits
    const checkFailing = (data) => {
      const failing = [];
      for (const [key, audit] of Object.entries(data.audits || {})) {
        if (
          audit.score !== null &&
          audit.score < 1 &&
          audit.scoreDisplayMode !== 'notApplicable' &&
          audit.scoreDisplayMode !== 'informative'
        ) {
          failing.push({ id: key, title: audit.title, description: audit.description, details: audit.details });
        }
      }
      return failing;
    };

    const mFailing = checkFailing(mData);
    const dFailing = checkFailing(dData);

    results.push({
      page: item.name,
      path: item.path,
      mobileScore: mScore,
      desktopScore: dScore,
      mobileFailing: mFailing,
      desktopFailing: dFailing,
    });

    console.log(`  Results for ${item.name}: Mobile = ${mScore}/100, Desktop = ${dScore}/100`);
    if (mFailing.length > 0) {
      console.log(`  Mobile Failing Audits (${mFailing.length}):`, mFailing.map(f => f.title).join(', '));
    }
    if (dFailing.length > 0) {
      console.log(`  Desktop Failing Audits (${dFailing.length}):`, dFailing.map(f => f.title).join(', '));
    }

    // Clean up temporary files
    if (fs.existsSync(tmpMobile)) fs.unlinkSync(tmpMobile);
    if (fs.existsSync(tmpDesktop)) fs.unlinkSync(tmpDesktop);
  } catch (err) {
    console.error(`Error running Lighthouse on ${item.name}:`, err.message);
  }
}

console.log('\n======================================================');
console.log('SUMMARY TABLE: BEST PRACTICES AUDIT RESULTS');
console.log('======================================================');
console.table(
  results.map(r => ({
    Page: r.page,
    Path: r.path,
    'Mobile Score': `${r.mobileScore} / 100`,
    'Desktop Score': `${r.desktopScore} / 100`,
    'Failing Audits (Mobile)': r.mobileFailing.length,
    'Failing Audits (Desktop)': r.desktopFailing.length,
  }))
);

fs.writeFileSync(
  'src/scripts/step6-best-practices-results.json',
  JSON.stringify(results, null, 2),
  'utf-8'
);
console.log('Saved detailed results to src/scripts/step6-best-practices-results.json');
