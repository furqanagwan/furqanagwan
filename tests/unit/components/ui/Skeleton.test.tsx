import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "@/components/ui/Skeleton";

describe("Skeleton", () => {
  it("renders correctly", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse", "bg-accent");
  });

  it("applies custom className", () => {
    render(<Skeleton data-testid="skeleton" className="w-10 h-10" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("w-10 h-10");
  });
});
