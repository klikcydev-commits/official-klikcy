import { lastModifiedForPath } from "@/lib/seo/lastmod";
import { categories } from "@/lib/categories";
import { getCitiesForState } from "@/lib/cities";
import { getService, services } from "@/lib/services";
import { states } from "@/lib/states";
import { isIndexable } from "@/lib/seo/indexable";

import { getSiteUrl } from "@/lib/site-url";

/** @deprecated Use getSiteUrl() */
export const SITE_URL = getSiteUrl();

/** Match trailingSlash: true — canonical paths end with / except homepage uses `/` only. */
export function canonicalPath(pathname: string): string {
  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  return p;
}

export type SitemapShardKind = "static" | "areas" | "service";

export interface SitemapShardDef {
  id: string;
  kind: SitemapShardKind;
  serviceSlug?: string;
}

const STATIC_PATHS = ["/", "/about/", "/contact/", "/all-services/"];

/** Every indexable pathname (trailing slash, deduped). */
export function getAllSitemapPaths(): string[] {
  const paths = new Set<string>();
  const add = (pathname: string) => paths.add(canonicalPath(pathname));

  for (const path of STATIC_PATHS) add(path);
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
        const path = `/${service.slug}/${state.slug}/${city.slug}`;
        if (!isIndexable(service.slug, state.slug, city.slug)) continue;
        add(path);
      }
    }
  }

  return Array.from(paths).sort();
}

export function getSitemapShardDefs(): SitemapShardDef[] {
  const defs: SitemapShardDef[] = [
    { id: "static", kind: "static" },
    { id: "areas", kind: "areas" },
    ...services.map((service) => ({
      id: service.slug,
      kind: "service" as const,
      serviceSlug: service.slug,
    })),
  ];
  return defs;
}

function pathsForShard(def: SitemapShardDef): string[] {
  if (def.kind === "static") {
    const paths: string[] = [...STATIC_PATHS];
    for (const category of categories) paths.push(canonicalPath(`/categories/${category.slug}`));
    for (const service of services) paths.push(canonicalPath(`/services/${service.slug}`));
    return paths.sort();
  }

  if (def.kind === "areas") {
    const paths: string[] = [canonicalPath("/service-areas")];
    for (const state of states) {
      paths.push(canonicalPath(`/service-areas/${state.slug}`));
      for (const city of getCitiesForState(state)) {
        paths.push(canonicalPath(`/service-areas/${state.slug}/${city.slug}`));
      }
    }
    return paths.sort();
  }

  const serviceSlug = def.serviceSlug ?? def.id;
  if (!getService(serviceSlug)) return [];

  const paths: string[] = [];
  for (const state of states) {
    paths.push(canonicalPath(`/${serviceSlug}/${state.slug}`));
    for (const city of getCitiesForState(state)) {
      paths.push(canonicalPath(`/${serviceSlug}/${state.slug}/${city.slug}`));
    }
  }
  return paths.sort();
}

export function buildSitemapEntries(): {
  url: string;
  lastModified?: Date;
  changeFrequency?: "weekly" | "monthly";
  priority?: number;
}[] {
  return getAllSitemapPaths().map((path) => entryForPath(path));
}

export function buildSitemapShard(id: string): {
  url: string;
  lastModified?: Date;
  changeFrequency?: "weekly" | "monthly";
  priority?: number;
}[] {
  const def = getSitemapShardDefs().find((shard) => shard.id === id);
  if (!def) return [];
  return pathsForShard(def).map((path) => entryForPath(path));
}

/** @deprecated Use getSitemapShardDefs — legacy numeric bucket API removed. */
export function getSitemapBucketDefs(): SitemapShardDef[] {
  return getSitemapShardDefs();
}

/** @deprecated Use buildSitemapShard. */
export function buildSitemapBucket(id: number | string): ReturnType<typeof buildSitemapShard> {
  return buildSitemapShard(String(id));
}

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 1) return 0.8;
  if (segments.length === 2) return 0.7;
  return 0.5;
}

function entryForPath(path: string) {
  const { date } = lastModifiedForPath(path);
  return {
    url: `${getSiteUrl()}${path}`,
    lastModified: date,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: priorityForPath(path),
  };
}

/** Assert shard sizes stay within sitemap protocol limits. */
export function assertShardLimits(): void {
  const maxUrls = 50_000;
  for (const def of getSitemapShardDefs()) {
    const count = pathsForShard(def).length;
    if (count > maxUrls) {
      throw new Error(`Sitemap shard "${def.id}" exceeds ${maxUrls} URLs (${count})`);
    }
  }
}
