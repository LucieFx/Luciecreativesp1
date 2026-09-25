"use client";

import React from "react";

export default function InsightHero() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ink uppercase leading-tight">
        Insights &{" "}
        <span className="text-[#7A1F2B] font-serif italic lowercase font-normal">
          Expert Guides
        </span>
      </h1>
      <p className="mt-4 text-base sm:text-lg text-body font-medium leading-relaxed max-w-2xl mx-auto">
        Actionable strategies and expert perspectives on web development, graphic design, video editing, branding, and growing your business.
      </p>
    </div>
  );
}
