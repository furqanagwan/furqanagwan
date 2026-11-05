import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";

const mockToggle = vi.fn();

vi.mock("@/components/layout/SidebarContext", () => ({
  useSidebar: () => ({
    toggle: mockToggle,
    isOpen: true,
    isMobileMenuOpen: false,
  }),
}));

describe("Header", () => {
  it("renders logo and links", () => {
    render(<Header />);
    expect(screen.getByText("furqanagwan")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("handles sidebar toggle click", () => {
    render(<Header />);
    const toggleBtn = screen.getByLabelText("Toggle navigation sidebar");
    fireEvent.click(toggleBtn);
    expect(mockToggle).toHaveBeenCalled();
  });

  it("reports the sidebar's open state on its toggle", () => {
    render(<Header />);
    const toggleBtn = screen.getByLabelText("Toggle navigation sidebar");
    expect(toggleBtn).toHaveAttribute("aria-expanded", "true");
  });
});
