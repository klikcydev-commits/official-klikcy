import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export interface ServiceHeroProps {
  categoryLabel: string;
  categorySlug: string;
  categoryShort: string;
  serviceName: string;
  intro: string;
  breadcrumbs?: ReactNode;
}

/**
 * Service hero — Signal Mesh ink surface, fluid type, magnetic primary CTA.
 * Design token: see `src/styles/globals.css`
 */
export function ServiceHero({
  categoryLabel,
  categorySlug,
  categoryShort,
  serviceName,
  intro,
  breadcrumbs,
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden text-white mesh-bg-layer" aria-labelledby="service-hero-heading">
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 hero-grid-bg opacity-35" aria-hidden />
      </div>
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[min(80vw,480px)] w-[min(80vw,480px)] rounded-full bg-primary/20 blur-[100px]" aria-hidden />
      <div className="relative border-b border-white/10">
        {breadcrumbs}
        <div className="k-container pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
          <p className="font-display text-[length:var(--type-eyebrow)] font-bold uppercase tracking-[0.26em] text-primary-light">{categoryLabel}</p>
          <h1
            id="service-hero-heading"
            className="font-display mt-4 max-w-[22ch] text-[length:var(--type-h1)] font-extrabold leading-[var(--leading-tight)] tracking-tight text-white"
          >
            {serviceName}
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-white/75">{intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton>
              <Link to="/contact" className="btn-primary inline-flex min-h-[48px] items-center gap-2 px-6">
                Request a strategy call <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </MagneticButton>
            <Link to={`/categories/${categorySlug}`} className="btn-ghost-light inline-flex min-h-[48px] items-center px-6">
              All {categoryShort}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
