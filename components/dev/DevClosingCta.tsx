import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Clock, ShieldCheck, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/motion";

interface DevClosingCtaProps {
  primaryCtaLabel?: string;
}

export function DevClosingCta({ primaryCtaLabel = "Start a Project" }: DevClosingCtaProps = {}) {
  return (
    <section
      className="relative py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-white font-bold select-none overflow-visible"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className="relative bg-[#8B1A1A] rounded-3xl py-18 sm:py-24 px-6 sm:px-12 md:px-16 text-center overflow-hidden shadow-2xl border border-white/20"
        >
          <div
            className="relative z-10 max-w-3xl mx-auto"
          >
            {/* Clean Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/30 backdrop-blur-xs">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering Sprints</span>
            </div>

            <SplitText
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6"
              accentWords={["website", "or", "web", "platform?"]}
              accentClassName="font-serif italic font-normal text-red-100 text-[1.08em] tracking-tight"
            >
              Ready to build your next *website or web platform?*
            </SplitText>

            <p className="mt-6 text-base sm:text-xl font-bold text-red-100 max-w-2xl mx-auto leading-relaxed">
              From architecture design to production deployment, we engineer high-performance websites and web platforms
              tailored to your product vision and commercial growth targets.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <div className="relative inline-flex items-center justify-center">
                <MagneticButton
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="relative z-10 bg-white text-[#8B1A1A] hover:bg-brand-red-50 border-none shadow-xl rounded-2xl font-black text-sm px-8 py-4 uppercase tracking-wider transition-all duration-200"
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </div>
            </div>

            {/* Quick Trust Highlights */}
            <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20 text-xs text-white/80 font-bold flex-wrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-200" />
                <span>Sub-Second Latency Benchmarks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-200" />
                <span>Strict IP Ownership &amp; Clean Repo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-red-200" />
                <span>Rapid Sprint Turnaround</span>
              </div>
            </div>

            {/* Cross-Link Navigation */}
            <div className="mt-12 pt-8 border-t border-white/15 max-w-2xl mx-auto text-xs text-red-100 font-medium space-y-3">
              <p className="font-bold uppercase tracking-wider text-red-200 text-[11px]">
                Explore Services &amp; Regional Engineering:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/web-development"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  Web Development Services →
                </Link>
                <Link
                  href="/ui-ux-design"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  UI/UX Design Systems →
                </Link>
                <Link
                  href="/video-editing"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  Video Editing &amp; Commercials →
                </Link>
                <Link
                  href="/ahmedabad"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  Ahmedabad Hub →
                </Link>
                <Link
                  href="/gujarat"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  Gujarat Hub →
                </Link>
                <Link
                  href="/surat"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                >
                  Surat Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevClosingCta;
