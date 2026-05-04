import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceHeroProps {
  categoryLabel: string;
  categorySlug: string;
  categoryShort: string;
  serviceName: string;
  intro: string;
  breadcrumbs?: ReactNode;
}

export function ServiceHero({ categoryLabel, categorySlug, categoryShort, serviceName, intro, breadcrumbs }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="service-hero-heading">
      <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-40" aria-hidden />
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[min(80vw,480px)] w-[min(80vw,480px)] rounded-full bg-primary/20 blur-[100px]" aria-hidden />
      <div className="relative border-b border-white/10">
        {breadcrumbs}
        <div className="container-x pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.26em] text-primary-light">{categoryLabel}</p>
          <h1 id="service-hero-heading" className="font-display mt-4 max-w-[22ch] text-[clamp(2rem,3vw+1rem,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {serviceName}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">{intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Request a strategy call <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link to={`/categories/${categorySlug}`} className="btn-ghost-light">
              All {categoryShort}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
