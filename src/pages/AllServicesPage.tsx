import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { getAllServicesSeo } from "@/lib/seo";

const allServicesSeo = getAllServicesSeo();

const AllServicesPage = () => (
  <>
    <SEO
      title={allServicesSeo.title}
      description={allServicesSeo.description}
      keywords={allServicesSeo.keywords}
      canonical={allServicesSeo.canonical}
      robots={allServicesSeo.robots}
      ogImage={allServicesSeo.ogImage}
      jsonLd={allServicesSeo.jsonLd}
    />
    <Header />
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "All Services" }]} />
    <main>
      <section className="bg-gradient-hero">
        <div className="container-x py-14 sm:py-20">
          <span className="micro-label">Services</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">All services</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every practice we offer, in one place. Open a category for its full scope, or jump straight to a specific
            deliverable.
          </p>
          <Link to="/contact" className="btn-primary mt-7 inline-flex items-center gap-2">
            Request a Strategy Call <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-10 lg:gap-12">
            {categories.map((cat) => {
              const services = getServicesByCategory(cat.slug);
              return (
                <div key={cat.slug} id={cat.slug} className="border-b border-border pb-10 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="micro-label">{cat.short}</span>
                      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                        <Link to={`/categories/${cat.slug}`} className="underline-offset-4 hover:text-primary hover:underline">
                          {cat.name}
                        </Link>
                      </h2>
                      <p className="mt-2 max-w-2xl text-muted-foreground">{cat.tagline}</p>
                    </div>
                    <Link
                      to={`/categories/${cat.slug}`}
                      className="shrink-0 text-sm font-semibold text-primary hover:underline"
                    >
                      Category overview →
                    </Link>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="card-soft group block h-full">
                          <h3 className="text-base font-bold">{s.name}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                            Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                          </span>
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
    </main>
    <Footer />
  </>
);

export default AllServicesPage;
