import { WORK_PROJECTS, WorkProject, getAllProjects, getProjectBySlug } from "./work-data";
import { GRAPHIC_DESIGN_PROJECTS } from "./graphic-work-data";
import { VIDEO_PROJECTS } from "./video-work-data";
import { CLIENT_VIDEOS, ClientVideoItem } from "./client-videos-data";

export interface CrossPortfolioCard {
  id: string;
  slug?: string;
  title: string;
  thumbnail: string;
  type: "Design" | "Reel" | "Film";
  href: string;
  client: string;
}

/**
 * Normalizes client/brand names into a canonical clientId.
 * e.g., "Nirva Club & Resort" and "Nirva Luxury Resort" -> "nirva".
 * Returns empty string if the item is an umbrella/multi-brand compilation.
 */
export function normalizeClientId(client?: string): string {
  if (!client) return "";
  const lower = client.toLowerCase().trim();

  // Multi-brand / composite collections that cannot be attributed to a single client
  if (
    lower.includes("sivanta, stylez") ||
    lower.includes("sivaanta, stylzzy") ||
    lower.includes("oasis international & commercial") ||
    lower.includes("bright school, ideal academy") ||
    lower.includes("creator authority suite")
  ) {
    return "";
  }

  if (lower.includes("nirva")) return "nirva";
  if (lower.includes("nandanvan")) return "nandanvan";
  if (lower.includes("vedam")) return "vedam";
  if (lower.includes("maruti")) return "maruti-buildcon";
  if (lower.includes("leaders diary")) return "leaders-diary";
  if (lower.includes("ambica")) return "ambica-interior";
  if (lower.includes("carnival")) return "carnival-clothing";
  if (lower.includes("speczo")) return "speczo";
  if (lower.includes("onirique")) return "onirique";
  if (lower.includes("rhyme")) return "rhyme";
  if (lower.includes("crancho")) return "crancho";
  if (lower.includes("lumara")) return "lumara";
  if (
    lower.includes("bright school") ||
    lower.includes("bright minds") ||
    lower.includes("ideal academic")
  ) {
    return "bright-minds";
  }
  if (lower.includes("mitraa")) return "mitraa";
  if (lower.includes("prerna ply")) return "prerna-ply";
  if (lower.includes("abhimanyu")) return "abhimanyu-academy";
  if (lower.includes("karm digital")) return "the-karm-digital";

  // Fallback slugify
  return lower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Gathers up to 4 items from the same client across Graphic Design, Video Reels, and Long-form Films.
 * Excludes the current project.
 */
export function getClientPortfolioItems(currentProject: WorkProject): CrossPortfolioCard[] {
  const targetClientId = currentProject.clientId || normalizeClientId(currentProject.client);
  if (!targetClientId) return [];

  const cards: CrossPortfolioCard[] = [];
  const seenIds = new Set<string>();
  seenIds.add(currentProject.slug);

  // 1. Graphic Design Projects
  for (const gp of GRAPHIC_DESIGN_PROJECTS) {
    if (gp.slug === currentProject.slug || seenIds.has(gp.slug)) continue;
    const cid = gp.clientId || normalizeClientId(gp.client);
    if (cid === targetClientId) {
      cards.push({
        id: gp.slug,
        slug: gp.slug,
        title: gp.title,
        thumbnail: gp.posterSrc,
        type: "Design",
        href: `/work/${gp.slug}`,
        client: gp.client,
      });
      seenIds.add(gp.slug);
    }
  }

  // 2. Video Case Study Projects
  for (const vp of VIDEO_PROJECTS) {
    if (vp.slug === currentProject.slug || seenIds.has(vp.slug)) continue;
    const cid = vp.clientId || normalizeClientId(vp.client);
    if (cid === targetClientId) {
      const type: "Reel" | "Film" = vp.category === "Long Form Videos" ? "Film" : "Reel";
      cards.push({
        id: vp.slug,
        slug: vp.slug,
        title: vp.title,
        thumbnail: vp.posterSrc,
        type,
        href: `/work/${vp.slug}`,
        client: vp.client,
      });
      seenIds.add(vp.slug);
    }
  }

  // 3. Client Video Reels & Films (standalone production items)
  for (const cv of CLIENT_VIDEOS) {
    const cid = cv.clientId || normalizeClientId(cv.client);
    if (cid === targetClientId) {
      const normalizedTitle = cv.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const isAlreadyCovered = cards.some(
        (c) => c.title.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedTitle
      );
      if (isAlreadyCovered) continue;

      const isFilm =
        cv.aspectRatio === "16:9" ||
        cv.categoryBadge?.toLowerCase().includes("cinema") ||
        cv.categoryBadge?.toLowerCase().includes("commercial");
      const type: "Reel" | "Film" = isFilm ? "Film" : "Reel";
      const href = isFilm ? "/video-editing#long-form-videos" : "/video-editing#short-form-videos";

      cards.push({
        id: cv.id,
        title: cv.title,
        thumbnail: cv.posterSrc || currentProject.posterSrc,
        type,
        href,
        client: cv.client,
      });
    }
  }

  return cards.slice(0, 4);
}

/**
 * Returns up to 3 related projects in the same category (excluding current and client-strip items).
 * If fewer than 3 exist in category, fills with other recent projects.
 */
export function getRelatedCategoryProjects(
  currentProject: WorkProject,
  excludedSlugsOrIds: Set<string>
): CrossPortfolioCard[] {
  const result: CrossPortfolioCard[] = [];
  const excluded = new Set(excludedSlugsOrIds);
  excluded.add(currentProject.slug);

  const getCardType = (category: string): "Design" | "Reel" | "Film" => {
    if (category === "Graphic Design") return "Design";
    if (category === "Long Form Videos") return "Film";
    return "Reel";
  };

  // 1. Same category
  const sameCategory = WORK_PROJECTS.filter(
    (p) => p.slug !== currentProject.slug && p.category === currentProject.category && !excluded.has(p.slug)
  );

  for (const p of sameCategory) {
    if (result.length >= 3) break;
    result.push({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      thumbnail: p.posterSrc,
      type: getCardType(p.category),
      href: `/work/${p.slug}`,
      client: p.client,
    });
    excluded.add(p.slug);
  }

  // 2. Fill with other recent projects if < 3
  if (result.length < 3) {
    const others = WORK_PROJECTS.filter(
      (p) => p.slug !== currentProject.slug && !excluded.has(p.slug)
    );
    for (const p of others) {
      if (result.length >= 3) break;
      result.push({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        thumbnail: p.posterSrc,
        type: getCardType(p.category),
        href: `/work/${p.slug}`,
        client: p.client,
      });
      excluded.add(p.slug);
    }
  }

  return result.slice(0, 3);
}

/**
 * Returns the ordered project sequence for Prev/Next navigation respecting category filters.
 */
export function getNavigationProjectContext(
  currentSlug: string,
  categoryFilter?: string | null
): { prevProject: WorkProject; nextProject: WorkProject } {
  const current = getProjectBySlug(currentSlug) || WORK_PROJECTS[0];

  let list: WorkProject[] = WORK_PROJECTS;

  if (current.category === "Graphic Design") {
    const flagship = GRAPHIC_DESIGN_PROJECTS.find((p) => p.flagship) || GRAPHIC_DESIGN_PROJECTS[0];
    const grid = GRAPHIC_DESIGN_PROJECTS.filter((p) => p.slug !== flagship.slug);

    if (!categoryFilter || categoryFilter === "All") {
      list = [flagship, ...grid];
    } else if (categoryFilter === "Brand Identity & Packaging") {
      list = [flagship, ...grid].filter(
        (p) =>
          p.slug === "speczo-luxury-eyewear" ||
          p.slug === "onirique-parfums-identity" ||
          p.slug === "lumara-luxury-skincare" ||
          p.slug === "monolithic-logo-systems"
      );
    } else if (categoryFilter === "Hospitality & Real Estate") {
      list = grid.filter(
        (p) =>
          p.slug === "nirva-resort-environmental-branding" ||
          p.slug === "nandanvan-luxury-real-estate"
      );
    } else if (categoryFilter === "Retail, Jewelry & FMCG") {
      list = grid.filter(
        (p) =>
          p.slug === "rhyme-haute-joaillerie" ||
          p.slug === "crancho-fmcg-packaging"
      );
    } else if (categoryFilter === "Education & Social Campaigns") {
      list = grid.filter(
        (p) =>
          p.slug === "bright-minds-education-campaigns" ||
          p.slug === "travel-festival-social-campaigns"
      );
    }

    if (!list.some((p) => p.slug === currentSlug)) {
      list = [flagship, ...grid];
    }
  } else if (current.category === "Short Form Videos") {
    list = VIDEO_PROJECTS.filter((p) => p.category === "Short Form Videos");
  } else if (current.category === "Long Form Videos") {
    list = VIDEO_PROJECTS.filter((p) => p.category === "Long Form Videos");
  }

  if (list.length === 0) {
    list = WORK_PROJECTS;
  }

  const currentIndex = list.findIndex(
    (p) => p.slug === currentSlug || p.aliases?.includes(currentSlug)
  );

  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const prevIndex = (activeIndex - 1 + list.length) % list.length;
  const nextIndex = (activeIndex + 1) % list.length;

  return {
    prevProject: list[prevIndex],
    nextProject: list[nextIndex],
  };
}
