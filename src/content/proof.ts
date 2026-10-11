/**
 * Real client proof: testimonials and case studies.
 *
 * Everything here is published as-is, so only add entries that are TRUE and that the
 * client has agreed to (written permission is best). Invented or "representative"
 * reviews are illegal under the FTC's 2024 rule on fake reviews and testimonials.
 *
 * While both arrays are empty, every proof section on the site stays hidden and the
 * /work page is noindexed and unlinked. Add one entry and it appears automatically:
 *   - testimonials → homepage, About, and matching service pages (via `services`)
 *   - caseStudies  → homepage "Recent work", /work, header and footer links
 *
 * Example testimonial (copy, then edit with real details):
 *   {
 *     quote: "They rebuilt our site in six weeks and our quote requests doubled.",
 *     name: "Jane Smith",
 *     role: "Owner",
 *     company: "Smith Plumbing",
 *     location: "Austin, TX",
 *     services: ["custom-website-development", "local-seo"],
 *     source: "Google review",
 *     date: "2026-08",
 *   },
 *
 * Example case study:
 *   {
 *     slug: "smith-plumbing",
 *     client: "Smith Plumbing",
 *     industry: "Home services",
 *     location: "Austin, TX",
 *     year: 2026,
 *     services: ["custom-website-development", "local-seo"],
 *     summary: "A faster site and a rebuilt Google Business Profile for a family plumbing company.",
 *     challenge: "Their old site took 7 seconds to load on phones and most calls came from referrals only.",
 *     approach: ["Rebuilt the site on WordPress with one page per service", "Fixed their Google Business Profile categories"],
 *     results: [{ value: "2x", label: "quote requests in 3 months" }],
 *     url: "https://smithplumbing.example",
 *   },
 */

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  location?: string;
  /** Service slugs this review relates to, so it can appear on those service pages. */
  services?: string[];
  /** Where the review was originally given, e.g. "Google review" or "Clutch". */
  source?: string;
  /** "YYYY-MM" */
  date?: string;
}

export interface CaseStudyResult {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  location?: string;
  year: number;
  services: string[];
  summary: string;
  challenge: string;
  approach: string[];
  /** Measured outcomes only. Leave empty rather than estimate. */
  results: CaseStudyResult[];
  /** Live site, if the client is happy for it to be linked. */
  url?: string;
  testimonial?: Testimonial;
}

export const testimonials: Testimonial[] = [];

export const caseStudies: CaseStudy[] = [];

export const hasProof = testimonials.length > 0 || caseStudies.length > 0;

export function testimonialsForService(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.services?.includes(slug));
}
