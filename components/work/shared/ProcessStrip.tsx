import React from "react";
import {
  ArrowRight,
  FileText,
  Palette,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

export interface ProcessStepItem {
  number?: string;
  title: string;
  description?: string;
  deliverables?: string[];
  icon?: React.ReactNode;
}

export interface ProcessStripProps {
  steps: (string | ProcessStepItem)[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

// Fallback intelligence for simple string-based steps
const DEFAULT_STEP_DATA: Record<
  string,
  { title: string; description: string; deliverables: string[]; iconType: "file" | "palette" | "sliders" | "check" }
> = {
  "share your brief": {
    title: "Share Your Brief",
    description: "Align on creative scope, brand benchmarks, audience persona, and technical asset specs via our guided intake.",
    deliverables: ["Creative Brief", "Asset Specs", "Scope Locked"],
    iconType: "file",
  },
  "concepts": {
    title: "Concept Exploration",
    description: "We craft 2 to 3 distinct art directions exploring typographic hierarchy, chromatic palettes, and compositional harmony.",
    deliverables: ["2 to 3 Directions", "Moodboards", "Initial Drafts"],
    iconType: "palette",
  },
  "refine": {
    title: "Collaborative Polish",
    description: "Rapid feedback rounds where we calibrate optical balance, micro-spacing, typography kerning, and production tolerances.",
    deliverables: ["Feedback Loops", "Detail Calibrations", "Optical Polish"],
    iconType: "sliders",
  },
  "final files": {
    title: "Master File Delivery",
    description: "Complete vector packages (AI, EPS, SVG, print-ready PDF, web PNGs) with clean layer hierarchies and usage guidelines.",
    deliverables: ["Master Vector Vault", "Print & Web Assets", "Full IP Transfer"],
    iconType: "check",
  },
  "we edit": {
    title: "Dynamic Story Cut",
    description: "Assembly cut engineered for high audience retention, multi-track audio pacing, and seamless narrative flow.",
    deliverables: ["Assembly Cut", "Pacing Calibration", "Retention Hook"],
    iconType: "palette",
  },
  "you review": {
    title: "Collaborative Review",
    description: "Frame-accurate timestamped review rounds to polish motion graphics, audio balancing, and pacing transitions.",
    deliverables: ["Timestamped Notes", "Color & Audio Tweaks", "Pacing Polish"],
    iconType: "sliders",
  },
  "final delivery": {
    title: "Master 4K Delivery",
    description: "High-bitrate 4K exports in 9:16 vertical and 16:9 cinema aspect ratios ready for immediate omni-channel release.",
    deliverables: ["Multi-Aspect 4K", "Audio Masters", "Publish-Ready"],
    iconType: "check",
  },
};

function getIcon(type?: string, idx?: number) {
  const iconClass = "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110";
  if (type === "file" || idx === 0) return <FileText className={iconClass} strokeWidth={2} />;
  if (type === "palette" || idx === 1) return <Palette className={iconClass} strokeWidth={2} />;
  if (type === "sliders" || idx === 2) return <SlidersHorizontal className={iconClass} strokeWidth={2} />;
  return <CheckCircle2 className={iconClass} strokeWidth={2} />;
}

export function ProcessStrip({
  steps,
  eyebrow = "CREATIVE PROCESS",
  title = "From discovery to master delivery",
  subtitle = "A transparent, milestone-driven workflow engineered for speed, precision, and zero guesswork.",
}: ProcessStripProps) {
  // Normalize steps to standard structured items
  const normalizedSteps: ProcessStepItem[] = steps.map((step, idx) => {
    if (typeof step === "string") {
      const key = step.toLowerCase().trim();
      const fallback = DEFAULT_STEP_DATA[key];
      if (fallback) {
        return {
          number: `0${idx + 1}`,
          title: fallback.title,
          description: fallback.description,
          deliverables: fallback.deliverables,
          icon: getIcon(fallback.iconType, idx),
        };
      }
      return {
        number: `0${idx + 1}`,
        title: step,
        description: "Milestone-driven phase focused on quality execution, close collaboration, and prompt turnaround.",
        deliverables: ["Phase Milestones", "Quality Review"],
        icon: getIcon(undefined, idx),
      };
    }

    return {
      number: step.number || `0${idx + 1}`,
      title: step.title,
      description: step.description,
      deliverables: step.deliverables,
      icon: step.icon || getIcon(undefined, idx),
    };
  });

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white border-y border-line select-none overflow-hidden">
      {/* Subtle background dot pattern & ambient warm glow */}
      {null}
      {null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-control bg-brand-red-50 border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-widest mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
            <span>{eyebrow}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-body max-w-xl mx-auto font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {normalizedSteps.map((step, idx) => {
            const isLast = idx === normalizedSteps.length - 1;

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-card border border-line hover:border-brand-red/40 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-card overflow-hidden"
              >
                {/* Subtle top accent gradient bar on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ambient corner glow on hover */}
                {null}

                <div>
                  {/* Top Bar: Monospace Step Index & Visual Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-red-50 text-brand-red font-mono text-xs font-black border border-brand-red/20 shadow-xs">
                      {step.number}
                    </span>

                    <div className="w-10 h-10 rounded-control bg-gradient-to-b from-white via-surface-alt to-neutral-100 border border-line shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center text-ink/75 group-hover:text-white group-hover:bg-gradient-to-b group-hover:from-brand-red group-hover:via-brand-red group-hover:to-brand-redDark group-hover:border-brand-red group-hover:shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-lg sm:text-xl font-black text-ink tracking-tight group-hover:text-brand-red transition-colors leading-snug">
                    {step.title}
                  </h4>

                  {/* Step Description */}
                  {step.description && (
                    <p className="mt-2 text-xs sm:text-sm text-body/90 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Deliverables / Tags */}
                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-line/70">
                    <div className="flex flex-wrap gap-1.5">
                      {step.deliverables.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-alt text-ink/75 text-[11px] font-medium border border-line/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desktop Connecting Arrow between cards */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-control bg-white border border-brand-red/25 items-center justify-center text-brand-red shadow-xs group-hover:scale-110 group-hover:border-brand-red transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Reliability Strip */}
        <div className="mt-12 pt-8 border-t border-line/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-body font-medium">
          <div className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-red" />
            <span>Turnaround: <strong className="font-bold text-ink">7 to 14 business days</strong></span>
          </div>

          <div className="inline-flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-red" />
            <span>Structured <strong className="font-bold text-ink">Revision Loops</strong></span>
          </div>

          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>100% Commercial <strong className="font-bold text-ink">IP Ownership</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessStrip;
