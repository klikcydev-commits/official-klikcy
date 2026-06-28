import type { Category } from "./categories";
import type { CityRef } from "./cities";
import type { Service } from "./services";
import type { State } from "./states";
import { pickIndex } from "./metadata/hash";
import { getVerticalProfile } from "./metadata/positioning";

export type GeoFaq = { q: string; a: string; list?: string[] };

export const FAQ_SECTION_HEADING = "Frequently Asked Questions";

export type AeoSection = {
  h: string;
  p: string;
  list?: string[];
};

/** Map AEO blocks to accordion items (same shape as FAQs). */
export function aeoSectionsToFaqs(sections: AeoSection[]): GeoFaq[] {
  return sections.map((s) => ({ q: s.h, a: s.p, list: s.list }));
}

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
  const v = pickIndex(`${state.slug}:${city.slug}:city-area-faq`, 3);

  return [
    {
      q: `Does Klikcy work with businesses in ${label}?`,
      a: `Yes. Klikcy partners with companies in ${label} on custom websites, SEO/AEO, AI automation, mobile apps, and e-commerce. We are a remote-first nationwide agency — available for ${name} businesses without claiming a local office in the city.`,
    },
    {
      q: `What digital services does Klikcy offer in ${name}?`,
      a: `Klikcy delivers web development, technical and local SEO, answer-engine optimization, AI workflows, Shopify and WooCommerce builds, branding, and growth systems for ${name} operators. Each engagement is scoped to your goals, not a one-size template.`,
    },
    {
      q: `Can Klikcy help ${name} companies remotely?`,
      a: `Yes. ${name} teams collaborate with Klikcy through structured discovery, design reviews, and milestone delivery online. Remote delivery is our default for ${state.name} and clients across the United States.`,
    },
    {
      q: `What types of ${name} businesses can use Klikcy?`,
      a: [
        `${name} service firms, professional practices, and B2B operators that need credible web presence and measurable lead flow.`,
        `Growing ${name} companies that need one partner for websites, search visibility, and automation — from local operators to multi-location ${state.name} brands.`,
        `Startups and established ${name} businesses modernizing sites, apps, or internal workflows without hiring a full in-house team.`,
      ][v],
    },
    {
      q: `How can a ${name} business start a project with Klikcy?`,
      a: `Submit a brief through klikcy.com/contact or request a quote from this page. Share your ${name} market, goals, and timeline — we respond with a practical scope, milestones, and next steps.`,
    },
    {
      q: `Why choose Klikcy instead of a local-only ${name} agency?`,
      a: `Klikcy is nationwide and remote-first: senior specialists across web engineering, SEO/AEO, apps, and AI automation in one system. ${name} clients get production-grade delivery and honest positioning — no fake local addresses or single-discipline limits.`,
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
      a: `Yes. Klikcy is available for companies throughout ${state.name} — including ${cities} and every metro. We deliver remotely with the same production standards nationwide.`,
    },
    {
      q: `What services does Klikcy offer in ${state.name}?`,
      a: `Custom websites, technical SEO, AEO, AI automation, mobile apps, e-commerce, branding, and ongoing growth systems — scoped for ${state.name} operators who need measurable digital results.`,
    },
    {
      q: `Can Klikcy work with ${state.name} businesses remotely?`,
      a: `Yes. Remote-first delivery is how we work with ${state.name} clients: discovery, design, development, and launch run on clear milestones with async updates and live reviews.`,
    },
    {
      q: `Which ${state.name} cities does Klikcy support?`,
      a: `We support businesses in ${state.cities.join(", ")} and every other ${state.name} city. Your location does not limit engagement quality or response time.`,
    },
    {
      q: `How do ${state.name} companies get started with Klikcy?`,
      a: [
        `Submit a brief through klikcy.com/contact describing your ${state.name} business goals and timeline.`,
        `Request a quote from any ${state.name} service page — we reply with scope, milestones, and next steps.`,
        `Explore services by city or practice area, then book a discovery call when you are ready to move forward.`,
      ][v],
    },
    {
      q: `Why choose Klikcy for digital projects in ${state.name}?`,
      a: `Klikcy combines web engineering, search visibility, and AI automation in one connected system — honest nationwide positioning, no fake local addresses, and content structured for Google Search and AI answer engines.`,
    },
  ];
}

