"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const FEATURE_CHIPS = [
  { label: "Next.js 15 & TypeScript" },
  { label: "Sub-Second Latency" },
  { label: "Bespoke UI Architecture" },
  { label: "100% Mobile Responsive" },
];

interface LenisInstance {
  scrollTo: (
    target: string | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
}

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    // Set x/y to about 22% and 30% of cursor offset
    x.set(offsetX * 0.22);
    y.set(offsetY * 0.30);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DevHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { __lenis?: LenisInstance }).__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo("#project-showcase", { offset: 0, duration: 1.2 });
      } else {
        const target =
          document.getElementById("project-showcase") ||
          document.getElementById("websites-weve-built");
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const heroWords = ["Websites", "that", "feel"];

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 lg:pb-24 bg-white text-text-primary overflow-visible border-b border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 overflow-visible">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-brand-red transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-mono text-muted">
            Digital Engineering &amp; Architecture
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl overflow-visible">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-redLight border border-brand-red/20 text-[#8B1A1A] text-xs font-mono font-bold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
            <span>Web Development</span>
          </div>

          {/* Word-by-word headline reveal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold text-ink tracking-[-0.02em] leading-[1.05] text-balance">
            {heroWords.map((word, i) => (
              <span
                key={word}
                className="overflow-hidden inline-block mr-[0.25em]"
              >
                <motion.span
                  className="inline-block"
                  initial={shouldReduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="overflow-hidden inline-block align-baseline">
              <motion.span
                className="inline-block font-accent italic text-[#8B1A1A] text-[1.05em] tracking-normal"
                initial={
                  shouldReduceMotion
                    ? false
                    : { y: "110%", filter: "blur(10px)", skewY: 6 }
                }
                animate={{ y: 0, filter: "blur(0px)", skewY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                alive.
              </motion.span>
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl font-medium text-body leading-relaxed max-w-2xl text-pretty">
            Fast, clean Next.js websites and web apps for brands that want more
            than a template.
          </p>

          {/* Action Buttons with magnetic physics */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm tracking-wide transition-all hover:scale-[1.02] shadow-xs will-change-transform"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-line bg-white hover:bg-brand-red-50 text-ink font-bold text-sm tracking-wide transition-all hover:scale-[1.02] cursor-pointer will-change-transform"
              >
                <span>See our work</span>
              </button>
            </MagneticButton>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {FEATURE_CHIPS.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-line text-xs font-mono font-bold text-body"
              >
                <span className="w-1 h-1 rounded-full bg-brand-red inline-block" />
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevHero;
