import { LEGACY_SERVICE_SLUG_REDIRECTS } from "./legacy-service-slugs";
import { CITY_SLUG_ALIASES } from "./seo/priorityMarkets";

/**
 * Typed redirect rules for app/tests. Edge config loads the mirrored rules from `redirects.mjs`
 * (Next 14 does not support next.config.ts). Keep slug maps in sync with redirects.mjs.
 */
export type LegacyRedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

/**
 * Emit both slashed and unslashed source patterns.
 * With `trailingSlash: true`, Next normalizes most requests to the trailing-slash form
 * before matching redirects; we register both variants so legacy bookmarks and crawlers
 * that omit the slash still receive a 308.
 */
function slashVariants(source: string, destination: string): LegacyRedirectRule[] {
  const normalizedDest = destination.endsWith("/") ? destination : `${destination}/`;
  const bare = source.endsWith("/") ? source.slice(0, -1) : source;
  const slashed = `${bare}/`;
  return [
    { source: bare, destination: normalizedDest, permanent: true },
    { source: slashed, destination: normalizedDest, permanent: true },
  ];
}

function buildServiceSlugRedirects(): LegacyRedirectRule[] {
  const rules: LegacyRedirectRule[] = [
    ...slashVariants("/services", "/all-services/"),
  ];

  for (const [from, to] of Object.entries(LEGACY_SERVICE_SLUG_REDIRECTS)) {
    if (from === to) continue;

    rules.push(...slashVariants(`/services/${from}`, `/services/${to}/`));

    // Programmatic geo tree: /{service}/{state}/{city}/ and deeper
    rules.push(
      { source: `/${from}/:path*`, destination: `/${to}/:path*`, permanent: true },
    );
  }

  return rules;
}

function buildCityAliasRedirects(): LegacyRedirectRule[] {
  const rules: LegacyRedirectRule[] = [];

  for (const [stateSlug, aliases] of Object.entries(CITY_SLUG_ALIASES)) {
    for (const [from, to] of Object.entries(aliases)) {
      if (from === to) continue;

      rules.push(
        ...slashVariants(
          `/service-areas/${stateSlug}/${from}`,
          `/service-areas/${stateSlug}/${to}/`,
        ),
      );

      // Same city alias under every service geo path
      rules.push({
        source: `/:service/${stateSlug}/${from}/:path*`,
        destination: `/:service/${stateSlug}/${to}/:path*`,
        permanent: true,
      });
    }
  }

  return rules;
}

export function buildLegacyRedirects(): LegacyRedirectRule[] {
  return [...buildServiceSlugRedirects(), ...buildCityAliasRedirects()];
}

export const legacyRedirects: LegacyRedirectRule[] = buildLegacyRedirects();
