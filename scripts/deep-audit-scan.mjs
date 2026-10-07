import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules" && file !== ".next" && file !== "scripts" && file !== ".baseline-seo") {
        results = results.concat(walk(full));
      }
    } else {
      if (/\.(tsx|ts|jsx|js|css)$/.test(file)) {
        results.push(full);
      }
    }
  });
  return results;
}

const files = walk(".");

const patterns = {
  backdropBlur: /backdrop-blur/g,
  translucentPanels: /bg-(white|black)\/(5|10|15|20|25|30|40|50|60|70|80|90)/g,
  harshGradients: /bg-gradient-|from-|to-|via-|linear-gradient|radial-gradient/g,
  sparkles: /Sparkles/g,
  purpleTones: /\b(purple|violet|indigo)\b/g,
  accentColors: /\b(emerald|amber|blue-[0-9]|rose|sky)\b/g,
  borderL4: /border-l-4/g,
  bgSlateOrBlack: /\b(bg-slate-[0-9]{3}|bg-black)\b/g,
  unicodeSymbols: /[\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\u2B50-\u2B59\u2728\u26A1\u2714\u2713\u25C6\u25C7\u25B2\u25BC\u25CF\u25C8\u2B21]/g,
};

const findings = {};
for (const key of Object.keys(patterns)) {
  findings[key] = [];
}

for (const file of files) {
  const rel = path.relative(".", file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    for (const [key, regex] of Object.entries(patterns)) {
      regex.lastIndex = 0;
      if (regex.test(line)) {
        findings[key].push({ file: rel, line: idx + 1, text: line.trim() });
      }
    }
  });
}

for (const [key, items] of Object.entries(findings)) {
  console.log(`\n=== ${key}: ${items.length} matches ===`);
  items.slice(0, 15).forEach((i) => console.log(`  ${i.file}:${i.line}  ${i.text.slice(0, 110)}`));
  if (items.length > 15) console.log(`  ... and ${items.length - 15} more`);
}

fs.writeFileSync("scripts/deep-audit-results.json", JSON.stringify(findings, null, 2), "utf8");
