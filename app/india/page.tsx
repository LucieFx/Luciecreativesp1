import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/india"]);

export default function IndiaLocationPage() {
  return (
    <LocationPageTemplate
      locationName="India"
      slug="india"
      badge="NATIONWIDE CREATIVE PARTNER • SERVING INDIA"
      headlineRegular="Video Editing & Web Development"
      headlineItalic="Agency in India"
      heroDescription="Lucie Creatives is a creative digital agency serving businesses across India. From high-growth SaaS ventures and enterprise conglomerates to emerging consumer brands and established industrial exporters, we deliver world-class web development, graphic design, video editing, logo design, branding, and UI/UX design through an agile, remote-first collaboration model that transcends geographic boundaries."
      marketContextTitle="WHY BUSINESSES ACROSS INDIA PARTNER WITH US"
      marketContextSubtitle="Nationwide creative engineering calibrated for India's diverse commercial landscape — from silicon corridors and financial hubs to industrial powerhouses and emerging digital economies."
      marketPillars={[
        {
          title: "Enterprise Digital Transformation & Web Engineering",
          description:
            "We architect custom Next.js web applications, enterprise portals, and headless e-commerce platforms for businesses across India. Our web development combines sub-second load times, 95+ Lighthouse scores, and WCAG 2.1 AA accessibility — delivering measurable competitive advantages for companies operating at national scale.",
          tag: "Web Development",
        },
        {
          title: "National Brand Identity & Visual Systems",
          description:
            "Our graphic design and branding services help Indian businesses build cohesive visual identities that resonate across diverse regional markets. From comprehensive brand books and packaging architecture to investor pitch decks and multilingual marketing collateral, we create design systems engineered for pan-India recognition.",
          tag: "Branding & Design",
        },
        {
          title: "High-Retention Video Content & Social Media Engines",
          description:
            "We produce cinema-grade corporate films, high-retention Instagram Reels, YouTube long-form content, and social media video strategies for brands targeting audiences across India. Our video editing combines DaVinci Resolve color grading, custom sound design, and algorithmic pacing frameworks that maximize watch-through rates.",
          tag: "Video & Social Media",
        },
      ]}
      services={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "Custom Next.js web applications, enterprise portals, headless Shopify storefronts, and SEO-optimized landing pages for businesses across India.",
          deliverable: "Next.js Platforms • Headless Commerce • 95+ PageSpeed",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Marketing creatives, packaging systems, corporate brochures, trade show graphics, and multilingual visual communication assets.",
          deliverable: "Marketing Collateral • Packaging • Print Masters",
        },
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "Corporate brand films, Instagram Reels, YouTube content, promotional commercials, and high-retention social media video strategies.",
          deliverable: "Brand Films • 9:16 Reels • Sound Design",
        },
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Mathematical logomarks, responsive favicon systems, and complete identity packages with trademark-ready vector deliverables.",
          deliverable: "Vector Master Suite • Favicons • Brand Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "End-to-end brand identity systems, market positioning strategy, typography hierarchies, and comprehensive brand guideline books.",
          deliverable: "Brand Identity Book • Color Systems • Tone of Voice",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "Figma design systems, interactive prototypes, SaaS dashboard interfaces, and mobile-first responsive user experiences.",
          deliverable: "Figma Systems • Interactive Prototypes • Design Tokens",
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
          q: "How does Lucie Creatives serve businesses across India as a creative digital agency?",
          a: "We operate as a fully remote creative agency serving businesses across India through structured agile sprint cycles. Our collaboration model includes dedicated Slack and WhatsApp channels, weekly video strategy reviews, live Figma and Frame.io workspaces, and transparent milestone tracking — ensuring seamless execution regardless of your location within India.",
        },
        {
          q: "What types of web development does Lucie Creatives provide for Indian businesses?",
          a: "We build custom Next.js and React web applications, headless Shopify e-commerce storefronts, enterprise client portals, and high-conversion landing pages. Every project achieves sub-second load speeds, 95+ Google Lighthouse scores, mobile-first responsive design, and built-in SEO architecture.",
        },
        {
          q: "Can Lucie Creatives handle graphic design projects for businesses operating across multiple Indian cities?",
          a: "Yes. Our graphic design services support businesses operating across multiple Indian markets with unified visual systems, multilingual collateral (English, Hindi, Gujarati, and other regional languages), scalable brand guidelines, and production-ready packaging architecture coordinated with your print partners.",
        },
        {
          q: "What video editing services does Lucie Creatives offer for Indian brands?",
          a: "We produce high-retention Instagram Reels, YouTube long-form and short-form content, corporate brand films, product commercials, founder interview series, and event documentation — all with DaVinci Resolve color grading, custom sound design, and algorithmic pacing optimized for Indian audience engagement patterns.",
        },
        {
          q: "Does Lucie Creatives offer branding and logo design services for startups across India?",
          a: "Yes. We create comprehensive brand identity systems including custom logomarks on mathematical golden-ratio grids, typography hierarchies, color systems, investor pitch decks, and full brand guideline books. Every logo project includes vector master files, responsive favicons, and intellectual property ownership transfer.",
        },
      ]}
      sisterLocations={[
        {
          name: "Global",
          href: "/global",
          description: "International creative digital agency serving US, UK, UAE, and worldwide brands.",
        },
        {
          name: "Gujarat",
          href: "/gujarat",
          description: "State-wide industrial powerhouses, global exporters, and manufacturing conglomerates.",
        },
        {
          name: "Ahmedabad",
          href: "/ahmedabad",
          description: "Commercial capital, GIFT City fintech hub, healthcare pioneers, and startup innovators.",
        },
        {
          name: "Surat",
          href: "/surat",
          description: "Global diamond trading capital, textile powerhouse, and expanding D2C retail brands.",
        },
        {
          name: "Mumbai",
          href: "/mumbai",
          description: "Financial capital, Bollywood media, corporate headquarters, and venture-funded startups.",
        },
        {
          name: "Delhi",
          href: "/delhi",
          description: "National capital region, government enterprises, media conglomerates, and policy-driven innovation.",
        },
        {
          name: "Bengaluru",
          href: "/bengaluru",
          description: "India's silicon valley, SaaS unicorns, deep-tech startups, and global IT services.",
        },
      ]}
    />
  );
}
