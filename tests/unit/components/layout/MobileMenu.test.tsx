import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MobileMenu from "@/components/layout/MobileMenu";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

const mockCloseMobileMenu = vi.fn();
const mockUseSidebar = vi.fn();

vi.mock("@/components/layout/SidebarContext", () => ({
  useSidebar: () => mockUseSidebar(),
}));

describe("MobileMenu", () => {
  beforeEach(() => {
    mockUseSidebar.mockReturnValue({
      isMobileMenuOpen: true,
      closeMobileMenu: mockCloseMobileMenu,
    });
  });

  it("renders when open", () => {
    render(<MobileMenu />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("is not inert when open", () => {
    render(<MobileMenu />);
    const container = screen.getByText("Home").closest("div.fixed");
    expect(container).not.toHaveAttribute("inert");
  });

  it("marks section toggles with aria-expanded", () => {
    render(<MobileMenu />);
    expect(screen.getByRole("button", { name: "Work" })).toHaveAttribute("aria-expanded", "false");
  });

  it("calls closeMobileMenu on link click", () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByText("Home"));
    expect(mockCloseMobileMenu).toHaveBeenCalled();
  });

  it("is inert, so its links can't be focused, when isMobileMenuOpen is false", () => {
    mockUseSidebar.mockReturnValue({
      isMobileMenuOpen: false,
      closeMobileMenu: mockCloseMobileMenu,
    });
    render(<MobileMenu />);
    const link = screen.queryByText("Home");
    const container = link?.closest("div.fixed");
    expect(container).toHaveAttribute("inert");
  });
});
