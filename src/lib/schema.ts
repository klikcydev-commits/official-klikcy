/**
 * Schema.org JSON-LD builders. Each page emits one @graph whose nodes reference
 * each other by @id, so Google sees a single connected description of the site.
 * Only describe what is visible on the page.
 */
import { categories } from "./categories";
import { CONTENT_UPDATED, SITE, absoluteUrl } from "./site";

export { SITE };

export type FaqItem = { q: string; a: string };
type Node = Record<string, unknown>;

/**
 * Official profiles that represent Klikcy (Clutch, LinkedIn, Crunchbase, GitHub...).
 * Only add profiles you control. Google uses these to connect reviews and mentions to the brand.
 */
export const SAME_AS: string[] = [];

export const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export const organizationNode = (): Node => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}${SITE.logoPath}`,
  },
  description: SITE.description,
  email: SITE.email,
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: categories.map((c) => c.name),
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    areaServed: "US",
    availableLanguage: "English",
  },
});

export const websiteNode = (): Node => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: SITE.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
});

export interface WebPageInput {
  path: string;
  name: string;
  description?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  hasBreadcrumb?: boolean;
  mainEntityId?: string;
}

export const webPageNode = (page: WebPageInput): Node => {
  const url = absoluteUrl(page.path);
  return {
    "@type": page.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    ...(page.description ? { description: page.description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    dateModified: CONTENT_UPDATED,
    ...(page.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(page.mainEntityId ? { mainEntity: { "@id": page.mainEntityId } } : {}),
  };
};

export const breadcrumbNode = (path: string, items: { name: string; path: string }[]): Node => ({
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl(path)}#breadcrumb`,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const serviceNode = (s: { slug: string; name: string; metaDescription: string; category: string }): Node => {
  const url = absoluteUrl(`/services/${s.slug}`);
  const category = categories.find((c) => c.slug === s.category);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    ...(category ? { category: category.name } : {}),
  };
};

export const faqNode = (path: string, faqs: FaqItem[]): Node => ({
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const itemListNode = (path: string, items: { name: string; path: string }[]): Node => ({
  "@type": "ItemList",
  "@id": `${absoluteUrl(path)}#list`,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: absoluteUrl(it.path),
  })),
});

export const graph = (...nodes: Node[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
