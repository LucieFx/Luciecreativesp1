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
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp",
    alt: "Onirique Parfums 3D CGI and luxury fragrance branding",
    aspectRatio: "1/1",
    desktopWidth: 330,
    desktopHeight: 330,
    mobileWidth: 250,
    mobileHeight: 250,
    desktopRadius: 16,
    mobileRadius: 14,
  },
  {
    id: "card-video",
    discipline: "Video",
    title: "Ambica Interior Gallery",
    subtitle: "Material Precision & Craft Reel",
    image: "https://img.youtube.com/vi/F66vpDy_qQY/maxresdefault.jpg",
    videoSrc:
      "https://res.cloudinary.com/oct7txvw/video/upload/v1790266871/lucie-creatives/videos/clients/ambica-interior/ambica-interior-luxury-spaces.mp4",
    youtubeUrl: "https://youtube.com/shorts/F66vpDy_qQY?feature=share",
    alt: "Ambica Interior Gallery luxury material precision and craft reel edit",
    aspectRatio: "9/16",
    desktopWidth: 243,
    desktopHeight: 432,
    mobileWidth: 216,
    mobileHeight: 384,
    desktopRadius: 0,
    mobileRadius: 0,
  },
  {
    id: "card-web",
    discipline: "Web",
    title: "Nandanvan Realty",
    subtitle: "Responsive Website Design & Build",
    image: "/projects/nandanvan-realty-web.jpg",
    alt: "Nandanvan Realty luxury real estate website platform",
    aspectRatio: "16/9",
    desktopWidth: 426,
    desktopHeight: 240,
    mobileWidth: 280,
    mobileHeight: 158,
    desktopRadius: 10,
    mobileRadius: 8,
  },
];

