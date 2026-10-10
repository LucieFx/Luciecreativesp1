"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MaskReveal } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING_SOFT } from "@/lib/motion";
import {
  Layers,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Building2,
  Utensils,
  Calendar,
  Mail,
  Palette,
  Eye,
  Filter,
} from "lucide-react";

export interface DesignGalleryItem {
  src: string;
  title: string;
  caption: string;
  aspectRatio?: "16/9" | "9/16" | "4/5" | "1/1" | "2/1" | "3/4";
  category?: string;
}

export interface DesignGalleryCategory {
  category: string;
  description: string;
  items: DesignGalleryItem[];
}

interface NirvaDesignGalleryProps {
  categories: DesignGalleryCategory[];
  clientName: string;
}

export function NirvaDesignGallery({
  categories,
  clientName,
}: NirvaDesignGalleryProps) {
  // Flatten all items across categories into a single array with category tags
  const allItems = useMemo(() => {
    const list: (DesignGalleryItem & { categoryName: string })[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        list.push({
          ...item,
          categoryName: cat.category,
        });
      });
    });
    return list;
  }, [categories]);

  // "ALL" is selected by default so all designs are rendered on one single page in the bento grid
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter items based on selected pill
  const visibleItems = useMemo(() => {
    if (selectedFilter === "ALL") return allItems;
    return allItems.filter((item) => item.categoryName === selectedFilter);
  }, [allItems, selectedFilter]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIdx === null) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightboxIdx(null);
      if (e.key === "ArrowRight") {
        setActiveLightboxIdx((prev) =>
          prev !== null ? (prev + 1) % visibleItems.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveLightboxIdx((prev) =>
          prev !== null ? (prev - 1 + visibleItems.length) % visibleItems.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeLightboxIdx, visibleItems]);

  // Helper to determine aspect ratio container styling
  const getAspectClass = (aspect?: string) => {
    switch (aspect) {
      case "2/1":
        return "aspect-[2/1]";
      case "16/9":
        return "aspect-[16/9]";
      case "4/5":
        return "aspect-[4/5]";
      case "3/4":
        return "aspect-[3/4]";
      case "9/16":
        return "aspect-[9/16]";
      case "1/1":
      default:
        return "aspect-square";
    }
  };

  // Dynamic Bento column span based on visual ratio
  const getBentoSpan = (aspect?: string, index?: number) => {
    if (aspect === "2/1") {
      // Wide billboard: span 8 cols on desktop or 6
      return "col-span-12 md:col-span-6 lg:col-span-8";
    }
    if (aspect === "16/9") {
      return "col-span-12 md:col-span-6 lg:col-span-6";
    }
    if (aspect === "4/5" || aspect === "3/4") {
      return "col-span-12 sm:col-span-6 lg:col-span-4";
    }
    // 1:1 or default
    return "col-span-12 sm:col-span-6 lg:col-span-4";
  };

  const activeLightboxItem =
    activeLightboxIdx !== null ? visibleItems[activeLightboxIdx] : null;

  return (
    <section
      className="px-6 sm:px-12 max-w-7xl mx-auto mb-16 sm:mb-20"
      aria-label="Complete Brand Identity & Graphic Design Showcase"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-line mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-[#8b1a1a]/10 text-[#8b1a1a] text-xs font-black uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Complete Brand Collateral &amp; Print System</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
            All Graphic Design &amp; Collateral in Bento Grid
          </h2>
          <p className="text-xs sm:text-sm text-body font-normal mt-1 max-w-3xl leading-relaxed">
            Every monumental highway billboard, Kalpvriksh dining identity, seasonal festival campaign, and VIP welcome stationery piece for {clientName} on one single unified canvas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#8b1a1a] animate-ping" />
          <span>{allItems.length} Creative Assets</span>
        </div>
      </div>

      {/* Category Filter Pill Strip (All Designs shown together by default) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setSelectedFilter("ALL")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-control text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedFilter === "ALL"
              ? "bg-[#8b1a1a] text-white shadow-md scale-[1.02]"
              : "bg-line/50 text-body hover:text-ink hover:bg-line"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Designs ({allItems.length})</span>
        </button>

        {categories.map((cat) => {
          const count = cat.items.length;
          const isSelected = selectedFilter === cat.category;
          const label = cat.category.split("&")[0].trim();
          return (
            <button
              key={cat.category}
              onClick={() => setSelectedFilter(cat.category)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-control text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-[#8b1a1a] text-white shadow-md scale-[1.02]"
                  : "bg-line/50 text-body hover:text-ink hover:bg-line"
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isSelected ? "bg-white/20 text-white" : "bg-line text-body"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Single-Page Bento Grid Rendering All Designs */}
      <div className="grid grid-cols-12 gap-5 sm:gap-6 lg:gap-7">
        {visibleItems.map((item, idx) => {
          const spanClass = getBentoSpan(item.aspectRatio, idx);
          const aspectClass = getAspectClass(item.aspectRatio);

          return (
            <div
              key={`${item.src}-${idx}`}
              className={`${spanClass} group rounded-card bg-white border border-line/90 shadow-sm hover:shadow-xl hover:border-[#8b1a1a]/40 transition-all duration-300 flex flex-col overflow-hidden`}
            >
              {/* Media Container with Zoom Hover Effect and MaskReveal */}
              <MaskReveal direction="up" duration={0.6} className="w-full">
                <div
                  className={`relative w-full ${aspectClass} bg-[#ffffff] p-2 flex items-center justify-center overflow-hidden cursor-pointer`}
                  onClick={() => setActiveLightboxIdx(idx)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />

                  {/* Floating Aspect & Category Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control bg-black/65 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold tracking-wider shadow-md">
                      <span>{item.aspectRatio || "1:1"}</span>
                    </span>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-control bg-[#8b1a1a]/90 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md line-clamp-1 max-w-[160px]">
                      {item.categoryName.split("&")[0].trim()}
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-white text-ink text-xs font-black shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-[#8b1a1a]" />
                      <span>View High-Res</span>
                    </div>
                  </div>
                </div>
              </MaskReveal>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2 bg-white">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-ink tracking-tight leading-snug group-hover:text-[#8b1a1a] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-body font-normal leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-line/60 flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>CMYK Print Master</span>
                  <button
                    type="button"
                    onClick={() => setActiveLightboxIdx(idx)}
                    className="text-[#8b1a1a] font-bold hover:underline cursor-pointer"
                  >
                    Inspect Asset →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Full-Resolution Viewing */}
      {isMounted && (
        <AnimatePresence>
          {activeLightboxItem !== null && activeLightboxIdx !== null && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] top-0 left-0 w-full h-full bg-white/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveLightboxIdx(null)}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIdx(null)}
                className="absolute top-5 right-5 p-3 rounded-control bg-slate-100 hover:bg-line text-ink border border-line shadow-sm transition-all cursor-pointer z-20"
                title="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIdx((prev) =>
                    prev !== null ? (prev - 1 + visibleItems.length) % visibleItems.length : null
                  );
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-control bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer z-20 hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
                title="Previous Asset (←)"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Next Nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIdx((prev) =>
                    prev !== null ? (prev + 1) % visibleItems.length : null
                  );
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-control bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer z-20 hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
                title="Next Asset (→)"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={SPRING_SOFT}
                className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="relative w-full max-h-[75vh] flex items-center justify-center">
                  <Image
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.title}
                    width={1400}
                    height={900}
                    sizes="(max-width: 1024px) 95vw, 1200px"
                    className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-media shadow-2xl border border-line"
                    priority
                  />
                </div>

                {/* Lightbox Caption Bar */}
                <div className="mt-4 text-center max-w-2xl px-4 space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-brand-redLight text-brand-red border border-brand-red/20 text-[11px] font-mono font-bold tracking-wider">
                    <span>{activeLightboxItem.categoryName}</span>
                    <span>•</span>
                    <span>{activeLightboxIdx + 1} of {visibleItems.length}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-body font-normal leading-relaxed">
                    {activeLightboxItem.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
