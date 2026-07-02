import { z } from "zod";
import nodemailer from "nodemailer";
import { verifyContactFormToken } from "@/lib/contact-form-token";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site-url";

export const API_VERSION = 3;
export const MAX_CONTACT_BODY_BYTES = 32 * 1024;

const SITE_URL = getSiteUrl();

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Invalid phone number"),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
  website: z.literal("").optional(),
  formToken: z.string().min(3).max(128),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) throw new Error(`Missing required environment variable: ${name}`);
  return v.trim();
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmail(data: Omit<ContactPayload, "formToken" | "website">) {
  const { name, email, phone, company, service, message } = data;
  const fields: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Company", company?.trim() || "—"],
    ["Service", service],
    ["Message", message],
  ];

  const text = [
    `New contact form submission from ${SITE_URL}`,
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#111827">
<p>New contact form submission from <a href="${escapeHtml(SITE_URL)}">${escapeHtml(SITE_URL)}</a></p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:640px;width:100%">${rows}</table>
</body></html>`;

  return { text, html };
}

function createTransport() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: false,
    connectionTimeout: 8000,
    socketTimeout: 8000,
  } as nodemailer.TransportOptions);
}

// Resend (HTTPS API) is more reliable in serverless than SMTP handshakes — optional alternative:
// const { Resend } = await import("resend");
// await new Resend(process.env.RESEND_API_KEY).emails.send({ ... });

export function getClientIp(forwardedFor: string | null, fallback?: string): string {
  return forwardedFor?.split(",")[0]?.trim() || fallback || "unknown";
}

async function sendWithRetry(data: Omit<ContactPayload, "formToken" | "website">): Promise<void> {
  const to = requireEnv("CONTACT_EMAIL");
  const fromUser = requireEnv("SMTP_USER");
  const { text, html } = buildContactEmail(data);
  const mail = {
    from: `"Klikcy Contact" <${fromUser}>`,
    to,
    replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
    subject: `[Klikcy] ${data.service} — ${data.name} | ${data.phone}`,
    text,
    html,
  };

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const transport = createTransport();
    try {
      await transport.sendMail(mail);
      transport.close();
      return;
    } catch (err) {
      lastError = err;
      transport.close();
      if (attempt === 0) await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw lastError;
}

export async function sendContactEmail(data: Omit<ContactPayload, "formToken" | "website">): Promise<void> {
  await sendWithRetry(data);
}

export type ContactValidationResult =
  | { ok: false; status: number; error: string; retryAfterSeconds?: number; details?: Record<string, string[] | undefined> }
  | { ok: true; status: 200; silent: true }
  | { ok: true; status: 200; data: Omit<ContactPayload, "formToken" | "website"> };

export function validateContactRequest(body: unknown, ip: string): ContactValidationResult {
  const rate = checkContactRateLimit(ip);
  if (!rate.ok) {
    return {
      ok: false,
      status: 429,
      error: "Too many requests — please try again in a few minutes.",
      retryAfterSeconds: rate.retryAfterSeconds ?? 60,
    };
  }

  const raw = body as Record<string, unknown> | null;
  if (typeof raw?.website === "string" && raw.website.trim()) {
    return { ok: true, status: 200, silent: true };
  }

  const rawPhone = typeof raw?.phone === "string" ? raw.phone.trim() : "";
  if (!rawPhone) {
    return { ok: false, status: 400, error: "Phone number is required." };
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: "Invalid form data.",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  if (!verifyContactFormToken(parsed.data.formToken)) {
    return { ok: false, status: 400, error: "Invalid form data." };
  }

  const { formToken: _formToken, website: _website, ...data } = parsed.data;
  void _formToken;
  void _website;
  return { ok: true, status: 200, data };
}

export function getHealthPayload() {
  return {
    ok: true,
    version: API_VERSION,
    requiredFields: ["name", "email", "phone", "service", "message", "formToken"],
  };
}
