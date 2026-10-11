import { SITE, absoluteUrl } from "../site";

export interface SeoRobots {
  index: boolean;
  follow: boolean;
}

export interface SeoPayload {
  title: string;
  description: string;
  canonical: string;
  robots: SeoRobots;
  ogImage: string;
  jsonLd?: object;
}

export const DEFAULT_OG_IMAGE = `${SITE.url}/og-image.png`;

export const INDEX_ROBOTS: SeoRobots = { index: true, follow: true };
export const NOINDEX_ROBOTS: SeoRobots = { index: false, follow: true };

/** Kept for existing imports; prefer `absoluteUrl` from `@/lib/site`. */
export const canonicalPath = absoluteUrl;
