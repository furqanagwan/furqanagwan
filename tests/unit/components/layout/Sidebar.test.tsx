import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "@/components/layout/Sidebar";

// Mock dependencies
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

const mockUseSidebar = vi.fn();
vi.mock("@/components/layout/SidebarContext", () => ({
  useSidebar: () => mockUseSidebar(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    mockUseSidebar.mockReturnValue({ isOpen: true });
  });

  it("renders navigation items", () => {
    render(<Sidebar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("hides when isOpen is false", () => {
    mockUseSidebar.mockReturnValue({ isOpen: false });
    render(<Sidebar />);
    // logic adds -translate-x-[200px] class
    // We can't easily check class without querying by specific selector.
    // The nav element has the class.
    // Let's rely on visual testing e2e for this, or check class presence.
    // Since we don't have a good role specific to sidebar container (nav is generic), let's find by text parent's parent..
    // Or add data-testid to Sidebar for easier testing in the future.
    // For now, check that content is likely hidden or has the class.
    // Actually, checking "Home" link.
    const homeLink = screen.getByText("Home");
    // traverse up to nav
    const nav = homeLink.closest("nav");
    expect(nav).toHaveClass("-translate-x-[200px]");
  });
});
