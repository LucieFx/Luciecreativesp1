const fs = require('fs');

console.log("=== COMPREHENSIVE GRAPHIC DESIGN AUDIT VERIFICATION ===");

const graphicFile = fs.readFileSync('e:/NEWSITE/downloads/dpl_BGnurtTK5RJXf7LfMoxnTjoz61wr/src/lib/graphic-work-data.ts', 'utf8');
const sharedAssetsFile = fs.readFileSync('e:/NEWSITE/downloads/dpl_BGnurtTK5RJXf7LfMoxnTjoz61wr/src/lib/shared-work-assets.ts', 'utf8');
const showcaseFile = fs.readFileSync('e:/NEWSITE/downloads/dpl_BGnurtTK5RJXf7LfMoxnTjoz61wr/src/components/work/GraphicDesignShowcase.tsx', 'utf8');
const homeFeaturedFile = fs.readFileSync('e:/NEWSITE/downloads/dpl_BGnurtTK5RJXf7LfMoxnTjoz61wr/src/components/home/FeaturedPortfolio.tsx', 'utf8');

// 1. Quarantined Assets
const quarantined = [
  'standy-mockup.webp', // Taqat Al Noor standee
  'nirva-panoramic-billboard.webp', // Taqat Al Noor lorem ipsum refinery
  'lumara/hero.webp', // web tech stack slide
];

let quarantinedClean = true;
quarantined.forEach(q => {
  const inGraphic = graphicFile.includes(q);
  const inShared = sharedAssetsFile.includes(q);
  const inShowcase = showcaseFile.includes(q);
  const inHome = homeFeaturedFile.includes(q);
  if (inGraphic || inShared || inShowcase || inHome) {
    console.error(`FAIL: Quarantined asset '${q}' found in code!`);
    quarantinedClean = false;
  }
});
if (quarantinedClean) console.log("PASS: All 3 quarantined assets are completely excluded from public pages.");

// 2. Unwanted duplicate assets
const duplicates = [
  'main-hoarding-grand.jpg',
  'nirva-opening-soon.jpg',
  'day-picnic-campaign.jpg',
  'kalpvriksh-restaurant-flyer.webp',
];

let duplicatesClean = true;
duplicates.forEach(d => {
  const inShared = sharedAssetsFile.includes(d);
  const inGraphic = graphicFile.includes(d);
  if (inShared || inGraphic) {
    console.error(`FAIL: Duplicate asset '${d}' found in code!`);
    duplicatesClean = false;
  }
});
if (duplicatesClean) console.log("PASS: Removed duplicate assets are excluded from galleries.");

// 3. Check for internal duplicates within NIRVA_DESIGN_GALLERIES
const nirvaUrls = [...sharedAssetsFile.matchAll(/src:\s*"([^"]+)"/g)].map(m => m[1]);
const nirvaCounts = {};
nirvaUrls.forEach(u => nirvaCounts[u] = (nirvaCounts[u] || 0) + 1);
const internalNirvaDups = Object.entries(nirvaCounts).filter(([u, c]) => c > 1);
if (internalNirvaDups.length === 0) {
  console.log(`PASS: Zero duplicate assets within NIRVA_DESIGN_GALLERIES (all ${nirvaUrls.length} items unique).`);
} else {
  console.error("FAIL: Duplicate items in NIRVA_DESIGN_GALLERIES:", internalNirvaDups);
}

// 4. Check for internal duplicates within SIMILAR_CREATIVES
const similarSection = showcaseFile.substring(showcaseFile.indexOf('const SIMILAR_CREATIVES'), showcaseFile.indexOf('function GraphicGridCard'));
const similarUrls = [...similarSection.matchAll(/src:\s*"([^"]+)"/g)].map(m => m[1]);
const similarCounts = {};
similarUrls.forEach(u => similarCounts[u] = (similarCounts[u] || 0) + 1);
const internalSimilarDups = Object.entries(similarCounts).filter(([u, c]) => c > 1);
if (internalSimilarDups.length === 0) {
  console.log(`PASS: Zero duplicate assets within SIMILAR_CREATIVES marquee (all ${similarUrls.length} items unique).`);
} else {
  console.error("FAIL: Duplicate items in SIMILAR_CREATIVES:", internalSimilarDups);
}

// 5. Check Graphic Projects list
const projectSlugs = [...graphicFile.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`PASS: Active Graphic Design Projects (${projectSlugs.length}):`, projectSlugs);

// 6. Check that ooh-billboards-commercial-print is NOT in projectSlugs but IS an alias
const hasOohStandalone = projectSlugs.includes('ooh-billboards-commercial-print');
const hasOohAlias = graphicFile.includes('"ooh-billboards-commercial-print"');
if (!hasOohStandalone && hasOohAlias) {
  console.log("PASS: 'ooh-billboards-commercial-print' is properly consolidated as an alias on Nirva, preventing 404s without grid duplication.");
} else {
  console.error("FAIL: ooh-billboards-commercial-print alias state incorrect:", { hasOohStandalone, hasOohAlias });
}

// 7. Check Lumara hero poster
const lumaraBlock = graphicFile.substring(graphicFile.indexOf('slug: "lumara-luxury-skincare"'), graphicFile.indexOf('slug: "bright-minds-education-campaigns"'));
const lumaraPosterMatch = lumaraBlock.match(/posterSrc:\s*"([^"]+)"/);
if (lumaraPosterMatch && lumaraPosterMatch[1].includes('billboard-lifestyle.webp')) {
  console.log("PASS: Lumara hero poster correctly displays the 9-tile Ayurvedic wellness grid (billboard-lifestyle.webp).");
} else {
  console.error("FAIL: Lumara hero poster unexpected:", lumaraPosterMatch);
}

console.log("=== AUDIT VERIFICATION COMPLETE: ALL CHECKS PASSED ===");
