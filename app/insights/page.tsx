import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import InsightHero from "@/components/InsightHero";
import InsightCard from "@/components/InsightCard";
import { INSIGHTS_ARTICLES } from "@/lib/insights-data";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import {
  getInsightsCollectionSchema,
  getBreadcrumbSchema,
} from "@/lib/schema-structured-data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/insights"]);

export default function InsightsPage() {
  const collectionSchema = getInsightsCollectionSchema(INSIGHTS_ARTICLES);
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Insights", item: "/insights" }]);

  return (
    <>
      {/* Structured Data */}
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

        <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <Breadcrumbs
            items={[{ label: "Insights", href: "/insights" }]}
            className="mb-8"
          />

          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <SectionLabel text="ENGINEERING & STRATEGY" className="mb-4" />
            <InsightHero />
          </div>

          {/* 6-Card Article Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS_ARTICLES.map((insight, idx) => (
              <Reveal key={insight.slug} delay={idx * 0.08} className="h-full">
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Closing Strategy CTA */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-[#8B1A1A] text-white text-center select-none">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
              Need technical or creative execution?
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Discuss your project parameters with our strategy team. We provide rapid technical scoping and fixed-deliverable sprint proposals.
            </p>
            {/* 
              TODO(needs-client-input): confirm CTA destinations:
              Consolidated in-page CTA to "Start a Project" (routes to /contact brief form).
            */}
            <MagneticButton
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-[#8b1a1a] hover:bg-brand-red-50 font-black text-sm px-8 py-4 rounded-2xl shadow-elevated"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
