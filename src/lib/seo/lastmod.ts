import { getCity, getCitiesForState } from "@/lib/cities";
import { categories } from "@/lib/categories";
import { services } from "@/lib/services";
import { states } from "@/lib/states";
import {
  CATEGORY_UPDATED_AT,
  CITY_UPDATED_AT,
  CONTENT_DATES,
  getAllKnownContentDates,
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
  /** Catalog keys / override labels that determined the winning date */
  contributingSources: string[];
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

type DateCandidate = { iso: string; label: string };

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

/** Pick max ISO and record which source labels tied for that date. */
export function resolveMaxDate(candidates: DateCandidate[]): { iso: string; contributingSources: string[] } {
  if (candidates.length === 0) {
    throw new Error("resolveMaxDate requires at least one candidate");
  }
  const iso = candidates.reduce((best, c) => (c.iso > best ? c.iso : best), candidates[0].iso);
  const contributingSources = candidates.filter((c) => c.iso === iso).map((c) => c.label);
  return { iso, contributingSources };
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

function buildResult(
  candidates: DateCandidate[],
  source: LastmodSource,
  pageSpecific: boolean,
  reason: string,
): LastmodResult {
  const { iso, contributingSources } = resolveMaxDate(candidates);
  return {
    date: parseContentDate(iso),
    iso,
    source,
    pageSpecific,
    reason,
    contributingSources,
  };
}

function catalog(label: keyof typeof CONTENT_DATES): DateCandidate {
  return { iso: CONTENT_DATES[label], label: `catalog:${label}` };
}

function override(iso: string, label: string): DateCandidate {
  return { iso, label: `override:${label}` };
}

/**
 * Deterministic lastModified for a canonical pathname (trailing slash, e.g. `/about/`).
 * Never uses `new Date()` or build timestamps for page dates.
 */
export function lastModifiedForPath(pathname: string): LastmodResult {
  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  const bare = p.replace(/\/$/, "") || "/";

  if (bare === "/") {
    return buildResult([catalog("homepage")], "homepage", false, "homepage content catalog");
  }
  if (bare === "/about") {
    return buildResult([catalog("about")], "about", false, "about content catalog");
  }
  if (bare === "/contact") {
    return buildResult([catalog("contact")], "contact", false, "contact page + API");
  }
  if (bare === "/all-services") {
    return buildResult(
      [catalog("allServices"), catalog("serviceCatalog")],
      "all-services",
      false,
      "all-services hub + service catalog",
    );
  }
  if (bare === "/service-areas") {
    return buildResult([catalog("serviceAreasHub")], "service-areas", false, "service areas hub");
  }

  const categoryMatch = bare.match(/^\/categories\/([^/]+)$/);
  if (categoryMatch) {
    const slug = categoryMatch[1];
    const candidates: DateCandidate[] = [
      catalog("categoryCatalog"),
      catalog("categoryFaqTemplate"),
      catalog("metadataTemplate"),
    ];
    if (CATEGORY_UPDATED_AT[slug]) {
      candidates.unshift(override(CATEGORY_UPDATED_AT[slug], `category:${slug}`));
    }
    return buildResult(
      candidates,
      "category",
      Boolean(CATEGORY_UPDATED_AT[slug]),
      CATEGORY_UPDATED_AT[slug] ? `category override: ${slug}` : "category catalog + category FAQ template",
    );
  }

  const serviceMatch = bare.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const candidates: DateCandidate[] = [
      { iso: getServiceUpdatedAt(slug), label: SERVICE_UPDATED_AT[slug] ? `override:service:${slug}` : "catalog:serviceCatalog" },
      catalog("serviceFaqTemplate"),
      catalog("metadataTemplate"),
    ];
    return buildResult(
      candidates,
      "service",
      Boolean(SERVICE_UPDATED_AT[slug]),
      SERVICE_UPDATED_AT[slug] ? `service override: ${slug}` : "service catalog + service FAQ template",
    );
  }

  const cityAreaMatch = bare.match(/^\/service-areas\/([^/]+)\/([^/]+)$/);
  if (cityAreaMatch) {
    const [, stateSlug, citySlug] = cityAreaMatch;
    const cityKey = `${stateSlug}:${citySlug}`;
    const candidates: DateCandidate[] = [
      { iso: getCityUpdatedAt(stateSlug, citySlug), label: CITY_UPDATED_AT[cityKey] ? `override:city:${cityKey}` : `fallback:state:${stateSlug}` },
      { iso: getStateUpdatedAt(stateSlug), label: STATE_UPDATED_AT[stateSlug] ? `override:state:${stateSlug}` : "catalog:geoCatalog" },
      catalog("geoCatalog"),
      catalog("geoFaqTemplate"),
      catalog("geoAeoTemplate"),
      catalog("metadataTemplate"),
    ];
    return buildResult(
      candidates,
      "city",
      Boolean(CITY_UPDATED_AT[cityKey]) || Boolean(STATE_UPDATED_AT[stateSlug]),
      CITY_UPDATED_AT[cityKey]
        ? `city override: ${cityKey}`
        : STATE_UPDATED_AT[stateSlug]
          ? `state override: ${stateSlug}`
          : "city/state geo + GEO FAQ/AEO templates",
    );
  }

  const stateAreaMatch = bare.match(/^\/service-areas\/([^/]+)$/);
  if (stateAreaMatch) {
    const stateSlug = stateAreaMatch[1];
    const candidates: DateCandidate[] = [
      { iso: getStateUpdatedAt(stateSlug), label: STATE_UPDATED_AT[stateSlug] ? `override:state:${stateSlug}` : "catalog:geoCatalog" },
      catalog("geoCatalog"),
      catalog("geoFaqTemplate"),
      catalog("geoAeoTemplate"),
      catalog("metadataTemplate"),
    ];
    return buildResult(
      candidates,
      "state",
      Boolean(STATE_UPDATED_AT[stateSlug]),
      STATE_UPDATED_AT[stateSlug] ? `state override: ${stateSlug}` : "state geo + GEO FAQ/AEO templates",
    );
  }

  const serviceCityMatch = bare.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (serviceCityMatch) {
    const [, serviceSlug, stateSlug, citySlug] = serviceCityMatch;
    const cityKey = `${stateSlug}:${citySlug}`;
    const candidates: DateCandidate[] = [
      { iso: getServiceUpdatedAt(serviceSlug), label: SERVICE_UPDATED_AT[serviceSlug] ? `override:service:${serviceSlug}` : "catalog:serviceCatalog" },
      { iso: getCityUpdatedAt(stateSlug, citySlug), label: CITY_UPDATED_AT[cityKey] ? `override:city:${cityKey}` : `fallback:state:${stateSlug}` },
      { iso: getStateUpdatedAt(stateSlug), label: STATE_UPDATED_AT[stateSlug] ? `override:state:${stateSlug}` : "catalog:geoCatalog" },
      catalog("serviceCatalog"),
      catalog("geoCatalog"),
      catalog("geoFaqTemplate"),
      catalog("geoAeoTemplate"),
      catalog("metadataTemplate"),
    ];
    const pageSpecific =
      Boolean(SERVICE_UPDATED_AT[serviceSlug]) ||
      Boolean(STATE_UPDATED_AT[stateSlug]) ||
      Boolean(CITY_UPDATED_AT[cityKey]);
    return buildResult(
      candidates,
      "service-city",
      pageSpecific,
      pageSpecific
        ? `service/state/city override for ${serviceSlug}/${stateSlug}/${citySlug}`
        : "service + geo catalog + GEO FAQ/AEO/metadata templates",
    );
  }

  const serviceStateMatch = bare.match(/^\/([^/]+)\/([^/]+)$/);
  if (serviceStateMatch) {
    const [, serviceSlug, stateSlug] = serviceStateMatch;
    const candidates: DateCandidate[] = [
      { iso: getServiceUpdatedAt(serviceSlug), label: SERVICE_UPDATED_AT[serviceSlug] ? `override:service:${serviceSlug}` : "catalog:serviceCatalog" },
      { iso: getStateUpdatedAt(stateSlug), label: STATE_UPDATED_AT[stateSlug] ? `override:state:${stateSlug}` : "catalog:geoCatalog" },
      catalog("serviceCatalog"),
      catalog("geoCatalog"),
      catalog("geoFaqTemplate"),
      catalog("geoAeoTemplate"),
      catalog("metadataTemplate"),
    ];
    const pageSpecific = Boolean(SERVICE_UPDATED_AT[serviceSlug]) || Boolean(STATE_UPDATED_AT[stateSlug]);
    return buildResult(
      candidates,
      "service-state",
      pageSpecific,
      pageSpecific
        ? `service/state override for ${serviceSlug}/${stateSlug}`
        : "service + geo catalog + GEO FAQ/AEO/metadata templates",
    );
  }

  return buildResult([catalog("metadataTemplate")], "homepage", false, "fallback metadata template");
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

export interface DateGroupReport {
  count: number;
  contributingSources: Record<string, number>;
  samplePaths: string[];
  reasons: string[];
}

export interface LastmodReport {
  generatedAt: string;
  auditBuildDate: string;
  totalUrls: number;
  uniqueLastModifiedDates: number;
  urlsByDate: Record<string, number>;
  datesBySource: Record<string, DateGroupReport>;
  bySource: Record<LastmodSource, number>;
  pageSpecificCount: number;
  fallbackCount: number;
  knownCatalogDates: string[];
  invalidDates: string[];
  futureDates: string[];
  suspiciousDates: string[];
  buildDateLeakage: string[];
  missingLastmod: string[];
  warnings: string[];
  sampleUrlsByDate: Record<string, string[]>;
}

export function buildLastmodReport(paths: string[]): LastmodReport {
  const auditBuildDate = formatIsoDate(new Date());
  const knownCatalogDates = Array.from(getAllKnownContentDates()).sort();
  const knownSet = getAllKnownContentDates();

  const urlsByDate: Record<string, number> = {};
  const datesBySource: Record<string, DateGroupReport> = {};
  const bySource: Record<string, number> = {};
  const sampleUrlsByDate: Record<string, string[]> = {};
  let pageSpecificCount = 0;
  let fallbackCount = 0;
  const invalidDates: string[] = [];
  const futureDates: string[] = [];
  const suspiciousDates = new Set<string>();
  const buildDateLeakage: string[] = [];
  const missingLastmod: string[] = [];
  const warnings: string[] = [];

  for (const path of paths) {
    const lm = lastModifiedForPath(path);

    if (!lm.iso) {
      missingLastmod.push(path);
      continue;
    }

    urlsByDate[lm.iso] = (urlsByDate[lm.iso] ?? 0) + 1;
    bySource[lm.source] = (bySource[lm.source] ?? 0) + 1;
    if (lm.pageSpecific) pageSpecificCount += 1;
    else fallbackCount += 1;

    if (!ISO_DAY.test(lm.iso)) invalidDates.push(`${path} → ${lm.iso}`);
    if (lm.iso > auditBuildDate) futureDates.push(`${path} → ${lm.iso}`);

    if (!knownSet.has(lm.iso)) {
      suspiciousDates.add(lm.iso);
    }
    if (lm.iso === auditBuildDate && !knownSet.has(lm.iso)) {
      buildDateLeakage.push(`${path} → ${lm.iso} (matches build date but not in catalog)`);
    }

    if (!datesBySource[lm.iso]) {
      datesBySource[lm.iso] = { count: 0, contributingSources: {}, samplePaths: [], reasons: [] };
    }
    const group = datesBySource[lm.iso];
    group.count += 1;
    for (const src of lm.contributingSources) {
      group.contributingSources[src] = (group.contributingSources[src] ?? 0) + 1;
    }
    if (group.samplePaths.length < 5) group.samplePaths.push(path);
    if (!group.reasons.includes(lm.reason) && group.reasons.length < 8) {
      group.reasons.push(lm.reason);
    }

    if (!sampleUrlsByDate[lm.iso]) sampleUrlsByDate[lm.iso] = [];
    if (sampleUrlsByDate[lm.iso].length < 3) sampleUrlsByDate[lm.iso].push(path);
  }

  const uniqueDates = Object.keys(urlsByDate).length;
  const maxShare = Math.max(...Object.values(urlsByDate));
  const maxSharePct = paths.length > 0 ? (maxShare / paths.length) * 100 : 0;

  if (uniqueDates <= 1) {
    warnings.push("All URLs share a single lastModified date (acceptable if one catalog layer updated all pages).");
  }
  if (maxSharePct > 95) {
    const dominantDate = Object.entries(urlsByDate).find(([, c]) => c === maxShare)?.[0];
    warnings.push(
      `${maxSharePct.toFixed(1)}% of URLs (${maxShare}) share lastModified ${dominantDate} — verify this reflects a real template/catalog update.`,
    );
  }

  if (buildDateLeakage.length > 0) {
    warnings.push(`${buildDateLeakage.length} URL(s) use build date without a matching catalog entry.`);
  }

  return {
    generatedAt: new Date().toISOString(),
    auditBuildDate,
    totalUrls: paths.length,
    uniqueLastModifiedDates: uniqueDates,
    urlsByDate,
    datesBySource,
    bySource: bySource as Record<LastmodSource, number>,
    pageSpecificCount,
    fallbackCount,
    knownCatalogDates,
    invalidDates,
    futureDates,
    suspiciousDates: Array.from(suspiciousDates).sort(),
    buildDateLeakage,
    missingLastmod,
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

/** True when two sequential runs produce identical lastmod for every path. */
export function lastmodIsDeterministic(paths: string[]): boolean {
  const first = paths.map((p) => lastModifiedForPath(p).iso).join("\n");
  const second = paths.map((p) => lastModifiedForPath(p).iso).join("\n");
  return first === second;
}
