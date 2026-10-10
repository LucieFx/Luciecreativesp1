import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyBentoGallery } from "@/components/work/CaseStudyBentoGallery";
import { MoreFromClientStrip } from "@/components/work/MoreFromClientStrip";
import { MoreInCategoryStrip } from "@/components/work/MoreInCategoryStrip";
import { CaseStudyConversionFooter } from "@/components/work/CaseStudyConversionFooter";
import {
  getClientPortfolioItems,
  getRelatedCategoryProjects,
} from "@/lib/cross-portfolio";
import {
  getAllProjects,
  getProjectBySlug,
  getNextProject,
  ProjectCategory,
} from "@/lib/work-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { VideoBentoGrid } from "@/components/work/VideoBentoGrid";
import { NirvaDesignGallery } from "@/components/work/NirvaDesignGallery";
import { NirvaBrandSystem } from "@/components/work/NirvaBrandSystem";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  Wrench,
  Quote,
  Target,
  Compass,
  Briefcase,
  Calendar,
  Building2,
  Workflow,
  Check,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo-metadata";
import { getCaseStudySchema } from "@/lib/schema-structured-data";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { YouTubeEmbedPlayer } from "@/components/video/YouTubeEmbedPlayer";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const slugSet = new Set<string>();
  projects.forEach((p) => {
    slugSet.add(p.slug);
    p.aliases?.forEach((alias) => slugSet.add(alias));
  });
  return Array.from(slugSet).map((slug) => ({
    slug,
  }));
}

