import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/mumbai"]);

export default function MumbaiLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Mumbai"
      slug="mumbai"
      parentRegion={{ name: "India", href: "/india" }}
      badge="FINANCIAL & ENTERTAINMENT CAPITAL • SERVING MUMBAI"
      headlineRegular="Video Editing & Web Development"
      headlineItalic="Agency in Mumbai"
      heroDescription="Lucie Creatives serves businesses in Mumbai with elite creative and digital services. As India's financial capital and entertainment powerhouse, Mumbai demands uncompromising speed, polish, and commercial impact. We partner with fintech platforms, media conglomerates, fashion labels, and venture-backed startups to deliver high-performance web development, cinematic video editing, strategic graphic design, and distinctive logo design for businesses across Mumbai."
      marketContextTitle="WHY BUSINESSES IN MUMBAI PARTNER WITH US"
      marketContextSubtitle="Creative execution engineered for Mumbai's high-velocity financial markets, entertainment industry, fashion commerce, and venture-backed startup ecosystem."
      marketPillars={[
        {
          title: "Fintech & Financial Services Web Platforms",
          description:
            "Mumbai's BFSI sector demands institutional-grade digital infrastructure. Our web development for businesses in Mumbai delivers secure Next.js platforms, real-time data dashboards, and compliance-ready client portals with sub-second response times and rigorous security architecture.",
          tag: "Web Development",
        },
        {
          title: "Entertainment, Fashion & Lifestyle Brand Content",
          description:
            "We produce high-retention video editing for brands in Mumbai's entertainment and fashion industries — from cinematic product launch films and celebrity interview edits to viral Instagram Reels and YouTube content that drives measurable audience growth and engagement.",
          tag: "Video & Content",
        },
        {
          title: "Corporate Identity & Investor-Ready Branding",
          description:
            "Mumbai's competitive funding landscape requires polished brand identities. Our graphic design and branding services create investor pitch decks, annual reports, corporate identity systems, and marketing collateral that help Mumbai businesses close funding rounds and win enterprise contracts.",
          tag: "Branding & Identity",
        },
      ]}
      services={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "High-performance Next.js web applications, fintech client portals, headless Shopify storefronts, and progressive web apps for Mumbai enterprises.",
          deliverable: "Next.js Sites • Fintech Portals • 95+ PageSpeed",
        },
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "Cinematic brand films, entertainment content, fashion lookbook videos, viral 9:16 Reels, and corporate documentary production.",
          deliverable: "Brand Films • Entertainment Edits • Social Reels",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Investor pitch decks, annual reports, advertising campaigns, fashion lookbooks, and high-impact marketing collateral.",
          deliverable: "Investor Decks • Ad Campaigns • Print Collateral",
        },
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Bespoke corporate logomarks, fashion brand wordmarks, and complete visual identity packages with trademark-ready vector deliverables.",
          deliverable: "Vector Master Suite • Fashion Marks • Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Comprehensive corporate brand strategy, market positioning, visual language systems, and brand guideline books.",
          deliverable: "Brand Identity Book • Positioning Strategy • Style Guide",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "Fintech dashboard interfaces, e-commerce checkout optimization, responsive web UX, and enterprise SaaS design systems.",
          deliverable: "Figma Systems • Web UX • Interactive Prototypes",
        },
      ]}
      caseStudySlugs={[
        "vedam-villas-influencer-tour",
        "nirva-resort-cinema-commercial",
        "kuro-luxury-identity",
        "maruti-buildcon-construction-master",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives work with businesses in Mumbai?",
          a: "We serve businesses in Mumbai through our agile, remote-first collaboration model. Each project runs through structured sprint cycles with dedicated Slack and WhatsApp communication channels, weekly video strategy sessions, and live Figma and Frame.io review workspaces for real-time feedback and iteration.",
        },
        {
          q: "What makes Lucie Creatives different from other web development agencies serving Mumbai?",
          a: "Unlike agencies relying on WordPress templates, our web development uses modern Next.js, React, and TypeScript stack delivering sub-second load speeds, 95+ Lighthouse performance scores, and enterprise-grade security. We specialize in fintech portals, headless e-commerce, and high-conversion SaaS platforms.",
        },
        {
          q: "What types of video editing does Lucie Creatives handle for Mumbai brands?",
          a: "We produce cinematic brand films, entertainment and fashion content edits, founder interview series, corporate documentaries, high-retention Instagram Reels, YouTube content, and paid advertising video creative — all with DaVinci Resolve color grading and custom sound design.",
        },
        {
          q: "Can Lucie Creatives create investor-ready pitch decks and branding for Mumbai startups?",
          a: "Yes. Our graphic design and branding services regularly produce high-stakes investor pitch decks, product one-pagers, brand identity books, and marketing collateral specifically designed to help venture-backed Mumbai startups secure funding rounds.",
        },
        {
          q: "Does Lucie Creatives have a physical office in Mumbai?",
          a: "Lucie Creatives operates as a remote-first creative agency serving businesses in Mumbai and across India. Our remote collaboration model ensures enterprise-grade quality with direct founder oversight, without geographic constraints. We communicate via dedicated channels with sub-24-hour response times.",
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
          name: "Delhi",
          href: "/delhi",
          description: "National capital region, government enterprises, and media conglomerates.",
        },
        {
          name: "Bengaluru",
          href: "/bengaluru",
          description: "India's technology capital, SaaS unicorns, and deep-tech startups.",
        },
      ]}
    />
  );
}
