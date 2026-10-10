"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getVisibleWebProjects } from "@/data/web-projects";
import { GRAPHIC_DESIGN_PROJECTS } from "@/lib/graphic-work-data";
import { VIDEO_PROJECTS } from "@/lib/video-work-data";

/**
 * Parallax toggle constant:
 * If true, cursor movement adds a tiny 6px parallax shift ONLY on content INSIDE devices.
 * Devices themselves NEVER move or change position.
 */
export const HERO_PARALLAX = false;

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */

export interface MacBookItem {
  id: string;
  type: "website" | "design";
  title: string;
  category: string;
  client: string;
  slug: string;
  link: string;
  imageSrc: string;
  isTall?: boolean;
}

export interface PhoneItem {
  id: string;
  title: string;
  client: string;
  slug: string;
  link: string;
  videoSrc: string;
  posterSrc: string;
}

/* ==========================================================================
   DATA POOL BUILDERS
   ========================================================================== */

function buildWebPool(): MacBookItem[] {
  const visibleWebs = getVisibleWebProjects();
  return visibleWebs.map((w) => {
    const isTall = Boolean(w.fullPreviewImage);
    const imageSrc = w.fullPreviewImage || w.screenshotDesktop;
    return {
      id: `web-${w.slug}`,
      type: "website",
      title: w.title,
      category: w.category,
      client: w.title,
      slug: w.slug,
      link: `/web-development#${w.slug}`,
      imageSrc,
      isTall,
    };
  });
}

function buildDesignPool(): MacBookItem[] {
  const pool: MacBookItem[] = [];
  const seenSrcs = new Set<string>();

  for (const gp of GRAPHIC_DESIGN_PROJECTS) {
    if (!gp.posterSrc || seenSrcs.has(gp.posterSrc)) continue;

    // Filter rules: ratio between 0.5 and 2.5, width >= 800px if provided
    const w = gp.width || 1000;
    const h = gp.height || 1000;
    const ratio = w / h;

    if (w >= 800 && ratio >= 0.5 && ratio <= 2.5) {
      seenSrcs.add(gp.posterSrc);
      pool.push({
        id: `design-${gp.slug}`,
        type: "design",
        title: gp.title,
        category: gp.category || "Graphic Design",
        client: gp.client,
        slug: gp.slug,
        link: `/work/${gp.slug}`,
        imageSrc: gp.posterSrc,
      });
    }

    // Process stills if eligible
    if (gp.processStills && Array.isArray(gp.processStills)) {
      gp.processStills.forEach((still, idx) => {
        if (
          still.src &&
          !seenSrcs.has(still.src) &&
          !still.src.includes("website-mockup") &&
          !still.src.includes("color-palette")
        ) {
          const sw = still.width || 1000;
          const sh = still.height || 1000;
          const sRatio = sw / sh;
          if (sw >= 800 && sRatio >= 0.5 && sRatio <= 2.5) {
            seenSrcs.add(still.src);
            pool.push({
              id: `design-${gp.slug}-still-${idx}`,
              type: "design",
              title: still.caption || `${gp.title} Showcase`,
              category: "Graphic Design",
              client: gp.client,
              slug: gp.slug,
              link: `/work/${gp.slug}`,
              imageSrc: still.src,
            });
          }
        }
      });
    }
  }

  return pool;
}

function buildReelPool(): PhoneItem[] {
  const reels: PhoneItem[] = [];
  const seenVideos = new Set<string>();

  for (const vp of VIDEO_PROJECTS) {
    const isVertical =
      !vp.aspectRatio || vp.aspectRatio === "9/16" || (vp.aspectRatio as string) === "9:16";

    if (isVertical && vp.videoSrc && vp.posterSrc && !seenVideos.has(vp.videoSrc)) {
      seenVideos.add(vp.videoSrc);
      reels.push({
        id: `reel-${vp.slug}`,
        title: vp.title,
        client: vp.client,
        slug: vp.slug,
        link: `/work/${vp.slug}`,
        videoSrc: vp.videoSrc,
        posterSrc: vp.posterSrc,
      });
    }

    if (vp.multiVideos && Array.isArray(vp.multiVideos)) {
      for (const mv of vp.multiVideos) {
        const mvVertical =
          !mv.aspectRatio || mv.aspectRatio === "9/16" || (mv.aspectRatio as string) === "9:16";
        if (mvVertical && mv.videoSrc && mv.posterSrc && !seenVideos.has(mv.videoSrc)) {
          seenVideos.add(mv.videoSrc);
          reels.push({
            id: `reel-${mv.id}`,
            title: mv.title || vp.title,
            client: vp.client,
            slug: vp.slug,
            link: `/work/${vp.slug}`,
            videoSrc: mv.videoSrc,
            posterSrc: mv.posterSrc,
          });
        }
      }
    }
  }

  return reels;
}

