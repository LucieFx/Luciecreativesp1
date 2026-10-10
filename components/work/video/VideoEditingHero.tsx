"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface ReelCard {
  id: string;
  title: string;
  client: string;
  posterSrc: string;
  videoSrc: string;
}

// 4 curated columns of authentic Cloudinary-hosted 9:16 production reels
const COLUMN_0_CARDS: ReelCard[] = [
  {
    id: "vedam-tour",
    title: "Vedam Villas Luxury Tour",
    client: "Vedam Villas",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto,w_640/v1790684877/lucie-creatives/portfolio/vedam-villas-influencer-tour-poster.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267065/lucie-creatives/videos/clients/vedam-villas/vedam-villas-influencer-tour.mp4",
  },
  {
    id: "maruti-elevation",
    title: "Commercial Elevation Reveal",
    client: "Maruti Buildcon",
    posterSrc: "https://img.youtube.com/vi/sEvJ9brA9qo/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266960/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-elevation.mp4",
  },
  {
    id: "ambica-spaces",
    title: "Luxury Spaces & Textures",
    client: "Ambica Interior",
    posterSrc: "https://img.youtube.com/vi/F66vpDy_qQY/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266871/lucie-creatives/videos/clients/ambica-interior/ambica-interior-luxury-spaces.mp4",
  },
  {
    id: "leaders-ep03",
    title: "Cost of Complacency",
    client: "Leaders Diary",
    posterSrc: "https://img.youtube.com/vi/ibeJ-s5tAAU/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266918/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-03.mp4",
  },
];

const COLUMN_1_CARDS: ReelCard[] = [
  {
    id: "nirva-poolside",
    title: "Turquoise Poolside Oasis",
    client: "Nirva Resort",
    posterSrc: "https://img.youtube.com/vi/pNaOG63GbZA/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267018/lucie-creatives/videos/clients/nirva-resort/nirva-poolside-lifestyle.mp4",
  },
  {
    id: "leaders-ep01",
    title: "High-Conviction Founder Mindset",
    client: "Leaders Diary",
    posterSrc: "https://img.youtube.com/vi/NajP1LgJ8qo/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266905/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-01.mp4",
  },
  {
    id: "carnival-drop",
    title: "Urban Streetwear Drop",
    client: "Carnival Clothing",
    posterSrc: "https://img.youtube.com/vi/5Dk-d1fmv3U/sddefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266818/lucie-creatives/videos/clients/brand-campaigns/carnival-clothing-lookbook.mp4",
  },
  {
    id: "vedam-living",
    title: "Master Living & High Ceilings",
    client: "Vedam Villas",
    posterSrc: "https://img.youtube.com/vi/aML3WYYORvg/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267069/lucie-creatives/videos/clients/vedam-villas/vedam-villas-luxury-living.mp4",
  },
];

const COLUMN_2_CARDS: ReelCard[] = [
  {
    id: "nandanvan-walkthrough",
    title: "Gated Bungalow Walkthrough",
    client: "Nandanvan Estates",
    posterSrc: "https://img.youtube.com/vi/z4Pzj3rfCL8/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266986/lucie-creatives/videos/clients/nandanvan-bungalows/nandanvan-bungalows-cinematic.mp4",
  },
  {
    id: "ambica-gallery",
    title: "Interior Gallery Tour",
    client: "Ambica Interior",
    posterSrc: "https://img.youtube.com/vi/FfJMUIOFfUw/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266853/lucie-creatives/videos/clients/ambica-interior/ambica-interior-gallery-tour.mp4",
  },
  {
    id: "nirva-twilight",
    title: "Twilight Dining & Ambience",
    client: "Nirva Resort",
    posterSrc: "https://img.youtube.com/vi/JRHLckRIWWw/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267003/lucie-creatives/videos/clients/nirva-resort/nirva-evening-ambience.mp4",
  },
  {
    id: "maruti-tour",
    title: "Prime Commercial Walkthrough",
    client: "Maruti Buildcon",
    posterSrc: "https://img.youtube.com/vi/hBqJLN1WB7I/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266968/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-site-tour.mp4",
  },
];

