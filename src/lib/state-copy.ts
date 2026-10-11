import type { State } from "./states";
import { PRIVACY_REVIEWED, getPrivacyNote, getStateIndustries, getTimeZone } from "./state-details";
import { getService, type Service } from "./services";

const DEFAULT_SERVICES = ["custom-website-development", "local-seo", "technical-seo", "ai-business-automation", "website-maintenance", "shopify-store-development"];

/** Cities to name in copy, skipping any that just repeat the state name (e.g. "Washington DC"). */
export function localCities(state: State): string[] {
  return state.cities.filter((c) => c.toLowerCase() !== state.name.toLowerCase());
}

export function listCities(cities: string[]): string {
  if (cities.length <= 1) return cities.join("");
  if (cities.length === 2) return `${cities[0]} and ${cities[1]}`;
  return `${cities.slice(0, -1).join(", ")}, and ${cities[cities.length - 1]}`;
}

/** "the state", or "the District" for Washington DC. */
export function regionWord(state: State): string {
  return state.slug === "washington-dc" ? "the District" : "the state";
}

/** Short label for the privacy law, e.g. "Texas Data Privacy and Security Act (2024)" or "(takes effect 2027)". */
export function privacyLawLabel(state: State): string | undefined {
  const note = getPrivacyNote(state);
  if (!note) return undefined;
  return note.takesEffect ? `${note.law} (takes effect ${note.takesEffect})` : `${note.law} (${note.since})`;
}

/** Short time zone label for inline sentences ("Mountain Time"). */
export function shortTimeZone(state: State): string {
  const tz = getTimeZone(state);
  return tz.match(/^\w+(?: Standard)? Time/)?.[0] ?? tz;
}

export function getPrivacyParagraphs(state: State): string[] {
  const note = getPrivacyNote(state);
  const disclaimer = `This is general information, last reviewed in ${PRIVACY_REVIEWED}, not legal advice. Your attorney can confirm what applies to your business.`;

  if (note?.kind === "comprehensive" && note.takesEffect) {
    return [
      `${state.name} passed the ${note.law} in 2026. It takes effect on ${note.takesEffect}. ${
        note.note ?? "Like most state privacy laws, it will apply once a business crosses certain size or data-volume thresholds."
      }`,
      "Until then, laws in other states can still apply if you have customers there. If the new law will cover you, plan the changes before it starts: an accurate privacy notice, a working way for residents to opt out of targeted advertising or the sale of their data, and cookie consent and lead forms that match what your policy says. Those are much easier to build in now than to retrofit later.",
      disclaimer,
    ];
  }

  if (note?.kind === "comprehensive") {
    return [
      `${state.name}'s ${note.law} has been in effect since ${note.since}. ${
        note.note ??
        "Like most state privacy laws, it applies once a business crosses certain size or data-volume thresholds."
      }`,
      "If it covers you, your website needs an accurate privacy notice and a working way for residents to exercise their rights, such as opting out of targeted advertising or the sale of their data. That affects your cookie banner, analytics and ad tags, and the forms you use to collect leads. We set these up so the site matches what your privacy policy says.",
      disclaimer,
    ];
  }

  if (note) {
    return [
      `${state.name} doesn't have a broad consumer privacy law in effect, but the ${note.law} (in effect since ${note.since}) is the rule most likely to affect your website. ${note.note ?? ""}`.trim(),
      "If you also have customers in states with comprehensive privacy laws, such as California or Texas, those rules can apply to you as well. We configure cookie consent, analytics, and lead forms with that in mind.",
      disclaimer,
    ];
  }

  return [
    `${state.name} doesn't have a comprehensive consumer privacy law in effect as of our last review. Like every state, it does have a data breach notification law, so any personal information your website collects still needs to be stored and handled securely.`,
    "If you sell to customers in states with stricter laws, such as California, Texas, or New Jersey, those rules can still apply to you. We set up cookie consent, analytics, and lead forms so you're covered as you grow.",
    disclaimer,
  ];
}

export function getStateServices(state: State): Service[] {
  const slugs = [...getStateIndustries(state).flatMap((i) => i.services), ...DEFAULT_SERVICES];
  const unique = slugs.filter((s, i) => slugs.indexOf(s) === i).slice(0, 6);
  return unique.map((s) => getService(s)).filter((s): s is Service => Boolean(s));
}

export function getStateFaqs(state: State): { q: string; a: string }[] {
  const tz = getTimeZone(state);
  const note = getPrivacyNote(state);
  const cities = listCities(localCities(state).slice(0, 3));
  return [
    {
      q: `Do you work with businesses in ${state.name}?`,
      a: `Yes. We work remotely with ${state.name} businesses of every size, from ${cities} to smaller communities across ${regionWord(state)}. Projects run the same way wherever you are: video calls, a shared staging link, and weekly updates.`,
    },
    {
      q: `Do you have an office in ${state.name}?`,
      a: "No, and we'd rather be upfront about it. Klikcy is a remote-first team. That keeps our costs down and means you never pay for travel, while you still talk to the same people throughout the project.",
    },
    {
      q: "What time zone will meetings be in?",
      a: `Yours. ${state.name} is on ${tz}, and we schedule calls inside your business hours.`,
    },
    {
      q: `Does ${state.name} have a privacy law that affects my website?`,
      a: note
        ? `The main one is the ${note.law}, ${note.takesEffect ? `which takes effect on ${note.takesEffect}` : `in effect since ${note.since}`}. Whether it applies depends on your business, so check with your attorney. We make sure your site's cookie consent, tracking, and forms match your privacy policy.`
        : `${state.name} doesn't have a comprehensive consumer privacy law as of our last review, but laws in other states can still apply if you have customers there. We set up consent and tracking so you're covered.`,
    },
  ];
}
