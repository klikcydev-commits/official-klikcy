"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(30, "Phone number is too long")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(10, "Please share a few sentences about your project"),
  website: z.literal("").optional(),
});

const services = [
  "Website Development",
  "App & Software",
  "AI Automation",
  "E-Commerce",
  "Branding & Design",
  "Marketing & Growth",
  "SEO & AEO",
  "Other",
];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "build@klikcy.com";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const payload = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        company: res.data.company?.trim() ?? "",
        service: res.data.service,
        message: res.data.message,
        website: res.data.website ?? "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error || "Unable to send message.");
      }
      setSent(true);
      toast.success("Thanks! We'll be in touch within one business day.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to send message.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14">
            <span className="micro-label">Contact</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Tell us about your project.</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              We respond within one business day with a clear next step — discovery, scope or a get free quote.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-3">
            <aside className="space-y-6">
              <div className="card-soft">
                <Mail className="h-5 w-5 text-primary" />
                <div className="mt-3 micro-label">Email</div>
                <a href={`mailto:${contactEmail}`} className="mt-1 block text-lg font-semibold text-navy-deep hover:text-primary">
                  {contactEmail}
                </a>
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
                <form onSubmit={onSubmit} className="card-soft space-y-5" noValidate>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" required error={errors.name} disabled={submitting} />
                    <Field label="Email" name="email" type="email" required error={errors.email} disabled={submitting} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" name="phone" type="tel" required error={errors.phone} disabled={submitting} />
                    <Field label="Company (optional)" name="company" disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-deep">
                      Service <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="service"
                      required
                      disabled={submitting}
                      className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:opacity-60"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-deep">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      disabled={submitting}
                      className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:opacity-60"
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
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

const Field = ({
  label,
  name,
  type = "text",
  required: isRequired,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-semibold text-navy-deep">
      {label}
      {isRequired && <span className="text-destructive"> *</span>}
    </label>
    <input
      name={name}
      type={type}
      required={isRequired}
      autoComplete={name === "phone" ? "tel" : name === "email" ? "email" : name === "name" ? "name" : undefined}
      disabled={disabled}
      className="mt-1 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:opacity-60"
    />
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

export default Contact;
