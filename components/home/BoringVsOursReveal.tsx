"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { HERO_REVEALS, HeroRevealItem } from "@/lib/constants";

export function BoringVsOursReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = false;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(() => (shouldReduceMotion ? 85 : 12));
  const [isSweeping, setIsSweeping] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const currentItem: HeroRevealItem = HERO_REVEALS[activeIndex] || HERO_REVEALS[0];

  // Auto-sweep from left to right once (1.4s, ease-in-out) after 600ms, resting at 85%
  const runSweep = useCallback(() => {
    if (shouldReduceMotion) {
      setSliderPos(85);
      setIsSweeping(false);
      return;
    }

    setSliderPos(12);
    setIsSweeping(false);

    const startTimer = setTimeout(() => {
      setIsSweeping(true);
      setSliderPos(85);
    }, 600);

    const endTimer = setTimeout(() => {
      setIsSweeping(false);
    }, 2050); // 600ms delay + 1400ms transition + small buffer

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [shouldReduceMotion]);

  // Replay sweep on mount and on activeIndex switch
  useEffect(() => {
    const cleanup = runSweep();
    return () => {
      cleanup?.();
    };
  }, [activeIndex, runSweep]);

  // 6-second auto rotation, paused during drag or hover, stopped on reduced-motion
  useEffect(() => {
    if (shouldReduceMotion || isDragging || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_REVEALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isDragging, isHovered]);

  // Update slider position from clientX coordinate
  const updatePositionFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, rawPos));
    setSliderPos(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsSweeping(false);
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setIsSweeping(false);
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsSweeping(false);
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setIsSweeping(false);
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIsSweeping(false);
      setSliderPos(100);
    }
  };

  const handleTabClick = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  return (
    <div
      className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Rounded Panel */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full aspect-[4/5] max-h-[560px] rounded-3xl overflow-hidden bg-[#ffffff] border border-line/90 shadow-xl touch-none cursor-ew-resize"
      >
        {/* BASE LAYER: Boring version (CSS only: grayscale, low contrast, slight blur) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            filter: "grayscale(1) contrast(0.7) brightness(1.15) blur(1.5px)",
            WebkitFilter: "grayscale(1) contrast(0.7) brightness(1.15) blur(1.5px)",
          }}
        >
          <Image
            src={currentItem.image}
            alt={`${currentItem.alt} - flat version`}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 450px, 520px"
            className={
              currentItem.isPortrait
                ? "object-contain p-4 sm:p-6 drop-shadow-sm"
                : "object-cover"
            }
          />
        </div>

        {/* TOP LAYER: Finished version ("Ours") with clip-path mask */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            transition: isSweeping
              ? "clip-path 1.4s cubic-bezier(0.4, 0, 0.2, 1), -webkit-clip-path 1.4s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          <Image
            src={currentItem.image}
            alt={`${currentItem.alt} - finished version`}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 450px, 520px"
            className={
              currentItem.isPortrait
                ? "object-contain p-4 sm:p-6 drop-shadow-md"
                : "object-cover"
            }
          />
        </div>

        {/* CORNER LABELS: Small Mono Chips that fade out near divider */}
        {/* Left chip: "✦ Ours" */}
        <div
          className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-30 pointer-events-none transition-opacity duration-300"
          style={{ opacity: sliderPos < 18 ? 0 : 1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>Ours</span>
          </span>
        </div>

        {/* Right chip: "Boring" */}
        <div
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 pointer-events-none transition-opacity duration-300"
          style={{ opacity: sliderPos > 82 ? 0 : 1 }}
        >
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-muted/60 border border-white/10 text-[10px] font-mono font-medium tracking-wider uppercase shadow-xs">
            <span>Boring</span>
          </span>
        </div>

        {/* VERTICAL DIVIDER & ROUND HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{
            left: `${sliderPos}%`,
            transition: isSweeping
              ? "left 1.4s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {/* Vertical 2px white divider line with subtle shadow */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]" />

          {/* Round handle in center */}
          <div
            role="slider"
            aria-label="Compare boring and finished versions"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl border-2 border-[#8b1a1a]/25 flex items-center justify-center cursor-ew-resize pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronsLeftRight className="w-4 h-4 text-[#8b1a1a]" />
          </div>
        </div>
      </div>

      {/* THREE SMALL TABS BELOW PANEL: Design, Video, Web */}
      <div className="mt-4 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-line/80 shadow-xs">
          {HERO_REVEALS.map((rev, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={rev.id}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#8b1a1a] shadow-xs border border-line"
                    : "text-muted hover:text-ink"
                }`}
              >
                {rev.discipline}
              </button>
            );
          })}
        </div>

        {/* Project Title Caption */}
        <p className="mt-2 text-center text-xs font-mono font-medium text-muted truncate max-w-full px-2">
          {currentItem.title}
        </p>
      </div>
    </div>
  );
}
