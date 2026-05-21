/** Priority local SEO markets — stronger metadata, keywords, and schema context. */
export const PRIORITY_STATE_SLUGS = [
  "new-york",
  "new-jersey",
  "connecticut",
  "pennsylvania",
] as const;

export type PriorityStateSlug = (typeof PRIORITY_STATE_SLUGS)[number];

export const PRIORITY_CITY_SLUGS = [
  "new-york-city",
  "manhattan",
  "brooklyn",
  "queens",
  "the-bronx",
  "staten-island",
  "buffalo",
  "rochester",
  "yonkers",
  "syracuse",
  "albany",
  "new-rochelle",
  "mount-vernon",
  "schenectady",
  "utica",
  "white-plains",
  "long-island",
  "hempstead",
  "garden-city",
  "melville",
  "ithaca",
  "jersey-city",
  "newark",
  "hoboken",
  "englewood",
  "bergen-county",
  "fort-lee",
  "hackensack",
  "paramus",
  "paterson",
  "elizabeth",
  "edison",
  "woodbridge",
  "lakewood",
  "toms-river",
  "trenton",
  "clifton",
  "camden",
  "princeton",
  "morristown",
  "montclair",
  "stamford",
  "greenwich",
  "new-haven",
  "hartford",
  "bridgeport",
  "norwalk",
  "danbury",
  "waterbury",
  "new-britain",
  "bristol",
  "meriden",
  "west-hartford",
  "milford",
  "fairfield",
  "middletown",
  "philadelphia",
  "pittsburgh",
  "allentown",
  "lancaster",
  "harrisburg",
  "king-of-prussia",
  "scranton",
  "erie",
  "reading",
  "bethlehem",
  "york",
  "altoona",
  "wilkes-barre",
  "state-college",
  "conshohocken",
  "west-chester",
] as const;

export type PriorityCitySlug = (typeof PRIORITY_CITY_SLUGS)[number];

/** Legacy slug → canonical slug (same state). */
export const CITY_SLUG_ALIASES: Record<string, Record<string, string>> = {
  "new-york": { bronx: "the-bronx" },
};

const priorityStateSet = new Set<string>(PRIORITY_STATE_SLUGS);
const priorityCitySet = new Set<string>(PRIORITY_CITY_SLUGS);

export function isPriorityState(stateSlug: string): boolean {
  return priorityStateSet.has(stateSlug);
}

export function isPriorityCity(stateSlug: string, citySlug: string): boolean {
  return isPriorityState(stateSlug) && priorityCitySet.has(citySlug);
}

export function resolveCitySlug(stateSlug: string, citySlug: string): string {
  return CITY_SLUG_ALIASES[stateSlug]?.[citySlug] ?? citySlug;
}

const STATE_NEARBY: Record<string, string> = {
  "new-york": "Manhattan, Brooklyn, Queens, the Bronx, Staten Island, and the greater NYC metro",
  "new-jersey": "Bergen County, Jersey City, Newark, Hoboken, Englewood, and North Jersey",
  connecticut: "Stamford, Greenwich, New Haven, Hartford, Bridgeport, and Fairfield County",
  pennsylvania: "Philadelphia, Pittsburgh, King of Prussia, Lancaster, Harrisburg, and eastern PA",
};

export function getPriorityNearbyPhrase(stateSlug: string): string | undefined {
  return STATE_NEARBY[stateSlug];
}
