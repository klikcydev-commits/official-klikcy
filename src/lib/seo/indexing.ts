/**
 * Which page types search engines should index.
 *
 * The service × state, service × city, and city hub pages are generated from a
 * template and differ mostly by place name. Google's spam policies treat large
 * sets of near-identical location pages as doorway / scaled content, and that can
 * pull down rankings for the whole site. They stay live for visitors and pass link
 * equity (`follow`), but are kept out of the index and the sitemap.
 *
 * To index a specific location page later, give it genuinely local content first
 * (a real client, project, or team member there), then add it to an allowlist here.
 */
import { caseStudies } from "@/content/proof";

export type PageKind =
  | "home"
  | "about"
  | "contact"
  | "all-services"
  | "category"
  | "service"
  | "service-areas"
  | "state"
  | "city"
  | "service-state"
  | "service-city"
  | "work"
  | "privacy"
  | "accessibility"
  | "not-found";

const INDEXABLE: Record<PageKind, boolean> = {
  home: true,
  about: true,
  contact: true,
  "all-services": true,
  category: true,
  service: true,
  "service-areas": true,
  state: true,
  // Generic city hubs stay out of the index; hand-written markets in
  // src/content/local-markets.ts override this in getCityAreaSeo.
  city: false,
  "service-state": false,
  "service-city": false,
  // The work page only gets indexed once it shows at least one real case study.
  work: caseStudies.length > 0,
  privacy: true,
  accessibility: true,
  "not-found": false,
};

export function isIndexable(kind: PageKind): boolean {
  return INDEXABLE[kind];
}
