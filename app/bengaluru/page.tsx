import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/bengaluru"]);

export default function BengaluruLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Bengaluru"
      slug="bengaluru"
      parentRegion={{ name: "India", href: "/india" }}
      badge="INDIA'S TECHNOLOGY CAPITAL • SERVING BENGALURU"
      headlineRegular="Video Editing & Web Development"
      headlineItalic="Agency in Bengaluru"
      heroDescription="Lucie Creatives serves businesses in Bengaluru (Bangalore) with precision-engineered creative and digital services. As India's undisputed technology capital and the home of SaaS unicorns, deep-tech research, and globally funded startups, Bengaluru demands technical rigor and design excellence. We partner with product-led SaaS companies, AI ventures, enterprise software firms, and technology-enabled consumer brands to deliver high-performance web development, modern graphic design, high-retention video editing, and scalable brand identity systems."
      marketContextTitle="WHY BUSINESSES IN BENGALURU PARTNER WITH US"
      marketContextSubtitle="Creative engineering built for Bengaluru's product-led SaaS ecosystem, deep-tech innovation, venture-funded growth, and globally distributed engineering culture."
      marketPillars={[
        {
          title: "SaaS Product Design & Web Application Engineering",
          description:
            "Bengaluru's SaaS companies need pixel-perfect interfaces and blazing-fast web applications. Our web development for businesses in Bengaluru delivers Next.js product dashboards, interactive onboarding flows, and design systems with token-based architecture — enabling product teams to ship faster with consistent brand quality.",
          tag: "Web & Product",
        },
        {
          title: "Startup Fundraising & Venture Pitch Assets",
          description:
            "We produce investor-grade branding and graphic design for Bengaluru's venture-backed startups — from Series A pitch decks and product demo videos to comprehensive brand identity books and digital advertising creative that communicate traction and market authority.",
          tag: "Branding & Fundraising",
        },
        {
          title: "Developer Marketing & Technical Content Production",
          description:
            "Bengaluru's developer-centric ecosystem demands technical credibility. Our video editing and content production services create developer conference talks, API product walkthrough videos, technical blog illustration systems, and high-retention social content tailored for engineering and product audiences.",
          tag: "Developer Content",
        },
      ]}
      services={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "SaaS product dashboards, Next.js web applications, developer documentation platforms, and interactive landing pages for Bengaluru tech companies.",
          deliverable: "SaaS Dashboards • Next.js Platforms • Design System Integration",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Investor pitch decks, product marketing collateral, developer conference materials, and digital advertising creative.",
          deliverable: "Pitch Decks • Product Marketing • Conference Materials",
        },
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "Product demo videos, developer conference recordings, founder interview series, and high-retention social reels for tech audiences.",
          deliverable: "Product Demos • Conference Talks • Social Reels",
        },
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Clean geometric SaaS logomarks, developer tool icons, and scalable identity systems engineered for digital-first products.",
          deliverable: "SaaS Logomarks • Web Favicons • Vector Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Product-led brand strategy, SaaS positioning frameworks, developer community identity, and comprehensive brand guidelines.",
          deliverable: "Product Brand Book • SaaS Positioning • Developer Identity",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "SaaS dashboard UX, web portal interfaces, developer portal design, and component-driven Figma design systems.",
          deliverable: "SaaS UX • Figma Component Systems • Design Tokens",
        },
      ]}
      caseStudySlugs={[
        "vanguard-design-system",
        "vedam-villas-influencer-tour",
        "nirva-resort-cinema-commercial",
        "maruti-buildcon-construction-master",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives work with tech companies and startups in Bengaluru?",
          a: "We serve businesses in Bengaluru through structured agile sprints designed for fast-moving product teams. We integrate with your existing workflows via Slack, Linear, Figma, and Frame.io — providing weekly deliverable milestones, async Loom walkthroughs, and direct founder-level creative oversight.",
        },
        {
          q: "What types of web development does Lucie Creatives provide for Bengaluru SaaS companies?",
          a: "We build SaaS product dashboards, interactive onboarding flows, developer documentation platforms, marketing websites, and component-driven design systems using Next.js, React, and TypeScript. Every build achieves sub-second load times, 95+ Lighthouse scores, and token-based design consistency.",
        },
        {
          q: "Can Lucie Creatives create pitch decks and investor-ready branding for Bengaluru startups?",
          a: "Yes. Our graphic design and branding services produce high-stakes pitch decks, product one-pagers, brand identity books, and marketing collateral specifically designed for venture-backed Bengaluru startups raising Seed through Series B funding rounds.",
        },
        {
          q: "What video editing services are relevant for Bengaluru's tech ecosystem?",
          a: "We produce product demo and walkthrough videos, developer conference talk recordings, founder interview series, technical explainer animations, and high-retention social media content for LinkedIn, Twitter/X, and YouTube — all with professional color grading and sound design.",
        },
        {
          q: "Does Lucie Creatives have a physical office in Bengaluru?",
          a: "Lucie Creatives operates as a remote-first creative agency serving businesses in Bengaluru and across India. Our remote model is specifically designed for Bengaluru's globally distributed engineering culture — providing enterprise-grade execution with direct founder oversight and sub-24-hour response times.",
        },
      ]}
      sisterLocations={[
        {
          name: "Global",
          href: "/global",
          description: "International creative digital agency serving US, UK, UAE, and worldwide brands.",
        },
        {
          name: "India",
          href: "/india",
          description: "Nationwide creative agency services across all major Indian markets.",
        },
        {
          name: "Mumbai",
          href: "/mumbai",
          description: "Financial capital, entertainment industry, and venture-funded startups.",
        },
        {
          name: "Delhi",
          href: "/delhi",
          description: "National capital region, government enterprises, and media conglomerates.",
        },
      ]}
    />
  );
}
