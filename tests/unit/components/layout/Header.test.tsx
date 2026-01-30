import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";

// Mock dependencies
const mockToggle = vi.fn();
const mockToggleMobileMenu = vi.fn();

vi.mock("@/components/layout/SidebarContext", () => ({
  useSidebar: () => ({
    toggle: mockToggle,
    toggleMobileMenu: mockToggleMobileMenu,
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

  it("handles mobile menu toggle click", () => {
    render(<Header />);
    const mobileToggle = screen.getByLabelText("Toggle mobile menu");
    fireEvent.click(mobileToggle);
    expect(mockToggleMobileMenu).toHaveBeenCalled();
  });
});
