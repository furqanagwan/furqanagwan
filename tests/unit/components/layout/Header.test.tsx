import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";

const mockToggleMobileMenu = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/components/layout/SidebarContext", () => ({
  useSidebar: () => ({
    toggleMobileMenu: mockToggleMobileMenu,
    isMobileMenuOpen: false,
  }),
}));

describe("Header", () => {
  it("renders the wordmark and primary nav", () => {
    render(<Header />);
    expect(screen.getByText("furqanagwan")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Projects" }),
    ).toBeInTheDocument();
  });

  it("renders the primary CTA", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: /get in touch/i }),
    ).toBeInTheDocument();
  });

  it("toggles the mobile menu when the hamburger is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(mockToggleMobileMenu).toHaveBeenCalled();
  });
});
