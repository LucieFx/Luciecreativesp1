import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve(__dirname, "../.baseline-seo");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 1. Fetch sitemap.xml to get all URLs
async function main() {
  console.log("Fetching sitemap.xml to discover all routes...");
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemapXml, "utf8");
  console.log("Saved sitemap.xml");

  // Fetch robots.txt
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsTxt = await robotsRes.text();
  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robotsTxt, "utf8");
  console.log("Saved robots.txt");

  // Extract <loc> tags from sitemapXml
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    const rawUrl = match[1];
    // Replace domain with localhost:3000
    const parsed = new URL(rawUrl);
    urls.push(parsed.pathname);
  }

  // Ensure root is in urls
  if (!urls.includes("/")) urls.unshift("/");

  console.log(`Discovered ${urls.length} URLs to snapshot.`);

  const snapshotManifest = {};

  for (const pathname of urls) {
    const url = `${BASE_URL}${pathname}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`FAILED: ${url} returned status ${res.status}`);
        continue;
      }
      const html = await res.text();

      // Extract <head>...</head>
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const headContent = headMatch ? headMatch[1] : "";

      // Extract all <script type="application/ld+json">...</script>
      const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      const jsonLdBlocks = [];
      let jMatch;
      while ((jMatch = jsonLdRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(jMatch[1].trim());
          jsonLdBlocks.push(parsed);
        } catch (e) {
          jsonLdBlocks.push(jMatch[1].trim());
        }
      }

      // Safe filename for pathname
      const safeName = pathname === "/" ? "root" : pathname.replace(/^\//, "").replace(/\//g, "--");
      const outData = {
        pathname,
        status: res.status,
        head: headContent,
        jsonLd: jsonLdBlocks,
      };

      fs.writeFileSync(
        path.join(OUT_DIR, `${safeName}.json`),
        JSON.stringify(outData, null, 2),
        "utf8"
      );
      snapshotManifest[pathname] = `${safeName}.json`;
      console.log(`✓ Snapshotted ${pathname} (${jsonLdBlocks.length} JSON-LD blocks)`);
    } catch (err) {
      console.error(`ERROR snapshotting ${pathname}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(snapshotManifest, null, 2),
    "utf8"
  );
  console.log(`\nAll ${Object.keys(snapshotManifest).length} route baselines saved in ${OUT_DIR}`);
}

main().catch(console.error);
