import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { categories, getCategory } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";

export default function CategoryPage({ slug }: { slug: string }) {
  const cat = getCategory(slug)!;
  const services = getServicesByCategory(cat.slug);
  const others = categories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={cat.name}
          lede={cat.description}
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "All services", href: "/all-services" }, { name: cat.name }]}
        >
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
          <a href="#services" className="btn btn-secondary">
            See the {services.length} services
          </a>
        </PageHero>

        <section className="section" aria-labelledby="approach-heading">
          <div className="wrap ledger">
            <SectionHead id="approach-heading" title="How we approach it" />
            <div className="prose-k">
              {cat.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section section-mist scroll-mt-20" aria-labelledby="services-heading">
          <div className="wrap">
            <h2 id="services-heading" className="h2">
              {cat.name} services
            </h2>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug} className="flex flex-col bg-paper p-6">
                  <h3 className="text-lg">
                    <Link href={`/services/${s.slug}`} className="quiet-link">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="muted mt-2 flex-1 text-[0.95rem]">{s.shortDescription}</p>
                  <Link href={`/services/${s.slug}`} className="link mt-4 text-[0.95rem] font-semibold" aria-label={`Read about ${s.name}`}>
                    Read more
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="principles-heading">
          <div className="wrap">
            <h2 id="principles-heading" className="h2">
              What doesn&apos;t change between projects
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2 lg:grid-cols-4">
              {cat.principles.map((p) => (
                <div key={p.title} className="border-t-2 border-ink pt-5">
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="muted mt-2">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-line">
          <Faq items={cat.faqs} title={`${cat.name} questions`} />
        </div>

        <section className="section section-mist" aria-labelledby="other-heading">
          <div className="wrap ledger">
            <SectionHead id="other-heading" title="Other things we do" />
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="link text-lg font-semibold">
                    {c.name}
                  </Link>
                  <p className="muted mt-1 text-[0.95rem]">{c.tagline}</p>
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
