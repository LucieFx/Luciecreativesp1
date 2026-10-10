"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Monitor,
  MousePointerClick,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function UiUxShowcase() {
  return (
    <section
      id="ui-ux"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold"
    >
      {/* Dot Grid Pattern */}
      {null}

      {/* Atmospheric Glow */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <SectionLabel number="06" text="UI/UX &amp; PRODUCT DESIGN" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] text-text-primary leading-[1.0] max-w-4xl text-balance">
            Human-centered UI/UX &amp;{" "}
            <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
              fluid product journeys.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            Transforming intricate digital workflows into intuitive, high-converting interfaces. Grounded in cognitive psychology, conversion rate optimization, and systematic Figma design tokens.
          </p>
        </div>

        {/* 3-Column UI/UX Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Card 1: Figma Design Systems */}
          <div className="p-8 rounded-card bg-white/80 border border-line/80 flex flex-col justify-between group hover:border-[#8b1a1a]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-control bg-white border border-line text-[#8b1a1a] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-text-primary tracking-tight mb-3">
                Figma Design Token Architecture
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                Modular component libraries utilizing Figma variables, auto-layout 5.0, dark mode tokens, and naming structures that map 1-to-1 with React/Tailwind codebases.
              </p>
              <ul className="space-y-2 pt-4 border-t border-line/60 text-xs font-bold text-body">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Atomic Component Hierarchy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Light &amp; Dark Theme Tokens</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Interactive Prototypes & CRO */}
          <div className="p-8 rounded-card bg-white/80 border border-line/80 flex flex-col justify-between group hover:border-[#8b1a1a]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-control bg-white border border-line text-[#8b1a1a] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-text-primary tracking-tight mb-3">
                Interactive Clickable Prototypes
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                Realistic micro-prototypes simulating exact production physics, page transitions, and user task flows for stakeholder sign-off and usability testing.
              </p>
              <ul className="space-y-2 pt-4 border-t border-line/60 text-xs font-bold text-body">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Frictionless User Journey Flows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Conversion Funnel Optimization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Responsive Web & SaaS Design */}
          <div className="p-8 rounded-card bg-white/80 border border-line/80 flex flex-col justify-between group hover:border-[#8b1a1a]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-control bg-white border border-line text-[#8b1a1a] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-text-primary tracking-tight mb-3">
                Responsive Web &amp; SaaS Design
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                Responsive web and cloud interface systems engineered for effortless user journeys across modern desktop, tablet, and mobile browsers.
              </p>
              <ul className="space-y-2 pt-4 border-t border-line/60 text-xs font-bold text-body">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Responsive Web &amp; SaaS Layouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                  <span>Developer Handoff Redlines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Center CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <MagneticButton
            href="/ui-ux-design"
            variant="primary"
            size="md"
            className="px-7 py-3.5 text-xs font-black rounded-control shadow-red-btn !bg-[#8b1a1a] hover:!bg-[#8b1a1a]/90"
          >
            <span>Explore Full UI/UX Capabilities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>

          <Link
            href="/work/vedam-villas-influencer-tour"
            className="text-xs font-black text-[#8b1a1a] hover:underline"
          >
            View Vedam Villas Showcase Project →
          </Link>
        </div>
      </div>
    </section>
  );
}
