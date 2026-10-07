import React from "react";
import { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Code-split below-the-fold components for consolidated Home structure
const ClientLogoStrip = nextDynamic(() =>
  import("@/components/ui/ClientLogoStrip").then((m) => m.ClientLogoStrip)
);
const HomeBentoServices = nextDynamic(() =>
  import("@/components/home/HomeBentoServices").then((m) => m.HomeBentoServices)
);
const FeaturedPortfolio = nextDynamic(() =>
  import("@/components/home/FeaturedPortfolio").then((m) => m.FeaturedPortfolio)
);
const IndustriesCondensedStrip = nextDynamic(() =>
  import("@/components/home/IndustriesCondensedStrip").then((m) => m.IndustriesCondensedStrip)
);
const HumanTrustSection = nextDynamic(() =>
  import("@/components/home/HumanTrustSection").then((m) => m.HumanTrustSection)
);
const RedBreak = nextDynamic(() =>
  import("@/components/RedBreak").then((m) => m.RedBreak)
);
const Footer = nextDynamic(() =>
  import("@/components/Footer").then((m) => m.Footer)
);

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/"]);


const servicesCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://luciecreatives.in/#catalog",
  name: "Lucie Creatives Global Digital Agency Services",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Web Development",
        url: "https://luciecreatives.in/web-development",
        description:
          "Custom website development, responsive website design, and e-commerce platforms built with Next.js and React.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Graphic Design",
        url: "https://luciecreatives.in/graphic-design",
        description:
          "Professional marketing creatives, advertising posters, corporate brochures, and visual communication assets.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Video Editing",
        url: "https://luciecreatives.in/video-editing",
        description:
          "High-retention video editing for Instagram Reels, YouTube content, brand films, and commercial video ads.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Logo Design",
        url: "https://luciecreatives.in/logo-design",
        description:
          "Bespoke logo design and corporate identity services. Vector logomarks, typography lockups, and complete brand packages.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Branding",
        url: "https://luciecreatives.in/branding",
        description:
          "Full-scale brand identity systems, positioning strategies, packaging design, and comprehensive brand books.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "UI/UX Design",
        url: "https://luciecreatives.in/ui-ux-design",
        description:
          "Intuitive web app interfaces, responsive SaaS UX, wireframes, design systems, and interactive Figma prototypes.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Social Media Design",
        url: "https://luciecreatives.in/social-media-design",
        description:
          "High-converting social media design. Instagram carousels, paid ad creatives, story graphics, and cohesive feed templates.",
        provider: {
          "@type": "Organization",
          "@id": "https://luciecreatives.in/#organization",
          name: "Lucie Creatives",
          url: "https://luciecreatives.in",
        },
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal">
      {/* Services OfferCatalog JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCatalogSchema) }}
      />
      <link
        rel="preload"
        as="image"
        href="/iphone-frame.webp"
        type="image/webp"
        // @ts-ignore
        fetchPriority="high"
      />

      <Navbar />

      {/* 1. Hero Section: Primary H1, Narrative & Quick Action */}
      <Hero />

      {/* 2. Compact Trust Strip: Logo Ticker + Single Inline Row of Verified Stats */}
      <ClientLogoStrip />

      {/* 3. Capabilities Bento Grid: 6 Disciplines with Mini UI Mockups */}
      <HomeBentoServices />

      {/* 4. Proven Commercial Outcomes: Case Studies Grid Proof Section */}
      <FeaturedPortfolio />

      {/* 5. Industries: Real Estate, Hospitality, Retail & D2C */}
      <IndustriesCondensedStrip />

      {/* 6. Human / Trust Section: Founders & Verified Testimonials */}
      <HumanTrustSection />

      {/* 7. Final CTA: Discovery Call & Project Brief */}
      <RedBreak />

      {/* Comprehensive Footer */}
      <Footer />
    </main>
  );
}
