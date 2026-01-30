import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";

// Test component to consume context
function TestComponent() {
  const { isOpen, toggle, isMobileMenuOpen, toggleMobileMenu } = useSidebar();
  return (
    <div>
      <div data-testid="is-open">{isOpen.toString()}</div>
      <div data-testid="is-mobile-open">{isMobileMenuOpen.toString()}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={toggleMobileMenu}>Toggle Mobile</button>
    </div>
  );
}

describe("SidebarContext", () => {
  it("provides default values", () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("is-open")).toHaveTextContent("true");
    expect(screen.getByTestId("is-mobile-open")).toHaveTextContent("false");
  });

  it("toggles values", () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );

    act(() => {
      screen.getByText("Toggle").click();
    });
    expect(screen.getByTestId("is-open")).toHaveTextContent("false");

    act(() => {
      screen.getByText("Toggle Mobile").click();
    });
    expect(screen.getByTestId("is-mobile-open")).toHaveTextContent("true");
  });
});
