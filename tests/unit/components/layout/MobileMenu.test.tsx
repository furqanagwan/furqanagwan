import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MobileMenu from "@/components/layout/MobileMenu";

// Mock dependencies
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

  it("calls closeMobileMenu on link click", () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByText("Home"));
    expect(mockCloseMobileMenu).toHaveBeenCalled();
  });

  it("is hidden when isMobileMenuOpen is false", () => {
    mockUseSidebar.mockReturnValue({
      isMobileMenuOpen: false,
      closeMobileMenu: mockCloseMobileMenu,
    });
    render(<MobileMenu />);
    // It uses opacity-0 and pointer-events-none class
    // We can check one of the container elements
    const link = screen.queryByText("Home");
    // It renders in DOM but hidden
    const container = link?.closest("div.fixed.inset-0");
    expect(container).toHaveClass("opacity-0");
  });
});
