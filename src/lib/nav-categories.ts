import { categories, type Category, type CategorySlug } from "@/lib/categories";
import { navGroups } from "@/lib/nav-groups";
import { getServicesByCategory, type Service } from "@/lib/services";

/** Top-level nav: Websites, Search Growth, AI Workflows, Apps, Stores, Design */
export const NAV_PRIMARY_SLUGS: readonly CategorySlug[] = [
  "web-development",
  "seo-aeo",
  "ai-automation",
  "app-software",
  "ecommerce",
  "branding-design",
];

/** Extra practices nested only under “All Services” (also included in full catalog list). */
export const NAV_ALL_SERVICES_EXTRA_SLUGS: readonly CategorySlug[] = ["marketing-growth", "technical-hosting"];

/** Full catalog inside “All Services” mega menu (all practices + deliverables). */
export const NAV_ALL_SERVICES_SLUGS: readonly CategorySlug[] = [
  ...NAV_PRIMARY_SLUGS,
  ...NAV_ALL_SERVICES_EXTRA_SLUGS,
];

export function getPrimaryNavCategories(): Category[] {
  return NAV_PRIMARY_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is Category => Boolean(c));
}

export function getAllServicesNavCategories(): Category[] {
  return NAV_ALL_SERVICES_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is Category => Boolean(c));
}

export function isAllServicesSectionSlug(slug: string | null): boolean {
  if (!slug) return false;
  return (NAV_ALL_SERVICES_EXTRA_SLUGS as readonly string[]).includes(slug);
}

export interface AllServicesNavCategoryNode {
  category: Category;
  services: Service[];
}

export interface AllServicesNavGroupNode {
  id: string;
  label: string;
  tagline: string;
  categories: AllServicesNavCategoryNode[];
}

/** Three-level tree for “All Services”: group → category (Websites, SEO, …) → service names. */
export function getAllServicesNavTree(): AllServicesNavGroupNode[] {
  return navGroups.map((group) => ({
    id: group.id,
    label: group.label,
    tagline: group.tagline,
    categories: group.categorySlugs
      .map((slug) => {
        const category = categories.find((c) => c.slug === slug);
        if (!category) return null;
        return { category, services: getServicesByCategory(slug) };
      })
      .filter((node): node is AllServicesNavCategoryNode => node !== null),
  }));
}
