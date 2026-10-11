"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address, like name@company.com."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number so we can call if email bounces.")
    .max(30, "That phone number is too long.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a phone number with at least 7 digits."),
  company: z.string().optional(),
  service: z.string().min(1, 'Choose the closest match, or "Not sure yet".'),
  message: z.string().trim().min(10, "Add a sentence or two about the project (at least 10 characters)."),
  website: z.literal("").optional(),
});


const inputClass =
  "mt-1.5 block w-full rounded-md border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-slate/70 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 disabled:opacity-60 aria-[invalid=true]:border-destructive";

export default function ContactForm({
  serviceOptions,
  email,
  formToken,
}: {
  serviceOptions: string[];
  email: string;
  /** Signed timestamp from the server; /api/contact rejects submissions without it. */
  formToken: string;
}) {
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
      const first = res.error.issues[0]?.path[0];
      if (typeof first === "string") document.getElementById(`field-${first}`)?.focus();
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
        formToken,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (response.status === 429) throw new Error(body.error || "Too many messages from this connection. Wait a few minutes.");
      if (!response.ok) throw new Error(body.error || "Your message didn't send.");
      setSent(true);
      toast.success("Message sent. We'll reply within one business day.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Your message didn't send.";
      toast.error(`${message} Try again, or email ${email}.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-line p-8" role="status">
        <h2 className="h2">Message sent.</h2>
        <p className="muted mt-3 max-w-lg">
          Thanks. We&apos;ll reply within one business day. If it&apos;s urgent, email{" "}
          <a href={`mailto:${email}`} className="link">
            {email}
          </a>{" "}
          and mention your name.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate aria-describedby="form-note">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <p id="form-note" className="meta">
        All fields are required unless marked optional.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={errors.name} disabled={submitting} />
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} disabled={submitting} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} disabled={submitting} />
        <Field label="Company (optional)" name="company" autoComplete="organization" disabled={submitting} optional />
      </div>
      <div>
        <label htmlFor="field-service" className="font-semibold">
          What do you need help with?
        </label>
        <select
          id="field-service"
          name="service"
          disabled={submitting}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "error-service" : undefined}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service ? (
          <p id="error-service" className="mt-1.5 text-sm text-destructive">
            {errors.service}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="field-message" className="font-semibold">
          About the project
        </label>
        <p id="hint-message" className="meta mt-0.5">
          What you have now, what you want to change, and any deadline.
        </p>
        <textarea
          id="field-message"
          name="message"
          rows={6}
          disabled={submitting}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "hint-message error-message" : "hint-message"}
          className={inputClass}
        />
        {errors.message ? (
          <p id="error-message" className="mt-1.5 text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="meta">
          We use these details only to reply about your project. See our{" "}
          <a href="/privacy/" className="link">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  disabled,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  optional?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={!optional}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `error-${name}` : undefined}
        className={inputClass}
      />
      {error ? (
        <p id={`error-${name}`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
