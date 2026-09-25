import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { RedBreak } from "@/components/RedBreak";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/testimonials"]);

export default function TestimonialsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Testimonials", item: "/testimonials" },
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
          <Breadcrumbs items={[{ label: "Testimonials", href: "/testimonials" }]} />
        </div>

        {/* Client Partner Testimonials */}
        <Testimonials />

        {/* Closing Action CTA */}
        <RedBreak />

        <Footer />
      </main>
    </>
  );
}
