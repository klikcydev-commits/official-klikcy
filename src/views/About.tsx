import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { categories } from "@/lib/categories";
import {
  aboutFaqs,
  aboutHero,
  aboutIndustries,
  aboutNotDoing,
  aboutPrinciples,
  aboutStory,
  aboutTechStacks,
} from "@/content/about";
import { testimonials } from "@/content/proof";
import { Testimonials } from "@/components/site/Proof";

export default function About() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero title={aboutHero.title} lede={aboutHero.lede} breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}>
          <Link href="/contact" className="btn btn-primary">
            Talk to us
          </Link>
          <Link href="/all-services" className="btn btn-secondary">
            What we do
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="story-heading">
          <div className="wrap ledger">
            <SectionHead id="story-heading" title="Why Klikcy exists" />
            <div className="prose-k">
              {aboutStory.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="principles-heading">
          <div className="wrap">
            <h2 id="principles-heading" className="h2">
              How we work
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {aboutPrinciples.map((p) => (
                <div key={p.title} className="border-t-2 border-ink pt-5">
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="muted mt-2">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="do-heading">
          <div className="wrap ledger">
            <SectionHead id="do-heading" title="What we do, and what we don't" />
            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <h3 className="text-lg">We do</h3>
                <ul className="mt-4 space-y-2">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/categories/${c.slug}`} className="link">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg">We don&apos;t</h3>
                <ul className="ticks mt-4">
                  {aboutNotDoing.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="tools-heading">
          <div className="wrap ledger">
            <SectionHead id="tools-heading" title="Tools we use" intro="Mainstream, well-supported technology, so whoever works on your project next can pick it up easily." />
            <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {aboutTechStacks.map((s) => (
                <div key={s.label}>
                  <dt className="font-semibold">{s.label}</dt>
                  <dd className="muted mt-1">{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="who-heading">
          <div className="wrap ledger">
            <SectionHead id="who-heading" title="Who we work with" />
            <div>
              <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {aboutIndustries.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="muted mt-6">
                Anywhere in the U.S. See{" "}
                <Link href="/service-areas" className="link">
                  where we work
                </Link>{" "}
                for state-by-state notes.
              </p>
            </div>
          </div>
        </section>

        <Testimonials items={testimonials.slice(0, 4)} tone="mist" />

        <div className="border-t border-line">
          <Faq items={aboutFaqs} title="About Klikcy" />
        </div>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
