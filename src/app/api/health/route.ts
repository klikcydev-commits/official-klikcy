import { NextResponse } from "next/server";
import { getHealthPayload } from "@/lib/contact";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHealthPayload(), {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