function getProjectServiceContext(category: ProjectCategory, slug: string) {
  if (category === "Short Form Videos") {
    return {
      primaryService: {
        name: "Video Editing",
        href: "/video-editing",
        anchor: "video editing services",
      },
      relatedServices: [
        {
          name: "Social Media Design",
          href: "/social-media-design",
          anchor: "social media creatives",
        },
        {
          name: "Branding",
          href: "/branding",
          anchor: "brand identity systems",
        },
      ],
      relevantLocations: [
        {
          name: "Ahmedabad",
          href: "/ahmedabad",
          anchor: "video editing in Ahmedabad",
        },
        {
          name: "Gujarat",
          href: "/gujarat",
          anchor: "creative agency in Gujarat",
        },
      ],
      relatedInsight: {
        title: "The Anatomy of High-Retention Video Editing: Why Sub-Second Hooks Dominate Reels & TikTok",
        slug: "short-form-video-editing-framework-viral-reels",
      },
    };
  }
  if (category === "Long Form Videos") {
    return {
      primaryService: {
        name: "Video Editing",
        href: "/video-editing",
        anchor: "commercial video editing",
      },
      relatedServices: [
        {
          name: "Branding",
          href: "/branding",
          anchor: "brand strategy & storytelling",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          anchor: "product UI/UX design",
        },
      ],
      relevantLocations: [
        {
          name: "Surat",
          href: "/surat",
          anchor: "commercial video in Surat",
        },
        {
          name: "Gujarat",
          href: "/gujarat",
          anchor: "video production in Gujarat",
        },
      ],
      relatedInsight:
        slug === "nexus-ai-product-reveal" || slug === "maruti-buildcon-construction-master"
          ? {
              title: "How Much Does a Custom Business Website Cost? A Practical Guide for Modern Brands",
              slug: "website-development-cost-guide-business",
            }
          : {
              title: "The Anatomy of High-Retention Video Editing: Why Sub-Second Hooks Dominate Reels & TikTok",
              slug: "short-form-video-editing-framework-viral-reels",
            },
    };
  }
  // Graphic Design
  return {
    primaryService: {
      name: "Graphic Design",
      href: "/graphic-design",
      anchor: "graphic design services",
    },
    relatedServices: [
      {
        name: "Logo Design",
        href: "/logo-design",
        anchor: "custom logo design",
      },
      {
        name: "Branding",
        href: "/branding",
        anchor: "brand identity systems",
      },
    ],
    relevantLocations: [
      {
        name: "Surat",
        href: "/surat",
        anchor: "graphic design services in Surat",
      },
      {
        name: "Ahmedabad",
        href: "/ahmedabad",
        anchor: "brand design in Ahmedabad",
      },
    ],
    relatedInsight:
      slug === "onirique-parfums-identity" ||
      slug === "nirva-resort-environmental-branding" ||
      slug === "crancho-fmcg-packaging" ||
      slug === "lumara-luxury-skincare" ||
      slug === "bright-minds-education-campaigns" ||
      slug === "ooh-billboards-commercial-print" ||
      slug === "vanguard-design-system" ||
      slug === "omni-global-campaign"
        ? {
            title: "Building a Cohesive Social Media Design System: Beyond Generic Canva Templates",
            slug: "social-media-design-systems-organic-brand-growth",
          }
        : {
            title: "Logo Design vs. Complete Brand Identity: What Growing Businesses Actually Need",
            slug: "logo-design-vs-complete-brand-identity-guide",
          },
  };
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      title: "Case Study Not Found | Lucie Creatives",
      description: "The requested creative case study could not be located.",
      pathname: `/work/${slug}`,
      noIndex: true,
    });
  }

  const cleanTitle = `${project.title} — ${project.client} | ${project.industry} Case Study | Lucie Creatives`;
  const cleanDescription = `${project.tagline} Explore how Lucie Creatives solved ${project.client}'s challenge in ${project.industry} with ${project.category.toLowerCase()} and delivered ${project.outcomeMetric} ${project.outcomeLabel}.`;

  const isVideo =
    project.category === "Short Form Videos" ||
    project.category === "Long Form Videos" ||
    Boolean(project.videoSrc);
  const videoId = extractYouTubeVideoId(project.videoSrc);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;

  return constructMetadata({
    title: cleanTitle,
    description: cleanDescription,
    pathname: `/work/${project.slug}`,
    ogTitle: `${project.title} — ${project.client} | Case Study`,
    ogDescription: project.brief,
    image: project.posterSrc,
    type: isVideo ? "video.other" : "article",
    videoUrl: project.videoSrc,
    playerUrl: embedUrl,
    twitterCard: isVideo ? "player" : "summary_large_image",
    keywords: [
      project.title,
      project.client,
      project.category,
      project.industry,
      ...project.deliverables,
      ...project.tools,
      "creative case study",
      "Lucie Creatives portfolio",
      "agency portfolio Gujarat",
    ],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const serviceCtx = getProjectServiceContext(project.category, project.slug);

  const clientCards = getClientPortfolioItems(project);
  const excludedIds = new Set(clientCards.map((c) => c.slug || c.id));
  const categoryCards = getRelatedCategoryProjects(project, excludedIds);

  // Schema.org Structured Data (CaseStudy / Article + Breadcrumbs)
  const caseStudySchema = getCaseStudySchema({
    headline: `${project.title} — ${project.client} Case Study`,
    description: project.brief,
    slug: `work/${project.slug}`,
    image: project.posterSrc,
    datePublished: `${project.year}-01-01`,
    category: project.category,
    client: project.client,
    industry: project.industry,
    tools: project.tools,
    deliverables: project.deliverables,
  });

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans">
        <Navbar />

        {/* 1. Header & Quick Metadata Matrix */}
        <header className="pt-24 sm:pt-28 pb-4 px-6 sm:px-12 max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              {
                label: project.category === "Graphic Design" ? "Graphic Design" : "Video Editing",
                href: project.category === "Graphic Design" ? "/graphic-design" : "/video-editing",
              },
              { label: project.title, href: `/work/${project.slug}` },
            ]}
            className="mb-5"
          />

          {/* Metadata Pill Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-line">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={serviceCtx.primaryService.href}
                className="px-3 py-1 rounded-control bg-brand-redLight text-brand-red border border-brand-red/20 text-xs font-black uppercase tracking-wider hover:bg-brand-red hover:text-white transition-colors"
                title={`View ${serviceCtx.primaryService.anchor}`}
              >
                {project.category}
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-slate-100 border border-line text-xs font-bold text-body">
                <Briefcase className="w-3.5 h-3.5 text-muted" />
                <span>{project.industry}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-slate-100 border border-line text-xs font-bold text-body">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                <span>{project.year}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-body">
              <Building2 className="w-3.5 h-3.5 text-muted" />
              <span>Client:</span>
              <span className="text-ink uppercase tracking-wide">
                {project.client}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1] mt-5 mb-3">
            {project.title}
          </h1>

          <p className="text-sm sm:text-lg font-medium text-body max-w-3xl leading-relaxed text-pretty">
            {project.tagline}
          </p>
        </header>

        {/* 2. Hero Media Showcase */}
        <section className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto mb-10 sm:mb-12" aria-label="Project visual showcase">
          {project.multiVideos && project.multiVideos.length > 0 ? (
            <VideoBentoGrid
              videos={project.multiVideos}
              clientName={project.client}
              projectTitle={project.title}
            />
          ) : (
            <div
              className={`relative mx-auto rounded-media overflow-hidden shadow-xl ${
                project.mediaType === "video" ? "bg-black" : "bg-white"
              } border border-line ${
                project.aspectRatio === "9/16"
                  ? "max-w-[360px] aspect-[9/16]"
                  : project.aspectRatio === "4/5"
                  ? "max-w-[580px] aspect-[4/5]"
                  : project.aspectRatio === "1/1"
                  ? "max-w-[640px] aspect-square"
                  : project.aspectRatio === "2/1"
                  ? "max-w-[1060px] aspect-[2/1]"
                  : "w-full aspect-video"
              }`}
            >
              {project.mediaType === "video" && project.videoSrc ? (
                extractYouTubeVideoId(project.videoSrc) ? (
                  <YouTubeEmbedPlayer
                    videoId={extractYouTubeVideoId(project.videoSrc) || undefined}
                    title={project.title}
                    posterThumbnail={project.posterSrc}
                    aspectRatio={project.aspectRatio === "9/16" ? "9/16" : "16/9"}
                    priority={true}
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={project.videoSrc}
                    poster={project.posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    aria-label={`${project.title} - ${project.category} case study showcase for ${project.client} in ${project.industry}`}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <>
                  {/* Ambient Palette Blur Layer */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                    <Image
                      src={project.posterSrc}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-cover blur-2xl scale-125"
                    />
                  </div>
                  {/* Main Sharp Uncropped Creative */}
                  <div className="relative w-full h-full p-2.5 sm:p-5 z-10 flex items-center justify-center">
                    <Image
                      src={project.posterSrc}
                      alt={`${project.title} - ${project.category} case study showcase for ${project.client} in ${project.industry}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* 3. Project Overview & Deliverables Scope */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12 space-y-8 sm:space-y-10">
          {/* Top Row: Executive Brief & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Project Overview */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" aria-hidden="true" />
                <span>Project Overview &amp; Context</span>
              </div>

              <p className="text-lg sm:text-2xl font-semibold text-ink leading-relaxed text-pretty">
                {project.brief}
              </p>
            </div>

            {/* Right: Technologies & Production Tooling Stack */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-lg bg-white border border-line">
                <div className="flex items-center gap-2 text-xs font-black text-muted uppercase tracking-wider mb-3">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Technologies &amp; Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-control bg-white border border-line text-xs font-black text-body shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Deliverables Scope: 3-Column Balanced Grid */}
          <div className="pt-6 sm:pt-8 border-t border-line/80">
            <h2 className="text-xs font-black text-muted uppercase tracking-wider mb-4">
              Services Provided &amp; Deliverables Scope
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {project.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-card bg-white/70 border border-line/80 text-xs sm:text-sm font-semibold text-ink hover:border-brand-red/30 hover:bg-brand-red-50 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. The Challenge & Strategic Approach */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Challenge */}
            <div className="p-8 sm:p-10 rounded-card bg-[#8B1A1A] text-white shadow-card border border-white/20 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-control bg-white/15 border border-white/20 text-red-100 text-xs font-black uppercase tracking-wider mb-5">
                  <Target className="w-3.5 h-3.5 text-red-200" />
                  <span>The Challenge</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                  Navigating the Strategic Obstacle
                </h2>
                <p className="text-red-100/90 text-sm sm:text-base leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/15 flex items-center gap-2 text-xs font-bold text-red-200">
                <span>Target Focus:</span>
                <span className="text-white font-black">{project.industry}</span>
              </div>
            </div>

            {/* Strategic Approach */}
            <div className="p-8 sm:p-10 rounded-card bg-white border border-line shadow-soft flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-control bg-brand-redLight text-brand-red text-xs font-black uppercase tracking-wider mb-5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Strategic Approach</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight mb-4">
                  Creative Methodology &amp; Execution
                </h2>
                <p className="text-body text-sm sm:text-base leading-relaxed font-normal">
                  {project.approach}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-line/80 flex items-center gap-2 text-xs font-bold text-muted">
                <span>Core Discipline:</span>
                <span className="text-brand-red font-black">{project.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Phased Design & Development Process */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-wider mb-2">
              <Workflow className="w-3.5 h-3.5" />
              <span>Production Lifecycle</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-text-primary">
              Design &amp; Execution Process
            </h2>
            <p className="text-muted text-xs sm:text-sm font-normal max-w-2xl mt-1">
              How Lucie Creatives guided {project.client} from diagnostic research to high-impact creative delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {project.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-card bg-white border border-line hover:border-brand-red/30 transition-colors relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-brand-red">
                      {step.phase}
                    </span>
                    <span className="text-xs font-mono font-bold text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-ink tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-body leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Craft & Execution Stills Bento Gallery */}
        <CaseStudyBentoGallery
          stills={project.processStills}
          projectTitle={project.title}
          client={project.client}
          category={project.category}
          industry={project.industry}
        />

        {/* Categorized Brand Identity & Design System Gallery */}
        {project.designGalleries && project.designGalleries.length > 0 && (
          <NirvaDesignGallery
            categories={project.designGalleries}
            clientName={project.client}
          />
        )}

        {/* Brand System Tokens, Palette & PDF Downloads */}
        {project.brandIdentitySystem && (
          <NirvaBrandSystem
            palette={project.brandIdentitySystem.palette}
            typography={project.brandIdentitySystem.typography}
            architecturalNotes={project.brandIdentitySystem.architecturalNotes}
            downloads={project.brandIdentitySystem.downloads}
            clientName={project.client}
          />
        )}

        {/* 7. Final Outcome & Verified Metric Narrative */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="p-6 sm:p-10 rounded-card bg-[#8B1A1A] text-white shadow-lg border border-white/20 relative overflow-hidden">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-black text-red-100 uppercase tracking-wider mb-2.5 px-3 py-1 rounded-control bg-white/15 border border-white/20 backdrop-blur-sm">
                <TrendingUp className="w-3.5 h-3.5 text-red-200" />
                <span>Final Commercial Outcome</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Measurable Impact for {project.client}
              </h2>
              <p className="text-sm sm:text-base text-red-100/90 leading-relaxed font-normal">
                {project.outcomeDetails}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Client Testimonial Quote */}
        {project.testimonial && (
          <section className="px-6 sm:px-12 max-w-5xl mx-auto mb-10 sm:mb-12">
            <div className="p-6 sm:p-10 rounded-card bg-white border border-line text-center relative overflow-hidden">
              <Quote className="w-8 h-8 text-brand-red/25 mx-auto mb-3" />
              <blockquote className="font-serif italic font-normal text-text-primary text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-4">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-xs font-black uppercase tracking-wider text-ink">
                {project.testimonial.author}
              </div>
              <div className="text-[11px] font-bold text-muted mt-0.5">
                {project.testimonial.role}
              </div>
            </div>
          </section>
        )}

        {/* 9. Related Services & Internal Cross-Link System */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="p-6 sm:p-8 rounded-card bg-white border border-line">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8b1a1a] block mb-1">
                  DISCIPLINE &amp; CAPABILITIES
                </span>
                <h3 className="text-lg sm:text-xl font-black text-ink uppercase tracking-tight">
                  Services used in this case study
                </h3>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={serviceCtx.primaryService.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-[#8b1a1a] text-white text-xs font-black hover:bg-[#8b1a1a]/90 transition-colors"
                >
                  <span>Explore {serviceCtx.primaryService.anchor}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-white border border-line text-ink text-xs font-black hover:border-[#8b1a1a]/40 hover:text-[#8b1a1a] transition-colors"
                >
                  <span>Start a Project</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {/* Primary Service */}
              <div className="p-5 rounded-card bg-white border border-line shadow-xs">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                  Core Discipline
                </span>
                <Link
                  href={serviceCtx.primaryService.href}
                  className="text-sm font-black text-ink hover:text-[#8b1a1a] transition-colors"
                >
                  {serviceCtx.primaryService.name}
                </Link>
                <p className="text-[11px] font-medium text-muted mt-1">
                  Enterprise delivery in {project.category.toLowerCase()}
                </p>
              </div>

              {/* Related Discipline 1 */}
              {serviceCtx.relatedServices[0] && (
                <div className="p-5 rounded-card bg-white border border-line shadow-xs">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                    Related Discipline
                  </span>
                  <Link
                    href={serviceCtx.relatedServices[0].href}
                    className="text-sm font-black text-ink hover:text-[#8b1a1a] transition-colors"
                  >
                    {serviceCtx.relatedServices[0].name}
                  </Link>
                  <p className="text-[11px] font-medium text-muted mt-1">
                    Cross-disciplinary strategy
                  </p>
                </div>
              )}

              {/* Related Insight */}
              <div className="p-5 rounded-card bg-white border border-line shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                    Strategy Insight
                  </span>
                  <Link
                    href={`/insights/${serviceCtx.relatedInsight.slug}`}
                    className="text-xs font-bold text-ink hover:text-[#8b1a1a] group block transition-colors"
                  >
                    <span className="line-clamp-2 leading-snug">{serviceCtx.relatedInsight.title}</span>
                  </Link>
                </div>
                <Link
                  href={`/insights/${serviceCtx.relatedInsight.slug}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8b1a1a] mt-2 group hover:text-[#8b1a1a] hover:opacity-80 transition-colors"
                >
                  <span>Read full analysis</span>
                  <ArrowRight className="w-3 h-3 transition-transform" />
                </Link>
              </div>

              {/* Regional Collaboration */}
              <div className="p-5 rounded-card bg-white border border-line shadow-xs">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1.5">
                  Regional Collaboration
                </span>
                <div className="space-y-1.5">
                  {serviceCtx.relevantLocations.map((loc, lIdx) => (
                    <Link
                      key={lIdx}
                      href={loc.href}
                      className="text-xs font-bold text-body hover:text-[#8b1a1a] flex items-center justify-between group transition-colors py-2 min-h-[36px]"
                    >
                      <span>• {loc.anchor}</span>
                      <ArrowRight className="w-3 h-3 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Discipline Strips */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <MoreFromClientStrip clientName={project.client} cards={clientCards} />
          <MoreInCategoryStrip categoryName={project.category} cards={categoryCards} />
        </section>

        {/* 10. Direct Project Inquiry CTA Banner */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="p-6 sm:p-10 rounded-card bg-[#8B1A1A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-200 bg-white/10 px-3 py-1 rounded-control inline-block mb-2.5">
                TAILORED SPRINT COLLABORATION
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1.5">
                Have a similar project brief in mind?
              </h2>
              <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
                Partner with Lucie Creatives to achieve measurable outcomes. Leadership review and scope estimate delivered within 24 hours.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-white text-[#8B1A1A] text-xs font-black uppercase tracking-wider hover:bg-red-50 transition-all"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href={project.category === "Graphic Design" ? "/graphic-design" : "/video-editing"}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-control bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black uppercase tracking-wider transition-colors"
              >
                <span>{project.category === "Graphic Design" ? "Browse Graphic Design" : "Browse Video Editing"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 11. Bottom Next Project Chained Banner */}
        <section className="w-full border-t border-line bg-[#8B1A1A] text-white">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block w-full py-12 sm:py-16 px-6 sm:px-12 hover:bg-[#8b1a1a]/40 transition-colors relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-100 bg-white/15 border border-white/20 px-3.5 py-1 rounded-control backdrop-blur-sm mb-2.5">
                  <span>NEXT CASE STUDY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>{nextProject.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>{nextProject.industry}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight group-hover:text-red-100 transition-colors">
                  {nextProject.title}
                </h2>
                <p className="text-sm sm:text-base font-normal text-red-100/90 mt-2 line-clamp-1">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-sm font-black uppercase tracking-wider text-white transition-transform">
                  Explore Case Study
                </span>
                <div className="w-14 h-14 rounded-control bg-white text-[#8b1a1a] flex items-center justify-center shadow-lg group-hover:bg-red-50 group-hover:scale-110 transition-all">
                  <ArrowRight className="w-6 h-6 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Slim Conversion Footer Bar */}
        <CaseStudyConversionFooter projectTitle={project.title} />

        <Footer />
      </main>
    </>
  );
}
