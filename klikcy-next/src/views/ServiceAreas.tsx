import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states } from "@/lib/states";

const regions = ["Northeast", "Midwest", "South", "West"] as const;

const ServiceAreas = () => (
  <>
    <Header />
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas" }]} />
    <main>
      <section className="bg-gradient-hero">
        <div className="container-x py-14">
          <span className="micro-label">Nationwide</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Klikcy service areas across the U.S.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">A remote-first digital agency available for businesses in every U.S. state and major metro.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x space-y-12">
          {regions.map((r) => (
            <div key={r}>
              <span className="micro-label">{r}</span>
              <h2 className="mt-2 text-2xl font-bold">{r} states</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {states.filter((s) => s.region === r).map((s) => (
                  <Link key={s.slug} href={`/service-areas/${s.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">{s.name}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ServiceAreas;
