"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroOrbitProps {
  className?: string;
}

// 8 service line icons (simple inline SVGs in brand maroon #8B1A1A)
const ICONS = [
  // 0: Pen / Vector Design
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="1.5" />
    </svg>
  ),
  // 1: Video / Play
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <polygon points="6 4 19 12 6 20 6 4" />
    </svg>
  ),
  // 2: Film clip
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <rect x="2" y="2" width="20" height="20" rx="2.5" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
      <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  ),
  // 3: Code brackets
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // 4: Browser window
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6" r="0.75" fill="#8B1A1A" />
      <circle cx="9.5" cy="6" r="0.75" fill="#8B1A1A" />
      <circle cx="12.5" cy="6" r="0.75" fill="#8B1A1A" />
    </svg>
  ),
  // 5: Layers / UI
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  // 6: Scissors / Cut
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  // 7: Phone / Reel
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <polygon points="10 8 15 12 10 16 10 8" fill="#8B1A1A" />
    </svg>
  ),
];

// Concentric ring definitions
// Radii: ~22%, 34%, 48%, 64% of desktop canvas
const RINGS = [
  { id: 1, rDesktop: 250, rTablet: 180, rMobile: 140, showMobile: true, showTablet: true },
  { id: 2, rDesktop: 410, rTablet: 290, rMobile: 230, showMobile: true, showTablet: true },
  { id: 3, rDesktop: 590, rTablet: 430, rMobile: 340, showMobile: false, showTablet: true },
  { id: 4, rDesktop: 810, rTablet: 600, rMobile: 480, showMobile: false, showTablet: false },
];

