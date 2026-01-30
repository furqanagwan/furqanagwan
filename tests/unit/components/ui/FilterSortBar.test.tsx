import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterSortBar from "@/components/ui/FilterSortBar";

describe("FilterSortBar", () => {
  const categories = [
    { label: "Cat 1", href: "/cat1" },
    { label: "Cat 2", onClick: vi.fn(), active: true },
  ];
  const props = {
    categories,
    onFilterClick: vi.fn(),

    viewMode: "grid" as const,
    onViewModeChange: vi.fn(),
    onSortChange: vi.fn(),
  };

  it("renders categories", () => {
    render(<FilterSortBar {...props} />);
    expect(screen.getByRole("link", { name: "Cat 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cat 2" })).toBeInTheDocument();
  });

  it("handles filter and sort clicks", () => {
    const { container } = render(<FilterSortBar {...props} />);
    fireEvent.click(screen.getByText("Filter"));
    expect(props.onFilterClick).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Sort"));
    expect(screen.getByText("Newest → Oldest")).toBeInTheDocument();

    // Test sort change
    const oldestInput = container.querySelector('input[value="oldest"]');
    if (!oldestInput) throw new Error("Oldest input not found");
    fireEvent.click(oldestInput);
    expect(props.onSortChange).toHaveBeenCalledWith("oldest");
  });

  it("handles sort change to newest", () => {
    const { container } = render(
      <FilterSortBar {...props} activeSort="oldest" />,
    );

    // Open menu
    fireEvent.click(screen.getAllByText("Sort")[0]!);

    // Click newest
    const newestInput = container.querySelector('input[value="newest"]');
    if (!newestInput) throw new Error("Newest input not found");
    fireEvent.click(newestInput);
    expect(props.onSortChange).toHaveBeenCalledWith("newest");
  });

  it("closes sort menu when clicking outside", () => {
    render(<FilterSortBar {...props} />);

    // Open menu
    fireEvent.click(screen.getByText("Sort"));
    expect(screen.getByText("Newest → Oldest")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Newest → Oldest")).not.toBeInTheDocument();
  });

  it("handles view mode change", () => {
    render(<FilterSortBar {...props} />);
    const listRadio = screen.getByDisplayValue("list");
    fireEvent.click(listRadio);
    expect(props.onViewModeChange).toHaveBeenCalledWith("list");
  });

  it("handles grid view mode change", () => {
    render(<FilterSortBar {...props} viewMode="list" />);
    const gridRadio = screen.getByDisplayValue("grid");
    fireEvent.click(gridRadio);
    expect(props.onViewModeChange).toHaveBeenCalledWith("grid");
  });

  it("highlights active category", () => {
    const categoriesMixed = [
      { label: "Active Link", href: "/active", active: true },
      { label: "Inactive Link", href: "/inactive", active: false },
      { label: "Active Btn", onClick: vi.fn(), active: true },
      { label: "Inactive Btn", onClick: vi.fn(), active: false },
    ];
    render(<FilterSortBar {...props} categories={categoriesMixed} />);

    const activeLink = screen.getByRole("link", { name: "Active Link" });
    expect(activeLink).toHaveClass("text-foreground"); // Active style

    const inactiveLink = screen.getByRole("link", { name: "Inactive Link" });
    expect(inactiveLink).toHaveClass("text-black/40"); // Inactive style part (or dark mode equivalent)

    const activeBtn = screen.getByRole("button", { name: "Active Btn" });
    expect(activeBtn).toHaveClass("text-foreground");
  });
});
