import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  getAllInsights,
  getInsightBySlug,
  getNextInsight,
  getRelatedInsights,
} from "@/lib/insights-data";
import {
  getInsightArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "@/lib/schema-structured-data";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  BookOpen,
  AlertCircle,
  Info,
  Lightbulb,
  MapPin,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllInsights();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luciecreatives.in";
  const canonicalUrl = `${baseUrl}/insights/${article.slug}`;

  return {
    title: `${article.title} | Lucie Creatives Insights`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate || article.publishedDate,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          alt: article.coverImageAlt || article.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const nextArticle = getNextInsight(article.slug);

  // Schema.org Structured Data
  const articleSchema = getInsightArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    slug: article.slug,
    image: article.coverImage,
    publishedDate: article.publishedDate,
    updatedDate: article.updatedDate,
    category: article.category,
    authorName: article.author.name,
    authorRole: article.author.role,
    serviceName: article.primaryService?.name,
    serviceHref: article.primaryService?.href,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Insights", item: "/insights" },
    { name: article.title, item: `/insights/${article.slug}` },
  ]);

  const faqSchema = article.faqs?.length ? getFaqSchema(article.faqs) : null;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative">
        <Navbar />

        {/* 1. ARTICLE HERO HEADER */}
        <article className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: article.category, href: "/insights" },
                { label: article.title },
              ]}
              className="mb-8"
            />

            {/* Meta Category & Reading Time */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 text-[11px] font-black text-[#8b1a1a] uppercase tracking-wider border border-[#8b1a1a]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a] inline-block" aria-hidden="true" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                <Clock className="w-3.5 h-3.5 text-muted" />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                Updated {article.updatedDate}
              </span>
            </div>

            {/* Primary Article H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink uppercase leading-[1.12] mb-6">
              {article.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-xl font-medium text-body leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Author Attribution Card */}
            <div className="flex items-center justify-between py-4 border-y border-line text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-line flex items-center justify-center text-[#8b1a1a] font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-ink">{article.author.name}</p>
                  <p className="font-medium text-muted text-xs">{article.author.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block">
                  Original Publication
                </span>
                <span className="text-xs font-bold text-body">{article.publishedDate}</span>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden mt-10 shadow-soft border border-line">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* 2. EXECUTIVE KEY TAKEAWAYS */}
            {article.keyTakeaways?.length > 0 && (
              <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-line shadow-soft">
                <div className="flex items-center gap-2 mb-4 text-[#8b1a1a]">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="text-sm sm:text-base font-black uppercase tracking-widest text-ink">
                    Executive Summary &amp; Key Findings
                  </h2>
                </div>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-body leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. TABLE OF CONTENTS */}
            {article.tableOfContents?.length > 0 && (
              <div className="mt-10 p-6 rounded-2xl bg-white border border-line">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted block mb-3">
                  IN THIS GUIDE
                </span>
                <nav aria-label="Table of Contents">
                  <ol className="space-y-2">
                    {article.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-xs sm:text-sm font-bold text-ink hover:text-[#8b1a1a] transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            {/* 4. ARTICLE CONTENT SECTIONS */}
            <div className="mt-12 space-y-12 text-ink">
              {article.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight mb-2">
                    {sec.heading}
                  </h2>
                  {sec.subheading && (
                    <h3 className="text-sm sm:text-base font-bold text-[#8b1a1a] mb-5">
                      {sec.subheading}
                    </h3>
                  )}

                  <div className="space-y-4 text-sm sm:text-base font-medium text-body leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Section Callout if present */}
                  {sec.callout && (
                    <div className="mt-6 p-5 rounded-lg border border-line bg-white text-ink">
                      <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase tracking-wider text-[#8B1A1A]">
                        {sec.callout.type === "warning" && <AlertCircle className="w-4 h-4 text-[#8B1A1A]" />}
                        {sec.callout.type === "tip" && <Lightbulb className="w-4 h-4 text-[#8B1A1A]" />}
                        {sec.callout.type === "note" && <Info className="w-4 h-4 text-[#8B1A1A]" />}
                        <span className="text-ink">{sec.callout.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-body">
                        {sec.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Section Data Table if present */}
                  {sec.table && (
                    <div className="mt-6 overflow-x-auto rounded-lg border border-line shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-white border-b border-line/80 text-ink font-black uppercase text-[11px] tracking-wider">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 sm:p-4">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line/60 font-medium text-body">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-line/20 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 sm:p-4">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Section Key Takeaway */}
                  {sec.keyTakeaway && (
                    <div className="mt-4 p-4 rounded-lg bg-white border border-line text-xs font-medium text-body">
                      <span className="font-black text-ink uppercase tracking-wider block mb-1">
                        Core Takeaway:
                      </span>
                      {sec.keyTakeaway}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* 5. ARTICLE → PRIMARY SERVICE CONNECTION */}
            {article.primaryService && (
              <div className="mt-16 p-8 sm:p-10 rounded-lg bg-[#8B1A1A] text-white border border-[#8b1a1a] relative overflow-hidden">
                <span className="text-[11px] font-black uppercase tracking-widest text-red-100 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full inline-block mb-3">
                  PRIMARY SERVICE DISCIPLINE
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Need professional {article.primaryService.name.toLowerCase()} for your business?
                </h3>
                <p className="text-xs sm:text-sm text-red-100/90 font-medium leading-relaxed max-w-2xl mb-6">
                  Lucie Creatives engineers high-impact {article.primaryService.name.toLowerCase()} solutions tailored to your commercial milestones. Explore our capabilities, deliverables, and production sprint framework.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={article.primaryService.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#8b1a1a] hover:bg-red-50 hover:shadow-floating font-black text-xs transition-all shadow-md group"
                  >
                    <span>{article.primaryService.anchor}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8b1a1a] transition-transform" />
                  </Link>
                  {article.relatedServices?.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={rel.href}
                      className="text-xs font-bold text-red-100/90 hover:text-white transition-colors underline underline-offset-4"
                    >
                      {rel.name} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ARTICLE → RELEVANT CASE STUDIES */}
            {article.relatedCaseStudies?.length > 0 && (
              <div className="mt-16 pt-12 border-t border-line">
                <SectionLabel text="VERIFIED PRODUCTION PROOF" className="mb-2" />
                <h3 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight mb-6">
                  Related Case Studies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.relatedCaseStudies.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/work/${cs.slug}`}
                      className="p-5 rounded-2xl bg-white border border-line hover:border-[#8b1a1a]/40 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#8b1a1a] block mb-1">
                          {cs.category}
                        </span>
                        <h4 className="text-base font-black text-ink group-hover:text-[#8b1a1a] transition-colors mb-2">
                          {cs.title}
                        </h4>
                      </div>
                      <span className="text-xs font-black text-[#8b1a1a] transition-transform inline-flex items-center gap-1 mt-3">
                        Inspect Case Study →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 7. ARTICLE → LOCATION RELEVANCE (Natural Only) */}
            {article.relatedLocation && (
              <div className="mt-12 p-6 rounded-2xl bg-white border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center text-[#8b1a1a] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted block">
                      REGIONAL DEPLOYMENT
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Delivering {article.category.toLowerCase()} across {article.relatedLocation.name} and globally.
                    </p>
                  </div>
                </div>
                <Link
                  href={article.relatedLocation.href}
                  className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all shrink-0"
                >
                  {article.relatedLocation.anchor} →
                </Link>
              </div>
            )}

            {/* 8. ARTICLE FAQS ACCORDION */}
            {article.faqs?.length > 0 && (
              <div className="mt-16 pt-12 border-t border-line">
                <SectionLabel text="TOPICAL FAQS" className="mb-2" />
                <h3 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {article.faqs.map((f, fIdx) => (
                    <details
                      key={fIdx}
                      className="group rounded-2xl border border-line bg-white p-5 sm:p-6 transition-all hover:border-[#8b1a1a]/30 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between font-bold text-ink list-none text-sm sm:text-base">
                        <span>{f.q}</span>
                        <ChevronDown className="w-4 h-4 text-muted transition-transform duration-300 group-open:rotate-180 group-open:text-[#8b1a1a] shrink-0 ml-4" />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-body font-medium leading-relaxed border-t border-line/60 pt-3">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* 9. NEXT ARTICLE NAVIGATION */}
            <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-body hover:text-[#8b1a1a] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Insights</span>
              </Link>
              {nextArticle && (
                <Link
                  href={`/insights/${nextArticle.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#8b1a1a] transition-transform text-right"
                >
                  <span>Next: {nextArticle.title.slice(0, 38)}...</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </article>

        {/* 10. CLOSING STRATEGY CALL-TO-ACTION */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-[#8B1A1A] text-white text-center select-none">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
              Turn strategic insight into commercial execution.
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Discuss your web architecture, visual branding, or motion production scope with our technical leads.
            </p>
            <MagneticButton
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-[#8B1A1A] hover:bg-brand-red-50 font-black text-sm px-8 py-4 rounded-2xl shadow-elevated"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
