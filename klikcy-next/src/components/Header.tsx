"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

const dropdownPanelClass =
  "absolute left-0 top-full z-[1050] -mt-2 min-w-[min(18rem,calc(100vw-2rem))] max-w-[min(22rem,calc(100vw-2rem))] pt-2 opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto";

/** Same panel as category dropdowns; aligned to the right edge of the trigger (nav bar end). */
const dropdownPanelEndClass =
  "absolute right-0 left-auto top-full z-[1050] -mt-2 min-w-[min(18rem,calc(100vw-2rem))] max-w-[min(22rem,calc(100vw-2rem))] pt-2 opacity-0 invisible pointer-events-none transition-[opacity,visibility] duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto";

const themeToggleOnLightBar =
  "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900";

/** Matches `DesktopCategoryNavItem` service rows — full panel width, no nested gutter. */
const navDropdownServiceLinkClass =
  "flex min-h-[2.5rem] w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-[length:var(--type-body)] leading-snug text-white/75 transition hover:bg-white/5 hover:text-white";

/** Single scroll surface per dropdown — wheel scrolls panel, not the page (Lenis: `data-lenis-prevent`). */
const navDropdownPanelClass =
  "nav-dropdown-panel max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-white/12 bg-[hsl(222_44%_8%/0.98)] py-3 pl-3 pr-[calc(0.75rem+var(--scrollbar-size)+0.35rem)] shadow-[var(--shadow-elevated)] backdrop-blur-2xl";

const PRIMARY_NAV_CATEGORIES = getPrimaryNavCategories();
const ALL_SERVICES_NAV_CATEGORIES = getAllServicesNavCategories();
const ALL_SERVICES_NAV_TREE = getAllServicesNavTree();

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function pathMatches(pathname: string, target: string, end = false): boolean {
  const current = normalizePath(pathname);
  const path = normalizePath(target);
  if (end) return current === path;
  return current === path || current.startsWith(`${path}/`);
}

