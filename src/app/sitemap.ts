import type { MetadataRoute } from "next";
import { buildSitemapShard, getSitemapShardDefs } from "@/lib/sitemap-urls";

export async function generateSitemaps() {
  return getSitemapShardDefs().map(({ id }) => ({ id }));
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  return buildSitemapShard(id);
}
