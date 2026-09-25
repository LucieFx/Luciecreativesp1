"use client";

import React, { useRef } from "react";
import { StatBreakItem } from "@/lib/work-data";
import { SITE_STATS } from "@/lib/site-stats";
import { TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";

interface WorkStatBreakProps {
  statBreak: StatBreakItem;
}

const CLIENT_BRANDS = [
  { name: "NIRVA CLUB & RESORT", label: "Luxury Hospitality" },
  { name: "VEDAM VILLAS", label: "Ultra-Luxury Real Estate" },
  { name: "PCFITMENT", label: "Automotive Catalog SaaS" },
  { name: "MARUTI BUILDCON", label: "Infrastructure & Living" },
  { name: "AMBICA INTERIOR", label: "Bespoke Interior Design" },
  { name: "NANDANVAN BUNGALOWS", label: "Bespoke Architecture" },
  { name: "LEADERS DIARY", label: "Leadership Media" },
  { name: "SPECZO", label: "Optics & Retail" },
];

function OdometerDigit({
  digit,
}: {
  digit: number;
  [key: string]: any;
}) {
  return <span>{digit}</span>;
}

export function WorkStatBreak({ statBreak }: WorkStatBreakProps) {
  const count = SITE_STATS.viewsCount;
  const isCompleted = true;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, amount: 0.3 });

  return (
    <section
      id="stat-break"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 bg-white text-text-primary overflow-hidden border-b border-line select-none"
    >
      {/* Background Subtle Gradient & Dot Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-red/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
        {/* Metric Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black tracking-widest uppercase mb-6 shadow-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Compounding Growth Metric</span>
        </div>

        {/* Animated Odometer 63M+ Counter */}
        <div className="relative inline-block mb-3">
          <div className="text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter text-ink font-mono drop-shadow-xs leading-none flex items-baseline justify-center">
            {isInView || shouldReduceMotion ? (
              <>
                <OdometerDigit digit={6} delay={0.1} reducedMotion={Boolean(shouldReduceMotion)} />
                <OdometerDigit digit={3} delay={0.25} reducedMotion={Boolean(shouldReduceMotion)} />
              </>
            ) : (
              <>
                <span>0</span>
                <span>0</span>
              </>
            )}
            <span className="text-brand-red font-sans">M+</span>
          </div>
        </div>

        <div className="text-xs sm:text-sm uppercase font-mono tracking-widest text-muted font-bold mb-10">
          {statBreak.metricLabel || "Aggregated Organic Audience Reach Across Client Campaigns"}
        </div>

        {/* Visual Supporting Element: Compounding Growth Sparkline Curve */}
        <div className="max-w-3xl mx-auto bg-white border border-line/90 rounded-2xl p-4 sm:p-8 shadow-xs mb-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-line/60">
            <div>
              <div className="text-xs font-black text-ink uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                <span>Exponential Retention Arc • 4-Quarter Trajectory</span>
              </div>
              <p className="text-xs text-muted font-medium mt-0.5">
                Calculated across video completions, virality ratios, and repeat digital impressions.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-brand-red bg-brand-red-50 px-2.5 py-1 rounded-full border border-brand-red/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span>{SITE_STATS.reachLabel}</span>
            </div>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="relative w-full h-32 sm:h-40">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 700 160"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B1A1A" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#8B1A1A" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <motion.path
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={isInView || shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                d="M 20 140 C 180 135 280 110 420 65 C 540 25 610 15 680 10 L 680 160 L 20 160 Z"
                fill="url(#reachGradient)"
              />

              {/* Grid Lines */}
              <line x1="20" y1="140" x2="680" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="80" x2="680" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Line Stroke with pathLength over 1.6s */}
              <motion.path
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={isInView || shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                d="M 20 140 C 180 135 280 110 420 65 C 540 25 610 15 680 10"
                stroke="#8B1A1A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Milestone Dots popping in with a spring one by one */}
              <motion.circle
                cx="20"
                cy="140"
                r="4.5"
                fill="#8B1A1A"
                initial={shouldReduceMotion ? false : { scale: 0 }}
                animate={isInView || shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 450, damping: 18 }}
              />
              <motion.circle
                cx="280"
                cy="110"
                r="4.5"
                fill="#8B1A1A"
                initial={shouldReduceMotion ? false : { scale: 0 }}
                animate={isInView || shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.75, type: "spring", stiffness: 450, damping: 18 }}
              />
              <motion.circle
                cx="480"
                cy="48"
                r="5"
                fill="#8B1A1A"
                initial={shouldReduceMotion ? false : { scale: 0 }}
                animate={isInView || shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 1.25, type: "spring", stiffness: 450, damping: 18 }}
              />
              <motion.circle
                cx="680"
                cy="10"
                r="6"
                fill="#8B1A1A"
                initial={shouldReduceMotion ? false : { scale: 0 }}
                animate={isInView || shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 1.65, type: "spring", stiffness: 450, damping: 18 }}
              />
            </svg>

            {/* Glowing Ping on Final Node */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView || shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 1.75, duration: 0.3 }}
              className="absolute right-0 top-1 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-brand-red animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red relative" />
            </motion.div>
          </div>

          {/* Quarterly Milestone Badges */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-line/60 text-center font-mono text-[10px] sm:text-xs">
            <div>
              <span className="text-muted block font-normal">Q1 Baseline</span>
              <span className="font-black text-ink">8M Reach</span>
            </div>
            <div>
              <span className="text-muted block font-normal">Q2 Rollout</span>
              <span className="font-black text-ink">22M Reach</span>
            </div>
            <div>
              <span className="text-muted block font-normal">Q3 Cinema</span>
              <span className="font-black text-ink">43M Reach</span>
            </div>
            <div>
              <span className="text-brand-red block font-bold">Q4 Scale</span>
              <span className="font-black text-brand-red">{SITE_STATS.viewsLabel} Climax</span>
            </div>
          </div>

          {/* Illustrative Caption */}
          <div className="text-[11px] text-muted font-mono text-center pt-3 border-t border-line/60">
            Illustrative growth trajectory
          </div>
        </div>

        {/* Supporting Client Brand Trust Strip */}
        <div className="mb-12 pt-4">
          <div className="text-[11px] font-mono tracking-widest text-muted font-bold uppercase mb-4 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>Documented Campaign Data Behind Partner Brands</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {CLIENT_BRANDS.map((b) => (
              <div
                key={b.name}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-line/80 shadow-xs flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="text-xs font-black text-ink font-mono tracking-wider">{b.name}</span>
                <span className="text-[10px] font-semibold text-muted hidden sm:inline">[{b.label}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        {statBreak.quote && (
          <blockquote className="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl lg:text-3xl font-serif italic text-ink leading-snug">
            &ldquo;{statBreak.quote}&rdquo;
          </blockquote>
        )}

        {/* Attribution */}
        {statBreak.author && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-brand-red font-black uppercase">
            <span>— {statBreak.author}</span>
            {statBreak.role && <span className="text-muted">[{statBreak.role}]</span>}
          </div>
        )}

        {statBreak.subtext && (
          <p className="mt-3 text-xs text-muted font-medium">
            {statBreak.subtext}
          </p>
        )}
      </div>
    </section>
  );
}
