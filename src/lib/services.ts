import { webDevelopmentServices } from "@/content/services/web-development";
import { seoAeoServices } from "@/content/services/seo-aeo";
import { aiAutomationServices } from "@/content/services/ai-automation";
import { appSoftwareServices } from "@/content/services/app-software";
import { ecommerceServices } from "@/content/services/ecommerce";
import { brandingDesignServices } from "@/content/services/branding-design";
import { marketingGrowthServices } from "@/content/services/marketing-growth";
import { technicalHostingServices } from "@/content/services/technical-hosting";
import type { Service } from "./service-types";

export type { Service, ServiceFaq, ServiceStep } from "./service-types";

/** Full catalog. Slugs are live URLs (/services/[slug]) — never rename one without a redirect. */
export const services: Service[] = [
  ...webDevelopmentServices,
  ...seoAeoServices,
  ...aiAutomationServices,
  ...appSoftwareServices,
  ...ecommerceServices,
  ...brandingDesignServices,
  ...marketingGrowthServices,
  ...technicalHostingServices,
];

const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export const getService = (slug: string) => serviceBySlug.get(slug);

export const getServicesByCategory = (cat: string) => services.filter((s) => s.category === cat);

export const getRelatedServices = (slug: string) => {
  const s = getService(slug);
  if (!s) return [];
  return s.related.map((r) => getService(r)).filter((r): r is Service => Boolean(r));
};
