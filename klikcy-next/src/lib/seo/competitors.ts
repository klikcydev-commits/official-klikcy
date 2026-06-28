/**
 * Competitor research constants — full workflow documented in docs/seo/.
 * Do not scrape Google programmatically; use manual SERP exports or approved APIs.
 */

export const COMPETITOR_RESEARCH_PATHS = {
  guide: "docs/seo/competitor-keyword-research.md",
  priorityKeywords: "docs/seo/priority-market-keywords.md",
  csvTemplate: "docs/seo/competitor-research-template.csv",
} as const;

export const COMPETITOR_QUERY_GROUPS = [
  "web-development",
  "app-software",
  "ai-automation",
  "seo-aeo",
] as const;
