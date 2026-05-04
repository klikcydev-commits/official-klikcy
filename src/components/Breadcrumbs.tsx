import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Use `ink` on dark hero backgrounds for readable contrast. */
  tone?: "default" | "ink";
}

const Breadcrumbs = ({ items, tone = "default" }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={cn("container-x", tone === "default" && "pt-6", tone === "ink" && "pt-2 pb-4")}>
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm",
        tone === "default" && "text-muted-foreground",
        tone === "ink" && "text-white/55",
      )}
    >
      {items.map((it, i) => (
        <li key={`${it.name}-${i}`} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden />}
          {it.href ? (
            <Link
              to={it.href}
              className={cn(
                "transition",
                tone === "default" && "hover:text-primary",
                tone === "ink" && "font-medium text-white/80 hover:text-primary-light",
              )}
            >
              {it.name}
            </Link>
          ) : (
            <span
              className={cn(
                "font-medium",
                tone === "default" && "text-navy-deep",
                tone === "ink" && "text-white",
              )}
            >
              {it.name}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
