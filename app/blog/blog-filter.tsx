"use client";
import { useState } from "react";
import Link from "next/link";
import type { CompletePost } from "@/types";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Recipes", value: "recipes" },
  { label: "Holiday", value: "holiday" },
  { label: "Reviews", value: "reviews" },
];

function getCategory(post: CompletePost): string {
  if ("macros" in post && post.macros) return "recipes";
  if ("cities" in post && post.cities) return "holiday";
  return "reviews";
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderMeta(post: CompletePost) {
  if ("cities" in post && post.cities && post.cities.length) {
    return <> · 🏙️ {post.cities.join(", ")}</>;
  }
  if (
    "macros" in post &&
    post.macros &&
    "calories" in post &&
    typeof post.calories === "number"
  ) {
    const { protein, carbs, fat } = post.macros;
    return (
      <>
        {" "}
        · 🍽️ {post.calories} cal · {protein}P {carbs}C {fat}F
      </>
    );
  }
  return null;
}

function renderStars(rating?: number) {
  if (typeof rating !== "number") return null;
  const full = "★";
  const half = "½";
  const empty = "☆";
  const stars = [];

  let i = 1;
  for (; i <= Math.floor(rating); i++) stars.push(<span key={i}>{full}</span>);
  if (rating % 1 >= 0.5) {
    stars.push(<span key="half">{half}</span>);
    i++;
  }
  for (; i <= 5; i++) stars.push(<span key={i + 100}>{empty}</span>);
  return (
    <span
      className="ml-2 text-yellow-500 text-base align-middle"
      aria-label={`Rating: ${rating} out of 5`}
      title={`${rating} stars`}
    >
      {stars}
    </span>
  );
}

export default function BlogFilter({ posts }: { posts: CompletePost[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = posts
    .filter((post) => {
      if (category === "all") return true;
      return getCategory(post) === category;
    })
    .filter((post) => {
      const q = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary?.toLowerCase().includes(q)
      );
    });

  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <select
          className="px-2 py-1 rounded border text-sm bg-background"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <input
          className="px-2 py-1 rounded border text-sm ml-2"
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-4">
        {filtered.map((post) => (
          <li key={post.slug}>
            <h3 className="flex items-center">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline text-foreground font-medium text-lg"
              >
                {post.title}
              </Link>
              {getCategory(post) === "reviews" && post.stars !== undefined
                ? renderStars(post.stars)
                : null}
            </h3>
            <p className="text-xs text-muted-foreground mb-1">
              {formatDate(post.date)}
              {post.author && (
                <>
                  {" "}
                  · <strong>{post.author}</strong>
                </>
              )}
              <> · {post.readingTime}</>
              {renderMeta(post)}
            </p>
            {post.summary && (
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {post.summary}
              </p>
            )}
          </li>
        ))}
      </ol>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm mt-8">No posts found.</p>
      )}
    </section>
  );
}
