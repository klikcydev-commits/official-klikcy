"use client";

import { CheckCircle2 } from "lucide-react";
import { technologyCapabilities } from "@/content/home";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { TechnologyOrbit } from "@/components/home/TechnologyOrbit";

export function HomeTechnologySection() {
  return (
    <PageSection variant="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 14% 18%, rgba(77,210,201,0.18), transparent 30%), radial-gradient(circle at 88% 12%, rgba(30,136,229,0.10), transparent 28%)",
        }}
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionIntro
            kicker="Technology"
            title={<>Built on modern tools, selected for scale and reliability.</>}
            description="We work with technologies that support serious growth: flexible frontends, conversion-ready CMS builds, strong design tooling, and infrastructure that can keep up."
            align="left"
            className="mb-8"
          />

          <div className="space-y-4">
            {technologyCapabilities.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-[var(--radius-lg)] border border-border/70 bg-[hsl(var(--card))/0.84] p-4 shadow-card backdrop-blur-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-display text-[length:var(--type-body)] font-bold text-navy-deep dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-border/70 bg-[hsl(var(--card))/0.84] p-6 shadow-[0_26px_60px_rgba(13,66,63,0.08)] backdrop-blur-md sm:p-8 lg:min-h-[34rem]">
          <div className="mb-5">
            <p className="text-[length:var(--type-label)] font-semibold uppercase tracking-[0.24em] text-primary">
              Capability map
            </p>
            <p className="mt-2 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">
              Frameworks, platforms, design tools, infrastructure, and automation layers.
            </p>
          </div>
          <TechnologyOrbit />
        </div>
      </div>
    </PageSection>
  );
}
