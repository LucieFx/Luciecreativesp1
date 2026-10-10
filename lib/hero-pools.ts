import { getShortFormProjects } from "./video-work-data";
import { getGraphicProjects } from "./graphic-work-data";
import { PORTFOLIO_ITEMS } from "@/components/home/FeaturedPortfolio";
import { DESIGN_ASSET_METAS, getDesignAssetMeta } from "./hero-assets-meta";

export interface HeroVideoItem {
  id: string;
  title: string;
  videoSrc: string;
  poster: string;
  href: string;
}

export interface HeroDesignItem {
  id: string;
  title: string;
  image: string;
  href: string;
  width: number;
  height: number;
  aspectRatio: number;
}

export interface HeroPools {
  videoPool: HeroVideoItem[];
  designPool: HeroDesignItem[];
}

/**
 * Checks if a graphic design candidate is disqualified by the eligibility filter:
 * - UI screenshots or mockups that are mostly empty
 * - Extreme panoramas or tall banners
 * - Broken or tiny images
 */
function isDisqualifiedDesign(title: string, img: string): boolean {
  const lowerTitle = title.toLowerCase();
  const lowerImg = img.toLowerCase();
  if (
    lowerTitle.includes("website mockup") ||
    lowerImg.includes("website-mockup") ||
    lowerTitle.includes("digital experience") ||
    lowerImg.includes("social-grid")
  ) {
    return true;
  }
  return false;
}

/**
 * Builds the dynamic content pools from the single source of truth:
 * - videoPool: all vertical (9:16) reels with valid videoSrc and poster
 * - designPool: all eligible graphic design items with verified natural width, height & ratio
 * 
 * Eligibility filters:
 * - ratio between 0.5 and 2.0
 * - width at least 800px
 * - not broken, not a duplicate, not an empty UI mockup
 */
