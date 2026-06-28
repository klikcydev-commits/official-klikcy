"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";

export interface HomeFaqItem {
  q: string;
  a: string;
}

interface HomeFaqSectionProps {
  items: HomeFaqItem[];
}

export function HomeFaqSection({ items }: HomeFaqSectionProps) {
  return (
    <PageSection variant="muted" id="faq">
      <SectionIntro
        align="center"
        kicker="Questions"
        title={<>Straight answers before you reach out.</>}
        description="Everything you need to qualify Klikcy as your growth partner — scope, geography, and how we work with teams like yours."
      />
      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card px-2 shadow-card sm:px-4">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-border px-2 sm:px-3">
            <AccordionTrigger className="py-5 text-left text-[0.95rem] font-semibold leading-snug text-navy-deep hover:no-underline sm:text-base">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageSection>
  );
}
