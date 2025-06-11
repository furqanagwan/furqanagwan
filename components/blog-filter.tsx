"use client";
import { useEffect, useState } from "react";
import type { CompletePost, RecipeType } from "@/types";
import BlogPostList from "./blog-post-list";
import FilterBar from "./filter-bar";
import Pagination from "./pagination";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Fitness", value: "fitness" },
  { label: "Holiday", value: "holiday" },
  { label: "Recipes", value: "recipes" },
  { label: "Reviews", value: "reviews" },
];

const RECIPE_TYPES: { label: string; value: RecipeType | "all" }[] = [
  { label: "All Types", value: "all" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
  { label: "Dessert", value: "Dessert" },
  { label: "Snack", value: "Snack" },
];

const REVIEW_TYPES = [
  { label: "All Types", value: "all" },
  { label: "Movies", value: "Movie" },
  { label: "Games", value: "Game" },
  { label: "Music", value: "Music" },
];

function usePostsPerPage() {
  const [postsPerPage, setPostsPerPage] = useState(6);
  useEffect(() => {
    function updatePostsPerPage() {
      if (window.innerWidth >= 1024) setPostsPerPage(10);
      else if (window.innerWidth >= 640) setPostsPerPage(8);
      else setPostsPerPage(6);
    }
    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);
    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);
  return postsPerPage;
}

function getCategory(post: CompletePost): string {
  if (post.category) return post.category;
  if ("macros" in post && post.macros) return "recipes";
  return "reviews";
}

export default function BlogFilter({ posts }: { posts: CompletePost[] }) {
  const postsPerPage = usePostsPerPage();
  const [category, setCategory] = useState("all");
  const [type, setType] = useState<RecipeType | "all">("all");
  const [reviewType, setReviewType] = useState<
    "all" | "Movie" | "Game" | "Music"
  >("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filtered = sortedPosts
    .filter((post) => {
      if (category === "all") return true;
      return getCategory(post) === category;
    })
    .filter((post) => {
      if (category !== "recipes" || type === "all") return true;
      return post.type === type;
    })
    .filter((post) => {
      if (category !== "reviews" || reviewType === "all") return true;
      return post.type === reviewType;
    })
    .filter((post) => {
      const q = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary?.toLowerCase().includes(q)
      );
    });

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const paginatedPosts = filtered.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setType("all");
    setReviewType("all");
    setPage(1);
  };
  const handleTypeChange = (val: RecipeType | "all") => {
    setType(val);
    setPage(1);
  };
  const handleReviewTypeChange = (val: "all" | "Movie" | "Game" | "Music") => {
    setReviewType(val);
    setPage(1);
  };
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <FilterBar
        category={category}
        type={type}
        reviewType={reviewType}
        query={query}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onReviewTypeChange={handleReviewTypeChange}
        onQueryChange={handleQueryChange}
        CATEGORIES={CATEGORIES}
        RECIPE_TYPES={RECIPE_TYPES}
        REVIEW_TYPES={REVIEW_TYPES}
      />
      <BlogPostList posts={paginatedPosts} />
      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm mt-8">No posts found.</p>
      )}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}
