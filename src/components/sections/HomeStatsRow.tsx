import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { StatItem } from "@/content/home";
import { cn } from "@/utils/cn";

export interface HomeStatsRowProps {
  items: StatItem[];
  className?: string;
}

/** Count-up statistics on first scroll into view (GSAP + ScrollTrigger). */
export function HomeStatsRow({ items, className }: HomeStatsRowProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || reduced) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const el = section.querySelector<HTMLElement>(`[data-stat-index="${i}"]`);
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: item.value,
          duration: 1.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${item.suffix}`;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [items, reduced]);

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
              <p
                data-stat-index={i}
                className="font-display mt-3 text-[length:var(--type-display)] font-extrabold leading-none text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
              >
                0{item.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
