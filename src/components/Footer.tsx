import Link from "next/link";
import { categories } from "@/lib/categories";
import { SITE } from "@/lib/site";
import { caseStudies } from "@/content/proof";
import { marketLinks } from "@/lib/market-links";

const LOCATIONS = marketLinks.filter((m) =>
  ["New York City", "Manhattan", "Brooklyn", "Queens", "Jersey City", "Miami", "Boston"].includes(m.label),
);

const COMPANY = [
  ...(caseStudies.length > 0 ? [{ href: "/work", label: "Our work" }] : []),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/service-areas", label: "Where we work" },
  { href: "/all-services", label: "All services" },
];

const POPULAR = [
  { href: "/services/custom-website-development", label: "Custom website development" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/local-seo", label: "Local SEO" },
  { href: "/services/ai-chatbot-development", label: "AI chatbots" },
  { href: "/services/shopify-store-development", label: "Shopify stores" },
  { href: "/services/web-app-development", label: "Web apps" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-ink">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="text-2xl font-[680] text-white [font-variation-settings:'wdth'_122]">Klikcy</p>
          <p className="mt-4 text-white/70">
            Websites, search visibility, AI automation, and software for businesses across the United States.
            Remote-first, with fixed quotes and everything in your name.
          </p>
          <p className="mt-5">
            <a href={`mailto:${SITE.email}`} className="link">
              {SITE.email}
            </a>
          </p>
        </div>

        <nav aria-label="Services">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="text-white/70 no-underline hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular services">
          <p className="font-semibold text-white">Popular</p>
          <ul className="mt-4 space-y-2">
            {POPULAR.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 no-underline hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Locations">
          <p className="font-semibold text-white">Locations</p>
          <ul className="mt-4 space-y-2">
            {LOCATIONS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 no-underline hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-areas" className="text-white/70 no-underline hover:text-white hover:underline">
                All locations
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 no-underline hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:justify-between">
          <p>© {year} Klikcy. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/privacy" className="text-white/55 no-underline hover:text-white hover:underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="text-white/55 no-underline hover:text-white hover:underline">
                Accessibility
              </Link>
            </li>
            <li>Working with businesses in all 50 states and DC</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
