"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function HomeBentoServices() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-visible border-b border-line/60 font-sans"
    >
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        {/* Section Header: "What we do" with italic accent style */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-[#8b1a1a] uppercase">
            Services
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-[-0.02em] leading-[1.05] text-ink max-w-3xl text-balance">
            What we{" "}
            <span className="font-accent italic text-[#8B1A1A] font-normal">
              do
            </span>
          </h2>

          <p className="mt-4 text-[15px] sm:text-base md:text-[18px] text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty">
            Video editing, graphic design, and web development for brands, handled directly by one dedicated studio.
          </p>
        </div>

        {/* 12-Column Bento Grid Layout (Nicepay reference style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* 1. Video Editing (Desktop: span 7 | Tablet: span 2) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-2 lg:col-span-7"
            delay={0}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Video
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  Video Editing
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  High-retention reels, brand films, and ads edited with crisp pacing and clean sound.
                </p>
                <Link
                  href="/video-editing"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Video Timeline Mockup */}
              <VideoTimelineMockup />
            </div>
          </BentoCardWrapper>

          {/* 2. Web Development (Desktop: span 5 | Tablet: span 1) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-1 lg:col-span-5"
            delay={0.07}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Web
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  Web Development
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  Fast, custom websites and web applications built with Next.js that load in milliseconds.
                </p>
                <Link
                  href="/web-development"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Browser Wireframe Mockup */}
              <WebDevBrowserMockup />
            </div>
          </BentoCardWrapper>

          {/* 3. Graphic Design (Desktop: span 4 | Tablet: span 1) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-1 lg:col-span-4"
            delay={0.14}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Design
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  Graphic Design
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  Packaging die-lines, marketing print, lookbooks, and brand collateral crafted with layout rigor.
                </p>
                <Link
                  href="/graphic-design"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 3 Overlapping Posters Mockup */}
              <GraphicDesignMockup />
            </div>
          </BentoCardWrapper>

          {/* 4. Logo Design (Desktop: span 4 | Tablet: span 1) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-1 lg:col-span-4"
            delay={0.21}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Identity
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  Logo Design
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  Distinct vector marks and typography lockups built to scale cleanly across all touchpoints.
                </p>
                <Link
                  href="/logo-design"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Square Construction Artboard Mockup */}
              <LogoDesignMockup />
            </div>
          </BentoCardWrapper>

          {/* 5. UI/UX & Product (Desktop: span 4 | Tablet: span 1) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-1 lg:col-span-4"
            delay={0.28}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Product
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  UI/UX & Product
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  Intuitive web interfaces, Figma prototypes, and component libraries designed for smooth user journeys.
                </p>
                <Link
                  href="/ui-ux-design"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini Phone Wireframe with Moving Cursor Mockup */}
              <UiUxWireframeMockup />
            </div>
          </BentoCardWrapper>

          {/* 6. Social Media Design (Desktop: span 12 Horizontal | Tablet: span 2) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-2 lg:col-span-12"
            delay={0.35}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 h-full">
              <div className="lg:max-w-md">
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#8B1A1A] bg-[#8B1A1A]/08 px-2.5 py-0.5 rounded-full uppercase">
                  Social
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2 mb-1.5">
                  Social Media Design
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-3">
                  Consistent carousels, paid ad creatives, and story systems designed to stand out in feeds.
                </p>
                <Link
                  href="/social-media-design"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:underline focus-visible:outline-2 focus-visible:outline-[#8B1A1A] rounded-md transition-all group-hover:translate-x-0.5"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Row of 3 Mini Phone Frames Mockup */}
              <div className="lg:flex-1 lg:max-w-2xl flex items-center justify-center lg:justify-end">
                <SocialMediaFramesMockup />
              </div>
            </div>
          </BentoCardWrapper>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CARD WRAPPER COMPONENT
// ==========================================
interface BentoCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function BentoCardWrapper({ children, className = "", delay = 0 }: BentoCardWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`group relative bg-white rounded-[20px] border border-[#8B1A1A]/12 p-6 sm:p-7 shadow-[0_2px_12px_rgba(139,26,26,0.04)] hover:border-[#8B1A1A]/35 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(139,26,26,0.08)] transition-all duration-300 ease-out select-none overflow-hidden ${className}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 1. VIDEO EDITING MOCKUP: Mini Editor Timeline
// ==========================================
function VideoTimelineMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="mt-6 h-[200px] sm:h-[215px] w-full bg-[#FCFAFA] border border-[#8B1A1A]/10 rounded-xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Header: Timecode + Tick marks + Play chip */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#8B1A1A]/10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-[#8B1A1A] bg-[#8B1A1A]/08 px-2 py-0.5 rounded">
            00:00:14:22
          </span>
          <span className="text-[10px] font-medium text-slate-400 hidden sm:inline">
            4K · 60fps
          </span>
        </div>

        {/* Ruler ticks */}
        <div className="hidden sm:flex items-center gap-4 text-[9px] font-mono text-slate-400">
          <span>0s</span>
          <span>4s</span>
          <span>8s</span>
          <span>12s</span>
          <span>16s</span>
        </div>

        {/* Play button chip */}
        <div className="w-6 h-6 rounded-full bg-white border border-[#8B1A1A]/20 shadow-xs flex items-center justify-center text-[#8B1A1A]">
          <svg viewBox="0 0 24 24" fill="#8B1A1A" className="w-3 h-3 ml-0.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>

      {/* Tracks Container */}
      <div className="space-y-2 py-2 relative flex-1 flex flex-col justify-center">
        {/* Animated Playhead */}
        <motion.div
          className="absolute top-0 bottom-0 w-[1.5px] bg-[#8B1A1A] z-20 pointer-events-none"
          initial={{ left: "8%" }}
          animate={
            isInView && !shouldReduceMotion
              ? { left: ["8%", "90%", "8%"] }
              : { left: "42%" }
          }
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
          }}
        >
          {/* Top playhead triangle indicator */}
          <div className="w-2.5 h-2.5 bg-[#8B1A1A] -ml-[4.5px] rotate-45 -mt-1 rounded-[1px]" />
        </motion.div>

        {/* Track 1: V1 Video Clips */}
        <div className="flex items-center gap-1.5 h-7">
          <div className="w-9 text-[9px] font-mono text-slate-400 uppercase shrink-0">
            V1
          </div>
          <div className="flex-1 flex gap-1.5 h-full">
            <div className="w-[42%] bg-[#8B1A1A] text-white text-[9px] font-semibold px-2 flex items-center rounded-md truncate">
              A-Roll Hook
            </div>
            <div className="w-[30%] bg-[#8B1A1A]/20 border border-[#8B1A1A]/20 text-[#8B1A1A] text-[9px] font-semibold px-2 flex items-center rounded-md truncate">
              B-Roll Cut
            </div>
            <div className="flex-1 bg-[#8B1A1A] text-white text-[9px] font-semibold px-2 flex items-center rounded-md truncate">
              Outro
            </div>
          </div>
        </div>

        {/* Track 2: V2 Graphics / Overlays */}
        <div className="flex items-center gap-1.5 h-6">
          <div className="w-9 text-[9px] font-mono text-slate-400 uppercase shrink-0">
            V2
          </div>
          <div className="flex-1 flex gap-1.5 h-full">
            <div className="w-[18%]" />
            <div className="w-[38%] bg-[#8B1A1A]/12 border border-[#8B1A1A]/15 text-[#8B1A1A] text-[9px] font-medium px-2 flex items-center rounded-md truncate">
              Kinetic Text
            </div>
            <div className="w-[28%] bg-[#8B1A1A]/12 border border-[#8B1A1A]/15 text-[#8B1A1A] text-[9px] font-medium px-2 flex items-center rounded-md truncate">
              Subtitles
            </div>
          </div>
        </div>

        {/* Track 3: A1 Audio Waveform */}
        <div className="flex items-center gap-1.5 h-6">
          <div className="w-9 text-[9px] font-mono text-slate-400 uppercase shrink-0">
            A1
          </div>
          <div className="flex-1 h-full bg-[#8B1A1A]/06 border border-[#8B1A1A]/12 rounded-md px-2 flex items-center justify-between overflow-hidden">
            <span className="text-[9px] font-medium text-slate-500 shrink-0">
              Master Sound
            </span>
            <div className="flex items-center gap-[2px] h-3">
              {[40, 75, 100, 60, 85, 45, 90, 70, 50, 80, 100, 65, 40, 95, 75, 55, 85, 60, 40, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-[#8B1A1A]/40 rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. WEB DEVELOPMENT MOCKUP: Mini Browser Window
// ==========================================
function WebDevBrowserMockup() {
  return (
    <div
      aria-hidden="true"
      className="mt-6 h-[200px] sm:h-[215px] w-full bg-[#FCFAFA] border border-[#8B1A1A]/10 rounded-xl p-3 sm:p-3.5 relative overflow-hidden flex flex-col justify-between"
    >
      {/* 100 Performance ring chip (decorative) */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-white border border-[#8B1A1A]/18 rounded-full px-2 py-0.5 shadow-xs">
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#8B1A1A]">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="63" strokeDashoffset="0" />
        </svg>
        <span className="text-[10px] font-bold text-[#8B1A1A] font-mono">100</span>
      </div>

      {/* Mini Browser Chrome */}
      <div className="w-full bg-white border border-[#8B1A1A]/15 rounded-lg shadow-xs overflow-hidden flex-1 flex flex-col">
        {/* Address Bar Row */}
        <div className="px-2.5 py-1.5 bg-[#F9F7F7] border-b border-[#8B1A1A]/10 flex items-center gap-2">
          {/* 3 Dots */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#8B1A1A]/40" />
            <div className="w-2 h-2 rounded-full bg-[#8B1A1A]/25" />
            <div className="w-2 h-2 rounded-full bg-[#8B1A1A]/15" />
          </div>

          {/* Address capsule */}
          <div className="flex-1 max-w-[170px] bg-white border border-[#8B1A1A]/12 rounded-full px-2 py-0.5 flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" className="w-2.5 h-2.5 text-slate-500">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-[9px] font-mono text-slate-600 truncate">
              yourbrand.com
            </span>
          </div>
        </div>

        {/* Wireframe Canvas */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          {/* Mini Nav */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="w-3.5 h-3.5 rounded bg-[#8B1A1A]" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-1.5 bg-slate-200 rounded-full" />
              <div className="w-6 h-1.5 bg-slate-200 rounded-full" />
              <div className="w-8 h-2 bg-[#8B1A1A]/20 rounded-full" />
            </div>
          </div>

          {/* Split Hero Wireframe */}
          <div className="grid grid-cols-12 gap-2.5 items-center my-auto">
            {/* Left Wireframe Copy */}
            <div className="col-span-7 space-y-1.5">
              <div className="w-full h-2.5 bg-[#8B1A1A] rounded-full" />
              <div className="w-4/5 h-2 bg-[#8B1A1A]/40 rounded-full" />
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2" />
              <div className="w-3/4 h-1.5 bg-slate-200 rounded-full" />
              <div className="w-14 h-4 bg-[#8B1A1A] text-white text-[8px] font-semibold rounded flex items-center justify-center mt-2">
                Launch
              </div>
            </div>

            {/* Right Wireframe Visual Block */}
            <div className="col-span-5 h-16 bg-[#8B1A1A]/06 border border-[#8B1A1A]/15 rounded-md p-1.5 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#8B1A1A]/30" />
                <div className="w-6 h-1 bg-[#8B1A1A]/20 rounded-full" />
              </div>
              <div className="h-6 w-full bg-white border border-[#8B1A1A]/10 rounded flex items-center justify-center">
                <div className="w-8 h-1 bg-[#8B1A1A]/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. GRAPHIC DESIGN MOCKUP: 3 Overlapping Posters
// ==========================================
function GraphicDesignMockup() {
  return (
    <div
      aria-hidden="true"
      className="mt-6 h-[190px] w-full bg-[#FCFAFA] border border-[#8B1A1A]/10 rounded-xl relative overflow-hidden flex items-center justify-center"
    >
      {/* Poster 1 (Left, -6deg) */}
      <div className="absolute w-[86px] sm:w-[92px] h-[120px] rounded-lg bg-[#8B1A1A] text-white p-2 shadow-sm -rotate-6 -translate-x-10 group-hover:-rotate-12 group-hover:-translate-x-12 transition-all duration-300 ease-out flex flex-col justify-between">
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-white/80 rounded-full" />
          <div className="w-3/4 h-1 bg-white/50 rounded-full" />
        </div>
        <div className="w-full h-10 bg-white/10 rounded flex items-center justify-center">
          <div className="w-6 h-6 border border-white/30 rounded-full" />
        </div>
        <div className="text-[8px] font-mono text-white/70">2026 / POSTER</div>
      </div>

      {/* Poster 2 (Center, 0deg, z-10) */}
      <div className="relative z-10 w-[94px] sm:w-[100px] h-[130px] rounded-lg bg-white border border-[#8B1A1A]/20 p-2.5 shadow-md rotate-0 group-hover:scale-105 transition-all duration-300 ease-out flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-bold text-[#8B1A1A]">LOOKBOOK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
          </div>
          <div className="w-full h-2 bg-[#8B1A1A] rounded-full mb-1" />
          <div className="w-4/5 h-1.5 bg-[#8B1A1A]/30 rounded-full" />
        </div>
        <div className="w-full h-12 bg-[#8B1A1A]/06 border border-[#8B1A1A]/12 rounded flex items-center justify-center">
          <div className="w-8 h-8 border border-[#8B1A1A]/20 rotate-45" />
        </div>
        <div className="w-full flex justify-between text-[7px] font-mono text-slate-400">
          <span>EDITORIAL</span>
          <span>№ 04</span>
        </div>
      </div>

      {/* Poster 3 (Right, +6deg) */}
      <div className="absolute w-[86px] sm:w-[92px] h-[120px] rounded-lg bg-[#8B1A1A]/10 border border-[#8B1A1A]/18 p-2 shadow-sm rotate-6 translate-x-10 group-hover:rotate-12 group-hover:translate-x-12 transition-all duration-300 ease-out flex flex-col justify-between">
        <div className="space-y-1">
          <div className="w-3/4 h-1.5 bg-[#8B1A1A]/60 rounded-full" />
          <div className="w-1/2 h-1 bg-[#8B1A1A]/30 rounded-full" />
        </div>
        <div className="w-full h-10 bg-white/80 border border-[#8B1A1A]/12 rounded flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#8B1A1A]/20" />
        </div>
        <div className="text-[8px] font-mono text-[#8B1A1A]/80">PACKAGING</div>
      </div>
    </div>
  );
}

// ==========================================
// 4. LOGO DESIGN MOCKUP: Construction Artboard & Color Swatches
// ==========================================
function LogoDesignMockup() {
  return (
    <div
      aria-hidden="true"
      className="mt-6 h-[190px] w-full bg-[#FCFAFA] border border-[#8B1A1A]/10 rounded-xl p-3 relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Square Construction Artboard */}
      <div className="w-[110px] h-[95px] bg-white border border-[#8B1A1A]/20 rounded-lg relative flex items-center justify-center shadow-xs">
        {/* Subtle grid axis crosshair */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#8B1A1A]/12" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#8B1A1A]/12" />

        {/* Concentric construction guide circles */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 pointer-events-none">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#8B1A1A" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.25" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#8B1A1A" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.25" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#8B1A1A" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.25" />
          {/* Geometric mark: clean intersecting vector arcs */}
          <path
            d="M 50 20 A 30 30 0 0 1 80 50 A 30 30 0 0 1 50 80 A 30 30 0 0 1 50 20 Z"
            fill="none"
            stroke="#8B1A1A"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="7" fill="#8B1A1A" />
        </svg>
      </div>

      {/* Color Swatch Chips Row */}
      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#8B1A1A]/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#8B1A1A] border border-black/10" />
          <span className="text-[9px] font-mono text-slate-500">#8B1A1A</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#C53030] border border-black/10" />
          <span className="text-[9px] font-mono text-slate-500">#C53030</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-white border border-[#8B1A1A]/30" />
          <span className="text-[9px] font-mono text-slate-500">#FFFFFF</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. UI/UX & PRODUCT MOCKUP: Mini Wireframe with Moving Cursor
// ==========================================
function UiUxWireframeMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="mt-6 h-[190px] w-full bg-[#FCFAFA] border border-[#8B1A1A]/10 rounded-xl p-2 relative overflow-hidden flex items-center justify-center"
    >
      {/* Mini Phone Wireframe */}
      <div className="w-[145px] h-[155px] bg-white border border-[#8B1A1A]/20 rounded-xl p-2.5 shadow-xs flex flex-col justify-between relative">
        {/* Animated Cursor */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          initial={{ left: "20px", top: "40px" }}
          animate={
            isInView && !shouldReduceMotion
              ? {
                  left: ["20px", "85px", "55px", "20px"],
                  top: ["38px", "75px", "118px", "38px"],
                }
              : { left: "45px", top: "70px" }
          }
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          {/* Cursor SVG */}
          <svg viewBox="0 0 24 24" fill="#8B1A1A" className="w-4 h-4 drop-shadow-xs">
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </svg>
        </motion.div>

        {/* Top bar */}
        <div>
          <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="w-3 h-3 rounded-full bg-[#8B1A1A]" />
            <div className="w-4 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>

        {/* Card 1: Metric stat block */}
        <div className="bg-[#8B1A1A]/06 border border-[#8B1A1A]/10 rounded-lg p-1.5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-10 h-1.5 bg-[#8B1A1A] rounded-full" />
            <div className="w-6 h-1 bg-slate-300 rounded-full" />
          </div>
          <div className="w-5 h-3 bg-white border border-[#8B1A1A]/15 rounded flex items-center justify-center text-[7px] font-bold text-[#8B1A1A]">
            +24%
          </div>
        </div>

        {/* Card 2: List row with toggle */}
        <div className="bg-white border border-slate-200/80 rounded-lg p-1.5 flex items-center justify-between">
          <div className="w-12 h-1.5 bg-slate-400 rounded-full" />
          {/* Active Toggle Switch */}
          <div className="w-5 h-3 rounded-full bg-[#8B1A1A] p-0.5 flex justify-end">
            <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
          </div>
        </div>

        {/* Mini Button */}
        <div className="h-5 bg-[#8B1A1A] text-white text-[8px] font-semibold rounded flex items-center justify-center">
          Continue →
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. SOCIAL MEDIA DESIGN MOCKUP: 3 Mini Phone Frames
// ==========================================
function SocialMediaFramesMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full flex items-center justify-center sm:justify-end gap-3 sm:gap-4 overflow-hidden py-2"
    >
      {/* Frame 1: Instagram Post Layout */}
      <div className="w-[95px] sm:w-[105px] h-[150px] sm:h-[160px] bg-white border border-[#8B1A1A]/20 rounded-xl p-2 shadow-xs flex flex-col justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#8B1A1A]" />
          <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Square Media Post */}
        <div className="w-full h-18 bg-[#8B1A1A] rounded-md p-1.5 flex flex-col justify-between text-white">
          <span className="text-[7px] font-mono opacity-80">CAROUSEL</span>
          <div className="w-3/4 h-1 bg-white/70 rounded-full" />
        </div>

        {/* Reaction Icons Row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[#8B1A1A]">
          <div className="flex items-center gap-1.5">
            {/* Heart */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {/* Comment */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          {/* Bookmark */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* Frame 2: 9:16 Story Layout */}
      <div className="w-[95px] sm:w-[105px] h-[150px] sm:h-[160px] bg-white border border-[#8B1A1A]/20 rounded-xl p-2 shadow-xs flex flex-col justify-between shrink-0 relative overflow-hidden">
        {/* Story progress dashes */}
        <div className="flex gap-1">
          <div className="flex-1 h-0.5 bg-[#8B1A1A] rounded-full" />
          <div className="flex-1 h-0.5 bg-[#8B1A1A]/40 rounded-full" />
          <div className="flex-1 h-0.5 bg-slate-200 rounded-full" />
        </div>

        {/* Story Content Block */}
        <div className="my-auto text-center space-y-1.5 p-1.5 bg-[#8B1A1A]/06 border border-[#8B1A1A]/10 rounded-md">
          <div className="w-full h-1.5 bg-[#8B1A1A] rounded-full" />
          <div className="w-3/4 h-1 bg-slate-400 rounded-full mx-auto" />
        </div>

        {/* Swipe up pill */}
        <div className="flex flex-col items-center gap-0.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2.5" className="w-2.5 h-2.5">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="text-[7px] font-mono text-[#8B1A1A]">SWIPE UP</span>
        </div>
      </div>

      {/* Frame 3: Vertical Reel Layout */}
      <div className="w-[95px] sm:w-[105px] h-[150px] sm:h-[160px] bg-white border border-[#8B1A1A]/20 rounded-xl p-2 shadow-xs flex flex-col justify-between shrink-0 relative overflow-hidden">
        {/* Reel Header */}
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-mono text-[#8B1A1A] font-bold">REELS</span>
          <div className="w-2 h-2 rounded-full bg-[#8B1A1A]/40" />
        </div>

        {/* Center Play Graphic */}
        <div className="my-auto flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* Right action column */}
        <div className="absolute right-2 bottom-3 flex flex-col items-center gap-1.5 text-[#8B1A1A]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <div className="w-3 h-3 rounded-full bg-[#8B1A1A]/20 border border-[#8B1A1A]" />
        </div>

        {/* Bottom username & audio */}
        <div className="w-12 h-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}

export default HomeBentoServices;
