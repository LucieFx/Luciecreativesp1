import React from "react";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowUpRight, Mail } from "lucide-react";
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
      className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white select-none overflow-visible"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className="relative bg-[#8B1A1A] rounded-card py-14 sm:py-20 px-6 sm:px-12 md:px-16 text-center overflow-hidden shadow-xs border border-white/20"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Clean Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6 border border-white/30 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span>Let&apos;s Work Together</span>
            </div>

            <SplitText
              as="h2"
              className="font-display font-black text-white text-[clamp(2.0rem,5vw,3.8rem)] leading-[1.0] tracking-[-0.02em] mb-5 text-balance"
              accentWords={["impossible", "ignore?", "to"]}
              accentClassName="font-accent italic text-white text-[1.1em] tracking-normal inline"
            >
              Ready to make your brand *impossible to ignore?*
            </SplitText>

            {/* One honest sentence subtext (16-18px) */}
            <p className="text-white/95 text-[16px] sm:text-[18px] font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
              Tell us about your project, timeline, and goals. We&apos;ll let you know how we can help.
            </p>

            {/* CTAs: Primary button + clearly legible email */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white text-[#8B1A1A] hover:bg-brand-red-50 border-none shadow-xs rounded-control font-bold text-[15px] px-8 py-4 transition-colors duration-200"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <a
                href={`mailto:${displayEmail}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-control bg-white/15 hover:bg-white/25 hover:-translate-y-[1px] active:translate-y-0 text-white border border-white/30 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <Mail className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
                <span
                  className="text-[14px] sm:text-[15px] font-semibold text-white tracking-[0.01em] lowercase normal-case whitespace-nowrap antialiased"
                  style={{
                    fontFamily:
                      'var(--font-body), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    textTransform: "none",
                    fontFeatureSettings: '"liga" 0, "calt" 0',
                    fontVariantLigatures: "none",
                    WebkitFontSmoothing: "antialiased",
                    whiteSpace: "nowrap",
                    color: "#ffffff",
                  }}
                >
                  {displayEmail}
                </span>
              </a>
            </div>

            {/* Single honest reply promise at 15px */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-[15px] text-white/90 font-medium">
                We usually reply within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RedBreak;
