import { Link } from "react-router-dom";
import type { State } from "@/lib/states";
import { getCitiesForState } from "@/lib/cities";
import { PageSection } from "@/components/layout/PageSection";
import { StaggerReveal } from "@/components/animations/StaggerReveal";

export interface ServiceMetroCitiesProps {
  serviceSlug: string;
  serviceName: string;
  states: State[];
}

const chipClass =
  "inline-flex min-h-[44px] items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--soft-bg))] px-4 py-2 text-[length:var(--type-body)] font-medium text-[hsl(var(--navy-deep))] shadow-sm transition hover:border-primary/40 hover:bg-[hsl(var(--card))] hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-[hsl(var(--muted))] dark:text-[hsl(var(--foreground))] dark:hover:bg-[hsl(var(--card))]";

/**
 * City-level links grouped by priority state — editorial rows, staggered chips.
 * Design token: see `src/styles/globals.css`
 */
export function ServiceMetroCities({ serviceSlug, serviceName, states }: ServiceMetroCitiesProps) {
  return (
    <PageSection innerClassName="k-container section" className="relative bg-[hsl(var(--background))]">
      <div className="pointer-events-none absolute left-0 top-1/2 h-px w-1/3 bg-gradient-to-r from-primary/40 to-transparent" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="max-w-xl lg:col-span-5">
          <span className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.22em] text-primary">
            Metro depth
          </span>
          <h2 className="font-display mt-4 text-[length:var(--type-h2)] font-extrabold leading-[var(--leading-tight)] tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
            {serviceName} in major U.S. cities
          </h2>
          <p className="mt-4 text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-muted-foreground">
            City pages for high-intent local discovery — structured entities, service-specific copy, and internal links that reinforce your category.
          </p>
        </div>

        <StaggerReveal className="space-y-10 lg:col-span-7" stagger={0.06}>
          {states.map((st) => {
            const cities = getCitiesForState(st);
            return (
              <article
                key={st.slug}
                data-reveal-item
                className="rounded-[var(--radius-xl)] border border-[hsl(var(--border))]/90 bg-[hsl(var(--card))] p-5 shadow-card sm:p-6 dark:border-white/10 dark:bg-[hsl(var(--muted))]"
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[hsl(var(--border))] pb-4 dark:border-white/10">
                  <h3 className="font-display text-[length:var(--type-h3)] font-bold text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
                    <Link
                      to={`/${serviceSlug}/${st.slug}`}
                      className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {st.name}
                    </Link>
                  </h3>
                  <span className="font-mono text-[length:var(--type-label)] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {cities.length} metros
                  </span>
                </div>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0" role="list">
                  {cities.map((c) => (
                    <li key={`${st.slug}-${c.slug}`}>
                      <Link
                        to={`/${serviceSlug}/${st.slug}/${c.slug}`}
                        className={chipClass}
                        aria-label={`${serviceName} in ${c.name}, ${st.name}`}
                      >
                        {c.name}, {st.abbr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </StaggerReveal>
      </div>
    </PageSection>
  );
}
