"use client";
import { useState } from "react";
import Link from "next/link";
import type { CompletePost, RecipeType } from "@/types";

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

function getCategory(post: CompletePost): string {
  if (post.category) return post.category;
  if ("macros" in post && post.macros) return "recipes";
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
        {post.type && (
          <>
            {" "}
            · <span className="font-medium">{post.type}</span>
          </>
        )}
      </>
    );
  }
  if (getCategory(post) === "fitness" && post.type) {
    return (
      <>
        {" "}
        · <span className="font-semibold text-blue-700">{post.type}</span>
      </>
    );
  }
  if (getCategory(post) === "reviews" && post.type) {
    return (
      <>
        {" "}
        · <span className="font-semibold text-purple-700">{post.type}</span>
      </>
    );
  }
  return null;
}

function renderReviewMeta(post: CompletePost) {
  if (getCategory(post) !== "reviews") return null;

  if (post.reviewedOn === "PC" && post.distribution) {
    return (
      <>
        {" "}
        · <span className="font-medium">PC ({post.distribution})</span>
        {post.stars !== undefined && renderStars(post.stars)}
      </>
    );
  }

  if (post.reviewedOn === "Console" && post.console && post.distribution) {
    return (
      <>
        {" "}
        ·{" "}
        <span className="font-medium">
          {post.console} ({post.distribution})
        </span>
        {post.stars !== undefined && renderStars(post.stars)}
      </>
    );
  }

  if (post.stars !== undefined) {
    return renderStars(post.stars);
  }

  return null;
}

function renderDiet(diet?: string[]) {
  if (!diet || diet.length === 0) return null;
  if (diet.includes("Vegan"))
    return <span className="ml-2 text-green-600 font-semibold">🌱 Vegan</span>;
  if (diet.includes("Vegetarian"))
    return (
      <span className="ml-2 text-orange-500 font-semibold">🥕 Vegetarian</span>
    );
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
  const [type, setType] = useState<RecipeType | "all">("all");
  const [reviewType, setReviewType] = useState<
    "all" | "Movie" | "Game" | "Music"
  >("all");
  const [query, setQuery] = useState("");

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

  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <select
          className="px-2 py-1 rounded border text-sm bg-background"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setType("all");
            setReviewType("all");
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {category === "recipes" && (
          <div className="flex items-center gap-2">
            {RECIPE_TYPES.map((t) => (
              <label
                key={t.value}
                className={`px-2 py-1 rounded border text-sm cursor-pointer transition-all
                  ${
                    type === t.value
                      ? "bg-blue-100 border-blue-400 font-semibold text-blue-700"
                      : "bg-background border"
                  }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="recipe-type"
                  value={t.value}
                  checked={type === t.value}
                  onChange={() => setType(t.value as RecipeType | "all")}
                />
                {t.label}
              </label>
            ))}
          </div>
        )}
        {category === "reviews" && (
          <div className="flex items-center gap-2">
            {REVIEW_TYPES.map((t) => (
              <label
                key={t.value}
                className={`px-2 py-1 rounded border text-sm cursor-pointer transition-all
                  ${
                    reviewType === t.value
                      ? "bg-purple-100 border-purple-400 font-semibold text-purple-700"
                      : "bg-background border"
                  }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="review-type"
                  value={t.value}
                  checked={reviewType === t.value}
                  onChange={() => setReviewType(t.value as any)}
                />
                {t.label}
              </label>
            ))}
          </div>
        )}
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
              {renderReviewMeta(post)}
              {renderDiet(post.diet)}
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
