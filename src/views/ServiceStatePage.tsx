import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { getService } from "@/lib/services";
import { getState } from "@/lib/states";
import { getCitiesForState } from "@/lib/cities";
import { listCities, localCities, shortTimeZone } from "@/lib/state-copy";

/** Not indexed (see lib/seo/indexing.ts). Exists for visitors and old links; points to the full service page. */
export default function ServiceStatePage({ serviceSlug, stateSlug }: { serviceSlug: string; stateSlug: string }) {
  const service = getService(serviceSlug)!;
  const state = getState(stateSlug)!;
  const cities = getCitiesForState(state);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={`${service.name} for ${state.name} businesses`}
          lede={service.intro}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: state.name, href: `/service-areas/${state.slug}` },
            { name: service.name },
          ]}
        >
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
          <Link href={`/services/${service.slug}`} className="btn btn-secondary">
            Full details on {service.name}
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="remote-heading">
          <div className="wrap ledger">
            <SectionHead id="remote-heading" title={`Working with ${state.name} clients`} />
            <div className="prose-k">
              <p>
                We work remotely with businesses across {state.name}, including {listCities(localCities(state).slice(0, 4))}.
                Calls are scheduled in {shortTimeZone(state)}, and the process, team, and pricing are the same as anywhere
                else in the country.
              </p>
              <p>
                For a full explanation of what {service.name} involves, how long it takes, and what affects the price, see
                the <Link href={`/services/${service.slug}`} className="link">{service.name} page</Link>. For notes on time
                zones and privacy rules in {state.name}, see our{" "}
                <Link href={`/service-areas/${state.slug}`} className="link">{state.name} page</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="included-heading">
          <div className="wrap ledger">
            <SectionHead id="included-heading" title="What's included" />
            <ul className="ticks">
              {service.included.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </section>

        <Faq items={service.faqs.slice(0, 4)} title={`${service.name} questions`} />

        <section className="section section-mist" aria-labelledby="cities-heading">
          <div className="wrap ledger">
            <SectionHead id="cities-heading" title={`Cities in ${state.name}`} />
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${service.slug}/${state.slug}/${c.slug}`} className="link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
