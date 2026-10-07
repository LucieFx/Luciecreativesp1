"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { IPHONE_FRAME } from "@/components/work/iphone-frame-constants";

export type CardDiscipline = "Design" | "Video" | "Web";

export interface AdaptiveCardData {
  id: string;
  discipline: CardDiscipline;
  title: string;
  subtitle: string;
  image: string;
  videoSrc?: string;
  youtubeUrl?: string;
  alt: string;
  domain?: string;
  aspectRatio: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
  desktopRadius: number;
  mobileRadius: number;
}

export const ADAPTIVE_CARDS: AdaptiveCardData[] = [
  {
    id: "card-design",
    discipline: "Design",
    title: "Onirique Parfums",
    subtitle: "3D CGI & Identity",
    image:
      "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto,w_600/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp",
    alt: "Onirique Parfums 3D CGI and luxury fragrance branding",
    aspectRatio: "1/1",
    desktopWidth: 324,
    desktopHeight: 324,
    mobileWidth: 240,
    mobileHeight: 240,
    desktopRadius: 16,
    mobileRadius: 14,
  },
  {
    id: "card-video",
    discipline: "Video",
    title: "Ambica Interior Gallery",
    subtitle: "Material Precision & Craft Reel",
    image: "/ambica-interior-poster.webp",
    videoSrc:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790266871/lucie-creatives/videos/clients/ambica-interior/ambica-interior-luxury-spaces.mp4",
    youtubeUrl: "https://youtube.com/shorts/F66vpDy_qQY?feature=share",
    alt: "Ambica Interior Gallery luxury material precision and craft reel edit",
    aspectRatio: "9/16",
    desktopWidth: 324,
    desktopHeight: 576,
    mobileWidth: 236,
    mobileHeight: 420,
    desktopRadius: 0,
    mobileRadius: 0,
  },
  {
    id: "card-web",
    discipline: "Web",
    title: "Media House Agency",
    subtitle: "Responsive Website Design & Build",
    image: "/projects/mediahouse-desktop.webp",
    domain: "mediahouseagency.com",
    alt: "Media House Agency creator talent and influencer media platform",
    aspectRatio: "16/9",
    desktopWidth: 432,
    desktopHeight: 243,
    mobileWidth: 280,
    mobileHeight: 158,
    desktopRadius: 10,
    mobileRadius: 8,
  },
];

const CARD_SIZE_CLASSES: Record<CardDiscipline, string> = {
  Design: "w-[240px] sm:w-[324px] h-[240px] sm:h-[324px] rounded-[14px] sm:rounded-[16px]",
  Video: "w-[236px] sm:w-[324px] h-[420px] sm:h-[576px]",
  Web: "w-[280px] sm:w-[432px] h-[158px] sm:h-[243px] rounded-[8px] sm:rounded-[10px]",
};

