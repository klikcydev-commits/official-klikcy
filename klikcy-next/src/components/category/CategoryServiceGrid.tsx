import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";

function CategoryServiceCard({ service: s, index }: { service: Service; index: number }) {
  const idx = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${s.slug}`}
      className="category-service-card group h-full"
    >
      <div className="relative z-[1] flex flex-1 flex-col">
        <span
          className="font-display text-[length:var(--type-label)] font-bold tabular-nums tracking-[0.28em] text-primary/90"
          aria-hidden
        >
          {idx}
        </span>
        <h3 className="mt-4 font-display text-[clamp(1.05rem,0.6vw+0.95rem,1.25rem)] font-bold leading-[var(--leading-tight)] tracking-tight text-navy-deep dark:text-foreground">
          {s.name}
        </h3>
        <p className="mt-2 flex-1 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">
          {s.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[length:var(--type-body)] font-semibold text-primary">
          View deliverable
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/5 transition duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function CategoryServiceGrid({ services }: { services: Service[] }) {
  return (
    <ul className="mt-12 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8" role="list">
      {services.map((s, i) => (
        <li key={s.slug} className="flex h-full min-w-0">
          <CategoryServiceCard service={s} index={i} />
        </li>
      ))}
    </ul>
  );
}
