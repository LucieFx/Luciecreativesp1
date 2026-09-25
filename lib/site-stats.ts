/**
 * Global single source of truth for aggregate agency views and reach statistics.
 * Use this constant across the entire application to ensure consistency.
 */
export const SITE_STATS = {
  viewsNumber: 63,
  viewsCount: 63,
  viewsLabel: "63M+",
  viewsFullText: "63M+ Views",
  reachLabel: "+63M+ Aggregate Reach",
  metricLabel: "Aggregated Organic Audience Reach Across Client Campaigns",
} as const;

export const VIEWS_GENERATED = SITE_STATS.viewsLabel;
export const VIEWS_COUNT = SITE_STATS.viewsCount;
