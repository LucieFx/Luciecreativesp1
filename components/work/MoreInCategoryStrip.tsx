"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CrossPortfolioCard } from "@/lib/cross-portfolio";

interface MoreInCategoryStripProps {
  categoryName: string;
  cards: CrossPortfolioCard[];
  onNavigate?: (href: string) => void;
}

export function MoreInCategoryStrip({ categoryName, cards, onNavigate }: MoreInCategoryStripProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="py-6 sm:py-8 border-t border-line">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
          More in {categoryName}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card) => {
          const handleClick = (e: React.MouseEvent) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(card.href);
            }
          };

          return (
            <Link
              key={card.id}
              href={card.href}
              onClick={handleClick}
              className="group relative bg-white/80 hover:bg-white rounded-xl sm:rounded-2xl border border-line/80 hover:border-brand-red/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#ffffff]">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-xs shadow-xs border ${
                      card.type === "Design"
                        ? "bg-ink/80 text-white border-white/20"
                        : card.type === "Film"
                        ? "bg-ink/80 text-white/90 border-white/20"
                        : "bg-brand-red/90 text-white border-white/20"
                    }`}
                  >
                    {card.type}
                  </span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between gap-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-ink line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
                  {card.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted pt-1.5 border-t border-line/60">
                  <span className="truncate">{card.client}</span>
                  <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-brand-red transition-transform shrink-0 ml-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
