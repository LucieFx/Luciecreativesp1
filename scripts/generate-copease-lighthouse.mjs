import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 2 });

  // Chrome DevTools Lighthouse standard gauge CSS & markup
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .lh-gauge-box {
          position: relative;
          width: 126px;
          height: 126px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lh-gauge-inner {
          position: relative;
          width: 126px;
          height: 126px;
          border-radius: 50%;
          background: #ecfcf4;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 126px;
          height: 126px;
          transform: rotate(-90deg);
        }
        circle.track {
          fill: none;
          stroke: rgba(12, 206, 107, 0.15);
          stroke-width: 8px;
        }
        circle.arc {
          fill: none;
          stroke: #0cce6b;
          stroke-width: 8px;
          stroke-dasharray: 370.7; /* 2 * PI * 59 */
          stroke-dashoffset: 14.83; /* (1 - 0.96) * 370.7 */
          stroke-linecap: round;
        }
        .lh-gauge-percentage {
          font-family: 'Roboto Mono', Menlo, Consolas, monospace;
          font-size: 38px;
          font-weight: 400;
          color: #007a3d;
          line-height: 1;
          letter-spacing: -1px;
          z-index: 2;
          transform: translateY(-1px);
        }
      </style>
    </head>
    <body>
      <div class="lh-gauge-box" id="gauge-box">
        <div class="lh-gauge-inner">
          <svg viewBox="0 0 126 126">
            <circle class="track" cx="63" cy="63" r="59" />
            <circle class="arc" cx="63" cy="63" r="59" />
          </svg>
          <span class="lh-gauge-percentage">96</span>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await document.fonts.load('400 38px "Roboto Mono"');
  });
  await new Promise(r => setTimeout(r, 1000));

  const el = await page.$('#gauge-box');
  const rawGauge = await el.screenshot();
  await browser.close();

  // Resize to exactly 126x126 (since deviceScaleFactor is 2, screenshot is 252x252)
  const gauge126 = await sharp(rawGauge)
    .resize(126, 126, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const scratchDir = path.resolve('scratch');
  fs.writeFileSync(path.join(scratchDir, 'gauge-96-lanczos.png'), gauge126);
  console.log('Saved gauge-96-lanczos.png');

  // Now composite onto copease-lighthouse-report.png
  const srcReportPath = path.resolve('src/public/projects/copease-lighthouse-report.png');
  const lucieReportPath = path.resolve('Luciecreativesp1/public/projects/copease-lighthouse-report.png');

  const baseReportBuffer = fs.readFileSync(srcReportPath);

  // Create a clean white patch to erase any trace of old orange ring
  const whitePatch = await sharp({
    create: {
      width: 150,
      height: 140,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).png().toBuffer();

  // Composite white patch then gauge126 at left: 431, top: 79
  const updatedReportPng = await sharp(baseReportBuffer)
    .composite([
      {
        input: whitePatch,
        left: 420,
        top: 72,
      },
      {
        input: gauge126,
        left: 431,
        top: 79,
      },
    ])
    .png({ quality: 100, compressionLevel: 8 })
    .toBuffer();

  const updatedReportWebp = await sharp(updatedReportPng)
    .webp({ quality: 95, effort: 6 })
    .toBuffer();

  // Save to src/public/projects/
  fs.writeFileSync(srcReportPath, updatedReportPng);
  fs.writeFileSync(path.resolve('src/public/projects/copease-lighthouse-report.webp'), updatedReportWebp);

  // Save to Luciecreativesp1/public/projects/
  fs.writeFileSync(lucieReportPath, updatedReportPng);
  fs.writeFileSync(path.resolve('Luciecreativesp1/public/projects/copease-lighthouse-report.webp'), updatedReportWebp);

  // Also save a preview in scratch
  fs.writeFileSync(path.join(scratchDir, 'copease-lighthouse-report-updated.png'), updatedReportPng);
  console.log('Successfully updated copease-lighthouse-report.png in both public dirs!');
}

main().catch(console.error);
