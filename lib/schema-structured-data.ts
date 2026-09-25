import { SITE_CONFIG } from "./constants";

const CANONICAL_ORIGIN = "https://luciecreatives.in";
const LOGO_URL = `${CANONICAL_ORIGIN}https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835244/lucie-creatives/logo/lucie-creatives-og.png`;

/**
 * Returns canonical Organization structured data for Lucie Creatives.
 * Strictly avoids invented phone numbers, street addresses, awards, or fake reviews.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${CANONICAL_ORIGIN}/#organization`,
    name: SITE_CONFIG.name,
    url: CANONICAL_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 1200,
      height: 630,
    },
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.officialEmail,
    sameAs: SITE_CONFIG.socials.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.officialEmail,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    knowsAbout: [
      "Web Development",
      "Website Design",
      "Graphic Design",
      "Video Editing",
      "Logo Design",
      "Branding",
      "UI/UX Design",
      "Social Media Design",
    ],
  };
}

/**
 * Returns canonical WebSite structured data.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CANONICAL_ORIGIN}/#website`,
    name: SITE_CONFIG.name,
    url: CANONICAL_ORIGIN,
    description:
      "Web Development, Graphic Design & Video Editing Agency in Gujarat Serving Global Brands",
    publisher: {
      "@id": `${CANONICAL_ORIGIN}/#organization`,
    },
  };
}

/**
 * Returns canonical Schema.org ContactPage structured data.
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${CANONICAL_ORIGIN}/contact#webpage`,
    url: `${CANONICAL_ORIGIN}/contact`,
    name: "Contact Lucie Creatives | Start a Project & Growth Consultation",
    description:
      "Get in touch with Lucie Creatives. Discuss your web development, graphic design, video editing, and branding requirements with our senior team. 24-hour response guaranteed.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
    },
    breadcrumb: {
      "@id": `${CANONICAL_ORIGIN}/contact#breadcrumb`,
    },
  };
}

/**
 * Returns Schema.org BreadcrumbList structured data.
 */
export function getBreadcrumbSchema(items: { name: string; item?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: CANONICAL_ORIGIN,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.item
          ? {
              item: item.item.startsWith("http")
                ? item.item
                : `${CANONICAL_ORIGIN}${item.item.startsWith("/") ? item.item : `/${item.item}`}`,
            }
          : {}),
      })),
    ],
  };
}

/**
 * Returns Schema.org Service structured data.
 */
