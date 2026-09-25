"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface WorkSectionHeadingProps {
  badgeIcon?: LucideIcon;
  badgeText: string;
  primaryWord: string;
  accentWord: string;
  description: string;
  className?: string;
  actionSlot?: React.ReactNode;
}

/**
 * WorkSectionHeading
 * 
 * Standardizes the portfolio section heading architecture sitewide:
 * - Category pill with icon and uppercase tracking
 * - Dual-tone H2: primary bold uppercase sans-serif + serif-italic accent word in brand red
 * - Clean editorial description text
 * - Optional right-aligned action toolbar slot (e.g. audio toggles, filters)
 */
export function WorkSectionHeading({
  badgeIcon: Icon,
  badgeText,
  primaryWord,
  accentWord,
  description,
  className = "",
  actionSlot,
}: WorkSectionHeadingProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 ${className}`}
    >
      <div className="max-w-2xl">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black tracking-widest uppercase mb-4 shadow-xs">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <span>{badgeText}</span>
        </div>

        {/* System Heading: Uppercase Sans + Serif Italic Accent */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink uppercase">
          {primaryWord}{" "}
          <span className="text-brand-red font-serif italic lowercase font-normal">
            {accentWord}
          </span>
        </h2>

        {/* Section Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-body font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {actionSlot && <div className="shrink-0">{actionSlot}</div>}
    </div>
  );
}
