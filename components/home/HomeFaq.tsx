"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFaqSchema } from "@/lib/schema-structured-data";

const HOMEPAGE_FAQS = [
  {
    q: "What services does Lucie Creatives provide as a digital agency?",
    a: "Lucie Creatives is a full-stack creative digital agency providing production-grade web development (Next.js, React, TypeScript), cinema-grade video editing (viral 9:16 reels and 16:9 commercials), monolithic graphic design, custom logo design, holistic brand identity systems, and human-centered UI/UX product design.",
  },
  {
    q: "How do you collaborate with businesses in Gujarat and global clients worldwide?",
    a: "We operate on an agile, remote-first sprint framework calibrated for local enterprises in Gujarat and global clients across the US, UK, Europe, and UAE. We coordinate through dedicated Slack/WhatsApp channels, maintain active multi-timezone overlap (PST, EST, GMT, GST, IST), and provide interactive cloud workspaces on Figma and Frame.io with guaranteed sub-24h turnaround and weekly video strategy reviews.",
  },
  {
    q: "Can you handle both web development and creative branding under one roof?",
    a: "Yes. One of our greatest competitive advantages is unifying visual brand identity with full-stack software engineering. Your brand narrative, typography scales, design tokens, and marketing videos translate seamlessly into production Next.js code without any loss in creative fidelity.",
  },
  {
    q: "What are your typical project timelines and sprint turnaround times?",
    a: "Individual sprint deliverables like social media carousels or short-form video reels are typically turned around in 24 to 48 hours. Comprehensive web applications, custom e-commerce platforms, and end-to-end brand identity books are delivered in 3 to 6-week phased sprint cycles.",
  },
  {
    q: "Who owns the intellectual property and source files upon completion?",
    a: "You retain 100% full intellectual property ownership and commercial copyright upon final milestone completion. We deliver all open master vector files (.AI, .EPS, .SVG), Figma UI component libraries, 4K ProRes video masters, and clean TypeScript code repositories.",
  },
  {
    q: "Do you sign non-disclosure agreements (NDAs) for confidential enterprise projects?",
    a: "Yes. We routinely execute bilateral NDAs with our clients before beginning technical discovery to protect proprietary algorithms, unannounced product launches, and strategic business data.",
  },
];

export function HomeFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Structured Data Schema for FAQPage
  const faqSchema = getFaqSchema(HOMEPAGE_FAQS);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold"
    >
      {/* Embedded FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Dot Grid Pattern */}
      {null}

      {/* Atmospheric Glow */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 sticky top-28">
            <SectionLabel number="11" text="FREQUENTLY ASKED QUESTIONS" className="mb-4" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[-0.02em] text-text-primary leading-[1.0] mb-6 text-balance">
              Clear answers to{" "}
              <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
                commercial questions.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-text-secondary font-medium leading-relaxed mb-8">
              Everything you need to know about our capabilities, collaboration workflows across Gujarat, sprint turnarounds, and intellectual property ownership.
            </p>

            <div className="p-6 rounded-2xl bg-brand-red-50/60 border border-[#8b1a1a]/15 inline-block">
              <div className="flex items-center gap-2 text-xs font-black text-[#8b1a1a] uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Have a custom requirement?</span>
              </div>
              <p className="text-xs font-bold text-body">
                Schedule a 15-minute discovery call to review your exact scope directly with our team.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleAccordion(idx)}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isOpen
                      ? "bg-brand-red-50/50 border-[#8b1a1a]/40 shadow-sm ring-1 ring-[#8b1a1a]/20"
                      : "bg-white border-line hover:border-[#8b1a1a]/30 hover:bg-brand-red-50/40"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAccordion(idx);
                    }}
                    className="w-full flex items-center justify-between text-left gap-4 px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1a1a] rounded-2xl cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-black text-sm md:text-base transition-colors ${
                        isOpen ? "text-[#8b1a1a]" : "text-text-primary"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#8b1a1a] text-white rotate-180 scale-105"
                          : "bg-slate-100 text-body border border-line"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6 px-6" : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2 border-t border-[#8b1a1a]/15 text-body text-xs sm:text-sm leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
