import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PostListItem from "@/components/ui/PostListItem";

describe("PostListItem", () => {
  const defaultProps = {
    title: "Test Post",
    href: "/post",
    category: "Tech",
    date: "2024-01-01",
  };

  it("renders correctly", () => {
    render(<PostListItem {...defaultProps} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/post");
  });

  it("applies passed className", () => {
    const { container } = render(
      <PostListItem {...defaultProps} className="custom-class" />,
    );
    // Link is the root element
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
