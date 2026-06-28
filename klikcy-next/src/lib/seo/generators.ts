import type { Service } from "../services";
import type { State } from "../states";
import type { CityRef } from "../cities";
import type { Category } from "../categories";
import {
  buildAboutMetadata,
  buildAllServicesMetadata,
  buildCategoryPageMetadata,
  buildContactMetadata,
  buildGeoAeoFaqs,
  buildHomeMetadata,
  buildServiceCityMetadata,
  buildServicePageMetadata,
  buildServiceStateMetadata,
  mergeFaqs,
} from "../metadata/page-metadata";
import {
  aboutPageSchema,
  breadcrumbSchema,
  collectionPageSchema,
  contactPageSchema,
  faqSchema,
  orgSchema,
  serviceSchemaWithArea,
  webPageSchema,
  websiteSchema,
  type FaqItem,
} from "../schema";
import { buildGeoTerms, fillGeo } from "./geo";
import { buildPageKeywords20 } from "./keywords";
import {
  canonicalPath,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  NOINDEX_ROBOTS,
  type SeoPayload,
} from "./metadata";
import { getVerticalProfile } from "../metadata/positioning";

function toPayload(
  meta: { title: string; description: string; keywords: string[]; primaryKeyword: string },
  canonical: string,
  extras: Partial<SeoPayload> = {},
): SeoPayload {
  const keywords = extras.keywords ?? meta.keywords;
  return {
    title: meta.title,
    description: meta.description,
    canonical,
    keywords,
    primaryKeyword: meta.primaryKeyword,
    secondaryKeywords: keywords.slice(1, 6),
    ogImage: extras.ogImage ?? DEFAULT_OG_IMAGE,
    robots: extras.robots ?? DEFAULT_ROBOTS,
    aeoQuestions: extras.aeoQuestions,
    geoTerms: extras.geoTerms,
    jsonLd: extras.jsonLd,
  };
}

export function getHomeSeo(homeFaqs: FaqItem[]): SeoPayload {
  const meta = buildHomeMetadata();
  return toPayload(meta, canonicalPath("/"), {
    jsonLd: [orgSchema(), websiteSchema(), webPageSchema({ name: meta.title, url: canonicalPath("/") }), faqSchema(homeFaqs)],
  });
}

export function getAboutSeo(): SeoPayload {
  const meta = buildAboutMetadata();
  const url = canonicalPath("/about");
  return toPayload(meta, url, {
    jsonLd: [
      aboutPageSchema(),
      orgSchema(),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: "About", url },
      ]),
      webPageSchema({ name: meta.title, url }),
    ],
  });
}

export function getContactSeo(): SeoPayload {
  const meta = buildContactMetadata();
  const url = canonicalPath("/contact");
  return toPayload(meta, url, {
    jsonLd: [
      contactPageSchema(),
      orgSchema(),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: "Contact", url },
      ]),
      webPageSchema({ name: meta.title, url }),
    ],
  });
}

export function getAllServicesSeo(): SeoPayload {
  const meta = buildAllServicesMetadata();
  const url = canonicalPath("/all-services");
  return toPayload(meta, url, {
    jsonLd: [
      collectionPageSchema({ name: meta.title, description: meta.description, url }),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: "All Services", url },
      ]),
      webPageSchema({ name: meta.title, url }),
    ],
  });
}

export function getCategorySeo(category: Category): SeoPayload {
  const meta = buildCategoryPageMetadata(category);
  const url = canonicalPath(`/categories/${category.slug}`);
  return toPayload(meta, url, {
    jsonLd: [
      collectionPageSchema({ name: meta.title, description: meta.description, url }),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: category.name, url },
      ]),
      webPageSchema({ name: meta.title, url }),
    ],
  });
}

export function getServiceSeo(service: Service): SeoPayload {
  const meta = buildServicePageMetadata(service);
  const url = canonicalPath(`/services/${service.slug}`);
  const keywords = buildPageKeywords20(service);
  return toPayload({ ...meta, keywords }, url, {
    keywords,
    aeoQuestions: service.faqs.map((f) => f.q),
    jsonLd: [
      serviceSchemaWithArea(service),
      faqSchema(service.faqs),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: service.name, url },
      ]),
      webPageSchema({ name: meta.title, description: meta.description, url }),
    ],
  });
}

