"use client";

import React, { useMemo } from "react";
import { WorkProject, StatBreakItem } from "@/lib/work-data";
import { WorkHeroReel } from "./WorkHeroReel";
import { RotatingShortsShowcase } from "./RotatingShortsShowcase";
import { LongFormCinemaShowcase } from "./LongFormCinemaShowcase";
import { GraphicDesignShowcase } from "./GraphicDesignShowcase";
import { WorkStatBreak } from "./WorkStatBreak";
import { WorkClosingCta } from "./WorkClosingCta";

interface WorkPortfolioClientProps {
  initialProjects: WorkProject[];
  statBreak: StatBreakItem;
}

export function WorkPortfolioClient({
  initialProjects,
  statBreak,
}: WorkPortfolioClientProps) {
  const shortFormProjects = useMemo(
    () =>
      initialProjects.filter(
        (p) =>
          p.category === "Short Form Videos" ||
          p.aspectRatio === "9/16" ||
          Boolean(p.reelCategory) ||
          [
            "Luxury Real Estate",
            "Hospitality & Resort",
            "Founder Podcasts",
            "Interior Design",
            "Brand & D2C",
          ].includes(p.category as string)
      ),
    [initialProjects]
  );

  const longFormProjects = useMemo(
    () => initialProjects.filter((p) => p.category === "Long Form Videos"),
    [initialProjects]
  );

  const graphicDesignProjects = useMemo(
    () => initialProjects.filter((p) => p.category === "Graphic Design"),
    [initialProjects]
  );

  return (
    <>
      {/* 1. Full-Bleed Video Reel Hero with Section Navigation */}
      <WorkHeroReel />

      {/* 2. Short Form Videos: Interactive 3D Phone Reel Stage */}
      <RotatingShortsShowcase projects={shortFormProjects} />

      {/* Section B: Manifesto / Metric Stat Break */}
      <WorkStatBreak statBreak={statBreak} />

      {/* Section C: Long Form Cinema Commercials */}
      <LongFormCinemaShowcase projects={longFormProjects} />

      {/* Section D: Graphic Design & Identity Systems */}
      <GraphicDesignShowcase projects={graphicDesignProjects} />

      {/* 3. Full-Viewport Solid Maroon Closing Section */}
      <WorkClosingCta />
    </>
  );
}
