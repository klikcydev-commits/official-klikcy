import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Globe2, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { orgSchema, breadcrumbSchema, SITE } from "@/lib/schema";

const values = [
  { icon: Sparkles, t: "Premium craft", d: "We design and build with care — no template clutter, no AI-generated mediocrity." },
  { icon: Target, t: "Outcomes over output", d: "We measure work in rankings, conversions and pipeline — not deliverables." },
  { icon: Globe2, t: "Remote-first, U.S.-wide", d: "We serve businesses in all 50 states with a senior team and async delivery." },
  { icon: Zap, t: "AI-native delivery", d: "We use AI internally to ship faster — and embed AI workflows into client systems." },
];

const About = () => (
  <>
    <SEO
      title="About Klikcy — Digital Agency for the United States"
      description="Klikcy is a remote-first digital agency building websites, SEO/AEO systems, AI automations and e-commerce platforms for U.S. businesses."
      canonical={`${SITE.url}/about`}
      jsonLd={[orgSchema(), breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "About", url: `${SITE.url}/about` }])]}
    />
    <Header />
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
    <main>
      <section className="bg-gradient-hero">
        <div className="container-x py-14 sm:py-20">
          <span className="micro-label">About Klikcy</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">A digital agency built for modern growth.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Klikcy is a remote-first agency partnering with U.S. businesses to ship websites, SEO and AEO systems, AI automations and e-commerce platforms — engineered for speed, search visibility and conversion.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="prose-klikcy">
            <h2>Our story</h2>
            <p>Klikcy was founded to solve a recurring problem: businesses pay agencies for "websites" and "SEO" but rarely receive systems that compound into real growth. We built Klikcy as the alternative — a small, senior team that engineers websites, SEO/AEO and AI automations as one connected stack.</p>
            <h2>How we work</h2>
            <p>Every engagement starts with a discovery sprint. We map goals, audience, technical context and growth levers — then design and ship in tight cycles with frequent client visibility. We're remote-first by design, which means we hire senior practitioners across the country instead of staffing offices.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="card-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white"><v.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-bold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-primary">
        <div className="container-x text-center text-white">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Let's plan your next chapter.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">A 30-minute call is the fastest way to see if Klikcy is the right partner for your business.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary">Request a Strategy Call <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
