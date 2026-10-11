import type { Metadata } from "next";
import type { SeoPayload } from "./metadata";

export function seoToMetadata(seo: SeoPayload): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    robots: {
      index: seo.robots.index,
      follow: seo.robots.follow,
      ...(seo.robots.index
        ? { googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
        : {}),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: "Klikcy",
      locale: "en_US",
      type: "website",
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: "Klikcy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
  };
}
