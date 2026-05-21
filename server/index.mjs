/**
 * Contact form API — reads SMTP settings from .env (never expose to the browser).
 * Run: npm run server
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { z } from "zod";

const PORT = Number(process.env.CONTACT_API_PORT) || 8787;
const SITE_URL = (process.env.SITE_URL || "https://www.klikcy.com").replace(/\/$/, "");
const API_VERSION = 2;

const contactSchema = z.object({
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
});

function requireEnv(name) {
  const v = process.env[name];
  if (!v?.trim()) throw new Error(`Missing required environment variable: ${name}`);
  return v.trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmail({ name, email, phone, company, service, message }) {
  const fields = [
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

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

const rateMap = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

function rateLimit(ip) {
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

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    version: API_VERSION,
    requiredFields: ["name", "email", "phone", "service", "message"],
  });
});

app.post("/api/contact", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
  }

  const rawPhone = typeof req.body?.phone === "string" ? req.body.phone.trim() : "";
  if (!rawPhone) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid form data.", details: parsed.error.flatten().fieldErrors });
  }

  const { name, email, phone, company, service, message } = parsed.data;
  const to = requireEnv("CONTACT_EMAIL");
  const fromUser = requireEnv("SMTP_USER");
  const { text, html } = buildContactEmail({ name, email, phone, company, service, message });

  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"Klikcy Contact" <${fromUser}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Klikcy] ${service} — ${name} | ${phone}`,
      text,
      html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return res.status(500).json({ error: "Unable to send message right now. Please email us directly." });
  }
});

app.listen(PORT, () => {
  console.log(`[contact-api] listening on http://127.0.0.1:${PORT}`);
});
