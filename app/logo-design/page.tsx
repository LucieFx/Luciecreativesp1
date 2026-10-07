import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/seo/ServicePageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/logo-design"]);

export default function LogoDesignPage() {
  return (
    <ServicePageTemplate
      serviceName="Logo Design"
      slug="logo-design"
      eyebrowBadge="DISTINCTIVE IDENTITY SYMBOLS"
      headlineRegular="Custom Logo Design &"
      headlineItalic="Business Visual Identity"
      description="We engineer bespoke logo design and distinctive visual identity systems that endure for decades. From custom logos and refined business logos to mathematical logomarks, our symbols are crafted for instant brand identity recall whether displayed as a 16px digital favicon or embossed on architectural installations."
      capabilitiesTitle="WHAT OUR LOGO DESIGN SERVICE INCLUDES"
      capabilities={[
        {
          title: "Custom Logo & Wordmark Engineering",
          description:
            "Hand-drawn typography and bespoke letterforms customized with precise optical kerning, baseline balance, and distinctive ligatures for your business logo.",
          tag: "Custom Wordmark",
        },
        {
          title: "Geometric & Abstract Emblems",
          description:
            "Constructed on golden ratio and geometric grids, producing brand identity emblems that possess underlying mathematical balance and timeless visual weight.",
          tag: "Geometric Grids",
        },
        {
          title: "Monograms & Luxury Hallmarks",
          description:
            "Interlocking initials and monolithic emblems engineered for high-luxury, institutional prestige, and high-fashion consumer visual identity systems.",
          tag: "Luxury Marks",
        },
        {
          title: "Responsive Scalability Architecture",
          description:
            "Responsive logo design suites that adapt dynamically across breakpoints, from intricate master emblems to ultra-simplified iconographic stamps.",
          tag: "Responsive Icon",
        },
        {
          title: "Complete Visual Identity Guidelines",
          description:
            "Clearance space rules, minimum reproduction dimensions, color variation rules (black/white, dark mode), and font licensing recommendations.",
          tag: "Visual Identity",
        },
        {
          title: "Kinetic Motion Ident & Vector Stems",
          description:
            "Delivered with ready-to-animate vector separation layers and motion design concepts for cinematic intros and digital web launches.",
          tag: "Motion-Ready",
        },
      ]}
      deliverables={[
        "Complete master vector package (.AI, .EPS, .SVG, .PDF) with outlined typography",
        "High-resolution raster files with transparent backgrounds (.PNG, .WebP)",
        "Responsive favicon and web icon asset matrix (16px to 512px)",
        "Monochrome black and white production-ready business logo versions",
        "Official Pantone, CMYK, and RGB color specification sheet",
        "Clearance space, brand identity rules, and minimum reproduction size guidelines",
      ]}
      benefitsTitle="WHY INVEST IN A BESPOKE BUSINESS LOGO"
      benefits={[
        {
          title: "Mathematical Visual Longevity",
          description:
            "We avoid fleeting design gimmicks. Our custom logos are constructed on geometric grids that look modern today and remain timeless 20 years from now.",
        },
        {
          title: "Instant Market Recognition",
          description:
            "A distinctive business logo creates immediate semiotic recall, separating your brand from generic competitors in crowded marketplaces.",
        },
        {
          title: "Flawless Versatility Across Media",
          description:
            "Engineered to look razor-sharp on a 16px digital mobile screen, embroidered on apparel, engraved in metal, or printed on a 50-foot billboard.",
        },
        {
          title: "Trademark & Copyright Safety",
          description:
            "Every custom logo is drawn from clean conceptual sheets, conducting reverse visual searches to ensure trademark registrability.",
        },
        {
          title: "Full Intellectual Property Transfer",
          description:
            "You receive 100% full commercial copyright ownership and source vector files upon final delivery: no recurring fees or licensing claims.",
        },
        {
          title: "Seamless Brand Identity Integration",
          description:
            "Your new logo integrates effortlessly into website development, packaging architecture, and marketing collateral.",
        },
      ]}
      processTitle="OUR 4-STEP LOGO DESIGN SPRINT"
      processSteps={[
        {
          step: "01",
          title: "Brand Semiotics & Visual Identity Research",
          description:
            "We explore the symbolic language, cultural codes, and competitive landscape of your industry to uncover distinct visual metaphors.",
        },
        {
          step: "02",
          title: "Rough Concept Sketching & Vector Construction",
          description:
            "We generate dozens of rough conceptual sketches before selecting the most potent directions for digital vector construction on precision grids.",
        },
        {
          step: "03",
          title: "Optical Refinement & Contrast Stress-Testing",
          description:
            "We test the custom logo in reverse contrast, extreme reduction (16px favicon), monochromatic black-and-white, and physical mockups.",
        },
        {
          step: "04",
          title: "Master Vector Suite & Usage Guidelines",
          description:
            "Final export of scalable vector packages, color variations (Pantone, CMYK, RGB), spacing rules, and brand identity specifications.",
        },
      ]}
      caseStudySlugs={[
        "speczo-luxury-eyewear",
        "onirique-parfums-identity",
        "nirva-resort-environmental-branding",
        "rhyme-haute-joaillerie",
      ]}
      relatedInsightSlugs={[
        "logo-design-vs-complete-brand-identity-guide",
        "digital-branding-web-development-gujarat-business-guide",
      ]}
      faq={[
        {
          q: "What makes a custom logo from Lucie Creatives different from an automated generator?",
          a: "Automated generators and cheap template sites recycle clip-art graphics that hundreds of other businesses use, creating trademark conflicts and looking amateurish. We design bespoke custom logos from scratch, constructed on mathematical grids, tested across all media, and engineered for trademark protection.",
        },
        {
          q: "What file formats will I receive with my finished business logo?",
          a: "You receive industry-standard vector files (.AI, .EPS, .SVG, .PDF) that scale infinitely without quality loss, alongside web-optimized raster formats (.PNG, .JPG, .WebP) with transparent backgrounds, plus a multi-resolution favicon and digital web icon matrix.",
        },
        {
          q: "Do I get full ownership and copyright of the logo design?",
          a: "Yes. Upon full project completion and final payment, 100% intellectual property ownership transfers to you, allowing unrestricted commercial use and trademark registration worldwide.",
        },
        {
          q: "How many logo concepts and revision rounds are provided?",
          a: "We present 3 to 4 distinct, fully fleshed-out conceptual directions. Once you choose your preferred direction, we provide up to 3 rounds of optical and typographic refinement to achieve absolute perfection.",
        },
        {
          q: "Can you modernize our existing business logo without losing brand equity?",
          a: "Yes. We offer brand mark modernization sprints where we clean up vector geometry, fix optical kerning flaws, and modernize aging logomarks while preserving established brand equity.",
        },
      ]}
      relatedServices={[
        {
          name: "Branding",
          href: "/branding",
          description: "Holistic brand ecosystems, positioning rules, and comprehensive identity systems.",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Monolithic visual systems, marketing collateral, and packaging architecture.",
        },
        {
          name: "Web Development",
          href: "/web-development",
          description: "Fast, responsive web applications that bring your new logo to life online.",
        },
      ]}
    />
  );
}
