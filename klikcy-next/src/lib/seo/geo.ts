import type { State } from "../states";
import type { CityRef } from "../cities";
import { getPriorityNearbyPhrase, isPriorityCity, isPriorityState } from "./priorityMarkets";

export function geoLabel(geo?: { state: State; city?: CityRef }): string {
  if (geo?.city) return geo.city.name;
  if (geo?.state) return geo.state.name;
  return "the United States";
}

export function geoLabelWithAbbr(geo?: { state: State; city?: CityRef }): string {
  if (geo?.city) return `${geo.city.name}, ${geo.state.abbr}`;
  if (geo?.state) return geo.state.name;
  return "United States";
}

export function fillGeo(template: string, geo?: { state: State; city?: CityRef }): string {
  return template.replace(/\{geo\}/g, geoLabel(geo));
}

export function buildGeoTerms(geo?: { state: State; city?: CityRef }): string[] {
  if (!geo) return ["United States", "U.S. digital agency", "nationwide delivery"];
  const terms = [
    geo.state.name,
    geo.state.abbr,
    `${geo.state.name} businesses`,
    `${geo.state.name} digital agency`,
  ];
  if (geo.city) {
    terms.push(geo.city.name, `${geo.city.name} ${geo.state.abbr}`, `${geo.city.name} companies`);
  }
  if (isPriorityState(geo.state.slug)) {
    const nearby = getPriorityNearbyPhrase(geo.state.slug);
    if (nearby) terms.push(nearby);
  }
  if (geo.city && isPriorityCity(geo.state.slug, geo.city.slug)) {
    terms.push(`${geo.city.name} metro`, `local ${geo.city.name} market`);
  }
  return terms;
}
