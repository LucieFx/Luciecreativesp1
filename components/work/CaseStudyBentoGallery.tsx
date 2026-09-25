"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MaskReveal } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING_SOFT } from "@/lib/motion";
import {
  Layers,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Ratio,
} from "lucide-react";

export type StillsRatio = "1/1" | "4/5" | "2/1" | "16/9" | "3/4" | "4/3" | "9/16";

export interface CaseStudyStill {
  src: string;
  caption: string;
  alt?: string;
  aspectRatio?: StillsRatio;
}

interface CaseStudyBentoGalleryProps {
  stills: CaseStudyStill[];
  projectTitle: string;
  client: string;
  category: string;
  industry: string;
}

/**
 * Intelligent helper to infer the exact pixel ratio of a graphic design / creative asset
 * if not explicitly annotated in metadata.
 */
export function resolveStillRatio(still: CaseStudyStill): StillsRatio {
  if (still.aspectRatio) return still.aspectRatio;

  const s = still.src.toLowerCase();
  const c = still.caption.toLowerCase();

  // 2:1 Wide billboards and highway hoardings
  if (
    s.includes("billboard") ||
    s.includes("hoarding") ||
    s.includes("skyline") ||
    s.includes("family-hoarding") ||
    c.includes("billboard") ||
    c.includes("hoarding") ||
    c.includes("20x10") ||
    c.includes("28x8")
  ) {
    return "2/1";
  }

  // 16:9 Panoramic or cinema
  if (s.includes("panoramic") || c.includes("panoramic") || c.includes("16:9")) {
    return "16/9";
  }

  // 4:3 Packaging variants and screen layouts
  if (s.includes("chips-variant") || s.includes("hero-chips") || s.includes("her-identity")) {
    return "4/3";
  }

  // 3:4 High print posters, flyers, crests
  if (
    s.includes("standy") ||
    s.includes("standee") ||
    s.includes("gourmet-hospitality-flyer") ||
    s.includes("crest") ||
    s.includes("exhibition-print") ||
    s.includes("vietnam") ||
    s.includes("ideal-academy") ||
    s.includes("topper") ||
    s.includes("crancho-poster-1")
  ) {
    return "3/4";
  }

  // 4:5 Vertical social campaigns, admissions, and retail posters
  if (
    s.includes("poster") ||
    s.includes("admissions") ||
    s.includes("creative") ||
    s.includes("gold-rate") ||
    s.includes("picnic") ||
    s.includes("bali") ||
    s.includes("uae") ||
    s.includes("rathyatra") ||
    s.includes("nursing") ||
    s.includes("metrocity") ||
    s.includes("kalpvriksh-restaurant-flyer") ||
    c.includes("creative") ||
    c.includes("poster") ||
    c.includes("social ad") ||
    c.includes("festival")
  ) {
    return "4/5";
  }

  // 9:16 Vertical reels / mobile
  if (s.includes("reel") || s.includes("9-16") || c.includes("reel") || c.includes("vertical")) {
    return "9/16";
  }

  // Default to 1:1 for monograms, brand identities, macro jewelry crops, and product mockups
  return "1/1";
}

/**
 * Returns human-readable label and Tailwind aspect class for each pixel ratio
 */
function getRatioSpecs(ratio: StillsRatio): {
  label: string;
  badge: string;
  aspectClass: string;
} {
  switch (ratio) {
    case "2/1":
      return {
        label: "2:1 Ultra-Wide",
        badge: "2:1 • OOH BILLBOARD",
        aspectClass: "aspect-[2/1]",
      };
    case "16/9":
      return {
        label: "16:9 Panoramic",
        badge: "16:9 • DIGITAL DISPLAY",
        aspectClass: "aspect-[16/9]",
      };
    case "4/3":
      return {
        label: "4:3 Landscape",
        badge: "4:3 • PRODUCT MOCKUP",
        aspectClass: "aspect-[4/3]",
      };
    case "4/5":
      return {
        label: "4:5 Portrait",
        badge: "4:5 • RETAIL POSTER",
        aspectClass: "aspect-[4/5]",
      };
    case "3/4":
      return {
        label: "3:4 Editorial",
        badge: "3:4 • COMMERCIAL PRINT",
        aspectClass: "aspect-[3/4]",
      };
    case "9/16":
      return {
        label: "9:16 Mobile",
        badge: "9:16 • MOBILE CINEMA",
        aspectClass: "aspect-[9/16]",
      };
    case "1/1":
    default:
      return {
        label: "1:1 Square",
        badge: "1:1 • BRAND ARTWORK",
        aspectClass: "aspect-square",
      };
  }
}

