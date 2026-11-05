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

    expect(screen.queryByText("Sheet Content")).not.toBeInTheDocument();

    const trigger = screen.getByText("Open Sheet");
    trigger.click();

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
    expect(
      document.querySelector('[data-slot="sheet-close"]'),
    ).toHaveTextContent("Close");
  });

  it("renders with different sides", () => {
    render(
      <Sheet open={true}>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    const title = screen.getByText("Left Sheet");
    const content = title.closest('[data-slot="sheet-content"]');
    expect(content).toHaveClass("border-r");

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
