import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutProcess } from "@/components/about/AboutProcess";
import { AboutProofStrip } from "@/components/about/AboutProofStrip";
import { AboutFounder } from "@/components/about/AboutFounder";
import { AboutClosingCta } from "@/components/about/AboutClosingCta";

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getAboutPageSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/about"]);

export default function AboutPage() {
  const aboutSchema = getAboutPageSchema([
    { name: "Founders", jobTitle: "Founders, Lucie Creatives" },
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([{ name: "About", item: "/about" }]);

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative">
        <Navbar />

        {/* 1. Opening Statement (Type-led large serif moment) */}
        <AboutHero />

        {/* 2. The Story (Narrative liquid-glass cards) */}
        <AboutStory />

        {/* 3. How We Work (4-step sprint workflow) */}
        <AboutProcess />

        {/* 4. Proof Strip (Single source of truth company stats) */}
        <AboutProofStrip />

        {/* 5. Team / Founder Section */}
        <AboutFounder />

        {/* 6. Closing CTA */}
        <AboutClosingCta />

        <Footer />
      </main>
    </>
  );
}
