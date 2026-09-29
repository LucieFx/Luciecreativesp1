"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileText,
  Layers,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LogoBrandingShowcase() {
  return (
    <section
      id="branding"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold"
    >
      {/* Dot Grid Pattern */}
      {null}

      {/* Atmospheric Glow */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <SectionLabel number="05" text="LOGO DESIGN &amp; BRANDING" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] text-text-primary leading-[1.0] max-w-4xl text-balance">
            Distinctive logomarks &amp;{" "}
            <span className="font-accent italic text-[#7A1F2B] text-[1.1em] tracking-normal inline">
              brand ecosystems.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            We engineer timeless identity marks grounded in mathematical harmony, paired with comprehensive 80+ page brand systems that govern visual hierarchy, verbal tone, and market authority.
          </p>
        </div>

        {/* 2-Card Pillar Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: Logo Design */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-line/80 flex flex-col justify-between group hover:border-[#7A1F2B]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[10px] font-black text-[#7A1F2B] tracking-wider uppercase border border-[#7A1F2B]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B]" />
                  VECTOR GEOMETRY
                </span>
                <Compass className="w-6 h-6 text-[#7A1F2B]" />
              </div>

              <h3 className="text-2xl font-black text-text-primary tracking-tight mb-3">
                Precision Logo Design
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                Engineered for instant recognition and mathematical longevity. Tested from a 16px digital browser favicon to 50-foot architectural signage with zero loss in clarity.
              </p>

              <ul className="space-y-2.5 pt-4 border-t border-line/60 mb-8">
                {[
                  "Golden Ratio & Geometric Grid Construction",
                  "Custom Hand-Drawn Wordmark Typography",
                  "Responsive Scalability Matrix (16px to 512px)",
                  "Complete Vector Master Suite (.AI, .EPS, .SVG)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-body">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1F2B] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Link
                href="/logo-design"
                className="inline-flex items-center gap-2 text-xs font-black text-[#7A1F2B] hover:text-[#540F0F] transition-colors"
              >
                <span>Explore Logo Design Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Holistic Branding */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-line/80 flex flex-col justify-between group hover:border-[#7A1F2B]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[10px] font-black text-[#7A1F2B] tracking-wider uppercase border border-[#7A1F2B]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B]" />
                  ENTERPRISE IDENTITY
                </span>
                <FileText className="w-6 h-6 text-[#7A1F2B]" />
              </div>

              <h3 className="text-2xl font-black text-text-primary tracking-tight mb-3">
                Strategic Brand Architecture
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                We build end-to-end brand ecosystems that define strategic market positioning, verbal tone of voice, color psychology, and multi-channel asset guidelines.
              </p>

              <ul className="space-y-2.5 pt-4 border-t border-line/60 mb-8">
                {[
                  "80+ Page Comprehensive Brand Manual",
                  "Chromatic Color Token Systems & Accessibility",
                  "Verbal Identity & Executive Tone of Voice",
                  "Corporate Stationery & Touchpoint Templates",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-body">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1F2B] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Link
                href="/branding"
                className="inline-flex items-center gap-2 text-xs font-black text-[#7A1F2B] hover:text-[#540F0F] transition-colors"
              >
                <span>Explore Branding Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-red-50/60 border border-[#7A1F2B]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs font-black text-[#7A1F2B] uppercase tracking-wider block mb-1">
              PROVEN CASE STUDY
            </span>
            <p className="text-sm font-bold text-ink">
              See how we elevated Omni Brand &amp; Visual Architecture across 14 international markets.
            </p>
          </div>
          <Link
            href="/work/omni-global-campaign"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-[#7A1F2B]/20 text-xs font-black text-[#7A1F2B] hover:bg-white hover:border-[#7A1F2B] transition-all shadow-sm flex-shrink-0"
          >
            <span>Read Omni Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