/**
 * Dynamic Bento Column-Span calculator to ensure 100% visual balance without orphan gaps
 */
function getBentoLayout(index: number, stills: CaseStudyStill[]): string {
  const total = stills.length;
  const currentRatio = resolveStillRatio(stills[index]);
  const isCurrentWide = currentRatio === "2/1" || currentRatio === "16/9";
  const wideCount = stills.filter((s) => {
    const r = resolveStillRatio(s);
    return r === "2/1" || r === "16/9";
  }).length;

  if (total === 1) return "col-span-12";
  if (total === 2) return "col-span-12 md:col-span-6";

  if (total === 3) {
    if (isCurrentWide) return "col-span-12";
    if (wideCount === 1) return "col-span-12 md:col-span-6";
    if (index === 0) return "col-span-12";
    return "col-span-12 md:col-span-6";
  }

  if (total === 4) {
    if (isCurrentWide) return "col-span-12";
    if (wideCount === 1) {
      // 1 wide item spans full width (12 cols), the remaining 3 form a 3-column row (4+4+4 = 12)
      return "col-span-12 md:col-span-4";
    }
    // Staggered bento: row 1 is 7 + 5 = 12, row 2 is 5 + 7 = 12
    if (index === 0) return "col-span-12 lg:col-span-7";
    if (index === 1) return "col-span-12 lg:col-span-5";
    if (index === 2) return "col-span-12 lg:col-span-5";
    return "col-span-12 lg:col-span-7";
  }

  if (total === 5) {
    if (isCurrentWide) return "col-span-12";
    if (index === 0) return "col-span-12 lg:col-span-7";
    if (index === 1) return "col-span-12 lg:col-span-5";
    return "col-span-12 md:col-span-4"; // remaining 3 items take 4 cols each (3x4=12)
  }

  // 6 or more items
  if (isCurrentWide) {
    return "col-span-12 lg:col-span-8";
  }
  if (index === 0) return "col-span-12 lg:col-span-8";
  if (index === 1 && wideCount > 0) return "col-span-12 lg:col-span-4";
  return "col-span-12 sm:col-span-6 lg:col-span-4";
}

