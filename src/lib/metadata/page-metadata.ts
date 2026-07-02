import type { Service } from "../services";
import type { State } from "../states";
import type { CityRef } from "../cities";
import type { Category } from "../categories";
import { SITE } from "../schema";
import {
  getPriorityNearbyPhrase,
  isPriorityCity,
  isPriorityState,
  type PriorityStateSlug,
} from "../seo/priorityMarkets";
import { getVerticalProfile, type ServiceVertical } from "./positioning";
import { pickIndex } from "./hash";

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword: string;
}

function dedupeKeywords(items: string[]): string[] {
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

function geoLabel(geo?: { state: State; city?: CityRef }): string {
  if (geo?.city) return geo.city.name;
  if (geo?.state) return geo.state.name;
  return "the United States";
}

function geoLabelWithAbbr(geo?: { state: State; city?: CityRef }): string {
  if (geo?.city) return `${geo.city.name}, ${geo.state.abbr}`;
  if (geo?.state) return geo.state.name;
  return "United States";
}

function fillGeo(template: string, geo?: { state: State; city?: CityRef }): string {
  return template.replace(/\{geo\}/g, geoLabel(geo));
}

/** Build exactly 20 keywords: 1 primary + 4 commercial + 5 location + 5 AEO + 5 semantic. */
export function buildKeywords20(service: Service, geo?: { state: State; city?: CityRef }): string[] {
  const profile = getVerticalProfile(service.category);
  const loc = geoLabel(geo);
  const locAbbr = geoLabelWithAbbr(geo);
  const stateName = geo?.state?.name ?? "United States";

  const primary = geo
    ? `${service.focusKeyword} in ${loc}`
    : service.focusKeyword;

  const commercial = profile.commercialKeywordStems.map((stem, i) => {
    const variants = [
      `${stem} ${loc}`,
      `${stem} in ${locAbbr}`,
      `${loc} ${stem}`,
      `${stem} company ${loc}`,
    ];
    return variants[i % variants.length];
  });

  const location = geo
    ? [
        `${loc} digital agency`,
        `${stateName} ${profile.agencyLabel}`,
        `${service.name.toLowerCase()} near ${loc}`,
        `${loc} ${profile.partnerLabel}`,
        `${profile.agencyLabel} in ${locAbbr}`,
      ]
    : [
        "United States digital agency",
        "nationwide web and app development",
        "U.S. software development partner",
        "remote digital agency USA",
        "Klikcy digital agency United States",
      ];

  const aeo = profile.aeoQuestionStems.map((q) => fillGeo(q, geo));

  const semanticBase = [
    ...profile.semanticKeywordStems,
    ...service.technical.slice(0, 3).map((t) => t.toLowerCase()),
    service.name.toLowerCase(),
  ];
  const semantic = semanticBase.slice(0, 5).map((s, i) => {
    if (geo && i < 2) return `${s} ${loc}`;
    return s;
  });

  const merged = dedupeKeywords([primary, ...commercial, ...location, ...aeo, ...semantic]);

  // Pad to 20 with service keywords + focus variations if short
  const pad = [
    ...service.keywords,
    `${service.name} ${loc}`,
    `${profile.agencyLabel} ${loc}`,
    `best ${service.focusKeyword} ${loc}`,
    `${service.focusKeyword} for ${stateName} businesses`,
    `how to choose ${service.focusKeyword} in ${loc}`,
    `${service.focusKeyword} structured for AI search`,
  ];

  const final = dedupeKeywords([...merged, ...pad]);
  return final.slice(0, 20);
}

const PRIORITY_STATE_TITLE: Record<PriorityStateSlug, Partial<Record<ServiceVertical, string>>> = {
  "new-york": { web: "Serving New York Businesses", ecommerce: "Serving New York" },
  "new-jersey": { web: "Serving New Jersey Businesses" },
  connecticut: { app: "Serving Connecticut Businesses" },
  pennsylvania: { app: "Serving Pennsylvania Businesses" },
};

function stateTitle(service: Service, state: State): string {
  const profile = getVerticalProfile(service.category);
  if (isPriorityState(state.slug)) {
    const suffix = PRIORITY_STATE_TITLE[state.slug as PriorityStateSlug]?.[profile.vertical];
    if (suffix) return `${service.name} ${suffix} | Klikcy`;
  }
  const seed = `${service.slug}:${state.slug}:title`;
  const templates: ((s: Service, st: State) => string)[] = [
    (s, st) => `${s.name} Serving ${st.name} Businesses | Klikcy`,
    (s, st) => `${s.name} in ${st.name} | Klikcy`,
    (s, st) => `${s.name} for ${st.name} Companies | Klikcy`,
    (s, st) => `${st.name} ${s.name} | Klikcy`,
    (s, st) => `${s.name} — ${st.abbr} ${profile.agencyLabel} | Klikcy`,
  ];
  return templates[pickIndex(seed, templates.length)](service, state);
}

const PRIORITY_CITY_TITLE: Record<string, Partial<Record<ServiceVertical, string>>> = {
  manhattan: { web: "Serving Manhattan Businesses" },
  brooklyn: { app: "Serving Brooklyn Businesses" },
  queens: { app: "Serving Queens Businesses" },
  "the-bronx": { ai: "Serving The Bronx Businesses" },
  "staten-island": { web: "Serving Staten Island" },
  "jersey-city": { web: "Serving Jersey City Businesses" },
  stamford: { app: "Serving Stamford Businesses" },
  philadelphia: { app: "Serving Philadelphia Businesses" },
  "king-of-prussia": { ai: "Serving King of Prussia" },
};

function cityTitle(service: Service, city: CityRef): string {
  const profile = getVerticalProfile(service.category);
  if (isPriorityCity(city.state.slug, city.slug)) {
    const suffix = PRIORITY_CITY_TITLE[city.slug]?.[profile.vertical];
    if (suffix) return `${service.name} ${suffix} | Klikcy`;
  }
  const seed = `${service.slug}:${city.state.slug}:${city.slug}:title`;
  const templates: ((s: Service, c: CityRef) => string)[] = [
    (s, c) => `${s.name} Serving ${c.name}, ${c.state.abbr} Businesses | Klikcy`,
    (s, c) => `${s.name} in ${c.name}, ${c.state.abbr} | Klikcy`,
    (s, c) => `${s.name} for ${c.name}, ${c.state.name} | Klikcy`,
    (s, c) => `${c.name}, ${c.state.abbr} — ${s.name} | Klikcy`,
    (s, c) => `${s.name} for ${c.name}, ${c.state.abbr} Companies | Klikcy`,
  ];
  return templates[pickIndex(seed, templates.length)](service, city);
}

const PRIORITY_STATE_DESC: Partial<Record<PriorityStateSlug, string>> = {
  "new-york":
    "Klikcy builds custom websites, apps, software platforms, and AI automation systems for New York businesses that need premium digital experiences, stronger visibility, and scalable growth.",
  "new-jersey":
    "Klikcy builds websites, apps, e-commerce stores, AI automation systems, and digital growth platforms for New Jersey businesses across Bergen County, Jersey City, Newark, Hoboken, and beyond.",
  connecticut:
    "Klikcy helps Connecticut companies build custom apps, websites, dashboards, automation systems, and search-ready digital platforms for long-term growth.",
  pennsylvania:
    "Klikcy creates websites, apps, SaaS platforms, AI automations, and e-commerce systems for Pennsylvania businesses in Philadelphia, Pittsburgh, Allentown, Lancaster, and beyond.",
};

function stateDescription(service: Service, state: State): string {
  const profile = getVerticalProfile(service.category);
  if (isPriorityState(state.slug) && PRIORITY_STATE_DESC[state.slug as PriorityStateSlug]) {
    const base = PRIORITY_STATE_DESC[state.slug as PriorityStateSlug]!;
    const variant = pickIndex(`${service.slug}:${state.slug}:desc`, 3);
    if (variant === 0) return `${base} Current focus: ${service.name} for ${state.name} teams.`;
    if (variant === 1) return `${base} ${service.shortDescription} Structured for Google, local visibility, and AI search — not vanity metrics.`;
    return `Klikcy delivers ${service.name.toLowerCase()} across ${state.name}. ${base}`;
  }
  const nearby = getPriorityNearbyPhrase(state.slug);
  const cities = nearby ?? state.cities.slice(0, 4).join(", ");
  const variant = pickIndex(`${service.slug}:${state.slug}:desc`, 3);
  const intros = [
    `Klikcy is a ${profile.partnerLabel} delivering ${service.name.toLowerCase()} across ${state.name} — including ${cities} and every metro. ${service.shortDescription} Built to compete with ${profile.outcomePhrase}.`,
    `${state.name} businesses choose Klikcy for ${service.name.toLowerCase()} tailored to ${state.blurb}. ${service.intro.slice(0, 120)}… Remote-first delivery nationwide.`,
    `Need ${service.name.toLowerCase()} in ${state.name}? Klikcy ships ${profile.outcomePhrase} with clear scope, UX discipline, and structure designed for Google and AI search — serving ${cities} and beyond.`,
  ];
  return intros[variant].replace(/\s+/g, " ").trim();
}

const PRIORITY_CITY_DESC: Record<string, string> = {
  manhattan:
    "Klikcy builds custom websites, apps, software platforms, and AI automation systems for Manhattan businesses that need premium digital experiences, stronger visibility, and scalable growth.",
  brooklyn:
    "Klikcy helps Brooklyn businesses launch high-performance apps, websites, e-commerce platforms, and AI-powered workflows designed for local growth and modern search visibility.",
  queens:
    "Klikcy provides web development, app development, software, AI automation, and SEO/AEO systems for Queens businesses looking to compete online and attract better leads.",
  "the-bronx":
    "Klikcy creates websites, apps, automation systems, and digital growth platforms for Bronx businesses that need practical technology and stronger local discoverability.",
  "staten-island":
    "Klikcy supports Staten Island businesses with custom websites, app development, AI automation, e-commerce, and SEO-ready digital systems built for long-term growth.",
};

function cityDescription(service: Service, city: CityRef): string {
  const profile = getVerticalProfile(service.category);
  if (isPriorityCity(city.state.slug, city.slug) && PRIORITY_CITY_DESC[city.slug]) {
    const base = PRIORITY_CITY_DESC[city.slug];
    const variant = pickIndex(`${service.slug}:${city.state.slug}:${city.slug}:desc`, 3);
    if (variant === 0) return `${base} Focus: ${service.name} in ${city.name}.`;
    if (variant === 1) return `${base} ${service.name} by Klikcy — ${profile.outcomePhrase}.`;
    return `Klikcy delivers ${service.name.toLowerCase()} for ${city.name}, ${city.state.abbr}. ${base}`;
  }
  const variant = pickIndex(`${service.slug}:${city.state.slug}:${city.slug}:desc`, 3);
  const intros = [
    `Klikcy delivers ${service.name.toLowerCase()} for ${city.name}, ${city.state.name} companies. ${service.shortDescription} ${profile.outcomePhrase} — optimized for discoverability, not vanity metrics.`,
    `${city.name} teams work with Klikcy as their ${profile.partnerLabel} for ${service.name.toLowerCase()}. ${city.state.name}'s ${city.state.blurb} — we align builds to how local companies win online.`,
    `Looking for ${service.focusKeyword} in ${city.name}, ${city.state.abbr}? Klikcy provides ${service.name.toLowerCase()} with production-grade delivery and content structured for search and answer engines.`,
  ];
  return intros[variant].replace(/\s+/g, " ").trim();
}

export function buildServicePageMetadata(service: Service): PageMetadata {
  const profile = getVerticalProfile(service.category);
  const title =
    service.metaTitle.includes("Klikcy")
      ? service.metaTitle
      : `${service.name} | ${profile.agencyLabel} | Klikcy`;

  const description =
    service.metaDescription.length > 50
      ? service.metaDescription
      : `Klikcy — ${profile.agencyLabel} for ${service.name.toLowerCase()}. ${service.shortDescription} ${profile.outcomePhrase}. Structured for discoverability across the U.S.`;

  return {
    title,
    description,
    keywords: buildKeywords20(service),
    primaryKeyword: service.focusKeyword,
  };
}

export function buildServiceStateMetadata(service: Service, state: State): PageMetadata {
  return {
    title: stateTitle(service, state),
    description: stateDescription(service, state),
    keywords: buildKeywords20(service, { state }),
    primaryKeyword: `${service.focusKeyword} in ${state.name}`,
  };
}

export function buildServiceCityMetadata(service: Service, city: CityRef): PageMetadata {
  return {
    title: cityTitle(service, city),
    description: cityDescription(service, city),
    keywords: buildKeywords20(service, { state: city.state, city }),
    primaryKeyword: `${service.focusKeyword} in ${city.name}`,
  };
}

export function buildCategoryPageMetadata(category: Category): PageMetadata {
  const profile = getVerticalProfile(category.slug);
  const categoryTitles: Partial<Record<Category["slug"], string>> = {
    "web-development": "Web Development Hub | Custom Websites & Apps | Klikcy",
    "seo-aeo": "SEO & AEO Hub | Search & Answer Visibility | Klikcy",
    "ai-automation": "AI Automation Hub | Business Systems | Klikcy",
    ecommerce: "E-Commerce Hub | Shopify & WooCommerce | Klikcy",
    "branding-design": "Branding & Design Hub | UI/UX Services | Klikcy",
    "marketing-growth": "Marketing & Growth Hub | Strategy Services | Klikcy",
  };
  const title = categoryTitles[category.slug] ?? `${category.name} Services | ${profile.agencyLabel} | Klikcy`;
  return {
    title,
    description: `${category.description} Klikcy is a U.S. ${profile.partnerLabel} — ${profile.outcomePhrase}. Explore every ${category.name.toLowerCase()} practice we ship.`,
    keywords: buildCategoryKeywords(category),
    primaryKeyword: category.name.toLowerCase(),
  };
}

function buildCategoryKeywords(category: Category): string[] {
  const profile = getVerticalProfile(category.slug);
  return dedupeKeywords([
    `${category.name.toLowerCase()} services`,
    `${profile.agencyLabel}`,
    ...profile.commercialKeywordStems,
    ...profile.semanticKeywordStems.slice(0, 5),
    "United States digital agency",
    "Klikcy digital agency",
    ...profile.aeoQuestionStems.map((q) => fillGeo(q)),
  ]).slice(0, 20);
}

export function buildHomeMetadata(): PageMetadata {
  return {
    title: "Klikcy | Nationwide Web Development, SEO & AI Automation Agency",
    description:
      "Klikcy builds fast websites, SEO/AEO systems, AI automations, branding, and e-commerce solutions for businesses across the United States. Remote-first digital agency — web, apps, and growth engineering.",
    keywords: dedupeKeywords([
      "nationwide digital agency",
      "web development company USA",
      "website development agency",
      "SEO and AEO agency",
      "AI automation agency",
      "e-commerce development company",
      "digital agency United States",
      "custom website development company",
      "remote digital agency USA",
      "Shopify development agency",
      "WordPress development company",
      "UI UX design agency",
      "nationwide web development company",
      "who builds business websites in the US",
      "how to choose a digital agency",
      "AI-ready website development",
      "answer engine optimization agency",
      "digital growth partner",
      "Klikcy digital agency",
      "web design and development services USA",
    ]).slice(0, 20),
    primaryKeyword: "nationwide digital agency",
  };
}

export function buildAboutMetadata(): PageMetadata {
  return {
    title: "About Klikcy | Nationwide Web, App & AI Digital Agency",
    description:
      "About Klikcy: a remote-first digital agency serving businesses across the United States with web development, apps, SaaS, AI automation, e-commerce, branding, and SEO/AEO. Engineers, designers, and growth specialists nationwide.",
    keywords: dedupeKeywords([
      "about Klikcy",
      "digital agency team",
      "web development company",
      "app development team",
      "custom software development agency",
      "AI automation experts",
      "e-commerce development team",
      "UI UX design agency",
      "remote digital agency USA",
      "who is Klikcy",
      "what services does Klikcy offer",
      "how does Klikcy work with clients",
      "digital agency for startups",
      "enterprise web development partner",
      "nationwide digital agency",
      "software development partner",
      "AI automation partner",
      "growth and technology partner",
      "Klikcy company overview",
      "U.S. digital agency",
    ]).slice(0, 20),
    primaryKeyword: "about Klikcy digital agency",
  };
}

export function buildAllServicesMetadata(): PageMetadata {
  return {
    title: "All Services | Web, Apps, AI & Digital Growth | Klikcy",
    description:
      "Explore every Klikcy practice — web development, app and SaaS development, AI automation, e-commerce, branding, marketing growth, technical hosting, and SEO/AEO/GEO — with links to each service.",
    keywords: dedupeKeywords([
      "all digital agency services",
      "web development services",
      "app development services",
      "SaaS development services",
      "AI automation services",
      "e-commerce development services",
      "SEO and AEO services",
      "branding and UI UX services",
      "marketing growth services",
      "technical hosting services",
      "Klikcy service catalog",
      "United States digital agency services",
      "custom website development services",
      "mobile app development services",
      "workflow automation services",
      "Shopify development services",
      "WordPress development services",
      "what services does Klikcy offer",
      "digital agency service list",
      "full stack digital agency",
    ]).slice(0, 20),
    primaryKeyword: "digital agency services",
  };
}

export function buildContactMetadata(): PageMetadata {
  return {
    title: "Contact Klikcy — Web, App & AI Project Inquiry",
    description:
      "Contact Klikcy to plan websites, web apps, mobile apps, SaaS, AI automation, e-commerce, branding, or search visibility. Remote-first digital agency serving businesses across the United States.",
    keywords: dedupeKeywords([
      "contact Klikcy",
      "digital agency contact",
      "web development quote",
      "app development consultation",
      "SaaS development inquiry",
      "AI automation consultation",
      "e-commerce project inquiry",
      "get free quote",
      "hire web developers USA",
      "hire app developers USA",
      "custom software quote",
      "website project inquiry",
      "how to start a web project",
      "how to start an app project",
      "Klikcy project inquiry",
      "digital agency near me",
      "remote digital agency contact",
      "United States digital agency contact",
      "get free quote Klikcy",
      "Klikcy hello",
    ]).slice(0, 20),
    primaryKeyword: "contact Klikcy",
  };
}

/** AEO-style FAQs appended to geo pages (deterministic). */
export { SITE };