/* ==========================================================================
   SHUFFLE BAG & LOCAL STORAGE HELPERS
   ========================================================================== */

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getShuffledPools(): { macbookQueue: MacBookItem[]; phoneQueue: PhoneItem[] } {
  const webs = buildWebPool();
  const designs = buildDesignPool();
  const reels = buildReelPool();

  let macbookOrderIds: string[] = [];
  let phoneOrderIds: string[] = [];

  const STORAGE_KEY = "lucie_hero_scene_shuffle_v2";

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.macbookOrderIds)) macbookOrderIds = parsed.macbookOrderIds;
        if (Array.isArray(parsed.phoneOrderIds)) phoneOrderIds = parsed.phoneOrderIds;
      }
    }
  } catch {
    // Fallback if localStorage blocked
  }

  // Shuffle webs and designs
  const shuffledWebs = fisherYatesShuffle(webs);
  const shuffledDesigns = fisherYatesShuffle(designs);

  // Interleave: Website, Design, Design, Website, Design, Design...
  const combinedMacBook: MacBookItem[] = [];
  let wIdx = 0;
  let dIdx = 0;

  while (wIdx < shuffledWebs.length || dIdx < shuffledDesigns.length) {
    if (wIdx < shuffledWebs.length) {
      combinedMacBook.push(shuffledWebs[wIdx++]);
    }
    if (dIdx < shuffledDesigns.length) {
      combinedMacBook.push(shuffledDesigns[dIdx++]);
    }
    if (dIdx < shuffledDesigns.length) {
      combinedMacBook.push(shuffledDesigns[dIdx++]);
    }
  }

  const shuffledPhone = fisherYatesShuffle(reels);

  // Rotate queues if previous order IDs exist so returning visitors see fresh content
  let macbookQueue = combinedMacBook;
  if (macbookOrderIds.length > 0) {
    const firstUnseenIdx = combinedMacBook.findIndex((item) => !macbookOrderIds.includes(item.id));
    if (firstUnseenIdx > 0) {
      macbookQueue = [
        ...combinedMacBook.slice(firstUnseenIdx),
        ...combinedMacBook.slice(0, firstUnseenIdx),
      ];
    }
  }

  let phoneQueue = shuffledPhone;
  if (phoneOrderIds.length > 0) {
    const firstUnseenReelIdx = shuffledPhone.findIndex((item) => !phoneOrderIds.includes(item.id));
    if (firstUnseenReelIdx > 0) {
      phoneQueue = [
        ...shuffledPhone.slice(firstUnseenReelIdx),
        ...shuffledPhone.slice(0, firstUnseenReelIdx),
      ];
    }
  }

  // Persist updated order
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          macbookOrderIds: macbookQueue.map((m) => m.id),
          phoneOrderIds: phoneQueue.map((p) => p.id),
        })
      );
    }
  } catch {
    // Ignore quota/incognito errors
  }

  return { macbookQueue, phoneQueue };
}

/* ==========================================================================
   MAIN COMPONENT: StackedAdaptiveCards (Fixed Two-Device Scene)
   ========================================================================== */

