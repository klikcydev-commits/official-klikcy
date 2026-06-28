import { cn } from "@/utils/cn";

type SectionVariant = "default" | "muted" | "ink" | "navy";

const shell: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-[hsl(var(--soft-bg))]",
  ink: "surface-dark bg-ink text-white",
  navy: "surface-dark bg-navy text-white",
};

interface PageSectionProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

/** Design token: see `src/styles/globals.css` + `src/index.css` — vertical rhythm and container width. */
export function PageSection({ id, variant = "default", className, innerClassName, children }: PageSectionProps) {
  return (
    <section id={id} className={cn(shell[variant], className)}>
      <div className={cn(innerClassName ?? "container-x section")}>{children}</div>
    </section>
  );
}

type IntroTone = "default" | "onDark";

interface SectionIntroProps {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
  /** Use onDark when the section background is ink/navy so headings stay readable. */
  tone?: IntroTone;
}

export function SectionIntro({ kicker, title, description, className, align = "left", tone = "default" }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        description && "mb-10 sm:mb-14 lg:mb-16",
        tone === "onDark" && "[&_.micro-label]:text-primary-light",
        className,
      )}
    >
      <span className="section-kicker micro-label">{kicker}</span>
      <h2
        className={cn(
          "section-title mt-4 font-display font-bold tracking-tight",
          "text-[clamp(1.65rem,2.2vw+1rem,2.65rem)] leading-[1.12]",
          tone === "default" && "text-navy-deep",
          tone === "onDark" && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "section-desc mt-4 max-w-2xl text-base leading-relaxed sm:text-lg lg:text-[1.0625rem] lg:leading-relaxed",
            tone === "default" && "text-muted-foreground",
            tone === "onDark" && "text-white/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
