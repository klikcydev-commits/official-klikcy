import type { CategorySlug } from "@/lib/categories";

/** Desktop mega-menu grouping — maps to existing category routes only. */
export interface NavGroup {
  id: string;
  label: string;
  tagline: string;
  categorySlugs: CategorySlug[];
}

export const navGroups: NavGroup[] = [
  {
    id: "build",
    label: "Build",
    tagline: "Product, apps & commerce",
    categorySlugs: ["web-development", "app-software", "ecommerce"],
  },
  {
    id: "growth",
    label: "Growth",
    tagline: "Search & demand",
    categorySlugs: ["seo-aeo", "marketing-growth"],
  },
  {
    id: "systems",
    label: "Systems",
    tagline: "Automation & reliability",
    categorySlugs: ["ai-automation", "technical-hosting"],
  },
  {
    id: "brand",
    label: "Brand",
    tagline: "Identity & experience",
    categorySlugs: ["branding-design"],
  },
];
