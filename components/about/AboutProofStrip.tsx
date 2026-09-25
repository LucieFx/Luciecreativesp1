"use client";

import React, { useRef, useEffect } from "react";
import { RESULTS_METRICS } from "@/lib/constants";
import { ShieldCheck, TrendingUp } from "lucide-react";

interface AboutProofStripProps {
  stats?: Array<{ label: string; value: string }>;
}

export function AboutProofStrip({ stats }: AboutProofStripProps) {
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // If stats provided, adapt to metric card format
  const metrics = stats && stats.length > 0
    ? stats.map((s, idx) => {
        const match = s.value.match(/^([^\d]*)(\d+)(.*)$/);
        return {
          id: `cms-stat-${idx}`,
          prefix: match ? match[1] : "",
          value: match ? match[2] : s.value,
          suffix: match ? match[3] : "",
          unit: s.label,
        };
      })
    : RESULTS_METRICS;

  useEffect(() => {
    const activeTimers: NodeJS.Timeout[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            metrics.forEach((metric, index) => {
              const el = countersRef.current[index];
              if (!el) return;
              const targetVal = parseInt(metric.value, 10);
              if (isNaN(targetVal)) return;

              let currentVal = 0;
              const duration = 1600;
              const increment = Math.max(1, Math.floor(targetVal / (duration / 25)));

              const timer = setInterval(() => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                  currentVal = targetVal;
                  clearInterval(timer);
                }
                if (el) {
                  el.innerText = currentVal.toString();
                }
              }, 25);
              activeTimers.push(timer);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById("about-proof-strip");
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      activeTimers.forEach(clearInterval);
    };
  }, [metrics]);

  return (
    <section
      id="about-proof-strip"
      className="relative w-full py-16 sm:py-20 bg-[#8B1A1A] text-white overflow-hidden select-none border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Tagline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-red-100 text-xs font-black uppercase tracking-widest border border-white/25 backdrop-blur-sm mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
            <span>Proven Agency Track Record</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Numbers that represent compounding commercial results
          </h2>
        </div>

        {/* Proof Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center flex flex-col justify-center items-center hover:bg-white/15 hover:border-white/30 transition-all group shadow-md"
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <div className="flex items-baseline justify-center font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <span>{metric.prefix}</span>
                  <span
                    ref={(el) => {
                      countersRef.current[index] = el;
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-white/60 group-hover:text-white transition-colors ml-0.5">
                    {metric.suffix}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black tracking-tight text-white/90 text-balance leading-snug">
                  {metric.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
