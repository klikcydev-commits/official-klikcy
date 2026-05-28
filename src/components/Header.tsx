import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useMatch } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { type Category } from "@/lib/categories";
import {
  getAllServicesNavCategories,
  getAllServicesNavTree,
  getPrimaryNavCategories,
  isAllServicesSectionSlug,
} from "@/lib/nav-categories";
import { getService, getServicesByCategory } from "@/lib/services";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/motion/ScrambleText";

/** Light bar — editorial sans, generous spacing (reference layout); tokens: `src/styles/globals.css` */
const navBarLinkClass =
  "whitespace-nowrap rounded-[var(--radius-md)] px-1 py-2 text-[0.8125rem] font-medium leading-none tracking-wide text-slate-800 transition-colors hover:text-[hsl(var(--primary))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))] sm:text-sm lg:px-1.5 lg:text-[0.9375rem]";

const navBarLinkActive = "font-semibold text-[hsl(var(--primary))]";

const navCategoryTriggerClass =
  "flex min-h-9 max-w-full cursor-default items-center gap-1 whitespace-nowrap rounded-[var(--radius-md)] px-1 py-2 text-[0.8125rem] font-medium leading-none tracking-wide text-slate-800 transition-colors hover:text-[hsl(var(--primary))] sm:min-h-10 sm:gap-1.5 sm:px-1.5 sm:text-sm lg:text-[0.9375rem]";

const navCategoryTriggerActive =
  "font-semibold text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary))] decoration-2 underline-offset-[10px]";

const navDropdownZ = "z-[1300]";

const dropdownPanelVisibilityClass =
  "opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto";

/** Category menus — compact width aligned to the trigger. */
const dropdownPanelClass =
  `absolute left-0 top-full ${navDropdownZ} -mt-2 w-[min(20rem,calc(100vw-2rem))] pt-2 ${dropdownPanelVisibilityClass}`;

/** All Services mega menu — wider, right-aligned to the trigger. */
const dropdownPanelMegaClass =
  `absolute right-0 left-auto top-full ${navDropdownZ} -mt-2 w-[min(36rem,calc(100vw-2rem))] pt-2 ${dropdownPanelVisibilityClass}`;

const navDropdownTriggerClass = "group relative z-10 shrink-0 hover:z-[1290] focus-within:z-[1290]";

const themeToggleOnLightBar =
  "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900";

/** Matches `DesktopCategoryNavItem` service rows — full panel width, no nested gutter. */
const navDropdownServiceLinkClass =
  "flex min-h-[2.5rem] w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-[length:var(--type-body)] leading-snug text-white/75 transition hover:bg-white/5 hover:text-white";

/** Single scroll surface per dropdown — wheel scrolls panel, not the page (Lenis: `data-lenis-prevent`). */
const navDropdownPanelClass =
  "nav-dropdown-panel w-full max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-white/12 bg-[hsl(222_44%_8%/0.98)] py-3 pl-3 pr-[calc(0.75rem+var(--scrollbar-size)+0.35rem)] shadow-[var(--shadow-elevated)] backdrop-blur-2xl";

const navDropdownListClass = "mt-2 space-y-0.5";

/** All Services catalog — up to 4 columns so the panel stays proportional. */
const navDropdownMegaGridClass = "mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4";

const desktopNavGridClass =
  "hidden min-w-0 flex-1 lg:grid lg:grid-cols-6 lg:items-center lg:justify-items-center lg:gap-x-1 lg:gap-y-0.5 xl:gap-x-2";

const PRIMARY_NAV_CATEGORIES = getPrimaryNavCategories();
const ALL_SERVICES_NAV_CATEGORIES = getAllServicesNavCategories();
const ALL_SERVICES_NAV_TREE = getAllServicesNavTree();

/** Stacked mark + wordmark in the nav bar. */
function HeaderBrandMark() {
  return (
    <Link
      to="/"
      className="flex shrink-0 flex-col items-center gap-0.5 rounded-[var(--radius-md)] outline-none transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))]"
      aria-label="Klikcy home"
    >
      <img
        src="/brand/klikcy-logo.png"
        alt=""
        width={92}
        height={76}
        decoding="async"
        className="h-8 w-auto max-h-9 max-w-[3.75rem] object-contain object-center sm:h-9 sm:max-w-[4.25rem]"
      />
      <span className="font-display text-[0.58rem] font-extrabold uppercase leading-none tracking-[0.24em] text-slate-800 sm:text-[0.62rem]">
        KLIKCY
      </span>
    </Link>
  );
}

