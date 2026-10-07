const r = await fetch('http://localhost:3000/');
const html = await r.text();
const headIdx = html.indexOf('</head>');
const head = html.slice(0, headIdx);
const body = html.slice(headIdx);

console.log('=== Preload links in HEAD ===');
const headLinks = head.match(/<link[^>]+>/g) || [];
headLinks.filter(l => l.includes('preload')).forEach(l => console.log(l));

console.log('=== Preload links in BODY ===');
const bodyLinks = body.match(/<link[^>]+>/g) || [];
bodyLinks.filter(l => l.includes('preload')).forEach(l => console.log(l));
