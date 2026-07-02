"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(30, "Phone number is too long")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number"),
  company: z.string().max(100).optional(),
  service: z.string().min(1, "Please select a service").max(80),
  message: z.string().trim().min(10, "Please share a few sentences about your project").max(5000),
  website: z.literal("").optional(),
  formToken: z.string().min(3),
});

const serviceOptions = [
  "Website Development",
  "App & Software",
  "AI Automation",
  "E-Commerce",
  "Branding & Design",
  "Marketing & Growth",
  "SEO & AEO",
  "Other",
];

interface ContactFormProps {
  formToken: string;
}

export function ContactForm({ formToken }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = schema.safeParse({ ...data, formToken });
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          company: res.data.company?.trim() ?? "",
          service: res.data.service,
          message: res.data.message,
          website: res.data.website ?? "",
          formToken: res.data.formToken,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (response.status === 429) {
        throw new Error(body.error || "Too many requests — please try again in a few minutes.");
      }
      if (!response.ok) throw new Error(body.error || "Unable to send message.");
      setSent(true);
      toast.success("Thanks! We'll be in touch within one business day.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="card-soft flex flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h2 className="text-2xl font-bold">Message sent</h2>
        <p className="text-muted-foreground">We&apos;ll reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-soft space-y-5 p-6 sm:p-8" noValidate>
      <input type="hidden" name="formToken" value={formToken} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Name *</span>
          <input name="name" className="input-field" required />
          {errors.name && <span className="text-sm text-destructive">{errors.name}</span>}
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Email *</span>
          <input name="email" type="email" className="input-field" required />
          {errors.email && <span className="text-sm text-destructive">{errors.email}</span>}
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Phone *</span>
          <input name="phone" type="tel" className="input-field" required />
          {errors.phone && <span className="text-sm text-destructive">{errors.phone}</span>}
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Company</span>
          <input name="company" className="input-field" />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Service *</span>
        <select name="service" className="input-field" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <span className="text-sm text-destructive">{errors.service}</span>}
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Project details *</span>
        <textarea name="message" rows={5} className="input-field min-h-[140px]" required />
        {errors.message && <span className="text-sm text-destructive">{errors.message}</span>}
      </label>
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
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
  );
}
