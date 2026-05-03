import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-lg px-3 py-2 text-sm font-semibold text-navy-deep transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive && "bg-accent text-primary",
  );

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container-x flex min-h-[4.25rem] items-center justify-between py-2 sm:min-h-[4.5rem] sm:py-0">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Klikcy home"
        >
          <span className="font-display text-2xl font-extrabold tracking-tight gradient-text">Klikcy</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          {categories.slice(0, 6).map((c) => (
            <div key={c.slug} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-navy-deep transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={undefined}
                aria-haspopup="true"
              >
                {c.short} <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-[min(100vw-2rem,20rem)] translate-y-1 rounded-2xl border border-border bg-white/95 p-3 opacity-0 shadow-card backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="micro-label mb-2 px-2">{c.name}</div>
                <ul className="max-h-[min(60vh,22rem)] space-y-0.5 overflow-y-auto pr-1" role="list">
                  {getServicesByCategory(c.slug)
                    .slice(0, 8)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-foreground/85 transition hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                </ul>
                <Link
                  to={`/categories/${c.slug}`}
                  className="mt-2 block rounded-lg px-3 py-2 text-sm font-bold text-primary transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
                >
                  All {c.short} →
                </Link>
              </div>
            </div>
          ))}
          <NavLink to="/service-areas" className={navLinkClass}>
            Service Areas
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="btn-primary hidden !py-2.5 !px-5 text-sm sm:inline-flex"
          >
            Strategy Call
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl p-2.5 text-navy-deep transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-[4.25rem] items-center justify-between border-b border-border px-5">
            <span className="font-display text-2xl font-extrabold gradient-text">Klikcy</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2.5 text-navy-deep transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-6">
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-xl font-bold text-navy-deep transition hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/service-areas"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-xl font-bold text-navy-deep transition hover:text-primary"
            >
              Service Areas
            </Link>
            {categories.map((c) => {
              const isCatOpen = openCat === c.slug;
              return (
                <div key={c.slug} className="border-b border-border/60 py-1">
                  <button
                    type="button"
                    onClick={() => setOpenCat(isCatOpen ? null : c.slug)}
                    className={cn(
                      "flex w-full items-center justify-between py-3 text-left text-xl font-bold transition",
                      isCatOpen ? "text-primary" : "text-navy-deep",
                    )}
                    aria-expanded={isCatOpen}
                  >
                    {c.name}
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition",
                        isCatOpen ? "border-primary bg-accent text-primary" : "border-border text-navy-deep",
                      )}
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isCatOpen && "rotate-180")} aria-hidden />
                    </span>
                  </button>
                  {isCatOpen && (
                    <ul className="mb-3 mt-1 space-y-0.5 rounded-xl bg-accent/50 p-2" role="list">
                      {getServicesByCategory(c.slug).map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-base text-navy-deep transition hover:bg-white"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-xl font-bold text-navy-deep transition hover:text-primary"
            >
              Contact
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full justify-center py-3.5">
              Request a Strategy Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
