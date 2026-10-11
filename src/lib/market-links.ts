import { getCitiesForState } from "./cities";
import { getState } from "./states";
import { localMarkets, type LocalMarket } from "@/content/local-markets";

export interface MarketLink {
  href: string;
  label: string;
  state: string;
}

function toLink(m: LocalMarket): MarketLink {
  const state = getState(m.state)!;
  const name = getCitiesForState(state).find((c) => c.slug === m.city)?.name ?? m.city;
  return { href: `/service-areas/${m.state}/${m.city}`, label: name, state: state.name };
}

export const marketLinks: MarketLink[] = localMarkets.map(toLink);

export function marketLinksForState(stateSlug: string): MarketLink[] {
  return localMarkets.filter((m) => m.state === stateSlug).map(toLink);
}
