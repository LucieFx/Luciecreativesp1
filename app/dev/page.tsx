import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DevHero } from "@/components/dev/DevHero";
import { WebDevBrowserShowcase } from "@/components/dev/WebDevBrowserShowcase";
import { DevClosingCta } from "@/components/dev/DevClosingCta";

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/dev"]);

export default function DevPage() {
  const collectionSchema = getCollectionPageSchema({
    name: "Web Development — Lucie Creatives Portfolio",
    description: "Web development and digital engineering portfolio by Lucie Creatives.",
    slug: "dev",
    items: [],
  });

  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Web Development", item: "/dev" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative">
        <Navbar />

        {/* 1. Engineering Intro Hero */}
        <DevHero />

        {/* 2. Web Development — Horizontal Browser Showcase */}
        <WebDevBrowserShowcase />

        {/* 3. Development-Scoped Closing Section */}
        <DevClosingCta />

        <Footer />
      </main>
    </>
  );
}
