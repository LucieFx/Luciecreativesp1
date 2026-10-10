import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

export interface CompanyStat {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  subtext?: string;
}

interface CompanyStatsBarProps {
  stats?: CompanyStat[];
  className?: string;
}

import { SITE_STATS } from "@/lib/site-stats";
import { AGENCY_STATS } from "@/lib/stats";

const DEFAULT_STATS: CompanyStat[] = [
  { label: "Brands Elevated", value: `${AGENCY_STATS.brandsElevated}+` },
  { label: "Websites Delivered", value: `${AGENCY_STATS.appsAndSitesDelivered}+` },
  { label: "Views Generated", value: SITE_STATS.viewsLabel },
  { label: "Campaigns Executed", value: `${AGENCY_STATS.campaignsExecuted}+` },
];

export function CompanyStatsBar({ stats, className = "" }: CompanyStatsBarProps) {
  const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <div className={`relative w-full py-8 sm:py-10 bg-white border-b border-line/80 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Summary Bar: Linking to About & FAQs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 mb-6 border-b border-line/60 text-xs text-muted font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B1A1A]" />
            <span className="font-bold text-ink uppercase tracking-wider text-[11px]">
              Single Verified Track Record
            </span>
            <span className="hidden sm:inline text-muted/60">•</span>
            <span className="hidden sm:inline">Audited Commercial Outcomes</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-bold text-[#8B1A1A] hover:underline"
            >
              <span>Our Story &amp; Principles</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/contact#faq"
              className="inline-flex items-center gap-1.5 text-body hover:text-[#8B1A1A] hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5 text-muted" />
              <span>Frequently Asked Questions</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayStats.map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className="p-4 sm:p-5 rounded-card bg-white/70 border border-line/70 text-center flex flex-col items-center justify-center group hover:bg-white hover:border-[#8B1A1A]/30 hover:shadow-md transition-all duration-200"
            >
              <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted mt-1 text-balance">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyStatsBar;
