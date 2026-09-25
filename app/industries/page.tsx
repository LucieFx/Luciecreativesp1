import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IndustriesServed } from "@/components/home/IndustriesServed";
import { RedBreak } from "@/components/RedBreak";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/industries"]);

export default function IndustriesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Industries", item: "/industries" },
  ]);

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative pt-28 sm:pt-32">
        <Navbar />

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-2">
          <Breadcrumbs items={[{ label: "Industries", href: "/industries" }]} />
        </div>

        {/* Full 6-Card Industries & Businesses Grid */}
        <IndustriesServed />

        {/* Closing Action CTA */}
        <RedBreak />

        <Footer />
      </main>
    </>
  );
}
