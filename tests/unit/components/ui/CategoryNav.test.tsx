import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CategoryNav from "@/components/ui/CategoryNav";

describe("CategoryNav", () => {
  const categories = [
    { label: "Cat 1", href: "/cat1" },
    { label: "Cat 2", href: "/cat2" },
  ];

  it("renders category links", () => {
    render(<CategoryNav categories={categories} />);
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
    expect(screen.getByText("Cat 2")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cat 1" })).toHaveAttribute(
      "href",
      "/cat1",
    );
  });

  it("renders static tool buttons", () => {
    render(<CategoryNav categories={categories} />);
    // Filter, Sort are hardcoded buttons in the component
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });
});
