import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted";

const shell: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-[hsl(var(--soft-bg))]",
};

interface PageSectionProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

/** // Design token: see src/index.css — consistent vertical rhythm and container width. */
export function PageSection({ id, variant = "default", className, innerClassName, children }: PageSectionProps) {
  return (
    <section id={id} className={cn(shell[variant], className)}>
      <div className={cn("container-x section", innerClassName)}>{children}</div>
    </section>
  );
}

interface SectionIntroProps {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionIntro({ kicker, title, description, className, align = "left" }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        description && "mb-10 sm:mb-12 lg:mb-14",
        className,
      )}
    >
      <span className="section-kicker micro-label">{kicker}</span>
      <h2 className="section-title mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description ? <p className="section-desc mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}
