import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "@/components/layout/Sidebar";

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
    const homeLink = screen.getByText("Home");
    const nav = homeLink.closest("nav");
    expect(nav).toHaveClass("-translate-x-[200px]");
  });
});
