import type { Metadata } from "next";

export const PRODUCTION_URL = "https://luciecreatives.in";
export const DEFAULT_OG_IMAGE = "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835244/lucie-creatives/logo/lucie-creatives-og.png";
export const SQUARE_OG_IMAGE = "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835243/lucie-creatives/logo/lucie-creatives-og-square.png";
export const WORK_OG_IMAGE = "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835255/lucie-creatives/og/work-cover.jpg";

export interface MetadataOptions {
  title: string;
  description: string;
  pathname: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article" | "video.other";
  keywords?: string[] | string;
  videoUrl?: string;
  playerUrl?: string;
  playerWidth?: number;
  playerHeight?: number;
  twitterCard?: "summary" | "summary_large_image" | "player" | "app";
}

/**
 * Reusable metadata constructor for Next.js App Router pages.
 * Ensures consistent canonical URLs, Open Graph, Twitter cards, and robots directives.
 */
export function constructMetadata({
  title,
  description,
  pathname,
  ogTitle,
  ogDescription,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
  keywords,
  videoUrl,
  playerUrl,
  playerWidth,
  playerHeight,
  twitterCard,
}: MetadataOptions): Metadata {
  const cleanPath = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalUrl = `${PRODUCTION_URL}${cleanPath}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${PRODUCTION_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const fullVideoUrl = videoUrl
    ? videoUrl.startsWith("http")
      ? videoUrl
      : `${PRODUCTION_URL}${videoUrl.startsWith("/") ? videoUrl : `/${videoUrl}`}`
    : undefined;

  const fullPlayerUrl = playerUrl
    ? playerUrl.startsWith("http")
      ? playerUrl
      : `${PRODUCTION_URL}${playerUrl.startsWith("/") ? playerUrl : `/${playerUrl}`}`
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonicalUrl,
      siteName: "Lucie Creatives",
      locale: "en_US",
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
        ...(image === DEFAULT_OG_IMAGE
          ? [
              {
                url: SQUARE_OG_IMAGE.startsWith("http") ? SQUARE_OG_IMAGE : `${PRODUCTION_URL}${SQUARE_OG_IMAGE}`,
                width: 1024,
                height: 1024,
                alt: `${title} Full Logo`,
              },
            ]
          : []),
      ],
      ...(fullVideoUrl
        ? {
            videos: [
              {
                url: fullVideoUrl,
                width: playerWidth || 1280,
                height: playerHeight || 720,
                type: "text/html",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: twitterCard || (fullPlayerUrl || fullVideoUrl ? "player" : "summary_large_image"),
      title: ogTitle || title,
      description: ogDescription || description,
      images: [fullImageUrl],
      creator: "@luciecreatives",
      ...(fullPlayerUrl || fullVideoUrl
        ? {
            players: [
              {
                playerUrl: fullPlayerUrl || fullVideoUrl!,
                streamUrl: fullVideoUrl || fullPlayerUrl,
                width: playerWidth || 1280,
                height: playerHeight || 720,
              },
            ],
          }
        : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Page-by-page metadata definitions for all core indexable routes.
 * Every title and description is distinct, brand-aligned, and strictly devoid of spammy keyword blocks.
 */
export const SITE_METADATA_MAP: Record<string, MetadataOptions> = {
  "/": {
    pathname: "/",
    title: "Video Editing & Web Development Agency | Lucie Creatives",
    description:
      "Lucie Creatives is a premier video editing and web development agency serving ambitious brands worldwide with cinematic video editing, high-performance web development, graphic design, and branding.",
    ogTitle: "Video Editing & Web Development Agency | Lucie Creatives",
    ogDescription:
      "Premier video editing and web development agency serving global brands worldwide. Viral short-form video editing, cinema commercials, and sub-second Next.js web applications.",
    image: DEFAULT_OG_IMAGE,
    keywords: [
      "video editing agency",
      "web development agency",
      "video editing and web development agency",
      "creative agency gujarat",
      "global digital agency",
      "video editing agency gujarat",
      "web development agency gujarat",
      "graphic design agency gujarat",
      "international branding agency",
      "Lucie Creatives",
    ],
  },
  "/global": {
    pathname: "/global",
    title: "Global Creative Digital Agency | Web Development, Design & Video | Lucie Creatives",
    description:
      "Lucie Creatives is an international creative digital agency serving ambitious enterprises and high-growth brands across the US, UK, Europe, UAE, Australia, and worldwide with high-performance web development, cinema video editing, graphic design, and brand systems.",
    ogTitle: "Global Creative Digital Agency | Serving Worldwide | Lucie Creatives",
    ogDescription:
      "Full-service global creative digital agency delivering sub-second Next.js web applications, viral short-form video editing, and monolithic brand systems for ambitious companies worldwide.",
    image: DEFAULT_OG_IMAGE,
    keywords: [
      "global creative digital agency",
      "international web development agency",
      "global video editing agency",
      "worldwide branding agency",
      "remote creative agency",
      "digital agency for US UK brands",
      "global digital studio",
      "Lucie Creatives global",
    ],
  },
  "/web-development": {
    pathname: "/web-development",
    title: "Website Development & Custom Website Design Services | Lucie Creatives",
    description:
      "Lucie Creatives provides custom website development, responsive website design, e-commerce websites, and SEO-friendly landing pages built with Next.js and React.",
    ogTitle: "Website Development & Custom Website Design Services | Lucie Creatives",
    ogDescription:
      "Full-stack website development and bespoke website design engineered for business growth. Fast, responsive websites and high-converting e-commerce platforms.",
    image: DEFAULT_OG_IMAGE,
  },
  "/graphic-design": {
    pathname: "/graphic-design",
    title: "Graphic Design Services: Branding, Packaging & OOH | Lucie Creatives",
    description:
      "Brand identity, packaging, social creatives and billboard design for growing brands. Explore our work with Lucie Creatives.",
    ogTitle: "Graphic Design Services: Branding, Packaging & OOH | Lucie Creatives",
    ogDescription:
      "Brand identity, packaging, social creatives and billboard design for growing brands. Explore our work with Lucie Creatives.",
    image: WORK_OG_IMAGE,
  },
  "/video-editing": {
    pathname: "/video-editing",
    title: "Video Editing Services: Reels & Commercials | Lucie Creatives",
    description:
      "Short-form reels and cinematic commercial video editing for brands. See our work and start your project with Lucie Creatives.",
    ogTitle: "Video Editing Services: Reels & Commercials | Lucie Creatives",
    ogDescription:
      "Short-form reels and cinematic commercial video editing for brands. See our work and start your project with Lucie Creatives.",
    image: WORK_OG_IMAGE,
  },
  "/logo-design": {
    pathname: "/logo-design",
    title: "Custom Logo Design & Business Logo Identity Services | Lucie Creatives",
    description:
      "Bespoke logo design and corporate identity services by Lucie Creatives. Vector logomarks, typography lockups, brand style guides, and complete logo packages.",
    ogTitle: "Custom Logo Design & Business Logo Identity Services | Lucie Creatives",
    ogDescription:
      "Memorable, custom logo design services for modern brands. Distinctive vector logomarks, responsive logos, typography systems, and comprehensive brand guidelines.",
    image: DEFAULT_OG_IMAGE,
  },
  "/branding": {
    pathname: "/branding",
    title: "Brand Identity & Strategic Branding Agency | Lucie Creatives",
    description:
      "Lucie Creatives crafts full-scale brand identity systems, brand positioning strategies, visual language, packaging, and comprehensive brand guideline books.",
    ogTitle: "Brand Identity & Strategic Branding Agency | Lucie Creatives",
    ogDescription:
      "Comprehensive brand identity design and strategic brand positioning. Complete visual identity systems, typography hierarchies, and packaging guidelines.",
    image: DEFAULT_OG_IMAGE,
  },
  "/ui-ux-design": {
    pathname: "/ui-ux-design",
    title: "UI/UX Design Services | Figma Systems & Web App Interfaces | Lucie Creatives",
    description:
      "User-centric UI/UX design services. Lucie Creatives builds intuitive web app interfaces, responsive SaaS UX, wireframes, design systems, and Figma prototypes.",
    ogTitle: "UI/UX Design Services | Figma Systems & Web App Interfaces | Lucie Creatives",
    ogDescription:
      "Modern UI/UX design services. We craft intuitive web platform interfaces, responsive design systems, interactive prototypes, and high-retention user flows.",
    image: DEFAULT_OG_IMAGE,
  },
  "/social-media-design": {
    pathname: "/social-media-design",
    title: "Social Media Design Services | High-Retention Carousels & Paid Ads | Lucie Creatives",
    description:
      "Stop the scroll with high-converting social media design by Lucie Creatives. Instagram carousel templates, paid ad creative sets, story graphics, and brand feed aesthetics.",
    ogTitle: "Social Media Design Services | High-Retention Carousels & Paid Ads | Lucie Creatives",
    ogDescription:
      "Conversion-focused social media design. Instagram carousels, paid advertising creative sets, LinkedIn infographics, and cohesive aesthetic feed systems.",
    image: DEFAULT_OG_IMAGE,
  },
  "/gujarat": {
    pathname: "/gujarat",
    title: "Video Editing & Web Development Agency Gujarat | Lucie Creatives",
    description:
      "Lucie Creatives is a premier creative digital agency serving businesses across Gujarat with video editing, web development, graphic design, branding, and logo design.",
    ogTitle: "Video Editing & Web Development Agency Gujarat | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving enterprises and growing brands throughout Gujarat. Cinematic video editing, high-performance web development, and brand identities.",
    image: DEFAULT_OG_IMAGE,
  },
  "/ahmedabad": {
    pathname: "/ahmedabad",
    title: "Video Editing & Web Development Agency Ahmedabad | Lucie Creatives",
    description:
      "Lucie Creatives serves businesses in Ahmedabad with cinematic video editing, custom web development, graphic design, logo design, and branding engineered for high growth.",
    ogTitle: "Video Editing & Web Development Agency Ahmedabad | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving tech startups, D2C brands, and commercial enterprises in Ahmedabad with video editing, websites, and branding.",
    image: DEFAULT_OG_IMAGE,
  },
  "/surat": {
    pathname: "/surat",
    title: "Video Editing & Web Development Agency Surat | Lucie Creatives",
    description:
      "Lucie Creatives serves brands in Surat with cinematic video editing, custom e-commerce websites, graphic design, logo design, and strategic branding systems.",
    ogTitle: "Video Editing & Web Development Agency Surat | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving Surat's textile, diamond, retail, and manufacturing brands with modern video editing, web development, and graphic design.",
    image: DEFAULT_OG_IMAGE,
  },
  "/india": {
    pathname: "/india",
    title: "Video Editing & Web Development Agency in India | Lucie Creatives",
    description:
      "Lucie Creatives is a creative digital agency serving businesses across India with video editing, web development, graphic design, branding, logo design and UI/UX design.",
    ogTitle: "Video Editing & Web Development Agency in India | Lucie Creatives",
    ogDescription:
      "Full-service creative digital agency serving businesses across India. Cinematic video editing, web development, graphic design, logo design, and brand identity systems.",
    image: DEFAULT_OG_IMAGE,
  },
  "/mumbai": {
    pathname: "/mumbai",
    title: "Video Editing & Web Development Agency in Mumbai | Lucie Creatives",
    description:
      "Lucie Creatives provides video editing, web development, graphic design, branding, logo design and UI/UX services for businesses in Mumbai and across India.",
    ogTitle: "Video Editing & Web Development Agency in Mumbai | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving fintech, entertainment, fashion, and startup brands in Mumbai with modern video editing, web development, and graphic design.",
    image: DEFAULT_OG_IMAGE,
  },
  "/delhi": {
    pathname: "/delhi",
    title: "Video Editing & Web Development Agency in Delhi | Lucie Creatives",
    description:
      "Lucie Creatives provides video editing, web development, graphic design, branding, logo design and UI/UX services for businesses in Delhi and across India.",
    ogTitle: "Video Editing & Web Development Agency in Delhi | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving corporate enterprises, media, EdTech, and institutional brands in Delhi with video editing, web development, and graphic design.",
    image: DEFAULT_OG_IMAGE,
  },
  "/bengaluru": {
    pathname: "/bengaluru",
    title: "Video Editing & Web Development Agency in Bengaluru | Lucie Creatives",
    description:
      "Lucie Creatives provides video editing, web development, graphic design, branding, logo design and UI/UX services for businesses in Bengaluru and across India.",
    ogTitle: "Video Editing & Web Development Agency in Bengaluru | Lucie Creatives",
    ogDescription:
      "Creative digital agency serving SaaS companies, deep-tech startups, and product-led businesses in Bengaluru with video editing, web development, and graphic design.",
    image: DEFAULT_OG_IMAGE,
  },
  "/dev": {
    pathname: "/dev",
    title: "Engineering Portfolio & Interactive Web Showcases | Lucie Creatives",
    description:
      "Explore Lucie Creatives' web engineering portfolio. Sub-second Next.js applications, custom web platforms, cloud architecture, and high-performance UI components.",
    ogTitle: "Engineering Portfolio & Interactive Web Showcases | Lucie Creatives",
    ogDescription:
      "Explore Lucie Creatives' web engineering portfolio featuring sub-second Next.js web applications and custom platforms.",
    image: WORK_OG_IMAGE,
  },
  "/about": {
    pathname: "/about",
    title: "About Lucie Creatives | Agency Leadership, Culture & Conviction",
    description:
      "Learn why Lucie Creatives exists. We engineer unfair cultural advantages for ambitious brands through cinematic storytelling, viral video editing, and sub-second digital craft.",
    ogTitle: "About Lucie Creatives | Agency Leadership, Culture & Conviction",
    ogDescription:
      "We engineer unfair cultural advantages for ambitious brands through cinematic storytelling, viral short-form retention, and sub-second digital craft.",
    image: WORK_OG_IMAGE,
  },
  "/contact": {
    pathname: "/contact",
    title: "Schedule a Discovery Call | Partner With Lucie Creatives",
    description:
      "Schedule a project discovery call with Lucie Creatives. Discuss web development, graphic design, video editing, or branding. Responses within 24 hours.",
    ogTitle: "Schedule a Discovery Call | Partner With Lucie Creatives",
    ogDescription:
      "Tell us about your brand vision, timeline, and goals. Schedule a discovery session with Lucie Creatives leadership.",
    image: DEFAULT_OG_IMAGE,
  },
  "/insights": {
    pathname: "/insights",
    title: "Agency Insights, Guides & Growth Playbooks | Lucie Creatives",
    description:
      "Actionable agency guides and technical playbooks on website development costs, viral short-form video editing frameworks, brand identity architecture, and digital growth in Gujarat.",
    ogTitle: "Agency Insights, Guides & Growth Playbooks | Lucie Creatives",
    ogDescription:
      "Expert agency guides covering web development engineering, video editing retention frameworks, and branding strategy.",
    image: WORK_OG_IMAGE,
  },
  "/privacy": {
    pathname: "/privacy",
    title: "Privacy Policy | Lucie Creatives Data Governance",
    description:
      "Read the Lucie Creatives Privacy Policy. Learn how we handle client data, analytics, cookies, and maintain strict confidentiality standards.",
    ogTitle: "Privacy Policy | Lucie Creatives",
    ogDescription:
      "Lucie Creatives data governance, privacy practices, and client confidentiality policies.",
    image: DEFAULT_OG_IMAGE,
  },
  "/terms": {
    pathname: "/terms",
    title: "Terms of Service | Lucie Creatives Agency Governance",
    description:
      "Review the terms of service and project governance policies for engaging Lucie Creatives creative, development, and marketing services.",
    ogTitle: "Terms of Service | Lucie Creatives",
    ogDescription:
      "Terms of service, intellectual property guidelines, and project engagement agreements for Lucie Creatives.",
    image: DEFAULT_OG_IMAGE,
  },
  "/industries": {
    pathname: "/industries",
    title: "Industries & Sectors We Accelerate | Lucie Creatives",
    description:
      "Explore the key industries accelerated by Lucie Creatives — from manufacturing conglomerates and D2C brands to GIFT City fintech, healthcare, and global tech innovators.",
    ogTitle: "Commercial Sectors & Industries We Accelerate | Lucie Creatives",
    ogDescription:
      "Tailored creative engineering, high-performance web platforms, and brand systems for industrial leaders, fintech startups, D2C apparel, and global enterprises.",
    image: DEFAULT_OG_IMAGE,
  },
  "/testimonials": {
    pathname: "/testimonials",
    title: "Client Testimonials & Partner Reviews | Lucie Creatives",
    description:
      "Read verified reviews and feedback from founders, CMOs, and enterprise leaders who scaled their digital presence, video reach, and market authority with Lucie Creatives.",
    ogTitle: "Verified Partner Testimonials | Lucie Creatives",
    ogDescription:
      "Discover what scaling founders and brand leaders say about working with Lucie Creatives across web development, cinema video editing, and brand architecture.",
    image: DEFAULT_OG_IMAGE,
  },
};
