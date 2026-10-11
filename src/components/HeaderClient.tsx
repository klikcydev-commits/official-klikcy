"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const NAV = [
  { href: "/service-areas", label: "Where we work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export interface MenuGroup {
  category: { slug: string; name: string };
  services: { slug: string; name: string }[];
}

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  return p === h || p.startsWith(`${h}/`);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="Klikcy home">
      <Image src="/brand/klikcy-logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
      <span className="text-[1.35rem] font-[680] leading-none tracking-[-0.01em] text-ink [font-variation-settings:'wdth'_122]">
        Klikcy
      </span>
    </Link>
  );
}

export default function HeaderClient({
  menu: MENU,
  total,
  showWork,
}: {
  menu: MenuGroup[];
  total: number;
  showWork: boolean;
}) {
  const nav = showWork ? [{ href: "/work", label: "Our work" }, ...NAV] : NAV;
  const pathname = usePathname() ?? "/";
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesActive = pathname.startsWith("/services") || pathname.startsWith("/categories") || pathname.startsWith("/all-services");

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    cn(
      "rounded-sm px-1 py-2 text-[0.975rem] font-medium no-underline transition-colors hover:text-teal",
      active ? "text-teal" : "text-ink",
    );

  return (
    <header className="sticky top-0 z-[1000] border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/90">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center gap-6">
        <Logo />

        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Main">
          <div
            ref={servicesRef}
            className="flex h-16 items-center"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(linkClass(servicesActive), "inline-flex items-center gap-1.5")}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className={cn("transition-transform", servicesOpen && "rotate-180")}>
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div
              id="services-menu"
              className={cn(
                "absolute inset-x-0 top-full",
                servicesOpen ? "visible opacity-100" : "invisible opacity-0",
                "transition-opacity duration-150",
              )}
            >
              <div className="wrap">
              <div className="mt-2 rounded-lg border border-line bg-paper p-7 shadow-[0_24px_48px_-28px_hsl(var(--ink)/0.4)]">
                <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                  {MENU.map(({ category, services }) => (
                    <div key={category.slug}>
                      <Link href={`/categories/${category.slug}`} className="font-semibold text-ink no-underline hover:text-teal">
                        {category.name}
                      </Link>
                      <ul className="mt-2 space-y-1">
                        {services.slice(0, 5).map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="text-[0.9rem] leading-snug text-slate no-underline hover:text-teal hover:underline">
                              {s.name}
                            </Link>
                          </li>
                        ))}
                        {services.length > 5 ? (
                          <li>
                            <Link href={`/categories/${category.slug}`} className="text-[0.9rem] text-teal no-underline hover:underline">
                              {services.length - 5} more
                            </Link>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <p className="meta">Not sure what you need? Describe the problem and we&apos;ll suggest an approach.</p>
                  <Link href="/all-services" className="link text-[0.95rem] font-semibold">
                    See all {total} services
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>

          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(isActive(pathname, item.href))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-primary hidden !min-h-[2.6rem] !px-4 !text-[0.95rem] lg:inline-flex">
          Start a project
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-mist lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            {mobileOpen ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn("fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper lg:hidden", mobileOpen ? "block" : "hidden")}
      >
        <nav className="wrap py-6" aria-label="Mobile">
          <p className="meta mb-2">Services</p>
          <ul className="border-t border-line">
            {MENU.map(({ category, services }) => (
              <li key={category.slug} className="border-b border-line">
                <details>
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-semibold [&::-webkit-details-marker]:hidden">
                    {category.name}
                    <span aria-hidden className="text-xl font-normal text-teal">+</span>
                  </summary>
                  <ul className="pb-4 pl-1">
                    <li>
                      <Link href={`/categories/${category.slug}`} className="block py-1.5 text-teal no-underline">
                        {category.name} overview
                      </Link>
                    </li>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="block py-1.5 text-slate no-underline">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-1">
            {[{ href: "/all-services", label: "All services" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 text-lg font-semibold text-ink no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary mt-6 w-full">
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
