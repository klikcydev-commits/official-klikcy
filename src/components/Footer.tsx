import { Link } from "react-router-dom";
import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { priorityStates } from "@/lib/states";

const Footer = () => (
  <footer className="mt-24 border-t border-border bg-gradient-to-b from-white to-[hsl(var(--soft-bg))]">
    <div className="container-x py-16">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="text-2xl font-extrabold gradient-text">Klikcy</span>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Klikcy builds scalable websites, SEO/AEO systems, AI automations and e-commerce platforms for businesses across the United States.
          </p>
          <Link to="/contact" className="mt-5 inline-flex btn-primary text-sm">Request a Strategy Call</Link>
        </div>
        {categories.slice(0, 3).map((c) => (
          <div key={c.slug}>
            <div className="micro-label mb-3">{c.short}</div>
            <ul className="space-y-2">
              {getServicesByCategory(c.slug).slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-foreground/75 hover:text-primary">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-border pt-6">
        <div className="micro-label mb-3">Service Areas</div>
        <div className="flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link key={s.slug} to={`/service-areas/${s.slug}`} className="rounded-full border border-border bg-white px-3 py-1 text-xs text-navy-deep hover:border-primary hover:text-primary">
              {s.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Klikcy. Serving businesses across the United States.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
