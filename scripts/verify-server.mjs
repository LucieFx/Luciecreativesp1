const res = await fetch('http://localhost:3000/');
const text = await res.text();
console.log('HTML status:', res.status, 'length:', text.length);
const chunks = [...text.matchAll(/_next\/static\/chunks\/[^\s"'<>]+/g)].map(m => m[0]);
console.log('Total chunks referenced in HTML:', chunks.length);
let failed = 0;
for (const chunk of chunks) {
  const cRes = await fetch('http://localhost:3000/' + chunk);
  if (cRes.status !== 200) {
    console.error('Failed chunk:', chunk, cRes.status);
    failed++;
  }
}
console.log('All chunk checks complete. Failures:', failed);
