import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by the page's SEO graph. */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="meta">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={`${it.name}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-line">/</span> : null}
            {it.href ? (
              <Link href={it.href} className="text-slate no-underline hover:text-teal hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
