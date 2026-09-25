import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/global"]);

export default function GlobalLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Global"
      slug="global"
      badge="INTERNATIONAL DIGITAL PARTNER • SERVING WORLDWIDE"
      headlineRegular="Full-Service Creative Agency &"
      headlineItalic="Digital Studio Serving Global Brands"
      heroDescription="Lucie Creatives is an international creative digital agency serving ambitious enterprises, venture-backed tech startups, and expanding consumer brands across the United States, United Kingdom, Europe, United Arab Emirates, Australia, and worldwide. Born in Gujarat and calibrated to rigorous global engineering benchmarks, we deliver production-grade web development, cinema-grade video editing, monolithic graphic design, custom logo design, and strategic branding through an agile, asynchronous sprint model with seamless multi-timezone overlap."
      marketContextTitle="WHY INTERNATIONAL CLIENTS PARTNER WITH US"
      marketContextSubtitle="Global creative engineering calibrated for North American enterprises, European innovators, Middle Eastern luxury brands, and high-velocity SaaS scale-ups."
      marketPillars={[
        {
          title: "Global Web Engineering & Edge Cloud Architecture",
          description:
            "We engineer enterprise Next.js and React web applications distributed across global edge CDN networks with sub-second TTFB, 95+ Core Web Vitals, and WCAG 2.1 AA accessibility. From headless multi-currency Shopify storefronts to secure SaaS client dashboards, our web development delivers an unfair technical advantage for businesses operating on the global stage.",
          tag: "Web Engineering",
        },
        {
          title: "Cinema-Grade Video Post-Production & Viral Retention",
          description:
            "We produce cinema-grade 4K brand films, commercial advertisements, and high-retention 9:16 short-form video engines (Instagram Reels, YouTube Shorts, TikTok) driving 40M+ organic views worldwide. Every frame features DaVinci Resolve color grading, custom sound design, and psychological hook frameworks calibrated for international audience engagement.",
          tag: "Video & Motion",
        },
        {
          title: "International Brand Identity & Multi-Market Positioning",
          description:
            "We build monolithic visual identity systems, trademark-ready golden-ratio logomarks, comprehensive 80+ page brand books, and export-compliant packaging architecture. Engineered to establish immediate category authority and investor credibility across Western and Eastern markets alike.",
          tag: "Branding & Systems",
        },
        {
          title: "Frictionless Asynchronous Sprints & Multi-Timezone Overlap",
          description:
            "Our collaboration model eliminates timezone friction across PST (San Francisco), EST (New York), GMT (London), GST (Dubai), and IST (Mumbai). Utilizing dedicated Slack/WhatsApp channels, daily Loom video walkthroughs, and live Figma/Frame.io workspaces, we guarantee sub-24h turnaround and transparent sprint velocity.",
          tag: "Async Delivery",
        },
      ]}
      services={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "Custom Next.js web applications, headless Shopify commerce, enterprise SaaS portals, and global edge-optimized landing pages.",
          deliverable: "Next.js 15 • Global Edge CDN • 95+ PageSpeed",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Monolithic visual systems, export packaging dielines, corporate brochures, investor decks, and international marketing collateral.",
          deliverable: "Brand Systems • Export Packaging • Print Masters",
        },
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "Cinema-grade 4K brand films, high-retention vertical reels, YouTube content engines, and commercial motion advertisements.",
          deliverable: "4K Brand Films • 9:16 Viral Reels • Sound Foley",
        },
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Golden-ratio logomarks, typography lockups, responsive favicons, and trademark-ready vector deliverables with full IP transfer.",
          deliverable: "Vector Master Suite • Responsive Favicons • Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "End-to-end brand identity architecture, international positioning strategy, color psychology, and comprehensive brand guideline books.",
          deliverable: "Brand Identity Book • Color Systems • Tone of Voice",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "Figma enterprise design systems, interactive prototypes, SaaS dashboard interfaces, and conversion-optimized mobile UX.",
          deliverable: "Figma Token Systems • Interactive Prototypes • Specs",
        },
        {
          name: "Social Media Design",
          href: "/social-media-design",
          description: "High-converting multi-platform social media design, paid ad creative suites, carousel storytelling, and aesthetic feed templates.",
          deliverable: "Paid Ad Creative Sets • Carousels • Feed Systems",
        },
      ]}
      caseStudySlugs={[
        "vedam-villas-influencer-tour",
        "vanguard-design-system",
        "nirva-resort-cinema-commercial",
        "kuro-luxury-identity",
        "maruti-buildcon-construction-master",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives collaborate with international clients across different time zones?",
          a: "We operate a battle-tested asynchronous collaboration framework with active overlap across major international business hours. With key touchpoints across San Francisco (PST), New York (EST), London (GMT), Dubai (GST), and Mumbai (IST), we coordinate via dedicated Slack channels, structured Loom video walk-throughs, and collaborative Figma & Frame.io boards. We guarantee sub-24-hour turnaround on revisions and hold scheduled weekly video strategy sessions.",
        },
        {
          q: "What are the commercial and cost advantages of partnering with Lucie Creatives globally?",
          a: "Partnering with Lucie Creatives gives you Silicon Valley- and London-grade digital craft—Next.js engineering, cinema DaVinci Resolve post-production, and mathematical brand identity systems—at highly competitive international agency rates. You gain senior founder-led execution without the bloated overhead or bureaucratic delays of legacy Western agencies.",
        },
        {
          q: "What global web development technologies and standards do you build with?",
          a: "We engineer custom digital solutions using Next.js, React, TypeScript, Tailwind CSS, and edge-native architectures deployed on Vercel and AWS. Every build guarantees sub-second load times, 95+ Google Lighthouse scores, WCAG 2.1 AA accessibility compliance, and enterprise-grade SEO structured data.",
        },
        {
          q: "How do you handle international payments, contracts, and commercial confidentiality?",
          a: "We offer frictionless international invoicing and accept wire transfers, Stripe, and multi-currency payments in USD ($), GBP (£), EUR (€), and AED (د.إ). We routinely execute bilateral Non-Disclosure Agreements (NDAs) before discovery, and full commercial copyright and IP ownership transfer automatically upon final milestone signoff.",
        },
        {
          q: "Can you handle multilingual graphic design and international export packaging?",
          a: "Yes. Our graphic design and packaging teams produce print-ready packaging dielines, regulatory compliance labels, and multilingual marketing collateral tailored to international markets across the US, UK, European Union, and Middle East.",
        },
        {
          q: "What is your typical sprint turnaround time for global projects?",
          a: "Individual design deliverables, ad creatives, and short-form video edits typically complete in 24 to 48 hours. Comprehensive brand books, full design systems, and custom Next.js web applications are delivered in agile 2 to 5-week phased milestones with continuous deployment previews.",
        },
      ]}
      sisterLocations={[
        {
          name: "Gujarat",
          href: "/gujarat",
          description: "State-wide industrial powerhouses, global exporters, and manufacturing conglomerates.",
        },
        {
          name: "India",
          href: "/india",
          description: "Nationwide creative digital agency serving tech corridors and enterprises across India.",
        },
        {
          name: "Mumbai",
          href: "/mumbai",
          description: "Financial capital, BFSI institutions, entertainment media, and VC-backed scaleups.",
        },
        {
          name: "Ahmedabad",
          href: "/ahmedabad",
          description: "Commercial capital, GIFT City fintech innovators, and scaling tech founders.",
        },
        {
          name: "Surat",
          href: "/surat",
          description: "Global diamond trading capital, textile dynasties, and high-growth D2C brands.",
        },
        {
          name: "Bengaluru",
          href: "/bengaluru",
          description: "India's Silicon Valley, SaaS unicorns, and deep-tech innovators.",
        },
        {
          name: "Delhi",
          href: "/delhi",
          description: "National capital region, enterprise headquarters, and media organizations.",
        },
      ]}
    />
  );
}
