import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

export interface HomePinnedChapterProps {
  className?: string;
}

/**
 * Scroll narrative: sticky viewport + scrubbed headline (CSS sticky, GSAP scrub).
 * Avoids GSAP `pin` + Lenis edge cases while still reading as a “chapter.”
 */
export function HomePinnedChapter({ className }: HomePinnedChapterProps) {
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const outer = section.current;
    const h = headline.current;
    if (!outer || !h || reduced) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        h,
        { opacity: 0.15, xPercent: 6, filter: "blur(8px)" },
        {
          opacity: 1,
          xPercent: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.05,
          },
        },
      );
    }, outer);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={section}
      className={cn("relative min-h-[200vh] bg-[hsl(var(--muted))]", className)}
      aria-labelledby="pinned-chapter-heading"
    >
      <div className="sticky top-0 flex min-h-screen items-center py-[var(--space-section-y)]">
        <div className="k-container w-full">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-4">
            <p className="font-display max-w-xs text-[length:var(--type-label)] font-bold uppercase tracking-[0.24em] text-[hsl(var(--primary))] lg:col-span-4 lg:translate-y-2">
              Narrative
            </p>
            <h2
              id="pinned-chapter-heading"
              ref={headline}
              className="font-display max-w-[14ch] text-[length:var(--type-display)] font-extrabold leading-[var(--leading-display)] text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))] lg:col-span-8 lg:-translate-x-[var(--container-bleed)]"
            >
              One partner owns discovery, build, search, and scale.
            </h2>
          </div>
          <p className="mt-10 max-w-2xl text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-[hsl(var(--muted-foreground))] lg:ml-[33.333%]">
            Scroll is the edit: friction drops as the story resolves. That is how we ship — fewer handoffs, clearer metrics, faster iteration loops.
          </p>
        </div>
      </div>
    </section>
  );
}
