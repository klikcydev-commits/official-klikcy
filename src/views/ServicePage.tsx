import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { getCategory } from "@/lib/categories";
import { getRelatedServices, getService } from "@/lib/services";
import { CONTENT_UPDATED } from "@/lib/site";
import { Testimonials } from "@/components/site/Proof";
import { testimonialsForService } from "@/content/proof";

const REVIEWED = new Date(`${CONTENT_UPDATED}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug)!;
  const category = getCategory(service.category)!;
  const related = getRelatedServices(slug);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={service.name}
          lede={service.intro}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: category.name, href: `/categories/${category.slug}` },
            { name: service.name },
          ]}
          aside={
            <figure className="sheet text-[0.95rem]" aria-labelledby="spec-title">
              <figcaption className="px-5 pb-4 pt-5">
                <p id="spec-title" className="font-semibold">
                  At a glance
                </p>
                <p className="meta">{category.name}</p>
              </figcaption>
              <dl>
                <div className="sheet-row">
                  <dt className="text-sm font-semibold">Timeline</dt>
                  <dd className="muted leading-snug">{service.timeline}</dd>
                </div>
                <div className="sheet-row">
                  <dt className="text-sm font-semibold">You get</dt>
                  <dd className="muted leading-snug">
                    <ul className="space-y-1">
                      {service.included.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="sheet-row">
                  <dt className="text-sm font-semibold">Tools</dt>
                  <dd className="muted leading-snug">{service.tools.slice(0, 4).join(", ")}</dd>
                </div>
                <div className="sheet-row">
                  <dt className="text-sm font-semibold">Price</dt>
                  <dd className="muted leading-snug">A fixed, written quote. Free to ask.</dd>
                </div>
              </dl>
              <p className="border-t border-line px-5 py-3 text-sm text-slate">Page reviewed {REVIEWED}</p>
            </figure>
          }
        >
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
          <Link href={`/categories/${category.slug}`} className="btn btn-secondary">
            See all {category.name}
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="overview-heading">
          <div className="wrap ledger">
            <SectionHead id="overview-heading" title="What this covers" />
            <div className="prose-k">
              {service.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist">
          <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="h2">Is this right for you?</h2>
              <p className="muted mt-3">You&apos;ll get the most out of it if any of these sound familiar:</p>
              <ul className="ticks mt-6">
                {service.signs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h2">What you get</h2>
              <p className="muted mt-3">Included in a typical engagement:</p>
              <ul className="ticks mt-6">
                {service.included.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="process-heading">
          <div className="wrap ledger">
            <SectionHead id="process-heading" title="How it works" intro={service.timeline} />
            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {service.process.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                  <span className="text-xl font-semibold tabular-nums text-teal [font-variation-settings:'wdth'_120]" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="muted mt-1.5">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section border-t border-line">
          <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="h2">What affects the price</h2>
              <p className="muted mt-3">
                Every quote is fixed and written down before work starts. These are the things that move it:
              </p>
              <ul className="ticks mt-6">
                {service.costFactors.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h2">Mistakes we plan around</h2>
              <p className="muted mt-3">The problems we see most often when this work is rushed:</p>
              <ul className="ticks mt-6">
                {service.pitfalls.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Testimonials items={testimonialsForService(service.slug)} title="From clients we've done this for" tone="mist" />

        <div className="border-t border-line">
          <Faq items={service.faqs} title={`${service.name} questions`} />
        </div>

        {related.length > 0 ? (
          <section className="section section-mist" aria-labelledby="related-heading">
            <div className="wrap ledger">
              <SectionHead id="related-heading" title="Often paired with" intro="Services clients commonly combine with this one." />
              <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/services/${r.slug}`} className="link text-lg font-semibold">
                      {r.name}
                    </Link>
                    <p className="muted mt-1 text-[0.95rem]">{r.shortDescription}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <CtaBand title="Want a quote for this?" action="Get a quote" />
      </main>
      <Footer />
    </>
  );
}
