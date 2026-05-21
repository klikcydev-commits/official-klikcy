import type { Service } from "../services";
import type { State } from "../states";
import type { CityRef } from "../cities";
import { buildKeywords20 } from "../metadata/page-metadata";
import { getVerticalProfile, type ServiceVertical } from "../metadata/positioning";
import { geoLabel, geoLabelWithAbbr } from "./geo";
import { isPriorityCity, isPriorityState } from "./priorityMarkets";

function dedupe(items: string[]): string[] {
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

const PRIORITY_VERTICAL_BOOSTS: Record<ServiceVertical, (loc: string, locAbbr: string) => string[]> = {
  web: (loc, locAbbr) => [
    `web development agency in ${loc}`,
    `custom website development ${loc}`,
    `business website design ${loc}`,
    `React website developers ${loc}`,
    `Shopify development ${loc}`,
  ],
  app: (loc, locAbbr) => [
    `app development company in ${loc}`,
    `custom software development ${loc}`,
    `web app development ${loc}`,
    `SaaS development company ${loc}`,
    `mobile app developers ${loc}`,
  ],
  ai: (loc, locAbbr) => [
    `AI automation agency in ${loc}`,
    `AI chatbot development ${loc}`,
    `AI agents for ${loc} businesses`,
    `workflow automation ${loc}`,
    `business automation company ${loc}`,
  ],
  ecommerce: (loc, locAbbr) => [
    `e-commerce development ${loc}`,
    `Shopify development ${loc}`,
    `WooCommerce development ${loc}`,
    `online store development ${loc}`,
    `conversion-focused e-commerce ${loc}`,
  ],
  seo: (loc, locAbbr) => [
    `SEO services ${loc}`,
    `technical SEO ${loc}`,
    `local SEO company ${loc}`,
    `answer engine optimization ${loc}`,
    `AI search visibility ${loc}`,
  ],
  branding: (loc, locAbbr) => [
    `branding agency ${loc}`,
    `UI UX design ${loc}`,
    `digital brand design ${loc}`,
    `design studio ${loc}`,
    `brand identity ${loc}`,
  ],
  marketing: (loc, locAbbr) => [
    `digital growth agency ${loc}`,
    `conversion optimization ${loc}`,
    `marketing systems ${loc}`,
    `lead generation ${loc}`,
    `customer journey optimization ${loc}`,
  ],
  hosting: (loc, locAbbr) => [
    `website maintenance ${loc}`,
    `technical hosting ${loc}`,
    `DNS and email setup ${loc}`,
    `website migrations ${loc}`,
    `managed hosting ${loc}`,
  ],
};

/** 20 keywords with priority-market commercial boosts when applicable. */
export function buildPageKeywords20(
  service: Service,
  geo?: { state: State; city?: CityRef },
): string[] {
  const base = buildKeywords20(service, geo);
  if (!geo || (!isPriorityState(geo.state.slug) && !geo.city)) {
    return base;
  }

  const profile = getVerticalProfile(service.category);
  const loc = geoLabel(geo);
  const locAbbr = geoLabelWithAbbr(geo);
  const priorityCommercial = PRIORITY_VERTICAL_BOOSTS[profile.vertical](loc, locAbbr);

  const extra =
    geo.city && isPriorityCity(geo.state.slug, geo.city.slug)
      ? [
          `${profile.agencyLabel} in ${loc}`,
          `${service.focusKeyword} near ${loc}`,
          `best ${service.focusKeyword} ${loc}`,
        ]
      : [`${geo.state.name} ${profile.agencyLabel}`, `${service.focusKeyword} ${geo.state.name}`];

  return dedupe([...priorityCommercial, ...extra, ...base]).slice(0, 20);
}
