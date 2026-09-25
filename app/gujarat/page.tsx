import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/gujarat"]);

export default function GujaratLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Gujarat"
      slug="gujarat"
      parentRegion={{ name: "India", href: "/india" }}
      badge="ENTERPRISE DIGITAL PARTNER • SERVING GUJARAT"
      headlineRegular="Full-Service Creative Agency &"
      headlineItalic="Digital Studio for Gujarat"
      heroDescription="Lucie Creatives is an elite creative agency serving businesses in Gujarat. From industrial manufacturing conglomerates to high-growth consumer brands across the state, we provide world-class web development in Gujarat, monolithic graphic design in Gujarat, cinema-grade video editing in Gujarat, and timeless logo design in Gujarat via an agile, remote-first collaboration model."
      marketContextTitle="WHY BUSINESSES IN GUJARAT PARTNER WITH US"
      marketContextSubtitle="Tailored creative engineering designed for Gujarat's high-stakes manufacturing, global export prestige, and digital modernization."
      marketPillars={[
        {
          title: "Industrial & Manufacturing Digital Modernization",
          description:
            "Why industrial businesses in Gujarat choose our web development: We upgrade traditional industrial websites into fast, responsive Next.js platforms with interactive 3D product cutaways, downloadable technical datasheets, and seamless RFQ lead generation funnels.",
          tag: "Web Engineering",
        },
        {
          title: "Global Export Brand Positioning & Packaging",
          description:
            "Why exporters require top-tier graphic design in Gujarat: We enable international exporters to win lucrative contracts with refined multilingual brand books, compliant packaging architecture, and premium corporate presentation decks.",
          tag: "Graphic Systems",
        },
        {
          title: "High-Volume Media & Video Production Engines",
          description:
            "Why brands rely on our video editing in Gujarat: Delivering dozens of cinema-grade corporate overview films, factory drone edit cutdowns, and viral short-form social reels every month to maintain unstoppable digital momentum.",
          tag: "Video Production",
        },
      ]}
      services={[
        {
          name: "Web Development Gujarat",
          href: "/web-development",
          description: "High-speed Next.js web applications, client portals, and secure enterprise infrastructure for Gujarat businesses.",
          deliverable: "Next.js Web Apps • Custom CMS • 95+ PageSpeed",
        },
        {
          name: "Graphic Design Gujarat",
          href: "/graphic-design",
          description: "Monolithic visual systems, export packaging dielines, corporate brochures, and large-format exhibition graphics.",
          deliverable: "Packaging Systems • Brand Books • Marketing Collateral",
        },
        {
          name: "Video Editing Gujarat",
          href: "/video-editing",
          description: "4K corporate films, factory tour documentaries, YouTube content, and high-retention vertical reels.",
          deliverable: "Cinema Commercials • 9:16 Social Reels • Sound Foley",
        },
        {
          name: "Logo Design Gujarat",
          href: "/logo-design",
          description: "Timeless custom business logos and mathematical identity emblems engineered for multi-decade brand equity.",
          deliverable: "Vector Master Suite • Responsive Favicons • Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Comprehensive corporate identity, typography standards, and market positioning strategy.",
          deliverable: "Brand Identity Book • Color Tokens • Executive Decks",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "Intuitive interfaces for enterprise SaaS, ERP portals, and digital customer journeys.",
          deliverable: "Figma Design Systems • Interactive Prototypes • Specs",
        },
      ]}
      caseStudySlugs={[
        "nirva-resort-cinema-commercial",
        "vedam-villas-influencer-tour",
        "maruti-buildcon-construction-master",
        "kuro-luxury-identity",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives serve businesses as a creative agency in Gujarat?",
          a: "We provide senior-level creative agency services to businesses throughout Gujarat via an agile, remote-first sprint framework. We communicate via dedicated Slack/WhatsApp channels, host weekly video strategy reviews, and use collaborative cloud workspaces on Figma and Frame.io for instantaneous feedback and transparent execution.",
        },
        {
          q: "What makes your web development in Gujarat different from local IT vendors?",
          a: "Most traditional agencies in Gujarat rely on slow, outdated WordPress templates with heavy third-party plugins. We engineer custom web development in Gujarat using modern Next.js, React, and TypeScript—delivering sub-second load speeds, 95+ Lighthouse scores, and zero security vulnerabilities.",
        },
        {
          q: "Can you produce graphic design in Gujarat that complies with global export standards?",
          a: "Yes. Our graphic design services specialize in export-grade packaging dielines, multi-language product brochures (English, European languages, Hindi, Gujarati), and trade show exhibition graphics that meet international commercial standards.",
        },
        {
          q: "What kinds of video editing in Gujarat do you handle for manufacturing companies?",
          a: "We handle corporate documentary films, factory machinery walkthroughs, customer case study videos, and high-retention vertical short-form reels for LinkedIn and Instagram, complete with DaVinci Resolve color grading and custom sound design.",
        },
        {
          q: "Do you offer custom logo design in Gujarat with trademark protection?",
          a: "Yes. Every logo design project is constructed from scratch on mathematical golden ratio grids, accompanied by reverse image clearance checks to ensure your mark is distinctive and trademark-ready.",
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
          name: "Ahmedabad",
          href: "/ahmedabad",
          description: "Commercial capital, fintech hub (GIFT City), healthcare pioneers, and startup innovators.",
        },
        {
          name: "Surat",
          href: "/surat",
          description: "Global diamond trading capital, textile powerhouse, and rapidly expanding D2C retail brands.",
        },
      ]}
    />
  );
}
