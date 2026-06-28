import Link from "next/link";

type CTAProps = {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function CTA({
  title,
  description,
  primaryHref = "/contact/",
  primaryLabel = "Start Your Project",
  secondaryHref = "/all-services/",
  secondaryLabel = "View Services",
  className = "",
}: CTAProps) {
  return (
    <section className={`section bg-gradient-soft ${className}`.trim()}>
      <div className="container-x text-center">
        <h2 className="section-title mx-auto max-w-2xl font-display">{title}</h2>
        {description ? <p className="section-desc mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p> : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          {secondaryHref ? (
            <Link href={secondaryHref} className="btn-secondary">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
