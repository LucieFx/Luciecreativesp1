"use client";

import React from "react";

export default function InsightHero() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl sm:text-6xl font-display font-black tracking-[-0.02em] text-ink leading-[1.0] text-balance">
        Insights &{" "}
        <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
          expert guides
        </span>
      </h1>
      <p className="mt-4 text-base sm:text-lg text-body font-medium leading-relaxed max-w-2xl mx-auto">
        Actionable strategies and expert perspectives on web development, graphic design, video editing, branding, and growing your business.
      </p>
    </div>
  );
}
