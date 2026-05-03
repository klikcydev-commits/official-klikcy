import { useState } from "react";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, orgSchema, SITE } from "@/lib/schema";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please share a few sentences"),
});

const services = ["Website Development", "SEO & AEO", "AI Automation", "E-Commerce", "Branding & Design", "App & Software", "Marketing & Growth", "Other"];

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Thanks! We'll be in touch within one business day.");
  };

  return (
    <>
      <SEO
        title="Contact Klikcy — Strategy Call & Project Inquiry"
        description="Contact Klikcy to plan websites, SEO, AEO, AI automation, e-commerce and growth systems. Serving businesses across the United States."
        canonical={`${SITE.url}/contact`}
        jsonLd={[orgSchema(), breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Contact", url: `${SITE.url}/contact` }])]}
      />
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14">
            <span className="micro-label">Contact</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Tell us about your project.</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">We respond within one business day with a clear next step — discovery, scope or a strategy call.</p>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-3">
            <aside className="space-y-6">
              <div className="card-soft">
                <Mail className="h-5 w-5 text-primary" />
                <div className="mt-3 micro-label">Email</div>
                <a href="mailto:hello@klikcy.com" className="mt-1 block text-lg font-semibold text-navy-deep hover:text-primary">hello@klikcy.com</a>
              </div>
              <div className="card-soft">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="mt-3 micro-label">Service area</div>
                <p className="mt-1 font-semibold text-navy-deep">All 50 U.S. states + Washington DC</p>
                <p className="mt-1 text-sm text-muted-foreground">Remote-first delivery for every U.S. metro.</p>
              </div>
            </aside>

            <div className="lg:col-span-2">
              {sent ? (
                <div className="card-soft text-center py-16">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h2 className="mt-4 text-2xl font-bold">Message received</h2>
                  <p className="mt-2 text-muted-foreground">We'll reach out within one business day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="card-soft space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" error={errors.name} />
                    <Field label="Email" name="email" type="email" error={errors.email} />
                  </div>
                  <Field label="Company (optional)" name="company" />
                  <div>
                    <label className="block text-sm font-semibold text-navy-deep">Service</label>
                    <select name="service" className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none">
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-deep">Project details</label>
                    <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none" />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full">Send message</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const Field = ({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) => (
  <div>
    <label className="block text-sm font-semibold text-navy-deep">{label}</label>
    <input name={name} type={type} className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none" />
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

export default Contact;
