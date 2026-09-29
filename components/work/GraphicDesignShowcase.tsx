"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { WorkProject } from "@/lib/work-data";
import { Palette, ArrowUpRight, Sparkles } from "lucide-react";
import { WorkSectionHeading } from "./WorkSectionHeading";
import { MaskReveal, Marquee } from "@/components/motion";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SPRING_SOFT, EASE_OUT } from "@/lib/motion";

interface GraphicDesignShowcaseProps {
  projects: WorkProject[];
}

type SubcategoryFilter =
  | "All"
  | "Brand Identity & Packaging"
  | "OOH Print & Billboards"
  | "Haute Jewels & FMCG"
  | "Education, Social & Logos";

const SUB_FILTERS: SubcategoryFilter[] = [
  "All",
  "Brand Identity & Packaging",
  "OOH Print & Billboards",
  "Haute Jewels & FMCG",
  "Education, Social & Logos",
];

// Similar 1:1 creative posts for the constant linear slide effect
const SIMILAR_CREATIVES = [
  {
    title: "Explore Vietnam Direct Booking Ad",
    tag: "Travel Social",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835333/lucie-creatives/portfolio/graphic-design/social-campaigns/vietnam-campaign.webp",
  },
  {
    title: "Rath Yatra Cultural Festival Greeting",
    tag: "Festival Campaign",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835331/lucie-creatives/portfolio/graphic-design/social-campaigns/rathyatra-festival.webp",
  },
  {
    title: "Rhyme High Jewelry Earrings Editorial",
    tag: "Haute Joaillerie",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835323/lucie-creatives/portfolio/graphic-design/rhyme-jewels/earrings-editorial.webp",
  },
  {
    title: "UAE National Day Corporate Greeting",
    tag: "National Day",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835331/lucie-creatives/portfolio/graphic-design/social-campaigns/uae-national-day.webp",
  },
  {
    title: "Crispo Tangy Tomato Packaging Pouch",
    tag: "FMCG Retail",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835268/lucie-creatives/portfolio/graphic-design/crancho-snacks/crispo-poster.webp",
  },
  {
    title: "Kalpvriksh Gourmet Weekend Dining",
    tag: "Hospitality Creative",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835307/lucie-creatives/portfolio/graphic-design/nirva-club/restaurant-creative.webp",
  },
  {
    title: "Rhyme Daily Market Gold Rate System",
    tag: "Retail Grid",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835325/lucie-creatives/portfolio/graphic-design/rhyme-jewels/gold-rate-system.webp",
  },
  {
    title: "Bali Holiday Package Direct-Response",
    tag: "Travel Social",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835328/lucie-creatives/portfolio/graphic-design/social-campaigns/bali-creative.webp",
  },
  {
    title: "Sivanta Luxury Monogram & Identity",
    tag: "Vector Mark",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835278/lucie-creatives/portfolio/graphic-design/logo-systems/hero-sivanta-logo.webp",
  },
  {
    title: "Stylez Contemporary Apparel Monogram",
    tag: "Fashion Brand",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835280/lucie-creatives/portfolio/graphic-design/logo-systems/stylez-brand-symbol.webp",
  },
  {
    title: "Madhav Architectural Crest & Identity",
    tag: "Corporate Crest",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835279/lucie-creatives/portfolio/graphic-design/logo-systems/madhav-identity.webp",
  },
  {
    title: "Nandanvan 5 BHK Bungalows Campaign",
    tag: "Real Estate",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835288/lucie-creatives/portfolio/graphic-design/nandanvan-estates/bungalows-campaign.webp",
  },
  {
    title: "Crancho Peri Peri Crunchy Pouch",
    tag: "FMCG Pouch",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835267/lucie-creatives/portfolio/graphic-design/crancho-snacks/crancho-poster-1.webp",
  },
  {
    title: "Nirva Club Family Weekend Day Picnic",
    tag: "Resort Lifestyle",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835296/lucie-creatives/portfolio/graphic-design/nirva-club/day-picnic.webp",
  },
  {
    title: "Rhyme Solitaire Pendant Exhibition",
    tag: "Jewelry Artboard",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835327/lucie-creatives/portfolio/graphic-design/rhyme-jewels/pendant-still.webp",
  },
  {
    title: "Gourmet Hospitality Seasonal Menu Flyer",
    tag: "Commercial Print",
    src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835317/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/gourmet-hospitality-flyer.webp",
  },
];

