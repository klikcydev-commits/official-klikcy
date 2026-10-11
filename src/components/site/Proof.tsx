import Link from "next/link";
import type { CaseStudy, Testimonial } from "@/content/proof";
import { getService } from "@/lib/services";

function attribution(t: Testimonial) {
  const who = [t.role, t.company].filter(Boolean).join(", ");
  return [who, t.location].filter(Boolean).join(", ");
}

/** Renders nothing until real testimonials exist in src/content/proof.ts. */
export function Testimonials({
  items,
  title = "What clients say",
  tone = "paper",
}: {
  items: Testimonial[];
  title?: string;
  tone?: "paper" | "mist";
}) {
  if (items.length === 0) return null;
  return (
    <section className={`section ${tone === "mist" ? "section-mist" : ""}`} aria-labelledby="testimonials-heading">
      <div className="wrap">
        <h2 id="testimonials-heading" className="h2">
          {title}
        </h2>
        <ul className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {items.map((t) => (
            <li key={`${t.name}-${t.quote.slice(0, 20)}`}>
              <figure className="border-l-2 border-teal pl-6">
                <blockquote className="text-lg leading-relaxed text-ink">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 text-[0.95rem]">
                  <span className="font-semibold">{t.name}</span>
                  {attribution(t) ? <span className="muted">, {attribution(t)}</span> : null}
                  {t.source ? <span className="meta block">{t.source}</span> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CaseStudySummary({ study }: { study: CaseStudy }) {
  return (
    <article className="sheet flex h-full flex-col">
      <div className="px-5 pb-4 pt-5">
        <p className="meta">
          {study.industry}
          {study.location ? `, ${study.location}` : ""}
          {`, ${study.year}`}
        </p>
        <h3 className="mt-1 text-xl">
          <Link href={`/work#${study.slug}`} className="quiet-link">
            {study.client}
          </Link>
        </h3>
        <p className="muted mt-2 text-[0.95rem]">{study.summary}</p>
      </div>
      {study.results.length > 0 ? (
        <dl className="mt-auto grid grid-cols-2 border-t border-line">
          {study.results.slice(0, 2).map((r) => (
            <div key={r.label} className="px-5 py-4 [&+&]:border-l [&+&]:border-line">
              <dt className="sr-only">{r.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold text-teal [font-variation-settings:'wdth'_118]">{r.value}</span>
                <span className="meta">{r.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <article id={study.slug} className="scroll-mt-24 border-t border-line pt-12 first:border-0 first:pt-0">
      <div className="ledger">
        <div>
          <p className="meta">
            {study.industry}
            {study.location ? `, ${study.location}` : ""}
            {`, ${study.year}`}
          </p>
          <h2 className="h2 mt-2">{study.client}</h2>
          <ul className="mt-5 space-y-1 text-[0.95rem]">
            {study.services.map((slug) => {
              const s = getService(slug);
              return s ? (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="link">
                    {s.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          {study.url ? (
            <a href={study.url} className="link mt-5 inline-block text-[0.95rem]" rel="noopener" target="_blank">
              Visit the live site
            </a>
          ) : null}
        </div>
        <div className="prose-k">
          <p className="lede !mt-0">{study.summary}</p>
          <h3>The situation</h3>
          <p>{study.challenge}</p>
          <h3>What we did</h3>
          <ul>
            {study.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          {study.results.length > 0 ? (
            <>
              <h3>Results</h3>
              <dl className="!mt-4 grid gap-6 sm:grid-cols-3">
                {study.results.map((r) => (
                  <div key={r.label}>
                    <dt className="sr-only">{r.label}</dt>
                    <dd>
                      <span className="block text-3xl font-semibold text-teal [font-variation-settings:'wdth'_118]">{r.value}</span>
                      <span className="meta">{r.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}
          {study.testimonial ? (
            <figure className="!mt-10 border-l-2 border-teal pl-6">
              <blockquote className="text-lg text-ink">
                <p>&ldquo;{study.testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-3 text-[0.95rem]">
                <span className="font-semibold">{study.testimonial.name}</span>
                {attribution(study.testimonial) ? <span className="muted">, {attribution(study.testimonial)}</span> : null}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </article>
  );
}
