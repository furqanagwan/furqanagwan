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

    const trigger = screen.getByText("Trigger 1");
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });
});
