/**
 * Edge redirect rules for next.config.mjs (Next 14 cannot import .ts config).
 * Logic mirrors `redirects.ts`; data is sourced from the same slug maps.
 */

/** @type {Record<string, string>} */
export const LEGACY_SERVICE_SLUG_REDIRECTS = {
  "web-development": "custom-website-development",
  "app-development": "mobile-app-development",
  "ui-ux-design": "ui-ux-design",
  "digital-marketing": "digital-marketing-strategy",
  "ai-automations": "ai-chatbot-development",
  "saas-application-development": "saas-development",
  "cro-seo": "conversion-rate-optimization",
  "e-commerce-development": "shopify-store-development",
  "ecommerce-development": "shopify-store-development",
};

/** @type {Record<string, Record<string, string>>} */
export const CITY_SLUG_ALIASES = {
  "new-york": { bronx: "the-bronx" },
};

/**
 * @param {string} source
 * @param {string} destination
 */
function slashVariants(source, destination) {
  const normalizedDest = destination.endsWith("/") ? destination : `${destination}/`;
  const bare = source.endsWith("/") ? source.slice(0, -1) : source;
  const slashed = `${bare}/`;
  return [
    { source: bare, destination: normalizedDest, permanent: true },
    { source: slashed, destination: normalizedDest, permanent: true },
  ];
}

function buildServiceSlugRedirects() {
  /** @type {{ source: string; destination: string; permanent: true }[]} */
  const rules = [...slashVariants("/services", "/all-services/")];

  for (const [from, to] of Object.entries(LEGACY_SERVICE_SLUG_REDIRECTS)) {
    if (from === to) continue;
    rules.push(...slashVariants(`/services/${from}`, `/services/${to}/`));
    rules.push({
      source: `/${from}/:path*`,
      destination: `/${to}/:path*`,
      permanent: true,
    });
  }

  return rules;
}

function buildCityAliasRedirects() {
  /** @type {{ source: string; destination: string; permanent: true }[]} */
  const rules = [];

  for (const [stateSlug, aliases] of Object.entries(CITY_SLUG_ALIASES)) {
    for (const [from, to] of Object.entries(aliases)) {
      if (from === to) continue;
      rules.push(
        ...slashVariants(
          `/service-areas/${stateSlug}/${from}`,
          `/service-areas/${stateSlug}/${to}/`,
        ),
      );
      rules.push({
        source: `/:service/${stateSlug}/${from}/:path*`,
        destination: `/:service/${stateSlug}/${to}/:path*`,
        permanent: true,
      });
    }
  }

  return rules;
}

export function buildLegacyRedirects() {
  return [...buildServiceSlugRedirects(), ...buildCityAliasRedirects()];
}

export const legacyRedirects = buildLegacyRedirects();
