import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryPill from "@/components/ui/CategoryPill";

describe("CategoryPill", () => {
  it("renders label correctly", () => {
    render(<CategoryPill label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies active styles", () => {
    render(<CategoryPill label="Active" active />);
    const pill = screen.getByText("Active");
    expect(pill).toHaveClass("text-[var(--foreground)]");
  });

  it("applies inactive styles", () => {
    render(<CategoryPill label="Inactive" active={false} />);
    const pill = screen.getByText("Inactive");
    expect(pill).toHaveClass("text-[var(--muted)]");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<CategoryPill label="Clickable" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles click without handler safely", () => {
    render(<CategoryPill label="No Handler" />);
    // Should not throw
    fireEvent.click(screen.getByText("No Handler"));
    expect(screen.getByText("No Handler")).toBeInTheDocument();
  });
});