/** Service × city FAQs — `/[service]/[state]/[city]` */
export function buildServiceCityFaqs(service: Service, city: CityRef): GeoFaq[] {
  const profile = getVerticalProfile(service.category);
  const label = loc(city);
  const v = pickIndex(`${service.slug}:${city.state.slug}:${city.slug}:svc-city-faq`, 3);

  return [
    {
      q: `Does Klikcy offer ${service.name} for businesses in ${label}?`,
      a: `Yes. Klikcy delivers ${service.name.toLowerCase()} for companies in ${label}. We are remote-first — ${city.name} clients get the same production standards as engagements across ${city.state.name} and nationwide.`,
    },
    {
      q: `How can ${service.name} help ${city.name} companies grow?`,
      a: `${profile.outcomePhrase} Klikcy scopes ${service.name.toLowerCase()} around leads, efficiency, or product velocity for ${city.name} teams — aligned to how buyers in ${city.state.name} research and decide online.`,
    },
    {
      q: `Can Klikcy improve an existing ${service.name.toLowerCase()} setup for a ${city.name} business?`,
      a: [
        `Yes. Audits, refactors, and growth iterations are common for ${city.name} clients modernizing legacy sites, apps, or automations tied to ${service.focusKeyword}.`,
        `Absolutely. We review your current ${service.name.toLowerCase()} stack, fix bottlenecks, and ship improvements in clear phases for ${label} operators.`,
        `Yes — many ${city.name} engagements start with an audit of what you already have before we recommend the right ${service.name.toLowerCase()} roadmap.`,
      ][v],
    },
    {
      q: `What is included in Klikcy's ${service.name} process for ${city.name} clients?`,
      a: `${service.included.slice(0, 3).join("; ")}. Technical foundation includes ${service.technical.slice(0, 2).join(" and ")} — tailored for ${label} companies.`,
    },
    {
      q: `How long does a typical ${service.name} project take for a ${city.name} business?`,
      a: `Timelines depend on scope: marketing sites and automations often ship in weeks; apps and platforms take longer. We define milestones after discovery for your ${city.name} project so expectations stay clear.`,
    },
    {
      q: `How can a ${city.name} company start a ${service.name} project with Klikcy?`,
      a: `Reach out at klikcy.com/contact or use the quote button on this page. Mention ${label}, your goals, and timeline — we respond with a practical plan, not a generic pitch deck.`,
    },
  ];
}

/** Service × state FAQs — `/[service]/[state]` */
export function buildServiceStateFaqs(service: Service, state: State): GeoFaq[] {
  const profile = getVerticalProfile(service.category);
  const cities = state.cities.slice(0, 4).join(", ");
  const v = pickIndex(`${service.slug}:${state.slug}:svc-state-faq`, 3);

  return [
    {
      q: `Does Klikcy offer ${service.name} across ${state.name}?`,
      a: `Yes. Klikcy delivers ${service.name.toLowerCase()} for ${state.name} businesses — including ${cities} and statewide. Remote-first delivery with no fake local offices.`,
    },
    {
      q: `How can ${service.name} help businesses in ${state.name}?`,
      a: `${service.whoFor.slice(0, 2).join("; ")}. ${profile.outcomePhrase} Klikcy aligns ${service.name.toLowerCase()} to measurable outcomes for ${state.name} operators.`,
    },
    {
      q: `Can Klikcy deliver ${service.name} remotely for ${state.name} companies?`,
      a: `Yes. Discovery, design, and delivery run online for ${state.name} clients with structured milestones, async updates, and live reviews — the same process we use nationwide.`,
    },
    {
      q: `What is included in Klikcy's ${service.name} process for ${state.name} businesses?`,
      a: `${service.included.join("; ")}. Technical foundation includes ${service.technical.slice(0, 2).join(" and ")} — scoped for ${state.name} companies.`,
    },
    {
      q: `How do companies in ${state.name} request a ${service.name} consultation?`,
      a: [
        `Share your business context and goals at klikcy.com/contact.`,
        `Use the quote button on this page — we reply with scope, timeline, and recommended next steps.`,
        `Browse related ${state.name} city pages, then book a discovery call when you are ready to brief the project.`,
      ][v],
    },
    {
      q: `Why choose Klikcy for ${service.name} in ${state.name}?`,
      a: `${profile.partnerLabel} focused on ${profile.outcomePhrase}. ${service.shortDescription} Honest nationwide positioning with FAQ-rich, search-ready delivery.`,
    },
  ];
}

