import type { Service } from "./services";
import enrichmentData from "@/content/legacy-service-enrichment.json";

export interface LegacyServiceEnrichment {
  legacySlug: string;
  title: string;
  description: string;
  whyMatters: string;
  keyTakeaways: string[];
  technology: string[];
  commonMistakes: string[];
  implementationChecklist: string[];
  approach: string[];
  faqs: { q: string; a: string }[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
}

const enrichments = enrichmentData as Record<string, LegacyServiceEnrichment>;

/** Slugs that inherit enrichment from another service entry. */
const ENRICHMENT_ALIAS: Record<string, string> = {
  "woocommerce-development": "shopify-store-development",
  "shopify-development": "shopify-store-development",
  "ai-business-automation": "ai-chatbot-development",
};

function dedupeStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item.trim());
  }
  return out;
}

function mergeFaqs(base: Service["faqs"], extra: Service["faqs"]): Service["faqs"] {
  const seen = new Set<string>();
  const out: Service["faqs"] = [];
  for (const item of [...base, ...extra]) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export function applyLegacyEnrichment(service: Service): Service {
  const key = ENRICHMENT_ALIAS[service.slug] ?? service.slug;
  const e = enrichments[key];
  if (!e) return service;

  const includedFromLegacy = [
    ...e.approach,
    ...e.implementationChecklist.slice(0, 8),
    ...e.commonMistakes.map((m) => `Avoid: ${m}`),
  ];

  const keywords = dedupeStrings([...(e.keywords ?? []), ...service.keywords]);

  return {
    ...service,
    shortDescription: service.shortDescription || e.description,
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription || (e.metaDescription ?? service.metaDescription),
    focusKeyword: e.focusKeyword || service.focusKeyword,
    keywords: keywords.length ? keywords : service.keywords,
    intro: e.whyMatters || service.intro,
    whoFor: dedupeStrings([...e.keyTakeaways, ...service.whoFor]),
    included: dedupeStrings([...includedFromLegacy, ...service.included]),
    technical: dedupeStrings([...e.technology, ...service.technical]),
    faqs: mergeFaqs(service.faqs, e.faqs),
  };
}
