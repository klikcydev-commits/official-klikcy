/**
 * Old sitemap URL paths → canonical sitemap index.
 * Used by deploy/apply-sitemap-redirects.mjs and scripts/generate-htaccess.mjs
 *
 * Do NOT include new live sitemap chunks:
 * sitemap.xml, sitemap-static.xml, sitemap-services.xml, sitemap-areas.xml,
 * sitemap-service-state.xml, sitemap-service-state-city-{1,2,3}.xml, sitemap-full.xml
 */
export const OLD_SITEMAP_HTACCESS_RULES = [
  "RewriteRule ^sitemap/?$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^sitemap_index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^sitemap-index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^sitemap-[0-9]+\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^server-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^page-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^post-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^category-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^service-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^location-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^wp-sitemap(-.*)?\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
];

/** OpenLiteSpeed vhost rewriteRules (leading slash). */
export const OLD_SITEMAP_VHOST_RULES = [
  "RewriteRule ^/sitemap/?$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/sitemap_index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/sitemap-index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/sitemap-[0-9]+\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/server-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/page-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/post-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/category-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/service-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/location-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "RewriteRule ^/wp-sitemap(-.*)?\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]",
];

export const OLD_SITEMAP_PATHS = [
  "/sitemap",
  "/sitemap/",
  "/sitemap_index.xml",
  "/sitemap-index.xml",
  "/sitemap-0.xml",
  "/sitemap-1.xml",
  "/server-sitemap.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/category-sitemap.xml",
  "/service-sitemap.xml",
  "/location-sitemap.xml",
  "/wp-sitemap.xml",
  "/wp-sitemap-posts-page-1.xml",
  "/wp-sitemap-posts-post-1.xml",
];
