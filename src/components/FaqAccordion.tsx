"use client";

import { ChevronDown } from "lucide-react";
import { GeoRichText, type GeoLinkContext } from "@/components/GeoRichText";
import type { GeoFaq } from "@/lib/geo-aeo-content";
import { FAQ_SECTION_HEADING } from "@/lib/geo-aeo-content";
import { accordionItemId } from "@/lib/accordion-id";
import { cn } from "@/lib/utils";

export { FAQ_SECTION_HEADING };

interface FaqAccordionProps {
  faqs: GeoFaq[];
  /** Section heading — defaults to "Frequently Asked Questions" */
  heading?: string;
  /** Prefix for accordion item values (e.g. state slug) */
  idPrefix?: string;
  /** Stable ID + anchor namespace: faq or aeo */
  itemIdKind?: "faq" | "aeo";
  /** Internal link context for answer copy */
  linkContext?: GeoLinkContext;
  className?: string;
  /** When true, renders only the card (no outer section wrapper) */
  embedded?: boolean;
  /** Optional in-page jump links above the accordion */
  showAnchorNav?: boolean;
}

export function FaqAccordion({
  faqs,
  heading = FAQ_SECTION_HEADING,
  idPrefix = "faq",
  itemIdKind = "faq",
  linkContext,
  className,
  embedded = false,
  showAnchorNav = false,
}: FaqAccordionProps) {
  const headingId = `${idPrefix}-heading`;

  const card = (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[hsl(var(--border))] bg-white p-6 shadow-sm sm:p-8",
        "dark:border-white/10 dark:bg-[hsl(var(--card))]",
        className,
      )}
    >
      <h2
        id={headingId}
        className="font-display text-[length:var(--type-h3)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]"
      >
        {heading}
      </h2>

      {showAnchorNav && faqs.length > 1 && (
        <nav aria-label={`${heading} quick links`} className="mt-4 flex flex-wrap gap-2">
          {faqs.map((f) => {
            const anchorId = accordionItemId(itemIdKind, f.q);
            return (
              <a
                key={anchorId}
                href={`#${anchorId}`}
                className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--soft-bg))] px-3 py-1 text-xs font-medium text-[hsl(var(--navy-deep))] hover:border-primary hover:text-primary dark:border-white/10"
              >
                {f.q.length > 48 ? `${f.q.slice(0, 45)}…` : f.q}
              </a>
            );
          })}
        </nav>
      )}

      <div className="mt-6 w-full divide-y divide-[hsl(var(--border))] dark:divide-white/10">
        {faqs.map((f) => {
          const itemId = accordionItemId(itemIdKind, f.q);
          return (
            <details
              key={itemId}
              id={itemId}
              className="group scroll-mt-28 border-b border-[hsl(var(--border))] last:border-b-0 dark:border-white/10"
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between gap-4 py-4",
                  "text-[length:var(--type-body)] font-semibold leading-snug text-[hsl(var(--navy-deep))]",
                  "dark:text-[hsl(var(--foreground))] sm:text-[1.02rem]",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                <span>{f.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div
                className="pb-4 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">
                  <GeoRichText text={f.a} context={linkContext} />
                  {f.list && f.list.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5">
                      {f.list.map((item) => (
                        <li key={item}>
                          <GeoRichText text={item} context={linkContext} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );

  if (embedded) return card;

  return (
    <section aria-labelledby={headingId} className="section">
      <div className="container-x max-w-3xl">{card}</div>
    </section>
  );
}
