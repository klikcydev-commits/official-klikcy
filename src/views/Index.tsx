import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, SectionHead } from "@/components/site/blocks";
import { categories } from "@/lib/categories";
import { getServicesByCategory, services } from "@/lib/services";
import { priorityStates } from "@/lib/states";
import { homeFaqs, homeHero, packagePlans, processSteps, projectSheet, whyPoints } from "@/content/home";
import { caseStudies, testimonials } from "@/content/proof";
import { CaseStudySummary, Testimonials } from "@/components/site/Proof";
import { TechOrbit } from "@/components/site/TechOrbit";
import { practiceImages } from "@/content/practice-images";
import { marketLinks } from "@/lib/market-links";

const TOTAL_WEEKS = 8;

function ProjectSheet() {
  return (
    <figure className="sheet" aria-labelledby="sheet-title">
      <figcaption className="px-5 pb-4 pt-5">
        <p id="sheet-title" className="font-semibold">
          {projectSheet.title}
        </p>
        <p className="meta">{projectSheet.subtitle}</p>
      </figcaption>
      <ol>
        {projectSheet.rows.map((row) => {
          const [from, to] = row.span;
          return (
            <li key={row.when} className="sheet-row">
              <span className="text-sm font-semibold text-ink">{row.when}</span>
              <div>
                <p className="text-[0.95rem] leading-snug">{row.what}</p>
                <span className="relative mt-2.5 block h-1.5 rounded-full bg-mist" aria-hidden>
                  <span
                    className="sheet-bar absolute inset-y-0"
                    style={{ left: `${(from / TOTAL_WEEKS) * 100}%`, width: `${((to - from) / TOTAL_WEEKS) * 100}%` }}
                  />
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line px-5 py-4 text-sm text-slate">{projectSheet.footnote}</p>
    </figure>
  );
}

export default function Index() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="border-b border-line">
          <div className="wrap grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pb-24 lg:pt-20">
            <div>
              <h1 className="display max-w-[14ch]">{homeHero.title}</h1>
              <p className="lede mt-7">{homeHero.lede}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={homeHero.primaryCta.href} className="btn btn-primary">
                  {homeHero.primaryCta.label}
                </Link>
                <Link href={homeHero.secondaryCta.href} className="btn btn-secondary">
                  {homeHero.secondaryCta.label}
                </Link>
              </div>
            </div>
            <TechOrbit />
          </div>
        </section>

        <section className="section" aria-labelledby="what-heading">
          <div className="wrap ledger">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionHead
                id="what-heading"
                title="What we do"
                intro="Most clients come to us for one thing, usually a website or search, and add the rest as they grow. Everything is built to work together."
              />
              <Link href="/all-services" className="link mt-6 inline-block font-semibold">
                See all {services.length} services
              </Link>
            </div>
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {categories.map((c) => {
                const top = getServicesByCategory(c.slug).slice(0, 3);
                const image = practiceImages[c.slug];
                return (
                  <div key={c.slug} className="group">
                    <Link
                      href={`/categories/${c.slug}`}
                      className="block overflow-hidden rounded-lg border border-line bg-mist"
                      tabIndex={-1}
                      aria-hidden
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={900}
                        height={560}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                    </Link>
                    <h3 className="h3 mt-5">
                      <Link href={`/categories/${c.slug}`} className="quiet-link">
                        {c.name}
                      </Link>
                    </h3>
                    <p className="muted mt-2">{c.tagline}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem]">
                      {top.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="link">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {caseStudies.length > 0 ? (
          <section className="section border-t border-line" aria-labelledby="work-heading">
            <div className="wrap">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="work-heading" className="h2">
                  Recent work
                </h2>
                <Link href="/work" className="link font-semibold">
                  All case studies
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.slice(0, 3).map((s) => (
                  <CaseStudySummary key={s.slug} study={s} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section section-mist" aria-labelledby="why-heading">
          <div className="wrap">
            <h2 id="why-heading" className="h2 max-w-[22ch]">
              What you can expect from us
            </h2>
            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {whyPoints.map((p) => (
                <div key={p.title} className="border-t-2 border-ink pt-5">
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="muted mt-2">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials items={testimonials.slice(0, 4)} />

        <section className="section" aria-labelledby="process-heading">
          <div className="wrap ledger">
            <div>
              <SectionHead
                id="process-heading"
                title="How a project runs"
                intro="The same six steps whether it's a five-page site or a custom app. Only the length of each step changes."
              />
              <div className="mt-10 max-w-md">
                <ProjectSheet />
              </div>
            </div>
            <ol className="grid content-start gap-x-10 gap-y-9 sm:grid-cols-2">
              {processSteps.map((s, i) => (
                <li key={s.label} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                  <span className="text-xl font-semibold tabular-nums text-teal [font-variation-settings:'wdth'_120]" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{s.label}</h3>
                    <p className="muted mt-1.5">{s.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="plans-heading">
          <div className="wrap">
            <div className="max-w-2xl">
              <h2 id="plans-heading" className="h2">
                Ongoing plans
              </h2>
              <p className="muted mt-4">
                For businesses that want a site and someone to keep improving it. Larger builds, apps, and automation are
                quoted as projects.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {packagePlans.map((plan) => (
                <div key={plan.title} className="flex flex-col bg-paper p-6">
                  <h3 className="text-xl">{plan.title}</h3>
                  <p className="muted mt-2 text-[0.95rem]">{plan.description}</p>
                  <ul className="ticks mt-5 flex-1 text-[0.95rem]">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="link mt-6 font-semibold">
                    Ask about {plan.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="where-heading">
          <div className="wrap ledger">
            <SectionHead
              id="where-heading"
              title="Where we work"
              intro="Everywhere in the U.S. We work remotely, schedule calls inside your business hours, and keep track of state rules that affect websites, like privacy laws."
            />
            <div>
              <ul className="flex flex-wrap gap-2">
                {priorityStates.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/service-areas/${s.slug}`}
                      className="inline-flex min-h-[2.5rem] items-center rounded-md border border-line px-3.5 text-[0.95rem] no-underline hover:border-ink"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-semibold">Local pages</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {marketLinks.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="link">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/service-areas" className="link mt-6 inline-block font-semibold">
                All 50 states and DC
              </Link>
            </div>
          </div>
        </section>

        <div className="border-t border-line">
          <Faq items={homeFaqs} title="Common questions" />
        </div>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
