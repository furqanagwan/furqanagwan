"use client";
import Link from "next/link";

import type { CompletePost } from "@/types";
import DietBadge from "./ui/diet-badge";
import StarRating from "./ui/star-rating";

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
  if (post.category === "fitness" && post.type) {
    return (
      <>
        {" "}
        · <span className="font-semibold text-blue-700">{post.type}</span>
      </>
    );
  }
  if (post.category === "reviews" && post.type) {
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
  if (post.category !== "reviews") return null;

  if (post.reviewedOn === "PC" && post.distribution) {
    return (
      <>
        {" "}
        · <span className="font-medium">PC ({post.distribution})</span>
        {post.stars !== undefined && <StarRating rating={post.stars} />}
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
        {post.stars !== undefined && <StarRating rating={post.stars} />}
      </>
    );
  }

  if (post.stars !== undefined) {
    return <StarRating rating={post.stars} />;
  }

  return null;
}

export default function BlogPostList({ posts }: { posts: CompletePost[] }) {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-4">
      {posts.map((post) => (
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
            <DietBadge diet={post.diet} />
          </p>
          {post.summary && (
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {post.summary}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