function useActiveCategorySlug(): string | null {
  const pathname = usePathname() ?? "/";
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
  href,
  label,
  compactLabel,
  title,
}: {
  href: string;
  label: string;
  compactLabel?: string;
  title?: string;
}) {
  const pathname = usePathname() ?? "/";

  let active = false;
  if (href === "/") active = pathMatches(pathname, "/", true);
  else if (href === "/about") active = pathMatches(pathname, "/about", true);
  else if (href === "/contact") active = pathMatches(pathname, "/contact", true);
  else if (href === "/service-areas") active = pathMatches(pathname, "/service-areas");

  const activeClass = active ? navBarLinkActive : undefined;

  if (compactLabel) {
    return (
      <Link href={href} title={title ?? label} className={cn(navBarLinkClass, activeClass)}>
        <span className="lg:hidden"><ScrambleText>{compactLabel}</ScrambleText></span>
        <span className="hidden lg:inline"><ScrambleText>{label}</ScrambleText></span>
      </Link>
    );
  }

  return (
    <Link href={href} title={title} className={cn(navBarLinkClass, activeClass)}>
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
      className="group relative z-10 shrink-0 hover:z-[120] focus-within:z-[120]"
      onMouseLeave={() => setExpandedCategorySlug(null)}
    >
      <div className={cn(navCategoryTriggerClass, isActive && navCategoryTriggerActive)}>
        <Link
          href="/all-services"
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

      <div className={dropdownPanelEndClass} role="region" aria-label="All services">
        <div className={navDropdownPanelClass} data-lenis-prevent>
          <div className="border-b border-white/10 pb-2">
            <Link
              href="/all-services"
              className="font-display text-[length:var(--type-body)] font-bold text-white transition hover:text-primary-light"
            >
              All services
              <span className="ml-1 text-[length:var(--type-label)] font-normal text-primary-light/90">— overview</span>
            </Link>
            <p className="mt-1 text-[length:var(--type-label)] leading-snug text-white/50">
              Every practice and deliverable — Websites, Apps, SEO, and more.
            </p>
          </div>
          <ul className="mt-2 space-y-0.5" role="list">
            {ALL_SERVICES_NAV_CATEGORIES.map((cat) => {
                const subs = getServicesByCategory(cat.slug);
                const isExpanded = expandedCategorySlug === cat.slug;
                const hasSubs = subs.length > 0;
                const subsListId = `all-services-subs-${cat.slug}`;

                return (
                  <Fragment key={cat.slug}>
                    <li>
                      <div className="flex min-w-0 items-stretch">
                        <Link
                          href={`/categories/${cat.slug}`}
                          title={cat.tagline}
                          className={cn(navDropdownServiceLinkClass, "min-w-0 flex-1 font-display")}
                        >
                          <span className="line-clamp-2">{cat.name}</span>
                        </Link>
                        {hasSubs && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.slug)}
                            className="flex w-8 shrink-0 items-center justify-center text-primary-light/70 transition hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
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
                      <li id={subsListId} className="space-y-0.5" role="group" aria-label={`${cat.name} deliverables`}>
                        {subs.map((s) => (
                          <Link key={s.slug} href={`/services/${s.slug}`} className={navDropdownServiceLinkClass}>
                            <span className="line-clamp-2">{s.name}</span>
                          </Link>
                        ))}
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
    <div className="group relative z-10 shrink-0 hover:z-[120] focus-within:z-[120]">
      <div className={cn(navCategoryTriggerClass, isActive && navCategoryTriggerActive)}>
        <Link
          href={`/categories/${cat.slug}`}
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
              href={`/categories/${cat.slug}`}
              className="font-display text-[length:var(--type-body)] font-bold text-white transition hover:text-primary-light"
            >
              {cat.name}
              <span className="ml-1 text-[length:var(--type-label)] font-normal text-primary-light/90">— overview</span>
            </Link>
            <p className="mt-1 text-[length:var(--type-label)] leading-snug text-white/50">{cat.tagline}</p>
          </div>
          <ul className="mt-2 space-y-0.5" role="list">
            {subs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex min-h-[2.5rem] items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-[length:var(--type-body)] leading-snug text-white/75 transition hover:bg-white/5 hover:text-white"
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

/** Always show logo strip when scroll is at or above this Y. */
const LOGO_STRIP_SHOW_Y = 48;
/** Hide only after scrolling past this Y (hysteresis vs SHOW). */
const LOGO_STRIP_HIDE_Y = 72;
/** Minimum scroll delta per frame to count as intentional direction. */
const LOGO_STRIP_SCROLL_DELTA = 12;
/** Ignore scroll-driven toggles while the strip animates (avoids layout feedback). */
const LOGO_STRIP_TOGGLE_COOLDOWN_MS = 320;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [logoStripHidden, setLogoStripHidden] = useState(false);
  const logoStripHiddenRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTicking = useRef(false);
  const scrollToggleLockedUntil = useRef(0);
  const pathname = usePathname() ?? "/";
  const activeCategorySlug = useActiveCategorySlug();
  const allServicesNavActive = pathMatches(pathname, "/all-services", true) || isAllServicesSectionSlug(activeCategorySlug);

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

  const setLogoStripHiddenSafe = (hidden: boolean) => {
    if (logoStripHiddenRef.current === hidden) return;
    logoStripHiddenRef.current = hidden;
    setLogoStripHidden(hidden);
    scrollToggleLockedUntil.current = performance.now() + LOGO_STRIP_TOGGLE_COOLDOWN_MS;
    requestAnimationFrame(() => {
      lastScrollY.current = window.scrollY || document.documentElement.scrollTop;
    });
  };

  useEffect(() => {
    setLogoStripHiddenSafe(false);
    lastScrollY.current = window.scrollY || document.documentElement.scrollTop;
  }, [pathname]);

  useEffect(() => {
    const getScrollY = () => window.scrollY || document.documentElement.scrollTop;

    const onScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        if (performance.now() < scrollToggleLockedUntil.current) {
          lastScrollY.current = getScrollY();
          scrollTicking.current = false;
          return;
        }

        const y = getScrollY();
        const delta = y - lastScrollY.current;
        const hidden = logoStripHiddenRef.current;

        if (y <= LOGO_STRIP_SHOW_Y) {
          setLogoStripHiddenSafe(false);
        } else if (!hidden && y > LOGO_STRIP_HIDE_Y && delta > LOGO_STRIP_SCROLL_DELTA) {
          setLogoStripHiddenSafe(true);
        } else if (hidden && delta < -LOGO_STRIP_SCROLL_DELTA) {
          setLogoStripHiddenSafe(false);
        }

        lastScrollY.current = y;
        scrollTicking.current = false;
      });
    };

    lastScrollY.current = getScrollY();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-[1000]">
      {/* Logo strip — collapses on scroll down; asset: `public/brand/klikcy-logo.png` */}
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/10 bg-[hsl(var(--ink)/0.98)] shadow-[0_1px_0_hsl(184_100%_37%/0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-[hsl(var(--ink)/0.9)]",
          logoStripHidden
            ? "max-h-0 border-b-transparent shadow-none pointer-events-none"
            : "max-h-[7.5rem] sm:max-h-[8.5rem]",
        )}
        aria-hidden={logoStripHidden}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" aria-hidden />
        <div
          className={cn(
            "k-container flex justify-center py-2.5 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none sm:py-3",
            logoStripHidden && "pointer-events-none -translate-y-3 opacity-0 motion-reduce:translate-y-0",
          )}
        >
          <Link
            href="/"
            className="flex flex-col items-center gap-1 rounded-[var(--radius-md)] outline-none transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            aria-label="Klikcy home"
          >
            <Image
              src="/brand/klikcy-logo.png"
              alt=""
              width={280}
              height={100}
              priority
              sizes="(max-width: 640px) 200px, 280px"
              className="h-11 w-auto max-h-12 max-w-[min(20rem,calc(100vw-2rem))] object-contain object-center sm:h-14 sm:max-h-16"
            />
            <span className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-white/80 sm:text-xs">
              KLIKCY
            </span>
          </Link>
        </div>
      </div>

      <header className="relative border-b border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.2)] to-transparent"
          aria-hidden
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="k-container relative flex min-h-[3.5rem] items-center gap-3 py-2 sm:min-h-[3.75rem] sm:gap-4 sm:py-0">
        <nav
          className="hidden flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2 px-1 py-1 md:gap-x-7 lg:flex lg:gap-x-8 xl:gap-x-10"
          aria-label="Main navigation"
        >
          <DesktopBarLink href="/" label="Home" />
          <DesktopBarLink href="/about" label="About" />
          {PRIMARY_NAV_CATEGORIES.map((cat) => (
            <DesktopCategoryNavItem key={cat.slug} cat={cat} isActive={activeCategorySlug === cat.slug} />
          ))}
          <DesktopAllServicesNavItem isActive={allServicesNavActive} />
          <DesktopBarLink href="/service-areas" label="Service Areas" compactLabel="Areas" title="Service Areas — where we work" />
          <DesktopBarLink href="/contact" label="Contact" />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className={cn("hidden sm:inline-flex", themeToggleOnLightBar)} />
          <MagneticButton className="hidden sm:inline-flex">
            <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-[length:var(--type-body)] font-semibold xl:!px-6">
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
            <div
              className="pointer-events-none absolute inset-x-0 top-[7.5rem] h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent sm:top-[8rem]"
              aria-hidden
            />
            <div className="flex min-h-[4.25rem] shrink-0 items-center justify-between border-b border-white/10 px-[var(--space-gutter)] sm:min-h-[4.5rem]">
              <Link href="/" onClick={closeMobile} className="rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light" aria-label="Klikcy home">
                <Image
                  src="/brand/klikcy-logo.png"
                  alt=""
                  width={200}
                  height={72}
                  sizes="200px"
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
                href="/"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                About
              </Link>
              <Link
                href="/service-areas"
                onClick={closeMobile}
                className="flex min-h-[3rem] items-center border-b border-white/10 py-3 font-display text-[length:var(--type-body-lg)] font-bold text-white transition hover:text-primary-light"
              >
                Service Areas
              </Link>
              <Link
                href="/contact"
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
                      href={`/categories/${cat.slug}`}
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
                            href={`/services/${s.slug}`}
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
                  href="/all-services"
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
                          href={`/categories/${cat.slug}`}
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
                                href={`/services/${s.slug}`}
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
                <Link href="/contact" onClick={closeMobile} className="btn-primary flex w-full min-h-[48px] justify-center py-3.5 text-[length:var(--type-body)] font-semibold">
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
