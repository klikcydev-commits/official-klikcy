import { Link } from "react-router-dom";
import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { priorityStates } from "@/lib/states";

const Footer = () => (
  <footer className="relative mt-20 border-t border-border bg-gradient-to-b from-[hsl(var(--soft-bg))] to-white sm:mt-24 lg:mt-28">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
    <div className="container-x pb-12 pt-16 sm:pb-14 sm:pt-20">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Link
            to="/"
            className="inline-block rounded-lg font-display text-2xl font-extrabold tracking-tight gradient-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Klikcy
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            Klikcy builds scalable websites, SEO/AEO systems, AI automations and e-commerce platforms for businesses across the
            United States.
          </p>
          <Link to="/contact" className="btn-primary mt-6 text-sm">
            Request a Strategy Call
          </Link>
          <nav className="mt-10 border-t border-border/80 pt-8" aria-label="Footer">
            <div className="micro-label mb-3">Explore</div>
            <ul className="flex flex-col gap-2 text-sm font-semibold text-navy-deep">
              <li>
                <Link
                  to="/about"
                  className="transition hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="transition hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Service areas (all states)
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
          {categories.map((c) => (
            <div key={c.slug}>
              <Link
                to={`/categories/${c.slug}`}
                className="font-display text-sm font-bold text-navy-deep transition hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {c.name}
              </Link>
              <ul className="mt-3 space-y-2">
                {getServicesByCategory(c.slug)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="text-sm leading-snug text-muted-foreground transition hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                to={`/categories/${c.slug}`}
                className="mt-3 inline-flex text-xs font-bold uppercase tracking-wide text-primary hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View all {c.short} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <div className="micro-label mb-4">Priority service hubs</div>
        <div className="flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link
              key={s.slug}
              to={`/service-areas/${s.slug}`}
              className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-deep shadow-sm transition hover:border-primary/50 hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Klikcy. Serving businesses across the United States.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/about" className="font-medium transition hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="font-medium transition hover:text-primary">
            Contact
          </Link>
          <Link to="/service-areas" className="font-medium transition hover:text-primary">
            Service areas
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
