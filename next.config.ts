import type { NextConfig } from "next";
import path from "path";
import { checkPlaceholderTestimonials } from "./lib/testimonials";

// Build-time audit check for placeholder testimonials
checkPlaceholderTestimonials();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  devIndicators: false,
  outputFileTracingRoot: path.join(__dirname),

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    devtoolSegmentExplorer: false,
    optimizePackageImports: ["framer-motion", "lucide-react", "gsap"],
  },
  webpack: (config) => {
    return config;
  },
  transpilePackages: ["lucide-react", "gsap"],
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.ts",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
      },
      {
        protocol: "https",
        hostname: "cdn.luciecreatives.in",
      },
      {
        protocol: "https",
        hostname: "luciecreatives.in",
      },
      // YouTube Thumbnails
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      // Cloudinary Assets
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://www.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://assets.mixkit.co https://img.youtube.com https://i.ytimg.com https://cdn.luciecreatives.in https://luciecreatives.in",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://res.cloudinary.com https://luciecreatives.in https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "media-src 'self' blob: https://res.cloudinary.com https://assets.mixkit.co",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://player.vimeo.com https://vimeo.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me https://api.whatsapp.com",
      "frame-ancestors 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspDirectives,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 1. Legacy Service Hub & Portfolio
      {
        source: "/work",
        destination: "/video-editing",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/video-editing",
        permanent: true,
      },
      // 2. Legacy Individual Services to Flat Canonical Services
      {
        source: "/services/web-development",
        destination: "/web-development",
        permanent: true,
      },
      {
        source: "/services/video-editing",
        destination: "/video-editing",
        permanent: true,
      },
      {
        source: "/services/graphic-designing",
        destination: "/graphic-design",
        permanent: true,
      },
      {
        source: "/services/graphic-design",
        destination: "/graphic-design",
        permanent: true,
      },
      {
        source: "/services/branding-identity",
        destination: "/branding",
        permanent: true,
      },
      {
        source: "/services/branding",
        destination: "/branding",
        permanent: true,
      },
      {
        source: "/services/social-media-marketing",
        destination: "/social-media-design",
        permanent: true,
      },
      {
        source: "/services/social-media-design",
        destination: "/social-media-design",
        permanent: true,
      },
      {
        source: "/services/app-development",
        destination: "/web-development",
        permanent: true,
      },
      {
        source: "/app-development",
        destination: "/web-development",
        permanent: true,
      },
      {
        source: "/mobile-app-development",
        destination: "/web-development",
        permanent: true,
      },
      {
        source: "/mobile-development",
        destination: "/web-development",
        permanent: true,
      },
      {
        source: "/services/influencer-marketing",
        destination: "/social-media-design",
        permanent: true,
      },
      {
        source: "/services/ui-ux-design",
        destination: "/ui-ux-design",
        permanent: true,
      },
      {
        source: "/services/logo-design",
        destination: "/logo-design",
        permanent: true,
      },
      // 3. Legacy Portfolio & Pricing
      {
        source: "/projects",
        destination: "/video-editing",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
