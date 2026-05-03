import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCategory, categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { breadcrumbSchema, SITE } from "@/lib/schema";

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const cat = getCategory(slug);
  if (!cat) return <Navigate to="/404" replace />;
  const services = getServicesByCategory(cat.slug);
  const url = `${SITE.url}/categories/${cat.slug}`;

  return (
    <>
      <SEO
        title={`${cat.name} Services | Klikcy`}
        description={`${cat.description} Klikcy delivers ${cat.name.toLowerCase()} for businesses across the United States.`}
        canonical={url}
        jsonLd={[breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: cat.name, url }])]}
      />
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: cat.name }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{cat.short}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{cat.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{cat.description}</p>
            <Link to="/contact" className="btn-primary mt-7">Request a Strategy Call <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <span className="micro-label">Services</span>
            <h2 className="mt-3 text-3xl font-bold">{cat.name} services we deliver</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="card-soft group block">
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x">
            <span className="micro-label">Other practices</span>
            <h2 className="mt-3 text-3xl font-bold">Explore more from Klikcy</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.filter((c) => c.slug !== cat.slug).map((c) => (
                <Link key={c.slug} to={`/categories/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">{c.name}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
