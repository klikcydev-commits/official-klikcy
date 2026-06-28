"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceStateHubs } from "@/components/service/ServiceStateHubs";
import { ServiceMetroCities } from "@/components/service/ServiceMetroCities";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getService, getRelatedServices } from "@/lib/services";
import { getCategory } from "@/lib/categories";
import { priorityStates } from "@/lib/states";

interface ServicePageProps {
  slug: string;
}

const ServicePage = ({ slug }: ServicePageProps) => {
  const service = getService(slug)!;
  const cat = getCategory(service.category);
  const related = getRelatedServices(slug);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-background">
        <ServiceHero
          categoryLabel={cat?.name || "Services"}
          categorySlug={service.category}
          categoryShort={cat?.short || "Services"}
          serviceName={service.name}
          intro={service.intro}
          breadcrumbs={
            <Breadcrumbs
              tone="ink"
              shellClassName="k-container"
              items={[
                { name: "Home", href: "/" },
                { name: cat?.name || "Services", href: `/categories/${service.category}` },
                { name: service.name },
              ]}
            />
          }
        />

        <PageSection innerClassName="k-container section">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="max-w-2xl border-l-2 border-primary/50 pl-6">
                <SectionIntro
                  kicker="Overview"
                  title={<>Built for teams that need velocity without sacrificing quality.</>}
                  description="Below is exactly what we scope, ship, and measure — so you always know what “done” looks like."
                />
              </div>
              <div className="mt-12 space-y-14">
                <section aria-labelledby="who-heading">
                  <h2
                    id="who-heading"
                    className="font-display text-[length:var(--type-h3)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
                  >
                    Who this is for
                  </h2>
                  <ul className="mt-6 space-y-3" role="list">
                    {service.whoFor.map((w) => (
                      <li
                        key={w}
                        className="flex gap-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))]/80 bg-[hsl(var(--soft-bg))] px-4 py-3.5 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground dark:bg-[hsl(var(--muted))]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="included-heading">
                  <h2
                    id="included-heading"
                    className="font-display text-[length:var(--type-h3)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
                  >
                    What&apos;s included
                  </h2>
                  <ul className="mt-6 space-y-3" role="list">
                    {service.included.map((i) => (
                      <li
                        key={i}
                        className="flex gap-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))]/80 bg-[hsl(var(--card))] px-4 py-3.5 text-[length:var(--type-body)] leading-[var(--leading-body)] shadow-sm dark:border-white/10"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="tech-heading">
                  <h2
                    id="tech-heading"
                    className="font-display text-[length:var(--type-h3)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
                  >
                    Technical foundation
                  </h2>
                  <ul className="mt-6 space-y-3 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground" role="list">
                    {service.technical.map((t) => (
                      <li key={t} className="border-l-2 border-primary/40 pl-4">
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
                <FaqAccordion faqs={service.faqs} idPrefix={`service-${service.slug}`} itemIdKind="faq" embedded />
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-[var(--radius-xl)] border border-[hsl(var(--border))]/90 bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--soft-bg))] p-6 shadow-[var(--shadow-card)] dark:border-white/10 dark:from-[hsl(var(--muted))] dark:to-[hsl(var(--card))]">
                  <div className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.2em] text-primary">Snapshot</div>
                  <ul className="mt-4 space-y-3 text-[length:var(--type-body)] text-muted-foreground" role="list">
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      Serving all 50 U.S. states
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      SEO &amp; AEO ready at launch
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      Remote-first delivery
                    </li>
                  </ul>
                  <MagneticButton className="mt-6 block w-full">
                    <Link href="/contact" className="btn-primary flex w-full min-h-[48px] justify-center text-sm">
                      Start your project
                    </Link>
                  </MagneticButton>
                </div>
                {related.length > 0 ? (
                  <div className="rounded-[var(--radius-xl)] border border-[hsl(var(--border))]/90 bg-[hsl(var(--card))] p-6 shadow-card dark:border-white/10">
                    <div className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.2em] text-primary">Related</div>
                    <ul className="mt-4 space-y-2" role="list">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/services/${r.slug}`}
                            className="text-[length:var(--type-body)] font-medium text-foreground/80 transition hover:text-primary"
                          >
                            {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </PageSection>

        <ServiceStateHubs serviceSlug={service.slug} serviceName={service.name} states={priorityStates} />
        <ServiceMetroCities serviceSlug={service.slug} serviceName={service.name} states={priorityStates} />

        <PageSection variant="ink" innerClassName="k-container section" className="relative overflow-hidden !pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[length:200%_200%] opacity-30 dark:opacity-20" style={{ backgroundImage: "var(--gradient-hero)" }} aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-[length:var(--type-h2)] font-extrabold leading-[var(--leading-tight)] tracking-tight text-white">
                Next step
              </h2>
              <p className="mt-4 max-w-xl text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-white/75">
                Tell us about timelines, stakeholders, and success metrics — we&apos;ll translate them into a scoped engagement.
              </p>
            </div>
            <div className="flex justify-start lg:col-span-5 lg:justify-end">
              <MagneticButton>
                <Link href="/contact" className="btn-primary inline-flex min-h-[48px] justify-center px-8">
                  Talk with Klikcy
                </Link>
              </MagneticButton>
            </div>
          </div>
        </PageSection>
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
