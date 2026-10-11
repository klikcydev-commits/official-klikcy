/**
 * Facts used to make each state hub genuinely specific: time zones, website-relevant
 * privacy laws, and industry needs. Privacy entries reflect laws in effect as of
 * PRIVACY_REVIEWED — re-check this file at least twice a year.
 */
import type { State } from "./states";

export const PRIVACY_REVIEWED = "October 2026";

export interface PrivacyNote {
  law: string;
  /** Year it took effect. */
  since: number;
  /** "comprehensive" = broad consumer privacy law; others are narrower but still relevant to websites. */
  kind: "comprehensive" | "health" | "biometric" | "security" | "limited";
  note?: string;
  /** Set for laws already signed but not yet in effect, e.g. "January 1, 2027". */
  takesEffect?: string;
}

const PRIVACY: Record<string, PrivacyNote> = {
  california: {
    law: "California Consumer Privacy Act (CCPA), as amended by the CPRA",
    since: 2020,
    kind: "comprehensive",
    note: "It's the strictest state law in practice: covered businesses need a detailed privacy policy, a way to opt out of the sale or sharing of personal data, and support for Global Privacy Control signals.",
  },
  virginia: { law: "Virginia Consumer Data Protection Act", since: 2023, kind: "comprehensive" },
  colorado: {
    law: "Colorado Privacy Act",
    since: 2023,
    kind: "comprehensive",
    note: "Covered businesses must honor universal opt-out signals such as Global Privacy Control.",
  },
  connecticut: { law: "Connecticut Data Privacy Act", since: 2023, kind: "comprehensive" },
  utah: { law: "Utah Consumer Privacy Act", since: 2023, kind: "comprehensive" },
  texas: {
    law: "Texas Data Privacy and Security Act",
    since: 2024,
    kind: "comprehensive",
    note: "Unlike most state laws, it isn't triggered by a data-volume threshold; it applies to businesses that aren't classed as small businesses under SBA standards.",
  },
  oregon: { law: "Oregon Consumer Privacy Act", since: 2024, kind: "comprehensive" },
  montana: { law: "Montana Consumer Data Privacy Act", since: 2024, kind: "comprehensive" },
  iowa: { law: "Iowa Consumer Data Protection Act", since: 2025, kind: "comprehensive" },
  delaware: { law: "Delaware Personal Data Privacy Act", since: 2025, kind: "comprehensive" },
  nebraska: {
    law: "Nebraska Data Privacy Act",
    since: 2025,
    kind: "comprehensive",
    note: "Like Texas, it applies based on business size rather than the number of consumers whose data you handle.",
  },
  "new-hampshire": { law: "New Hampshire's consumer data privacy law", since: 2025, kind: "comprehensive" },
  "new-jersey": { law: "New Jersey Data Privacy Act", since: 2025, kind: "comprehensive" },
  tennessee: { law: "Tennessee Information Protection Act", since: 2025, kind: "comprehensive" },
  minnesota: { law: "Minnesota Consumer Data Privacy Act", since: 2025, kind: "comprehensive" },
  maryland: {
    law: "Maryland Online Data Privacy Act",
    since: 2025,
    kind: "comprehensive",
    note: "It includes some of the tightest data-minimization rules of any state law, so collecting only what a form genuinely needs matters here.",
  },
  indiana: { law: "Indiana Consumer Data Protection Act", since: 2026, kind: "comprehensive" },
  kentucky: { law: "Kentucky Consumer Data Protection Act", since: 2026, kind: "comprehensive" },
  "rhode-island": { law: "Rhode Island Data Transparency and Privacy Protection Act", since: 2026, kind: "comprehensive" },
  // Signed in 2026, not yet in effect (verified against law-firm summaries, October 2026).
  oklahoma: { law: "Oklahoma Consumer Data Privacy Act", since: 2027, kind: "comprehensive", takesEffect: "January 1, 2027" },
  louisiana: { law: "Louisiana Data Privacy Act", since: 2027, kind: "comprehensive", takesEffect: "January 1, 2027" },
  alabama: { law: "Alabama Personal Data Protection Act", since: 2027, kind: "comprehensive", takesEffect: "May 1, 2027" },
  vermont: {
    law: "Vermont Data Privacy and Online Surveillance Act",
    since: 2028,
    kind: "comprehensive",
    takesEffect: "January 1, 2028",
    note: "It will also require privacy policies to say whether personal data is used to train AI models, which matters if your site feeds an AI tool.",
  },
  florida: {
    law: "Florida Digital Bill of Rights",
    since: 2024,
    kind: "limited",
    note: "Its main obligations apply only to very large companies, but Florida also has strict rules on telemarketing and text messages that affect lead forms and SMS follow-up.",
  },
  washington: {
    law: "My Health My Data Act",
    since: 2024,
    kind: "health",
    note: "It covers consumer health data broadly, so clinics, wellness brands, and apps collecting anything health-related need explicit consent flows.",
  },
  nevada: {
    law: "Nevada's online privacy notice and consumer health data laws",
    since: 2024,
    kind: "limited",
    note: "Websites collecting personal information from Nevada residents need a privacy notice and a way to opt out of the sale of data.",
  },
  illinois: {
    law: "Biometric Information Privacy Act (BIPA)",
    since: 2008,
    kind: "biometric",
    note: "Any feature using face, fingerprint, or voice data needs written consent first. Lawsuits under BIPA are common and expensive.",
  },
  "new-york": {
    law: "SHIELD Act",
    since: 2020,
    kind: "security",
    note: "It requires reasonable safeguards for New Yorkers' private information, which covers how your website stores form submissions and customer data.",
  },
};

