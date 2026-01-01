import { describe, it, expect, vi } from "vitest";
import { formatDate } from "./utils";
import { getSortedPosts, getRelatedPosts } from "./queries";

// Mock the content-collections module
vi.mock("content-collections", () => ({
  allPosts: [
    {
      _meta: { path: "post-1" },
      slug: "post-1",
      title: "First Post",
      date: "2024-01-15",
      category: "Tech",
      image: "/img1.jpg",
    },
    {
      _meta: { path: "post-2" },
      slug: "post-2",
      title: "Second Post",
      date: "2024-06-01",
      category: "Tech",
      image: "/img2.jpg",
    },
    {
      _meta: { path: "post-3" },
      slug: "post-3",
      title: "Third Post",
      date: "2023-12-01",
      category: "Life",
      image: "/img3.jpg",
    },
  ],
}));

describe("formatDate", () => {
  it("formats date string to long format", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("January 15, 2024");
  });

  it("formats another date correctly", () => {
    const result = formatDate("2023-12-25");
    expect(result).toBe("December 25, 2023");
  });
});

describe("getSortedPosts", () => {
  it("returns posts sorted by date (newest first)", () => {
    const sorted = getSortedPosts();
    expect(sorted[0].slug).toBe("post-2"); // June 2024
    expect(sorted[1].slug).toBe("post-1"); // Jan 2024
    expect(sorted[2].slug).toBe("post-3"); // Dec 2023
  });
});

describe("getRelatedPosts", () => {
  it("returns posts in same category excluding current", () => {
    const related = getRelatedPosts("post-1", "Tech");
    expect(related).toHaveLength(1);
    expect(related[0].slug).toBe("post-2");
  });

  it("handles array of slugs to exclude", () => {
    const related = getRelatedPosts(["post-1", "post-2"], "Tech");
    expect(related).toHaveLength(0);
  });

  it("returns empty array when no related posts", () => {
    const related = getRelatedPosts("post-3", "Life");
    expect(related).toHaveLength(0);
  });

  it("respects limit parameter", () => {
    const related = getRelatedPosts("post-3", "Tech", 1);
    expect(related).toHaveLength(1);
  });
});
