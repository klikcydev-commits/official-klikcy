import Link from "next/link";
import { getAllServicesNavCategories, getPrimaryNavCategories } from "@/lib/nav-categories";
import { priorityStates } from "@/lib/states";

const Footer = () => {
  const primaryCategories = getPrimaryNavCategories();
  const nestedCategories = getAllServicesNavCategories();

  return (
    <footer className="surface-dark relative border-t border-white/10 bg-void text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" aria-hidden />

      <div className="container-x relative py-12 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Link
              href="/"
              className="inline-block rounded-lg font-display text-3xl font-extrabold tracking-tight text-white transition hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              Klikcy
            </Link>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
              Websites, SEO &amp; AEO, AI automation, apps, commerce, brand, marketing, and technical hosting — built as one
              connected system for U.S. businesses.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/contact" className="btn-primary">
              Get Free Quote
            </Link>
          </div>
        </div>

        <div className="grid gap-9 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer company">
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">Company</div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <Link href="/about" className="text-white/75 transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/75 transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="text-white/75 transition hover:text-white">
                  Service areas
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer main services">
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">Main Services</div>
            <ul className="mt-4 space-y-2">
              {primaryCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm font-semibold text-white/75 transition hover:text-white">
                    {cat.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer all services">
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">All Services</div>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/all-services" className="text-sm font-semibold text-white transition hover:text-primary-light">
                  Browse full catalog
                </Link>
              </li>
              {nestedCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm font-semibold text-white/75 transition hover:text-white">
                    {cat.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">Priority hubs</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {priorityStates.slice(0, 8).map((s) => (
                <Link
                  key={s.slug}
                  href={`/service-areas/${s.slug}`}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-primary/50 hover:bg-white/10 hover:text-white"
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href="/service-areas"
                className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-light transition hover:border-primary/55 hover:bg-primary/15"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Klikcy. All rights reserved.</p>
          <p className="max-w-md text-left sm:text-right">Serving businesses across the United States.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
