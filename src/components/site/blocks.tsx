import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/Breadcrumbs";
import { cn } from "@/utils/cn";
import { commitments } from "@/content/commitments";

/** Top of an inner page: breadcrumb, H1, and an optional lede and actions. */
export function PageHero({
  title,
  lede,
  breadcrumbs,
  children,
  aside,
}: {
  title: ReactNode;
  lede?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="wrap pb-14 pt-8 sm:pb-16 sm:pt-10">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className={cn("mt-8 grid gap-10", aside && "lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16")}>
          <div>
            <h1 className="display max-w-[18ch]">{title}</h1>
            {lede ? <p className="lede mt-6">{lede}</p> : null}
            {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

/** Left-column heading used in `.ledger` sections. */
export function SectionHead({ title, intro, id }: { title: ReactNode; intro?: ReactNode; id?: string }) {
  return (
    <div>
      <h2 id={id} className="h2">
        {title}
      </h2>
      {intro ? <p className="muted mt-4 max-w-md">{intro}</p> : null}
    </div>
  );
}

export function Faq({ items, title = "Common questions", intro }: { items: { q: string; a: string }[]; title?: string; intro?: ReactNode }) {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="wrap ledger">
        <SectionHead id="faq-heading" title={title} intro={intro} />
        <div className="faq">
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Tell us what you're working on.",
  body = "A few sentences is enough. We'll reply within one business day with questions or a suggested next step, and a fixed quote once the scope is clear.",
  action = "Start a project",
}: {
  title?: string;
  body?: string;
  action?: string;
}) {
  return (
    <section className="section-ink">
      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
        <div>
          <h2 className="h2 max-w-[20ch]">{title}</h2>
          <p className="mt-4 max-w-xl text-white/75">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-light">
              {action}
            </Link>
            <Link href="/all-services" className="btn btn-outline-light">
              Browse services
            </Link>
          </div>
        </div>
        <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="font-semibold text-white">What you can count on</p>
          <ul className="ticks mt-4 text-[0.95rem] text-white/80">
            {commitments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
