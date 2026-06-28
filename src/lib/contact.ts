import { z } from "zod";
import nodemailer from "nodemailer";

export const API_VERSION = 2;

const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.klikcy.com")
).replace(/\/$/, "");

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Invalid phone number"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(8000),
  website: z.literal("").optional(),
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

function buildContactEmail(data: ContactPayload) {
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
  });
}

const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + RATE_WINDOW_MS };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + RATE_WINDOW_MS;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  return entry.count <= RATE_MAX;
}

export function getClientIp(forwardedFor: string | null, fallback?: string): string {
  return forwardedFor?.split(",")[0]?.trim() || fallback || "unknown";
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const to = requireEnv("CONTACT_EMAIL");
  const fromUser = requireEnv("SMTP_USER");
  const { text, html } = buildContactEmail(data);
  const transport = createTransport();

  await transport.sendMail({
    from: `"Klikcy Contact" <${fromUser}>`,
    to,
    replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
    subject: `[Klikcy] ${data.service} — ${data.name} | ${data.phone}`,
    text,
    html,
  });
}

export type ContactValidationResult =
  | { ok: false; status: number; error: string; details?: Record<string, string[] | undefined> }
  | { ok: true; status: 200; silent: true }
  | { ok: true; status: 200; data: ContactPayload };

export function validateContactRequest(body: unknown, ip: string): ContactValidationResult {
  if (!rateLimit(ip)) {
    return { ok: false, status: 429, error: "Too many requests. Please try again in a minute." };
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

  return { ok: true, status: 200, data: parsed.data };
}

export function getHealthPayload() {
  return {
    ok: true,
    version: API_VERSION,
    requiredFields: ["name", "email", "phone", "service", "message"],
  };
}