function useActiveCategorySlug(): string | null {
  const { pathname } = useLocation();
  return useMemo(() => {
    const catPath = pathname.match(/^\/categories\/([^/]+)/);
    if (catPath?.[1]) return catPath[1];
    const svcPath = pathname.match(/^\/services\/([^/]+)/);
    if (svcPath?.[1]) {
      const svc = getService(svcPath[1]);
      return svc?.category ?? null;
    }
    return null;
  }, [pathname]);
}

function DesktopBarLink({
  to,
  label,
  compactLabel,
  title,
}: {
  to: string;
  label: string;
  compactLabel?: string;
  title?: string;
}) {
  const mHome = useMatch({ path: "/", end: true });
  const mAbout = useMatch({ path: "/about", end: true });
  const mContact = useMatch({ path: "/contact", end: true });
  const mAreasRoot = useMatch({ path: "/service-areas", end: true });
  const mAreasChild = useMatch("/service-areas/*");

  let active = false;
  if (to === "/") active = !!mHome;
  else if (to === "/about") active = !!mAbout;
  else if (to === "/contact") active = !!mContact;
  else if (to === "/service-areas") active = !!(mAreasRoot || mAreasChild);

  const activeClass = active ? navBarLinkActive : undefined;

  if (compactLabel) {
    return (
      <Link to={to} title={title ?? label} className={cn(navBarLinkClass, activeClass)}>
        <span className="lg:hidden"><ScrambleText>{compactLabel}</ScrambleText></span>
        <span className="hidden lg:inline"><ScrambleText>{label}</ScrambleText></span>
      </Link>
    );
  }

  return (
    <Link to={to} title={title} className={cn(navBarLinkClass, activeClass)}>
      <ScrambleText>{label}</ScrambleText>
    </Link>
  );
}

