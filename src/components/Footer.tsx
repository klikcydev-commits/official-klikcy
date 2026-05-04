import { Link } from "react-router-dom";
import { navGroups } from "@/lib/nav-groups";
import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { priorityStates } from "@/lib/states";

const Footer = () => (
  <footer className="relative border-t border-white/10 bg-void text-white">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden />
    <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" aria-hidden />
    <div className="container-x relative py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Link
            to="/"
            className="inline-block rounded-lg font-display text-3xl font-extrabold tracking-tight text-white transition hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Klikcy
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 sm:text-[0.9375rem]">
            Websites, SEO &amp; AEO, AI automation, apps, commerce, brand, marketing, and technical hosting — built as one
            connected system for U.S. businesses.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Request a strategy call
          </Link>
          <nav className="mt-10 border-t border-white/10 pt-8" aria-label="Footer company">
            <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">Company</div>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <Link to="/about" className="text-white/75 transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="text-white/75 transition hover:text-white">
                  Service areas
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          {navGroups.map((g) => (
            <div key={g.id}>
              <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">{g.label}</div>
              <p className="mt-1 text-xs text-white/45">{g.tagline}</p>
              <ul className="mt-5 space-y-6" role="list">
                {g.categorySlugs.map((slug) => {
                  const c = categories.find((x) => x.slug === slug);
                  if (!c) return null;
                  return (
                    <li key={slug}>
                      <Link to={`/categories/${slug}`} className="font-display text-sm font-bold text-white transition hover:text-primary-light">
                        {c.name}
                      </Link>
                      <ul className="mt-2 space-y-1.5 border-l border-white/10 pl-3" role="list">
                        {getServicesByCategory(slug)
                          .slice(0, 4)
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="text-[0.8125rem] leading-snug text-white/55 transition hover:text-white"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 border-t border-white/10 pt-10">
        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">Priority hubs</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link
              key={s.slug}
              to={`/service-areas/${s.slug}`}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:border-primary/50 hover:bg-white/10 hover:text-white"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Klikcy. All rights reserved.</p>
        <p className="max-w-md text-left sm:text-right">Serving businesses across the United States.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