export function getPrivacyNote(state: State): PrivacyNote | undefined {
  return PRIVACY[state.slug];
}

const TIME_ZONES: Record<string, string> = {
  alabama: "Central Time",
  alaska: "Alaska Time",
  arizona: "Mountain Standard Time all year (most of Arizona doesn't observe daylight saving time)",
  arkansas: "Central Time",
  california: "Pacific Time",
  colorado: "Mountain Time",
  connecticut: "Eastern Time",
  delaware: "Eastern Time",
  florida: "Eastern Time (Central in the western Panhandle)",
  georgia: "Eastern Time",
  hawaii: "Hawaii Time, with no daylight saving time",
  idaho: "Mountain Time in the south, Pacific Time in the northern panhandle",
  illinois: "Central Time",
  indiana: "Eastern Time for most of the state, Central in the northwest and southwest corners",
  iowa: "Central Time",
  kansas: "Central Time for nearly all of the state",
  kentucky: "Eastern Time in the east, Central Time in the west",
  louisiana: "Central Time",
  maine: "Eastern Time",
  maryland: "Eastern Time",
  massachusetts: "Eastern Time",
  michigan: "Eastern Time for nearly all of the state",
  minnesota: "Central Time",
  mississippi: "Central Time",
  missouri: "Central Time",
  montana: "Mountain Time",
  nebraska: "Central Time in the east, Mountain Time in the west",
  nevada: "Pacific Time",
  "new-hampshire": "Eastern Time",
  "new-jersey": "Eastern Time",
  "new-mexico": "Mountain Time",
  "new-york": "Eastern Time",
  "north-carolina": "Eastern Time",
  "north-dakota": "Central Time for most of the state",
  ohio: "Eastern Time",
  oklahoma: "Central Time",
  oregon: "Pacific Time for nearly all of the state",
  pennsylvania: "Eastern Time",
  "rhode-island": "Eastern Time",
  "south-carolina": "Eastern Time",
  "south-dakota": "Central Time in the east, Mountain Time in the west (including Rapid City)",
  tennessee: "Central Time in Nashville and Memphis, Eastern Time in Knoxville and Chattanooga",
  texas: "Central Time, except El Paso and the far west on Mountain Time",
  utah: "Mountain Time",
  vermont: "Eastern Time",
  virginia: "Eastern Time",
  washington: "Pacific Time",
  "west-virginia": "Eastern Time",
  wisconsin: "Central Time",
  wyoming: "Mountain Time",
  "washington-dc": "Eastern Time",
};

export function getTimeZone(state: State): string {
  return TIME_ZONES[state.slug] ?? "your local time zone";
}

export interface IndustryNeed {
  label: string;
  need: string;
  services: string[];
}

