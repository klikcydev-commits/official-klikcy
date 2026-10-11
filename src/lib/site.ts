const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.klikcy.com";

export const SITE = {
  name: "Klikcy",
  url: String(siteUrl).replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "build@klikcy.com",
  logoPath: "/brand/klikcy-logo.png",
  description:
    "Klikcy is a remote-first web agency that builds websites, search visibility, AI automation, apps, and online stores for businesses across the United States.",
};

/**
 * Last date the site's content was materially reviewed. Used for sitemap <lastmod>
 * and WebPage dateModified. Update it when page copy actually changes — never on
 * every build, or Google learns to ignore it.
 */
export const CONTENT_UPDATED = "2026-10-10";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${SITE.url}/`;
  return `${SITE.url}${p.endsWith("/") ? p : `${p}/`}`;
}
