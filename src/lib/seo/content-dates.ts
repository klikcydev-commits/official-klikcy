/**
 * Source-of-truth content update dates (ISO YYYY-MM-DD).
 * Bump a date only when that content layer actually changed — never on every build.
 */
export const CONTENT_DATES = {
  /** Homepage hero, pillars, FAQ copy (`src/content/home.ts`) */
  homepage: "2026-06-15",
  /** About page copy (`src/content/about.ts`) */
  about: "2026-03-01",
  /** Contact page + contact API route */
  contact: "2026-06-28",
  /** All-services hub + full service catalog */
  allServices: "2026-06-01",
  serviceCatalog: "2026-06-01",
  /** Category definitions (`src/lib/categories.ts`) */
  categoryCatalog: "2026-05-15",
  /** State/city geo catalog (`src/lib/states.ts`, `src/lib/cities.ts`) */
  geoCatalog: "2026-04-01",
  /** Service-areas hub page */
  serviceAreasHub: "2026-04-01",
  /** GEO/AEO FAQ templates (`src/lib/geo-aeo-content.ts`) */
  geoFaqTemplate: "2026-06-28",
  /** GEO/AEO answer blocks (`src/lib/geo-aeo-content.ts`) */
  geoAeoTemplate: "2026-06-28",
  /** Title/description templates (`src/lib/metadata/page-metadata.ts`) */
  metadataTemplate: "2026-06-28",
} as const;

/** Per-service overrides — add slug → date when a single service page changes. */
export const SERVICE_UPDATED_AT: Record<string, string> = {};

/** Per-category overrides */
export const CATEGORY_UPDATED_AT: Record<string, string> = {};

/** Per-state overrides (priority markets with custom copy) */
export const STATE_UPDATED_AT: Record<string, string> = {
  "new-york": "2026-05-01",
  "new-jersey": "2026-05-01",
  connecticut: "2026-05-01",
  pennsylvania: "2026-05-01",
  california: "2026-04-15",
  texas: "2026-04-15",
  florida: "2026-04-15",
};

/** Per-city overrides — add only when city-specific content changes. */
export const CITY_UPDATED_AT: Record<string, string> = {
  "new-york:manhattan": "2026-05-01",
  "new-york:brooklyn": "2026-05-01",
  "california:los-angeles": "2026-04-20",
  "texas:houston": "2026-04-20",
};

export type ContentDateKey = keyof typeof CONTENT_DATES;
