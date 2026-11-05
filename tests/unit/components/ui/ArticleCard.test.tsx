import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArticleCard from "@/features/blog/components/ArticleCard";

describe("ArticleCard", () => {
  const defaultProps = {
    title: "Test Article",
    category: "Tech",
    date: "2024-01-01",
    href: "/article",
  };

  it("renders with default props", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Test Article/ })).toHaveAttribute(
      "href",
      "/article",
    );
  });

  it("renders with image", () => {
    render(<ArticleCard {...defaultProps} imageUrl="/test.png" />);
    const img = screen.getByRole("img", { name: "Test Article" });
    expect(img).toBeInTheDocument();
  });

  it("renders as featured variant", () => {
    render(<ArticleCard {...defaultProps} variant="featured" />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });
});
