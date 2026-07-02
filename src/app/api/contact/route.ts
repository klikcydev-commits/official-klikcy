import { NextRequest, NextResponse } from "next/server";
import { getClientIp, MAX_CONTACT_BODY_BYTES, sendContactEmail, validateContactRequest } from "@/lib/contact";

export const dynamic = "force-dynamic";

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_CONTACT_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large." }, { status: 400, headers: securityHeaders });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_CONTACT_BODY_BYTES) {
      return NextResponse.json({ error: "Request body too large." }, { status: 400, headers: securityHeaders });
    }
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: securityHeaders });
  }

  const ip = getClientIp(request.headers.get("x-forwarded-for"), request.ip);
  const result = validateContactRequest(body, ip);

  if (!result.ok) {
    const headers: Record<string, string> = { ...securityHeaders };
    if (result.status === 429 && result.retryAfterSeconds) {
      headers["Retry-After"] = String(result.retryAfterSeconds);
    }
    return NextResponse.json(
      { error: result.error, ...(result.details ? { details: result.details } : {}) },
      { status: result.status, headers },
    );
  }

  if ("silent" in result) {
    return NextResponse.json({ ok: true }, { headers: securityHeaders });
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true }, { headers: securityHeaders });
  } catch (err) {
    console.error("[contact] transport error:", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again shortly." },
      { status: 502, headers: securityHeaders },
    );
  }
}