export function CaseStudyBentoGallery({
  stills,
  projectTitle,
  client,
  category,
  industry,
}: CaseStudyBentoGalleryProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? stills.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === stills.length - 1 ? 0 : prev + 1) : null
        );
      }
    },
    [activeLightboxIndex, stills.length]
  );

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeLightboxIndex, handleKeyDown]);

  if (!stills || stills.length === 0) return null;

  return (
    <section
      className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16"
      aria-label="Craft and execution stills showcase"
    >
      {/* Section Header with Design Taxonomy */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Behind the Scenes &amp; Production Iterations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-ink">
            Craft &amp; Execution Stills
          </h2>
          <p className="text-xs sm:text-sm text-body font-medium max-w-2xl mt-1.5">
            Full-resolution production collateral, packaging die-lines, macro details, and campaign assets calibrated to native design pixel ratios.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-line text-xs font-mono font-bold text-body">
            <Ratio className="w-3.5 h-3.5 text-brand-red" />
            <span>{stills.length} Production Assets</span>
          </span>
        </div>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {stills.map((still, idx) => {
          const ratio = resolveStillRatio(still);
          const specs = getRatioSpecs(ratio);
          const colSpanClass = getBentoLayout(idx, stills);

          return (
            <div
              key={idx}
              onClick={() => setActiveLightboxIndex(idx)}
              className={`${colSpanClass} group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-line/90 shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
            >
              {/* Top Bar Floating Meta Pill */}
              <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none z-20">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-brand-red" />
                  <span>{specs.badge}</span>
                </span>

                <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md border border-line shadow-sm text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Native Pixel-Ratio Matched Photo Placeholder Container */}
              <MaskReveal direction="up" duration={0.6} className="w-full">
                <div
                  className={`relative w-full ${specs.aspectClass} overflow-hidden bg-[#F5F2EF] flex items-center justify-center p-2 sm:p-3`}
                >
                  {/* Subtle Backdrop Ambient Glow (Clean & Low Contrast) */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <Image
                      src={still.src}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-cover blur-2xl scale-125"
                    />
                  </div>

                  {/* Subtle Studio Framed Card for Maximum Photographic Fidelity */}
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xs ring-1 ring-black/5 flex items-center justify-center bg-white/40">
                    <Image
                      src={still.src}
                      alt={still.alt || `${projectTitle}: ${still.caption} - ${industry}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                      className="object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
              </MaskReveal>

              {/* Caption & Metadata Footer Strip */}
              <div className="p-4 sm:p-5 bg-white border-t border-line/60 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand-red transition-colors line-clamp-1">
                    {still.caption}
                  </p>
                  <span className="text-[10px] font-mono font-semibold text-body block mt-0.5">
                    {specs.label} • {category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-body shrink-0">
                  0{idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen High-Resolution Lightbox Modal */}
      {isMounted && (
        <AnimatePresence>
          {activeLightboxIndex !== null && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="High-resolution creative viewer"
              className="fixed inset-0 z-[9999] top-0 left-0 w-full h-full bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none shadow-2xl"
              onClick={() => setActiveLightboxIndex(null)}
            >
              {/* Lightbox Header Bar */}
              <div
                className="flex items-center justify-between text-ink z-20 pb-4 border-b border-line"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-brand-red bg-brand-redLight/80 border border-brand-red/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {getRatioSpecs(resolveStillRatio(stills[activeLightboxIndex])).badge}
                    </span>
                    <span className="text-muted font-bold">•</span>
                    <span className="text-xs font-mono font-bold text-body">
                      Asset {activeLightboxIndex + 1} of {stills.length}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-ink mt-1">
                    {stills[activeLightboxIndex].caption}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close high-resolution viewer"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-line text-ink border border-line shadow-sm transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Lightbox Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={SPRING_SOFT}
                className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Previous Button */}
                {stills.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveLightboxIndex((prev) =>
                        prev !== null ? (prev === 0 ? stills.length - 1 : prev - 1) : null
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 z-30 p-3.5 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}

                {/* Uncropped High-Res Image Display */}
                <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center p-2">
                  <Image
                    src={stills[activeLightboxIndex].src}
                    alt={
                      stills[activeLightboxIndex].alt ||
                      stills[activeLightboxIndex].caption
                    }
                    fill
                    loading="lazy"
                    sizes="(max-width: 1200px) 100vw, 1400px"
                    className="object-contain drop-shadow-2xl rounded-lg"
                  />
                </div>

                {/* Next Button */}
                {stills.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveLightboxIndex((prev) =>
                        prev !== null ? (prev === stills.length - 1 ? 0 : prev + 1) : null
                      )
                    }
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 z-30 p-3.5 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}
              </motion.div>

              {/* Lightbox Footer Bar */}
              <div
                className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs text-body pt-3 border-t border-line font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <span className="text-body">Client: </span>
                  <strong className="text-ink font-bold">{client}</strong>
                  <span className="mx-2 text-muted">•</span>
                  <span className="text-body">Project: </span>
                  <strong className="text-ink font-bold">{projectTitle}</strong>
                </div>

                <div className="hidden sm:block text-body font-medium">
                  <span>Use Left/Right arrows or ESC to navigate</span>
                </div>
              </div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
