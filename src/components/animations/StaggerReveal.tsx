"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

export interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each `[data-reveal-item]` (seconds). */
  stagger?: number;
}

/** Scroll-triggered stagger for elements marked with `data-reveal-item`. */
export function StaggerReveal({ children, className, stagger = 0.08 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    ensureGsapPlugins();
    const items = root.querySelectorAll("[data-reveal-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, stagger]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
