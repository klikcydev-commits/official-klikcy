import type { MetadataRoute } from "next";
import { buildSitemapBucket, getSitemapBucketDefs } from "@/lib/sitemap-urls";

export async function generateSitemaps() {
  return getSitemapBucketDefs().map(({ id }) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  return buildSitemapBucket(id);
}
