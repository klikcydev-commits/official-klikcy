import { getCitiesForState } from "@/lib/cities";
import { getCityPopulation, getCityTier, type CityTier } from "@/lib/city-tiers";
import { isPriorityState } from "@/lib/seo/priorityMarkets";
import { getService, services } from "@/lib/services";
import { states } from "@/lib/states";

/**
 * City tiers considered for ISR warm-cache pre-render (with other gates below).
 * Tunable via this single export.
 */
export const PRERENDER_TIERS: CityTier[] = [1, 2];

/** Metro population floor (thousands) for build-time pre-render of service×city pages. */
export const PRERENDER_MIN_POPULATION_K = 400;

export function shouldPrerenderServiceCity(
  serviceSlug: string,
  stateSlug: string,
  citySlug: string,
): boolean {
  const service = getService(serviceSlug);
  if (!service || service.priority === false) return false;

  const popK = getCityPopulation(stateSlug, citySlug);
  if (popK !== undefined && popK >= PRERENDER_MIN_POPULATION_K) return true;

  return false;
}

export function shouldPrerenderAreaCity(stateSlug: string, citySlug: string): boolean {
  const popK = getCityPopulation(stateSlug, citySlug);
  if (popK !== undefined && popK >= 100) return true;
  if (!isPriorityState(stateSlug)) return false;
  return PRERENDER_TIERS.includes(getCityTier(stateSlug, citySlug));
}

export function getPrerenderServiceCityParams(): {
  service: string;
  state: string;
  city: string;
}[] {
  const params: { service: string; state: string; city: string }[] = [];
  for (const service of services) {
    for (const state of states) {
      for (const city of getCitiesForState(state)) {
        if (!shouldPrerenderServiceCity(service.slug, state.slug, city.slug)) continue;
        params.push({
          service: service.slug,
          state: state.slug,
          city: city.slug,
        });
      }
    }
  }
  return params;
}

export function getPrerenderServiceAreaCityParams(): { state: string; city: string }[] {
  const params: { state: string; city: string }[] = [];
  for (const state of states) {
    for (const city of getCitiesForState(state)) {
      if (!shouldPrerenderAreaCity(state.slug, city.slug)) continue;
      params.push({ state: state.slug, city: city.slug });
    }
  }
  return params;
}
