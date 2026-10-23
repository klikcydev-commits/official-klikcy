import { NextResponse } from "next/server";
import { createContactFormToken } from "@/lib/contact-form-token";

/**
 * Fresh form token for the contact form. The contact page is statically rendered,
 * so a token baked into its HTML would expire; the form fetches one here on load.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { token: createContactFormToken() },
    { headers: { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" } },
  );
}
