import fs from 'fs';
import path from 'path';

async function test() {
  const r = await fetch('http://localhost:3000/');
  const html = await r.text();
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : '';

  const baseline = JSON.parse(fs.readFileSync('src/.baseline-seo/root.json', 'utf8'));

  console.log('Current HEAD length:', head.length);
  console.log('Baseline HEAD length:', baseline.head.length);

  // Compare description
  const currDesc = head.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  const baseDesc = baseline.head.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  console.log('Curr desc:', currDesc);
  console.log('Base desc:', baseDesc);
  console.log('Desc match:', currDesc === baseDesc);

  // Compare JSON-LD
  const currJsonLd = [];
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    currJsonLd.push(JSON.parse(m[1]));
  }
  console.log('Curr JSON-LD count:', currJsonLd.length);
  console.log('Base JSON-LD count:', baseline.jsonLd.length);
  console.log('JSON-LD match:', JSON.stringify(currJsonLd) === JSON.stringify(baseline.jsonLd));

  // Check where title is in baseline
  console.log('Title in baseline head?', baseline.head.includes('<title'));
  console.log('Title in current head?', head.includes('<title'));
  console.log('Title in current html?', html.includes('<title'));
  if (html.includes('<title')) {
    console.log('Title tag:', html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[0]);
  }
}

test().catch(console.error);
