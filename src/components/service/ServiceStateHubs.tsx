import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { State } from "@/lib/states";
import { PageSection } from "@/components/layout/PageSection";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { TiltCard } from "@/components/ui/TiltCard";

export interface ServiceStateHubsProps {
  serviceSlug: string;
  serviceName: string;
  states: State[];
}

/**
 * Priority state landing hubs — asymmetric intro + tilt cards (Signal Mesh).
 * Design token: see `src/styles/globals.css`
 */
export function ServiceStateHubs({ serviceSlug, serviceName, states }: ServiceStateHubsProps) {
  return (
    <PageSection
      variant="muted"
      innerClassName="k-container section"
      className="relative overflow-hidden border-y border-[hsl(var(--border))]/80"
    >
      <div
        className="pointer-events-none absolute -right-[20%] top-0 h-[min(70vw,28rem)] w-[min(70vw,28rem)] rounded-full bg-[hsl(var(--primary)/0.08)] blur-[100px] dark:bg-[hsl(var(--primary)/0.12)]"
        aria-hidden
      />
      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <span className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.22em] text-primary">
            Locations
          </span>
          <h2 className="font-display mt-4 text-[length:var(--type-h2)] font-extrabold leading-[var(--leading-tight)] tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
            {serviceName} — state landing hubs
          </h2>
          <p className="mt-4 max-w-sm text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-muted-foreground">
            Explore how this service is positioned for priority U.S. markets. Each hub opens a state-level narrative, proof, and CTA tuned for local intent.
          </p>
        </div>

        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3" stagger={0.08}>
          {states.map((s) => (
            <div key={s.slug} data-reveal-item className="h-full min-h-[9.5rem]">
              <TiltCard className="h-full" maxTilt={8}>
                <Link
                  href={`/${serviceSlug}/${s.slug}`}
                  aria-label={`${serviceName} in ${s.name} — state landing hub`}
                  className="group flex h-full min-h-[9.5rem] flex-col rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-card transition duration-300 hover:border-primary/35 hover:shadow-[var(--shadow-glow-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <span className="mt-4 font-display text-[length:var(--type-h3)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
                    {s.name}
                  </span>
                  <span className="mt-1 font-mono text-[length:var(--type-label)] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.abbr}
                  </span>
                  <span className="mt-auto pt-4 text-[length:var(--type-body)] font-semibold text-primary">View state hub →</span>
                </Link>
              </TiltCard>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </PageSection>
  );
}
