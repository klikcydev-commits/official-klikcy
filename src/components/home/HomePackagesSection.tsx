import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { packagePlans } from "@/content/home";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";

export function HomePackagesSection() {
  return (
    <PageSection variant="ink" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/10 blur-[110px]" aria-hidden />

      <div className="relative grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="xl:sticky xl:top-28">
          <SectionIntro
            tone="onDark"
            kicker="Packages"
            title={<>Choose the package that fits your current growth stage.</>}
            description="Every plan includes support and ongoing optimization. Start lean, scale confidently, and upgrade when the system needs more depth."
            align="left"
            className="mb-8"
          />

          <div className="bento-tile">
            <p className="font-display text-[length:var(--type-body)] font-bold text-white">What every package includes</p>
            <ul className="mt-4 space-y-3 text-[length:var(--type-body)] leading-[var(--leading-body)] text-white/70">
              <li>Conversion-aware design and build quality</li>
              <li>Technical support and ongoing optimization</li>
              <li>Clear upgrade path as traffic and complexity grow</li>
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-[length:var(--type-body)] font-bold text-primary-light transition hover:text-white"
            >
              Need custom scope? Talk to Klikcy <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {packagePlans.map((plan, index) => (
            <article
              key={plan.title}
              className={[
                "package-card",
                plan.popular ? "package-card--popular" : "",
                !plan.popular && index % 2 === 1 ? "md:translate-y-6" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`package-card__eyebrow ${plan.popular ? "text-primary" : "text-primary-light"}`}>Package</p>
                  <h3 className="mt-3 font-display text-[length:var(--type-h3)] font-bold tracking-tight text-white">
                    {plan.title}
                  </h3>
                </div>
                <span className={`package-card__badge ${plan.popular ? "package-card__badge--popular" : ""}`}>
                  {plan.popular ? "Best fit" : "Tailored"}
                </span>
              </div>

              <p className={`mt-4 text-[length:var(--type-body)] leading-[var(--leading-body)] ${plan.popular ? "text-white/85" : "text-white/68"}`}>
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[length:var(--type-body)]">
                    <span className={`package-card__feature-icon ${plan.popular ? "package-card__feature-icon--popular" : ""}`}>
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    <span className="leading-[var(--leading-body)] text-white/72">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Link
                  to="/contact"
                  className={plan.popular ? "btn-primary w-full justify-between rounded-full" : "btn-ghost-light w-full justify-between"}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
