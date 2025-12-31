import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArticleGrid from "@/components/ui/ArticleGrid";

describe("ArticleGrid", () => {
  it("renders children in grid mode by default", () => {
    render(
      <ArticleGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </ArticleGrid>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    // Check for grid class
    // The container is the first div
    // We can assume first child of render result or getByText("Item 1").parentElement
    const grid = screen.getByText("Item 1").parentElement;
    expect(grid).toHaveClass("grid");
  });

  it("renders in list mode", () => {
    render(
      <ArticleGrid viewMode="list">
        <div>Item 1</div>
      </ArticleGrid>,
    );
    const list = screen.getByText("Item 1").parentElement;
    expect(list).toHaveClass("flex flex-col");
  });
});
