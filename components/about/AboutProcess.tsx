"use client";

import React from "react";
import { Search, Lightbulb, PenTool, Rocket, ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    // TODO: Process Step 1 Description
    description:
      "We dissect your existing acquisition funnel, competitor landscape, and brand positioning to uncover the high-retention angle.",
    deliverables: ["Creative Audit", "Audience Breakdown", "Sprint Roadmap"],
  },
  {
    number: "02",
    title: "Strategy",
    icon: Lightbulb,
    // TODO: Process Step 2 Description
    description:
      "We build the creative blueprint: video retention scripts, visual identity guidelines, and technical architecture tailored for conversion.",
    deliverables: ["Retention Framework", "Design Direction", "Asset Architecture"],
  },
  {
    number: "03",
    title: "Design & Build",
    icon: PenTool,
    // TODO: Process Step 3 Description
    description:
      "High-velocity execution phase: cinema-grade motion graphics, sub-second Next.js web applications, and modular design systems.",
    deliverables: ["Vertical Video Suite", "Production Codebase", "Component Tokens"],
  },
  {
    number: "04",
    title: "Launch & Iterate",
    icon: Rocket,
    // TODO: Process Step 4 Description
    description:
      "Seamless deployment accompanied by watch-through analytics, A/B creative testing, and weekly performance compounding.",
    deliverables: ["Global Deployment", "Retention Telemetry", "Iteration Sprints"],
  },
];

export function AboutProcess() {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto select-none">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black text-brand-red tracking-widest uppercase">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance">
            How we work:{" "}
            <span className="font-accent italic text-brand-red text-[1.1em] tracking-normal inline">
              Sprint-Based Precision
            </span>
          </h2>
          <p className="text-base font-bold text-body">
            No 6-month wait times. We operate in focused, collaborative sprints designed to ship measurable creative impact rapidly.
          </p>
        </div>

        {/* 4-Column Desktop / Stacked Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <div
                key={step.number}
                className="relative p-6 sm:p-7 rounded-card bg-white border border-line/80 shadow-card hover:border-brand-red/40 hover:shadow-elevated transition-all flex flex-col justify-between group"
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-600 group-hover:text-brand-red transition-colors font-mono">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-control bg-brand-red-50 border border-brand-red/15 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-black text-ink mb-2">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs font-bold text-body leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-line/60 space-y-1.5">
                  <div className="text-[10px] font-black text-muted uppercase tracking-wider mb-2">
                    Key Outcomes:
                  </div>
                  {step.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="text-xs font-bold text-body flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-red" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
