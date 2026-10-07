"use client";

import React from "react";
import Link from "next/link";
import { ProjectCategory } from "@/lib/work-data";

export type FilterOption = "All" | ProjectCategory;

interface WorkFilterPillsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  projectCounts: Record<FilterOption, number>;
}

const FILTERS: FilterOption[] = [
  "All",
  "Short Form Videos",
  "Long Form Videos",
  "Graphic Design",
];

export function WorkFilterPills({
  activeFilter,
  onFilterChange,
  projectCounts,
}: WorkFilterPillsProps) {
  const handleFilterClick = (f: FilterOption) => {
    onFilterChange(f);

    // If on All view, smoothly scroll to anchor section if applicable
    if (f === "Short Form Videos") {
      const el = document.getElementById("short-form-videos");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (f === "Long Form Videos") {
      const el = document.getElementById("long-form-videos");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (f === "Graphic Design") {
      const el = document.getElementById("graphic-design");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border-y border-line py-4 sm:py-5 px-6 sm:px-12 sticky top-[68px] z-30 shadow-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            const count = projectCounts[f] || 0;
            return (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className={`relative px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? "bg-brand-red text-white border-brand-red shadow-red-btn scale-105"
                    : "bg-line/40 hover:bg-line/70 text-body hover:text-ink border-line"
                }`}
              >
                <span>{f}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-line text-body font-bold"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/dev"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-line/40 hover:bg-line/70 border border-line text-xs font-bold text-body hover:text-brand-red transition-all group"
          >
            <span>Explore Development</span>
            <span className="text-brand-red transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
