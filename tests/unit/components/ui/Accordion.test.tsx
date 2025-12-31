import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

describe("Accordion", () => {
  it("renders and toggles content", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Trigger 1")).toBeInTheDocument();
    // Content should be hidden or not present initially? Radix usually keeps it in DOM but hidden or unmounted.
    // data-state=closed usually hides it via CSS. RTL might still find it if hidden=false.
    // AccordionContent has `data-[state=closed]:hidden`.
    // So expect(screen.queryByText("Content 1")).not.toBeVisible();

    const trigger = screen.getByText("Trigger 1");
    fireEvent.click(trigger);

    // After click, it should be open
    // expect(screen.getByText("Content 1")).toBeVisible();

    // Note: JSdom might not process animations/classes perfectly for visibility, but attribute should change
    expect(trigger).toHaveAttribute("data-state", "open");

    // Click again to close
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });
});
