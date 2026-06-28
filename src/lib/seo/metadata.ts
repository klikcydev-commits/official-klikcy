import { SITE } from "../schema";

export interface SeoRobots {
  index?: boolean;
  follow?: boolean;
  googleBot?: string;
}

export interface SeoPayload {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  aeoQuestions?: string[];
  geoTerms?: string[];
  ogImage?: string;
  robots?: SeoRobots;
  jsonLd?: object[];
}

export const DEFAULT_OG_IMAGE = `${SITE.url}/icon-512.png`;

export const DEFAULT_ROBOTS: SeoRobots = { index: true, follow: true };

export const NOINDEX_ROBOTS: SeoRobots = { index: false, follow: true };

export function canonicalPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${SITE.url}/`;
  return `${SITE.url}${p.endsWith("/") ? p : `${p}/`}`;
}
