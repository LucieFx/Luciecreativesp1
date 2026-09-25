import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

import type { Metadata } from "next";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/privacy"]);

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-text-primary pt-36 pb-24 px-6 md:px-12 relative overflow-hidden font-sans font-normal">
        {/* Background Dots Overlay Pattern */}
        <div className="absolute inset-0 dot-grid-pattern opacity-70 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border-light text-text-secondary hover:text-[#7A1F2B] hover:border-[#7A1F2B]/30 text-xs font-black uppercase tracking-wider mb-8 shadow-soft transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

        {/* Header Badge & Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purpleLight text-brand-purple text-xs font-black uppercase tracking-wider border border-brand-purple/20 mb-4 shadow-soft">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>

          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
            Privacy <span className="text-brand-gradient text-purple-glow">Policy.</span>
          </h1>
          <p className="text-text-tertiary text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">
            Last Updated: August 2026 · Lucie Creatives Digital Agency
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-purple/20 shadow-floating space-y-8 text-text-secondary font-semibold text-sm sm:text-base leading-relaxed">
          <div className="p-4 rounded-2xl bg-brand-purpleLight/40 border border-brand-purple/15 text-text-primary text-sm font-bold">
            At Lucie Creatives, we take your personal and business data security seriously. This policy outlines how information is collected, stored, and protected across our digital channels.
          </div>

          <div>
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              1. Information We Collect
            </h2>
            <p>
              When you submit a project discovery or quote request on Lucie Creatives, we collect your name, business email address, company or brand name, phone number, required service categories, estimated budget tier, and project specifications.
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              2. How We Use Information
            </h2>
            <p>
              All information collected is strictly utilized to evaluate your project scope, formulate tailored creative and software proposals, and coordinate agency deliverables. We do not sell, rent, or trade your contact data to third-party advertisers.
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              3. Data Security &amp; Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols, SSL certificates, and secure database parameters to safeguard your confidential project concepts and personal details.
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              4. Contact &amp; Inquiries
            </h2>
            <p className="mb-4">
              For any questions regarding our data governance or to request data removal, please reach out directly:
            </p>
            <a
              href={`mailto:${SITE_CONFIG.officialEmail}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-purpleLight text-brand-purple font-black text-sm border border-brand-purple/20 hover:bg-brand-purple hover:text-white transition-all shadow-soft"
            >
              <Mail className="w-4 h-4" />
              <span>{SITE_CONFIG.officialEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
  );
}
