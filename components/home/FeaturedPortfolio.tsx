"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/motion";

export interface PortfolioItem {
  id: string;
  tab: "video" | "design";
  title: string;
  thumbnail: string;
  href: string;
  videoPreview?: string;
  categoryChip?: string;
  morphIndex: number;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // --- VIDEO TAB (Vertical 9:16 reels only) ---
  {
    id: "video-vedam-tour",
    tab: "video",
    title: "Vedam Villas Luxury Tour with Taniya Oberoi",
    thumbnail:
      "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto,w_640/v1790684877/lucie-creatives/portfolio/vedam-villas-influencer-tour-poster.jpg",
    href: "/work/vedam-villas-influencer-tour",
    videoPreview:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790267065/lucie-creatives/videos/clients/vedam-villas/vedam-villas-influencer-tour.mp4",
    categoryChip: "Influencer Tour",
    morphIndex: 0,
  },
  {
    id: "video-vedam-living",
    tab: "video",
    title: "Vedam Villas: Master Living & High Ceilings",
    thumbnail: "https://img.youtube.com/vi/aML3WYYORvg/maxresdefault.jpg",
    href: "/work/vedam-villas-living",
    videoPreview:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790267069/lucie-creatives/videos/clients/vedam-villas/vedam-villas-luxury-living.mp4",
    categoryChip: "Interior Reel",
    morphIndex: 1,
  },
  {
    id: "video-ambica-craft",
    tab: "video",
    title: "Ambica Interior Gallery: Material Precision & Craft",
    thumbnail: "/ambica-interior-poster.webp",
    href: "/work/ambica-interior-gallery-series",
    videoPreview:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790266871/lucie-creatives/videos/clients/ambica-interior/ambica-interior-luxury-spaces.mp4",
    categoryChip: "Craft Reel",
    morphIndex: 2,
  },
  {
    id: "video-maruti-elevation",
    tab: "video",
    title: "Maruti Buildcon: Modern Commercial Elevation",
    thumbnail: "https://img.youtube.com/vi/sEvJ9brA9qo/maxresdefault.jpg",
    href: "/work/maruti-buildcon-vertical-reels",
    videoPreview:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790266960/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-elevation.mp4",
    categoryChip: "Elevation Reel",
    morphIndex: 3,
  },

  // --- GRAPHIC DESIGN TAB (Square 1:1 cards) ---
  {
    id: "design-nandanvan",
    tab: "design",
    title: "Nandanvan Estates Luxury Architectural Branding",
    thumbnail:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835288/lucie-creatives/portfolio/graphic-design/nandanvan-estates/bungalows-campaign.webp",
    href: "/work/nandanvan-luxury-real-estate",
    categoryChip: "Real Estate & Architecture",
    morphIndex: 0,
  },
  {
    id: "design-speczo",
    tab: "design",
    title: "Speczo Eyewear Monolithic Identity & Packaging",
    thumbnail:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835336/lucie-creatives/portfolio/graphic-design/speczo/hero-frame-box.webp",
    href: "/work/speczo-luxury-eyewear",
    categoryChip: "Packaging Architecture",
    morphIndex: 1,
  },
  {
    id: "design-onirique",
    tab: "design",
    title: "Onirique Parfums 3D CGI & Visual Identity",
    thumbnail:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp",
    href: "/work/onirique-parfums-identity",
    categoryChip: "Haute Parfumerie & 3D",
    morphIndex: 2,
  },
];

interface SlotGeometry {
  x: number;
  y: number;
  width: number;
  imageHeight: number;
  opacity: number;
  scale: number;
  pointerEvents: "auto" | "none";
}

interface ComputedGeometryResult {
  isMobile: boolean;
  slots: SlotGeometry[];
  activeStageHeight: number;
  mobileVideoHeight: number;
  mobileDesignHeight: number;
}

const TITLE_BLOCK_HEIGHT = 48; // Fixed 2-line title block
const TITLE_GAP = 12; // Gap between image bottom and title

/**
 * Computes deterministic slot geometries for the active tab and stage width
 */
