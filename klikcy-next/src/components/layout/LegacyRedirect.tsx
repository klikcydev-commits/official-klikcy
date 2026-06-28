"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { legacyServiceSlugs } from "@/lib/legacy-service-slugs";

interface LegacyRedirectProps {
  /** When set, redirects to this path (e.g. city slug aliases). */
  href?: string;
}

export function LegacyRedirect({ href }: LegacyRedirectProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (href) {
      router.replace(href);
      return;
    }

    const path = (pathname ?? "").replace(/\/$/, "");
    const match = legacyServiceSlugs.find(({ from }) => path === `/services/${from}`);
    if (match) {
      router.replace(`/services/${match.to}/`);
    }
  }, [href, pathname, router]);

  return null;
}
