import type { CityRef } from "./cities";
import type { Service } from "./services";
import type { State } from "./states";
import { pickIndex } from "./metadata/hash";
import { getVerticalProfile } from "./metadata/positioning";

export type GeoFaq = { q: string; a: string };

export type AeoSection = {
  h: string;
  p: string;
  list?: string[];
};

/** Patterns that imply a fake local office — used in validation. */
export const FORBIDDEN_LOCAL_CLAIM_PATTERNS = [
  /\bour [a-z\s]+ office\b/i,
  /\blocated in [a-z]/i,
  /\bnear you\b/i,
  /\bvisit us in\b/i,
  /\bstop by our\b/i,
  /\bwalk-in\b/i,
];

export function hasForbiddenLocalClaim(text: string): boolean {
  return FORBIDDEN_LOCAL_CLAIM_PATTERNS.some((re) => re.test(text));
}

function loc(city: CityRef): string {
  return `${city.name}, ${city.state.abbr}`;
}

/** City hub page FAQs — `/service-areas/[state]/[city]` */
export function buildCityAreaFaqs(city: CityRef): GeoFaq[] {
  const { name, state } = city;
  const label = loc(city);
  const v = pickIndex(`${state.slug}:${city.slug}:city-area-faq`, 4);
  const industryNote = `${state.name}'s economy includes ${state.blurb}`;

  return [
    {
      q: `Can Klikcy build a website for businesses in ${label}?`,
      a: `Yes. Klikcy serves companies in ${label} with custom websites, web apps, SEO/AEO, AI automation, and e-commerce. We are a remote-first agency — available for ${name} businesses without a local storefront office.`,
    },
    {
      q: `Do you work remotely with businesses in ${name}?`,
      a: `Yes. ${name} teams work with Klikcy through structured discovery, design reviews, and milestone delivery online. Remote collaboration is our default for ${state.name} and nationwide clients.`,
    },
    {
      q: `What types of companies in ${name} work with Klikcy?`,
      a: [
        `${name} service firms, professional practices, and B2B operators that need credible web presence and measurable lead flow.`,
        `Growing ${name} companies in sectors shaped by ${state.blurb} — from local operators to multi-location ${state.name} brands.`,
        `Startups and established ${name} businesses that want one partner for web, search visibility, and automation.`,
        `${name} e-commerce and product teams that need faster sites, clearer funnels, and AI-ready content architecture.`,
      ][v],
    },
    {
      q: `How does Klikcy help ${name} businesses improve leads and conversions?`,
      a: `We align site architecture, page speed, schema, and offer clarity to how ${name} buyers research and decide. ${industryNote} — we map that context into pages structured for Google and answer engines.`,
    },
    {
      q: `What makes Klikcy different from a local ${name} agency?`,
      a: `Klikcy is nationwide and remote-first: senior specialists across web, SEO/AEO, apps, and AI automation — not a single-discipline shop. ${name} clients get production-grade delivery without paying for unused office overhead.`,
    },
    {
      q: `How do I request a consultation for my ${name} company?`,
      a: `Use the contact form at klikcy.com/contact or request a quote from this page. Share your goals, timeline, and ${name} market — we respond with a practical scope, not a generic pitch deck.`,
    },
  ];
}

/** State hub page FAQs — `/service-areas/[state]` */
export function buildStateAreaFaqs(state: State): GeoFaq[] {
  const cities = state.cities.slice(0, 4).join(", ");
  const v = pickIndex(`${state.slug}:state-area-faq`, 3);

  return [
    {
      q: `Does Klikcy serve businesses across ${state.name}?`,
      a: `Yes. Klikcy is available for companies throughout ${state.name} — including ${cities} and every metro. We deliver remotely with the same standards nationwide.`,
    },
    {
      q: `What services does Klikcy offer in ${state.name}?`,
      a: `Custom websites, technical SEO, AEO, AI automation, mobile apps, e-commerce, branding, and ongoing growth systems — scoped for ${state.name} operators shaped by ${state.blurb}.`,
    },
    {
      q: `Can Klikcy work with ${state.name} businesses remotely?`,
      a: `Yes. Remote-first delivery is how we work with ${state.name} clients: discovery, design, development, and launch run on clear milestones with async and live collaboration.`,
    },
    {
      q: `Which ${state.name} cities does Klikcy support?`,
      a: `We support businesses in ${state.cities.join(", ")} and every other ${state.name} city. Location does not limit engagement quality.`,
    },
    {
      q: `How do ${state.name} companies get started with Klikcy?`,
      a: [
        `Submit a brief through klikcy.com/contact describing your ${state.name} business goals.`,
        `Request a quote from any ${state.name} service page — we reply with scope, timeline, and next steps.`,
        `Explore services by city or practice area, then book a discovery call when ready.`,
      ][v],
    },
    {
      q: `Why choose Klikcy for digital projects in ${state.name}?`,
      a: `Klikcy combines web engineering, search visibility, and AI automation in one system — honest nationwide positioning, no fake local addresses, and content structured for search and answer engines.`,
    },
  ];
}