export function getServiceSchema({
  name,
  description,
  slug,
  capabilities = [],
  areaServed,
}: {
  name: string;
  description: string;
  slug: string;
  capabilities?: { title: string; description: string }[];
  areaServed?: string | string[];
}) {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  const serviceUrl = `${CANONICAL_ORIGIN}/${cleanSlug}`;

  const areas = areaServed
    ? Array.isArray(areaServed)
      ? areaServed.map((a) => {
          const lower = a.toLowerCase();
          if (lower === "global" || lower === "worldwide") return { "@type": "Place", name: "Worldwide" };
          if (lower === "india") return { "@type": "Country", name: "India" };
          if (lower === "gujarat") return { "@type": "AdministrativeArea", name: "Gujarat" };
          if (lower === "united states" || lower === "us" || lower === "usa") return { "@type": "Country", name: "United States" };
          if (lower === "united kingdom" || lower === "uk") return { "@type": "Country", name: "United Kingdom" };
          if (lower === "united arab emirates" || lower === "uae") return { "@type": "Country", name: "United Arab Emirates" };
          if (lower === "australia") return { "@type": "Country", name: "Australia" };
          if (lower === "europe") return { "@type": "Continent", name: "Europe" };
          return { "@type": "City", name: a };
        })
      : areaServed.toLowerCase() === "global" || areaServed.toLowerCase() === "worldwide"
        ? [
            { "@type": "Place", name: "Worldwide" },
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "India" },
          ]
        : [{ "@type": "AdministrativeArea", name: areaServed }]
    : [
        { "@type": "Place", name: "Worldwide" },
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: `${name} by Lucie Creatives`,
    serviceType: name,
    description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: LOGO_URL,
    },
    areaServed: areas,
    ...(capabilities.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} Deliverables`,
            itemListElement: capabilities.map((c, i) => ({
              "@type": "Offer",
              position: i + 1,
              itemOffered: {
                "@type": "Service",
                name: c.title,
                description: c.description,
              },
            })),
          },
        }
      : {}),
  };
}

/**
 * Returns Schema.org FAQPage structured data.
 */
export function getFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Returns Schema.org Article / CreativeWork structured data for verified case studies.
 */
export function getCaseStudySchema({
  headline,
  description,
  slug,
  image,
  datePublished,
  category,
  client,
  industry,
  tools = [],
  deliverables = [],
}: {
  headline: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  category: string;
  client: string;
  industry?: string;
  tools?: string[];
  deliverables?: string[];
}) {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  const articleUrl = `${CANONICAL_ORIGIN}/${cleanSlug}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${CANONICAL_ORIGIN}${image.startsWith("/") ? image : `/${image}`}`;

  const aboutThings = [
    { "@type": "Thing", name: category },
    ...(industry ? [{ "@type": "Thing", name: industry }] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline,
    name: headline,
    description,
    url: articleUrl,
    image: fullImageUrl,
    datePublished,
    author: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    about: aboutThings,
    mentions: {
      "@type": "Organization",
      name: client,
    },
    keywords: [...tools, ...deliverables].join(", "),
  };
}

/**
 * Returns Schema.org BlogPosting structured data for educational and technical Insights.
 */
export function getInsightArticleSchema({
  title,
  excerpt,
  slug,
  image,
  publishedDate,
  updatedDate,
  category,
  authorName,
  authorRole,
  serviceName,
  serviceHref,
}: {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  publishedDate: string;
  updatedDate: string;
  category: string;
  authorName: string;
  authorRole?: string;
  serviceName?: string;
  serviceHref?: string;
}) {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  const articleUrl = `${CANONICAL_ORIGIN}/insights/${cleanSlug}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${CANONICAL_ORIGIN}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: title,
    name: title,
    description: excerpt,
    url: articleUrl,
    image: fullImageUrl,
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
    articleSection: category,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorRole ? { jobTitle: authorRole } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(serviceName && serviceHref
      ? {
          about: {
            "@type": "Service",
            name: serviceName,
            url: `${CANONICAL_ORIGIN}${serviceHref}`,
          },
        }
      : {}),
  };
}

/**
 * Returns Schema.org CollectionPage structured data for Insights index.
 */
export function getInsightsCollectionSchema(
  articles: { title: string; excerpt: string; slug: string; coverImage: string }[]
) {
  const pageUrl = `${CANONICAL_ORIGIN}/insights`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Engineering & Strategic Insights — Lucie Creatives",
    description:
      "Actionable engineering guides, brand architecture breakdowns, and creative production strategy from the Lucie Creatives team.",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: LOGO_URL,
    },
    hasPart: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: `${CANONICAL_ORIGIN}/insights/${a.slug}`,
      image: a.coverImage,
    })),
  };
}


/**
 * Returns Schema.org CollectionPage structured data for portfolio / work listings.
 */
export function getCollectionPageSchema({
  name,
  description,
  slug,
  items,
}: {
  name: string;
  description: string;
  slug: string;
  items: { title: string; brief: string; slug: string; posterSrc?: string }[];
}) {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  const pageUrl = `${CANONICAL_ORIGIN}/${cleanSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name,
    description,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: LOGO_URL,
    },
    hasPart: items.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.brief,
      url: `${CANONICAL_ORIGIN}/work/${p.slug}`,
      ...(p.posterSrc
        ? {
            image: p.posterSrc.startsWith("http")
              ? p.posterSrc
              : `${CANONICAL_ORIGIN}${p.posterSrc.startsWith("/") ? p.posterSrc : `/${p.posterSrc}`}`,
          }
        : {}),
      creator: {
        "@type": "Organization",
        "@id": `${CANONICAL_ORIGIN}/#organization`,
        name: SITE_CONFIG.name,
      },
    })),
  };
}

/**
 * Returns Schema.org AboutPage structured data.
 */
export function getAboutPageSchema(founders: { name: string; jobTitle: string }[]) {
  const aboutUrl = `${CANONICAL_ORIGIN}/about`;

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${aboutUrl}#about`,
    name: "About Lucie Creatives",
    description:
      "Learn why Lucie Creatives exists. We engineer unfair cultural advantages for ambitious brands through high-retention video editing, cinematic storytelling, and sub-second digital craft.",
    url: aboutUrl,
    mainEntity: {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_ORIGIN,
      logo: LOGO_URL,
      sameAs: SITE_CONFIG.socials.map((s) => s.href),
      founder: founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.jobTitle,
      })),
    },
  };
}
