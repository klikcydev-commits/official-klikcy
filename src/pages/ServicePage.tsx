import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getService, getRelatedServices } from "@/lib/services";
import { getCategory } from "@/lib/categories";
import { priorityStates } from "@/lib/states";
import { getCitiesForState } from "@/lib/cities";
import { serviceSchema, faqSchema, breadcrumbSchema, SITE } from "@/lib/schema";

const ServicePage = () => {
  const { slug = "" } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/404" replace />;
  const cat = getCategory(service.category);
  const related = getRelatedServices(slug);

  const url = `${SITE.url}/services/${service.slug}`;
  const crumbs = [
    { name: "Home", url: SITE.url },
    { name: cat?.name || "Services", url: `${SITE.url}/categories/${service.category}` },
    { name: service.name, url },
  ];

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={url}
        jsonLd={[serviceSchema(service), faqSchema(service.faqs), breadcrumbSchema(crumbs)]}
      />
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
              items={[
                { name: "Home", href: "/" },
                { name: cat?.name || "Services", href: `/categories/${service.category}` },
                { name: service.name },
              ]}
            />
          }
        />

        <PageSection>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <SectionIntro
                kicker="Overview"
                title={<>Built for teams that need velocity without sacrificing quality.</>}
                description="Below is exactly what we scope, ship, and measure — so you always know what “done” looks like."
              />
              <div className="mt-10 space-y-12">
                <section aria-labelledby="who-heading">
                  <h2 id="who-heading" className="font-display text-2xl font-bold tracking-tight text-navy-deep">
                    Who this is for
                  </h2>
                  <ul className="mt-4 space-y-3 text-muted-foreground" role="list">
                    {service.whoFor.map((w) => (
                      <li key={w} className="flex gap-3 rounded-xl border border-border/60 bg-[hsl(var(--soft-bg))] px-4 py-3 text-sm leading-relaxed sm:text-[0.9375rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="included-heading">
                  <h2 id="included-heading" className="font-display text-2xl font-bold tracking-tight text-navy-deep">
                    What&apos;s included
                  </h2>
                  <ul className="mt-4 space-y-3 text-muted-foreground" role="list">
                    {service.included.map((i) => (
                      <li key={i} className="flex gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 text-sm leading-relaxed shadow-sm sm:text-[0.9375rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="tech-heading">
                  <h2 id="tech-heading" className="font-display text-2xl font-bold tracking-tight text-navy-deep">
                    Technical foundation
                  </h2>
                  <ul className="mt-4 space-y-3 text-muted-foreground" role="list">
                    {service.technical.map((t) => (
                      <li key={t} className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed sm:text-[0.9375rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="faq-heading" className="rounded-2xl border border-border bg-[hsl(var(--soft-bg))] p-6 sm:p-8">
                  <h2 id="faq-heading" className="font-display text-2xl font-bold tracking-tight text-navy-deep">
                    Frequently asked questions
                  </h2>
                  <Accordion type="single" collapsible className="mt-6 w-full">
                    {service.faqs.map((f, i) => (
                      <AccordionItem key={f.q} value={`sf-${i}`} className="border-border">
                        <AccordionTrigger className="text-left text-[0.95rem] font-semibold text-navy-deep hover:no-underline sm:text-base">
                          {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                          {f.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-white to-[hsl(var(--soft-bg))] p-6 shadow-card">
                  <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">Snapshot</div>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground" role="list">
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
                  <Link to="/contact" className="btn-primary mt-6 w-full justify-center text-sm">
                    Start your project
                  </Link>
                </div>
                {related.length > 0 ? (
                  <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-card">
                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">Related</div>
                    <ul className="mt-4 space-y-2" role="list">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            to={`/services/${r.slug}`}
                            className="text-sm font-medium text-foreground/80 transition hover:text-primary"
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

        <PageSection variant="muted">
          <SectionIntro
            kicker="Locations"
            title={<>{service.name} — state landing hubs</>}
            description="Explore how this service is positioned for priority U.S. markets."
          />
          <div className="flex flex-wrap gap-2">
            {priorityStates.map((s) => (
              <Link
                key={s.slug}
                to={`/${service.slug}/${s.slug}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-navy-deep shadow-sm transition hover:border-primary/40 hover:text-primary"
              >
                {service.name} in {s.name}
              </Link>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <SectionIntro
            kicker="Metro depth"
            title={<>{service.name} in major U.S. cities</>}
            description="City-level pages for high-intent local discovery."
          />
          <div className="flex flex-wrap gap-2">
            {priorityStates.flatMap((st) => getCitiesForState(st).slice(0, 4)).map((c) => (
              <Link
                key={`${c.state.slug}-${c.slug}`}
                to={`/${service.slug}/${c.state.slug}/${c.slug}`}
                className="rounded-full border border-border bg-[hsl(var(--soft-bg))] px-4 py-2 text-sm font-medium text-navy-deep transition hover:border-primary/40 hover:bg-white hover:text-primary"
              >
                {service.name} in {c.name}, {c.state.abbr}
              </Link>
            ))}
          </div>
        </PageSection>

        <PageSection variant="ink" className="!pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.65rem,2vw+1rem,2.25rem)] font-extrabold text-white">Next step</h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us about timelines, stakeholders, and success metrics — we&apos;ll translate them into a scoped engagement.
            </p>
            <Link to="/contact" className="btn-primary mt-8 inline-flex justify-center">
              Talk with Klikcy
            </Link>
          </div>
        </PageSection>
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
