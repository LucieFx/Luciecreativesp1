/**
 * YouTube Utility & Metadata Generator for Lucie Creatives
 * Supports oEmbed retrieval, ID extraction, thumbnail generation, and per-page Video SEO metadata.
 */

import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

export interface VideoPortfolioEntry {
  id?: string | number;
  title: string;
  category?: string;
  youtubeUrl?: string;
  videoTitle?: string;
  videoThumbnail?: string;
  coverImage?: { url: string };
  coverImageUrl?: string;
  customSeoDescription?: string;
  slug?: string;
}

/**
 * Extract 11-character YouTube video ID from various URL formats
 * (watch?v=, youtu.be/, shorts/, embed/)
 */
export function extractYouTubeVideoId(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Fetch video title & thumbnail from YouTube oEmbed endpoint without API key.
 * Endpoint: https://www.youtube.com/oembed?url={video_url}&format=json
 */
export async function fetchYouTubeOEmbed(videoUrl: string) {
  if (!videoUrl) return null;

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      videoUrl
    )}&format=json`;
    const res = await fetch(oembedUrl, {
      next: { revalidate: 86400 }, // Cache oEmbed response for 24h
    });

    if (!res.ok) return null;
    const json = await res.json();
    return {
      title: json.title as string,
      thumbnailUrl: json.thumbnail_url as string,
      authorName: json.author_name as string,
      html: json.html as string,
    };
  } catch (err) {
    console.warn("[fetchYouTubeOEmbed] Error fetching oEmbed:", err);
    return null;
  }
}

/**
 * Get direct YouTube thumbnail URL with quality fallback
 */
export function getYouTubeThumbnailUrl(
  urlOrId?: string | null,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" = "maxresdefault"
): string {
  if (!urlOrId) return "/images/work/vedam/vedam-exterior.webp";
  const videoId = urlOrId.length === 11 && !urlOrId.includes("/")
    ? urlOrId
    : extractYouTubeVideoId(urlOrId);

  if (!videoId) return urlOrId;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Auto-populate per-page meta tags from YouTube & CMS entry data:
 * <title>, og:title, og:image, og:video/og:video:url, and Twitter Card tags
 * (twitter:card=player, twitter:title, twitter:image).
 */
export function generateVideoSeoMetadata(
  entry: VideoPortfolioEntry,
  canonicalUrl?: string
): Metadata {
  const videoId = extractYouTubeVideoId(entry.youtubeUrl);
  const title = entry.videoTitle || entry.title;
  const description =
    entry.customSeoDescription && entry.customSeoDescription.trim().length > 0
      ? entry.customSeoDescription
      : SITE_CONFIG.description;

  const thumbnail =
    entry.videoThumbnail ||
    (videoId ? getYouTubeThumbnailUrl(videoId, "maxresdefault") : null) ||
    entry.coverImageUrl ||
    entry.coverImage?.url ||
    "https://luciecreatives.inhttps://res.cloudinary.com/oct7txvw/image/upload/v1789835250/lucie-creatives/logo/lucie-logo.png";

  const pageUrl = canonicalUrl || `https://luciecreatives.in/work/${entry.slug || "video-editing"}`;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;

  const baseMeta: Metadata = {
    title: `${title} | Lucie Creatives`,
    description,
    openGraph: {
      title: `${title} | Lucie Creatives`,
      description,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
      type: "video.other",
      ...(embedUrl
        ? {
            videos: [
              {
                url: embedUrl,
                width: 1280,
                height: 720,
                type: "text/html",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: videoId ? "player" : "summary_large_image",
      title: `${title} | Lucie Creatives`,
      description,
      images: [thumbnail],
      ...(videoId && embedUrl
        ? {
            players: [
              {
                playerUrl: embedUrl,
                streamUrl: entry.youtubeUrl || embedUrl,
                width: 1280,
                height: 720,
              },
            ],
          }
        : {}),
    },
  };

  return baseMeta;
}
