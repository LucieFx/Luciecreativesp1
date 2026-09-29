"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  ArrowUpRight,
  CheckCircle2,
  Box,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function GraphicDesignShowcase() {
  return (
    <section
      id="graphic-design"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold"
    >
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#7A1F2B]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <SectionLabel number="03" text="GRAPHIC DESIGN &amp; PACKAGING" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase leading-[1.08] max-w-4xl text-balance">
            Monolithic Design &amp;{" "}
            <span className="text-[#7A1F2B] italic block sm:inline">
              Editorial Precision.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            Visual communication engineered to command prestige across physical and digital formats. From structural packaging architecture to international multi-slide editorial campaigns.
          </p>
        </div>

        {/* 2-Column Split: Capabilities Left, Project Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-white/80 border border-line/80">
              <div className="flex items-center gap-3 mb-4 text-[#7A1F2B]">
                <Box className="w-5 h-5" />
                <h3 className="text-xl font-black text-text-primary">
                  Structural Packaging Architecture
                </h3>
              </div>
              <p className="text-sm text-text-secondary font-medium leading-relaxed mb-4">
                Factory-ready die-lines, debossed foil stamping, tactile stock curation, and 3D ray-traced product renders engineered for luxury retail and international export compliance.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-body">
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  CMYK &amp; Pantone Spot
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  Dieline Construction
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  3D Packaging CGI
                </span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 border border-line/80">
              <div className="flex items-center gap-3 mb-4 text-[#7A1F2B]">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-xl font-black text-text-primary">
                  Editorial &amp; Publication Design
                </h3>
              </div>
              <p className="text-sm text-text-secondary font-medium leading-relaxed mb-4">
                High-contrast investor pitch decks, corporate annual reports, luxury lookbooks, and multi-slide carousels governed by mathematical typography scales.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-body">
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  Baseline Grid Alignment
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  Investor Pitch Decks
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-line">
                  Brand Lookbooks
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <MagneticButton
                href="/graphic-design"
                variant="primary"
                size="md"
                className="px-6 py-3 text-xs font-black rounded-xl shadow-red-btn !bg-[#7A1F2B] hover:!bg-[#631923]"
              >
                <span>Explore Graphic Design Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>

              <Link
                href="/work/nirva-resort-environmental-branding"
                className="text-xs font-black text-[#7A1F2B] hover:underline"
              >
                View Nirva Resort Case Study →
              </Link>
            </div>
          </div>

          {/* Right Column: Case Study Visual Feature */}
          <div className="lg:col-span-6">
            <div className="group relative rounded-3xl overflow-hidden border border-line bg-white shadow-floating hover:border-[#7A1F2B]/40 transition-all">
              <div className="relative w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835298/lucie-creatives/portfolio/graphic-design/nirva-club/hero-main-hoarding.webp"
                  alt="Nirva Club & Resort monumental outdoor billboard architecture and environmental branding"
                  width={2560}
                  height={1280}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto block"
                />

                {/* Floating Metric Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-line text-xs font-black text-ink flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  <span>Monumental OOH System</span>
                </div>
              </div>

              <div className="p-7 text-ink bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7A1F2B] uppercase tracking-wider mb-2">
                  <span>Featured Case Study</span>
                  <span>•</span>
                  <span>OOH &amp; Environmental Branding</span>
                </div>

                <h4 className="text-2xl font-black mb-2 text-ink group-hover:text-[#7A1F2B] transition-colors">
                  Nirva Luxury Resort OOH &amp; Brand Architecture
                </h4>

                <p className="text-xs sm:text-sm text-body font-medium leading-relaxed mb-4">
                  Monumental outdoor billboard architecture, 50-foot highway hoardings, event collateral, restaurant menus, and environmental signage for a premier luxury club &amp; resort.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-line/60 text-xs font-bold">
                  <span className="text-muted">Client: Nirva Club &amp; Resort</span>
                  <Link
                    href="/work/nirva-resort-environmental-branding"
                    className="text-[#7A1F2B] hover:underline inline-flex items-center gap-1 font-black transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
