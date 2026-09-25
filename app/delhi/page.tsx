import { Metadata } from "next";
import { LocationPageTemplate } from "@/components/seo/LocationPageTemplate";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/delhi"]);

export default function DelhiLocationPage() {
  return (
    <LocationPageTemplate
      locationName="Delhi"
      slug="delhi"
      parentRegion={{ name: "India", href: "/india" }}
      badge="NATIONAL CAPITAL REGION • SERVING DELHI"
      headlineRegular="Video Editing & Web Development"
      headlineItalic="Agency in Delhi"
      heroDescription="Lucie Creatives serves businesses in Delhi with precision-engineered creative and digital services. As India's political nerve center and a major commercial hub, Delhi's enterprises — from government-adjacent institutions and multinational headquarters to media conglomerates and EdTech pioneers — require authoritative, high-trust digital presences. We deliver high-performance web development, strategic graphic design, cinema-grade video editing, and enduring brand identity systems for businesses across Delhi and the NCR."
      marketContextTitle="WHY BUSINESSES IN DELHI PARTNER WITH US"
      marketContextSubtitle="Creative and digital execution calibrated for Delhi's institutional authority, media landscape, EdTech innovation, and multinational corporate presence."
      marketPillars={[
        {
          title: "Institutional & Corporate Web Infrastructure",
          description:
            "Delhi's corporate headquarters, government-adjacent institutions, and multinational offices require authoritative digital platforms. Our web development for businesses in Delhi delivers secure Next.js applications, multi-language portals, compliance-ready interfaces, and enterprise CMS solutions with sub-second performance.",
          tag: "Web Development",
        },
        {
          title: "Media, Publishing & EdTech Content Production",
          description:
            "We provide video editing and graphic design for Delhi's thriving media, publishing, and education technology sectors. From documentary-style corporate films and course platform UX to editorial layouts and high-retention social content, we produce material that commands audience attention across digital channels.",
          tag: "Content & Media",
        },
        {
          title: "Government, Diplomatic & CSR Brand Communication",
          description:
            "Delhi's proximity to policy and diplomatic institutions creates demand for precise, trustworthy brand communication. Our branding and graphic design services produce official identity systems, impact reports, CSR documentation, and multilingual communication materials engineered for institutional credibility.",
          tag: "Branding & Communication",
        },
      ]}
      services={[
        {
          name: "Web Development",
          href: "/web-development",
          description: "Enterprise Next.js web applications, multi-language portals, EdTech platforms, and high-security corporate infrastructure for Delhi businesses.",
          deliverable: "Enterprise Portals • Multi-language CMS • 95+ PageSpeed",
        },
        {
          name: "Video Editing",
          href: "/video-editing",
          description: "Corporate documentaries, EdTech course content, media interview packages, conference highlights, and high-retention social reels.",
          deliverable: "Documentary Films • EdTech Content • Social Reels",
        },
        {
          name: "Graphic Design",
          href: "/graphic-design",
          description: "Impact reports, CSR documentation, policy briefs, editorial layouts, advertising campaigns, and corporate presentation suites.",
          deliverable: "Impact Reports • Editorial Layouts • Ad Campaigns",
        },
        {
          name: "Logo Design",
          href: "/logo-design",
          description: "Authoritative corporate identity marks, institutional emblems, and complete brand identity packages with vector master deliverables.",
          deliverable: "Vector Master Suite • Institutional Marks • Guidelines",
        },
        {
          name: "Branding",
          href: "/branding",
          description: "Comprehensive corporate identity systems, institutional brand positioning, and multilingual brand guideline documentation.",
          deliverable: "Brand Identity Book • Institutional Guidelines • Tone of Voice",
        },
        {
          name: "UI/UX Design",
          href: "/ui-ux-design",
          description: "EdTech learning interfaces, enterprise dashboard systems, government portal UX, and accessible mobile-first design systems.",
          deliverable: "Figma Systems • Accessible UX • Interactive Prototypes",
        },
      ]}
      caseStudySlugs={[
        "vanguard-design-system",
        "vedam-villas-influencer-tour",
        "nirva-resort-cinema-commercial",
        "maruti-buildcon-construction-master",
      ]}
      faq={[
        {
          q: "How does Lucie Creatives serve businesses in Delhi and NCR?",
          a: "We serve businesses in Delhi and the wider NCR through our structured, remote-first sprint collaboration model. Each engagement includes dedicated communication channels on Slack and WhatsApp, weekly video strategy reviews, and live Figma and Frame.io workspaces for transparent iteration and signoff.",
        },
        {
          q: "What types of web development does Lucie Creatives provide for Delhi enterprises?",
          a: "We build custom Next.js and React web applications including enterprise portals, multi-language content management systems, EdTech learning platforms, and high-security institutional websites. Every project delivers sub-second load speeds, 95+ Lighthouse performance scores, and mobile-first responsive architecture.",
        },
        {
          q: "Can Lucie Creatives produce graphic design for institutional and government-adjacent brands in Delhi?",
          a: "Yes. Our graphic design services include impact reports, policy brief layouts, CSR documentation, annual reports, and institutional communication materials. We ensure multilingual typographic precision (English, Hindi, and other required languages) and production-ready print coordination.",
        },
        {
          q: "What video editing services are available for Delhi media and EdTech companies?",
          a: "We produce corporate documentary films, EdTech course video post-production, media interview packages, conference highlight reels, and high-retention social media content — all with DaVinci Resolve color grading, custom sound design, and audience retention optimization.",
        },
        {
          q: "Does Lucie Creatives have a physical office in Delhi?",
          a: "Lucie Creatives operates as a remote-first creative agency serving businesses in Delhi and across India. Our remote collaboration model provides direct founder-level oversight, structured sprint cycles, and sub-24-hour response times without requiring a physical office presence.",
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
          name: "Mumbai",
          href: "/mumbai",
          description: "Financial capital, entertainment industry, fashion commerce, and venture-funded startups.",
        },
        {
          name: "Bengaluru",
          href: "/bengaluru",
          description: "India's technology capital, SaaS unicorns, and deep-tech innovation.",
        },
      ]}
    />
  );
}
