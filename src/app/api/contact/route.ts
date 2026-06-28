import { NextRequest, NextResponse } from "next/server";
import { getClientIp, sendContactEmail, validateContactRequest } from "@/lib/contact";

export const dynamic = "force-dynamic";

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: securityHeaders });
  }

  const ip = getClientIp(request.headers.get("x-forwarded-for"), request.ip);
  const result = validateContactRequest(body, ip);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, ...(result.details ? { details: result.details } : {}) },
      { status: result.status, headers: securityHeaders },
    );
  }

  if ("silent" in result) {
    return NextResponse.json({ ok: true }, { headers: securityHeaders });
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true }, { headers: securityHeaders });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return NextResponse.json(
      { error: "Unable to send message right now. Please email us directly." },
      { status: 500, headers: securityHeaders },
    );
  }
}
