import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowRight, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-ink flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-60 pointer-events-none" />

      {/* Atmospheric Depth Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7A1F2B]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Floating Logo Chiclet */}
        <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-line flex items-center justify-center p-2.5 mb-6 hover:scale-105 transition-transform duration-300">
          <Image
            src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835253/lucie-creatives/logo/lucie-mark.png"
            alt="Lucie Creatives Logo"
            width={44}
            height={44}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* 404 Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#7A1F2B] text-xs font-mono font-bold uppercase tracking-wider border border-red-200/80 mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 — Page Not Found</span>
        </div>

        {/* 404 Big Numerals */}
        <div className="font-black text-7xl sm:text-9xl md:text-[10rem] tracking-tight text-ink mb-3 leading-none select-none">
          4<span className="text-[#7A1F2B]">0</span>4
        </div>

        {/* Headline */}
        <h1 className="font-black text-2xl sm:text-4xl text-ink tracking-tight mb-3 text-balance">
          This page got{" "}
          <span className="font-serif italic font-normal text-[#7A1F2B]">
            scrolled past.
          </span>
        </h1>

        {/* Descriptive Narrative */}
        <p className="text-body text-sm sm:text-base font-medium max-w-md mb-8 leading-relaxed">
          The requested page, case study, or resource could not be found. It may have been moved, renamed, or is currently unavailable.
        </p>

        {/* Primary Action Button: "Back to Home" */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap w-full sm:w-auto mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#7A1F2B] hover:bg-[#631923] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-ink border-2 border-line hover:border-[#7A1F2B]/40 hover:text-[#7A1F2B] rounded-xl font-bold text-sm transition-all shadow-xs"
          >
            <span>Contact Agency</span>
          </Link>
        </div>

        {/* Helpful Destinations Quick Strip */}
        <div className="pt-6 border-t border-line/80 w-full">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-muted uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#7A1F2B]" />
            <span>Explore Active Portfolios</span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-bold">
            <Link
              href="/web-development"
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-body hover:text-[#7A1F2B] border border-line transition-colors flex items-center gap-1"
            >
              <span>Web Development</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/video-editing"
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-body hover:text-[#7A1F2B] border border-line transition-colors flex items-center gap-1"
            >
              <span>Video Editing</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/graphic-design"
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-body hover:text-[#7A1F2B] border border-line transition-colors flex items-center gap-1"
            >
              <span>Graphic Design</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
