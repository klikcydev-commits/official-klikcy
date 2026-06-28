import type { Metadata } from "next";
import type { SeoPayload } from "./metadata";

export function seoToMetadata(
  seo: SeoPayload,
  options?: { canonicalOverride?: string },
): Metadata {
  const canonical = options?.canonicalOverride ?? seo.canonical;
  const index = seo.robots?.index !== false;
  const follow = seo.robots?.follow !== false;

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
      siteName: "Klikcy",
      locale: "en_US",
      images: seo.ogImage ? [{ url: seo.ogImage, alt: "Klikcy" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    robots: {
      index,
      follow,
      ...(seo.robots?.googleBot ? { googleBot: seo.robots.googleBot } : {}),
    },
  };
}
