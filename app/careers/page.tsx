import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CAREER_ROLES } from "@/lib/careers-data";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Careers — Work With Us | Lucie Creatives",
  description:
    "Explore career openings at Lucie Creatives. We are hiring talented Video Editors and Graphic Designers to build high-retention brand media and monolithic visual identities.",
  alternates: {
    canonical: "https://luciecreatives.in/careers",
  },
  openGraph: {
    title: "Careers at Lucie Creatives — Work With Us",
    description:
      "Join our creative production and design team in Ahmedabad. Active openings for Video Editors and Graphic Designers.",
    url: "https://luciecreatives.in/careers",
    type: "website",
  },
};

export default function CareersPage() {
  const roles = CAREER_ROLES;

  return (
    <div className="min-h-screen bg-[#ffffff] text-ink font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }]} />
        </div>

        {/* Header Section */}
        <header className="mb-14 sm:mb-18 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] inline-block" aria-hidden="true" />
            <span>Join The Team</span>
          </div>

          <SplitText
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] mb-4 text-balance"
            accentClassName="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline"
          >
            Come make things people *stop for.*
          </SplitText>

          <p className="text-base sm:text-lg text-body font-normal leading-relaxed max-w-3xl text-pretty">
            We don&apos;t just execute — we solve alongside founders. Join our team partnering with ambitious brands across high-retention video editing, monolithic graphic design, and full-spectrum social media momentum.
          </p>
        </header>

        {/* Open Positions Section */}
        <section aria-labelledby="open-positions-heading" className="mb-16">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-line/80 mb-6">
            <span
              id="open-positions-heading"
              className="text-xs font-mono font-bold tracking-widest uppercase text-[#8B1A1A]/80"
            >
              OPEN POSITIONS
            </span>
            <span className="text-xs font-mono text-muted font-medium">
              {roles.length} ACTIVE ROLES
            </span>
          </div>

          {/* Role Cards List */}
          <div className="space-y-6">
            {roles.map((role, idx) => (
              <Reveal key={role.slug} delay={idx * 0.08}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="group block rounded-3xl bg-white border border-line/90 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#8B1A1A]/40 transition-all duration-300 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-ink group-hover:text-[#8B1A1A] transition-colors leading-tight mb-2">
                        {role.title}
                      </h2>
                      <p className="text-sm text-body font-normal leading-relaxed max-w-2xl">
                        {role.shortDescription}
                      </p>
                    </div>

                    {/* Apply Link (Bold Maroon, Top-Right) */}
                    <div className="self-start sm:self-auto shrink-0 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B1A1A] hover:underline transition-transform">
                        <span>Apply</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Tag Pills below description: Blush background, maroon text, rounded-full */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 mt-2 border-t border-line/60">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
                      <Briefcase className="w-3.5 h-3.5 text-[#8B1A1A]" />
                      <span>{role.department}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
                      {role.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
                      {role.location}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Small Centered Footer Note */}
        <div className="pt-8 text-center border-t border-line/60">
          <p className="text-xs font-mono font-bold tracking-widest text-muted uppercase">
            Lucie Creatives
          </p>
          <p className="text-[11px] text-muted mt-1">
            Equal opportunity creative workplace. Ahmedabad, Gujarat &amp; Worldwide.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
