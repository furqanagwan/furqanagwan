import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "@/components/ui/Separator";

describe("Separator", () => {
  it("renders horizontal separator by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
    expect(separator).toHaveClass("data-[orientation=horizontal]:h-px");
    expect(separator).toHaveClass("data-[orientation=horizontal]:w-full");
  });

  it("renders vertical separator", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator).toHaveClass("data-[orientation=vertical]:h-full");
    expect(separator).toHaveClass("data-[orientation=vertical]:w-px");
  });

  it("applies custom className", () => {
    render(<Separator data-testid="separator" className="bg-red-500" />);
    expect(screen.getByTestId("separator")).toHaveClass("bg-red-500");
  });
});
