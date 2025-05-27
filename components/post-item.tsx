import Link from "next/link";
import type { MDXFileData } from "../lib/blog";

type PostItemProps = {
  post: MDXFileData;
  isSelected?: boolean;
};

export function PostItem({ post, isSelected }: PostItemProps) {
  // Tag display logic
  let tag = "";
  if (post.type === "reviews") {
    tag = post.subType ? `REVIEW: ${post.subType.toUpperCase()}` : "REVIEW";
  } else if (post.type) {
    tag = post.type.toUpperCase();
  }

  // Date format: "May 25, 2024"
  const formattedDate = new Date(post.metadata.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className={`mb-8 ${isSelected ? "bg-gray-200 dark:bg-gray-800 rounded" : ""}`}>
      <div className="flex items-center justify-between">
        <Link
          href={post.url}
          className="font-bold text-lg md:text-xl text-black dark:text-white"
        >
          {post.metadata.title}
        </Link>
        <span className="text-xs text-gray-600 dark:text-gray-400">{formattedDate}</span>
      </div>
      {tag && (
        <div className="mt-2 mb-1 w-full">
          <span className="bg-gray-200 dark:bg-[#232935] text-xs text-gray-900 dark:text-gray-200 font-mono px-3 py-1 rounded select-none tracking-wider">
            {tag}
          </span>
        </div>
      )}
      <p className="text-gray-800 dark:text-gray-200 font-mono text-sm mt-1">
        {post.metadata.description}
      </p>
    </div>
  );
}