const COLUMN_3_CARDS: ReelCard[] = [
  {
    id: "leaders-ep02",
    title: "Scaling Through Ruthless Focus",
    client: "Leaders Diary",
    posterSrc: "https://img.youtube.com/vi/rOcovaHFf1k/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266910/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-02.mp4",
  },
  {
    id: "vedam-exterior",
    title: "Courtyard Sanctuaries",
    client: "Vedam Villas",
    posterSrc: "https://img.youtube.com/vi/rNPFd-3xSuw/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267055/lucie-creatives/videos/clients/vedam-villas/vedam-villas-exterior-tour.mp4",
  },
  {
    id: "nirva-hospitality",
    title: "Monumental Architecture",
    client: "Nirva Resort",
    posterSrc: "https://img.youtube.com/vi/DRH6FUhej7s/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267011/lucie-creatives/videos/clients/nirva-resort/nirva-hospitality-experience.mp4",
  },
  {
    id: "carnival-style",
    title: "High-Energy Style Lookbook",
    client: "Carnival Clothing",
    posterSrc: "https://img.youtube.com/vi/3b-kVgYMgjg/maxresdefault.jpg",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266887/lucie-creatives/videos/clients/brand-campaigns/carnival-clothing-style.mp4",
  },
];

export function VideoEditingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lockedInstanceKey, setLockedInstanceKey] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const reducedMotion = useReducedMotion() ?? false;

  // Smooth scroll handler
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.getElementById(href.slice(1));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // IntersectionObserver + tab visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Card click handling: clicking a video locks it and pauses drift; clicking again resumes drift
  const handleCardClick = (instanceKey: string) => {
    if (lockedInstanceKey === instanceKey) {
      // Toggle off if already playing -> wall resumes moving continuously!
      setLockedInstanceKey(null);
      setProgress(0);
    } else {
      // Lock and play the clicked video
      setLockedInstanceKey(instanceKey);
      setProgress(0);
    }
  };

  // The columns MOVE ALL THE TIME until the user explicitly clicks on a video
  const isDriftPaused =
    reducedMotion || !isInView || !isTabVisible || lockedInstanceKey !== null;

  // Render individual reel card (compact, scaled-down size)
  const renderCard = (card: ReelCard, isFirstRow: boolean, instanceKey: string) => {
    const isLocked = lockedInstanceKey === instanceKey;
    const isAnyLocked = lockedInstanceKey !== null;

    return (
      <motion.div
        key={instanceKey}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick(instanceKey)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick(instanceKey);
          }
        }}
        animate={{
          scale: isLocked ? 1.07 : 1,
          opacity: isLocked ? 1 : isAnyLocked ? 0.55 : 1,
          z: isLocked ? 70 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`reel-card group relative w-[104px] sm:w-[118px] lg:w-[130px] xl:w-[142px] 2xl:w-[152px] aspect-[9/16] rounded-[10px] border cursor-pointer select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#8B1A1A] transition-colors duration-200 ${
          isLocked
            ? "card-locked border-white/70 z-30 shadow-[0_20px_42px_rgba(0,0,0,0.85)]"
            : isAnyLocked
            ? "border-white/15 shadow-md hover:opacity-85"
            : "border-white/25 shadow-md shadow-black/30 hover:border-white/60 hover:brightness-105"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* When clicked, play the video on demand */}
        {isLocked ? (
          <>
            <video
              src={card.videoSrc}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) {
                  setProgress((v.currentTime / v.duration) * 100);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
            {/* Vignette gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-15 pointer-events-none" />

            {/* Clean rectangular NOW PLAYING tag with progress bar and close button */}
            <div className="absolute bottom-2 inset-x-2 z-20 flex flex-col gap-1 p-1.5 rounded-[6px] bg-black/85 border border-white/25 text-white shadow-md">
              <div className="flex items-center justify-between text-[9px] font-bold tracking-wider uppercase">
                <span className="flex items-center gap-1 text-white">
                  <span className="w-1.5 h-1.5 rounded-[2px] bg-[#FF4D5E] animate-pulse" />
                  PLAYING
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLockedInstanceKey(null);
                    setProgress(0);
                  }}
                  className="text-white/80 hover:text-white text-[8px] font-mono px-1 py-0.5 rounded-[3px] bg-white/15 hover:bg-white/25 cursor-pointer"
                  title="Close video and resume wall"
                >
                  ✕ RESUME
                </span>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-[2px] overflow-hidden">
                <div
                  className="h-full bg-white transition-[width] ease-linear duration-100 rounded-[2px]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              src={card.posterSrc}
              alt={card.title}
              fill
              sizes="(max-width: 640px) 110px, (max-width: 1024px) 130px, 160px"
              priority={isFirstRow}
              loading={isFirstRow ? undefined : "lazy"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />

            {/* Subtle client label on bottom */}
            <div aria-hidden="true" className="absolute bottom-2 inset-x-2 z-10 pointer-events-none">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-white/90 truncate drop-shadow-sm">
                {card.client}
              </p>
              <p className="text-[8px] text-white/60 truncate font-mono">9:16 Reel</p>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Video Editing Showreel and Services"
      className="relative w-full min-h-[calc(100svh-5rem)] bg-[#8B1A1A] overflow-hidden flex items-center pt-28 sm:pt-32 pb-12 sm:pb-16 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* ========================================================= */}
        {/* LEFT COLUMN (≈45% on desktop): Clean text, zero overlap   */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start text-left z-20 max-w-xl">
          {/* Eyebrow Tag: Clean rectangle, 10px radius, 1px light border */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white/10 border border-white/30 text-white/95 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-[2px] bg-white animate-pulse" />
            <span>LUCIE CREATIVES · VIDEO EDITING</span>
          </div>

          {/* Headline: clamp(44px, 5.5vw, 84px) with italic serif accent */}
          <div className="w-full min-h-[92px] sm:min-h-[100px] lg:min-h-[120px]" style={{ contain: "layout style" }}>
            <h1 className="text-white font-display font-black tracking-[-0.02em] leading-[1.0] text-[clamp(44px,5.5vw,84px)] text-balance">
              Videos people can&apos;t{" "}
              <span className="font-accent italic text-white text-[1.08em] tracking-normal inline">
                scroll past.
              </span>
            </h1>
          </div>

          {/* Subtext: existing honest copy */}
          <p
            className="mt-5 text-base sm:text-lg text-white/85 font-medium leading-relaxed max-w-lg text-balance min-h-[48px] sm:min-h-0"
            style={{ contain: "layout style" }}
          >
            Short-form reels and cinematic commercials, edited for attention and built to grow your brand.
          </p>

          {/* Action Buttons: 10px radius rectangles, site button heights */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-white hover:bg-white/90 text-[#8B1A1A] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>START A PROJECT ↗</span>
            </Link>

            <a
              href="#short-form-videos"
              onClick={(e) => handleAnchorClick(e, "#short-form-videos")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-transparent hover:bg-white/10 border border-white text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>SEE OUR REELS ↓</span>
            </a>
          </div>

          {/* Three Stat Boxes: Rectangles with 10px radius, honest metrics only */}
          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-lg">
            <a
              href="#short-form-videos"
              onClick={(e) => handleAnchorClick(e, "#short-form-videos")}
              className="rounded-[10px] border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 p-3 sm:p-3.5 text-center transition-all cursor-pointer"
            >
              <span className="block text-[11px] sm:text-xs font-semibold text-white/90 uppercase tracking-wide leading-tight">
                9:16 Vertical Reels
              </span>
            </a>
            <a
              href="#long-form-videos"
              onClick={(e) => handleAnchorClick(e, "#long-form-videos")}
              className="rounded-[10px] border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 p-3 sm:p-3.5 text-center transition-all cursor-pointer"
            >
              <span className="block text-[11px] sm:text-xs font-semibold text-white/90 uppercase tracking-wide leading-tight">
                16:9 Cinema Commercials
              </span>
            </a>
            <a
              href="#stat-break"
              onClick={(e) => handleAnchorClick(e, "#stat-break")}
              className="rounded-[10px] border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 p-3 sm:p-3.5 text-center transition-all cursor-pointer"
            >
              <span className="block text-[11px] sm:text-xs font-semibold text-white/90 uppercase tracking-wide leading-tight">
                63M+ Client Impact
              </span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (≈55% on desktop): 3D Reel Wall (Compact)   */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[420px] lg:h-[540px] xl:h-[580px] flex items-center justify-center overflow-visible">
          {/* Outer perspective viewport container */}
          <div
            className="wall-perspective-viewport relative w-full h-full flex items-center justify-center overflow-visible"
            aria-label="Showreel of our video edits"
            role="region"
            style={{ perspective: 1400 }}
          >
            {/* Soft Edge Fade Overlays (Matching maroon #8B1A1A, not grey) */}
            <div className="absolute top-0 inset-x-0 h-14 sm:h-20 bg-gradient-to-b from-[#8B1A1A] to-transparent z-25 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-[#8B1A1A] to-transparent z-25 pointer-events-none" />
            <div className="absolute left-0 inset-y-0 w-10 sm:w-16 bg-gradient-to-r from-[#8B1A1A] to-transparent z-25 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-8 sm:w-14 bg-gradient-to-l from-[#8B1A1A]/70 to-transparent z-25 pointer-events-none" />

            {/* 3D Tilted Wall Grid Container */}
            <div
              className="hero-wall-tilt flex gap-2.5 sm:gap-3 lg:gap-3.5 justify-center items-center"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Column 0: Drift Up */}
              <div
                className="column-track drift-col-up-0 flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0"
                style={{
                  animationPlayState: isDriftPaused ? "paused" : "running",
                }}
              >
                {COLUMN_0_CARDS.map((card, idx) =>
                  renderCard(card, idx === 0, `c0-orig-${card.id}`)
                )}
                {/* Seamless Duplication for infinite loop without jump */}
                {COLUMN_0_CARDS.map((card) =>
                  renderCard(card, false, `c0-dup-${card.id}`)
                )}
              </div>

              {/* Column 1: Drift Down */}
              <div
                className="column-track drift-col-down-1 flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0"
                style={{
                  animationPlayState: isDriftPaused ? "paused" : "running",
                }}
              >
                {COLUMN_1_CARDS.map((card, idx) =>
                  renderCard(card, idx === 0, `c1-orig-${card.id}`)
                )}
                {/* Seamless Duplication for infinite loop without jump */}
                {COLUMN_1_CARDS.map((card) =>
                  renderCard(card, false, `c1-dup-${card.id}`)
                )}
              </div>

              {/* Column 2: Drift Up (Visible on desktop ≥1024px) */}
              <div
                className="column-track drift-col-up-2 hidden lg:flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0"
                style={{
                  animationPlayState: isDriftPaused ? "paused" : "running",
                }}
              >
                {COLUMN_2_CARDS.map((card, idx) =>
                  renderCard(card, idx === 0, `c2-orig-${card.id}`)
                )}
                {/* Seamless Duplication for infinite loop without jump */}
                {COLUMN_2_CARDS.map((card) =>
                  renderCard(card, false, `c2-dup-${card.id}`)
                )}
              </div>

              {/* Column 3: Drift Down (Visible on wide screens ≥1536px) */}
              <div
                className="column-track drift-col-down-3 hidden 2xl:flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0"
                style={{
                  animationPlayState: isDriftPaused ? "paused" : "running",
                }}
              >
                {COLUMN_3_CARDS.map((card, idx) =>
                  renderCard(card, idx === 0, `c3-orig-${card.id}`)
                )}
                {/* Seamless Duplication for infinite loop without jump */}
                {COLUMN_3_CARDS.map((card) =>
                  renderCard(card, false, `c3-dup-${card.id}`)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS animations for 60fps GPU transforms & responsive 3D tilt angles */}
      <style jsx>{`
        @keyframes columnDriftUp {
          0% {
            transform: translate3d(0, 0%, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        @keyframes columnDriftDown {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0%, 0);
          }
        }

        .drift-col-up-0 {
          animation: columnDriftUp 22s linear infinite;
          will-change: transform;
        }
        .drift-col-down-1 {
          animation: columnDriftDown 26s linear infinite;
          will-change: transform;
        }
        .drift-col-up-2 {
          animation: columnDriftUp 20s linear infinite;
          will-change: transform;
        }
        .drift-col-down-3 {
          animation: columnDriftDown 24s linear infinite;
          will-change: transform;
        }

        /* Responsive 3D Wall Tilt Transformations */
        @media (max-width: 639px) {
          .hero-wall-tilt {
            transform: rotateZ(4deg);
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-wall-tilt {
            transform: rotateX(6deg) rotateY(-8deg) rotateZ(3deg);
          }
        }
        @media (min-width: 1024px) {
          .hero-wall-tilt {
            transform: rotateX(10deg) rotateY(-15deg) rotateZ(5deg);
          }
        }

        /* Accessibility: prefers-reduced-motion stops all drift animations while maintaining the static tilted grid */
        @media (prefers-reduced-motion: reduce) {
          .drift-col-up-0,
          .drift-col-down-1,
          .drift-col-up-2,
          .drift-col-down-3 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