function computeLayoutGeometries(
  stageW: number,
  activeTab: "video" | "design"
): ComputedGeometryResult {
  const isMobile = stageW < 768;
  const isTablet = stageW >= 768 && stageW < 1024;

  // Mobile calculations (used when isMobile is true)
  const mobileCardW = Math.min(280, Math.round(stageW * 0.65));
  const mobileVideoImageH = Math.round((mobileCardW * 16) / 9);
  const mobileVideoHeight = mobileVideoImageH + TITLE_GAP + TITLE_BLOCK_HEIGHT + 24;

  const mobileDesignCardW = Math.round((stageW - 16) / 2);
  const mobileDesignRowH = mobileDesignCardW + TITLE_GAP + TITLE_BLOCK_HEIGHT;
  const mobileDesignHeight = mobileDesignRowH * 2 + 16;

  // Desktop / Tablet calculations
  const gapX = isTablet ? 24 : 32;
  const gapY = isTablet ? 24 : 32;

  // Compute for Video tab
  const videoCols = isTablet ? 3 : 4;
  const videoColW = Math.round((stageW - (videoCols - 1) * gapX) / videoCols);
  const videoImageH = Math.round((videoColW * 16) / 9);
  const videoCardH = videoImageH + TITLE_GAP + TITLE_BLOCK_HEIGHT;

  const videoGeometries: SlotGeometry[] = [0, 1, 2, 3].map((i) => {
    const col = i % videoCols;
    const row = Math.floor(i / videoCols);
    return {
      x: col * (videoColW + gapX),
      y: row * (videoCardH + gapY),
      width: videoColW,
      imageHeight: videoImageH,
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
    };
  });
  const videoStageHeight = isTablet
    ? videoCardH * 2 + gapY
    : videoCardH;

  // Compute for Design tab
  const designCols = isTablet ? 2 : 3;
  const designColW = Math.round((stageW - (designCols - 1) * gapX) / designCols);
  const designImageH = designColW; // 1:1 aspect ratio
  const designCardH = designImageH + TITLE_GAP + TITLE_BLOCK_HEIGHT;

  const designGeometries: SlotGeometry[] = [0, 1, 2, 3].map((i) => {
    if (i < 3) {
      const col = i % designCols;
      const row = Math.floor(i / designCols);
      return {
        x: col * (designColW + gapX),
        y: row * (designCardH + gapY),
        width: designColW,
        imageHeight: designImageH,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
      };
    } else {
      // Slot 3 is unused in Design tab: positioned at its neighbor with opacity 0, scale 0.96
      if (isTablet) {
        // In 2-col tablet layout, slot 2 is row 1 col 0. Slot 3 neighbor is row 1 col 1
        return {
          x: designColW + gapX,
          y: designCardH + gapY,
          width: designColW,
          imageHeight: designImageH,
          opacity: 0,
          scale: 0.96,
          pointerEvents: "none",
        };
      } else {
        // In 3-col desktop layout, slot 2 is col 2. Slot 3 collapses at slot 2's position
        return {
          x: 2 * (designColW + gapX),
          y: 0,
          width: designColW,
          imageHeight: designImageH,
          opacity: 0,
          scale: 0.96,
          pointerEvents: "none",
        };
      }
    }
  });
  const designStageHeight = isTablet
    ? designCardH * 2 + gapY
    : designCardH;

  const activeGeoms = activeTab === "video" ? videoGeometries : designGeometries;
  const activeStageHeight = activeTab === "video" ? videoStageHeight : designStageHeight;

  return {
    isMobile,
    slots: activeGeoms,
    activeStageHeight,
    mobileVideoHeight,
    mobileDesignHeight,
  };
}

