import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generateUltraKaption() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=2',
    ]
  });

  const page = await browser.newPage();
  // Standard desktop viewport at 2x retina -> output is 2880px wide
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    // 1. Force dark mode
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // 2. Remove cookie banner & dev overlays
    document.querySelector('section[aria-label="Cookie consent"]')?.remove();
    document.querySelectorAll('nextjs-portal').forEach(el => el.remove());
    // Also remove any stray cookie elements
    document.querySelectorAll('section, div').forEach(el => {
      if (el.textContent && (el.textContent.includes('Your cookie choices') || el.textContent.includes('Accept functional'))) {
        el.remove();
      }
    });

    // 3. Remove theme toggle button in navbar
    document.querySelectorAll('header button, nav button').forEach(b => {
      if (b.querySelector('svg.lucide-sun') || b.querySelector('svg.lucide-moon')) {
        b.remove();
      }
    });

    // 4. Update texts to match user image exactly
    // Navbar button
    document.querySelectorAll('header a, nav a').forEach(a => {
      if (a.textContent && a.textContent.includes('Try Kaption Free')) {
        a.textContent = 'Get Started';
      }
    });

    // Hero buttons
    document.querySelectorAll('a, button').forEach(el => {
      if (el.textContent && el.textContent.includes('Try Kaption Free')) {
        el.innerHTML = 'Get Started &rarr;';
      }
    });

    // 5. Ensure all ScrollReveal / motion divs are 100% visible
    document.querySelectorAll('div[class*="transition-all"][class*="duration-1000"]').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-12');
      el.classList.add('opacity-100', 'translate-y-0');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // 6. Inject the exact luxurious purple dark design system
    const style = document.createElement('style');
    style.id = 'ultra-kaption-style';
    style.innerHTML = `
      :root, .dark {
        --primary: #8B5CF6 !important;
        --primary-hover: #7C3AED !important;
        --primary-active: #6D28D9 !important;
        --brand-light: rgba(139, 92, 246, 0.15) !important;
        --surface: #0E0F17 !important;
        --elevated-surface: #141520 !important;
        --secondary-surface: #12131C !important;
        --heading: #FFFFFF !important;
        --body-text: #94A3B8 !important;
        --muted-text: #64748B !important;
        --border: #1E202E !important;
        --divider: #1E202E !important;
      }

      body {
        background-color: #08090E !important;
        background-image: 
          radial-gradient(circle at 50% 12%, rgba(139, 92, 246, 0.18) 0%, transparent 55%),
          radial-gradient(circle at 85% 45%, rgba(124, 58, 237, 0.1) 0%, transparent 45%),
          radial-gradient(circle at 15% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
          linear-gradient(to right, rgba(139, 92, 246, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.04) 1px, transparent 1px) !important;
      }

      /* Pill Badge above hero */
      div:has(> svg.lucide-sparkles) {
        border: 1px solid rgba(139, 92, 246, 0.35) !important;
        background: rgba(139, 92, 246, 0.08) !important;
        color: #C4B5FD !important;
        box-shadow: 0 0 20px -3px rgba(139, 92, 246, 0.2) !important;
      }
      div:has(> svg.lucide-sparkles) svg {
        color: #A78BFA !important;
      }

      /* Hero Italic Gradient Serif */
      h1 span.font-serif, h2 span.font-serif {
        color: #D8B4FE !important;
        background: linear-gradient(135deg, #F3E8FF 0%, #D8B4FE 40%, #C084FC 75%, #A855F7 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }

      /* Primary CTAs (Get Started) */
      header a[href*="login"], nav a[href*="login"], a.bg-brand, button.bg-brand {
        background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%) !important;
        color: #FFFFFF !important;
        box-shadow: 0 4px 25px -2px rgba(124, 58, 237, 0.5) !important;
        border: none !important;
      }

      /* Secondary CTA (See How It Works) */
      button:has(svg.lucide-play) {
        background: rgba(14, 15, 23, 0.85) !important;
        border: 1px solid rgba(139, 92, 246, 0.25) !important;
        color: #FFFFFF !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
      }
      button:has(svg.lucide-play) svg {
        color: #A78BFA !important;
      }

      /* Stats Container Card */
      .border-theme-divider {
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        background: rgba(14, 15, 24, 0.85) !important;
        border-radius: 20px !important;
        padding: 32px 28px !important;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        backdrop-filter: blur(12px) !important;
      }
      .border-theme-divider span.text-4xl {
        color: #FFFFFF !important;
        font-weight: 700 !important;
      }
      .border-theme-divider span.text-sm {
        color: #94A3B8 !important;
      }

      /* Feature Box Icons */
      .bg-brand-light {
        background: rgba(139, 92, 246, 0.12) !important;
        color: #A78BFA !important;
        border: 1px solid rgba(139, 92, 246, 0.2) !important;
      }
      .text-brand {
        color: #A78BFA !important;
      }

      /* Video Mockup Container */
      div:has(> div > video) {
        background: rgba(14, 15, 24, 0.95) !important;
        border: 1px solid rgba(139, 92, 246, 0.2) !important;
        box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(124, 58, 237, 0.15) !important;
      }
      /* Video play button */
      div:has(> svg.lucide-play.text-brand) {
        background: linear-gradient(135deg, #8B5CF6, #6D28D9) !important;
        box-shadow: 0 4px 25px rgba(124, 58, 237, 0.6) !important;
      }
      div:has(> svg.lucide-play.text-brand) svg {
        color: #FFFFFF !important;
      }

      /* Language pills in video mockup */
      button.bg-brand, div.bg-brand {
        background: #7C3AED !important;
        color: #FFFFFF !important;
      }

      /* Steps cards */
      div.w-20.h-20 {
        background: rgba(16, 17, 26, 0.9) !important;
        border: 1px solid rgba(139, 92, 246, 0.25) !important;
        box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.4) !important;
        color: #A78BFA !important;
      }

      /* Testimonial Box */
      div:has(> p[class*="italic"]) {
        border: 1px solid rgba(139, 92, 246, 0.35) !important;
        background: rgba(15, 17, 28, 0.75) !important;
        box-shadow: 0 0 35px -5px rgba(139, 92, 246, 0.2) !important;
      }
      div:has(> p[class*="italic"]) p {
        color: #C084FC !important;
      }
    `;
    document.head.appendChild(style);

    // Style step numbers and icons specifically via JS traversal
    document.querySelectorAll('h4').forEach(h4 => {
      const numSpan = h4.querySelector('span');
      if (numSpan && ['1', '2', '3', '4'].includes(numSpan.textContent?.trim() || '')) {
        numSpan.style.background = '#7C3AED';
        numSpan.style.color = '#FFFFFF';
        numSpan.style.borderRadius = '9999px';
      }
    });

    // Style step icons boxes
    document.querySelectorAll('div.w-20.h-20').forEach(box => {
      box.style.background = 'rgba(16, 17, 26, 0.9)';
      box.style.border = '1px solid rgba(139, 92, 246, 0.25)';
      box.style.color = '#A78BFA';
    });

    // Style active tab in languages
    document.querySelectorAll('button').forEach(b => {
      if (b.textContent && b.textContent.includes('South Asian')) {
        b.style.color = '#C084FC';
        b.style.borderBottom = '2px solid #8B5CF6';
      }
    });
  });

  // Smooth scroll all the way down to ensure all sections load and stay visible
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
      }, 70);
    });
  });

  await new Promise(r => setTimeout(r, 1800));

  // Reset scroll to top and ensure all sections are visible
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('div[class*="transition-all"][class*="duration-1000"]').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-12');
      el.classList.add('opacity-100', 'translate-y-0');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    // Double check cookie removal
    document.querySelector('section[aria-label="Cookie consent"]')?.remove();
  });
  await new Promise(r => setTimeout(r, 800));

  const scratchFull = path.resolve('scratch/ultra-kaption-full.png');
  await page.screenshot({ path: scratchFull, fullPage: true });
  console.log('Saved ultra full to:', scratchFull);

  const scratchHero = path.resolve('scratch/ultra-kaption-hero.png');
  await page.screenshot({ path: scratchHero });
  console.log('Saved ultra hero to:', scratchHero);

  await browser.close();
}

generateUltraKaption().catch(e => {
  console.error(e);
  process.exit(1);
});