export function StackedAdaptiveCards() {
  const shouldReduceMotion = useReducedMotion();

  // Guard Strict Mode double init
  const hasInitializedRef = useRef(false);

  // Queues & Indices
  const [macbookQueue, setMacbookQueue] = useState<MacBookItem[]>([]);
  const [phoneQueue, setPhoneQueue] = useState<PhoneItem[]>([]);

  const [macbookIndex, setMacbookIndex] = useState(0);
  const [phoneIndex, setPhoneIndex] = useState(0);

  // Controls & States
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Phone video states & fallbacks
  const [phoneVideoFailed, setPhoneVideoFailed] = useState(false);
  const [phoneVideoLoaded, setPhoneVideoLoaded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Responsive Scaling Observer
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Cursor parallax state
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  /* --------------------------------------------------------------------------
     1. INITIALIZATION & PRELOADING
     -------------------------------------------------------------------------- */
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const { macbookQueue: mQ, phoneQueue: pQ } = getShuffledPools();
    setMacbookQueue(mQ);
    setPhoneQueue(pQ);

    const firstMacBook = mQ[0];
    const firstPhone = pQ[0];

    const preloadPromises: Promise<void>[] = [];

    if (firstMacBook?.imageSrc) {
      preloadPromises.push(
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = firstMacBook.imageSrc;
          if (img.decode) {
            img.decode().then(() => resolve()).catch(() => resolve());
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
      );
    }

    if (firstPhone?.posterSrc) {
      preloadPromises.push(
        new Promise<void>((resolve) => {
          const poster = new window.Image();
          poster.src = firstPhone.posterSrc;
          if (poster.decode) {
            poster.decode().then(() => resolve()).catch(() => resolve());
          } else {
            poster.onload = () => resolve();
            poster.onerror = () => resolve();
          }
        })
      );
    }

    // Fallback timeout 1500ms
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 1500));

    Promise.race([Promise.all(preloadPromises), timeoutPromise]).then(() => {
      setIsReady(true);
    });
  }, []);

  /* --------------------------------------------------------------------------
     2. RESIZE OBSERVER (Uniform 760x560 Scale)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      const scale = rect.width / 760;
      setStageScale(scale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* --------------------------------------------------------------------------
     3. INTERSECTION OBSERVER & VISIBILITY CHANGE (Pause when hidden)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  /* --------------------------------------------------------------------------
     4. CURSOR PARALLAX (Optional HERO_PARALLAX)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!HERO_PARALLAX || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 6;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 6;
      setParallaxOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  /* --------------------------------------------------------------------------
     5. MACBOOK SLIDE TIMER (5.5s Website, 4.0s Design)
     -------------------------------------------------------------------------- */
  const currentMacBookItem = macbookQueue[macbookIndex] || null;

  useEffect(() => {
    if (!isReady || isPaused || !isVisible || macbookQueue.length === 0) return;

    const currentItem = macbookQueue[macbookIndex];
    if (!currentItem) return;

    const duration = shouldReduceMotion
      ? 6000
      : currentItem.type === "website"
      ? 5500
      : 4000;

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setMacbookIndex((prev) => (prev + 1) % macbookQueue.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }, duration);

    return () => clearTimeout(timer);
  }, [isReady, isPaused, isVisible, macbookIndex, macbookQueue, shouldReduceMotion]);

  /* --------------------------------------------------------------------------
     6. PHONE REEL TIMER & VIDEO HANDLING (Offset by ~2.5s)
     -------------------------------------------------------------------------- */
  const currentPhoneItem = phoneQueue[phoneIndex] || null;

  // Preload next reel's poster
  useEffect(() => {
    if (phoneQueue.length === 0) return;
    const nextIdx = (phoneIndex + 1) % phoneQueue.length;
    const nextReel = phoneQueue[nextIdx];
    if (nextReel?.posterSrc) {
      const img = new window.Image();
      img.src = nextReel.posterSrc;
    }
  }, [phoneIndex, phoneQueue]);

  // Network condition check for Save-Data / Slow connection fallback
  const isSlowConnection = useMemo(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    if (conn?.saveData) return true;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "3g") return true;
    return false;
  }, []);

  const advancePhone = useCallback(() => {
    setPhoneVideoLoaded(false);
    setPhoneVideoFailed(false);
    setVideoProgress(0);
    setPhoneIndex((prev) => (prev + 1) % phoneQueue.length);
  }, [phoneQueue.length]);

  // Handle Video playback & progress timer
  useEffect(() => {
    if (!isReady || isPaused || !isVisible || phoneQueue.length === 0) return;

    if (shouldReduceMotion || isSlowConnection || phoneVideoFailed) {
      // Poster-only fallback: advance after 6s
      const timer = setTimeout(advancePhone, 6000);
      const interval = setInterval(() => {
        setVideoProgress((p) => Math.min(100, p + 1.67));
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }

    // Video playback max duration timeout (9s max or video end)
    const maxTimer = setTimeout(advancePhone, 9000);

    return () => clearTimeout(maxTimer);
  }, [
    isReady,
    isPaused,
    isVisible,
    phoneIndex,
    phoneQueue.length,
    shouldReduceMotion,
    isSlowConnection,
    phoneVideoFailed,
    advancePhone,
  ]);

  // Sync Video Element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused || !isVisible) {
      video.pause();
    } else {
      video.play().catch(() => {
        setPhoneVideoFailed(true);
      });
    }
  }, [isPaused, isVisible, phoneIndex]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    setVideoProgress(pct);
  };

  /* --------------------------------------------------------------------------
     7. CAPTION INFO
     -------------------------------------------------------------------------- */
  const activeCaption = useMemo(() => {
    if (!currentMacBookItem) return "Website · Media House Agency";
    if (currentMacBookItem.type === "website") {
      return `Website · ${currentMacBookItem.title}`;
    }
    return `Design · ${currentMacBookItem.title}`;
  }, [currentMacBookItem]);

  return (
    <div
      role="img"
      aria-label="Interactive showcase featuring a MacBook presenting web and graphic design work, and an iPhone presenting vertical video reels"
      className="w-full flex flex-col items-center justify-center overflow-visible select-none"
    >
      {/* 
        CONTAINER STAGE (760 x 560 design aspect ratio)
        Reserves aspect ratio space on server & client to prevent Layout Shift (CLS = 0).
      */}
      <div
        ref={stageContainerRef}
        className="relative w-full max-w-[760px] aspect-[760/560] overflow-visible rounded-3xl"
        style={{
          height: stageScale ? `${560 * stageScale}px` : "auto",
        }}
      >
        {/* Uniformly Scaled Inner Stage (760px x 560px) */}
        <div
          className="absolute top-0 left-0 w-[760px] h-[560px] origin-top-left pointer-events-auto overflow-visible"
          style={{
            transform: `scale(${stageScale})`,
          }}
        >
          {/* Ambient Soft Maroon Background Glow (6-8% opacity) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(139, 26, 26, 0.08) 0%, rgba(139, 26, 26, 0.02) 60%, transparent 85%)",
            }}
          />

          {/* ==================================================================
              (A) MACBOOK DEVICE (Centered-left, 640px wide lid, 16:10 screen)
             ================================================================== */}
          <motion.div
            className="absolute left-[20px] top-[40px] w-[640px] h-[400px] z-10"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={
              isReady
                ? shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
                : {}
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : { type: "spring", stiffness: 90, damping: 18, delay: 0 }
            }
          >
            {/* Soft Elliptical Contact Shadow under MacBook Base */}
            <div
              aria-hidden="true"
              className="absolute -bottom-[22px] -left-[20px] w-[680px] h-[26px] pointer-events-none -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(139, 26, 26, 0.09) 0%, rgba(0, 0, 0, 0.18) 45%, transparent 75%)",
                filter: "blur(8px)",
              }}
            />

            {/* MacBook Lid Bezel Frame (640 x 400, outer radius 18px, black bezel 10px) */}
            <div
              className="relative w-full h-full bg-[#0d0d0f] rounded-[18px] p-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#1f1f23] overflow-hidden"
              style={{ contain: "layout style" }}
            >
              {/* Top Camera Notch Pill */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[18px] bg-[#0a0a0c] rounded-b-md flex items-center justify-center pointer-events-none z-40"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#18181b] border border-[#27272a]" />
              </div>

              {/* MacBook Screen Viewport (620 x 380, inner radius 8px) */}
              <Link
                href={currentMacBookItem?.link || "/web-development"}
                aria-label={`View ${currentMacBookItem?.title || "project"} details`}
                className="relative block w-full h-full bg-[#050505] rounded-lg overflow-hidden group cursor-pointer"
              >
                {/* Screen Content Layer */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    transform: HERO_PARALLAX
                      ? `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`
                      : "none",
                    willChange: isTransitioning ? "transform, opacity, filter" : "auto",
                  }}
                >
                  {currentMacBookItem && (
                    <div
                      key={currentMacBookItem.id}
                      className="absolute inset-0 w-full h-full transition-all duration-600 ease-out"
                    >
                      {currentMacBookItem.type === "website" ? (
                        /* WEBSITE SLIDE: Tall preview auto-scroll or slow zoom */
                        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0c]">
                          <div
                            className={`w-full relative transition-transform duration-[4500ms] ease-out ${
                              currentMacBookItem.isTall && !shouldReduceMotion
                                ? "hover:-translate-y-[35%]"
                                : ""
                            }`}
                            style={{
                              animation:
                                currentMacBookItem.isTall && !shouldReduceMotion
                                  ? "macbookScroll 5.5s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                                  : shouldReduceMotion
                                  ? "none"
                                  : "macbookZoom 5.5s linear forwards",
                            }}
                          >
                            <Image
                              src={currentMacBookItem.imageSrc}
                              alt={currentMacBookItem.title}
                              width={1280}
                              height={800}
                              priority
                              className="w-full h-auto object-top group-hover:brightness-105 transition-all duration-300"
                              sizes="(max-width: 768px) 100vw, 640px"
                            />
                          </div>
                        </div>
                      ) : (
                        /* DESIGN SLIDE: Soft canvas, uncropped object-fit contain + blurred scaled backdrop */
                        <div className="relative w-full h-full overflow-hidden bg-[#f4f5f7] flex items-center justify-center">
                          {/* Blurred Scaled Background Backdrop */}
                          <Image
                            src={currentMacBookItem.imageSrc}
                            alt=""
                            fill
                            aria-hidden="true"
                            className="object-cover blur-xl scale-125 opacity-35"
                            sizes="640px"
                          />

                          {/* "OURS" Badge Top-Left */}
                          <div className="absolute top-3 left-3 z-30 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            OURS
                          </div>

                          {/* Main Uncropped Artwork */}
                          <div
                            className="relative w-full h-full p-4 flex items-center justify-center z-10"
                            style={{
                              animation: shouldReduceMotion ? "none" : "macbookZoom 4.0s linear forwards",
                            }}
                          >
                            <Image
                              src={currentMacBookItem.imageSrc}
                              alt={currentMacBookItem.title}
                              fill
                              priority
                              className="object-contain drop-shadow-md group-hover:brightness-105 transition-all duration-300"
                              sizes="640px"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Screen Static Glare & Slow Glare Sweep (Every 9s) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 45%)",
                  }}
                />
                {!shouldReduceMotion && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
                  >
                    <div
                      className="w-[200%] h-full transform -rotate-45"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.07) 50%, transparent 70%)",
                        animation: "glareSweep 9s ease-in-out infinite",
                      }}
                    />
                  </div>
                )}
              </Link>
            </div>

            {/* Aluminum Base Below Lid (6% wider than lid, height 14px) */}
            <div
              className="absolute -bottom-[14px] -left-[19px] w-[678px] h-[14px] rounded-b-[10px] shadow-md border-t border-[#abb0b9] overflow-hidden pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, #e1e4e8 0%, #d0d4dc 40%, #b5b9c3 100%)",
              }}
            >
              {/* Center Top Hinge Indent Notch */}
              <div className="w-[90px] h-[4px] mx-auto bg-[#4a4d55] rounded-b-sm" />
              {/* Center Front Opening Lip Notch */}
              <div className="w-[56px] h-[3px] mx-auto bg-[#8e929b] rounded-full mt-1" />
            </div>
          </motion.div>

          {/* ==================================================================
              (B) IPHONE DEVICE (Overlapping lower-right corner of MacBook)
                  Positioned at left: 520px, top: 110px (Width 200px, 9:19.5 ratio ~420px)
             ================================================================== */}
          <motion.div
            className="absolute left-[520px] top-[110px] w-[200px] h-[420px] z-30"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={
              isReady
                ? shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
                : {}
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : { type: "spring", stiffness: 90, damping: 18, delay: 0.15 }
            }
          >
            {/* Titanium Frame Container (Outer Radius 44px) */}
            <div
              className="relative w-full h-full bg-[#1c1c1e] rounded-[44px] p-[6px] border border-white/20 shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5),0_10px_25px_-5px_rgba(139,26,26,0.15)] overflow-hidden"
              style={{ contain: "layout style" }}
            >
              {/* Volume Side Buttons */}
              <div className="absolute -left-[3px] top-[85px] w-[3px] h-[22px] bg-[#2d2d30] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[115px] w-[3px] h-[22px] bg-[#2d2d30] rounded-l-sm" />
              {/* Power Button */}
              <div className="absolute -right-[3px] top-[100px] w-[3px] h-[34px] bg-[#2d2d30] rounded-r-sm" />

              {/* Inset Screen Viewport (Inner Radius 38px) */}
              <Link
                href={currentPhoneItem?.link || "/video-editing"}
                aria-label={`View ${currentPhoneItem?.title || "reel"} details`}
                className="relative block w-full h-full bg-black rounded-[38px] overflow-hidden group cursor-pointer"
              >
                {/* Dynamic Island Pill */}
                <div
                  aria-hidden="true"
                  className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-black rounded-full flex items-center justify-end pr-2.5 z-40 border border-white/10"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a10] border border-[#1a1a24]" />
                </div>

                {/* Story-Style Progress Bar (Below Dynamic Island) */}
                <div
                  aria-hidden="true"
                  className="absolute top-[34px] left-3 right-3 h-[2px] bg-white/25 rounded-full overflow-hidden z-40 pointer-events-none"
                >
                  <div
                    className="h-full w-full bg-white/90 rounded-full origin-left will-change-transform"
                    style={{
                      transform: `scaleX(${videoProgress / 100})`,
                      transition: "transform 100ms linear",
                    }}
                  />
                </div>

                {/* Screen Content Layer */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    transform: HERO_PARALLAX
                      ? `translate3d(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px, 0)`
                      : "none",
                  }}
                >
                  {currentPhoneItem && (
                    <div key={currentPhoneItem.id} className="relative w-full h-full">
                      {/* Poster Image (Always visible first / fallback) */}
                      <Image
                        src={currentPhoneItem.posterSrc}
                        alt={currentPhoneItem.title}
                        fill
                        priority
                        className={`object-cover group-hover:brightness-105 transition-all duration-300 ${
                          phoneVideoLoaded ? "opacity-0" : "opacity-100"
                        }`}
                        sizes="200px"
                      />

                      {/* Muted Autoplay Video (Fades in on load) */}
                      {!shouldReduceMotion && !isSlowConnection && !phoneVideoFailed && (
                        <video
                          ref={videoRef}
                          src={currentPhoneItem.videoSrc}
                          poster={currentPhoneItem.posterSrc}
                          preload="metadata"
                          muted
                          playsInline
                          autoPlay
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:brightness-105 ${
                            phoneVideoLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoadedData={() => setPhoneVideoLoaded(true)}
                          onCanPlay={() => setPhoneVideoLoaded(true)}
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={advancePhone}
                          onError={() => setPhoneVideoFailed(true)}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Decorative Play Icon (Bottom-Right) */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-3.5 right-3.5 z-30 w-6 h-6 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 pointer-events-none"
                >
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>

                {/* Static Glare & Slow Glare Sweep (Offset by 4.5s) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 45%)",
                  }}
                />
                {!shouldReduceMotion && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
                  >
                    <div
                      className="w-[200%] h-full transform -rotate-45"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)",
                        animation: "glareSweep 9s ease-in-out 4.5s infinite",
                      }}
                    />
                  </div>
                )}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================================================================
          CAPTION PILL & PAUSE TOGGLE (Below Devices)
         ================================================================== */}
      <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2.5 z-30">
        {/* Caption Pill */}
        <div
          aria-live="polite"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 shadow-sm border border-slate-200/80 backdrop-blur-md text-xs font-semibold text-slate-800 transition-all max-w-[92vw] text-ellipsis overflow-hidden"
        >
          <span
            className="w-2 h-2 rounded-full bg-[#8b1a1a] animate-pulse shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{activeCaption}</span>
        </div>

        {/* Pause / Play Toggle Button */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Play showcase auto-advance" : "Pause showcase auto-advance"}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-all cursor-pointer shrink-0"
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Keyframe Animation Styles */}
      <style jsx global>{`
        @keyframes macbookScroll {
          0% {
            transform: translateY(0%);
          }
          75% {
            transform: translateY(-35%);
          }
          100% {
            transform: translateY(-35%);
          }
        }
        @keyframes macbookZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.035);
          }
        }
        @keyframes glareSweep {
          0% {
            transform: translateX(-150%) rotate(-45deg);
          }
          35% {
            transform: translateX(150%) rotate(-45deg);
          }
          100% {
            transform: translateX(150%) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  );
}

export default StackedAdaptiveCards;
