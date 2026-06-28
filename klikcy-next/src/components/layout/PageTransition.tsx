"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Choreographed route wipe: scales in from bottom, exits from top. */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !overlayRef.current) return;
    if (first.current) {
      first.current = false;
      return;
    }

    const el = overlayRef.current;
    ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.set(el, { transformOrigin: "top", scaleY: 1, pointerEvents: "auto" });
      gsap.to(el, {
        scaleY: 0,
        duration: 0.62,
        ease: "power3.inOut",
        onComplete: () => gsap.set(el, { pointerEvents: "none" }),
      });
    }, el);

    return () => ctx.revert();
  }, [pathname, reduced]);

  useEffect(() => {
    if (reduced) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a");
      if (!target || !target.href) return;

      const url = new URL(target.href);
      const isInternal = url.origin === window.location.origin;
      const isSamePage = url.pathname === window.location.pathname;
      const hasTarget = target.hasAttribute("target");

      if (isInternal && !isSamePage && !hasTarget && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();

        const el = overlayRef.current;
        const nextPath = url.pathname + url.search + url.hash;
        if (!el) {
          router.push(nextPath);
          return;
        }

        gsap.set(el, { transformOrigin: "bottom", scaleY: 0, pointerEvents: "auto" });
        gsap.to(el, {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            router.push(nextPath);
            window.scrollTo(0, 0);
          },
        });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [router, reduced]);

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "hsl(var(--ink))",
        zIndex: 9999,
        transform: "scaleY(0)",
        transformOrigin: "bottom",
      }}
    />
  );
}
