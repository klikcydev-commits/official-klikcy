import { getSitemapShardDefs } from "@/lib/sitemap-urls";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const shards = getSitemapShardDefs();

  const entries = shards
    .map(
      ({ id }) =>
        `  <sitemap>\n    <loc>${siteUrl}/sitemap/${encodeURIComponent(id)}.xml</loc>\n  </sitemap>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
