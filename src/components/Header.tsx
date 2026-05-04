import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { categories } from "@/lib/categories";
import { navGroups } from "@/lib/nav-groups";
import { getServicesByCategory } from "@/lib/services";
import { cn } from "@/lib/utils";

const MEGA_PREVIEW_LIMIT = 6;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light",
    isActive && "bg-white/10 text-white",
  );

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && !megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) setMegaOpen(false);
      if (open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, megaOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = megaWrapRef.current;
      if (el && !el.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [megaOpen]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Close mobile shell when viewport reaches desktop; avoids body scroll lock with no visible drawer. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) return;
      setOpen(false);
      setOpenCat(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMobile = () => {
    setOpen(false);
    setOpenCat(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 shadow-[0_1px_0_hsl(184_100%_37%/0.15)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/80">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container-x flex min-h-[4.25rem] items-center justify-between py-2 sm:min-h-[4.5rem] sm:py-0">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          aria-label="Klikcy home"
        >
          <span className="font-display text-2xl font-extrabold tracking-tight text-white transition group-hover:text-primary-light">
            Klikcy
          </span>
          <span className="hidden rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/50 sm:inline">
            Agency
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <div ref={megaWrapRef} className="relative">
            <button
              type="button"
              id="services-nav-trigger"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              aria-controls="services-mega-panel"
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                "flex min-h-[2.75rem] items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light",
                megaOpen && "bg-white/10 text-white",
              )}
            >
              Services
              <ChevronDown
                className={cn("h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200", megaOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <div
              id="services-mega-panel"
              role="region"
              aria-labelledby="services-nav-trigger"
              aria-hidden={!megaOpen}
              className={cn(
                "absolute left-1/2 top-full z-[70] w-[min(100vw-1.5rem,72rem)] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 pt-3 transition-[opacity,visibility] duration-200",
                megaOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
              )}
            >
              <div className="max-h-[min(85vh,36rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[hsl(222_44%_8%/0.97)] p-4 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-6">
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-4">
                  {navGroups.map((g) => (
                    <div key={g.id} className="min-w-0 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-light">{g.label}</div>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">{g.tagline}</p>
                      <ul className="mt-4 space-y-4 border-t border-white/10 pt-4" role="list">
                        {g.categorySlugs.map((slug) => {
                          const c = categories.find((x) => x.slug === slug);
                          if (!c) return null;
                          const all = getServicesByCategory(slug);
                          const preview = all.slice(0, MEGA_PREVIEW_LIMIT);
                          const more = all.length - preview.length;
                          return (
                            <li key={slug} className="min-w-0">
                              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                                <Link
                                  to={`/categories/${slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="font-display text-sm font-bold text-white transition hover:text-primary-light"
                                >
                                  {c.name}
                                </Link>
                                <Link
                                  to={`/categories/${slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary-light/90 hover:text-primary-light"
                                >
                                  View all
                                </Link>
                              </div>
                              <ul className="mt-2 space-y-0.5 border-l-2 border-primary/25 pl-3" role="list">
                                {preview.map((s) => (
                                  <li key={s.slug} className="min-w-0">
                                    <Link
                                      to={`/services/${s.slug}`}
                                      onClick={() => setMegaOpen(false)}
                                      className="flex min-h-[2.75rem] items-center rounded-md py-1.5 pr-1 text-[0.8125rem] leading-snug text-white/70 transition hover:bg-white/5 hover:text-white"
                                    >
                                      <span className="line-clamp-2">{s.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              {more > 0 && (
                                <p className="mt-1.5 pl-3 text-[0.7rem] text-white/40">
                                  +{more} more on{" "}
                                  <Link
                                    to={`/categories/${slug}`}
                                    onClick={() => setMegaOpen(false)}
                                    className="font-medium text-primary-light/90 underline-offset-2 hover:text-primary-light hover:underline"
                                  >
                                    {c.short}
                                  </Link>
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-xs leading-relaxed text-white/45">Every route above maps to a live practice area on klikcy.com.</p>
                  <Link
                    to="/contact"
                    onClick={() => setMegaOpen(false)}
                    className="inline-flex min-h-[2.75rem] shrink-0 items-center text-sm font-bold text-primary-light transition hover:text-white"
                  >
                    Start a project →
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
            className="btn-primary hidden !rounded-full !px-6 !py-2.5 text-sm sm:inline-flex"
          >
            Strategy Call
          </Link>
          <button
            type="button"
            onClick={() => {
              setMegaOpen(false);
              setOpen(true);
            }}
            className="touch-manipulation rounded-xl p-2.5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      {open &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            className="fixed inset-0 z-[200] flex flex-col bg-ink lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex min-h-[4.25rem] shrink-0 items-center justify-between border-b border-white/10 px-5">
              <span className="font-display text-2xl font-extrabold text-white">Klikcy</span>
              <button
                type="button"
                onClick={closeMobile}
                className="touch-manipulation rounded-xl p-2.5 text-white transition hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-6">
            <Link
              to="/about"
              onClick={closeMobile}
              className="flex min-h-[3rem] items-center border-b border-white/10 py-3 text-xl font-bold text-white"
            >
              About
            </Link>
            <Link
              to="/service-areas"
              onClick={closeMobile}
              className="flex min-h-[3rem] items-center border-b border-white/10 py-3 text-xl font-bold text-white"
            >
              Service Areas
            </Link>

            <div className="border-b border-white/10 py-2">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary-light">Services</p>
              <p className="mt-1 text-sm text-white/50">Browse by practice area, then pick a service.</p>
            </div>

            {navGroups.map((g) => (
              <div key={g.id} className="border-b border-white/10 py-4">
                <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary-light">{g.label}</div>
                <p className="mt-1 text-sm leading-snug text-white/45">{g.tagline}</p>
                <div className="mt-3 space-y-2">
                  {g.categorySlugs.map((slug) => {
                    const c = categories.find((x) => x.slug === slug);
                    if (!c) return null;
                    const isOpen = openCat === slug;
                    const count = getServicesByCategory(slug).length;
                    return (
                      <div key={slug} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                        <button
                          type="button"
                          onClick={() => setOpenCat(isOpen ? null : slug)}
                          className="touch-manipulation flex w-full min-h-[3.25rem] items-center justify-between gap-3 px-4 py-3 text-left font-display text-base font-bold text-white active:bg-white/5"
                          aria-expanded={isOpen}
                          aria-controls={`mobile-cat-${slug}`}
                          id={`mobile-cat-btn-${slug}`}
                        >
                          <span className="min-w-0 flex-1">
                            {c.name}
                            <span className="mt-0.5 block text-xs font-normal text-white/45">{count} services</span>
                          </span>
                          <ChevronDown
                            className={cn("h-5 w-5 shrink-0 text-white/60 transition-transform duration-200", isOpen && "rotate-180")}
                            aria-hidden
                          />
                        </button>
                        <div
                          id={`mobile-cat-${slug}`}
                          role="region"
                          aria-labelledby={`mobile-cat-btn-${slug}`}
                          className={cn(!isOpen && "hidden")}
                        >
                          <ul className="border-t border-white/10 px-2 py-2" role="list">
                            {getServicesByCategory(slug).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to={`/services/${s.slug}`}
                                  onClick={closeMobile}
                                  className="flex min-h-[3rem] items-center rounded-lg px-3 py-2.5 text-[0.9375rem] leading-snug text-white/80 hover:bg-white/10 hover:text-white"
                                >
                                  {s.name}
                                </Link>
                              </li>
                            ))}
                            <li className="mt-1 border-t border-white/10 pt-2">
                              <Link
                                to={`/categories/${slug}`}
                                onClick={closeMobile}
                                className="flex min-h-[3rem] items-center rounded-lg px-3 py-2.5 text-sm font-bold text-primary-light hover:bg-white/5"
                              >
                                View all {c.short} →
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <Link
              to="/contact"
              onClick={closeMobile}
              className="flex min-h-[3rem] items-center border-b border-white/10 py-3 text-xl font-bold text-white"
            >
              Contact
            </Link>
            <Link to="/contact" onClick={closeMobile} className="btn-primary mt-8 w-full justify-center py-3.5">
              Request a Strategy Call
            </Link>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
};

export default Header;