/** Category hub FAQs — `/categories/[slug]` */
export function buildCategoryFaqs(category: Category): GeoFaq[] {
  const v = pickIndex(`${category.slug}:category-faq`, 3);
  const services = category.name.toLowerCase();

  return [
    {
      q: `What ${category.name} services does Klikcy offer?`,
      a: `${category.description} Klikcy delivers these ${services} capabilities for U.S. businesses through scoped engagements with clear milestones.`,
    },
    {
      q: `Who should hire Klikcy for ${category.short}?`,
      a: `Teams that need a production-grade partner for ${category.tagline.toLowerCase()} — from startups to established brands — without juggling multiple vendors for design, build, and growth.`,
    },
    {
      q: `Does Klikcy deliver ${category.name} remotely?`,
      a: `Yes. Klikcy is remote-first nationwide. ${category.name} projects run through structured discovery, design reviews, and milestone delivery online — no local office visit required.`,
    },
    {
      q: `How does Klikcy approach ${category.short} projects?`,
      a: [
        `We start with goals and constraints, then scope ${services} work around measurable outcomes — not checkbox deliverables alone.`,
        `Each ${category.short} engagement maps to your funnel, tech stack, and timeline with technical SEO and performance built in from day one.`,
        `Klikcy combines strategy, build, and iteration so ${category.name.toLowerCase()} work compounds — not one-off launches that stall.`,
      ][v],
    },
    {
      q: `How do I start a ${category.name} project with Klikcy?`,
      a: `Request a quote at klikcy.com/contact or from any service page in this practice. Share your goals and we respond with scope, timeline, and next steps.`,
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
      p: `We translate market context into fast sites, schema-rich pages, and automation that supports how ${name} companies win online — with honest remote-first delivery.`,
    },
    {
      h: `Why choose Klikcy for companies in ${state.name}?`,
      p: `Production-grade delivery, honest nationwide positioning, and content structured for Google Search and AI answer engines — not generic templates copied to every city.`,
    },
    {
      h: `How to contact Klikcy`,
      p: `Request a quote at klikcy.com/contact or from any ${name} service page. We respond with scope, timeline, and next steps — remote-first, no local office visit required.`,
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
      p: `Klikcy maps business context into scoped engagements with clear milestones and discoverability built in — remote-first across every ${state.name} metro.`,
    },
    {
      h: `Why choose Klikcy in ${state.name}?`,
      p: `Production-grade web, SEO/AEO, and AI automation in one system — honest nationwide positioning, no fake local addresses, and content structured for Google Search and AI answer engines.`,
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
      p: `${service.whoFor.join("; ")} — relevant for ${city.name} companies operating across ${city.state.name}.`,
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
    {
      h: `How to contact Klikcy`,
      p: `Share your ${label} project goals at klikcy.com/contact or use the quote button on this page. We reply with scope, timeline, and next steps.`,
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
    {
      h: `How to contact Klikcy`,
      p: `Request a ${service.name} consultation at klikcy.com/contact or from this page. Remote delivery for every ${state.name} metro.`,
    },
  ];
}

/** Returns validation errors when required AEO themes are missing from section copy. */
export function validateAeoSectionCoverage(sections: AeoSection[]): string[] {
  const text = sections.map((s) => `${s.h} ${s.p}`).join(" ").toLowerCase();
  const issues: string[] = [];
  if (!/what (does|is) klikcy|what is /.test(text)) issues.push("missing what Klikcy offers");
  if (!/who (is|needs)/.test(text)) issues.push("missing who this is for");
  if (!/remote/.test(text)) issues.push("missing remote-first positioning");
  if (!/how to contact|klikcy\.com\/contact|get started|request a quote/.test(text)) {
    issues.push("missing contact or get-started guidance");
  }
  if (!/why choose/.test(text)) issues.push("missing why choose Klikcy");
  return issues;
}

/** Service + geo AEO FAQs */
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
  return buildServiceStateFaqs(service, state);
}

/** Visible + schema-aligned FAQs for service × city pages */
export function visibleServiceCityFaqs(service: Service, city: CityRef): GeoFaq[] {
  return buildServiceCityFaqs(service, city);
}
