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
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border-light text-text-secondary hover:text-[#8b1a1a] hover:border-[#8b1a1a]/30 text-xs font-black uppercase tracking-wider mb-8 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          {/* Header Badge & Title */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-control bg-brand-redLight text-brand-red text-xs font-black uppercase tracking-wider border border-brand-red/20 mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>DPDP Act 2023 Compliance &amp; Governance</span>
            </div>

            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
              Privacy <span className="text-[#8B1A1A]">Policy</span>.
            </h1>
            <p className="text-text-tertiary text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">
              Last Updated: August 2026 · Digital Personal Data Protection Act (DPDP Act) 2023
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white p-8 sm:p-12 rounded-lg border border-line shadow-xs space-y-8 text-text-secondary font-medium text-sm sm:text-base leading-relaxed">
            <div className="p-4 rounded-lg bg-brand-redLight/40 border border-brand-red/15 text-text-primary text-sm font-semibold">
              Lucie Creatives (&quot;Agency&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects the privacy of our visitors, clients, and prospective team members. This Privacy Policy sets out how we collect, process, store, and protect digital personal data in strict compliance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act 2023) and applicable global data protection principles.
            </div>

            {/* 1. Categories of Personal Data Collected */}
            <div>
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                1. Categories of Personal Data We Collect
              </h2>
              <p className="text-body leading-relaxed">
                We only collect digital personal data that is strictly necessary for legitimate business communication, client project scoping, and recruitment evaluation:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Project Discovery &amp; Inquiries:</strong> Full name, professional email address, organization or brand name, telephone/WhatsApp contact number, project requirements, budget tiers, and timeline preferences submitted via our contact forms.
                </li>
                <li>
                  <strong className="text-ink">Career Applicants:</strong> Full name, email address, phone number, portfolio links, curriculum vitae (CV / resume in PDF or Word format), years of professional experience, and notice period information submitted via our career portal.
                </li>
                <li>
                  <strong className="text-ink">Technical Metadata:</strong> Anonymized server logs, browser user-agent strings, general geographic region, and performance metrics collected automatically to secure our website against malicious traffic.
                </li>
              </ul>
            </div>

            {/* 2. Lawful Grounds and Purposes of Processing */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                2. Lawful Grounds &amp; Purposes of Processing
              </h2>
              <p className="text-body leading-relaxed">
                In accordance with the DPDP Act 2023, data is processed under clear lawful grounds, including specific consent and legitimate uses:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Client Engagement:</strong> Evaluating briefs, preparing commercial proposals, executing creative production sprints, and coordinating milestone delivery.
                </li>
                <li>
                  <strong className="text-ink">Recruitment Evaluation:</strong> Reviewing applicant qualifications, verifying portfolios, and scheduling technical interviews.
                </li>
                <li>
                  <strong className="text-ink">Security &amp; Fraud Prevention:</strong> Protecting web infrastructure, preventing denial-of-service attempts, and ensuring server uptime.
                </li>
              </ul>
              <p className="mt-2 text-body leading-relaxed font-semibold">
                Lucie Creatives never sells, rents, monetizes, or trades your personal information with external brokers or advertisers.
              </p>
            </div>

            {/* 3. Data Retention Schedule */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                3. Data Retention Schedule
              </h2>
              <p className="text-body leading-relaxed">
                We retain personal data only for as long as necessary to fulfill the specific purposes for which it was gathered:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Client Inquiries &amp; Discovery Data:</strong> Retained for up to twelve (12) months from submission or for the duration of the active client partnership plus any statutory tax limitation period.
                </li>
                <li>
                  <strong className="text-ink">Job Application &amp; Resume Data:</strong> Retained for six (6) months following the closing of the relevant recruitment cycle, after which files and records are securely purged.
                </li>
                <li>
                  <strong className="text-ink">Technical Access Logs:</strong> Retained for a maximum of thirty (30) days for security audits and diagnostic monitoring.
                </li>
              </ul>
            </div>

            {/* 4. Rights of Data Principals under DPDP Act 2023 */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                4. Rights of Data Principals
              </h2>
              <p className="text-body leading-relaxed">
                As a Data Principal under the DPDP Act 2023, you hold enforceable rights regarding your digital personal data:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Right to Access &amp; Summary:</strong> You may request a summary of the personal data we hold about you and the processing activities undertaken.
                </li>
                <li>
                  <strong className="text-ink">Right to Correction &amp; Completion:</strong> You may request correction of inaccurate or incomplete personal data.
                </li>
                <li>
                  <strong className="text-ink">Right to Erasure:</strong> You may request deletion of your personal data when the specified purpose is fulfilled and retention is no longer mandated by law.
                </li>
                <li>
                  <strong className="text-ink">Right to Grievance Redressal:</strong> You may seek redressal for any concerns or non-compliance regarding your personal data.
                </li>
                <li>
                  <strong className="text-ink">Right to Nominate:</strong> You have the right to nominate another individual to exercise your rights in the event of death or incapacity.
                </li>
              </ul>
            </div>

            {/* 5. Data Security Standards */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                5. Data Security &amp; Technical Safeguards
              </h2>
              <p className="text-body leading-relaxed">
                We implement robust reasonable security safeguards to prevent personal data breaches, including TLS 1.3 cryptographic protocols for data in transit, strict principle-of-least-privilege access controls, isolated production database environments, and secure, non-indexed storage for candidate resume documents.
              </p>
            </div>

            {/* 6. Grievance Officer & Contact Details */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                6. Grievance Officer &amp; Regulatory Redressal
              </h2>
              <p className="text-body leading-relaxed mb-3">
                In compliance with the Digital Personal Data Protection Act 2023, any privacy inquiries, requests to exercise Data Principal rights, or grievances may be directed to our designated Data Grievance Officer:
              </p>
              <div className="p-4 rounded-lg bg-white border border-line space-y-1.5 text-sm text-body">
                <p><strong className="text-ink">Designation:</strong> Data Protection &amp; Grievance Officer</p>
                <p><strong className="text-ink">Agency:</strong> Lucie Creatives Digital Studio</p>
                <p><strong className="text-ink">Jurisdiction:</strong> Ahmedabad, Gujarat, India</p>
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  <a href={`mailto:${SITE_CONFIG.officialEmail}`} className="text-[#8B1A1A] font-bold hover:underline">
                    {SITE_CONFIG.officialEmail}
                  </a>
                </p>
              </div>
              <p className="mt-3 text-xs text-muted">
                All requests received by the Grievance Officer will be acknowledged within forty-eight (48) hours and addressed within thirty (30) calendar days as stipulated under the DPDP Act 2023.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
