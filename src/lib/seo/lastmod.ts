import { getCity, getCitiesForState } from "@/lib/cities";
import { categories } from "@/lib/categories";
import { services } from "@/lib/services";
import { states } from "@/lib/states";
import {
  CATEGORY_UPDATED_AT,
  CITY_UPDATED_AT,
  CONTENT_DATES,
  SERVICE_UPDATED_AT,
  STATE_UPDATED_AT,
} from "./content-dates";

export type LastmodSource =
  | "homepage"
  | "about"
  | "contact"
  | "all-services"
  | "service-areas"
  | "category"
  | "service"
  | "state"
  | "city"
  | "service-state"
  | "service-city";

export interface LastmodResult {
  date: Date;
  iso: string;
  source: LastmodSource;
  /** True when date comes from a page-specific override, not a catalog fallback. */
  pageSpecific: boolean;
  /** Human-readable reason for audits */
  reason: string;
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Parse YYYY-MM-DD as UTC midnight — stable across timezones and builds. */
export function parseContentDate(iso: string): Date {
  if (!ISO_DAY.test(iso)) {
    throw new Error(`Invalid content date (expected YYYY-MM-DD): ${iso}`);
  }
  return new Date(`${iso}T00:00:00.000Z`);
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function maxContentDates(...isos: string[]): string {
  return isos.reduce((latest, d) => (d > latest ? d : latest));
}

export function getServiceUpdatedAt(slug: string): string {
  return SERVICE_UPDATED_AT[slug] ?? CONTENT_DATES.serviceCatalog;
}

export function getCategoryUpdatedAt(slug: string): string {
  return CATEGORY_UPDATED_AT[slug] ?? CONTENT_DATES.categoryCatalog;
}

export function getStateUpdatedAt(slug: string): string {
  return STATE_UPDATED_AT[slug] ?? CONTENT_DATES.geoCatalog;
}

export function getCityUpdatedAt(stateSlug: string, citySlug: string): string {
  const key = `${stateSlug}:${citySlug}`;
  return CITY_UPDATED_AT[key] ?? getStateUpdatedAt(stateSlug);
}

function result(iso: string, source: LastmodSource, pageSpecific: boolean, reason: string): LastmodResult {
  const date = parseContentDate(iso);
  return { date, iso, source, pageSpecific, reason };
}

/**
 * Deterministic lastModified for a canonical pathname (trailing slash, e.g. `/about/`).
 * Does not use `new Date()` or build timestamps.
 */
export function lastModifiedForPath(pathname: string): LastmodResult {
  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  const bare = p.replace(/\/$/, "") || "/";

  if (bare === "/") {
    return result(CONTENT_DATES.homepage, "homepage", false, "homepage content catalog");
  }
  if (bare === "/about") {
    return result(CONTENT_DATES.about, "about", false, "about content catalog");
  }
  if (bare === "/contact") {
    return result(CONTENT_DATES.contact, "contact", false, "contact page + API");
  }
  if (bare === "/all-services") {
    return result(
      maxContentDates(CONTENT_DATES.allServices, CONTENT_DATES.serviceCatalog),
      "all-services",
      false,
      "service catalog",
    );
  }
  if (bare === "/service-areas") {
    return result(CONTENT_DATES.serviceAreasHub, "service-areas", false, "service areas hub");
  }

  const categoryMatch = bare.match(/^\/categories\/([^/]+)$/);
  if (categoryMatch) {
    const slug = categoryMatch[1];
    const iso = getCategoryUpdatedAt(slug);
    const pageSpecific = Boolean(CATEGORY_UPDATED_AT[slug]);
    return result(
      iso,
      "category",
      pageSpecific,
      pageSpecific ? `category override: ${slug}` : "category catalog",
    );
  }

  const serviceMatch = bare.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const iso = getServiceUpdatedAt(slug);
    const pageSpecific = Boolean(SERVICE_UPDATED_AT[slug]);
    return result(
      iso,
      "service",
      pageSpecific,
      pageSpecific ? `service override: ${slug}` : "service catalog",
    );
  }

  const cityAreaMatch = bare.match(/^\/service-areas\/([^/]+)\/([^/]+)$/);
  if (cityAreaMatch) {
    const [, stateSlug, citySlug] = cityAreaMatch;
    const cityIso = getCityUpdatedAt(stateSlug, citySlug);
    const pageSpecific = Boolean(CITY_UPDATED_AT[`${stateSlug}:${citySlug}`]);
    const iso = maxContentDates(
      cityIso,
      getStateUpdatedAt(stateSlug),
      CONTENT_DATES.geoCatalog,
      CONTENT_DATES.geoFaqTemplate,
      CONTENT_DATES.geoAeoTemplate,
    );
    return result(
      iso,
      "city",
      pageSpecific,
      pageSpecific ? `city override: ${stateSlug}/${citySlug}` : "city/state geo + GEO FAQ/AEO templates",
    );
  }

  const stateAreaMatch = bare.match(/^\/service-areas\/([^/]+)$/);
  if (stateAreaMatch) {
    const stateSlug = stateAreaMatch[1];
    const stateIso = getStateUpdatedAt(stateSlug);
    const pageSpecific = Boolean(STATE_UPDATED_AT[stateSlug]);
    const iso = maxContentDates(
      stateIso,
      CONTENT_DATES.geoCatalog,
      CONTENT_DATES.geoFaqTemplate,
      CONTENT_DATES.geoAeoTemplate,
    );
    return result(
      iso,
      "state",
      pageSpecific,
      pageSpecific ? `state override: ${stateSlug}` : "state geo + GEO FAQ/AEO templates",
    );
  }

  const serviceCityMatch = bare.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (serviceCityMatch) {
    const [, serviceSlug, stateSlug, citySlug] = serviceCityMatch;
    const serviceIso = getServiceUpdatedAt(serviceSlug);
    const cityIso = getCityUpdatedAt(stateSlug, citySlug);
    const stateIso = getStateUpdatedAt(stateSlug);
    const pageSpecific =
      Boolean(SERVICE_UPDATED_AT[serviceSlug]) ||
      Boolean(STATE_UPDATED_AT[stateSlug]) ||
      Boolean(CITY_UPDATED_AT[`${stateSlug}:${citySlug}`]);
    const iso = maxContentDates(
      serviceIso,
      cityIso,
      stateIso,
      CONTENT_DATES.geoFaqTemplate,
      CONTENT_DATES.geoAeoTemplate,
      CONTENT_DATES.metadataTemplate,
    );
    return result(
      iso,
      "service-city",
      pageSpecific,
      pageSpecific
        ? `service/state/city override for ${serviceSlug}/${stateSlug}/${citySlug}`
        : "service + geo + GEO FAQ/AEO templates",
    );
  }

  const serviceStateMatch = bare.match(/^\/([^/]+)\/([^/]+)$/);
  if (serviceStateMatch) {
    const [, serviceSlug, stateSlug] = serviceStateMatch;
    const serviceIso = getServiceUpdatedAt(serviceSlug);
    const stateIso = getStateUpdatedAt(stateSlug);
    const pageSpecific = Boolean(SERVICE_UPDATED_AT[serviceSlug]) || Boolean(STATE_UPDATED_AT[stateSlug]);
    const iso = maxContentDates(
      serviceIso,
      stateIso,
      CONTENT_DATES.geoFaqTemplate,
      CONTENT_DATES.geoAeoTemplate,
      CONTENT_DATES.metadataTemplate,
    );
    return result(
      iso,
      "service-state",
      pageSpecific,
      pageSpecific
        ? `service/state override for ${serviceSlug}/${stateSlug}`
        : "service + state geo + GEO FAQ/AEO templates",
    );
  }

  return result(CONTENT_DATES.metadataTemplate, "homepage", false, "fallback metadata template");
}

/** ISO date string for JSON-LD `dateModified` — matches sitemap lastModified. */
export function dateModifiedForPath(pathname: string): string {
  return lastModifiedForPath(pathname).iso;
}

export function dateModifiedForCanonical(canonicalUrl: string): string {
  try {
    return lastModifiedForPath(new URL(canonicalUrl).pathname).iso;
  } catch {
    return lastModifiedForPath(canonicalUrl.startsWith("/") ? canonicalUrl : `/${canonicalUrl}`).iso;
  }
}

export interface LastmodReport {
  generatedAt: string;
  totalUrls: number;
  uniqueLastModifiedDates: number;
  urlsByDate: Record<string, number>;
  bySource: Record<LastmodSource, number>;
  pageSpecificCount: number;
  fallbackCount: number;
  invalidDates: string[];
  futureDates: string[];
  warnings: string[];
  sampleUrlsByDate: Record<string, string[]>;
}

export function buildLastmodReport(paths: string[]): LastmodReport {
  const today = formatIsoDate(new Date());
  const urlsByDate: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const sampleUrlsByDate: Record<string, string[]> = {};
  let pageSpecificCount = 0;
  let fallbackCount = 0;
  const invalidDates: string[] = [];
  const futureDates: string[] = [];
  const warnings: string[] = [];

  for (const path of paths) {
    const lm = lastModifiedForPath(path);
    urlsByDate[lm.iso] = (urlsByDate[lm.iso] ?? 0) + 1;
    bySource[lm.source] = (bySource[lm.source] ?? 0) + 1;
    if (lm.pageSpecific) pageSpecificCount += 1;
    else fallbackCount += 1;

    if (!ISO_DAY.test(lm.iso)) invalidDates.push(`${path} → ${lm.iso}`);
    if (lm.iso > today) futureDates.push(`${path} → ${lm.iso}`);

    if (!sampleUrlsByDate[lm.iso]) sampleUrlsByDate[lm.iso] = [];
    if (sampleUrlsByDate[lm.iso].length < 3) sampleUrlsByDate[lm.iso].push(path);
  }

  const uniqueDates = Object.keys(urlsByDate).length;
  const maxShare = Math.max(...Object.values(urlsByDate));
  const maxSharePct = (maxShare / paths.length) * 100;

  if (uniqueDates <= 1) {
    warnings.push("All URLs share a single lastModified date.");
  }
  if (maxSharePct > 90) {
    warnings.push(
      `${maxSharePct.toFixed(1)}% of URLs (${maxShare}) share one lastModified date (${Object.entries(urlsByDate).find(([, c]) => c === maxShare)?.[0]}).`,
    );
  }

  return {
    generatedAt: new Date().toISOString(),
    totalUrls: paths.length,
    uniqueLastModifiedDates: uniqueDates,
    urlsByDate,
    bySource: bySource as Record<LastmodSource, number>,
    pageSpecificCount,
    fallbackCount,
    invalidDates,
    futureDates,
    warnings,
    sampleUrlsByDate,
  };
}

/** Verify catalog slugs resolve (dev/validate sanity). */
export function assertCatalogIntegrity(): void {
  for (const s of services) getServiceUpdatedAt(s.slug);
  for (const c of categories) getCategoryUpdatedAt(c.slug);
  for (const st of states) {
    getStateUpdatedAt(st.slug);
    for (const city of getCitiesForState(st)) {
      getCityUpdatedAt(st.slug, city.slug);
      if (!getCity(st.slug, city.slug)) {
        throw new Error(`City not found: ${st.slug}/${city.slug}`);
      }
    }
  }
}