/** Keyed by the industry words used in `State.blurb`. */
const INDUSTRIES: Record<string, IndustryNeed> = {
  manufacturing: {
    label: "Manufacturing",
    need: "B2B buyers research suppliers online long before they call. Clear capability pages, spec sheets, and quote forms that route to the right person do most of the selling.",
    services: ["custom-website-development", "seo-content-strategy", "crm-automation"],
  },
  healthcare: {
    label: "Healthcare",
    need: "Patients compare providers on their phones. Fast, accessible sites, online booking, and local search visibility matter, and patient data needs careful handling.",
    services: ["local-seo", "custom-website-development", "ai-chatbot-development"],
  },
  aerospace: {
    label: "Aerospace",
    need: "Long sales cycles and technical buyers call for precise capability content, secure document sharing, and sites that hold up to procurement scrutiny.",
    services: ["custom-website-development", "seo-content-strategy", "website-security"],
  },
  energy: {
    label: "Energy",
    need: "Energy companies need credible, technical websites, project portfolios, and internal tools for field teams and reporting.",
    services: ["custom-website-development", "custom-business-software", "reporting-automation"],
  },
  logistics: {
    label: "Logistics",
    need: "Quote requests, shipment tracking, and customer portals reduce phone volume, and automation removes a lot of manual data entry.",
    services: ["web-app-development", "workflow-automation", "data-extraction-automation"],
  },
  tourism: {
    label: "Tourism",
    need: "Visitors plan and book on their phones, often from out of state. Fast pages, clear booking, and strong local search visibility drive reservations.",
    services: ["local-seo", "website-speed-optimization", "google-business-profile-optimization"],
  },
  tech: {
    label: "Technology",
    need: "Tech companies need fast marketing sites that sit comfortably beside the product, plus help shipping product features faster.",
    services: ["nextjs-development", "saas-development", "technical-seo"],
  },
  technology: {
    label: "Technology",
    need: "Tech companies need fast marketing sites that sit comfortably beside the product, plus help shipping product features faster.",
    services: ["nextjs-development", "saas-development", "technical-seo"],
  },
  "real estate": {
    label: "Real estate",
    need: "Agents and brokerages compete hard in local search, and buyers expect listings, neighborhood pages, and instant responses to inquiries.",
    services: ["local-seo", "custom-website-development", "crm-automation"],
  },
  retail: {
    label: "Retail",
    need: "Retailers selling online and in store need shared inventory, a fast storefront, and local visibility for the physical locations.",
    services: ["shopify-store-development", "local-seo", "shipping-integration"],
  },
  agriculture: {
    label: "Agriculture",
    need: "Agricultural businesses often sell B2B or direct to consumer, and benefit from simple ordering, clear product information, and operational tools.",
    services: ["custom-website-development", "custom-business-software", "shopify-store-development"],
  },
  entertainment: {
    label: "Entertainment",
    need: "Entertainment brands need visually strong sites that still load fast, plus ticketing, memberships, or content platforms.",
    services: ["ui-ux-design", "web-app-development", "website-speed-optimization"],
  },
  biotech: {
    label: "Biotech",
    need: "Biotech firms need credible sites for investors, partners, and recruits, with careful, compliant communication about science and pipelines.",
    services: ["custom-website-development", "brand-identity", "seo-content-strategy"],
  },
  "dtc commerce": {
    label: "Direct-to-consumer brands",
    need: "DTC brands live and die by conversion rate and repeat purchases: fast product pages, a simple checkout, and well-built email flows.",
    services: ["shopify-store-development", "checkout-optimization", "email-marketing-setup"],
  },
  dtc: {
    label: "Direct-to-consumer brands",
    need: "DTC brands live and die by conversion rate and repeat purchases: fast product pages, a simple checkout, and well-built email flows.",
    services: ["shopify-store-development", "checkout-optimization", "email-marketing-setup"],
  },
  "outdoor brands": {
    label: "Outdoor brands",
    need: "Outdoor and lifestyle brands need storytelling sites that still sell well, with product content good enough to compete with big retailers.",
    services: ["shopify-store-development", "brand-identity", "ecommerce-seo"],
  },
  cannabis: {
    label: "Cannabis",
    need: "Cannabis businesses face advertising restrictions, which makes organic search, local visibility, and age-gated sites especially important.",
    services: ["local-seo", "custom-website-development", "google-business-profile-optimization"],
  },
  finance: {
    label: "Finance",
    need: "Financial firms need trustworthy, secure sites, clear disclosures, and lead handling that respects compliance requirements.",
    services: ["custom-website-development", "website-security", "crm-automation"],
  },
  insurance: {
    label: "Insurance",
    need: "Insurance agencies and carriers rely on quote forms, local search, and fast follow-up on every lead.",
    services: ["local-seo", "landing-page-design", "crm-automation"],
  },
  "professional services": {
    label: "Professional services",
    need: "Firms win work on reputation, so the site has to show expertise clearly, with strong service pages, team bios, and easy booking.",
    services: ["custom-website-development", "seo-content-strategy", "conversion-focused-website-design"],
  },
  legal: {
    label: "Legal",
    need: "Law firms compete for high-value local searches and need practice area pages that answer real questions, plus intake that responds quickly.",
    services: ["local-seo", "on-page-seo", "ai-chatbot-development"],
  },
  "corporate services": {
    label: "Corporate services",
    need: "Corporate service providers need precise, credible sites and efficient client onboarding.",
    services: ["custom-website-development", "custom-business-software", "workflow-automation"],
  },
  hospitality: {
    label: "Hospitality",
    need: "Hotels, restaurants, and venues need direct booking, strong Google Business Profiles, and fast mobile pages.",
    services: ["google-business-profile-optimization", "local-seo", "website-speed-optimization"],
  },
  "e-commerce": {
    label: "E-commerce",
    need: "Online sellers need a fast store, a simple checkout, and search visibility that reduces dependence on paid ads and marketplaces.",
    services: ["shopify-store-development", "ecommerce-seo", "checkout-optimization"],
  },
  fintech: {
    label: "Fintech",
    need: "Fintech products need secure, well-architected applications and marketing sites that explain complex products simply.",
    services: ["saas-development", "api-development", "ui-ux-design"],
  },
  media: {
    label: "Media",
    need: "Media companies need fast, ad-friendly sites that handle traffic spikes, plus solid technical SEO for large archives.",
    services: ["nextjs-development", "technical-seo", "website-speed-optimization"],
  },
  "local services": {
    label: "Local services",
    need: "Service businesses win on the map pack and on reviews, and lose leads when nobody answers quickly.",
    services: ["local-seo", "google-business-profile-optimization", "crm-automation"],
  },
  saas: {
    label: "SaaS",
    need: "SaaS companies need product engineering help, fast marketing sites, and content that ranks for the problems their product solves.",
    services: ["saas-development", "nextjs-development", "seo-content-strategy"],
  },
  automotive: {
    label: "Automotive",
    need: "Dealers, suppliers, and service shops need inventory and parts search, local visibility, and fast lead follow-up.",
    services: ["local-seo", "custom-website-development", "crm-automation"],
  },
  trades: {
    label: "Trades",
    need: "Contractors and trades win jobs through local search, reviews, and quick replies to quote requests.",
    services: ["local-seo", "google-business-profile-optimization", "landing-page-design"],
  },
  gaming: {
    label: "Gaming",
    need: "Gaming and entertainment venues need striking, fast sites, booking and promotions, and careful handling of marketing rules.",
    services: ["ui-ux-design", "website-speed-optimization", "web-app-development"],
  },
  pharma: {
    label: "Pharma",
    need: "Pharmaceutical companies need compliant, accessible sites with careful content review and strong security.",
    services: ["custom-website-development", "website-security", "design-systems"],
  },
  defense: {
    label: "Defense",
    need: "Defense contractors need secure, accessible sites that meet federal procurement expectations, including Section 508 accessibility.",
    services: ["custom-website-development", "website-security", "technical-seo"],
  },
  fashion: {
    label: "Fashion",
    need: "Fashion brands need visually strong stores with excellent product imagery, size guidance, and returns information.",
    services: ["shopify-store-development", "product-page-optimization", "brand-identity"],
  },
  education: {
    label: "Education",
    need: "Schools and education companies need accessible sites, clear enrollment paths, and often learning or member portals.",
    services: ["custom-website-development", "web-app-development", "ui-ux-design"],
  },
  government: {
    label: "Government",
    need: "Government contractors and agencies need accessible (Section 508 and WCAG) sites and secure, reliable hosting.",
    services: ["custom-website-development", "website-security", "hosting-setup"],
  },
  nonprofits: {
    label: "Nonprofits",
    need: "Nonprofits need sites that make giving and volunteering easy, tell their story clearly, and are simple for small teams to update.",
    services: ["wordpress-development", "conversion-focused-website-design", "email-marketing-setup"],
  },
  policy: {
    label: "Policy and advocacy",
    need: "Policy organizations publish constantly, so they need fast, well-structured publishing platforms and good search visibility for their research.",
    services: ["wordpress-development", "technical-seo", "seo-content-strategy"],
  },
  cloud: {
    label: "Cloud and infrastructure",
    need: "Cloud companies need developer-friendly documentation, fast marketing sites, and product engineering support.",
    services: ["nextjs-development", "api-development", "saas-development"],
  },
  music: {
    label: "Music",
    need: "Music businesses need visually distinctive sites, event listings, and stores for merchandise and tickets.",
    services: ["ui-ux-design", "shopify-store-development", "website-speed-optimization"],
  },
  "food brands": {
    label: "Food brands",
    need: "Food and beverage brands need appetizing stores, wholesale ordering, and subscription options.",
    services: ["shopify-store-development", "brand-identity", "email-marketing-setup"],
  },
  services: {
    label: "Service businesses",
    need: "Service businesses grow through local search, reviews, and fast responses to inquiries.",
    services: ["local-seo", "custom-website-development", "crm-automation"],
  },
};

/** Split "finance, insurance and professional services" into industry keys. */
export function getStateIndustries(state: State): IndustryNeed[] {
  const keys = state.blurb
    .split(/,\s*|\s+and\s+/)
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);
  const seen = new Set<string>();
  const out: IndustryNeed[] = [];
  for (const key of keys) {
    const item = INDUSTRIES[key];
    if (!item || seen.has(item.label)) continue;
    seen.add(item.label);
    out.push(item);
  }
  return out;
}

/** Used by the content check script to catch blurb words with no industry entry. */
export function unknownIndustryKeys(state: State): string[] {
  return state.blurb
    .split(/,\s*|\s+and\s+/)
    .map((k) => k.trim().toLowerCase())
    .filter((k) => k && !INDUSTRIES[k]);
}
