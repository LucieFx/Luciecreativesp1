"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FOUNDER_PILLARS = [
  {
    icon: MessageSquare,
    badge: "DIRECT ACCESS",
    title: "No Account Managers",
    description:
      "A dedicated, direct communication line with our founders. No game of telephone, no bureaucratic middle layer.",
    highlights: ["Direct Slack & WhatsApp Comms", "Same-Day Direct Feedback", "Zero Agency Runaround"],
  },
  {
    icon: ShieldCheck,
    badge: "TRUE OWNERSHIP",
    title: "Zero Hand-Off Loss",
    description:
      "The people who pitch the vision are the builders inside the IDE, Figma, and Premiere timeline. Your creative intent never gets diluted.",
    highlights: ["Founder-Crafted Systems", "Design & Code Alignment", "Obsessive Quality Standard"],
  },
  {
    icon: Zap,
    badge: "HIGH VELOCITY",
    title: "Rapid Execution Sprints",
    description:
      "We operate as an agile 4–5 person elite unit. We make tactical decisions in hours, shipping clean revisions without 5-tier approval chains.",
    highlights: ["Rapid Iteration Cycles", "Clear Milestone Ownership", "Sub-24h Critical Response"],
  },
];

export function HomeLocations() {
  return (
    <section
      id="founder-partnership"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold select-none"
    >
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#8b1a1a]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <SectionLabel number="10" text="THE LUCIE DIFFERENTIATOR" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase leading-[1.08] max-w-4xl text-balance">
            Direct Founder Partnership,{" "}
            <span className="text-[#8b1a1a] italic block sm:inline">
              Zero Agency Bloat.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            Most agencies sell you senior partners and hand your account to junior coordinators. We work as a tight, founder-led unit with direct access and total skin in the game.
          </p>
        </div>

        {/* Founder Spotlight Hero Banner */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-[#8b1a1a] text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-black tracking-wider uppercase mb-4 text-white">
                <Users className="w-3.5 h-3.5 text-rose-300" />
                <span>FOUNDER-LED DIGITAL STUDIO • 4–5 PERSON CORE TEAM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-white mb-3">
                You work directly with the founders
              </h3>

              <p className="text-white/85 text-sm sm:text-base font-medium leading-relaxed mb-6">
                Our clients come to us because they need a team that treats the work as their problem too—4–5 people aligned with the vision, staying until the outcome shows up. Not random edits. Not a vibe-coded site nobody measures.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Direct Co-Founder Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Senior-Only Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Outcome Accountability</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-[#8b1a1a] hover:bg-slate-100 transition-all font-black text-sm shadow-md group"
              >
                <Calendar className="w-4 h-4 text-[#8b1a1a]" />
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all font-bold text-sm"
              >
                <span>Read Founders&apos; Note</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Card Differentiator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {FOUNDER_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-3xl bg-white/70 border border-line/80 hover:border-[#8b1a1a]/30 hover:bg-white transition-all shadow-xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8b1a1a] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-line flex items-center justify-center group-hover:bg-[#8b1a1a] group-hover:text-white group-hover:border-transparent transition-all shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-ink tracking-tight uppercase mb-3">
                    {pillar.title}
                  </h4>

                  <p className="text-sm font-medium text-body leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-line/60 space-y-2">
                  {pillar.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-bold text-body"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
