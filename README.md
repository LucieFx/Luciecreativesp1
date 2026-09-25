# Lucie Creatives — Digital Creative & Growth Agency

> **WE MAKE BRANDS IMPOSSIBLE TO IGNORE.**

Lucie Creatives is a premium digital creative and growth agency website built with Next.js App Router, React Three Fiber (Depth Stack 3D WebGL), TypeScript, Tailwind CSS, GSAP ScrollTrigger animations, and Lenis smooth scrolling.

---

## 🚀 Features

- **Cinematic Experience**: Smooth Lenis scrolling with custom magnetic physics buttons, clip-path reveals, marquee tickers, responsive GSAP animations, and 3D WebGL camera depth.
- **Brand Identity**: Signature LC logo mark and modern burgundy `#8B1A1A` / white `#FFFFFF` visual identity.
- **Lead Generation System**: Interactive contact inquiry form with Zod schema validation, honeypot anti-spam, and direct email delivery via Resend / SMTP to `hello@luciecreatives.in`.
- **Careers Portal**: Dynamic role pages (`/careers/[slug]`) and CV application pipeline with file upload validation and instant leadership notifications.
- **High-Performance Architecture**: Static site generation (SSG) with optimized Core Web Vitals and sub-second page loads.
- **Responsive & Accessible**: Designed for Desktop (1440px+), Tablet (768px+), and Mobile (320px+) with built-in `prefers-reduced-motion` fallbacks.
- **SEO & Structured Data**: Complete OpenGraph, Twitter Cards, XML Sitemap, Robots.txt, and JSON-LD Schema (`OfferCatalog`, `BreadcrumbList`, `FAQPage`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **3D & Animation**: Three.js, @react-three/fiber, GSAP 3, Framer Motion, Lenis Smooth Scroll
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Email & Delivery**: Resend, Nodemailer
- **Validation**: Zod
- **Icons**: Lucide React
- **Hosting & CI/CD**: Vercel

---

## 📦 Local Development

### 1. Requirements
- Node.js 20.x+
- npm

### 2. Installation

```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables

Create `.env` based on `.env.example`:

```env
NEXT_PUBLIC_SITE_URL="https://luciecreatives.in"
RESEND_API_KEY="" # Optional for automated email notifications
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

```bash
# Validate TypeScript and create optimized production bundle
npm run build

# Start production server locally
npm run start
```

---

## 🌐 Vercel Deployment & Branch Workflow

The repository is configured for automated CI/CD deployment on **Vercel**:

### Branch Strategy
- **`main` Branch (Production)**:
  - Deploys automatically to the production domain: `https://luciecreatives.in` (and `https://www.luciecreatives.in`).
  - Production deployments use production environment variables (`RESEND_API_KEY`, etc.).
- **`staging` Branch (Preview / Testing)**:
  - Deploys automatically to a preview staging domain: `https://staging.luciecreatives.in` or Vercel preview URL.
  - Used by the team and stakeholders to review animations, 3D performance, and copy before merging to production.
- **Feature Branches**:
  - Open a Pull Request targeting `staging`.
  - Vercel generates an ephemeral Preview URL for each PR.
  - Once verified on the staging deployment, merge `staging` into `main` to push live without downtime.

---

## ✉️ Official Contact Information

- **Official Email**: `hello@luciecreatives.in`
- **Social Accounts**: Instagram, X, LinkedIn, YouTube (`@luciecreatives`)
