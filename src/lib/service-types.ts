import type { CategorySlug } from "./categories";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceStep {
  title: string;
  detail: string;
}

/**
 * One service page. Every field is rendered on /services/[slug], so keep copy
 * specific to the service — shared boilerplate belongs on the category page.
 */
export interface Service {
  slug: string;
  name: string;
  category: CategorySlug;
  /** One line for cards and menus. */
  shortDescription: string;
  /** Under 60 characters including "| Klikcy". */
  metaTitle: string;
  /** Roughly 140–160 characters. */
  metaDescription: string;
  focusKeyword: string;
  /** Hero paragraph, one or two sentences. */
  intro: string;
  /** Two or three paragraphs explaining what the work is and when it matters. */
  overview: string[];
  /** Situations where this service is the right call. */
  signs: string[];
  /** Concrete deliverables. */
  included: string[];
  /** How the engagement runs, in order. */
  process: ServiceStep[];
  /** Typical duration, written as a sentence. */
  timeline: string;
  /** What moves the price up or down. */
  costFactors: string[];
  /** Mistakes we see and plan around. */
  pitfalls: string[];
  /** Platforms and tools we usually reach for. */
  tools: string[];
  related: string[];
  faqs: ServiceFaq[];
}
