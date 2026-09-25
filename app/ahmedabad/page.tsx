import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/ahmedabad"]);

export default function AhmedabadLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Ahmedabad"
      slug="ahmedabad"
      parentRegion={[
        { name: "India", href: "/india" },
        { name: "Gujarat", href: "/gujarat" },
      ]}
      badge="COMMERCIAL CAPITAL & TECH HUB • SERVING AHMEDABAD"
      headlineRegular="Full-Stack Creative Agency &"
      headlineItalic="Digital Studio for Ahmedabad"
      heroDescription="Lucie Creatives operates as a premier creative agency serving businesses in Ahmedabad. As Gujarat's commercial and technological heartbeat, Ahmedabad demands uncompromising digital execution. We partner with tech founders, GIFT City financial platforms, healthcare pioneers, and consumer brands to deliver world-class web development in Ahmedabad, high-retention video editing in Ahmedabad, monolithic graphic design in Ahmedabad, and distinctive logo design in Ahmedabad."
      marketContextTitle="WHY BUSINESSES IN AHMEDABAD PARTNER WITH US"
      marketContextSubtitle="Tailored digital solutions engineered for Ahmedabad's rapid-scaling startup ecosystem, GIFT City fintech, and modern retail brands."
      marketPillars={[
        {
          title: "GIFT City Fintech & High-Trust Web Systems",
          description:
            "Why fintechs need our web development in Ahmedabad: We build institutional-grade Next.js platforms, client investment portals, and secure web applications with WCAG 2.1 AA accessibility and sub-second load times for financial compliance.",
          tag: "Web Development",
        },
        {
          title: "D2C Brands & Viral Social Video Engines",
          description:
            "Why consumer founders rely on our video editing in Ahmedabad: We turn consumer products into viral sensations across Instagram reels and TikTok through sub-1-second psychological hooks, kinetic subtitles, and rapid 24-48h turnaround sprints.",
          tag: "Video Editing",
        },
        {
          title: "Modern Startup Branding & Visual Identity",
          description:
            "Why tech ventures seek our logo design in Ahmedabad: We build timeless geometric logomarks, pitch decks, and comprehensive brand books that help founders close seed and Series A venture funding rounds.",
          tag: "Logo & Branding",
        },
      ]}
      services={[
        {
          name: "Web Development Ahmedabad",
          href: "/web-development",
          description: "High-speed Next.js web applications, client portals, and headless Shopify storefronts for Ahmedabad companies.",
          deliverable: "Next.js Web Apps • Headless Shopify • 95+ PageSpeed",
        },
        {
          name: "Video Editing Ahmedabad",
          href: "/video-editing",
          description: "Viral 9:16 Instagram reels, founder interviews, investor pitch videos, and commercial brand films.",
          deliverable: "Viral Reels • Commercial Cutdowns • Sound Design",
        },
        {
          name: "Graphic Design Ahmedabad",
          href: "/graphic-design",
          description: "Marketing creatives, corporate brochures, investor decks, and digital advertising collateral.",
          deliverable: "Marketing Creatives • Pitch Decks • Print Collateral",
        },
        {
          name: "Logo Design Ahmedabad",
          href: "/logo-design",
          description: "Bespoke custom business logos and mathematical identity symbols crafted for longevity.",
          deliverable: "Vector Master Suite • Responsive Favicons • Guidelines",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "High-fidelity Figma prototypes, SaaS dashboard workflows, and native mobile interfaces.",
          deliverable: "Figma Design Systems • Interactive Prototypes • Token Specs",
        },
        {
          name: "Social Media Design",
          href: "/social-media-design",
          description: "Data-driven LinkedIn carousels, striking Instagram feed systems, and paid ad sets.",
          deliverable: "Multi-Slide Carousels • Ad Creatives • Figma Templates",
        },
      ]}
      caseStudySlugs={[
        "nirva-resort-cinema-commercial",
        "vedam-villas-influencer-tour",
        "maruti-buildcon-construction-master",
        "maruti-buildcon-vertical-reels",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives collaborate with clients as a creative agency in Ahmedabad?",
          a: "We work directly with Ahmedabad founders and marketing executives through our agile, remote-first sprint model. We communicate via dedicated Slack/WhatsApp channels, host weekly video strategy reviews, and provide live Figma review workspaces for immediate, transparent iterations without geographic friction.",
        },
        {
          q: "What makes your web development in Ahmedabad stand out for startups and fintechs?",
          a: "Unlike local agencies offering generic WordPress themes, our web development in Ahmedabad is built on Next.js, React, and TypeScript. This delivers sub-second speeds, top-tier security for financial platforms, and 95+ Core Web Vitals scores.",
        },
        {
          q: "What types of video editing in Ahmedabad do you handle?",
          a: "We produce high-retention 9:16 Instagram reels, TikToks, YouTube shorts, long-form YouTube editing, founder interviews, and cinematic commercial brand films complete with DaVinci Resolve color grading.",
        },
        {
          q: "Can you design marketing collateral and graphic design in Ahmedabad for fundraising?",
          a: "Yes. Our graphic design services regularly produce high-stakes investor pitch decks, product one-pagers, technical infographics, and digital marketing creatives for venture-backed teams.",
        },
        {
          q: "Do you offer custom logo design in Ahmedabad with full source files?",
          a: "Yes. Every logo design project includes full master vector files (.AI, .EPS, .SVG, .PDF), responsive favicon sets, and 100% intellectual property ownership transfer.",
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
          name: "Gujarat",
          href: "/gujarat",
          description: "State-wide industrial powerhouses, manufacturing conglomerates, and export leaders.",
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
