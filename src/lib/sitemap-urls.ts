import { categories } from "@/lib/categories";
import { getCitiesForState } from "@/lib/cities";
import { services } from "@/lib/services";
import { states } from "@/lib/states";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.klikcy.com"
).replace(/\/$/, "");

/** Match trailingSlash: true — canonical paths end with / except homepage. */
export function canonicalPath(pathname: string): string {
  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  return p;
}

export type SitemapBucketKind =
  | "static"
  | "services"
  | "areas"
  | "service-state"
  | "service-state-city";

const SERVICE_STATE_CITY_CHUNK = 5000;

function classifyPath(pathname: string): SitemapBucketKind {
  const bare = pathname.replace(/\/$/, "") || "/";
  if (
    bare === "/" ||
    bare === "/about" ||
    bare === "/contact" ||
    bare === "/service-areas"
  ) {
    return "static";
  }
  if (bare === "/all-services" || /^\/services\/[^/]+$/.test(bare) || /^\/categories\/[^/]+$/.test(bare)) {
    return "services";
  }
  if (/^\/service-areas\/[^/]+$/.test(bare) || /^\/service-areas\/[^/]+\/[^/]+$/.test(bare)) {
    return "areas";
  }
  if (/^\/[^/]+\/[^/]+$/.test(bare)) return "service-state";
  return "service-state-city";
}

/** Every indexable pathname (trailing slash, deduped). */
export function getAllSitemapPaths(): string[] {
  const paths = new Set<string>();
  const add = (pathname: string) => paths.add(canonicalPath(pathname));

  add("/");
  add("/about");
  add("/contact");
  add("/all-services");
  add("/service-areas");

  for (const category of categories) add(`/categories/${category.slug}`);
  for (const service of services) add(`/services/${service.slug}`);

  for (const state of states) {
    add(`/service-areas/${state.slug}`);
    for (const city of getCitiesForState(state)) {
      add(`/service-areas/${state.slug}/${city.slug}`);
    }
    for (const service of services) {
      add(`/${service.slug}/${state.slug}`);
      for (const city of getCitiesForState(state)) {
        add(`/${service.slug}/${state.slug}/${city.slug}`);
      }
    }
  }

  return Array.from(paths).sort();
}

export interface SitemapBucketDef {
  id: number;
  kind: SitemapBucketKind;
  chunk?: number;
}

export function getSitemapBucketDefs(): SitemapBucketDef[] {
  const grouped: Record<SitemapBucketKind, string[]> = {
    static: [],
    services: [],
    areas: [],
    "service-state": [],
    "service-state-city": [],
  };

  for (const path of getAllSitemapPaths()) {
    grouped[classifyPath(path)].push(path);
  }

  const defs: SitemapBucketDef[] = [];
  let id = 0;
  for (const kind of ["static", "services", "areas", "service-state"] as const) {
    if (grouped[kind].length) defs.push({ id: id++, kind });
  }

  const cityPaths = grouped["service-state-city"];
  const chunks = Math.max(1, Math.ceil(cityPaths.length / SERVICE_STATE_CITY_CHUNK));
  for (let chunk = 0; chunk < chunks; chunk += 1) {
    defs.push({ id: id++, kind: "service-state-city", chunk });
  }

  return defs;
}

function pathsForBucket(def: SitemapBucketDef): string[] {
  const grouped: Record<SitemapBucketKind, string[]> = {
    static: [],
    services: [],
    areas: [],
    "service-state": [],
    "service-state-city": [],
  };

  for (const path of getAllSitemapPaths()) {
    grouped[classifyPath(path)].push(path);
  }

  if (def.kind !== "service-state-city") return grouped[def.kind];

  const cityPaths = grouped["service-state-city"];
  const chunk = def.chunk ?? 0;
  const start = chunk * SERVICE_STATE_CITY_CHUNK;
  return cityPaths.slice(start, start + SERVICE_STATE_CITY_CHUNK);
}

export function buildSitemapEntries(): {
  url: string;
  lastModified?: Date;
  changeFrequency?: "weekly" | "monthly";
  priority?: number;
}[] {
  return getAllSitemapPaths().map((path) => entryForPath(path));
}

export function buildSitemapBucket(id: number): {
  url: string;
  lastModified?: Date;
  changeFrequency?: "weekly" | "monthly";
  priority?: number;
}[] {
  const def = getSitemapBucketDefs().find((b) => b.id === id);
  if (!def) return [];
  return pathsForBucket(def).map((path) => entryForPath(path));
}

function entryForPath(path: string) {
  const now = new Date();
  return {
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path.split("/").filter(Boolean).length <= 2 ? 0.8 : 0.6,
  };
}
