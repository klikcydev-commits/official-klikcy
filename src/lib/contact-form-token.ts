import { createHmac, timingSafeEqual } from "node:crypto";

const MIN_SUBMIT_MS = 3000;

function getSecret(): string | undefined {
  return process.env.CONTACT_FORM_SECRET?.trim() || undefined;
}

export function createContactFormToken(now = Date.now()): string {
  const secret = getSecret();
  const ts = String(now);
  if (!secret) return `${ts}.dev`;
  const sig = createHmac("sha256", secret).update(ts).digest("hex");
  return `${ts}.${sig}`;
}

export function verifyContactFormToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || typeof token !== "string") return false;
  const [tsStr, sig] = token.split(".");
  const ts = Number(tsStr);
  if (!Number.isFinite(ts) || ts <= 0) return false;
  if (now - ts < MIN_SUBMIT_MS) return false;

  const secret = getSecret();
  if (!secret) {
    return sig === "dev" && now - ts < 24 * 60 * 60 * 1000;
  }

  if (!sig) return false;
  const expected = createHmac("sha256", secret).update(tsStr).digest("hex");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
