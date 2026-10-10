import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capturePurpleKaption() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });

  const page = await browser.newPage();
  // 1440 width, deviceScaleFactor: 2 produces 2880px wide ultra high-res image
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Inject Purple theme styles and fix elements
  await page.evaluate(() => {
    // 1. Force dark mode
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // 2. Remove cookie banner and any dev badges
    const removeUnwanted = () => {
      document.querySelectorAll('nextjs-portal').forEach(el => el.remove());
      // Cookie banner
      document.querySelectorAll('div').forEach(d => {
        if (d.textContent && (d.textContent.includes('Your cookie choices') || d.textContent.includes('Accept functional'))) {
          // If it's a fixed / absolute popup or banner
          const isBanner = window.getComputedStyle(d).position === 'fixed' || window.getComputedStyle(d).position === 'absolute' || d.textContent.length < 500;
          if (isBanner) d.remove();
        }
      });
    };
    removeUnwanted();

    // 3. Inject custom CSS overriding the red colors to exact luxurious purple/violet
    const style = document.createElement('style');
    style.id = 'kaption-purple-theme';
    style.innerHTML = `
      :root, .dark {
        --primary: #8B5CF6 !important;
        --primary-hover: #7C3AED !important;
        --primary-active: #6D28D9 !important;
        --brand-light: #2E1065 !important;
        --glow-color: rgba(139, 92, 246, 0.22) !important;
        --grid-color: rgba(139, 92, 246, 0.06) !important;
      }

      /* Background glow */
      body {
        background-color: #07080D !important;
        background-image: 
          radial-gradient(circle at 50% 15%, rgba(139, 92, 246, 0.16) 0%, transparent 60%),
          radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
          linear-gradient(to right, rgba(139, 92, 246, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.04) 1px, transparent 1px) !important;
      }

      /* Top badge */
      div:has(> span:contains('AI-Powered')), div:has(> p:contains('AI-Powered')) {
        border-color: rgba(139, 92, 246, 0.4) !important;
        background: rgba(139, 92, 246, 0.08) !important;
        color: #C4B5FD !important;
      }

      /* Hero Italic text */
      h1 span, h2 span, .font-serif.italic {
        color: #D8B4FE !important;
        background: linear-gradient(135deg, #E9D5FF 0%, #C084FC 50%, #A855F7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      /* Primary Buttons */
      a[href*="register"], a[href*="signup"], a[href*="auth"], button.bg-brand, a.bg-brand, .bg-brand {
        background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%) !important;
        box-shadow: 0 4px 20px -2px rgba(139, 92, 246, 0.5) !important;
        color: #FFFFFF !important;
      }

      /* "See How It Works" button */
      a:has(svg.lucide-play), button:has(svg.lucide-play) {
        border-color: rgba(139, 92, 246, 0.3) !important;
      }

      /* Stats container card */
      div:has(> div > span:contains('50+')), div:has(> div:contains('50+')) {
        background: rgba(15, 17, 26, 0.75) !important;
        border: 1px solid rgba(139, 92, 246, 0.15) !important;
        backdrop-filter: blur(12px) !important;
      }

      /* Icons in feature cards & steps */
      .text-brand, svg.text-brand {
        color: #A855F7 !important;
      }
      .bg-brand\\/10, .bg-brand\\/20 {
        background-color: rgba(139, 92, 246, 0.15) !important;
      }

      /* Active Language pill */
      button.bg-brand, div.bg-brand {
        background: #7C3AED !important;
      }

      /* Testimonial Box */
      div:has(> p:contains('Kaption helped us reach')) {
        border-color: rgba(139, 92, 246, 0.35) !important;
        box-shadow: 0 0 30px -5px rgba(139, 92, 246, 0.2) !important;
      }
      div:has(> p:contains('Kaption helped us reach')) p {
        color: #C084FC !important;
      }
    `;
    document.head.appendChild(style);

    // Update button text to match user's image
    document.querySelectorAll('a, button').forEach(el => {
      if (el.textContent && el.textContent.includes('Try Kaption Free')) {
        el.textContent = el.textContent.replace('Try Kaption Free', 'Get Started');
      }
    });

    // Remove any theme toggle if present in header
    document.querySelectorAll('button').forEach(b => {
      if (b.querySelector('svg.lucide-sun') || b.querySelector('svg.lucide-moon')) {
        b.remove();
      }
    });
  });

  // Smooth scroll through entire page to load all sections & Framer Motion transitions
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 250;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });

  await new Promise(r => setTimeout(r, 1500));

  // Ensure top scroll
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    // Double check cookie banner removal
    document.querySelectorAll('div').forEach(d => {
      if (d.textContent && (d.textContent.includes('Your cookie choices') || d.textContent.includes('Accept functional'))) {
        d.remove();
      }
    });
  });
  await new Promise(r => setTimeout(r, 600));

  // 1. Full Page Screenshot
  const fullPagePath = path.resolve('scratch/test-purple-full.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('Saved test purple full page:', fullPagePath);

  // 2. Desktop Hero Viewport Screenshot (1440x900)
  const heroPath = path.resolve('scratch/test-purple-hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved test purple hero:', heroPath);

  await browser.close();
}

capturePurpleKaption().catch(e => {
  console.error(e);
  process.exit(1);
});
