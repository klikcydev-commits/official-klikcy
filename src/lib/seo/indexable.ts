import { getCitiesForState, getCity, type CityRef } from "@/lib/cities";
import { getCityTier } from "@/lib/city-tiers";
import { getService, services, type Service } from "@/lib/services";
import { states } from "@/lib/states";

/** Tier-3 city pages for low-priority services are noindexed (still follow links). */
export function isIndexable(serviceSlug: string, stateSlug: string, citySlug: string): boolean {
  const service = getService(serviceSlug);
  const city = getCity(stateSlug, citySlug);
  if (!service || !city) return false;

  const tier = getCityTier(stateSlug, citySlug);
  const highPriorityService = service.priority !== false;
  if (tier === 3 && !highPriorityService) return false;
  return true;
}

export function countIndexableServiceCityPages(): { indexable: number; noindexed: number } {
  let indexable = 0;
  let noindexed = 0;
  for (const service of services) {
    for (const state of states) {
      for (const city of getCitiesForState(state)) {
        if (isIndexable(service.slug, state.slug, city.slug)) indexable += 1;
        else noindexed += 1;
      }
    }
  }
  return { indexable, noindexed };
}

export type ServiceCityContext = {
  service: Service;
  city: CityRef;
  tier: ReturnType<typeof getCityTier>;
};

export function buildServiceCityContext(service: Service, city: CityRef): ServiceCityContext {
  return {
    service,
    city,
    tier: getCityTier(city.state.slug, city.slug),
  };
}
