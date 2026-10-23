"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address, like name@company.com."),
  phone: z
    .string()
    .trim()
    .max(30, "That phone number is too long.")
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 7, "That phone number looks too short. You can leave it blank."),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().trim().min(10, "Add a sentence or two about the project (at least 10 characters)."),
  website: z.literal("").optional(),
});

type FormValues = z.infer<typeof schema>;

/** /api/contact rejects tokens younger than this (bots submit instantly). */
const MIN_TOKEN_AGE_MS = 3500;
/** Refresh the token if the tab has been open this long. */
const MAX_TOKEN_AGE_MS = 12 * 60 * 60 * 1000;

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-slate/70 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 disabled:opacity-60 aria-[invalid=true]:border-destructive";

/** Signed timestamp from the server. Fetched in the browser because the contact page is static. */
async function fetchFormToken(): Promise<string> {
  const response = await fetch("/api/contact/token/", { cache: "no-store" });
  if (!response.ok) throw new Error("Couldn't prepare the form.");
  const body = (await response.json()) as { token?: string };
  if (!body.token) throw new Error("Couldn't prepare the form.");
  return body.token;
}

/** A mailto link carrying the visitor's message, used when the form can't send. */
function mailtoLink(email: string, values: FormValues): string {
  const subject = `Project inquiry from ${values.name}`;
  const details = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : "",
    values.company ? `Company: ${values.company}` : "",
    values.service ? `Service: ${values.service}` : "",
  ].filter(Boolean);
  const body = [values.message, "", ...details].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ serviceOptions, email }: { serviceOptions: string[]; email: string }) {
  const token = useRef<{ value: string; at: number } | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fallback, setFallback] = useState<string | null>(null);

  const refreshToken = async () => {
    token.current = { value: await fetchFormToken(), at: Date.now() };
  };

  useEffect(() => {
    refreshToken().catch(() => {
      token.current = null;
    });
  }, []);

  /** Returns a token the server will accept, waiting out the minimum age if needed. */
  const readyToken = async (): Promise<string> => {
    if (!token.current || Date.now() - token.current.at > MAX_TOKEN_AGE_MS) await refreshToken();
    const current = token.current!;
    const wait = MIN_TOKEN_AGE_MS - (Date.now() - current.at);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    return current.value;
  };

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
    setFallback(null);
    setSubmitting(true);
    try {
      const payload = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        company: res.data.company?.trim() ?? "",
        service: res.data.service || "Not sure yet",
        message: res.data.message,
        website: res.data.website ?? "",
        formToken: await readyToken(),
      };
      const response = await fetch("/api/contact/", {
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
      // A stale or missing token is the usual cause; get a new one for the next try.
      refreshToken().catch(() => undefined);
      setFallback(mailtoLink(email, res.data));
      toast.error(`${message} You can also send it by email.`);
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
        Only your name, email, and a few words about the project are needed. Prefer email? Write to{" "}
        <a href={`mailto:${email}`} className="link">
          {email}
        </a>
        .
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={errors.name} disabled={submitting} />
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} disabled={submitting} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" error={errors.phone} disabled={submitting} optional />
        <Field label="Company (optional)" name="company" autoComplete="organization" disabled={submitting} optional />
      </div>
      <div>
        <label htmlFor="field-service" className="font-semibold">
          What do you need help with? <span className="font-normal text-slate">(optional)</span>
        </label>
        <select id="field-service" name="service" disabled={submitting} className={inputClass} defaultValue="">
          <option value="">Not sure yet</option>
          {serviceOptions
            .filter((s) => s !== "Not sure yet")
            .map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
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
          required
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
      {fallback ? (
        <div className="rounded-xl border border-line bg-mist p-4" role="alert">
          <p className="font-semibold">The form couldn&apos;t send your message.</p>
          <p className="muted mt-1 text-[0.95rem]">
            Try again, or send the same message from your email app. Everything you typed is already filled in.
          </p>
          <a href={fallback} className="btn btn-secondary mt-3">
            Send it by email instead
          </a>
        </div>
      ) : null}
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
