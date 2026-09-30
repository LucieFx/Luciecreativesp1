import cloudinaryMapData from "@/cloudinary-map.json";

const cloudinaryMap = cloudinaryMapData as Record<string, string>;

/**
 * Cloudinary custom loader for Next.js Image optimization
 * Automatically adds:
 * - f_auto (format negotiation: AVIF/WebP)
 * - q_auto (intelligent quality compression)
 * - w_{width} (responsive resizing per Next.js device/image sizes)
 * Prevents double-optimization.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If mapped in cloudinary-map.json, resolve to canonical Cloudinary URL
  if (src.startsWith("/") && cloudinaryMap[src]) {
    src = cloudinaryMap[src];
  }

  // Unsplash responsive resizing
  if (src.includes("images.unsplash.com")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}&q=${quality || 80}&auto=format`;
  }

  // YouTube thumbnail optimization: convert to modern WebP format
  if (src.includes("img.youtube.com/vi/") || src.includes("i.ytimg.com/vi/")) {
    return src
      .replace("img.youtube.com/vi/", "i.ytimg.com/vi_webp/")
      .replace("i.ytimg.com/vi/", "i.ytimg.com/vi_webp/")
      .replace(".jpg", ".webp");
  }

  // If external non-Cloudinary URL, keep untouched
  if (src.startsWith("http") && !src.includes("res.cloudinary.com")) {
    return src;
  }

  // If local SVG, favicon, local hardware mockup, or local project screenshots, keep untouched
  if (
    src.endsWith(".svg") ||
    src.includes("favicon") ||
    src.includes("apple-touch-icon") ||
    src.includes("iphone-frame") ||
    src.includes("iphone-screen-mask") ||
    src.startsWith("/projects/")
  ) {
    return src;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "oct7txvw";
  const qStr = quality ? `q_${quality}` : "q_auto";
  const wStr = `w_${width}`;
  const transforms = `f_auto,${qStr},${wStr}`;

  // If already a full Cloudinary URL
  if (src.startsWith("https://res.cloudinary.com/")) {
    const uploadIdx = src.indexOf("/upload/");
    if (uploadIdx !== -1) {
      const before = src.slice(0, uploadIdx + 8);
      const after = src.slice(uploadIdx + 8);

      // Cleanly extract version and public_id if version exists (e.g. v1789835244/...)
      const versionMatch = after.match(/v\d+\/.+/);
      if (versionMatch) {
        return `${before}${transforms}/${versionMatch[0]}`;
      }

      // If no version string, remove any leading transform segment before public_id
      const cleanAfter = after.replace(/^(f_auto|q_[^/]+|w_\d+|c_[^/]+)[^/]*\//, "");
      return `${before}${transforms}/${cleanAfter}`;
    }
    return src;
  }

  // If relative path / public_id
  const cleanPath = src.replace(/^\//, "");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${cleanPath}`;
}
