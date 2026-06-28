import type { Service } from "./services";
import type { State } from "./states";

// Generate unique long-form content variations for service × state pages.
export const buildServiceStateContent = (service: Service, state: State) => {
  const { name: sName, focusKeyword, intro, included, technical } = service;
  const { name: stName, blurb, cities } = state;
  const topCities = cities.slice(0, 6);

  const sections = [
    {
      h: `${sName} for ${stName} businesses`,
      p: `Klikcy delivers ${focusKeyword} for companies across ${stName} — from ${topCities.slice(0, 3).join(", ")} to ${topCities.slice(3).join(", ") || "every metro in the state"}. ${stName}'s economy is anchored by ${blurb}, and our work is tailored to how those companies grow online.`,
    },
    {
      h: `Why ${stName} companies choose Klikcy`,
      p: `${intro} We work remotely with ${stName} clients, run discovery and design sprints over video, and ship engagements with the same standards we apply nationwide.`,
    },
    {
      h: `What's included in our ${sName} engagements`,
      list: included,
    },
    {
      h: `Technical foundation`,
      list: technical,
    },
    {
      h: `Cities we serve in ${stName}`,
      p: `We support ${sName} clients in ${cities.join(", ")} and every other ${stName} city. Remote-first delivery means location never limits the quality of work.`,
    },
  ];
  return sections;
};

export const stateIntroContent = (state: State) => ({
  hero: `Digital agency services across ${state.name}`,
  intro: `Klikcy partners with ${state.name} businesses on websites, SEO, AEO, AI automation and e-commerce. ${state.name}'s economy is shaped by ${state.blurb}, and our work helps companies in those industries win online — across ${state.cities.slice(0, 5).join(", ")} and every city in the state.`,
});
