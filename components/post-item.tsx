import Link from "next/link";
import type { MDXFileData } from "../lib/blog";

type PostItemProps = {
  post: MDXFileData;
  isSelected?: boolean;
};

function getTag(post: MDXFileData): string {
  if (post.type === "reviews") {
    return post.subType ? `REVIEW: ${post.subType.toUpperCase()}` : "REVIEW";
  }
  return post.type ? post.type.toUpperCase() : "";
}

export function PostItem({ post, isSelected }: PostItemProps) {
  const tag = getTag(post);

  const formattedDate = new Date(post.metadata.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  // Recipe info
  const calories = post.metadata.calories;
  const macros = post.metadata.macros || {};
  const { protein, carbs, fat } = macros;

  const showMacros =
    post.type === "recipes" &&
    [protein, carbs, fat].every((v) => typeof v === "number") &&
    typeof calories === "number";

  // Cities for holidays
  const cities = Array.isArray(post.metadata.cities)
    ? post.metadata.cities
    : [];
  const showCities = post.type === "holidays" && cities.length > 0;

  const readTime = post.metadata.readTime;

  // Badge blocks
  const badges: React.ReactNode[] = [];
  if (tag) {
    badges.push(
      <span
        key="tag"
        className="bg-gray-200 dark:bg-[#232935] text-xs text-gray-900 dark:text-gray-200 font-mono px-3 py-1 rounded select-none tracking-wider"
      >
        {tag}
      </span>,
    );
  }
  if (post.type === "recipes" && typeof calories === "number") {
    badges.push(
      <span
        key="calories"
        className="bg-gray-100 dark:bg-[#232935] text-xs text-gray-900 dark:text-gray-200 font-mono px-2 py-1 rounded select-none"
      >
        {calories} kcal
      </span>,
    );
  }
  if (showMacros) {
    badges.push(
      <span
        key="macros"
        className="text-xs text-gray-700 dark:text-gray-400 font-mono"
      >
        Protein: <span className="font-semibold">{protein}g</span>
        &nbsp;Carbs: <span className="font-semibold">{carbs}g</span>
        &nbsp;Fat: <span className="font-semibold">{fat}g</span>
      </span>,
    );
  }
  if (showCities) {
    badges.push(
      <span
        key="cities"
        className="bg-blue-100 dark:bg-blue-900 text-xs text-blue-900 dark:text-blue-200 font-mono px-2 py-1 rounded select-none"
      >
        {cities.join(", ")}
      </span>,
    );
  }

  return (
    <div
      className={`mb-8 ${isSelected ? "bg-gray-200 dark:bg-gray-800 rounded" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Link
          href={post.url}
          className="font-bold text-lg md:text-xl text-black dark:text-white"
        >
          {post.metadata.title}
        </Link>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {formattedDate}
          {readTime && (
            <>
              {" • "}
              {readTime} min read
            </>
          )}
        </span>
      </div>
      {badges.length > 0 && (
        <div className="mt-2 mb-1 w-full flex flex-col items-start gap-1">
          {badges}
        </div>
      )}
      <p className="text-gray-800 dark:text-gray-200 font-mono text-sm mt-1">
        {post.metadata.description}
      </p>
    </div>
  );
}
