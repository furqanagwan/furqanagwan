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
    mockCloseMobileMenu.mockReset();
    mockUseSidebar.mockReturnValue({
      isMobileMenuOpen: true,
      closeMobileMenu: mockCloseMobileMenu,
    });
  });

  it("renders the top-level routes when open", () => {
    render(<MobileMenu />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("closes when a link is clicked", () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByText("Blog"));
    expect(mockCloseMobileMenu).toHaveBeenCalled();
  });

  it("is hidden when isMobileMenuOpen is false", () => {
    mockUseSidebar.mockReturnValue({
      isMobileMenuOpen: false,
      closeMobileMenu: mockCloseMobileMenu,
    });
    const { container } = render(<MobileMenu />);
    const root = container.querySelector("div.fixed");
    expect(root).toHaveAttribute("aria-hidden", "true");
  });
});
