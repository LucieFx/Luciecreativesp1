import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SplitText } from "@/components/motion/SplitText";

function ScrollWordParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <p className={className}>{text}</p>;
}

export function AboutHero() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto select-none">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 dot-grid-pattern dot-grid-radial-mask pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </div>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-700 text-xs font-black tracking-widest uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-maroon-700" />
          <span>About Lucie Creatives</span>
        </div>

        {/* H1: A small team that sweats the details. */}
        <SplitText
          as="h1"
          className="font-black tracking-tight text-ink text-[clamp(2.5rem,6vw,5.6rem)] leading-[1.08] text-balance"
          accentClassName="font-serif italic text-maroon-700 font-normal underline decoration-maroon-300 underline-offset-8"
        >
          A small team that sweats the *details.*
        </SplitText>

        {/* Confident Point-of-View Statement */}
        <div className="max-w-3xl mx-auto space-y-5 text-base sm:text-xl md:text-2xl text-body font-normal sm:font-medium leading-relaxed text-pretty">
          <ScrollWordParagraph text="Most agencies operate the same way: sell a retainer, deliver the edits, move to the next client. They're rarely in the room when it's time to ask — did this actually work?" />
          <ScrollWordParagraph text="We are. Our clients don't come to us because they're short on budget. They come because they need a team that treats the work as their problem too — 4-5 people aligned with the vision, staying until the outcome shows up. Not random edits. Not a fancy reel that never converts. Not a vibe-coded site nobody measures." />
        </div>

        {/* Subtle Scroll Cue */}
        <div className="pt-8 flex items-center justify-center">
          <a
            href="#story"
            className="inline-flex items-center gap-2 text-xs font-black text-muted hover:text-maroon-700 transition-colors uppercase tracking-widest cursor-pointer group"
          >
            <span>Read Our Story</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
