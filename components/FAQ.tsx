"use client";

import React, { useState } from "react";
import { FAQ_DATA } from "@/lib/constants";
import { SectionLabel } from "./ui/SectionLabel";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-36 px-6 md:px-12 bg-white relative overflow-hidden font-bold">
      {/* Background Dots Overlay Pattern */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel text="FREQUENTLY ASKED QUESTIONS" className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <h2 className="font-black tracking-tight text-text-primary text-[clamp(2.2rem,4.5vw,4.5rem)] leading-tight sticky top-28">
              Questions? <br />
              We&apos;ve got <br />
              <span className="text-brand-gradient">clear answers.</span>
            </h2>
          </div>

          {/* Right Column: Interactive FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleAccordion(idx)}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isOpen
                      ? "bg-brand-red-50/60 border-brand-red shadow-floating scale-[1.01] ring-2 ring-brand-red/25"
                      : "bg-white border-border-light hover:border-brand-red/40 hover:bg-brand-red-50/20 shadow-sm"
                  }`}
                  data-cursor-text="TOGGLE"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAccordion(idx);
                    }}
                    className="w-full flex items-center justify-between text-left gap-4 px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-inset rounded-2xl cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-black text-sm md:text-base transition-colors ${
                        isOpen ? "text-brand-red" : "text-text-primary group-hover:text-brand-red"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-brand-red text-white shadow-purple-btn rotate-180 scale-105"
                          : "bg-brand-red-50 text-brand-red border border-brand-red/20"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-5 px-6" : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2 border-t border-brand-purple/15 text-body text-sm leading-relaxed font-bold text-pretty">
                        {faq.answer}
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
