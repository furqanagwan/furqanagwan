import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Mock next-themes
vi.mock("next-themes", async () => {
  const actual = await vi.importActual("next-themes");
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useTheme: () => ({ setTheme: vi.fn() }),
  };
});

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Child Content</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
