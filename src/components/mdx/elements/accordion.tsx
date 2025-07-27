"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  items: {
    title: string;
    content: React.ReactNode;
    value?: string;
  }[];
  type?: "single" | "multiple";
  collapsible?: boolean;
}

export function MDXAccordion({
  items,
  type = "single",
  collapsible = true,
}: Props) {
  return (
    <Accordion type={type} collapsible={collapsible}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.value ?? idx}
          value={item.value ?? `item-${idx}`}
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
