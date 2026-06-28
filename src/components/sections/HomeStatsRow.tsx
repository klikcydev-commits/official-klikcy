"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { StatItem } from "@/content/home";
import { cn } from "@/utils/cn";

export interface HomeStatsRowProps {
  items: StatItem[];
  className?: string;
}

function formatStat(value: number, suffix: string) {
  return `${Math.round(value)}${suffix}`;
}

function StatValue({ item, index }: { item: StatItem; index: number }) {
  const elRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (reduced) {
      el.textContent = formatStat(item.value, item.suffix);
      return;
    }

    const runCountUp = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const start = performance.now();
      const duration = 1350;

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 2;
        el.textContent = formatStat(item.value * eased, item.suffix);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatStat(item.value, item.suffix);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          runCountUp();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item.suffix, item.value, reduced]);

  return (
    <p
      ref={elRef}
      data-stat-index={index}
      className="font-display mt-3 text-[length:var(--type-display)] font-extrabold leading-none text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
    >
      {formatStat(0, item.suffix)}
    </p>
  );
}

/** Count-up statistics on first scroll into view (IntersectionObserver — works with Lenis). */
export function HomeStatsRow({ items, className }: HomeStatsRowProps) {
  const root = useRef<HTMLElement>(null);

  return (
    <section ref={root} className={cn("border-y border-[hsl(var(--border))] bg-[hsl(var(--background))]", className)}>
      <div className="k-container py-[var(--space-section-y)]">
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.label} className="relative pl-6 md:pl-8">
              <span
                className="absolute left-0 top-2 h-[60%] w-px bg-gradient-to-b from-[hsl(var(--primary))] to-transparent"
                aria-hidden
              />
              <p className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                {item.label}
              </p>
              <StatValue item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
