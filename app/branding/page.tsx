import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/seo/ServicePageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/branding"]);

export default function BrandingPage() {
  return (
    <ServicePageTemplate
      serviceName="Branding"
      slug="branding"
      eyebrowBadge="HOLISTIC BRAND ARCHITECTURE"
      headlineRegular="Strategic Brand Identity &"
      headlineItalic="Positioning Systems"
      description="Branding is far more than a logo—it is the operating system of your market reputation. We construct comprehensive brand ecosystems that define strategic market positioning, verbal tone of voice, visual identity standards, color psychology, and rigorous brand books that build enterprise valuation."
      capabilitiesTitle="WHAT OUR BRANDING SERVICE INCLUDES"
      capabilities={[
        {
          title: "Strategic Brand Positioning & Narrative",
          description:
            "Defining your brand purpose, core value propositions, competitive differentiation pillars, and narrative arc to clearly articulate why your company wins in its category.",
          tag: "Brand Strategy",
        },
        {
          title: "Comprehensive Brand Guideline Books",
          description:
            "In-depth 80-to-120 page brand manuals specifying typography hierarchies, grid mechanics, iconography rules, and usage do's & don'ts across all channels.",
          tag: "Brand Books",
        },
        {
          title: "Color Psychology & Token Architecture",
          description:
            "Curated chromatic palettes with mathematically tested contrast ratios, dark-mode variations, and digital design token definitions ready for software engineers.",
          tag: "Color Theory",
        },
        {
          title: "Verbal Identity & Tone of Voice Playbooks",
          description:
            "Defining how your brand speaks, writes, and communicates—establishing grammar standards, executive vocabulary, and customer support guidelines.",
          tag: "Verbal Identity",
        },
        {
          title: "Multi-Touchpoint Collateral Systems",
          description:
            "Unified templates for keynote decks, corporate stationery, business cards, email signatures, merchandise, and environmental spatial graphics.",
          tag: "Touchpoints",
        },
        {
          title: "Corporate Rebranding & Evolution",
          description:
            "Helping established enterprises shed legacy aesthetics and transition smoothly into contemporary digital leaders without alienating existing loyal customers.",
          tag: "Rebranding",
        },
      ]}
      deliverables={[
        "Comprehensive 80+ page master brand guideline book (.PDF)",
        "Primary logomarks, sub-marks, and lockups in all vector formats",
        "Curated typographic hierarchy and licensed web font packages",
        "Chromatic color palette with digital HEX, RGB, CMYK, and Pantone specs",
        "Executive presentation deck template (Keynote, PowerPoint, Figma)",
        "Complete corporate stationery, email signatures, and business card print files",
      ]}
      benefitsTitle="WHY STRATEGIC BRANDING DRIVES COMMERCIAL VALUATION"
      benefits={[
        {
          title: "Commands Premium Pricing Power",
          description:
            "Strong brands escape the price-competition trap. Cohesive branding allows you to command higher margins and attract higher-value enterprise contracts.",
        },
        {
          title: "Shortens Enterprise Sales Cycles",
          description:
            "Clear positioning and institutional visual polish instill immediate confidence in decision-makers, speeding up deal sign-offs.",
        },
        {
          title: "Unifies Internal Teams & Vendors",
          description:
            "With a clear brand guideline book, internal designers, external agencies, and copywriters produce consistent, on-brand work without ambiguity.",
        },
        {
          title: "Attracts Top-Tier Talent",
          description:
            "World-class candidates gravitate towards brands that present a clear, ambitious vision and a sophisticated public appearance.",
        },
        {
          title: "Protects Long-Term Brand Equity",
          description:
            "Clear guidelines safeguard your identity against dilution as your company scales across multiple product lines and international markets.",
        },
        {
          title: "Higher Investor & M&A Valuation",
          description:
            "Institutional acquirers and venture capital funds place higher multiples on companies with defensible, recognizable brand identity systems.",
        },
      ]}
      processTitle="OUR 4-PHASE BRAND CREATION METHODOLOGY"
      processSteps={[
        {
          step: "01",
          title: "Discovery & Market Positioning Audit",
          description:
            "Stakeholder interviews, category analysis, customer perception audits, and competitive benchmarking to identify uncontested positioning whitespace.",
        },
        {
          step: "02",
          title: "Creative Direction & Identity Concepts",
          description:
            "Development of 2-3 distinct creative territories featuring logomarks, typography pairings, color systems, and realistic mockups across actual touchpoints.",
        },
        {
          step: "03",
          title: "System Expansion & Collateral Engineering",
          description:
            "Full architectural build-out of the chosen direction across packaging, digital templates, presentation decks, stationery, and physical environments.",
        },
        {
          step: "04",
          title: "Brand Book Delivery & Internal Team Onboarding",
          description:
            "Delivery of the master brand guidelines document, digital asset repository, and an executive onboarding walkthrough for your marketing teams.",
        },
      ]}
      caseStudySlugs={[
        "speczo-luxury-eyewear",
        "lumara-luxury-skincare",
        "onirique-parfums-identity",
        "nirva-resort-environmental-branding",
        "rhyme-haute-joaillerie",
      ]}
      relatedInsightSlugs={[
        "logo-design-vs-complete-brand-identity-guide",
        "digital-branding-web-development-gujarat-business-guide",
        "social-media-design-systems-organic-brand-growth",
      ]}
      faq={[
        {
          q: "What is the difference between logo design and complete branding?",
          a: "A logo is simply a visual mark or graphic identifier. Complete branding is the entire strategic ecosystem—market positioning, narrative messaging, typography hierarchies, chromatic color psychology, verbal tone of voice, and multi-channel asset systems that govern how your business is perceived.",
        },
        {
          q: "How long does a full brand identity engagement take?",
          a: "A comprehensive brand identity engagement typically takes between 4 to 8 weeks, depending on the depth of stakeholder research, collateral breadth, and packaging requirements.",
        },
        {
          q: "Do you help with corporate rebrands for legacy companies?",
          a: "Yes. We specialize in strategic brand evolution, modernizing outdated visual assets while protecting existing brand equity, customer trust, and organic search presence.",
        },
        {
          q: "What does the delivered brand guidelines book contain?",
          a: "Our brand books typically span 80 to 120 pages, covering logo construction grids, spacing rules, color formulas (Pantone, CMYK, RGB, HEX), typography pairings, photography direction, verbal tone of voice, and real-world collateral examples.",
        },
        {
          q: "Will our internal team be able to use the assets easily?",
          a: "Yes. We organize all files in structured cloud repositories and provide editable Figma and Canva templates with clear instructions, making on-brand production seamless for non-designers.",
        },
      ]}
      relatedServices={[
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Distinctive logomarks, wordmarks, and identity symbols engineered for longevity.",
        },
        {
          name: "Web Development",
          href: "/web-development",
          description: "High-performance web architecture bringing your new brand identity to life online.",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "Human-centered digital product interfaces aligned with your brand design system.",
        },
      ]}
    />
  );
}
