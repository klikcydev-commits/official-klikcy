import { useLayoutEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface LenisGsapProviderProps {
  children: React.ReactNode;
}

/**
 * Smooth scroll (Lenis) + ScrollTrigger share one RAF tick via gsap.ticker.
 * Disabled when `prefers-reduced-motion: reduce`.
 */
export function LenisGsapProvider({ children }: LenisGsapProviderProps) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      touchMultiplier: 1.85,
      /** Let native overflow scroll (nav dropdowns, drawers, tables) without moving the page. */
      prevent: (node) => node instanceof Element && Boolean(node.closest("[data-lenis-prevent]")),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
