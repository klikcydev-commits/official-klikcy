import { states, type State } from "./states";
import { CITY_SLUG_ALIASES, resolveCitySlug } from "./seo/priorityMarkets";

export const citySlug = (city: string) =>
  city
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export interface CityRef {
  name: string;
  slug: string;
  state: State;
}

export const getCitiesForState = (state: State): CityRef[] =>
  state.cities.map((name) => ({ name, slug: citySlug(name), state }));

export const getCity = (stateSlug: string, citySlugStr: string): CityRef | undefined => {
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return;
  const resolved = resolveCitySlug(stateSlug, citySlugStr);
  const name = state.cities.find((c) => citySlug(c) === resolved);
  if (!name) return;
  return { name, slug: resolved, state };
};

/** Resolve legacy city slugs (e.g. bronx → the-bronx) for redirects. */
export const getCitySlugRedirect = (stateSlug: string, citySlugStr: string): string | undefined => {
  const alias = CITY_SLUG_ALIASES[stateSlug]?.[citySlugStr];
  return alias && alias !== citySlugStr ? alias : undefined;
};

export const allCities = (): CityRef[] => states.flatMap(getCitiesForState);
