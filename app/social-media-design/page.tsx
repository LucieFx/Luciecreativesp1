import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/seo/ServicePageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/social-media-design"]);

export default function SocialMediaDesignPage() {
  return (
    <ServicePageTemplate
      serviceName="Social Media Design"
      slug="social-media-design"
      eyebrowBadge="ALGORITHMIC SOCIAL CREATIVE"
      headlineRegular="Scroll-Stopping Creative &"
      headlineItalic="Algorithmic Social Velocity"
      description="In an era of endless scrolling, mediocre graphics get ignored. We engineer high-velocity social media design systems that capture attention within the first fraction of a second. From data-dense multi-slide carousels to synchronized feed aesthetics and high-converting paid ad sets, we turn casual scrollers into passionate brand advocates."
      capabilitiesTitle="WHAT OUR SOCIAL MEDIA DESIGN SERVICE INCLUDES"
      capabilities={[
        {
          title: "Multi-Slide Educational Carousels",
          description:
            "Curated multi-slide layouts designed for swipe-through velocity on LinkedIn and Instagram, featuring high-contrast typography, technical diagrams, and actionable takeaways.",
          tag: "Carousels",
        },
        {
          title: "High-Converting Paid Ad Creatives",
          description:
            "Static and kinetic ad creatives split-tested for Meta, Instagram, and LinkedIn ads, optimized for maximum click-through rates (CTR) and lower customer acquisition costs.",
          tag: "Paid Social Ads",
        },
        {
          title: "Omnichannel Feed Aesthetic Systems",
          description:
            "Cohesive color palettes, typographic hierarchies, and layout rhythms that transform your Instagram or LinkedIn grid into a unified, high-prestige editorial publication.",
          tag: "Feed Curation",
        },
        {
          title: "Infographics & Technical Data Visuals",
          description:
            "Translating intricate industry benchmarks, research statistics, and technical workflows into highly shareable, visually intuitive social media graphics.",
          tag: "Infographics",
        },
        {
          title: "Story, Highlight & Channel Branding",
          description:
            "Custom story layouts, branded highlight covers, and click-optimized YouTube/video thumbnails engineered for high click-through rates.",
          tag: "Channel Assets",
        },
        {
          title: "Agile Figma Social Template Suites",
          description:
            "Custom-built Figma template packages that empower your internal marketing team to produce on-brand social assets in minutes without friction.",
          tag: "Template Kits",
        },
      ]}
      deliverables={[
        "Weekly or monthly batch packs of high-resolution social creatives",
        "Multi-slide carousel sets in 4:5 and 1:1 aspect ratios",
        "High-contrast story and vertical banner graphics (9:16)",
        "Fully editable Figma social design template library for internal teams",
        "Custom branded highlight icons and channel banners",
        "Social media visual style guide with typography and layout rules",
      ]}
      benefitsTitle="HOW STRATEGIC SOCIAL DESIGN DRIVES ORGANIC REACH"
      benefits={[
        {
          title: "Maximizes Algorithmic Dwell Time",
          description:
            "Multi-slide carousels and information-dense layouts keep users engaged on your posts longer, signaling platform algorithms to distribute your content wider.",
        },
        {
          title: "Drives Unprecedented Saves & Shares",
          description:
            "High-utility educational graphics create immediate bookmarks and peer-to-peer shares, amplifying organic reach without paid ad spend.",
        },
        {
          title: "Lowers Paid Ad Acquisition Costs",
          description:
            "Testing bespoke, high-contrast creative variations significantly improves ad relevance scores and click-through rates on Meta and LinkedIn.",
        },
        {
          title: "Eliminates Publishing Bottlenecks",
          description:
            "Our scheduled batch delivery and pre-built Figma template kits mean your marketing team never runs out of fresh, on-brand content to post.",
        },
        {
          title: "Builds Category Authority",
          description:
            "Consistent, publication-grade aesthetics position your brand and executives as credible, forward-thinking industry leaders.",
        },
        {
          title: "Omnichannel Cross-Pollination",
          description:
            "Design assets engineered once can be easily adapted across LinkedIn, Instagram, X (Twitter), and YouTube Community with zero quality degradation.",
        },
      ]}
      processTitle="OUR 4-STAGE SOCIAL CONTENT PIPELINE"
      processSteps={[
        {
          step: "01",
          title: "Content Taxonomy & Audience Analysis",
          description:
            "We categorize your core pillars (educational, product, cultural, proof points) and identify the visual formats that generate maximum reach in your niche.",
        },
        {
          step: "02",
          title: "Visual Template System & Layout Rules",
          description:
            "We establish custom grid templates, typography rules, and recurring visual hooks that give your channel an unmistakable visual identity.",
        },
        {
          step: "03",
          title: "Batch Asset Production & Quality Review",
          description:
            "We produce weekly or monthly content batches in synchronized sprints, ensuring consistent asset delivery well ahead of your publishing schedule.",
        },
        {
          step: "04",
          title: "Performance Review & Iteration",
          description:
            "We analyze engagement metrics (saves, shares, clicks) and continuously refine layout patterns, hook styles, and color contrasts to optimize performance.",
        },
      ]}
      caseStudySlugs={[
        "vedam-villas-influencer-tour",
        "leaders-diary-nishant-patel",
        "maruti-buildcon-vertical-reels",
      ]}
      relatedInsightSlugs={[
        "social-media-design-systems-organic-brand-growth",
        "short-form-video-editing-framework-viral-reels",
      ]}
      faq={[
        {
          q: "What social platforms do you design assets for?",
          a: "We design across all major digital platforms including LinkedIn, Instagram (Feed, Stories, Reels covers), X (Twitter), YouTube (Community posts and Thumbnails), and Meta Ads.",
        },
        {
          q: "Can you provide editable templates so our internal team can post quickly?",
          a: "Yes! We build complete, organized Figma template suites with locked style components and auto-layout text boxes so your team can rapidly generate on-brand graphics.",
        },
        {
          q: "How does batch delivery work?",
          a: "We operate on scheduled monthly or bi-weekly sprints. We deliver all approved graphics in organized folders categorized by date and format, ready for your social media manager to schedule.",
        },
        {
          q: "Do you write the copy for the social media posts as well?",
          a: "We can work either way. We can design around your existing copy and outlines, or our creative strategists can draft compelling headlines, carousel slide text, and captions for you.",
        },
        {
          q: "Can you design static ads for our paid marketing campaigns?",
          a: "Yes. Direct-response paid ad creatives are a key specialty; we design high-converting visual variations specifically structured for A/B testing on Meta and LinkedIn.",
        },
      ]}
      relatedServices={[
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "High-retention 9:16 viral short-form video reels and motion graphics.",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Monolithic visual systems, marketing collateral, and publication design.",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Establish foundational brand guidelines, color palettes, and typography.",
        },
      ]}
    />
  );
}
