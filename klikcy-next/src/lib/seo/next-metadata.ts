import type { Metadata } from "next";
import type { SeoPayload } from "./metadata";

function robotsToString(robots?: SeoPayload["robots"]): string | undefined {
  if (!robots) return undefined;
  const index = robots.index !== false ? "index" : "noindex";
  const follow = robots.follow !== false ? "follow" : "nofollow";
  const base = `${index}, ${follow}`;
  return robots.googleBot ? `${base}, ${robots.googleBot}` : base;
}

export function seoToMetadata(
  seo: SeoPayload,
  options?: { canonicalOverride?: string },
): Metadata {
  const canonical = options?.canonicalOverride ?? seo.canonical;
  const robots = robotsToString(seo.robots);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.slice(0, 20),
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      type: "website",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    ...(robots ? { robots } : {}),
  };
}