export function StackedAdaptiveCards() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Sync video playback with active card state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (activeIndex === 1) {
      vid.play().catch(() => {
        setIsVideoPlaying(false);
      });
      setIsVideoPlaying(true);
    }
  }, [activeIndex]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
        // Inactive Card 1 (Back-Right): tilted ~+6deg on mobile / +9deg on desktop, offset to right
        const xOffset = isMobile ? 18 : 48;
        const yOffset = isMobile ? -2 : -6;
        return {
          positionName: "back-right",
          zIndex: 20,
          x: xOffset,
          y: yOffset,
          rotate: isMobile ? 6 : 9,
          scale: 0.78,
          opacity: 0.85,
          width,
          height,
          borderRadius,
          isFront: false,
          cursor: "pointer",
        };
      } else {
        // Inactive Card 2 (Back-Left): tilted ~-6deg on mobile / -9deg on desktop, offset to left
        const xOffset = isMobile ? -18 : -48;
        const yOffset = isMobile ? -2 : -6;
        return {
          positionName: "back-left",
          zIndex: 10,
          x: xOffset,
          y: yOffset,
          rotate: isMobile ? -6 : -9,
          scale: 0.73,
          opacity: 0.65,
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
      className="w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[500px] flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        BOUNDING CONTAINER:
        Fixed-size bounding container (does not resize based on active tab so the hero never reflows).
        Grid place-items-center anchors all 3 cards exactly in the geometric center.
      */}
      <div
        className="relative w-full h-[400px] sm:h-[440px] md:h-[460px] grid place-items-center overflow-visible"
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
              className={`col-start-1 row-start-1 will-change-transform ${
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
                width: layout.width,
                height: layout.height,
                borderRadius: card.discipline === "Video" ? undefined : layout.borderRadius,
                transform: `translate3d(${layout.x}px, ${layout.y}px, 0px) rotate(${layout.rotate}deg) scale(${layout.scale})`,
                opacity: layout.opacity,
                zIndex: layout.zIndex,
                transition:
                  "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), width 380ms cubic-bezier(0.16, 1, 0.3, 1), height 380ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 380ms cubic-bezier(0.16, 1, 0.3, 1), filter 380ms cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: layout.cursor,
                transformOrigin: "center center",
              }}
            >
              {/* 1. DESIGN CARD: Square 1:1, Border Radius 16px */}
              {card.discipline === "Design" && (
                <div className="relative w-full h-full bg-[#EBE7E2]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 250px, 340px"
                    className="object-cover"
                  />
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
                  {/* ── LAYER A: CLIPPED SCREEN (via iphone-screen-mask.png) ── */}
                  <div
                    className="absolute inset-0 pointer-events-auto"
                    style={{
                      maskImage: "url(/iphone-screen-mask.png)",
                      WebkitMaskImage: "url(/iphone-screen-mask.png)",
                      maskSize: "100% 100%",
                      WebkitMaskSize: "100% 100%",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                    }}
                  >
                    {/* Screen container positioned at exact hardware screen cutout insets */}
                    <div
                      className="absolute inset-0 overflow-hidden bg-black text-white"
                      style={{
                        top: `${IPHONE_FRAME.screenInsets.topPercent}%`,
                        bottom: `${IPHONE_FRAME.screenInsets.bottomPercent}%`,
                        left: `${IPHONE_FRAME.screenInsets.leftPercent}%`,
                        right: `${IPHONE_FRAME.screenInsets.rightPercent}%`,
                      }}
                    >
                      {/* Video Player */}
                      <video
                        ref={videoRef}
                        src={card.videoSrc}
                        poster={card.image}
                        playsInline
                        muted={isMuted}
                        loop
                        autoPlay
                        preload="auto"
                        className="w-full h-full object-cover"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                      />

                      {/* Subtle Ambient Video Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                      {/* Screen Safe-Area Content (When Front) */}
                      {layout.isFront ? (
                        <>
                          {/* Top-Left: "OURS" Signature Badge */}
                          <div className="absolute top-2.5 left-2 z-30 pointer-events-none">
                            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase shadow-xs">
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
                              className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                            >
                              {isMuted ? (
                                <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              ) : (
                                <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={handleTogglePlay}
                              aria-label={isVideoPlaying ? "Pause reel" : "Play reel"}
                              className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                            >
                              {isVideoPlaying ? (
                                <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              ) : (
                                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                              )}
                            </button>
                          </div>

                          {/* Bottom Metadata & Actions */}
                          <div className="absolute bottom-2.5 inset-x-2 z-30 flex flex-col gap-1 pointer-events-auto">
                            <div className="flex items-center justify-between text-white gap-1">
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] sm:text-[11px] font-black tracking-tight leading-tight text-white drop-shadow-sm truncate">
                                  Ambica Interior Gallery
                                </p>
                                <p className="text-[8px] sm:text-[8.5px] text-white/80 font-mono leading-tight truncate mt-0.5">
                                  Material Precision &amp; Craft
                                </p>
                              </div>

                              <a
                                href="https://youtube.com/shorts/F66vpDy_qQY?feature=share"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-[7.5px] sm:text-[8.5px] font-bold tracking-wide shadow-md transition-transform hover:scale-105 shrink-0"
                                title="Watch full short on YouTube"
                              >
                                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>Short</span>
                              </a>
                            </div>

                            {/* iOS Home Indicator Bar */}
                            <div className="w-12 sm:w-14 h-0.5 bg-white/45 rounded-full mx-auto mt-0.5" />
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
                  </div>

                  {/* ── LAYER B: HARDWARE FRAME PNG OVERLAY ON TOP ── */}
                  <div className="absolute inset-0 z-35 pointer-events-none" aria-hidden="true">
                    <Image
                      src="/iphone-frame.png"
                      alt="iPhone Hardware Frame"
                      fill
                      priority={layout.isFront}
                      unoptimized
                      sizes="(max-width: 640px) 240px, 300px"
                      className="object-contain pointer-events-none select-none"
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
                <div className="relative w-full h-full bg-[#111317] flex flex-col">
                  {/* Browser Chrome Header */}
                  <div className="h-6 sm:h-7 bg-slate-900/95 flex items-center px-2.5 sm:px-3 gap-1.5 border-b border-white/10 shrink-0 z-20">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-90" />
                      <div className="w-2 h-2 rounded-full bg-[#FFBD2E] opacity-90" />
                      <div className="w-2 h-2 rounded-full bg-[#27C93F] opacity-90" />
                    </div>

                    {/* Mini Address Capsule */}
                    <div className="mx-auto h-4 px-2.5 rounded-full bg-white/10 text-[8px] sm:text-[9px] font-mono text-white/70 flex items-center gap-1 select-none">
                      <span className="text-white/40">https://</span>
                      <span>nandanvanestates.com</span>
                    </div>
                  </div>

                  {/* Desktop Browser Viewport Screenshot */}
                  <div className="relative w-full flex-1">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 640px) 310px, 440px"
                      className="object-cover object-top"
                    />
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
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-30 pointer-events-none transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
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
      <div className="mt-4 w-full flex flex-col items-center">
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
                className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#7A1F2B] shadow-xs border border-line"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.discipline}
              </button>
            );
          })}
        </div>

        {/* Project Title & Subtitle Caption */}
        <div className="mt-2.5 h-6 flex items-center justify-center overflow-hidden">
          <div
            key={activeCard.id}
            className="flex items-center gap-2 text-center text-xs px-2 truncate transition-all duration-200"
          >
            <span className="font-bold text-text-primary tracking-tight">
              {activeCard.title}
            </span>
            <span className="text-text-tertiary">/</span>
            <span className="font-mono text-text-tertiary">
              {activeCard.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedAdaptiveCards;
