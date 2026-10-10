import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { RedBreak } from "@/components/RedBreak";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getActiveTestimonials } from "@/lib/testimonials";

import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/testimonials"]);

export default function TestimonialsPage() {
  const testimonials = getActiveTestimonials();
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

        {/* Client Partner Testimonials or Clean Fallback Notice */}
        {testimonials.length > 0 ? (
          <Testimonials />
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
              Partner Reviews &amp; Testimonials
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto text-base leading-relaxed mb-8">
              We are currently compiling and verifying client reviews from our latest projects. In the meantime, explore our recent deliverables and production work.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/video-editing"
                className="px-6 py-3 rounded-control bg-[#8B1A1A] text-white font-bold text-sm hover:bg-[#8b1a1a] transition-colors"
              >
                View Video Editing Work
              </Link>
              <Link
                href="/web-development"
                className="px-6 py-3 rounded-control border border-line text-text-primary font-bold text-sm hover:border-[#8B1A1A] transition-colors"
              >
                View Web Development Work
              </Link>
            </div>
          </section>
        )}

        {/* Closing Action CTA */}
        <RedBreak />

        <Footer />
      </main>
    </>
  );
}
