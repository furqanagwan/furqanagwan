import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FeaturedHero from "@/components/ui/FeaturedHero";
import type { Post } from "content-collections";

describe("FeaturedHero", () => {
  // Create mock posts with proper typing
  const posts: Partial<Post>[] = [
    {
      title: "Main Post",
      slug: "main-post",
      category: "Tech",
      date: "2024-01-01",
      description: "Desc",
      tags: [],
      featured: true,
      _meta: {
        filePath: "content/posts/main.mdx",
        path: "posts/main",
        fileName: "main.mdx",
        directory: "posts",
        extension: "mdx",
      },
    },
    {
      title: "Secondary Post 1",
      slug: "sec-1",
      category: "News",
      date: "2024-01-02",
      description: "Desc",
      tags: [],
      _meta: {
        filePath: "content/posts/sec1.mdx",
        path: "posts/sec1",
        fileName: "sec1.mdx",
        directory: "posts",
        extension: "mdx",
      },
    },
  ];

  it("renders nothing if no posts", () => {
    const { container } = render(<FeaturedHero posts={[] as Post[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders main post and secondary posts", () => {
    render(<FeaturedHero posts={posts as Post[]} />);

    // Main post check
    expect(screen.getByText("Main Post")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Main Post/ })).toHaveAttribute(
      "href",
      "/blog/main-post",
    );

    // Secondary post check
    expect(screen.getByText("Secondary Post 1")).toBeInTheDocument();
  });
});
