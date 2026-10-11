import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { categories } from "@/lib/categories";
import { getServicesByCategory, services } from "@/lib/services";

export default function AllServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="All services"
          lede={`Everything we do, in one list: ${services.length} services across ${categories.length} areas. If you're not sure which one fits, describe the problem on the contact page and we'll point you in the right direction.`}
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "All services" }]}
        >
          <Link href="/contact" className="btn btn-primary">
            Describe your project
          </Link>
        </PageHero>

        <nav aria-label="Jump to a service area" className="border-b border-line">
          <ul className="wrap flex flex-wrap gap-x-5 gap-y-2 py-5 text-[0.95rem]">
            {categories.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="link">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {categories.map((cat, i) => (
          <section
            key={cat.slug}
            id={cat.slug}
            className={`section scroll-mt-20 ${i % 2 === 1 ? "section-mist" : ""}`}
            aria-labelledby={`${cat.slug}-heading`}
          >
            <div className="wrap ledger">
              <div>
                <h2 id={`${cat.slug}-heading`} className="h2">
                  <Link href={`/categories/${cat.slug}`} className="quiet-link">
                    {cat.name}
                  </Link>
                </h2>
                <p className="muted mt-4 max-w-md">{cat.tagline}</p>
                <Link href={`/categories/${cat.slug}`} className="link mt-4 inline-block font-semibold">
                  {cat.name} overview
                </Link>
              </div>
              <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {getServicesByCategory(cat.slug).map((s) => (
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
        ))}

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
