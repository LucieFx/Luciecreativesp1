import fs from 'fs';

const mobileData = JSON.parse(fs.readFileSync('src/scripts/lighthouse-mobile.json', 'utf-8'));
const desktopData = JSON.parse(fs.readFileSync('src/scripts/lighthouse-desktop.json', 'utf-8'));

function getSummary(data, name) {
  const scores = {};
  for (const [k, v] of Object.entries(data.categories)) {
    scores[v.title] = Math.round(v.score * 100);
  }

  const audits = data.audits;
  const metrics = {
    fcp: audits['first-contentful-paint']?.displayValue,
    lcp: audits['largest-contentful-paint']?.displayValue,
    lcpRaw: audits['largest-contentful-paint']?.numericValue,
    tbt: audits['total-blocking-time']?.displayValue,
    tbtRaw: audits['total-blocking-time']?.numericValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    clsRaw: audits['cumulative-layout-shift']?.numericValue,
    speedIndex: audits['speed-index']?.displayValue,
  };

  const lcpElement = audits['largest-contentful-paint-element']?.details?.items?.[0]?.node;

  const networkItems = audits['network-requests']?.details?.items || [];
  let totalJsTransfer = 0;
  let totalJsResource = 0;
  networkItems.filter(i => i.resourceType === 'Script').forEach(i => {
    totalJsTransfer += i.transferSize || 0;
    totalJsResource += i.resourceSize || 0;
  });

  const topResources = [...networkItems]
    .sort((a,b) => (b.transferSize || 0) - (a.transferSize || 0))
    .slice(0, 10)
    .map(r => ({
      url: r.url,
      type: r.resourceType || 'other',
      transferSizeKB: (r.transferSize / 1024).toFixed(1),
      resourceSizeKB: (r.resourceSize / 1024).toFixed(1),
    }));

  // Group failing/warning audits by category
  const failedByCategory = {
    Performance: [],
    Accessibility: [],
    'Best Practices': [],
    SEO: []
  };

  for (const [catKey, catVal] of Object.entries(data.categories)) {
    const catName = catVal.title;
    catVal.auditRefs.forEach(ref => {
      const a = audits[ref.id];
      if (!a) return;
      if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
        const item = {
          id: ref.id,
          title: a.title,
          score: a.score,
          weight: ref.weight,
          displayValue: a.displayValue,
          description: a.description ? a.description.split('[Learn')[0].trim() : '',
          items: a.details?.items || []
        };
        if (!failedByCategory[catName]) failedByCategory[catName] = [];
        // Avoid duplicates if referenced in multiple
        if (!failedByCategory[catName].some(x => x.id === item.id)) {
          failedByCategory[catName].push(item);
        }
      }
    });
  }

  return {
    name,
    scores,
    metrics,
    lcpElement,
    totalJsTransferKB: (totalJsTransfer / 1024).toFixed(1),
    totalJsResourceKB: (totalJsResource / 1024).toFixed(1),
    topResources,
    failedByCategory,
  };
}

const mobileSummary = getSummary(mobileData, 'MOBILE');
const desktopSummary = getSummary(desktopData, 'DESKTOP');

fs.writeFileSync('src/scripts/audit-summary.json', JSON.stringify({ mobile: mobileSummary, desktop: desktopSummary }, null, 2));
console.log('Successfully saved audit-summary.json');
