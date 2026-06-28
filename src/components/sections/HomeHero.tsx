"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { homeHero } from "@/content/home";
import { cn } from "@/utils/cn";

export interface HomeHeroProps {
  className?: string;
}

/**
 * Choreographed hero: mesh bg, SplitType headline, magnetic CTA.
 * Timeline (seconds): 0 bg · 0.1 eyebrow · 0.25 headline · 0.5 sub · 0.65 CTA elastic.
 */
export function HomeHero({ className }: HomeHeroProps) {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLParagraphElement>(null);
  const h1Inner = useRef<HTMLSpanElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)", false);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    if (reduced || isMobile) {
      gsap.set([bg.current, eyebrow.current, sub.current, cta.current, h1Inner.current], { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    ensureGsapPlugins();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (bg.current) tl.fromTo(bg.current, { opacity: 0 }, { opacity: 1, duration: 0.55 }, 0);
      if (eyebrow.current) tl.fromTo(eyebrow.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 }, 0.1);
      if (h1Inner.current) {
        tl.fromTo(
          h1Inner.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.62, ease: "power3.out" },
          0.25,
        );
      }
      if (sub.current) tl.fromTo(sub.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
      if (cta.current) {
        tl.fromTo(
          cta.current,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.58, ease: "elastic.out(1, 0.65)" },
          0.65,
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile, reduced]);

  return (
    <section
      ref={root}
      className={cn(
        "surface-dark relative overflow-hidden text-white mesh-bg-layer",
        className,
      )}
      aria-labelledby="hero-heading"
    >
      <div ref={bg} className="pointer-events-none absolute inset-0 opacity-100" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "var(--gradient-hero)",
            opacity: 0.85,
          }}
        />
        <div className="absolute inset-0 hero-grid-bg opacity-40" aria-hidden />
      </div>

      <div className="relative k-container pb-[var(--space-section-y)] pt-10 sm:pt-14 lg:pt-16">
        <div className="grid items-start gap-10">
          <div className="min-w-0 w-full">
            <p
              ref={eyebrow}
              className="font-display font-bold uppercase tracking-[0.22em] text-[length:var(--type-eyebrow)] text-[hsl(var(--primary-light))] sm:tracking-[0.28em]"
            >
              {homeHero.eyebrow}
            </p>
            <h1
              id="hero-heading"
              className="font-display mt-5 w-full min-w-0 text-pretty font-extrabold leading-[0.98] tracking-tight text-[clamp(1.75rem,5.5vw+0.85rem,3.25rem)] text-white sm:leading-[var(--leading-display)] lg:text-[clamp(1.85rem,4.2vw+0.75rem,4.5rem)] xl:text-[length:var(--type-display)]"
            >
              <span ref={h1Inner} className="block w-full min-w-0 break-words [overflow-wrap:anywhere]">
                {homeHero.headlineBefore}{" "}
                <span className="hero-accent">{homeHero.headlineAccent}</span>{" "}
                {homeHero.headlineAfter}
              </span>
            </h1>
            <p
              ref={sub}
              className="mt-6 w-full min-w-0 max-w-none text-[0.98rem] leading-[1.6] text-white/75 sm:text-[length:var(--type-body-lg)] sm:leading-[var(--leading-body)] lg:max-w-[36ch]"
            >
              {homeHero.sub}
            </p>
            <div ref={cta} className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href={homeHero.primaryCta.href}
                  className="btn-primary inline-flex w-full min-h-[48px] justify-center sm:w-auto sm:min-w-[12.5rem]"
                >
                  {homeHero.primaryCta.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </MagneticButton>
              <Link
                href={homeHero.secondaryCta.href}
                className="btn-ghost-light inline-flex w-full min-h-[48px] justify-center sm:w-auto"
              >
                {homeHero.secondaryCta.label}
              </Link>
            </div>
            <dl className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
              {homeHero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.2em] text-white/45">
                    {s.label}
                  </dt>
                  <dd className="font-display mt-2 text-[length:var(--type-h3)] font-bold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
