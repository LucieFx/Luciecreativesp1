import React from "react";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowUpRight, Sparkles, Clock, ShieldCheck, Mail, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SplitText } from "@/components/motion";

interface RedBreakProps {
  primaryCtaLabel?: string;
  contactEmail?: string;
}

export function RedBreak({
  primaryCtaLabel = "Start a Project",
  contactEmail,
}: RedBreakProps = {}) {
  const displayEmail = contactEmail || SITE_CONFIG.officialEmail;

  return (
    <section
      className="relative py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-white font-bold select-none overflow-visible"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className="relative bg-[#8B1A1A] rounded-3xl py-18 sm:py-24 px-6 sm:px-12 md:px-16 text-center overflow-hidden shadow-xl border border-white/20"
        >

          <div
            className="relative z-10 max-w-3xl mx-auto"
          >
            {/* Clean Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/30 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SCALE WITH LUCIE CREATIVES</span>
            </div>

            <SplitText
              as="h2"
              className="font-black text-white text-[clamp(2.4rem,5.5vw,4.5rem)] leading-tight tracking-tight mb-6"
              accentWords={["impossible", "ignore?", "to"]}
              accentClassName="font-serif italic font-normal text-white/95 text-[1.12em] tracking-tight"
            >
              Ready to make your brand *impossible to ignore?*
            </SplitText>

            <p className="text-white/85 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Join leading forward-thinking companies scaling their digital presence, organic reach, and conversion engines with Lucie Creatives.
            </p>

            {/* CTAs with Handwritten Note */}
            <div className="relative flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* Primary Button */}
                <div className="relative inline-flex items-center justify-center">
                  <MagneticButton
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    className="relative z-10 bg-white text-[#8B1A1A] hover:bg-brand-red-50 border-none shadow-elevated rounded-2xl font-black text-sm px-8 py-4 transition-all duration-200"
                  >
                    <span>{primaryCtaLabel}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </div>

                <a
                  href={`mailto:${displayEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider border border-white/30 backdrop-blur-xs transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>Direct Email Dispatch</span>
                </a>
              </div>

              {/* Guarantee / Trust Subtitle Below Button */}
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/90 backdrop-blur-xs">
                <span>✦ 60-sec brief • direct founder consultation • strict NDA</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20 text-xs text-white/80 font-bold flex-wrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-200" />
                <span>Response Time &lt; 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-200" />
                <span>Strict IP Protection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-red-200" />
                <span>Rapid Sprint Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RedBreak;