export function getServiceAreasSeo(): SeoPayload {
  const title = "Service Areas — Digital Agency Across the United States | Klikcy";
  const description =
    "Klikcy serves businesses in all 50 U.S. states and Washington DC with web development, apps, custom software, AI automation, e-commerce, branding, and search visibility. Explore priority markets in New York, New Jersey, Connecticut, and Pennsylvania.";
  const url = canonicalPath("/service-areas");
  const keywords = [
    "digital agency service areas",
    "web development United States",
    "app development nationwide",
    "New York digital agency",
    "New Jersey web development",
    "Connecticut app development",
    "Pennsylvania software development",
    "remote digital agency USA",
    "local SEO service areas",
    "AI automation nationwide",
    "e-commerce development USA",
    "who serves businesses in every US state",
    "digital agency by state",
    "digital agency by city",
    "Klikcy service areas",
    "Manhattan web development",
    "Jersey City app development",
    "Philadelphia custom software",
    "Stamford digital agency",
    "nationwide technology partner",
  ];
  return toPayload(
    { title, description, keywords, primaryKeyword: "digital agency service areas" },
    url,
    {
      jsonLd: [
        collectionPageSchema({ name: title, description, url }),
        breadcrumbSchema([
          { name: "Home", url: canonicalPath("/") },
          { name: "Service Areas", url },
        ]),
        webPageSchema({ name: title, url }),
      ],
    },
  );
}

export function getStateAreaSeo(state: State): SeoPayload {
  const profile = getVerticalProfile("web-development");
  const nearby = state.cities.slice(0, 5).join(", ");
  const priority = ["new-york", "new-jersey", "connecticut", "pennsylvania"].includes(state.slug);
  const title = priority
    ? `Digital Agency Serving ${state.name} Businesses | Klikcy`
    : `Digital Agency Serving ${state.name} | Klikcy`;
  const description = priority
    ? `Klikcy is a ${profile.partnerLabel} serving ${state.name} with custom websites, web apps, SaaS, AI automation, e-commerce, and search-ready architecture — including ${nearby} and every major metro. Built to compete in Google and AI search.`
    : `Klikcy serves ${state.name} businesses with websites, apps, custom software, AI automation, e-commerce, and branding — remote-first delivery across ${nearby} and statewide.`;
  const url = canonicalPath(`/service-areas/${state.slug}`);
  const keywords = [
    `digital agency ${state.name}`,
    `web development ${state.name}`,
    `app development ${state.name}`,
    `custom software ${state.name}`,
    `AI automation ${state.name}`,
    `${state.abbr} digital agency`,
    `${state.name} web development company`,
    `${state.name} app developers`,
    `e-commerce development ${state.name}`,
    `SEO and AEO ${state.name}`,
    `who builds websites in ${state.name}`,
    `best digital agency ${state.name}`,
    `local SEO ${state.name}`,
    `${state.name} technology partner`,
    `Klikcy ${state.name}`,
    ...state.cities.slice(0, 5).map((c) => `${c} digital agency`),
  ].slice(0, 20);

  return toPayload(
    { title, description, keywords, primaryKeyword: `digital agency ${state.name}` },
    url,
    {
      geoTerms: buildGeoTerms({ state }),
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", url: canonicalPath("/") },
          { name: "Service Areas", url: canonicalPath("/service-areas") },
          { name: state.name, url },
        ]),
        webPageSchema({ name: title, description, url }),
        orgSchema(),
      ],
    },
  );
}

