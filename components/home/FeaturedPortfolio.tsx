"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WORK_PROJECTS, WorkProject } from "@/lib/work-data";
import { SITE_STATS } from "@/lib/site-stats";
import { SplitText, Reveal, MaskReveal, ParallaxImage } from "@/components/motion";

export function FeaturedPortfolio() {
  const shortForm =
    WORK_PROJECTS.find((p) => p.slug === "vedam-villas-influencer-tour") || WORK_PROJECTS[0];
  const longForm =
    WORK_PROJECTS.find((p) => p.slug === "nirva-resort-cinema-commercial") || WORK_PROJECTS[1];
  const square1 =
    WORK_PROJECTS.find((p) => p.slug === "nandanvan-luxury-real-estate") || WORK_PROJECTS[2];
  const square2 =
    WORK_PROJECTS.find((p) => p.slug === "speczo-luxury-eyewear") || WORK_PROJECTS[3];

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#7A1F2B]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <SectionLabel number="03" text="SELECTED PORTFOLIO WORK" className="mb-4" />

          <SplitText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase leading-[1.08] max-w-4xl text-balance"
            accentWords={["outcomes", "execution.", "execution"]}
            accentClassName="text-[#7A1F2B] font-serif italic lowercase font-normal text-[1.08em]"
          >
            Proven Commercial *outcomes & execution.*
          </SplitText>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            We don&apos;t build vanity projects. Every web application, commercial film, and brand identity is measured by customer acquisition, retention, and market valuation.
          </p>
        </div>

        {/* Bento Grid Layout: 9:16 Video, 16:9 Long Form, and 2x Square Graphic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 items-stretch">
          {/* Column 1: Short Form 9:16 Video (Tall Card) - Rises with stagger */}
          <Reveal delay={0} className="lg:col-span-5 flex flex-col">
            <BentoProjectCard
              project={shortForm}
              aspectRatioClass="aspect-[9/16]"
              className="h-full"
            />
          </Reveal>

          {/* Column 2: Long Form 16:9 + 2x Square Cards - Rises with stagger */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 justify-between">
            {/* Top Card: 16:9 Long Form Cinema Commercial */}
            <Reveal delay={0.1}>
              <BentoProjectCard
                project={longForm}
                aspectRatioClass="aspect-[16/9]"
              />
            </Reveal>

            {/* Bottom Row: 2 Square Graphic Design Cards (1:1 Ratio) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <Reveal delay={0.2} className="h-full">
                <BentoProjectCard
                  project={square1}
                  aspectRatioClass="aspect-square"
                  compact={true}
                  className="h-full"
                />
              </Reveal>
              <Reveal delay={0.28} className="h-full">
                <BentoProjectCard
                  project={square2}
                  aspectRatioClass="aspect-square"
                  compact={true}
                  className="h-full"
                />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Explore Work CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <MagneticButton
            href="/video-editing"
            variant="primary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-black rounded-xl shadow-red-btn !bg-[#7A1F2B] hover:!bg-[#631923]"
          >
            <span>Explore Video Editing</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            href="/graphic-design"
            variant="secondary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-bold rounded-xl border border-line hover:border-[#7A1F2B]/40 text-ink hover:text-[#7A1F2B]"
          >
            <span>Explore Graphic Design</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function BentoProjectCard({
  project,
  aspectRatioClass,
  compact = false,
  className = "",
}: {
  project: WorkProject;
  aspectRatioClass: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className={`group rounded-3xl overflow-hidden border border-line/90 bg-white hover:border-[#7A1F2B]/40 hover:shadow-[0_24px_50px_-12px_rgba(122,31,43,0.16)] transition-all duration-500 flex flex-col justify-between ${className}`}
    >
      {/* Media Thumbnail Container with MaskReveal & ParallaxImage */}
      <div className={`relative ${aspectRatioClass} w-full overflow-hidden bg-slate-100`}>
        <MaskReveal className="w-full h-full" innerClassName="w-full h-full">
          <ParallaxImage className="w-full h-full" innerClassName="w-full h-full" offset={6}>
            <Image
              src={project.posterSrc}
              alt={`${project.title} - ${project.category} case study for ${project.client}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
          </ParallaxImage>
        </MaskReveal>

        {/* Subtle protective gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-black text-ink uppercase tracking-wider border border-white/80 shadow-xs z-20">
          {project.category}
        </div>

      </div>

      {/* Text Info */}
      <div className={`${compact ? "p-5 sm:p-6" : "p-6 sm:p-7"} flex flex-col justify-between flex-grow`}>
        <div>
          <div className="flex items-center justify-between gap-4 text-xs font-bold mb-2.5">
            <span className="text-[#7A1F2B] font-mono tracking-wider uppercase text-[11px] font-black">
              {project.client}
            </span>
            <span className="text-muted font-mono text-[11px]">{project.year}</span>
          </div>

          <h3
            className={`${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            } font-black text-ink tracking-tight mb-2.5 group-hover:text-[#7A1F2B] transition-colors leading-snug line-clamp-2 min-h-[3rem] flex items-center`}
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-body font-medium leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
            {project.tagline}
          </p>
        </div>

        {/* Deliverables tags & CTA */}
        <div className="pt-4 border-t border-line/60 flex items-center justify-between gap-3 text-xs font-bold">
          <div className="flex flex-wrap gap-1.5">
            {project.deliverables.slice(0, 2).map((del, dIdx) => (
              <span
                key={dIdx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-body text-[11px] font-medium"
              >
                {del}
              </span>
            ))}
          </div>

          <span className="text-[#7A1F2B] font-black inline-flex items-center gap-1.5 text-xs group-hover:translate-x-1 transition-transform shrink-0">
            <span>View Case</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
