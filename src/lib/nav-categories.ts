import { categories, type Category, type CategorySlug } from "@/lib/categories";

/** Top-level nav: Websites, Search Growth, AI Workflows, Apps, Stores, Design */
export const NAV_PRIMARY_SLUGS: readonly CategorySlug[] = [
  "web-development",
  "seo-aeo",
  "ai-automation",
  "app-software",
  "ecommerce",
  "branding-design",
];

/** Nested under “All Services” (hover / tap). */
export const NAV_ALL_SERVICES_SLUGS: readonly CategorySlug[] = ["marketing-growth", "technical-hosting"];

export function getPrimaryNavCategories(): Category[] {
  return NAV_PRIMARY_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is Category => Boolean(c));
}

export function getAllServicesNavCategories(): Category[] {
  return NAV_ALL_SERVICES_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is Category => Boolean(c));
}

export function isAllServicesSectionSlug(slug: string | null): boolean {
  if (!slug) return false;
  return (NAV_ALL_SERVICES_SLUGS as readonly string[]).includes(slug);
}
