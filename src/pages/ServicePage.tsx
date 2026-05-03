import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: cat?.name || "Services", href: `/categories/${service.category}` }, { name: service.name }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{cat?.name}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{service.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Request a Strategy Call <ArrowRight className="h-4 w-4" /></Link>
              <Link to={`/categories/${service.category}`} className="btn-secondary">All {cat?.short}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 prose-klikcy">
              <h2>Who this is for</h2>
              <ul>{service.whoFor.map((w) => <li key={w}>{w}</li>)}</ul>
              <h2>What's included</h2>
              <ul>{service.included.map((i) => <li key={i}>{i}</li>)}</ul>
              <h2>Technical foundation</h2>
              <ul>{service.technical.map((t) => <li key={t}>{t}</li>)}</ul>
              <h2>Frequently asked questions</h2>
              {service.faqs.map((f) => (
                <div key={f.q} className="mb-5">
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
            <aside className="space-y-6">
              <div className="card-soft">
                <div className="micro-label">Quick facts</div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Serving all 50 U.S. states</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> SEO & AEO ready at launch</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Remote-first delivery</li>
                </ul>
                <Link to="/contact" className="btn-primary mt-5 w-full text-sm">Start your project</Link>
              </div>
              {related.length > 0 && (
                <div className="card-soft">
                  <div className="micro-label">Related services</div>
                  <ul className="mt-3 space-y-2">
                    {related.map((r) => (
                      <li key={r.slug}><Link to={`/services/${r.slug}`} className="text-sm text-foreground/80 hover:text-primary">{r.name}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x">
            <span className="micro-label">By location</span>
            <h2 className="mt-3 text-3xl font-bold">{service.name} in your state</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {priorityStates.map((s) => (
                <Link key={s.slug} to={`/${service.slug}/${s.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {service.name} in {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <span className="micro-label">By city</span>
            <h2 className="mt-3 text-3xl font-bold">{service.name} in major U.S. cities</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {priorityStates.flatMap((st) => getCitiesForState(st).slice(0, 4)).map((c) => (
                <Link key={`${c.state.slug}-${c.slug}`} to={`/${service.slug}/${c.state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {service.name} in {c.name}, {c.state.abbr}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
