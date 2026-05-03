import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }: { items: { name: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="container-x pt-6">
    <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {it.href ? (
            <Link to={it.href} className="hover:text-primary">{it.name}</Link>
          ) : (
            <span className="text-navy-deep font-medium">{it.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
