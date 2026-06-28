import Link from "next/link";
import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={`card-soft group block p-6 transition hover:-translate-y-0.5 ${className}`.trim()}
    >
      <h3 className="text-lg font-bold text-navy-deep group-hover:text-primary">{service.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{service.shortDescription}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-primary">Learn more →</span>
    </Link>
  );
}
