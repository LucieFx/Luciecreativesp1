import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/seo/ServicePageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/ui-ux-design"]);

export default function UiUxDesignPage() {
  return (
    <ServicePageTemplate
      serviceName="UI/UX Design"
      slug="ui-ux-design"
      eyebrowBadge="HUMAN-CENTERED PRODUCT DESIGN"
      headlineRegular="Digital Product Design &"
      headlineItalic="Figma UI/UX Systems"
      description="We transform complex digital workflows into frictionless, intuitive experiences. Grounded in cognitive psychology, conversion rate optimization (CRO), and modular Figma design systems, our UI/UX design bridges the gap between user delight and measurable commercial growth."
      capabilitiesTitle="WHAT OUR UI/UX DESIGN SERVICE INCLUDES"
      capabilities={[
        {
          title: "Figma Design Systems & Token Architecture",
          description:
            "Modular component libraries utilizing Figma variables, auto-layout 5.0, dark mode tokens, and strict naming conventions that map 1-to-1 with React/Tailwind frontend codebases.",
          tag: "Design Tokens",
        },
        {
          title: "User Journey Mapping & Wireframing",
          description:
            "Heuristic audits, user persona journeys, hierarchical sitemaps, and low-fidelity wireframe schematics engineered to minimize cognitive load and eliminate user friction.",
          tag: "UX Research",
        },
        {
          title: "High-Fidelity UI & Clickable Prototypes",
          description:
            "Interactive micro-prototypes simulating exact production physics, page transitions, and responsive behavior for realistic stakeholder testing and usability validation.",
          tag: "Prototyping",
        },
        {
          title: "Responsive Web & SaaS Interface Design",
          description:
            "Responsive web application and SaaS interfaces engineered for clarity, high conversion rates, and seamless cross-device workflows.",
          tag: "Web UX",
        },
        {
          title: "Conversion Rate Optimization (CRO)",
          description:
            "Strategic audit and redesign of user onboarding flows, checkout tunnels, and lead capture funnels to eliminate drop-off points and maximize completion rates.",
          tag: "Conversion",
        },
        {
          title: "Developer Handoff & Implementation Specs",
          description:
            "Pixel-perfect redlining, CSS property documentation, exported SVG assets, and interactive component state specs ensuring zero loss in translation during engineering.",
          tag: "Handoff",
        },
      ]}
      deliverables={[
        "Complete, production-ready Figma project file with structured page architecture",
        "Scalable component library with variants, interactive properties, and auto-layout",
        "Interactive, clickable prototype for stakeholder sign-off and user testing",
        "Design token specification sheet (spacing, color, typography, elevation, motion)",
        "Responsive web and multi-breakpoint screen layouts",
        "Engineering handoff documentation & SVG icon asset exports",
      ]}
      benefitsTitle="HOW HUMAN-CENTERED UI/UX DRIVES PRODUCT SUCCESS"
      benefits={[
        {
          title: "Dramatically Lowers User Churn",
          description:
            "Intuitive interfaces remove user confusion. Clean onboarding flows guide customers directly to core value with minimal cognitive effort.",
        },
        {
          title: "Accelerates Engineering Velocity",
          description:
            "A structured Figma design system provides developers with reusable tokens and components, cutting frontend implementation time by up to 40%.",
        },
        {
          title: "Increases Conversion & Retention",
          description:
            "Every button placement, micro-interaction, and form field is designed based on cognitive psychology and conversion optimization benchmarks.",
        },
        {
          title: "Ensures WCAG Accessibility Compliance",
          description:
            "Our interfaces are tested for WCAG 2.1 AA color contrast, screen reader compatibility, and accessible keyboard focus navigation.",
        },
        {
          title: "Consistent Experience Across Platforms",
          description:
            "Whether accessing your product via smartphone browser, tablet, or high-resolution desktop display, users experience unified visual harmony.",
        },
        {
          title: "Data-Informed Design Decisions",
          description:
            "We design based on behavioral heuristics, usability testing, and session analytics—replacing internal guesswork with empirical validation.",
        },
      ]}
      processTitle="OUR 4-STAGE PRODUCT DESIGN SPRINT"
      processSteps={[
        {
          step: "01",
          title: "User Research & Heuristic Audit",
          description:
            "We analyze behavioral analytics, interview actual users, and conduct competitive usability audits to diagnose friction points and interface opportunities.",
        },
        {
          step: "02",
          title: "Low-Fidelity Wireframes & Flow Validation",
          description:
            "We map out core screen architectures, content hierarchies, and user pathways in grayscale to validate logic before investing in visual styling.",
        },
        {
          step: "03",
          title: "High-Fidelity UI Design & Tokenization",
          description:
            "We apply visual branding, typography scales, rich micro-interactions, and component variants, organizing everything cleanly in Figma.",
        },
        {
          step: "04",
          title: "Interactive Prototyping & Developer Handoff",
          description:
            "We build clickable Figma prototypes for user validation and provide thorough engineering specs and token documentation for your developers.",
        },
      ]}
      caseStudySlugs={[
        "vedam-villas-influencer-tour",
        "vanguard-design-system",
        "nirva-resort-cinema-commercial",
      ]}
      relatedInsightSlugs={[
        "ecommerce-website-design-conversion-architecture",
        "website-development-cost-guide-business",
      ]}
      faq={[
        {
          q: "What design tools do you use for UI/UX product design?",
          a: "Figma is our primary design and prototyping operating environment. It allows seamless real-time collaboration, auto-layout 5.0 systems, design tokens, and instant developer inspection. For complex physics-based motion, we also utilize Principle and After Effects.",
        },
        {
          q: "How do you coordinate with our internal engineering team?",
          a: "We work directly alongside your frontend engineers. We organize Figma components into atomic hierarchies matching React components, document all states (default, hover, focus, active, disabled), and supply direct CSS and Tailwind property values.",
        },
        {
          q: "Do you design for both responsive websites and SaaS web applications?",
          a: "Yes. We design responsive marketing websites as well as complex, multi-tenant SaaS web applications, dashboards, and client portals optimized across desktop, tablet, and mobile browsers.",
        },
        {
          q: "Can you redesign an existing software product with high user churn?",
          a: "Yes. We specialize in legacy product modernization and UX friction reduction, conducting heuristic audits to pinpoint drop-off zones and rebuilding flows for intuitive usability.",
        },
        {
          q: "Do you also build the frontend code for the designs?",
          a: "Yes! Our agency offers end-to-end capabilities; our web development team can seamlessly turn Figma files into production Next.js/React code.",
        },
      ]}
      relatedServices={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "Transform your UI/UX designs into fast, production-ready Next.js web applications.",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Establish foundational brand guidelines and visual rules before product design.",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Bespoke illustrations, marketing collateral, and digital asset suites.",
        },
      ]}
    />
  );
}
