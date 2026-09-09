"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/Motion";

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Stagger>
      <Accordion.Root
        type="single"
        collapsible
        className="divide-y divide-mono-20 border-y border-mono-20"
      >
        {items.map((item, i) => (
          <StaggerItem key={item.q}>
            <Accordion.Item value={`item-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left">
                  <span className="pr-4 font-display text-lg font-semibold text-mono-90 md:text-xl">
                    {item.q}
                  </span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-mono-45 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-3xl pb-5 text-[15px] leading-relaxed text-mono-70 md:text-base">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </StaggerItem>
        ))}
      </Accordion.Root>
    </Stagger>
  );
}
