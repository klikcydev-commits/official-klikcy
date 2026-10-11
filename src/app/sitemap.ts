import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { services } from "@/lib/services";
import { states } from "@/lib/states";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site";
import { isIndexable } from "@/lib/seo/indexing";
import { localMarkets } from "@/content/local-markets";

export const dynamic = "force-static";

/**
 * Only indexable pages belong here. lastModified is the real content review date
 * (CONTENT_UPDATED), not the build date — Google ignores lastmod on sites that fake it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string) => ({ url: absoluteUrl(path), lastModified: CONTENT_UPDATED });

  const urls: MetadataRoute.Sitemap = [];
  if (isIndexable("home")) urls.push(entry("/"));
  if (isIndexable("about")) urls.push(entry("/about"));
  if (isIndexable("contact")) urls.push(entry("/contact"));
  if (isIndexable("all-services")) urls.push(entry("/all-services"));
  if (isIndexable("category")) urls.push(...categories.map((c) => entry(`/categories/${c.slug}`)));
  if (isIndexable("service")) urls.push(...services.map((s) => entry(`/services/${s.slug}`)));
  if (isIndexable("service-areas")) urls.push(entry("/service-areas"));
  if (isIndexable("state")) urls.push(...states.map((s) => entry(`/service-areas/${s.slug}`)));
  // Hand-written priority markets are the only indexed city pages.
  urls.push(...localMarkets.map((m) => entry(`/service-areas/${m.state}/${m.city}`)));
  if (isIndexable("work")) urls.push(entry("/work"));
  if (isIndexable("privacy")) urls.push(entry("/privacy"));
  if (isIndexable("accessibility")) urls.push(entry("/accessibility"));
  return urls;
}
