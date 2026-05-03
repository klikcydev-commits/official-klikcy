import { states, type State } from "./states";

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
  const name = state.cities.find((c) => citySlug(c) === citySlugStr);
  if (!name) return;
  return { name, slug: citySlugStr, state };
};

export const allCities = (): CityRef[] => states.flatMap(getCitiesForState);
