"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WORK_PROJECTS, WorkProject } from "@/lib/work-data";
import { Reveal, MaskReveal } from "@/components/motion";

export function FeaturedPortfolio() {
  const [activeTab, setActiveTab] = useState<"video" | "design">("video");

  const videoProjects: WorkProject[] = [
    WORK_PROJECTS.find((p) => p.slug === "nirva-resort-cinema-commercial") || WORK_PROJECTS[0],
    WORK_PROJECTS.find((p) => p.slug === "vedam-villas-influencer-tour") || WORK_PROJECTS[1],
    WORK_PROJECTS.find((p) => p.slug === "ambica-interior-luxury-spaces") || WORK_PROJECTS[2],
  ].filter(Boolean);

  const designProjects: WorkProject[] = [
    WORK_PROJECTS.find((p) => p.slug === "nandanvan-luxury-real-estate") || WORK_PROJECTS[0],
    WORK_PROJECTS.find((p) => p.slug === "speczo-luxury-eyewear") || WORK_PROJECTS[1],
    WORK_PROJECTS.find((p) => p.slug === "onirique-haute-parfums") || WORK_PROJECTS[2],
  ].filter(Boolean);

  const currentProjects = activeTab === "video" ? videoProjects : designProjects;

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-visible"
    >
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        {/* Section Header with smooth blur fade up */}
        <Reveal delay={0} y={16} duration={0.65} className="flex flex-col items-center text-center mb-10 sm:mb-12 overflow-visible">
          <div className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-[#8b1a1a] uppercase">
            Portfolio
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[-0.02em] leading-[1.0] text-ink max-w-3xl text-balance">
            Selected work
          </h2>

          <p className="mt-4 text-[15px] sm:text-base md:text-[18px] text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty">
            A few recent projects across video, design and web.
          </p>
        </Reveal>

        {/* Category Tabs: Video Editing / Graphic Design */}
        <div className="flex items-center justify-center mb-10">
          <div
            role="tablist"
            aria-label="Portfolio category filter"
            className="inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-line/80 shadow-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "video"}
              onClick={() => setActiveTab("video")}
              className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "video"
                  ? "bg-white text-[#8b1a1a] shadow-xs border border-line"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              Video Editing
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "design"}
              onClick={() => setActiveTab("design")}
              className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "design"
                  ? "bg-white text-[#8b1a1a] shadow-xs border border-line"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              Graphic Design
            </button>
          </div>
        </div>

        {/* Equal-Height Portfolio Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14 items-stretch overflow-visible">
          {currentProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.08} duration={0.7} className="h-full overflow-visible">
              <PortfolioCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Explore Work CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <MagneticButton
            href="/video-editing"
            variant="primary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-black rounded-xl shadow-red-btn !bg-[#8b1a1a] hover:!bg-[#8b1a1a]/90"
          >
            <span>Explore Video Editing</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
          <MagneticButton
            href="/graphic-design"
            variant="secondary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-bold rounded-xl border border-line hover:border-[#8b1a1a]/40 text-ink hover:text-[#8b1a1a]"
          >
            <span>Explore Graphic Design</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ project }: { project: WorkProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="group rounded-2xl border border-line/90 bg-white hover:border-[#8b1a1a]/40 hover:shadow-lg hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full will-change-transform overflow-visible"
    >
      <div>
        {/* Media Thumbnail Container with MaskReveal */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <MaskReveal className="w-full h-full" innerClassName="w-full h-full">
            <Image
              src={project.posterSrc}
              alt={`${project.title} - ${project.category} case study for ${project.client}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          </MaskReveal>

          {/* Subtle protective gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-ink uppercase tracking-wider border border-line/80 shadow-xs z-20">
            {project.category}
          </div>
        </div>

        {/* Text Info directly beneath the image */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <span className="text-[#8b1a1a] font-bold text-xs tracking-wider uppercase">
              {project.client}
            </span>
            <span className="text-slate-500 font-mono text-xs">{project.year}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight mb-2.5 group-hover:text-[#8b1a1a] transition-colors leading-snug line-clamp-2">
            {project.title}
          </h3>

          <p className="text-[14px] text-slate-700 font-normal leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Deliverables tags & CTA - anchored at bottom */}
      <div className="p-6 pt-0">
        <div className="pt-4 border-t border-line/60 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.deliverables.slice(0, 2).map((del, dIdx) => (
              <span
                key={dIdx}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium"
              >
                {del}
              </span>
            ))}
          </div>

          <span className="text-[#8b1a1a] font-bold inline-flex items-center gap-1 text-[14px] transition-transform shrink-0">
            <span>View Case</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedPortfolio;
