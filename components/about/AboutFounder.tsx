"use client";

import React from "react";
import { Quote, ShieldCheck, Zap, Target, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { SITE_CONFIG } from "@/lib/constants";

interface AboutFounderProps {
  founders?: string;
}

function SocialIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("instagram")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (lower.includes("linkedin")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (lower.includes("twitter") || lower.includes("x")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return <ArrowUpRight className={className} />;
}

export function AboutFounder({ founders = "Founders" }: AboutFounderProps) {
  const founderSocials = SITE_CONFIG.socials.filter(
    (s) =>
      s.name.toLowerCase().includes("linkedin") ||
      s.name.toLowerCase().includes("x") ||
      s.name.toLowerCase().includes("instagram")
  );

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto select-none">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 lg:p-16 rounded-xl bg-white border border-line shadow-xs relative overflow-hidden text-center">
          <div className="relative z-10 space-y-8">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-red-50 border border-brand-red/20 text-[#8B1A1A] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
              <span>Studio Note</span>
            </div>

            {/* Quote Icon Badge */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-lg bg-[#8B1A1A] text-white flex items-center justify-center border border-[#8B1A1A]/40 shadow-xs">
                <Quote className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Note Content */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink leading-relaxed tracking-tight max-w-3xl mx-auto text-pretty">
              &ldquo;We built Lucie Creatives because we were tired of seeing ambitious brands get weighed down by slow agency bureaucracies. Every sprint we ship is personal to us. We don&apos;t settle for average retention, and we don&apos;t ship code or design systems we wouldn&apos;t stake our reputation on.&rdquo;
            </blockquote>

            {/* 3 Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto text-left">
              <div className="p-4 rounded-lg bg-surface-alt/70 border border-line flex items-start gap-3">
                <Target className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Direct Access</h3>
                  <p className="text-[11px] text-body mt-0.5 font-normal">Direct communication with the builders, no account managers.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-alt/70 border border-line flex items-start gap-3">
                <Zap className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">High Velocity</h3>
                  <p className="text-[11px] text-body mt-0.5 font-normal">Agile 7 to 14 day sprints with sub-24h critical turnaround.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-alt/70 border border-line flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">True Ownership</h3>
                  <p className="text-[11px] text-body mt-0.5 font-normal">Total skin in the game &amp; 100% commercial IP transfer.</p>
                </div>
              </div>
            </div>

            {/* Note Sign-off & Socials */}
            <div className="pt-8 border-t border-line/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-ink font-bold text-sm tracking-tight">
                  Lucie Creatives
                </div>
                <div className="text-muted font-mono font-medium text-xs tracking-wider">
                  Digital Engineering &amp; Creative Studio
                </div>
              </div>

              {/* Founder Social Links with Magnetic */}
              <div className="flex items-center justify-center gap-2.5">
                {founderSocials.map((social) => (
                  <Magnetic key={social.name} maxPull={6}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      aria-label={`${social.name} (${social.handle})`}
                      className="w-9 h-9 rounded-xl bg-surface-alt border border-line hover:border-[#8B1A1A]/30 hover:bg-brand-red-50 text-body hover:text-[#8B1A1A] flex items-center justify-center transition-all shadow-xs"
                    >
                      <SocialIcon name={social.name} className="w-3.5 h-3.5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutFounder;