function DesktopAllServicesNavItem({ isActive }: { isActive: boolean }) {
  const [expandedCategorySlug, setExpandedCategorySlug] = useState<string | null>(null);

  const toggleCategory = (slug: string) => {
    setExpandedCategorySlug((current) => (current === slug ? null : slug));
  };

  return (
    <div
      className={navDropdownTriggerClass}
      onMouseLeave={() => setExpandedCategorySlug(null)}
    >
      <div className={cn(navCategoryTriggerClass, isActive && navCategoryTriggerActive)}>
        <Link
          to="/all-services"
          className="min-w-0 text-inherit hover:text-[hsl(var(--primary))] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))]"
          title="Browse every practice and deliverable"
        >
          <span className="block whitespace-nowrap"><ScrambleText>All Services</ScrambleText></span>
        </Link>
        <ChevronDown
          className="pointer-events-none h-3 w-3 shrink-0 text-slate-500 transition-transform duration-200 group-hover:text-[hsl(var(--primary))] group-hover:rotate-180 group-focus-within:rotate-180"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>

      <div className={dropdownPanelMegaClass} role="region" aria-label="All services">
        <div className={navDropdownPanelClass} data-lenis-prevent>
          <div className="border-b border-white/10 pb-2">
            <Link
              to="/all-services"
              className="font-display text-[length:var(--type-body)] font-bold text-white transition hover:text-primary-light"
            >
              All services
              <span className="ml-1 text-[length:var(--type-label)] font-normal text-primary-light/90">— overview</span>
            </Link>
            <p className="mt-1 text-[length:var(--type-label)] leading-snug text-white/50">
              Every practice and deliverable — Websites, Apps, SEO, and more.
            </p>
          </div>
          <ul className={navDropdownMegaGridClass} role="list">
            {ALL_SERVICES_NAV_CATEGORIES.map((cat) => {
                const subs = getServicesByCategory(cat.slug);
                const isExpanded = expandedCategorySlug === cat.slug;
                const hasSubs = subs.length > 0;
                const subsListId = `all-services-subs-${cat.slug}`;

                return (
                  <Fragment key={cat.slug}>
                    <li className="min-w-0">
                      <div className="flex min-w-0 items-stretch">
                        <Link
                          to={`/categories/${cat.slug}`}
                          title={cat.tagline}
                          className={cn(navDropdownServiceLinkClass, "min-w-0 flex-1 font-display text-[length:var(--type-label)]")}
                        >
                          <span className="line-clamp-2">{cat.name}</span>
                        </Link>
                        {hasSubs && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.slug)}
                            className="flex w-7 shrink-0 items-center justify-center text-primary-light/70 transition hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                            aria-expanded={isExpanded}
                            aria-controls={subsListId}
                            aria-label={`${isExpanded ? "Hide" : "Show"} ${cat.name} deliverables`}
                          >
                            <ChevronDown
                              className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded && "rotate-180")}
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </button>
                        )}
                      </div>
                    </li>
                    {hasSubs && isExpanded && (
                      <li id={subsListId} className="col-span-full space-y-0.5" role="group" aria-label={`${cat.name} deliverables`}>
                        <ul className={navDropdownMegaGridClass} role="list">
                          {subs.map((s) => (
                            <li key={s.slug} className="min-w-0">
                              <Link to={`/services/${s.slug}`} className={cn(navDropdownServiceLinkClass, "text-[length:var(--type-label)]")}>
                                <span className="line-clamp-2">{s.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Fragment>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DesktopCategoryNavItem({ cat, isActive }: { cat: Category; isActive: boolean }) {
  const subs = getServicesByCategory(cat.slug);

  return (
    <div className={navDropdownTriggerClass}>
      <div className={cn(navCategoryTriggerClass, isActive && navCategoryTriggerActive)}>
        <Link
          to={`/categories/${cat.slug}`}
          className="min-w-0 max-w-[min(100%,11rem)] text-inherit hover:text-[hsl(var(--primary))] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))] sm:max-w-[min(100%,13rem)]"
          title={cat.name}
        >
          <span className="block truncate"><ScrambleText>{cat.short}</ScrambleText></span>
        </Link>
        <ChevronDown
          className="pointer-events-none h-3 w-3 shrink-0 text-slate-500 transition-transform duration-200 group-hover:text-[hsl(var(--primary))] group-hover:rotate-180 group-focus-within:rotate-180"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>

      <div className={dropdownPanelClass} role="region" aria-label={`${cat.name} services`}>
        <div className={navDropdownPanelClass} data-lenis-prevent>
          <div className="border-b border-white/10 pb-2">
            <Link
              to={`/categories/${cat.slug}`}
              className="font-display text-[length:var(--type-body)] font-bold text-white transition hover:text-primary-light"
            >
              {cat.name}
              <span className="ml-1 text-[length:var(--type-label)] font-normal text-primary-light/90">— overview</span>
            </Link>
            <p className="mt-1 text-[length:var(--type-label)] leading-snug text-white/50">{cat.tagline}</p>
          </div>
          <ul className={navDropdownListClass} role="list">
            {subs.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className={navDropdownServiceLinkClass}
                >
                  <span className="line-clamp-2">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const activeCategorySlug = useActiveCategorySlug();
  const mAllServices = useMatch({ path: "/all-services", end: true });
  const allServicesNavActive = !!(mAllServices || isAllServicesSectionSlug(activeCategorySlug));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) return;
      setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMobile = () => {
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-[1000]">
      <header className="relative isolate overflow-visible rounded-b-[var(--radius-lg)] border-b border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.2)] to-transparent"
          aria-hidden
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="k-container relative flex min-h-[3.5rem] flex-wrap items-center gap-2 overflow-visible py-2 sm:gap-3 lg:min-h-[4.25rem] lg:gap-2 lg:py-2.5 xl:min-h-[4.5rem]">
        <div className="order-first hidden w-[4.25rem] shrink-0 sm:w-[4.75rem] lg:block">
          <HeaderBrandMark />
        </div>
        <nav className={desktopNavGridClass} aria-label="Main navigation">
          <DesktopBarLink to="/" label="Home" />
          <DesktopBarLink to="/about" label="About" />
          {PRIMARY_NAV_CATEGORIES.map((cat) => (
            <DesktopCategoryNavItem key={cat.slug} cat={cat} isActive={activeCategorySlug === cat.slug} />
          ))}
          <DesktopAllServicesNavItem isActive={allServicesNavActive} />
          <DesktopBarLink to="/service-areas" label="Service Areas" compactLabel="Areas" title="Service Areas — where we work" />
          <DesktopBarLink to="/contact" label="Contact" />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 self-center sm:gap-3">
          <ThemeToggle className={cn("hidden sm:inline-flex", themeToggleOnLightBar)} />
          <MagneticButton className="hidden sm:inline-flex">
            <Link to="/contact" className="btn-primary !px-5 !py-2.5 text-[length:var(--type-body)] font-semibold xl:!px-6">
              Get Free Quote
            </Link>
          </MagneticButton>
          <ThemeToggle className={cn("sm:hidden", themeToggleOnLightBar)} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="touch-manipulation rounded-full p-2.5 text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))] lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="h-6 w-6 text-slate-800" aria-hidden />
          </button>
        </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            className="fixed inset-0 z-[1100] flex flex-col bg-[hsl(var(--ink))] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex min-h-[4.25rem] shrink-0 items-center justify-between border-b border-white/10 px-[var(--space-gutter)] sm:min-h-[4.5rem]">
              <Link to="/" onClick={closeMobile} className="rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light" aria-label="Klikcy home">
                <img
                  src="/brand/klikcy-logo.png"
                  alt=""
                  width={200}
                  height={72}
                  decoding="async"
                  className="h-8 w-auto max-w-[10rem] object-contain"
                />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle className="border-white/15" />
                <button
                  type="button"
                  onClick={closeMobile}
                  className="touch-manipulation rounded-full p-2.5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </div>
            </div>
            <div
              className="flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-contain px-[var(--space-gutter)] py-6"
              data-lenis-prevent
            >
              <Link
                to="/"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                About
              </Link>
              <Link
                to="/service-areas"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                Service Areas
              </Link>
              <Link
                to="/contact"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                Contact
              </Link>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.2em] text-primary-light">Services</p>
                <p className="mt-1 text-[length:var(--type-body)] leading-[var(--leading-body)] text-white/50">
                  Top bar: Websites, Search Growth, Apps, and more. Full list under All Services.
                </p>
              </div>

              {PRIMARY_NAV_CATEGORIES.map((cat) => {
                const services = getServicesByCategory(cat.slug);
                return (
                  <div key={cat.slug} className="mt-6 border-b border-white/10 pb-6">
                    <Link
                      to={`/categories/${cat.slug}`}
                      onClick={closeMobile}
                      className="font-display text-[length:var(--type-body-lg)] font-bold text-white underline-offset-4 transition hover:text-primary-light hover:underline"
                    >
                      {cat.name}
                    </Link>
                    <p className="mt-1 text-[length:var(--type-body)] leading-snug text-white/45">{cat.tagline}</p>
                    <ul className="mt-3 space-y-1 border-l border-white/10 pl-3" role="list">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            onClick={closeMobile}
                            className="flex min-h-[2.75rem] items-center py-1.5 text-[length:var(--type-body)] leading-snug text-white/75 transition hover:text-white"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="mt-6 border-t border-white/10 pt-6">
                <Link
                  to="/all-services"
                  onClick={closeMobile}
                  className="font-display text-[length:var(--type-body-lg)] font-bold text-white underline-offset-4 transition hover:text-primary-light hover:underline"
                >
                  All Services
                </Link>
                <p className="mt-1 text-[length:var(--type-body)] leading-snug text-white/45">
                  Full catalog — grouped like the desktop menu (Build, Growth, Systems, Brand).
                </p>
                {ALL_SERVICES_NAV_TREE.map((group) => (
                  <div key={group.id} className="mt-5">
                    <p className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.16em] text-primary-light">
                      {group.label}
                    </p>
                    {group.categories.map(({ category: cat, services }) => (
                      <div key={cat.slug} className="mt-4 border-l border-primary/35 pl-3">
                        <Link
                          to={`/categories/${cat.slug}`}
                          onClick={closeMobile}
                          className="font-display text-[length:var(--type-body)] font-bold text-white transition hover:text-primary-light"
                        >
                          {cat.short}
                          <span className="ml-1 font-normal text-white/50">— {cat.name}</span>
                        </Link>
                        <ul className="mt-2 space-y-0.5 border-l border-white/10 pl-3" role="list">
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                onClick={closeMobile}
                                className="flex min-h-[2.5rem] items-center py-1 text-[length:var(--type-body)] leading-snug text-white/75 transition hover:text-white"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <MagneticButton className="mt-4 block w-full">
                <Link to="/contact" onClick={closeMobile} className="btn-primary flex w-full min-h-[48px] justify-center py-3.5 text-[length:var(--type-body)] font-semibold">
                  Get Free Quote
                </Link>
              </MagneticButton>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Header;