/** Service × city FAQs — `/[service]/[state]/[city]` */
export function buildServiceCityFaqs(service: Service, city: CityRef): GeoFaq[] {
  const profile = getVerticalProfile(service.category);
  const label = loc(city);
  const v = pickIndex(`${service.slug}:${city.state.slug}:${city.slug}:svc-city-faq`, 5);

  return [
    {
      q: `What is included in Klikcy's ${service.name} for ${city.name} businesses?`,
      a: `${service.included.slice(0, 3).join("; ")} — tailored for ${label} companies. ${service.shortDescription}`,
    },
    {
      q: `How can ${service.name} help companies in ${label} grow?`,
      a: `${profile.outcomePhrase} Klikcy scopes ${service.name.toLowerCase()} around leads, efficiency, or product velocity for ${city.name} teams operating in ${city.state.name}'s ${city.state.blurb} market.`,
    },
    {
      q: `Does Klikcy offer custom ${service.name} for ${city.name} startups?`,
      a: `Yes. We work with early-stage and scaling ${city.name} companies that need ${service.focusKeyword} without enterprise overhead — clear milestones after discovery.`,
    },
    {
      q: `Can Klikcy improve an existing ${service.name.toLowerCase()} setup in ${city.name}?`,
      a: `Yes. Audits, refactors, and growth iterations are common for ${city.name} clients modernizing legacy sites, apps, or automations.`,
    },
    {
      q: `How do I request a ${service.name} consultation for my ${city.name} company?`,
      a: `Contact Klikcy at klikcy.com/contact or use the quote button on this page. Mention ${label} and your timeline — we respond with a practical plan.`,
    },
    {
      q: `Can Klikcy work with ${city.name} businesses remotely on ${service.name}?`,
      a: [
        `Yes — remote delivery is standard for ${label}. ${service.name} runs on shared roadmaps and live reviews.`,
        `Absolutely. ${city.name} clients collaborate online; no local office visit is required.`,
        `Yes. We serve ${city.name} remotely with the same production standards as engagements across ${city.state.name}.`,
      ][v],
    },
    {
      q: `How long does a typical ${service.name} project take for a ${city.name} business?`,
      a: `Timelines depend on scope: marketing sites and automations often ship in weeks; apps and platforms take longer. We define milestones after discovery for your ${city.name} project.`,
    },
  ];
}

/** Service × state FAQs — `/[service]/[state]` */
export function buildServiceStateFaqs(service: Service, state: State): GeoFaq[] {
  const profile = getVerticalProfile(service.category);
  const cities = state.cities.slice(0, 4).join(", ");

  return [
    {
      q: `Does Klikcy provide ${service.name} in ${state.name}?`,
      a: `Yes. Klikcy delivers ${service.name.toLowerCase()} for ${state.name} businesses — including ${cities} and statewide. Remote-first, no fake local offices.`,
    },
    {
      q: `Who needs ${service.name} in ${state.name}?`,
      a: `${service.whoFor.join("; ")} — common among ${state.name} companies in sectors driven by ${state.blurb}.`,
    },
    {
      q: `What is included in Klikcy's ${service.name} process?`,
      a: `${service.included.join("; ")}. Technical foundation includes ${service.technical.slice(0, 2).join(" and ")}.`,
    },
    {
      q: `Why choose Klikcy for ${service.name} in ${state.name}?`,
      a: `${profile.partnerLabel} focused on ${profile.outcomePhrase}. ${service.shortDescription}`,
    },
    {
      q: `Can ${state.name} businesses work with Klikcy remotely?`,
      a: `Yes. Discovery, design, and delivery run online for ${state.name} clients with structured milestones and async updates.`,
    },
    {
      q: `How do I get a ${service.name} quote in ${state.name}?`,
      a: `Visit klikcy.com/contact or use the quote button on this page. Share your ${state.name} business context and goals.`,
    },
  ];
}

