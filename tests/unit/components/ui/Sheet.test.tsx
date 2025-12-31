import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/Sheet";

// Mock Radix Dialog/Sheet if needed. Usually jsdom handles basic portal rendering if we check body.
// But Radix Portal usually renders into document.body.
describe("Sheet", () => {
  it("renders and opens", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
          <p>Sheet Content</p>
        </SheetContent>
      </Sheet>,
    );

    // Initial state: Content not visible
    expect(screen.queryByText("Sheet Content")).not.toBeInTheDocument();

    const trigger = screen.getByText("Open Sheet");
    // Fire click
    trigger.click();

    // After click, content should appear (in portal)
    // We use findByText to wait for async render/portal
    expect(await screen.findByText("Sheet Title")).toBeInTheDocument();
    expect(await screen.findByText("Sheet Content")).toBeInTheDocument();
  });

  it("renders description, footer and close", async () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description text</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    expect(await screen.findByText("Description text")).toBeInTheDocument();
    expect(await screen.findByText("Description text")).toBeInTheDocument();
    // There are multiple "Close" texts (one visible button, one sr-only in X button)
    // Use data-slot to target the specific button we added
    expect(
      document.querySelector('[data-slot="sheet-close"]'),
    ).toHaveTextContent("Close");
  });

  it("renders with different sides", () => {
    // Test a non-default side to cover branch logic
    render(
      <Sheet open={true}>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    // Find content, which has the class
    const title = screen.getByText("Left Sheet");
    // data-slot="sheet-content" uses a portal, but jsdom renders it in body.
    // We can traverse up.
    // Or just look for the class in the document, but that's loose.
    // The sheet content has border-r for left.
    // getByText returns the title h2.
    // We need the parent div with data-slot="sheet-content".
    // Closest works in JSDOM? Yes.
    const content = title.closest('[data-slot="sheet-content"]');
    expect(content).toHaveClass("border-r");

    // Other sides
    render(
      <Sheet open={true}>
        <SheetContent side="top" data-testid="top-sheet">
          <SheetTitle>Top</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByTestId("top-sheet")).toHaveClass("border-b");

    render(
      <Sheet open={true}>
        <SheetContent side="bottom" data-testid="bottom-sheet">
          <SheetTitle>Bottom</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByTestId("bottom-sheet")).toHaveClass("border-t");
  });
});
