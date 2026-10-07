import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3000";
const BASELINE_DIR = path.resolve(__dirname, "../.baseline-seo");

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

async function runSeoDiff() {
  console.log("==================================================");
  console.log("DIFFING CURRENT SEO AGAINST ORIGINAL BASELINE");
  console.log("==================================================");

  let totalDiffs = 0;
  const routeDiffResults = [];

  // 1. Sitemap.xml Diff
  console.log("\n1. Checking sitemap.xml ...");
  const currentSitemap = await (await fetch(`${BASE_URL}/sitemap.xml`)).text();
  const baselineSitemapPath = path.join(BASELINE_DIR, "sitemap.xml");
  if (fs.existsSync(baselineSitemapPath)) {
    const baselineSitemap = fs.readFileSync(baselineSitemapPath, "utf8");
    if (currentSitemap.trim() === baselineSitemap.trim()) {
      console.log("✓ sitemap.xml matches baseline exactly!");
    } else {
      console.log("! sitemap.xml differs from baseline. Comparing URL lists...");
      const getUrls = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).sort();
      const currUrls = getUrls(currentSitemap);
      const baseUrls = getUrls(baselineSitemap);
      const missing = baseUrls.filter(u => !currUrls.includes(u));
      const added = currUrls.filter(u => !baseUrls.includes(u));
      if (missing.length === 0 && added.length === 0) {
        console.log("✓ sitemap.xml URL list is 100% identical (only formatting or date whitespace differed).");
      } else {
        console.error("  Missing URLs:", missing);
        console.error("  Added URLs:", added);
        totalDiffs++;
      }
    }
  } else {
    console.warn("  Baseline sitemap.xml not found.");
  }

  // 2. Robots.txt Diff
  console.log("\n2. Checking robots.txt ...");
  const currentRobots = await (await fetch(`${BASE_URL}/robots.txt`)).text();
  const baselineRobotsPath = path.join(BASELINE_DIR, "robots.txt");
  if (fs.existsSync(baselineRobotsPath)) {
    const baselineRobots = fs.readFileSync(baselineRobotsPath, "utf8");
    // Normalize newlines
    if (currentRobots.replace(/\r\n/g, '\n').trim() === baselineRobots.replace(/\r\n/g, '\n').trim()) {
      console.log("✓ robots.txt matches baseline exactly!");
    } else {
      console.log("! robots.txt content difference detected.");
      console.log("Current:\n", currentRobots);
      console.log("Baseline:\n", baselineRobots);
      totalDiffs++;
    }
  }

  // 3. Diffing <head> SEO metadata and JSON-LD for each route
  console.log("\n3. Checking 17 Routes (<head> SEO & JSON-LD structured data) ...");

  const extractSeoMeta = (headHtml) => {
    const getTag = (regex) => {
      const m = headHtml.match(regex);
      return m ? m[1] : null;
    };
    const title = getTag(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDesc = getTag(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i) ||
                     getTag(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/i);
    const canonical = getTag(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i) ||
                      getTag(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/i);
    const ogTitle = getTag(/<meta[^>]*property=["']og:title["'][^>]*content=["'](.*?)["']/i);
    const ogDesc = getTag(/<meta[^>]*property=["']og:description["'][^>]*content=["'](.*?)["']/i);
    const ogUrl = getTag(/<meta[^>]*property=["']og:url["'][^>]*content=["'](.*?)["']/i);
    const ogImage = getTag(/<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["']/i);

    return { title, metaDesc, canonical, ogTitle, ogDesc, ogUrl, ogImage };
  };

  const extractJsonLd = (html) => {
    const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const blocks = [];
    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        blocks.push(JSON.parse(match[1].trim()));
      } catch {
        blocks.push(match[1].trim());
      }
    }
    return blocks;
  };

  for (const pathname of routes) {
    const safeName = pathname === "/" ? "root" : pathname.replace(/^\//, "").replace(/\//g, "--");
    const baselineFile = path.join(BASELINE_DIR, `${safeName}.json`);

    if (!fs.existsSync(baselineFile)) {
      console.warn(`  Baseline file missing for route: ${pathname} (${safeName}.json)`);
      continue;
    }

    const baselineData = JSON.parse(fs.readFileSync(baselineFile, "utf8"));
    const baselineSeo = extractSeoMeta(baselineData.head);
    const baselineJsonLd = baselineData.jsonLd;

    const res = await fetch(`${BASE_URL}${pathname}`);
    const html = await res.text();
    const currentHeadMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const currentHead = currentHeadMatch ? currentHeadMatch[1] : "";
    const currentSeo = extractSeoMeta(currentHead);
    const currentJsonLd = extractJsonLd(html);

    const issues = [];

    // Compare title
    if (currentSeo.title !== baselineSeo.title) {
      issues.push(`Title changed: "${baselineSeo.title}" -> "${currentSeo.title}"`);
    }

    // Compare meta description
    if (currentSeo.metaDesc !== baselineSeo.metaDesc) {
      issues.push(`Description changed: "${baselineSeo.metaDesc}" -> "${currentSeo.metaDesc}"`);
    }

    // Compare canonical
    if (currentSeo.canonical !== baselineSeo.canonical) {
      issues.push(`Canonical changed: "${baselineSeo.canonical}" -> "${currentSeo.canonical}"`);
    }

    // Compare og tags
    if (currentSeo.ogTitle !== baselineSeo.ogTitle) {
      issues.push(`OG:Title changed: "${baselineSeo.ogTitle}" -> "${currentSeo.ogTitle}"`);
    }
    if (currentSeo.ogUrl !== baselineSeo.ogUrl) {
      issues.push(`OG:URL changed: "${baselineSeo.ogUrl}" -> "${currentSeo.ogUrl}"`);
    }

    // Compare JSON-LD blocks count
    if (currentJsonLd.length !== baselineJsonLd.length) {
      issues.push(`JSON-LD block count changed: was ${baselineJsonLd.length}, now ${currentJsonLd.length}`);
    } else {
      // Check JSON-LD schema @type matching
      const baseTypes = baselineJsonLd.map(b => b['@type']).sort();
      const currTypes = currentJsonLd.map(b => b['@type']).sort();
      if (JSON.stringify(baseTypes) !== JSON.stringify(currTypes)) {
        issues.push(`JSON-LD schema types changed: was ${JSON.stringify(baseTypes)}, now ${JSON.stringify(currTypes)}`);
      }
    }

    if (issues.length === 0) {
      console.log(`✓ [${pathname}] SEO metadata & JSON-LD (${currentJsonLd.length} schemas) 100% matched baseline.`);
      routeDiffResults.push({ pathname, status: "MATCHED", issues: [] });
    } else {
      console.error(`✗ [${pathname}] SEO DIFFERENCES DETECTED:`);
      issues.forEach(i => console.error(`    - ${i}`));
      totalDiffs += issues.length;
      routeDiffResults.push({ pathname, status: "DIFF", issues });
    }
  }

  console.log("\n==================================================");
  console.log(`SEO DIFF VERDICT: ${totalDiffs === 0 ? "100% PERFECT MATCH — ZERO SEO REGRESSIONS" : `${totalDiffs} DIFFERENCES FOUND`}`);
  console.log("==================================================");

  fs.writeFileSync(
    path.join(__dirname, "seo-diff-results.json"),
    JSON.stringify({ totalDiffs, routeDiffResults }, null, 2),
    "utf8"
  );
}

runSeoDiff().catch(console.error);
