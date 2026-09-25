import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/surat"]);

export default function SuratLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Surat"
      slug="surat"
      parentRegion={[
        { name: "India", href: "/india" },
        { name: "Gujarat", href: "/gujarat" },
      ]}
      badge="GLOBAL DIAMOND & TEXTILE CAPITAL • SERVING SURAT"
      headlineRegular="Luxury Creative Agency &"
      headlineItalic="Digital Studio for Surat"
      heroDescription="Lucie Creatives is an elite creative agency serving businesses in Surat. Renowned worldwide for diamond innovation, advanced textile manufacturing, and burgeoning consumer brands, Surat commands high-prestige creative execution. We empower Surat's industry leaders with world-class web development in Surat, luxury graphic design in Surat, cinema-grade video editing in Surat, and distinctive logo design in Surat."
      marketContextTitle="WHY BUSINESSES IN SURAT PARTNER WITH US"
      marketContextSubtitle="Elevating traditional trade dominance into globally recognized luxury brands and scalable online commercial empires."
      marketPillars={[
        {
          title: "Luxury Diamonds, Gems & Haute Horlogerie",
          description:
            "Why diamond and jewelry innovators rely on our graphic design in Surat: We craft bespoke monolithic typography, structural packaging dielines with debossed foil finishes, and 3D ray-traced jewelry CGI that commands premium pricing from international buyers.",
          tag: "Luxury Design",
        },
        {
          title: "Textile & Fashion D2C E-Commerce Growth",
          description:
            "Why textile manufacturers choose our web development in Surat: We transform traditional B2B fabric mills into high-margin consumer brands with headless Shopify storefronts, multi-slide seasonal lookbooks, and sub-second page load speeds.",
          tag: "Web & Commerce",
        },
        {
          title: "High-Volume Content & Video Pipelines",
          description:
            "Why scaling retail brands use our video editing in Surat: We deliver high-frequency 9:16 Instagram reels, macro product craftsmanship films, and paid ad variations designed to scale organic social reach and conversions.",
          tag: "Video Production",
        },
      ]}
      services={[
        {
          name: "Graphic Design Surat",
          href: "/graphic-design",
          description: "Structural packaging dielines, debossed foil textures, product catalogs, and editorial lookbooks for Surat brands.",
          deliverable: "Packaging Dielines • Editorial Lookbooks • Print Masters",
        },
        {
          name: "Web Development Surat",
          href: "/web-development",
          description: "High-performance Next.js web applications and headless Shopify e-commerce platforms for global sales.",
          deliverable: "Headless Shopify • Fast Next.js Sites • 95+ PageSpeed",
        },
        {
          name: "Video Editing Surat",
          href: "/video-editing",
          description: "Cinema commercials, macro jewelry craftsmanship films, and viral short-form reels for Instagram.",
          deliverable: "Brand Films • 9:16 Viral Reels • 4K Color Grading",
        },
        {
          name: "Logo Design Surat",
          href: "/logo-design",
          description: "Mathematical hallmarks and custom business logos designed for luxury engraving and digital sharpness.",
          deliverable: "Master Vector Suite • Hallmark Variations • Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "End-to-end luxury brand ecosystems, sensory packaging, and global positioning systems.",
          deliverable: "Brand Identity Book • Luxury Guidelines • Tone of Voice",
        },
        {
          name: "Social Media Design",
          href: "/social-media-design",
          description: "High-contrast carousel lookbooks, product launch announcements, and paid ad creatives.",
          deliverable: "Multi-Slide Carousels • Ad Creatives • Figma Templates",
        },
      ]}
      caseStudySlugs={[
        "kuro-luxury-identity",
        "nirva-resort-cinema-commercial",
        "omni-global-campaign",
        "maruti-buildcon-vertical-reels",
        "elysian-editorial-suite",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives serve clients as a creative agency in Surat?",
          a: "We operate as a dedicated creative partner serving businesses in Surat through agile, remote-first sprint pods. We hold structured weekly creative syncs, share interactive design proofs via Figma and Frame.io, and ensure rapid iterations with no geographic friction.",
        },
        {
          q: "What makes your graphic design in Surat unique for jewelry and textile brands?",
          a: "We engineer production-ready structural dielines for rigid luxury boxes, embossed foil sleeves, fabric hangtags, and seasonal lookbooks. We coordinate directly with your print and packaging manufacturing partners to guarantee flawless finish quality.",
        },
        {
          q: "Can you shoot or edit macro footage with your video editing in Surat?",
          a: "Yes. Our video editing post-production team specializes in macro probe lens color grading, optical dispersion simulation, and audio sound foley tailored for lab-grown diamonds, jewelry, and luxury apparel.",
        },
        {
          q: "How does your web development in Surat support direct-to-consumer (D2C) brands?",
          a: "We build custom headless Shopify and Next.js e-commerce storefronts that load in under a second, offer real-time product filtering, and optimize mobile checkout funnels to maximize customer average order value (AOV).",
        },
        {
          q: "Do you create custom logo design in Surat suitable for hallmarks and engraving?",
          a: "Yes. Our logo design services produce clean geometric vectors calibrated for precision laser engraving on jewelry and timepieces, as well as digital favicons and large-format showroom displays.",
        },
      ]}
      sisterLocations={[
        {
          name: "Global",
          href: "/global",
          description: "International creative digital agency serving US, UK, UAE, and worldwide brands.",
        },
        {
          name: "India",
          href: "/india",
          description: "Nationwide creative agency services across all major Indian markets.",
        },
        {
          name: "Gujarat",
          href: "/gujarat",
          description: "State-wide industrial powerhouses, manufacturing conglomerates, and export leaders.",
        },
        {
          name: "Ahmedabad",
          href: "/ahmedabad",
          description: "Commercial capital, fintech hub (GIFT City), healthcare pioneers, and startup innovators.",
        },
      ]}
    />
  );
}
