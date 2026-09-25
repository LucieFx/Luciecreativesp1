import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/work/shared/PageHero";
import { RotatingShortsShowcase } from "@/components/work/RotatingShortsShowcase";
import { WorkStatBreak } from "@/components/work/WorkStatBreak";
import { LongFormCinemaShowcase } from "@/components/work/LongFormCinemaShowcase";
import { ProcessStrip } from "@/components/work/shared/ProcessStrip";
import { CrossLinkStrip } from "@/components/work/shared/CrossLinkStrip";
import { WorkClosingCta } from "@/components/work/WorkClosingCta";
import { getShortFormProjects, getLongFormProjects, getAllShortFormReelThumbnails } from "@/lib/video-work-data";
import { STAT_BREAK } from "@/lib/work-data";
import { SITE_STATS } from "@/lib/site-stats";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/video-editing"]);

export default function VideoEditingPage() {
  const shortFormProjects = getShortFormProjects();
  const longFormProjects = getLongFormProjects();
  const reelThumbnails = getAllShortFormReelThumbnails();

  const serviceSchema = getServiceSchema({
    name: "Video Editing",
    description:
      "Short-form reels and cinematic commercial video editing for brands. See our work and start your project with Lucie Creatives.",
    slug: "video-editing",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Video Editing", item: "/video-editing" },
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
          badge="LUCIE CREATIVES · VIDEO EDITING"
          headlinePrefix="Videos people can't"
          headlineItalicAccent="scroll past."
          subheadline="Short-form reels and cinematic commercials, edited for attention and built to grow your brand."
          chips={[
            { label: "9:16 Vertical Reels", icon: "📱", href: "#short-form-videos" },
            { label: "16:9 Cinema Commercials", icon: "🎬", href: "#long-form-videos" },
            { label: `${SITE_STATS.viewsLabel} Client Impact`, icon: "📈", href: "#stat-break" },
          ]}
          primaryButton={{
            label: "Start a project",
            href: "/contact",
          }}
          secondaryButton={{
            label: "See our reels",
            href: "#short-form-videos",
          }}
          timelineEditMotion={true}
          reelThumbnails={reelThumbnails}
        />

        {/* 2. Short-form reels section (current phone + tile picker) */}
        <RotatingShortsShowcase projects={shortFormProjects} />

        {/* 3. 63M+ metric section */}
        <WorkStatBreak statBreak={STAT_BREAK} />

        {/* 4. Long-form cinema section */}
        <LongFormCinemaShowcase projects={longFormProjects} />

        {/* 5. Process strip with 4 simple steps */}
        <ProcessStrip
          eyebrow="POST-PRODUCTION WORKFLOW"
          title="From raw footage to viral release"
          subtitle="Engineered for high retention, cinematic pacing, and seamless publishing across vertical and widescreen platforms."
          steps={[
            {
              number: "01",
              title: "Footage & Direction",
              description: "Upload raw rushes, brand assets, and reference links. We map narrative beats, pacing targets, and audience retention hooks.",
              deliverables: ["Asset Ingestion", "Narrative Outline", "Pacing Goals"],
            },
            {
              number: "02",
              title: "First Assembly Cut",
              description: "We craft the initial rough cut with seamless pacing, visual hooks in the first 3 seconds, and multi-cam continuity.",
              deliverables: ["Assembly Cut", "Pacing Calibrated", "Retention Hook"],
            },
            {
              number: "03",
              title: "Sound, Motion & Grade",
              description: "Layered sound design, cinematic LUT color grading, kinetic typography, dynamic transitions, and polished sound effects.",
              deliverables: ["Audio Mastering", "Color Grading", "Motion Graphics"],
            },
            {
              number: "04",
              title: "Master 4K Delivery",
              description: "Full resolution exports formatted for all distribution channels (9:16 vertical reels, 16:9 cinema, YouTube 4K master files).",
              deliverables: ["4K Multi-Aspect Exports", "Clean Masters", "Thumbnail Kit"],
            },
          ]}
        />

        {/* 6. Cross-link strip */}
        <CrossLinkStrip
          eyebrow="BRANDING & PACKAGING"
          heading="Need branding and visual design too?"
          subtext="Discover our packaging, monolithic identity systems, large-format OOH billboards, and high-converting marketing collateral."
          chips={["Brand Identity Systems", "Product Packaging", "OOH Billboards", "Haute Jewels & FMCG"]}
          buttonLabel="See graphic design"
          buttonHref="/graphic-design"
          icon="layers"
        />

        {/* 7. Existing red CTA block */}
        <WorkClosingCta />

        <Footer />
      </main>
    </>
  );
}