export function buildCityAreaAeoSections(city: CityRef): AeoSection[] {
  const { name, state } = city;
  const label = loc(city);

  return [
    {
      h: `What does Klikcy offer businesses in ${label}?`,
      p: `Klikcy is a remote-first digital agency serving ${label} with custom websites, SEO/AEO, AI automation, mobile apps, e-commerce, and branding — one connected system for U.S. businesses.`,
    },
    {
      h: `Who is this page for?`,
      p: `Owners and operators in ${name} who need a nationwide partner for web, search visibility, and automation — without assuming a local Klikcy office in ${name}.`,
    },
    {
      h: `How Klikcy helps ${name} businesses`,
      p: `${state.name}'s economy is shaped by ${state.blurb}. We translate that context into fast sites, schema-rich pages, and automation that supports how ${name} companies win online.`,
    },
    {
      h: `Why choose Klikcy for companies in ${state.name}?`,
      p: `Production-grade delivery, honest nationwide positioning, and content structured for Google Search and AI answer engines — not generic templates copied to every city.`,
    },
  ];
}

export function buildStateAreaAeoSections(state: State): AeoSection[] {
  return [
    {
      h: `What does Klikcy offer in ${state.name}?`,
      p: `Websites, apps, custom software, AI automation, e-commerce, and search-ready architecture for ${state.name} businesses — delivered remotely across the state.`,
    },
    {
      h: `Who is this page for?`,
      p: `${state.name} companies that want a single technology partner for web, SEO/AEO, and automation without fake local office claims.`,
    },
    {
      h: `How Klikcy serves ${state.name} businesses`,
      p: `${state.name}'s economy includes ${state.blurb}. Klikcy maps that context into scoped engagements with clear milestones and discoverability built in.`,
    },
    {
      h: `How to contact Klikcy`,
      p: `Request a quote at klikcy.com/contact or from any ${state.name} service page. We respond with scope, timeline, and next steps.`,
    },
  ];
}

export function buildServiceCityAeoSections(service: Service, city: CityRef): AeoSection[] {
  const profile = getVerticalProfile(service.category);
  const label = loc(city);

  return [
    {
      h: `What is ${service.name}?`,
      p: service.intro,
    },
    {
      h: `Who needs ${service.name} in ${city.name}?`,
      p: `${service.whoFor.join("; ")} — especially relevant for ${city.name} companies operating in ${city.state.name}'s ${city.state.blurb} market.`,
    },
    {
      h: `How Klikcy helps ${city.name} businesses`,
      p: `Klikcy delivers ${service.focusKeyword} for ${label} with ${profile.outcomePhrase}. Engagements include ${service.included.slice(0, 2).join(" and ")}.`,
    },
    {
      h: `What is included in Klikcy's ${service.name} process?`,
      list: service.included,
      p: `Technical foundation: ${service.technical.slice(0, 3).join("; ")}.`,
    },
    {
      h: `Why choose Klikcy for ${service.name} in ${city.state.name}?`,
      p: `Remote-first ${profile.agencyLabel} serving ${label} — structured for search and answer engines, with honest nationwide positioning and no fake local addresses.`,
    },
  ];
}

export function buildServiceStateAeoSections(service: Service, state: State): AeoSection[] {
  const profile = getVerticalProfile(service.category);

  return [
    {
      h: `What is ${service.name}?`,
      p: service.intro,
    },
    {
      h: `Who needs ${service.name} in ${state.name}?`,
      p: `${service.whoFor.join("; ")} across ${state.name}, including ${state.cities.slice(0, 4).join(", ")}.`,
    },
    {
      h: `How Klikcy helps ${state.name} businesses`,
      p: `${profile.outcomePhrase} ${service.shortDescription} Remote delivery statewide.`,
    },
    {
      h: `Why choose Klikcy for ${service.name} in ${state.name}?`,
      p: `${profile.partnerLabel} with discoverability, performance, and FAQ-rich pages built in — not checkbox deliverables alone.`,
    },
  ];
}

/** Service + geo AEO FAQs for merge with service.faqs */
export function buildGeoAeoFaqs(
  service: Service,
  geo: { state: State; city?: CityRef },
): GeoFaq[] {
  if (geo.city) return buildServiceCityFaqs(service, geo.city);
  return buildServiceStateFaqs(service, geo.state);
}

export function mergeFaqs(base: GeoFaq[], extra: GeoFaq[], max = 8): GeoFaq[] {
  const seen = new Set<string>();
  const out: GeoFaq[] = [];
  for (const item of [...extra, ...base]) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= max) break;
  }
  return out;
}

/** Visible + schema-aligned FAQs for service × state pages */
export function visibleServiceStateFaqs(service: Service, state: State): GeoFaq[] {
  return mergeFaqs(service.faqs, buildServiceStateFaqs(service, state), 8);
}

/** Visible + schema-aligned FAQs for service × city pages */
export function visibleServiceCityFaqs(service: Service, city: CityRef): GeoFaq[] {
  return mergeFaqs(service.faqs, buildServiceCityFaqs(service, city), 8);
}
