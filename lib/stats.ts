/**
 * Single source of truth for Lucie Creatives verified agency statistics.
 *
 * TODO(needs-client-input): Confirm the real, audited numbers before production deploy!
 * - Home previously showed: 35+ brands elevated, 59+ apps & sites delivered, 84+ campaigns executed
 * - About previously showed: 50+ brands elevated, 120+ apps & sites delivered, 85+ campaigns executed
 * Do not average or guess between the two sets — verify with leadership before final launch.
 */
import { SITE_STATS } from "./site-stats";

export const AGENCY_STATS = {
  brandsElevated: 14,
  appsAndSitesDelivered: 12,
  campaignsExecuted: 5,
  viewsGenerated: SITE_STATS.viewsLabel,
} as const;

export interface AgencyStatItem {
  id: string;
  value: string;
  prefix: string;
  suffix: string;
  unit: string; // The descriptive unit directly accompanying the number (e.g. "Brands Elevated")
  subtext?: string;
}

export const AGENCY_STATS_LIST: AgencyStatItem[] = [
  {
    id: "brands",
    value: AGENCY_STATS.brandsElevated.toString(),
    prefix: "",
    suffix: "+",
    unit: "Brands Elevated",
    subtext: "Across SaaS, D2C & Tech",
  },
  {
    id: "projects",
    value: AGENCY_STATS.appsAndSitesDelivered.toString(),
    prefix: "",
    suffix: "+",
    unit: "Websites Delivered",
    subtext: "Next.js 15 & Cloud Architecture",
  },
  {
    id: "views",
    value: SITE_STATS.viewsNumber.toString(),
    prefix: "",
    suffix: "M+",
    unit: "Views Generated",
    subtext: "Organic Short-Form & Video",
  },
  {
    id: "campaigns",
    value: AGENCY_STATS.campaignsExecuted.toString(),
    prefix: "",
    suffix: "+",
    unit: "Campaigns Executed",
    subtext: "Full-Funnel Distribution",
  },
];