function GraphicGridCard({
  project,
  categoryQuery,
  index,
  isOtherHovered,
  onHoverStart,
  onHoverEnd,
  reducedMotion,
}: {
  project: WorkProject;
  categoryQuery: string;
  index: number;
  isOtherHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  reducedMotion: boolean;
}) {
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    onHoverEnd();
  };

  const ratio =
    project.width && project.height
      ? project.width / project.height
      : null;
  // 4:5 is 0.8. Within ~12% is [0.704, 0.896]
  const isNearFourByFive =
    ratio !== null ? ratio >= 0.704 && ratio <= 0.896 : false;

  const col = index % 3;
  const row = Math.floor(index / 3);
  const waveDelay = (col + row) * 0.08;

  return (
    <motion.div
      layout
      key={project.slug}
      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.92, y: 20 }}
      animate={
        reducedMotion
          ? undefined
          : {
              opacity: isOtherHovered ? 0.7 : 1,
              scale: 1,
              y: 0,
            }
      }
      exit={
        reducedMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.85,
              transition: { duration: 0.2 },
            }
      }
      transition={{
        ...SPRING_SOFT,
        delay: waveDelay,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white border border-line hover:border-brand-red/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
        isOtherHovered ? "opacity-70" : "opacity-100"
      }`}
    >
      {/* 1. Image first: Uniform 4:5 Aspect Ratio Container with cursor-following glare & scale 1.05 */}
      <motion.div
        layoutId={`case-image-${project.slug}`}
        onMouseMove={handleMouseMove}
        className={`relative w-full aspect-[4/5] overflow-hidden ${
          isNearFourByFive
            ? "bg-[#FAFAFA]"
            : "p-4 sm:p-5 flex items-center justify-center"
        }`}
        style={
          !isNearFourByFive
            ? { backgroundColor: project.bgColor || "#F5F2EF" }
            : undefined
        }
      >
        {isNearFourByFive ? (
          <Image
            src={project.posterSrc}
            alt={`${project.title} - ${project.category} design project for ${project.client}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={project.posterSrc}
              alt={`${project.title} - ${project.category} design project for ${project.client}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}

        {/* Cursor-Following Glare */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-xs">
            {project.client}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-brand-red text-[10px] font-mono font-bold text-white shadow-xs">
            {project.outcomeMetric}
          </span>
        </div>

        {/* Desktop Hover Overlay: Reveals description, tags, and direct case link */}
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm p-6 flex flex-col justify-between opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none md:group-hover:pointer-events-auto">
          <div>
            <div className="text-[10px] font-mono font-bold text-brand-redLight uppercase tracking-wider mb-1.5">
              {project.industry} • {project.year}
            </div>
            <h4 className="text-white text-base font-bold leading-snug mb-2.5">
              {project.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
              {project.tagline || project.brief}
            </p>

            {/* Tags on hover */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.deliverables.slice(0, 3).map((del, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] text-white font-mono font-medium backdrop-blur-xs"
                >
                  {del}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono truncate mr-2">
              {project.outcomeLabel}
            </span>
            <Link
              href={`/work/${project.slug}${categoryQuery}`}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-brand-red hover:bg-[#6E1414] px-4 py-2 rounded-xl transition-all shadow-sm shrink-0"
            >
              <span>Explore Case</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 2. Below Image: title and category slide up 6px on hover */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-t border-line/60 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
        <div className="min-w-0">
          <div className="text-[11px] font-mono font-bold text-brand-red uppercase tracking-wider truncate mb-0.5">
            {project.industry}
          </div>
          <h3 className="text-sm sm:text-base font-black text-ink truncate group-hover:text-brand-red transition-colors leading-snug">
            {project.title}
          </h3>
        </div>
        <Link
          href={`/work/${project.slug}${categoryQuery}`}
          className="shrink-0 p-2 rounded-xl text-muted hover:text-brand-red hover:bg-brand-red-50 transition-colors"
          title="Explore Case"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export function GraphicDesignShowcase({ projects }: GraphicDesignShowcaseProps) {
  const searchParams = useSearchParams();

  const parseFilterFromQuery = (queryVal: string | null): SubcategoryFilter => {
    if (!queryVal) return "All";
    const found = SUB_FILTERS.find(
      (f) =>
        f.toLowerCase() === queryVal.toLowerCase() ||
        f.toLowerCase().replace(/[^a-z0-9]+/g, "-") === queryVal.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    );
    return found || "All";
  };

  const [activeSubFilter, setActiveSubFilter] = useState<SubcategoryFilter>(() => {
    return parseFilterFromQuery(searchParams?.get("category"));
  });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fromUrl = parseFilterFromQuery(searchParams?.get("category"));
    setActiveSubFilter(fromUrl);
    if (typeof window !== "undefined") {
      if (fromUrl !== "All") {
        sessionStorage.setItem("lucie_graphic_category", fromUrl);
      } else {
        sessionStorage.removeItem("lucie_graphic_category");
      }
    }
  }, [searchParams]);

  const handleFilterChange = (filter: SubcategoryFilter) => {
    setActiveSubFilter(filter);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (filter === "All") {
        url.searchParams.delete("category");
        sessionStorage.removeItem("lucie_graphic_category");
      } else {
        url.searchParams.set("category", filter);
        sessionStorage.setItem("lucie_graphic_category", filter);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const categoryQuery = activeSubFilter !== "All" ? `?category=${encodeURIComponent(activeSubFilter)}` : "";

  // Extract the project marked with flagship: true (or fallback to projects[0])
  const flagshipProject = useMemo(() => {
    return projects.find((p) => p.flagship) || projects[0];
  }, [projects]);

  // Projects for the grid (excluding whichever project is the flagship)
  const gridProjects = useMemo(() => {
    return projects.filter((p) => p.slug !== flagshipProject?.slug);
  }, [projects, flagshipProject]);

  const hoveredProject = useMemo(() => {
    if (!hoveredSlug) return null;
    return projects.find((p) => p.slug === hoveredSlug) || null;
  }, [projects, hoveredSlug]);

  const filteredProjects = useMemo(() => {
    if (activeSubFilter === "All") return gridProjects;
    if (activeSubFilter === "Brand Identity & Packaging") {
      return gridProjects.filter(
        (p) =>
          p.slug === "speczo-luxury-eyewear" ||
          p.slug === "onirique-parfums-identity" ||
          p.slug === "lumara-luxury-skincare"
      );
    }
    if (activeSubFilter === "OOH Print & Billboards") {
      return gridProjects.filter(
        (p) =>
          p.slug === "nirva-resort-environmental-branding" ||
          p.slug === "ooh-billboards-commercial-print" ||
          p.slug === "nandanvan-luxury-real-estate"
      );
    }
    if (activeSubFilter === "Haute Jewels & FMCG") {
      return gridProjects.filter(
        (p) =>
          p.slug === "rhyme-haute-joaillerie" ||
          p.slug === "crancho-fmcg-packaging"
      );
    }
    if (activeSubFilter === "Education, Social & Logos") {
      return gridProjects.filter(
        (p) =>
          p.slug === "bright-minds-education-campaigns" ||
          p.slug === "travel-festival-social-campaigns" ||
          p.slug === "monolithic-logo-systems"
      );
    }
    return gridProjects;
  }, [gridProjects, activeSubFilter]);

  // Doubled array for seamless infinite linear slide loop
  const linearSlideItems = useMemo(
    () => [...SIMILAR_CREATIVES, ...SIMILAR_CREATIVES],
    []
  );

  if (projects.length === 0) return null;

  return (
    <div className="relative w-full bg-white text-text-primary">
      {/* ========================================================================= */}
      {/* SECTION 2: Flagship Project */}
      {/* ========================================================================= */}
      {flagshipProject && (
        <section id="flagship-project" className="relative w-full py-12 sm:py-16 border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
            <div className="mb-6 flex items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-redLight text-brand-red border border-brand-red/20 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Case Study</span>
              </div>
            </div>

            <div
              key={`featured-${flagshipProject.slug}`}
              className="group relative bg-white border border-line/90 hover:border-brand-red/40 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Rounded panel with soft background & uncropped image at natural aspect ratio */}
              <motion.div
                initial={{ backgroundColor: "#F5F2EF" }}
                whileInView={{ backgroundColor: flagshipProject.bgColor || "#F5F2EF" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="lg:col-span-7 relative w-full rounded-[20px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-center border border-line/60 overflow-hidden"
              >
                {/* Brand Name Chip on Panel Padding (never covers the artwork) */}
                <div className="w-full flex justify-end mb-3 sm:mb-4 pointer-events-none z-10 shrink-0">
                  <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-xs">
                    {flagshipProject.client}
                  </span>
                </div>

                {/* Natural Aspect Ratio Uncropped Image with MaskReveal from left + slow float (y +-6px, 6s loop) */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
                  <MaskReveal direction="left" duration={0.8} className="w-full flex justify-center">
                    <motion.div
                      layoutId={`case-image-${flagshipProject.slug}`}
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { y: [-6, 6, -6] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut",
                      }}
                      className="w-full flex justify-center"
                    >
                      <Image
                        src={flagshipProject.posterSrc}
                        alt={`${flagshipProject.title} - Flagship design project for ${flagshipProject.client}`}
                        width={flagshipProject.width || 2400}
                        height={flagshipProject.height || 2400}
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        style={{
                          maxHeight: "min(70vh, 640px)",
                          maxWidth: "100%",
                          width: "auto",
                          height: "auto",
                          aspectRatio:
                            flagshipProject.width && flagshipProject.height
                              ? `${flagshipProject.width} / ${flagshipProject.height}`
                              : undefined,
                        }}
                        className="object-contain rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </motion.div>
                  </MaskReveal>
                </div>

                {/* Optional Bottom Caption */}
                {flagshipProject.caption && (
                  <div className="w-full mt-3 sm:mt-4 text-center text-xs font-mono font-semibold text-body shrink-0">
                    {flagshipProject.caption}
                  </div>
                )}
              </motion.div>

              {/* Right: Rich Editorial Content in requested order - staggers in */}
              <motion.div
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="lg:col-span-5 flex flex-col justify-center space-y-6 my-auto"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                  }}
                >
                  {/* 1. Category and Year (small mono label) */}
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-red uppercase tracking-wider mb-2">
                    <span>{flagshipProject.category}</span>
                    <span>•</span>
                    <span>{flagshipProject.year}</span>
                  </div>

                  {/* 2. Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-ink group-hover:text-brand-red transition-colors leading-tight">
                    {flagshipProject.title}
                  </h3>

                  {/* 3. Description clamped to 4 lines */}
                  <p className="mt-3 text-sm text-body font-medium leading-relaxed line-clamp-4">
                    {flagshipProject.brief}
                  </p>

                  {/* Documented Impact Box (renders ONLY if project data has real impact value) */}
                  {flagshipProject.impact && (
                    <div className="mt-5 p-4 rounded-2xl bg-brand-redLight/60 border border-brand-red/20 flex items-center gap-4">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-brand-red">
                        {flagshipProject.outcomeMetric || flagshipProject.impact}
                      </div>
                      <div className="text-xs font-bold text-ink leading-snug">
                        <div className="text-brand-red uppercase tracking-wider font-black text-[10px]">
                          Documented Impact
                        </div>
                        {flagshipProject.outcomeLabel || "Documented Outcome"}
                      </div>
                    </div>
                  )}

                  {/* 4. Deliverables chips (at most 4, with +N if more) */}
                  {flagshipProject.deliverables && flagshipProject.deliverables.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {flagshipProject.deliverables.slice(0, 4).map((del, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-line/50 border border-line text-xs text-ink font-mono font-semibold"
                        >
                          {del}
                        </span>
                      ))}
                      {flagshipProject.deliverables.length > 4 && (
                        <span className="px-2.5 py-1 rounded-lg bg-line/50 border border-line text-xs text-body font-mono font-semibold">
                          +{flagshipProject.deliverables.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* 5. Bottom area: Optional Quote + CTA Button */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                  }}
                  className="pt-5 border-t border-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {flagshipProject.quote ? (
                    <p className="text-xs text-muted italic max-w-xs line-clamp-2">
                      &ldquo;{flagshipProject.quote}&rdquo;
                    </p>
                  ) : (
                    <div />
                  )}
                  <Link
                    href={`/work/${flagshipProject.slug}${categoryQuery}`}
                    className="inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-brand-red hover:bg-[#6E1414] px-6 py-3 rounded-xl transition-all shadow-md group/btn shrink-0"
                  >
                    <span>Explore Flagship Case</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: The Project Grid with Category Filters */}
      {/* Fixes: uniform 4:5 image ratio, image first, title & category below, */}
      {/* description & tags on hover desktop, 3 cols desktop / 2 tablet / 1 mobile */}
      {/* ========================================================================= */}
      <section
        id="graphic-design-grid"
        className="relative w-full py-12 sm:py-16 border-b border-line select-none overflow-hidden"
        style={{
          backgroundColor: hoveredProject?.bgColor ? hoveredProject.bgColor : "#FAFAF9",
          transition: "background-color 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
          <WorkSectionHeading
            badgeIcon={Palette}
            badgeText="Visual Architecture & Identity"
            primaryWord="Design"
            accentWord="Portfolio"
            description="Architectural packaging, 3D bottle CGI, large-format OOH billboards, high-retention travel campaigns, and scalable logo suites."
            actionSlot={
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {SUB_FILTERS.map((filter) => {
                  const isActive = activeSubFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? "bg-ink text-white border-ink shadow-xs"
                          : "bg-white hover:bg-line/60 text-body border-line"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            }
          />

          {/* Responsive 3 columns desktop, 2 tablet, 1 mobile with AnimatePresence layout animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <GraphicGridCard
                  key={project.slug}
                  project={project}
                  categoryQuery={categoryQuery}
                  index={idx}
                  isOtherHovered={hoveredSlug !== null && hoveredSlug !== project.slug}
                  onHoverStart={() => setHoveredSlug(project.slug)}
                  onHoverEnd={() => setHoveredSlug(null)}
                  reducedMotion={Boolean(shouldReduceMotion)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: The "Similar campaign & social feed stream" strip */}
      {/* ========================================================================= */}
      <section id="similar-creatives-stream" className="relative w-full py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#7A1F2B] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Continuous Stream • 1:1 Creative Suite</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-ink uppercase tracking-tight">
                Similar Campaign &amp; Social Feed Stream
              </h3>
              <p className="text-xs sm:text-sm text-body font-medium mt-1">
                Constant linear slide of 1:1 omnichannel campaign creatives, festive posts, and brand symbols.
              </p>
            </div>
            <div className="text-[11px] font-mono text-muted font-semibold hidden md:block">
              CONSTANT LINEAR SLIDE • 1:1 RATIO • UNTOUCHED PREPRESS
            </div>
          </div>

          {/* Marquee Track with Linear Motion that pauses on hover */}
          <div className="relative w-full overflow-hidden">
            {/* Left and Right Edge Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

            <Marquee speed={35} pauseOnHover={true} gapClassName="gap-4 sm:gap-5">
              {SIMILAR_CREATIVES.map((post, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-52 sm:w-60 bg-white rounded-2xl border border-line p-2.5 shadow-xs select-none"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5F2EF] p-1.5 flex items-center justify-center">
                    <Image
                      src={post.src}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 208px, 240px"
                      loading="lazy"
                      className="object-contain drop-shadow-xs"
                    />
                  </div>
                  <div className="mt-2 px-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-muted uppercase">
                      <span>{post.tag}</span>
                      <span className="text-[#7A1F2B] font-bold">1:1</span>
                    </div>
                    <div className="text-xs font-black text-ink truncate mt-0.5">
                      {post.title}
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </div>
  );
}
