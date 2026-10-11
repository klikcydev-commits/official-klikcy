import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { getState } from "@/lib/states";
import { getService } from "@/lib/services";
import { getStateIndustries, getTimeZone } from "@/lib/state-details";
import { marketLinksForState } from "@/lib/market-links";
import {
  getPrivacyParagraphs,
  getStateFaqs,
  getStateServices,
  listCities,
  localCities,
  privacyLawLabel,
  regionWord,
  shortTimeZone,
} from "@/lib/state-copy";

export default function StatePage({ slug }: { slug: string }) {
  const state = getState(slug)!;
  const industries = getStateIndustries(state);
  const featured = getStateServices(state);
  const tzShort = shortTimeZone(state);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={`Web development and SEO for ${state.name} businesses`}
          lede={`Klikcy works remotely with companies across ${state.name}, including ${listCities(localCities(state).slice(0, 3))}. We build websites, improve search visibility, and automate repetitive work, with meetings scheduled in ${tzShort}.`}
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "Where we work", href: "/service-areas" }, { name: state.name }]}
          aside={
            <dl className="rounded-lg border border-line p-5 text-[0.95rem]">
              <div>
                <dt className="font-semibold">Time zone</dt>
                <dd className="muted mt-1">{getTimeZone(state)}</dd>
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <dt className="font-semibold">Privacy law to know</dt>
                <dd className="muted mt-1">{privacyLawLabel(state) ?? "No comprehensive state law yet"}</dd>
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <dt className="font-semibold">Key industries</dt>
                <dd className="muted mt-1">{state.blurb.charAt(0).toUpperCase() + state.blurb.slice(1)}</dd>
              </div>
            </dl>
          }
        >
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
          <Link href="/all-services" className="btn btn-secondary">
            See all services
          </Link>
        </PageHero>

        {marketLinksForState(state.slug).length > 0 ? (
          <nav aria-label={`Local pages in ${state.name}`} className="border-b border-line">
            <div className="wrap flex flex-wrap items-baseline gap-x-5 gap-y-2 py-5">
              <span className="font-semibold">Local pages:</span>
              {marketLinksForState(state.slug).map((m) => (
                <Link key={m.href} href={m.href} className="link">
                  {m.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}

        <section className="section" aria-labelledby="remote-heading">
          <div className="wrap ledger">
            <SectionHead id="remote-heading" title={`Working with us from ${state.name}`} />
            <div className="prose-k">
              <p>
                We don&apos;t have an office in {state.name}, and we don&apos;t pretend to. Klikcy is a remote-first team,
                and every project runs the same way wherever our clients are: a video call to start, a written scope with
                a fixed price, a staging link you can open anytime, and a short update every week.
              </p>
              <p>
                {state.name} is on {getTimeZone(state)}. We book calls inside your business hours and reply to messages
                within one business day. You never pay for travel, and you deal with the same people from the first call to
                launch.
              </p>
              <p>
                We work with businesses all over {regionWord(state)}, including in {listCities(localCities(state))}, and in plenty of
                smaller communities that aren&apos;t on any list.
              </p>
            </div>
          </div>
        </section>

        {industries.length > 0 ? (
          <section className="section section-mist" aria-labelledby="industries-heading">
            <div className="wrap">
              <h2 id="industries-heading" className="h2 max-w-[24ch]">
                What {state.name} businesses usually need from us
              </h2>
              <p className="muted mt-4 max-w-2xl">
                {state.name}&apos;s economy leans on {state.blurb}. Here&apos;s what those businesses tend to ask for.
              </p>
              <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {industries.map((ind) => (
                  <div key={ind.label} className="border-t-2 border-ink pt-5">
                    <h3 className="text-lg">{ind.label}</h3>
                    <p className="muted mt-2">{ind.need}</p>
                    <ul className="mt-3 space-y-1 text-[0.95rem]">
                      {ind.services.map((slug) => {
                        const s = getService(slug);
                        return s ? (
                          <li key={slug}>
                            <Link href={`/services/${slug}`} className="link">
                              {s.name}
                            </Link>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section" aria-labelledby="privacy-heading">
          <div className="wrap ledger">
            <SectionHead id="privacy-heading" title={`Privacy rules for ${state.name} websites`} />
            <div className="prose-k">
              {getPrivacyParagraphs(state).map((p, i, arr) => (
                <p key={p.slice(0, 30)} className={i === arr.length - 1 ? "meta" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="popular-heading">
          <div className="wrap ledger">
            <SectionHead
              id="popular-heading"
              title={`Popular with ${state.name} clients`}
              intro="A starting point. Every service is available wherever you are."
            />
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {featured.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link text-lg font-semibold">
                    {s.name}
                  </Link>
                  <p className="muted mt-1 text-[0.95rem]">{s.shortDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-line">
          <Faq items={getStateFaqs(state)} title={`Working with Klikcy in ${state.name}`} />
        </div>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
