import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-ink flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Logo Chiclet */}
        <div className="w-16 h-16 rounded-lg bg-white shadow-xs border border-line flex items-center justify-center p-2.5 mb-6">
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#8b1a1a] text-xs font-mono font-bold uppercase tracking-wider border border-red-200/80 mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a] inline-block" aria-hidden="true" />
          <span>Error 404: Page Not Found</span>
        </div>

        {/* 404 Big Numerals */}
        <div className="font-display font-black text-7xl sm:text-9xl md:text-[10rem] tracking-tight text-ink mb-3 leading-none select-none">
          4<span className="text-[#8B1A1A]">0</span>4
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-2xl sm:text-4xl text-ink tracking-[-0.02em] leading-[1.0] mb-3 text-balance">
          This page got <span className="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline">scrolled past</span>.
        </h1>

        {/* Descriptive Narrative */}
        <p className="text-body text-sm sm:text-base font-medium max-w-md mb-8 leading-relaxed">
          The requested page, case study, or resource could not be found. It may have been moved, renamed, or is currently unavailable.
        </p>

        {/* Primary Action Button: "Back to Home" */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap w-full sm:w-auto mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8b1a1a] hover:bg-[#8b1a1a]/90 text-white rounded-lg font-bold text-sm tracking-wide shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-ink border border-line hover:border-[#8b1a1a]/40 hover:text-[#8b1a1a] rounded-lg font-bold text-sm transition-colors shadow-xs"
          >
            <span>Contact Agency</span>
          </Link>
        </div>

        {/* Helpful Destinations Quick Strip */}
        <div className="pt-6 border-t border-line/80 w-full">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-muted uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#8b1a1a]" />
            <span>Explore Active Portfolios</span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-bold">
            <Link
              href="/web-development"
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-body hover:text-[#8b1a1a] border border-line transition-colors flex items-center gap-1"
            >
              <span>Web Development</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/video-editing"
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-body hover:text-[#8b1a1a] border border-line transition-colors flex items-center gap-1"
            >
              <span>Video Editing</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/graphic-design"
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-body hover:text-[#8b1a1a] border border-line transition-colors flex items-center gap-1"
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
