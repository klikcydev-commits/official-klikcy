import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const CONTACT_URL_PATTERN = /(?:https?:\/\/)?(?:www\.)?klikcy\.com\/contact\b/gi;

export type GeoLinkContext = {
  state?: { name: string; slug: string };
  city?: { name: string; slug: string; stateSlug: string };
  service?: { name: string; slug: string };
};

const LINK_CLASS =
  "font-semibold text-primary underline underline-offset-2 hover:text-primary/80";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Segment = { type: "text"; value: string } | { type: "link"; href: string; label: string };

function buildSegments(text: string, ctx?: GeoLinkContext): Segment[] {
  const segments: Segment[] = [{ type: "text", value: text }];

  const inject = (match: RegExp, href: string, label: string) => {
    const next: Segment[] = [];
    for (const seg of segments) {
      if (seg.type !== "text") {
        next.push(seg);
        continue;
      }
      const parts = seg.value.split(match);
      if (parts.length === 1) {
        next.push(seg);
        continue;
      }
      parts.forEach((part, i) => {
        if (part) next.push({ type: "text", value: part });
        if (i < parts.length - 1) next.push({ type: "link", href, label });
      });
    }
    segments.length = 0;
    segments.push(...next);
  };

  inject(CONTACT_URL_PATTERN, "/contact/", "contact us");

  if (ctx?.service?.name) {
    inject(new RegExp(`\\b${escapeRegex(ctx.service.name)}\\b`, "i"), `/services/${ctx.service.slug}/`, ctx.service.name);
  }
  if (ctx?.city?.name) {
    inject(
      new RegExp(`\\b${escapeRegex(ctx.city.name)}\\b`, "i"),
      `/service-areas/${ctx.city.stateSlug}/${ctx.city.slug}/`,
      ctx.city.name,
    );
  }
  if (ctx?.state?.name) {
    inject(
      new RegExp(`\\b${escapeRegex(ctx.state.name)}\\b`, "i"),
      `/service-areas/${ctx.state.slug}/`,
      ctx.state.name,
    );
  }

  inject(/\ball services\b/i, "/all-services/", "all services");
  inject(/\bservice pages?\b/i, "/all-services/", "service pages");

  return segments;
}

function renderSegments(segments: Segment[]): ReactNode {
  return segments.map((seg, i) => {
    if (seg.type === "text") return <Fragment key={i}>{seg.value}</Fragment>;
    return (
      <Link key={i} href={seg.href} className={LINK_CLASS}>
        {seg.label}
      </Link>
    );
  });
}

/** Renders geo copy with internal links for contact, locations, and services. */
export function GeoRichText({ text, context }: { text: string; context?: GeoLinkContext }) {
  return <>{renderSegments(buildSegments(text, context))}</>;
}
