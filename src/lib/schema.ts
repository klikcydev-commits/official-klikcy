const siteUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://www.klikcy.com";

export const SITE = {
  name: "Klikcy",
  url: String(siteUrl).replace(/\/$/, ""),
  description:
    "Klikcy is a U.S. digital agency for web development, app and SaaS development, AI automation, e-commerce, branding, and search visibility (SEO, AEO, GEO) for businesses nationwide.",
};

export type FaqItem = { q: string; a: string };

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: [],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/all-services?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const webPageSchema = (page: { name: string; url: string; description?: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: page.name,
  url: page.url,
  description: page.description,
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
});

export const aboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${SITE.name}`,
  url: `${SITE.url}/about`,
  description: SITE.description,
  mainEntity: { "@type": "Organization", name: SITE.name, url: SITE.url },
});

export const contactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE.name}`,
  url: `${SITE.url}/contact`,
  description: "Contact Klikcy for web development, apps, software, AI automation, and digital growth projects.",
});

export const collectionPageSchema = (page: { name: string; description: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: page.name,
  description: page.description,
  url: page.url,
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const serviceSchema = (s: {
  name: string;
  shortDescription?: string;
  description?: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description || s.shortDescription || "",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${SITE.url}/services/${s.slug}`,
});

export interface AreaServedInput {
  stateName: string;
  stateSlug: string;
  cityName?: string;
  citySlug?: string;
}

export const serviceSchemaWithArea = (
  s: { name: string; shortDescription?: string; description?: string; slug: string },
  area?: AreaServedInput,
) => {
  const areaServed = area?.cityName
    ? {
        "@type": "City",
        name: area.cityName,
        containedInPlace: { "@type": "State", name: area.stateName },
      }
    : area?.stateName
      ? { "@type": "State", name: area.stateName }
      : { "@type": "Country", name: "United States" };

  const url = area?.citySlug
    ? `${SITE.url}/${s.slug}/${area.stateSlug}/${area.citySlug}`
    : area?.stateSlug
      ? `${SITE.url}/${s.slug}/${area.stateSlug}`
      : `${SITE.url}/services/${s.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description || s.shortDescription || "",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed,
    url,
  };
};

export const faqSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
