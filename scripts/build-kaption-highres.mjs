import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function buildHighResKaption() {
  console.log('🚀 Starting high-resolution capture of Kaption...');
  
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

  // -------------------------------------------------------------
  // Helper to inject the exact purple dark theme & layout styles
  // -------------------------------------------------------------
  async function applyPurpleTheme(page) {
    await page.evaluate(() => {
      // 1. Force dark mode
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');

      // 2. Remove cookie banner and any dev overlays
      document.querySelector('section[aria-label="Cookie consent"]')?.remove();
      document.querySelectorAll('nextjs-portal').forEach(el => el.remove());
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

      // 4. Fix Navbar buttons
      // Find all links in nav/header
      const navLinks = Array.from(document.querySelectorAll('header a, nav a'));
      navLinks.forEach(a => {
        const text = a.textContent?.trim() || '';
        if (text.includes('Try Kaption Free')) {
          a.textContent = 'Get Started';
          a.className = 'kaption-cta-header-btn';
        } else if (text === 'Log in') {
          a.className = 'kaption-login-link';
        }
      })      // 5. Hero button text
      document.querySelectorAll('a, button').forEach(el => {
        if (el.textContent && el.textContent.includes('Try Kaption Free')) {
          el.innerHTML = '<span>Get Started</span> <span style="font-size: 1.25rem; line-height: 1;">&rarr;</span>';
          el.className = 'kaption-cta-hero-btn';
        }
      });

      // 6. Ensure all ScrollReveal / motion divs are 100% visible
      document.querySelectorAll('div[class*="transition-all"][class*="duration-1000"]').forEach(el => {
        el.classList.remove('opacity-0', 'translate-y-12');
        el.classList.add('opacity-100', 'translate-y-0');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });

      // 7. Inject Custom CSS
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

        /* Remove distracting checkerboard background */
        .bg-grid-brand, [class*="bg-grid-brand"] {
          display: none !important;
        }

        body {
          background-color: #07080D !important;
          background-image: 
            radial-gradient(circle at 50% 12%, rgba(139, 92, 246, 0.16) 0%, transparent 60%),
            radial-gradient(circle at 85% 45%, rgba(124, 58, 237, 0.09) 0%, transparent 50%),
            radial-gradient(circle at 15% 75%, rgba(139, 92, 246, 0.07) 0%, transparent 50%) !important;
        }

        /* Navbar Styling */
        .kaption-login-link {
          color: #94A3B8 !important;
          font-weight: 500 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          margin-right: 1.25rem !important;
          padding: 0.5rem 0.75rem !important;
          display: inline-block !important;
          text-decoration: none !important;
        }
        .kaption-login-link:hover {
          color: #FFFFFF !important;
        }

        .kaption-cta-header-btn {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%) !important;
          color: #FFFFFF !important;
          font-weight: 600 !important;
          font-size: 0.8125rem !important;
          padding: 0.65rem 1.45rem !important;
          border-radius: 9999px !important;
          box-shadow: 0 4px 20px -2px rgba(124, 58, 237, 0.5) !important;
          border: none !important;
          display: inline-block !important;
          text-decoration: none !important;
        }

        /* Pill Badge above hero */
        div:has(> svg.lucide-sparkles) {
          border: 1px solid rgba(139, 92, 246, 0.35) !important;
          background: rgba(139, 92, 246, 0.08) !important;
          color: #C4B5FD !important;
          box-shadow: 0 0 20px -3px rgba(139, 92, 246, 0.2) !important;
          padding: 0.45rem 1.15rem !important;
          border-radius: 9999px !important;
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

        /* Primary Hero CTA (Get Started ->) */
        .kaption-cta-hero-btn {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%) !important;
          color: #FFFFFF !important;
          font-weight: 600 !important;
          font-size: 0.9375rem !important;
          padding: 0.85rem 2.25rem !important;
          border-radius: 9999px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          box-shadow: 0 4px 25px -2px rgba(124, 58, 237, 0.5) !important;
          border: none !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }

        /* Secondary Hero CTA (See How It Works) */
        button:has(svg.lucide-play) {
          background: rgba(14, 15, 23, 0.85) !important;
          border: 1px solid rgba(139, 92, 246, 0.25) !important;
          color: #FFFFFF !important;
          font-size: 0.9375rem !important;
          padding: 0.85rem 2.25rem !important;
          border-radius: 9999px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
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

      // Style step numbers and icons specifically
      document.querySelectorAll('h4').forEach(h4 => {
        const numSpan = h4.querySelector('span');
        if (numSpan && ['1', '2', '3', '4'].includes(numSpan.textContent?.trim() || '')) {
          numSpan.style.background = '#7C3AED';
          numSpan.style.color = '#FFFFFF';
          numSpan.style.borderRadius = '9999px';
        }
      });

      document.querySelectorAll('div.w-20.h-20').forEach(box => {
        box.style.background = 'rgba(16, 17, 26, 0.9)';
        box.style.border = '1px solid rgba(139, 92, 246, 0.25)';
        box.style.color = '#A78BFA';
      });

      // Active tab in languages
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent && b.textContent.includes('South Asian')) {
          b.style.color = '#C084FC';
          b.style.borderBottom = '2px solid #8B5CF6';
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 1. CAPTURE FULL DESKTOP SCREENSHOT (1440px width @ 2x retina)
  // -------------------------------------------------------------
  console.log('📸 Capturing Full Desktop Landing Page...');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await applyPurpleTheme(desktopPage);

  // Smooth scroll all the way to bottom to trigger animations and image loads
  await desktopPage.evaluate(async () => {
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

  await new Promise(r => setTimeout(r, 1500));

  // Ensure top scroll & elements fully visible
  await desktopPage.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('div[class*="transition-all"][class*="duration-1000"]').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-12');
      el.classList.add('opacity-100', 'translate-y-0');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelector('section[aria-label="Cookie consent"]')?.remove();
  });
  await new Promise(r => setTimeout(r, 800));

  const rawFullPng = path.resolve('scratch/kaption-full-raw.png');
  await desktopPage.screenshot({ path: rawFullPng, fullPage: true });
  console.log('✅ Captured full page PNG to:', rawFullPng);

  // -------------------------------------------------------------
  // 2. CAPTURE DESKTOP HERO VIEWPORT (1440x900 @ 2x retina)
  // -------------------------------------------------------------
  console.log('📸 Capturing Desktop Hero Viewport (1440x900)...');
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  const rawHeroPng = path.resolve('scratch/kaption-hero-raw.png');
  await desktopPage.screenshot({ path: rawHeroPng });
  console.log('✅ Captured desktop hero PNG to:', rawHeroPng);
  await desktopPage.close();

  // -------------------------------------------------------------
  // 3. CAPTURE MOBILE VIEWPORT (414x896 @ 2x retina)
  // -------------------------------------------------------------
  console.log('📸 Capturing Mobile Viewport (414x896)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 414, height: 896, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await applyPurpleTheme(mobilePage);

  await mobilePage.evaluate(async () => {
    window.scrollTo(0, 0);
    document.querySelectorAll('div[class*="transition-all"][class*="duration-1000"]').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-12');
      el.classList.add('opacity-100', 'translate-y-0');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelector('section[aria-label="Cookie consent"]')?.remove();
  });
  await new Promise(r => setTimeout(r, 800));

  const rawMobilePng = path.resolve('scratch/kaption-mobile-raw.png');
  await mobilePage.screenshot({ path: rawMobilePng });
  console.log('✅ Captured mobile PNG to:', rawMobilePng);
  await mobilePage.close();

  await browser.close();

  // -------------------------------------------------------------
  // 4. OPTIMIZE & WRITE TO BOTH PUBLIC DIRECTORIES
  // -------------------------------------------------------------
  console.log('⚙️ Optimizing with sharp and saving high-res PNG & WebP files...');

  const targets = [
    path.resolve('src/public/projects'),
    path.resolve('Luciecreativesp1/public/projects')
  ];

  for (const dir of targets) {
    if (!fs.existsSync(dir)) continue;

    console.log(`Writing assets to ${dir}...`);

    // 1. Full desktop PNG & WebP
    await sharp(rawFullPng)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(dir, 'kaption-full-desktop.png'));

    await sharp(rawFullPng)
      .webp({ quality: 92, effort: 6 })
      .toFile(path.join(dir, 'kaption-full-desktop.webp'));

    // Also update kaption-full.png
    await sharp(rawFullPng)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(dir, 'kaption-full.png'));

    // 2. Desktop Hero PNG & WebP
    await sharp(rawHeroPng)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(dir, 'kaption-desktop.png'));

    await sharp(rawHeroPng)
      .webp({ quality: 92, effort: 6 })
      .toFile(path.join(dir, 'kaption-desktop.webp'));

    // 3. Mobile PNG & WebP
    await sharp(rawMobilePng)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(dir, 'kaption-mobile.png'));

    await sharp(rawMobilePng)
      .webp({ quality: 92, effort: 6 })
      .toFile(path.join(dir, 'kaption-mobile.webp'));
  }

  console.log('🎉 All Kaption high-resolution previews successfully built and replaced!');
}

buildHighResKaption().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
