/** Canonical site origin without trailing slash. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.klikcy.com"
  ).replace(/\/$/, "");
}
