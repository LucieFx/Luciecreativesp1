"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { InsightArticle } from "@/lib/insights-data";

interface InsightCardProps {
  insight: InsightArticle;
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-cursor="Read"
      className="group p-6 rounded-3xl bg-white border border-line shadow-soft hover:shadow-card hover:border-[#7A1F2B]/40 transition-all flex flex-col justify-between h-full"
    >
      <div>
        {insight.coverImage && (
          <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-line/60">
            <Image
              src={insight.coverImage}
              alt={insight.coverImageAlt || insight.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted font-bold mb-3">
          <span className="text-[#7A1F2B] uppercase tracking-wider">
            {insight.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted" />
            {insight.readingTime}
          </span>
        </div>
        <h3 className="text-lg font-black text-ink group-hover:text-[#7A1F2B] transition-colors leading-snug mb-2 line-clamp-2">
          {insight.title}
        </h3>
        <p className="text-xs font-medium text-body line-clamp-3 leading-relaxed">
          {insight.excerpt}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
        <span className="font-semibold text-muted">
          {insight.publishedDate}
        </span>
        <span className="font-black text-[#7A1F2B] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Read Article <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
