import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CAREER_ROLES, getCareerRoleBySlug } from "@/lib/careers-data";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { CheckCircle2, Briefcase } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface RolePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return CAREER_ROLES.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({
  params,
}: RolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);

  if (!role) {
    return {
      title: "Role Not Found | Lucie Creatives Careers",
    };
  }

  const title = role.title;

  return {
    title: `${title} — Careers | Lucie Creatives`,
    description: role.shortDescription,
    alternates: {
      canonical: `https://luciecreatives.in/careers/${role.slug}`,
    },
    openGraph: {
      title: `${title} Opening at Lucie Creatives`,
      description: role.shortDescription,
      url: `https://luciecreatives.in/careers/${role.slug}`,
      type: "article",
    },
  };
}

export default async function RoleDetailPage({ params }: RolePageProps) {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-ink font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full">
        {/* Back Link & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8B1A1A] hover:underline transition-colors group"
          >
            <span>← All openings</span>
          </Link>

          <Breadcrumbs
            items={[
              { label: "Careers", href: "/careers" },
              { label: role.title, href: `/careers/${role.slug}` },
            ]}
          />
        </div>

        {/* Role Header */}
        <header className="mb-12 border-b border-line/80 pb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] mb-4 text-balance">
            {role.title}
          </h1>

          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
              <Briefcase className="w-3 h-3 text-[#8B1A1A]" />
              <span>{role.department}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
              {role.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8B1A1A]/[0.08] border border-[#8B1A1A]/15 text-[#8B1A1A] text-xs font-semibold">
              {role.location}
            </span>
          </div>

          {/* Intro Paragraph */}
          <p className="text-base sm:text-xl text-body font-medium leading-relaxed max-w-3xl">
            {role.intro}
          </p>
        </header>

        {/* Role Content Details */}
        <div className="space-y-10 mb-14">
          {/* WHAT YOU WILL DO */}
          <section>
            <h2 className="text-xs font-mono font-black tracking-widest uppercase text-[#8B1A1A] mb-4">
              WHAT YOU WILL DO
            </h2>
            <ul className="space-y-3">
              {role.whatYouWillDo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm sm:text-base text-body font-normal leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#8B1A1A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* WHAT WE NEED */}
          <section>
            <h2 className="text-xs font-mono font-black tracking-widest uppercase text-[#8B1A1A] mb-4">
              WHAT WE NEED
            </h2>
            <ul className="space-y-3">
              {role.whatWeNeed.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm sm:text-base text-body font-normal leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#8B1A1A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* NICE TO HAVE */}
          {role.niceToHave && role.niceToHave.length > 0 && (
            <section>
              <h2 className="text-xs font-mono font-black tracking-widest uppercase text-[#8B1A1A] mb-4">
                NICE TO HAVE
              </h2>
              <ul className="space-y-3">
                {role.niceToHave.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-body font-normal leading-relaxed"
                  >
                    <span className="font-mono text-[#8B1A1A] font-bold shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Application Form Section */}
        <section id="apply-form" className="scroll-mt-32">
          <CareerApplicationForm role={role} />
        </section>

        {/* Small Centered Footer Note */}
        <div className="pt-12 mt-12 text-center border-t border-line/60">
          <p className="text-xs font-mono font-bold tracking-widest text-muted uppercase">
            Lucie Creatives
          </p>
          <p className="text-[11px] text-muted mt-1">
            We review all qualified applicants without regard to background or identity.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