export function HeroOrbit({ className = "" }: HeroOrbitProps) {
  const shouldReduceMotion = useReducedMotion();
  const maskId = useId();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      <style jsx>{`
        @keyframes rotateArcClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes rotateArcCounter {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .arc-clockwise {
          transform-origin: 50% 46%;
          animation: rotateArcClockwise 75s linear infinite;
        }
        .arc-counter {
          transform-origin: 50% 46%;
          animation: rotateArcCounter 85s linear infinite;
        }
        @media (max-width: 639px) {
          .arc-clockwise,
          .arc-counter {
            animation: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .arc-clockwise,
          .arc-counter {
            animation: none !important;
          }
        }
      `}</style>

      {/* SVG Concentric Rings with bottom fade mask */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
        }}
      >
        <defs>
          <linearGradient id={`ring-grad-${maskId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B1A1A" stopOpacity="0.10" />
            <stop offset="70%" stopColor="#8B1A1A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8B1A1A" stopOpacity="0.01" />
          </linearGradient>

          {/* Mask out highlight arcs in content column area (left 0-55% of the hero on desktop) */}
          <clipPath id={`highlight-arc-clip-${maskId}`}>
            <rect x="55%" y="0" width="45%" height="100%" />
          </clipPath>
        </defs>

        {/* --- DESKTOP RINGS (lg: >=1024px) --- */}
        <g className="hidden lg:block">
          {RINGS.map((ring) => {
            const circumference = 2 * Math.PI * ring.rDesktop;
            return (
              <motion.circle
                key={`desk-ring-${ring.id}`}
                cx="50%"
                cy="46%"
                r={ring.rDesktop}
                fill="none"
                stroke={`url(#ring-grad-${maskId})`}
                strokeWidth="1"
                initial={shouldReduceMotion ? false : { strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                style={{ strokeDasharray: circumference }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}

          {/* Highlight arcs restricted to the two outermost rings (Ring 3: 590px, Ring 4: 810px) */}
          {/* Masked out inside the content column area (left 0-55% of hero on desktop) */}
          <g clipPath={`url(#highlight-arc-clip-${maskId})`}>
            {/* Highlight Arc on Ring 3 (590px): rotates clockwise */}
            <circle
              cx="50%"
              cy="46%"
              r={590}
              fill="none"
              stroke="rgba(139, 26, 26, 0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${0.16 * 2 * Math.PI * 590} ${0.84 * 2 * Math.PI * 590}`}
              className="arc-clockwise"
            />

            {/* Highlight Arc on Ring 4 (810px): rotates counter-clockwise */}
            <circle
              cx="50%"
              cy="46%"
              r={810}
              fill="none"
              stroke="rgba(139, 26, 26, 0.40)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${0.13 * 2 * Math.PI * 810} ${0.87 * 2 * Math.PI * 810}`}
              className="arc-counter"
            />
          </g>
        </g>

        {/* --- TABLET RINGS (md to lg: 640px to 1023px) --- */}
        <g className="hidden sm:block lg:hidden">
          {RINGS.filter((r) => r.showTablet).map((ring) => {
            const circumference = 2 * Math.PI * ring.rTablet;
            return (
              <motion.circle
                key={`tab-ring-${ring.id}`}
                cx="50%"
                cy="44%"
                r={ring.rTablet}
                fill="none"
                stroke={`url(#ring-grad-${maskId})`}
                strokeWidth="1"
                initial={shouldReduceMotion ? false : { strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                style={{ strokeDasharray: circumference }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </g>

        {/* --- MOBILE RINGS (<640px) --- */}
        <g className="sm:hidden">
          {RINGS.filter((r) => r.showMobile).map((ring) => {
            const circumference = 2 * Math.PI * ring.rMobile;
            return (
              <motion.circle
                key={`mob-ring-${ring.id}`}
                cx="50%"
                cy="40%"
                r={ring.rMobile}
                fill="none"
                stroke={`url(#ring-grad-${maskId})`}
                strokeWidth="1"
                initial={shouldReduceMotion ? false : { strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                style={{ strokeDasharray: circumference }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </g>
      </svg>

      {/* --- ORBIT CHIPS --- */}
      {/* DESKTOP CHIPS (8 Chips on outermost zones: strictly >= 24px below nav, >= 32px away from all content) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full relative">
          {[
            // Top corridor above left col (Y=110px: >=24px below navbar 86px, >=32px above eyebrow 183px)
            { idx: 0, style: { left: "40px", top: "110px" }, floatDelay: 0, duration: 6.2 },
            { idx: 1, style: { left: "260px", top: "110px" }, floatDelay: 0.8, duration: 7.0 },
            { idx: 2, style: { left: "480px", top: "110px" }, floatDelay: 1.4, duration: 5.8 },
            // Bottom corridor below left col (Y=785px: >=40px below notification stack 735px)
            { idx: 3, style: { left: "40px", top: "785px" }, floatDelay: 0.4, duration: 6.5 },
            { idx: 4, style: { left: "260px", top: "785px" }, floatDelay: 1.1, duration: 6.8 },
            { idx: 5, style: { left: "480px", top: "785px" }, floatDelay: 1.8, duration: 7.4 },
            // Under showcase corridor (Y=875px: >=45px below showcase bottom 830px)
            { idx: 6, style: { right: "360px", top: "875px" }, floatDelay: 0.6, duration: 5.9 },
            { idx: 7, style: { right: "160px", top: "875px" }, floatDelay: 1.3, duration: 6.4 },
          ].map((chip, i) => (
            <motion.div
              key={`desk-chip-${i}`}
              className="absolute pointer-events-auto"
              style={chip.style}
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      y: [-5, 5, -5],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      scale: { delay: 0.45 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      opacity: { delay: 0.45 + i * 0.06, duration: 0.4 },
                      y: {
                        delay: chip.floatDelay + 0.9,
                        duration: chip.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <div className="w-10 h-10 rounded-control bg-white border border-[#8B1A1A]/15 shadow-[0_2px_10px_rgba(139,26,26,0.06)] flex items-center justify-center hover:scale-110 hover:border-[#8B1A1A]/40 transition-transform duration-200">
                {ICONS[chip.idx]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TABLET CHIPS (6 Chips positioned in wide side gutters: clear of centered text column) */}
      <div className="hidden sm:block lg:hidden absolute inset-0 pointer-events-none">
        {[
          // Gutter beside buttons (Y: 345px)
          { idx: 0, style: { left: "40px", top: "345px" }, floatDelay: 0, duration: 6.2 },
          { idx: 1, style: { right: "40px", top: "345px" }, floatDelay: 0.7, duration: 7.0 },
          // Gutter beside upper stack (Y: 450px)
          { idx: 2, style: { left: "40px", top: "450px" }, floatDelay: 0.3, duration: 6.5 },
          { idx: 3, style: { right: "40px", top: "450px" }, floatDelay: 1.4, duration: 5.8 },
          // Gutter beside lower stack (Y: 540px)
          { idx: 4, style: { left: "40px", top: "540px" }, floatDelay: 1.7, duration: 7.4 },
          { idx: 5, style: { right: "40px", top: "540px" }, floatDelay: 1.0, duration: 6.8 },
        ].map((chip, i) => (
          <motion.div
            key={`tab-chip-${i}`}
            className="absolute pointer-events-auto"
            style={chip.style}
            initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    y: [-4, 4, -4],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    scale: { delay: 0.45 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { delay: 0.45 + i * 0.06, duration: 0.4 },
                    y: {
                      delay: chip.floatDelay + 0.9,
                      duration: chip.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <div className="w-10 h-10 rounded-control bg-white border border-[#8B1A1A]/15 shadow-[0_2px_8px_rgba(139,26,26,0.06)] flex items-center justify-center">
              {ICONS[chip.idx]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE CHIPS (<640px: 2 Chips at top: strictly >=24px below nav, >=32px above eyebrow) */}
      <div className="sm:hidden absolute inset-0 pointer-events-none">
        {[
          // Chip 1: Top-left gutter (Y: 96px => 26px below navbar 70px, 36px above eyebrow 168px)
          { idx: 1, style: { left: "24px", top: "96px" }, floatDelay: 0, duration: 6.0 },
          // Chip 2: Top-right gutter (Y: 96px => 26px below navbar 70px, 36px above eyebrow 168px)
          { idx: 4, style: { right: "24px", top: "96px" }, floatDelay: 0.6, duration: 6.8 },
        ].map((chip, i) => (
          <motion.div
            key={`mob-chip-${i}`}
            className="absolute pointer-events-auto"
            style={chip.style}
            initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    y: [-3, 3, -3],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    scale: { delay: 0.45 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { delay: 0.45 + i * 0.06, duration: 0.4 },
                    y: {
                      delay: chip.floatDelay + 0.9,
                      duration: chip.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <div className="w-9 h-9 rounded-control bg-white border border-[#8B1A1A]/15 shadow-[0_2px_8px_rgba(139,26,26,0.06)] flex items-center justify-center">
              {ICONS[chip.idx]}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HeroOrbit;
