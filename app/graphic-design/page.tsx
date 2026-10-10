import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/work/shared/PageHero";
import { GraphicDesignShowcase } from "@/components/work/GraphicDesignShowcase";
import { ProcessStrip } from "@/components/work/shared/ProcessStrip";
import { CrossLinkStrip } from "@/components/work/shared/CrossLinkStrip";
import { WorkClosingCta } from "@/components/work/WorkClosingCta";
import { getGraphicProjects } from "@/lib/graphic-work-data";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/graphic-design"]);

export default function GraphicDesignPage() {
  const graphicProjects = getGraphicProjects();

  const serviceSchema = getServiceSchema({
    name: "Graphic Design",
    description:
      "Brand identity, packaging, social creatives and billboard design for growing brands. Explore our work with Lucie Creatives.",
    slug: "graphic-design",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Graphic Design", item: "/graphic-design" },
  ]);

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative">
        <Navbar />

        {/* 1. Hero */}
        <PageHero
          badge="LUCIE CREATIVES · GRAPHIC DESIGN"
          headlinePrefix="Brands people"
          headlineItalicAccent="remember."
          subheadline="Brand identity, packaging, social creatives and large-format OOH, designed to look premium and sell."
          chips={[
            { label: "Brand Identity & Packaging", href: "#graphic-design-grid" },
            { label: "Hospitality & Real Estate", href: "#graphic-design-grid" },
            { label: "Retail, Jewelry & FMCG", href: "#graphic-design-grid" },
            { label: "Education & Social Campaigns", href: "#graphic-design-grid" },
          ]}
          primaryButton={{
            label: "Start a project",
            href: "/contact",
          }}
          secondaryButton={{
            label: "See our work",
            href: "#graphic-design-grid",
          }}
          graphicDesignMotion={true}
        />

        {/* 2. Flagship Project, 3. Project Grid with Category Filters, 4. Similar 1:1 Stream */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <GraphicDesignShowcase projects={graphicProjects} />
        </Suspense>

        {/* 5. Process strip with 4 simple steps */}
        <ProcessStrip
          eyebrow="CREATIVE PROCESS"
          title="From discovery to master delivery"
          subtitle="A transparent 4-stage sprint with clear milestones, rapid turnaround, and zero guesswork."
          steps={[
            {
              number: "01",
              title: "Share Your Brief",
              description: "Kick off with our guided questionnaire or a 20-min strategy call. We align on brand vision, market benchmarks, and precise deliverable specs.",
              deliverables: ["Strategy Kickoff", "Brand Audit", "Asset Specs"],
            },
            {
              number: "02",
              title: "Concept Exploration",
              description: "We craft 2 to 3 distinct art directions exploring typographic hierarchy, chromatic palettes, composition structures, and visual tone.",
              deliverables: ["2 to 3 Art Directions", "Moodboards", "Initial Drafts"],
            },
            {
              number: "03",
              title: "Collaborative Polish",
              description: "Iterative feedback rounds where we fine-tune kerning, optical balancing, packaging die-lines, and production tolerances.",
              deliverables: ["Feedback Loops", "Detail Calibrations", "Optical Polish"],
            },
            {
              number: "04",
              title: "Master Delivery",
              description: "Comprehensive vector packages delivered in all industry formats (AI, EPS, SVG, print-ready PDF, web assets) with brand style guidelines.",
              deliverables: ["Full Vector Package", "Print & Web Vault", "IP Ownership"],
            },
          ]}
        />

        {/* 6. Cross-link strip */}
        <CrossLinkStrip
          eyebrow="MOTION & CINEMA"
          heading="Need high-retention video production too?"
          subtext="High-retention vertical reels, cinematic commercials, and viral YouTube engines engineered for rapid organic growth."
          chips={["Viral Vertical Reels", "Cinematic Commercials", "Multi-Track Audio", "4K Color Grade"]}
          buttonLabel="See video editing"
          buttonHref="/video-editing"
          icon="film"
        />

        {/* 7. Existing red CTA block */}
        <WorkClosingCta />

        <Footer />
      </main>
    </>
  );
}