export function StackedAdaptiveCards() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [canLoadVideo, setCanLoadVideo] = useState<boolean>(false);
  const [cardsMounted, setCardsMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Only load heavy background assets and 5MB video upon user gesture/interaction
  useEffect(() => {
    const handleInteract = () => {
      setCardsMounted(true);
      setCanLoadVideo(true);
      window.removeEventListener("scroll", handleInteract);
      window.removeEventListener("touchstart", handleInteract);
      window.removeEventListener("pointerdown", handleInteract);
      window.removeEventListener("click", handleInteract);
    };

    window.addEventListener("scroll", handleInteract, { passive: true });
    window.addEventListener("touchstart", handleInteract, { passive: true });
    window.addEventListener("pointerdown", handleInteract, { passive: true });
    window.addEventListener("click", handleInteract, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleInteract);
      window.removeEventListener("touchstart", handleInteract);
      window.removeEventListener("pointerdown", handleInteract);
      window.removeEventListener("click", handleInteract);
    };
  }, []);

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Subtle 7-second auto rotation paused on user hover or if video is unmuted
  useEffect(() => {
    if (isHovered || !isMuted) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ADAPTIVE_CARDS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered, isMuted]);

  // Sync video playback with active card state once video can be loaded
  useEffect(() => {
    if (!canLoadVideo) return;
    const vid = videoRef.current;
    if (!vid) return;

    if (activeIndex === 1) {
      vid.play().catch(() => {
        setIsVideoPlaying(false);
      });
      setIsVideoPlaying(true);
    }
  }, [activeIndex, canLoadVideo]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!canLoadVideo) {
      setCanLoadVideo(true);
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      vid.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTabClick = (idx: number) => {
    setCardsMounted(true);
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  const activeCard = ADAPTIVE_CARDS[activeIndex];

  // Calculate layout states for cards relative to activeIndex:
  // Front (0), Back-Right (1), Back-Left (2)
  const getCardLayout = useCallback(
    (cardIndex: number) => {
      const diff = (cardIndex - activeIndex + 3) % 3;
      const card = ADAPTIVE_CARDS[cardIndex];

      const width = isMobile ? card.mobileWidth : card.desktopWidth;
      const height = isMobile ? card.mobileHeight : card.desktopHeight;
      const borderRadius = isMobile ? card.mobileRadius : card.desktopRadius;

      if (diff === 0) {
        // Active Front Card: full size, center, zero rotation, highest zIndex
        return {
          positionName: "front",
          zIndex: 30,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          width,
          height,
          borderRadius,
          isFront: true,
          cursor: "default",
        };
      } else if (diff === 1) {
        // Inactive Card 1 (Back-Right): clean +5deg tilt, offset to right
        const xOffset = isMobile ? 24 : 72;
        const yOffset = 0;
        return {
          positionName: "back-right",
          zIndex: 20,
          x: xOffset,
          y: yOffset,
          rotate: isMobile ? 4 : 5,
          scale: 0.84,
          opacity: 0.85,
          width,
          height,
          borderRadius,
          isFront: false,
          cursor: "pointer",
        };
      } else {
        // Inactive Card 2 (Back-Left): clean -5deg tilt, offset to left
        const xOffset = isMobile ? -24 : -72;
        const yOffset = 0;
        return {
          positionName: "back-left",
          zIndex: 10,
          x: xOffset,
          y: yOffset,
          rotate: isMobile ? -4 : -5,
          scale: 0.80,
          opacity: 0.70,
          width,
          height,
          borderRadius,
          isFront: false,
          cursor: "pointer",
        };
      }
    },
    [activeIndex, isMobile]
  );

  return (
    <div
      className="w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[600px] min-h-[520px] sm:min-h-[580px] md:min-h-[650px] flex flex-col items-center select-none"
      style={{ contain: "layout style" }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCardsMounted(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setCardsMounted(true)}
    >
      {/* 
        BOUNDING CONTAINER:
        Fixed-size bounding container (does not resize based on active tab so the hero never reflows).
        Grid place-items-center anchors all 3 cards exactly in the geometric center.
      */}
      <div
        className="relative w-full h-[460px] sm:h-[520px] md:h-[590px] grid place-items-center overflow-visible"
        style={{ perspective: "1200px" }}
      >
        {ADAPTIVE_CARDS.map((card, idx) => {
          const layout = getCardLayout(idx);

          return (
            <div
              key={card.id}
              role={layout.isFront ? undefined : "button"}
              aria-label={
                layout.isFront
                  ? `${card.title} - active showcase`
                  : card.discipline === "Web"
                  ? `https://${card.domain || "mediahouseagency.com"} - Switch to Web showcase: ${card.title}`
                  : `Switch to ${card.discipline} showcase: ${card.title}`
              }
              tabIndex={layout.isFront ? undefined : 0}
              onClick={() => handleTabClick(idx)}
              onKeyDown={(e) => {
                if (!layout.isFront && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleTabClick(idx);
                }
              }}
              className={`col-start-1 row-start-1 ${cardsMounted ? "will-change-transform" : ""} ${CARD_SIZE_CLASSES[card.discipline]} ${
                card.discipline === "Video"
                  ? layout.isFront
                    ? "drop-shadow-[0_24px_48px_rgba(0,0,0,0.32)]"
                    : "drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)] hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
                  : `overflow-hidden bg-slate-900 ${
                      layout.isFront
                        ? "shadow-[0_28px_60px_-15px_rgba(0,0,0,0.3),0_0_1px_rgba(0,0,0,0.2)] ring-1 ring-black/5"
                        : "shadow-[0_16px_38px_-10px_rgba(0,0,0,0.25)] hover:shadow-2xl ring-1 ring-black/10"
                    }`
              }`}
              style={{
                transform: `translate3d(${layout.x}px, ${layout.y}px, 0px) rotate(${layout.rotate}deg) scale(${layout.scale})`,
                opacity: layout.opacity,
                zIndex: layout.zIndex,
                transition: cardsMounted
                  ? "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 380ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
                cursor: layout.cursor,
                transformOrigin: "center center",
              }}
            >
              {/* 1. DESIGN CARD: Square 1:1, Border Radius 16px */}
              {card.discipline === "Design" && (
                <div className="relative w-full h-full bg-[#ffffff]">
                  {(layout.isFront || cardsMounted) && (
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      priority={layout.isFront}
                      sizes="(max-width: 640px) 250px, 340px"
                      className="object-cover"
                    />
                  )}
                  {/* Subtle inner border */}
                  <div className="absolute inset-0 rounded-[inherit] border border-black/10 pointer-events-none" />
                </div>
              )}

              {/* 2. VIDEO CARD: Real iPhone 15/16 Pro Frame with Masked Screen */}
              {card.discipline === "Video" && (
                <div
                  className="relative w-full h-full select-none group/phone"
                  onClick={layout.isFront ? handleTogglePlay : undefined}
                >
                  {/* ── LAYER A: CLIPPED SCREEN (Hardware Accelerated Rounded Bounds) ── */}
                  <div
                    className="absolute overflow-hidden bg-black text-white rounded-[28px] sm:rounded-[36px] pointer-events-auto"
                    style={{
                      top: `${IPHONE_FRAME.screenInsets.topPercent}%`,
                      bottom: `${IPHONE_FRAME.screenInsets.bottomPercent}%`,
                      left: `${IPHONE_FRAME.screenInsets.leftPercent}%`,
                      right: `${IPHONE_FRAME.screenInsets.rightPercent}%`,
                    }}
                  >
                    {/* High-priority LCP Poster Image */}
                    <img
                      src={card.image}
                      alt={card.alt}
                      width={380}
                      height={675}
                      // @ts-ignore
                      fetchPriority="auto"
                      loading="eager"
                      className={`absolute inset-0 w-full h-full object-cover ${
                        canLoadVideo ? "transition-opacity duration-500" : ""
                      } ${
                        canLoadVideo && isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                    />

                    {/* Video Player - deferred buffering to preserve mobile LCP */}
                    {canLoadVideo && (
                      <video
                        ref={videoRef}
                        src={card.videoSrc}
                        playsInline
                        muted={isMuted}
                        loop
                        autoPlay
                        preload="metadata"
                        className="w-full h-full object-cover"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                      />
                    )}

                    {/* Subtle Ambient Video Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                    {/* Screen Safe-Area Content (When Front) */}
                    {layout.isFront ? (
                      <>
                        {/* Top-Left: "OURS" Signature Badge */}
                        <div className="absolute top-2.5 left-2 z-30 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                            <span>Ours</span>
                          </span>
                        </div>

                        {/* Top-Right: Sound Mute/Unmute & Play/Pause Controls */}
                        <div className="absolute top-2.5 right-2 z-30 flex items-center gap-1 sm:gap-1.5">
                          <button
                            type="button"
                            onClick={handleToggleMute}
                            aria-label={isMuted ? "Unmute reel audio" : "Mute reel audio"}
                            className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                          >
                            {isMuted ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 text-[#22c55e]" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleTogglePlay}
                            aria-label={isVideoPlaying ? "Pause reel" : "Play reel"}
                            className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                          >
                            {isVideoPlaying ? (
                              <Pause className="w-3.5 h-3.5" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Bottom Metadata & Actions */}
                        <div className="absolute bottom-3 inset-x-3 z-30 flex flex-col gap-1.5 pointer-events-auto">
                          <div className="flex items-center justify-between text-white gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-[13px] font-bold tracking-tight leading-tight text-white drop-shadow-sm truncate">
                                Ambica Interior Gallery
                              </p>
                              <p className="text-xs text-white/90 font-mono leading-tight truncate mt-0.5">
                                Material Precision &amp; Craft
                              </p>
                            </div>

                            <a
                              href="https://youtube.com/shorts/F66vpDy_qQY?feature=share"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#CC0000] hover:bg-[#B30000] text-white text-xs font-bold tracking-wide shadow-md transition-transform hover:scale-105 shrink-0"
                              title="Watch full short on YouTube"
                            >
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span>Short</span>
                            </a>
                          </div>

                          {/* iOS Home Indicator Bar */}
                          <div className="w-14 sm:w-16 h-1 bg-white/50 rounded-full mx-auto mt-0.5" />
                        </div>
                      </>
                    ) : (
                      /* When Inactive/Tilted: Subtle play indicator */
                      <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xs">
                          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                        </span>
                      </div>
                    )}

                    {/* Inactive card tint inside the screen */}
                    {!layout.isFront && (
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    )}
                  </div>

                  {/* ── LAYER B: HARDWARE FRAME WEBP OVERLAY ON TOP ── */}
                  <div className="absolute inset-0 z-35 pointer-events-none" aria-hidden="true">
                    <img
                      src="/iphone-frame.webp"
                      alt="iPhone Hardware Frame"
                      width={576}
                      height={1024}
                      // @ts-ignore
                      fetchPriority="high"
                      loading="eager"
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  </div>

                  {/* iOS Dynamic Island Status Indicator Dot */}
                  <div
                    className="absolute z-40 pointer-events-none rounded-full bg-[#10b981] shadow-[0_0_3px_#10b981]"
                    style={{
                      top: "7.7%",
                      left: "58.8%",
                      width: "3px",
                      height: "3px",
                    }}
                  />
                </div>
              )}

              {/* 3. WEB CARD: Browser 16:9, Border Radius 10px */}
              {card.discipline === "Web" && (
                <div
                  className="relative w-full h-full bg-[#111317] flex flex-col"
                  aria-hidden={!layout.isFront ? "true" : undefined}
                >
                  {/* Browser Chrome Header */}
                  <div className="h-6 sm:h-7 bg-slate-900/95 flex items-center px-2.5 sm:px-3 gap-1.5 border-b border-white/10 shrink-0 z-20">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-90" />
                      <div className="w-2 h-2 rounded-full bg-[#FFBD2E] opacity-90" />
                      <div className="w-2 h-2 rounded-full bg-[#27C93F] opacity-90" />
                    </div>

                    {/* Mini Address Capsule */}
                    <div className="mx-auto h-5 px-3 rounded-full bg-white/10 text-xs font-mono text-white/80 flex items-center gap-1 select-none" aria-hidden="true">
                      <span className="text-white/40">https://</span>
                      <span>{card.domain || "mediahouseagency.com"}</span>
                    </div>
                  </div>

                  {/* Desktop Browser Viewport Screenshot */}
                  <div className="relative w-full flex-1">
                    {(layout.isFront || cardsMounted) && (
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        priority={layout.isFront}
                        sizes="(max-width: 640px) 310px, 440px"
                        className="object-cover object-top"
                      />
                    )}
                  </div>

                  {/* Browser window border */}
                  <div className="absolute inset-0 rounded-[inherit] border border-white/15 pointer-events-none" />
                </div>
              )}

              {/* 
                "OURS" PILL BADGE:
                Top-left corner of the active front card (Design and Web cards only; Video card has it inside screen)
                Dark translucent badge with pulsing red dot
              */}
              {layout.isFront && card.discipline !== "Video" && (
                <div className="absolute top-3 left-3 z-30 pointer-events-none transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span>Ours</span>
                  </span>
                </div>
              )}

              {/* Inactive card tint overlay (Design and Web cards only) */}
              {!layout.isFront && card.discipline !== "Video" && (
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* 
        CONTROLS & METADATA (BELOW STACK):
        Invariant height container guaranteeing zero layout shifts
      */}
      <div className="mt-5 w-full flex flex-col items-center">
        {/* Three-Tab Pill Control */}
        <div
          role="tablist"
          aria-label="Showcase category switcher"
          className="inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-line/80 shadow-xs"
        >
          {ADAPTIVE_CARDS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleTabClick(idx)}
                className={`px-4 py-1.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#8b1a1a] shadow-xs border border-line"
                    : "text-slate-600 hover:text-ink"
                }`}
              >
                {item.discipline}
              </button>
            );
          })}
        </div>

        {/* Project Title & Subtitle Caption */}
        <div className="mt-3 h-7 flex items-center justify-center overflow-hidden">
          <div
            key={activeCard.id}
            className="flex items-center gap-2 text-center text-[14px] px-2 truncate transition-all duration-200"
          >
            <span className="font-bold text-text-primary tracking-tight">
              {activeCard.title}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-medium">
              {activeCard.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedAdaptiveCards;