export function FeaturedPortfolio() {
  const [activeTab, setActiveTab] = useState<"video" | "design">("video");
  const shouldReduceMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoTabBtnRef = useRef<HTMLButtonElement | null>(null);
  const designTabBtnRef = useRef<HTMLButtonElement | null>(null);

  // Default stage width for SSR / first paint before measurement
  const [stageWidth, setStageWidth] = useState<number>(1152);
  const [indicatorStyle, setIndicatorStyle] = useState<{ x: number; width: number }>({
    x: 4,
    width: 132,
  });

  const lastMorphTimeRef = useRef<number>(0);
  const rAFRef = useRef<number | null>(null);

  // Shared spring transition: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 }
  const sharedSpring: Transition = useMemo(() => {
    return shouldReduceMotion
      ? { duration: 0.2 }
      : { type: "spring", stiffness: 220, damping: 30, mass: 0.9 };
  }, [shouldReduceMotion]);

  // Video & Design Item Lists
  const videoItems = useMemo(
    () => PORTFOLIO_ITEMS.filter((it) => it.tab === "video"),
    []
  );
  const designItems = useMemo(
    () => PORTFOLIO_ITEMS.filter((it) => it.tab === "design"),
    []
  );

  // Measure stage width with ResizeObserver debounced with rAF
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = entry.contentRect.width;
      if (width <= 0) return;

      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      rAFRef.current = requestAnimationFrame(() => {
        setStageWidth(width);
      });
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  // Update sliding indicator position
  const updateIndicator = useCallback((tab: "video" | "design") => {
    const btn = tab === "video" ? videoTabBtnRef.current : designTabBtnRef.current;
    if (btn) {
      setIndicatorStyle({
        x: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, []);

  useEffect(() => {
    updateIndicator(activeTab);
  }, [activeTab, updateIndicator, stageWidth]);

  // Preload all reel posters and design images as soon as near viewport (400px rootMargin)
  useEffect(() => {
    const section = document.getElementById("portfolio");
    if (!section || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          PORTFOLIO_ITEMS.forEach((item) => {
            if (item.thumbnail) {
              const img = new window.Image();
              // @ts-ignore
              img.fetchPriority = "high";
              img.src = item.thumbnail;
              if (typeof img.decode === "function") {
                img.decode().catch(() => {});
              }
            }
          });
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Tab switch handler
  const handleTabChange = useCallback(
    (newTab: "video" | "design") => {
      if (newTab === activeTab) return;
      lastMorphTimeRef.current = Date.now();
      setActiveTab(newTab);
    },
    [activeTab]
  );

  // Check if morph is settled for video preview hover
  const isMorphSettled = useCallback(() => {
    return Date.now() - lastMorphTimeRef.current >= 600;
  }, []);

  // Compute layout geometry for current state
  const layoutResult = useMemo(
    () => computeLayoutGeometries(stageWidth, activeTab),
    [stageWidth, activeTab]
  );

  const { isMobile, slots, activeStageHeight, mobileVideoHeight, mobileDesignHeight } =
    layoutResult;

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-visible"
    >
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        {/* Section Header */}
        <Reveal
          delay={0}
          y={16}
          duration={0.65}
          className="flex flex-col items-center text-center mb-10 sm:mb-12 overflow-visible"
        >
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

        {/* Tab Switcher: Pill with single sliding indicator */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div
            role="tablist"
            aria-label="Portfolio category filter"
            className="inline-flex items-center gap-1.5 p-1 rounded-control bg-slate-100/90 border border-line/80 shadow-xs relative"
          >
            {/* Single Persistent Sliding Active Pill Indicator */}
            <motion.div
              className="absolute top-1 bottom-1 bg-white shadow-xs border border-line rounded-control-inner pointer-events-none"
              animate={{
                x: indicatorStyle.x,
                width: indicatorStyle.width,
              }}
              transition={sharedSpring}
            />

            <button
              ref={videoTabBtnRef}
              type="button"
              role="tab"
              aria-selected={activeTab === "video"}
              onPointerDown={(e) => {
                e.preventDefault();
                handleTabChange("video");
              }}
              onClick={() => handleTabChange("video")}
              className={`relative px-5 py-2 rounded-control-inner text-[14px] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === "video" ? "text-[#8b1a1a]" : "text-slate-600 hover:text-ink"
              }`}
            >
              <span className="relative z-10">Video Editing</span>
            </button>

            <button
              ref={designTabBtnRef}
              type="button"
              role="tab"
              aria-selected={activeTab === "design"}
              onPointerDown={(e) => {
                e.preventDefault();
                handleTabChange("design");
              }}
              onClick={() => handleTabChange("design")}
              className={`relative px-5 py-2 rounded-control-inner text-[14px] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === "design" ? "text-[#8b1a1a]" : "text-slate-600 hover:text-ink"
              }`}
            >
              <span className="relative z-10">Graphic Design</span>
            </button>
          </div>
        </div>

        {/* Stage Container: ONE stage with computed height, animated with shared spring */}
        <motion.div
          ref={stageRef}
          className="relative w-full overflow-visible mb-12 sm:mb-14"
          style={{
            contain: "layout paint",
          }}
          animate={{
            height: isMobile
              ? activeTab === "video"
                ? mobileVideoHeight
                : mobileDesignHeight
              : activeStageHeight,
          }}
          transition={sharedSpring}
        >
          {/* DESKTOP & TABLET: DETERMINISTIC SLOT-BASED MORPH */}
          {!isMobile && (
            <>
              {[0, 1, 2, 3].map((slotIdx) => {
                const geom = slots[slotIdx];
                const vItem = videoItems[slotIdx];
                const dItem = designItems[slotIdx];
                return (
                  <SlotCard
                    key={`slot-${slotIdx}`}
                    slotIndex={slotIdx}
                    videoItem={vItem}
                    designItem={dItem}
                    geom={geom}
                    activeTab={activeTab}
                    sharedSpring={sharedSpring}
                    isMorphSettled={isMorphSettled}
                  />
                );
              })}
            </>
          )}

          {/* MOBILE (under 768px): Scroll-snap row (Video) & 2-column grid (Design) */}
          {isMobile && (
            <>
              {/* Video Mobile Row */}
              <motion.div
                className="absolute inset-0 w-full"
                animate={{
                  opacity: activeTab === "video" ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  pointerEvents: activeTab === "video" ? "auto" : "none",
                }}
              >
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 -mx-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch">
                  {videoItems.map((item) => (
                    <div
                      key={item.id}
                      className="w-[65vw] max-w-[280px] shrink-0 snap-center flex flex-col"
                    >
                      <Link
                        href={item.href}
                        className="group flex flex-col select-none cursor-pointer"
                        aria-label={`${item.title} - View case study`}
                      >
                        <div className="relative w-full aspect-[9/16] overflow-hidden bg-slate-100 rounded-card border border-line/80 shadow-xs">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200" />
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover object-center select-none"
                            // @ts-ignore
                            fetchPriority="high"
                            loading="eager"
                          />
                          {item.categoryChip && (
                            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-control text-[11px] font-mono font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs z-20 pointer-events-none">
                              {item.categoryChip}
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                            <div className="w-7 h-7 rounded-control bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xs">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none opacity-40" />
                        </div>
                        <div className="pt-3 h-[48px] overflow-hidden">
                          <h3 className="text-[15px] font-bold text-ink tracking-tight line-clamp-2 leading-snug group-hover:text-[#8b1a1a] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Design Mobile Grid */}
              <motion.div
                className="absolute inset-0 w-full"
                animate={{
                  opacity: activeTab === "design" ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  pointerEvents: activeTab === "design" ? "auto" : "none",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {designItems.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <Link
                        href={item.href}
                        className="group flex flex-col select-none cursor-pointer"
                        aria-label={`${item.title} - View case study`}
                      >
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-card border border-line/80 shadow-xs">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200" />
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover object-center select-none"
                            // @ts-ignore
                            fetchPriority="high"
                            loading="eager"
                          />
                          {item.categoryChip && (
                            <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-control text-[10px] font-mono font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs z-20 pointer-events-none">
                              {item.categoryChip}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none opacity-40" />
                        </div>
                        <div className="pt-3 h-[48px] overflow-hidden">
                          <h3 className="text-[14px] font-bold text-ink tracking-tight line-clamp-2 leading-snug group-hover:text-[#8b1a1a] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Explore Work CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <MagneticButton
            href="/video-editing"
            variant="primary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-black rounded-control shadow-red-btn !bg-[#8b1a1a] hover:!bg-[#8b1a1a]/90"
          >
            <span>Explore Video Editing</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
          <MagneticButton
            href="/graphic-design"
            variant="secondary"
            size="lg"
            className="px-7 py-3.5 text-xs sm:text-sm font-bold rounded-control border border-line hover:border-[#8b1a1a]/40 text-ink hover:text-[#8b1a1a]"
          >
            <span>Explore Graphic Design</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/**
 * Memoized Slot Card Component for Desktop and Tablet
 */
interface SlotCardProps {
  slotIndex: number;
  videoItem?: PortfolioItem;
  designItem?: PortfolioItem;
  geom: SlotGeometry;
  activeTab: "video" | "design";
  sharedSpring: Transition;
  isMorphSettled: () => boolean;
}

const SlotCard = React.memo(function SlotCard({
  slotIndex,
  videoItem,
  designItem,
  geom,
  activeTab,
  sharedSpring,
  isMorphSettled,
}: SlotCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = activeTab === "video" ? videoItem : designItem;
  const activeHref = activeItem?.href || "#";
  const activeTitle = activeItem?.title || "";

  // Stop video immediately if active tab changes away from video
  useEffect(() => {
    if (activeTab !== "video") {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsVideoPlaying(false);
    }
  }, [activeTab]);

  const handleMouseEnter = useCallback(() => {
    if (activeTab !== "video" || !videoItem?.videoPreview) return;
    setShouldLoadVideo(true);

    if (isMorphSettled()) {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => setIsVideoPlaying(true))
          .catch(() => {});
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => setIsVideoPlaying(true))
            .catch(() => {});
        }
      }, 600);
    }
  }, [activeTab, videoItem, isMorphSettled]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsVideoPlaying(false);
  }, []);

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{
        willChange: "transform, opacity",
        contain: "layout paint",
      }}
      animate={{
        x: geom.x,
        y: geom.y,
        width: geom.width,
        height: geom.imageHeight + TITLE_GAP + TITLE_BLOCK_HEIGHT,
        opacity: geom.opacity,
        scale: geom.scale,
      }}
      transition={sharedSpring}
    >
      <Link
        href={activeHref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group block relative w-full h-full select-none cursor-pointer"
        style={{
          pointerEvents: geom.pointerEvents,
        }}
        aria-label={`${activeTitle} - View case study`}
      >
        {/* 
          Image Wrapper:
          Animates height with shared spring.
          overflow: hidden and rounded corners.
          Image inside is NOT scaled, so it reveals/crops gracefully without distorting.
        */}
        <motion.div
          className="relative w-full overflow-hidden bg-slate-100 rounded-card border border-line/80 shadow-xs group-hover:border-[#8b1a1a]/40 group-hover:shadow-lg group-hover:-translate-y-1 transition-[box-shadow,border-color,transform] duration-200"
          animate={{
            height: geom.imageHeight,
          }}
          transition={sharedSpring}
          style={{
            contain: "layout paint",
          }}
        >
          {/* Neutral Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200" />

          {/* VIDEO LAYER */}
          {videoItem && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: activeTab === "video" ? 1 : 0,
              }}
              transition={{
                duration: 0.35,
                delay: activeTab === "video" ? 0.08 + slotIndex * 0.03 : 0,
                ease: "easeOut",
              }}
              style={{
                pointerEvents: activeTab === "video" ? "auto" : "none",
              }}
            >
              <img
                src={videoItem.thumbnail}
                alt={videoItem.title}
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
                decoding="async"
              />

              {/* Video Preview on Desktop Hover (loaded on demand) */}
              {videoItem.videoPreview && shouldLoadVideo && (
                <video
                  ref={videoRef}
                  src={videoItem.videoPreview}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  onCanPlay={() => setIsVideoPlaying(true)}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                    isVideoPlaying ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}

              {/* Category Chip (Video) */}
              {videoItem.categoryChip && (
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-control text-[11px] font-mono font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs z-20 pointer-events-none">
                  {videoItem.categoryChip}
                </div>
              )}

              {/* Video Play Badge */}
              <div className="absolute bottom-3 right-3 z-20 pointer-events-none transition-transform duration-200 group-hover:scale-110">
                <div className="w-7 h-7 rounded-control bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xs">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </div>

              {/* Protective Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.div>
          )}

          {/* DESIGN LAYER */}
          {designItem && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: activeTab === "design" ? 1 : 0,
              }}
              transition={{
                duration: 0.35,
                delay: activeTab === "design" ? 0.08 + slotIndex * 0.03 : 0,
                ease: "easeOut",
              }}
              style={{
                pointerEvents: activeTab === "design" ? "auto" : "none",
              }}
            >
              <img
                src={designItem.thumbnail}
                alt={designItem.title}
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
                decoding="async"
              />

              {/* Category Chip (Design) */}
              {designItem.categoryChip && (
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-control text-[11px] font-mono font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs z-20 pointer-events-none">
                  {designItem.categoryChip}
                </div>
              )}

              {/* Protective Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.div>
          )}
        </motion.div>

        {/* 
          Fixed-Height Title Block:
          Positioned directly under image wrapper at y = geom.imageHeight + 12 using absolute top-0.
          Moves with the image bottom edge via transform without reflowing.
          Crossfades titles with opacity only, no translate or scale. Zero text wobble.
        */}
        <motion.div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: `${TITLE_BLOCK_HEIGHT}px`,
          }}
          animate={{
            y: geom.imageHeight + TITLE_GAP,
          }}
          transition={sharedSpring}
        >
          {/* Video Title */}
          {videoItem && (
            <motion.h3
              className="absolute inset-0 text-[15px] sm:text-base font-bold text-ink tracking-tight line-clamp-2 leading-snug group-hover:text-[#8b1a1a] transition-colors"
              animate={{
                opacity: activeTab === "video" ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: activeTab === "video" ? 0.08 + slotIndex * 0.03 : 0,
                ease: "easeOut",
              }}
              style={{
                pointerEvents: activeTab === "video" ? "auto" : "none",
              }}
            >
              {videoItem.title}
            </motion.h3>
          )}

          {/* Design Title */}
          {designItem && (
            <motion.h3
              className="absolute inset-0 text-[15px] sm:text-base font-bold text-ink tracking-tight line-clamp-2 leading-snug group-hover:text-[#8b1a1a] transition-colors"
              animate={{
                opacity: activeTab === "design" ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: activeTab === "design" ? 0.08 + slotIndex * 0.03 : 0,
                ease: "easeOut",
              }}
              style={{
                pointerEvents: activeTab === "design" ? "auto" : "none",
              }}
            >
              {designItem.title}
            </motion.h3>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
});

export default FeaturedPortfolio;