export function getHeroPools(): HeroPools {
  const videoPool: HeroVideoItem[] = [];
  const designPool: HeroDesignItem[] = [];

  const seenVideoSrcs = new Set<string>();
  const seenDesignImages = new Set<string>();

  // 1. Ingest Video items from FeaturedPortfolio (9:16 reels only)
  for (const item of PORTFOLIO_ITEMS) {
    if (item.tab === "video" && item.videoPreview && item.thumbnail) {
      const vSrc = item.videoPreview.trim();
      const pSrc = item.thumbnail.trim();
      if (vSrc && pSrc && !seenVideoSrcs.has(vSrc)) {
        seenVideoSrcs.add(vSrc);
        videoPool.push({
          id: item.id,
          title: item.title,
          videoSrc: vSrc,
          poster: pSrc,
          href: item.href || "/video-editing",
        });
      }
    }
  }

  // 2. Ingest Video items from video-work-data projects & multiVideos
  const shortProjects = getShortFormProjects();
  for (const project of shortProjects) {
    const isVertical =
      !project.aspectRatio ||
      (project.aspectRatio as string) === "9/16" ||
      (project.aspectRatio as string) === "9:16";
    if (isVertical && project.videoSrc && project.posterSrc) {
      const vSrc = project.videoSrc.trim();
      const pSrc = project.posterSrc.trim();
      if (vSrc && pSrc && !seenVideoSrcs.has(vSrc)) {
        seenVideoSrcs.add(vSrc);
        videoPool.push({
          id: project.slug,
          title: project.title,
          videoSrc: vSrc,
          poster: pSrc,
          href: `/work/${project.slug}`,
        });
      }
    }

    if (project.multiVideos && Array.isArray(project.multiVideos)) {
      for (const mv of project.multiVideos) {
        const mvIsVertical =
          !mv.aspectRatio ||
          (mv.aspectRatio as string) === "9/16" ||
          (mv.aspectRatio as string) === "9:16";
        if (mvIsVertical && mv.videoSrc && mv.posterSrc) {
          const vSrc = mv.videoSrc.trim();
          const pSrc = mv.posterSrc.trim();
          if (vSrc && pSrc && !seenVideoSrcs.has(vSrc)) {
            seenVideoSrcs.add(vSrc);
            videoPool.push({
              id: mv.id,
              title: mv.title,
              videoSrc: vSrc,
              poster: pSrc,
              href: `/work/${project.slug}`,
            });
          }
        }
      }
    }
  }

  // Helper to add design if eligible
  const addDesignIfEligible = (
    id: string,
    title: string,
    image: string,
    href: string,
    fallbackW?: number,
    fallbackH?: number
  ) => {
    const img = image.trim();
    if (!img || seenDesignImages.has(img)) return;
    if (isDisqualifiedDesign(title, img)) return;

    // Resolve metadata
    let meta = getDesignAssetMeta(img);
    if (!meta && fallbackW && fallbackH) {
      meta = {
        width: fallbackW,
        height: fallbackH,
        aspectRatio: Number((fallbackW / fallbackH).toFixed(3)),
      };
    }

    if (!meta) return;

    // Strict eligibility check
    if (meta.width < 800) return;
    if (meta.aspectRatio < 0.5 || meta.aspectRatio > 2.0) return;

    seenDesignImages.add(img);
    designPool.push({
      id,
      title,
      image: img,
      href,
      width: meta.width,
      height: meta.height,
      aspectRatio: meta.aspectRatio,
    });
  };

  // 3. Ingest Graphic Design items from FeaturedPortfolio
  for (const item of PORTFOLIO_ITEMS) {
    if (item.tab === "design" && item.thumbnail) {
      addDesignIfEligible(
        item.id,
        item.title,
        item.thumbnail,
        item.href || "/graphic-design"
      );
    }
  }

  // 4. Ingest Graphic Design items from graphic-work-data
  const graphicProjects = getGraphicProjects();
  for (const gp of graphicProjects) {
    if (gp.posterSrc) {
      addDesignIfEligible(
        gp.slug,
        gp.title,
        gp.posterSrc,
        `/work/${gp.slug}`,
        gp.width,
        gp.height
      );
    }

    // Also include high-quality process stills if eligible
    if (gp.processStills && Array.isArray(gp.processStills)) {
      gp.processStills.forEach((ps, idx) => {
        if (ps.src && !ps.src.includes("website-mockup") && !ps.src.includes("color-palette")) {
          addDesignIfEligible(
            `${gp.slug}-still-${idx}`,
            ps.caption || `${gp.title} Still ${idx + 1}`,
            ps.src,
            `/work/${gp.slug}`
          );
        }
      });
    }
  }

  return { videoPool, designPool };
}

/**
 * Shuffle-bag picker that guarantees no immediate repeats across visitor sessions:
 * - Checks localStorage for IDs already seen.
 * - Picks randomly from remaining unshown items.
 * - Resets when all items are shown, ensuring the first pick of the new cycle is not the last one seen.
 * - Gracefully falls back to Math.random() if localStorage throws (e.g. incognito/private mode).
 */
export function pickFromShuffleBag<T extends { id: string }>(
  items: T[],
  storageKey: string
): T | null {
  if (!items || items.length === 0) return null;
  if (items.length === 1) return items[0];

  let seenIds: string[] = [];
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          seenIds = parsed;
        }
      }
    }
  } catch {
    seenIds = [];
  }

  const unshown = items.filter((item) => !seenIds.includes(item.id));

  let picked: T;
  let newSeenIds: string[];

  if (unshown.length > 0) {
    // Pick from items not yet shown in current cycle
    const randomIndex = Math.floor(Math.random() * unshown.length);
    picked = unshown[randomIndex];
    newSeenIds = [...seenIds, picked.id];
  } else {
    // All items shown: reset cycle, ensuring first pick is not the last shown
    const lastShownId = seenIds[seenIds.length - 1];
    const eligible = items.filter((item) => item.id !== lastShownId);
    const pool = eligible.length > 0 ? eligible : items;
    const randomIndex = Math.floor(Math.random() * pool.length);
    picked = pool[randomIndex];
    newSeenIds = [picked.id];
  }

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(storageKey, JSON.stringify(newSeenIds));
    }
  } catch {
    // Ignore private browsing quota / storage errors
  }

  return picked;
}