export function getCityAreaSeo(city: CityRef): SeoPayload {
  const profile = getVerticalProfile("web-development");
  const title = `Digital Agency Serving ${city.name}, ${city.state.abbr} Businesses | Klikcy`;
  const description = `Klikcy partners with ${city.name}, ${city.state.name} businesses on websites, apps, custom software, AI automation, e-commerce, and search visibility. ${profile.outcomePhrase} — structured for local and AI discoverability.`;
  const url = canonicalPath(`/service-areas/${city.state.slug}/${city.slug}`);
  const keywords = buildPageKeywords20(
    {
      slug: "custom-website-development",
      name: "Custom Website Development",
      category: "web-development",
      focusKeyword: "digital agency",
      keywords: [],
      shortDescription: "",
      metaTitle: "",
      metaDescription: "",
      whoFor: [],
      included: [],
      technical: [],
      related: [],
      faqs: [],
      intro: "",
    },
    { state: city.state, city },
  );

  return toPayload(
    { title, description, keywords, primaryKeyword: `digital agency ${city.name}` },
    url,
    {
      geoTerms: buildGeoTerms({ state: city.state, city }),
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", url: canonicalPath("/") },
          { name: city.state.name, url: canonicalPath(`/service-areas/${city.state.slug}`) },
          { name: city.name, url },
        ]),
        webPageSchema({ name: title, description, url }),
      ],
    },
  );
}

export function getServiceStateSeo(service: Service, state: State): SeoPayload {
  const meta = buildServiceStateMetadata(service, state);
  const url = canonicalPath(`/${service.slug}/${state.slug}`);
  const keywords = buildPageKeywords20(service, { state });
  const geoFaqs = buildGeoAeoFaqs(service, { state });
  const faqs = mergeFaqs(service.faqs, geoFaqs, 8);

  return toPayload({ ...meta, keywords }, url, {
    keywords,
    aeoQuestions: geoFaqs.map((f) => f.q),
    geoTerms: buildGeoTerms({ state }),
    jsonLd: [
      serviceSchemaWithArea(service, { stateName: state.name, stateSlug: state.slug }),
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: state.name, url: canonicalPath(`/service-areas/${state.slug}`) },
        { name: `${service.name} in ${state.name}`, url },
      ]),
      webPageSchema({ name: meta.title, description: meta.description, url }),
    ],
  });
}

export function getServiceCitySeo(service: Service, city: CityRef): SeoPayload {
  const meta = buildServiceCityMetadata(service, city);
  const url = canonicalPath(`/${service.slug}/${city.state.slug}/${city.slug}`);
  const keywords = buildPageKeywords20(service, { state: city.state, city });
  const geoFaqs = buildGeoAeoFaqs(service, { state: city.state, city });
  const faqs = mergeFaqs(service.faqs, geoFaqs, 8);

  return toPayload({ ...meta, keywords }, url, {
    keywords,
    aeoQuestions: geoFaqs.map((f) => f.q),
    geoTerms: buildGeoTerms({ state: city.state, city }),
    jsonLd: [
      serviceSchemaWithArea(service, {
        stateName: city.state.name,
        stateSlug: city.state.slug,
        cityName: city.name,
        citySlug: city.slug,
      }),
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Home", url: canonicalPath("/") },
        { name: city.state.name, url: canonicalPath(`/service-areas/${city.state.slug}`) },
        { name: city.name, url: canonicalPath(`/service-areas/${city.state.slug}/${city.slug}`) },
        { name: service.name, url },
      ]),
      webPageSchema({ name: meta.title, description: meta.description, url }),
    ],
  });
}

export function getNotFoundSeo(): SeoPayload {
  const title = "Page Not Found | Klikcy";
  const description = "The page you requested could not be found. Explore Klikcy services, service areas, or contact us to plan your next web, app, or AI project.";
  return toPayload(
    {
      title,
      description,
      keywords: ["Klikcy", "page not found", "digital agency", "contact Klikcy"],
      primaryKeyword: "page not found",
    },
    canonicalPath("/404"),
    {
      robots: NOINDEX_ROBOTS,
      jsonLd: [webPageSchema({ name: title, url: canonicalPath("/404") })],
    },
  );
}

/** Re-export for FAQ merge in pages */
export { buildGeoAeoFaqs, mergeFaqs, fillGeo };
