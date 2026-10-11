/** Legacy city slug → canonical slug (same state). Used for redirects from old URLs. */
export const CITY_SLUG_ALIASES: Record<string, Record<string, string>> = {
  "new-york": { bronx: "the-bronx" },
};

export function resolveCitySlug(stateSlug: string, citySlug: string): string {
  return CITY_SLUG_ALIASES[stateSlug]?.[citySlug] ?? citySlug;
}
