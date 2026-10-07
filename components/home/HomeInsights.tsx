"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { INSIGHTS_ARTICLES } from "@/lib/insights-data";

export function HomeInsights() {
  // Select 3 diverse pillar guides across Web Dev, Branding, and Video Editing
  const featuredInsights = INSIGHTS_ARTICLES.slice(0, 3);

  return (
    <section
      id="insights"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold border-t border-line"
    >
      {/* Dot Grid Pattern */}
      {null}

      {/* Atmospheric Glow */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel number="11" text="STRATEGIC INSIGHTS &amp; ANALYSIS" className="mb-4" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] text-text-primary leading-[1.0] max-w-3xl text-balance">
              Engineering &amp;{" "}
              <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
                design strategy.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-secondary font-medium leading-relaxed max-w-2xl">
              Practical guides on custom web performance, brand identity architecture, and high-retention video production written by our senior practice leads.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-line text-xs font-black text-ink hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 hover:shadow-soft transition-all shrink-0"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 text-[#8b1a1a]" />
          </Link>
        </div>

        {/* 3-Card Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredInsights.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group p-6 sm:p-7 rounded-3xl bg-white border border-line/80 shadow-soft hover:shadow-[0_20px_45px_-10px_rgba(139, 26, 26,0.12)] hover:border-[#8b1a1a]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-line/60">
                  <Image
                    src={article.coverImage}
                    alt={article.coverImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Category & Time */}
                <div className="flex items-center justify-between text-xs text-muted font-bold mb-3">
                  <span className="text-[#8b1a1a] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted" />
                    {article.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-ink group-hover:text-[#8b1a1a] transition-colors leading-snug mb-3 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm font-medium text-body line-clamp-3 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-muted">
                  By {article.author.name.replace("Lucie Creatives ", "")}
                </span>
                <span className="font-black text-[#8b1a1a] transition-transform inline-flex items-center gap-1">
                  Read Guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
