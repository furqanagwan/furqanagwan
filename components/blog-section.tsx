import Link from "next/link";
<<<<<<< HEAD
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "../lib/blog";

// Get the 4 latest posts, sorted by date (descending)
const posts = getAllPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  )
  .slice(0, 4);

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-black dark:text-white">
        <span className="text-accent mr-2">*</span>blog
      </h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex justify-between items-center group"
          >
            <Link
              href={`/${post.slug}`}
              className="text-gray-800 dark:text-gray-200 hover:text-accent transition-colors duration-200"
            >
              {post.metadata.title.toLowerCase()}
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(post.metadata.date)}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
      >
        all posts{" "}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
=======
import { getMarkdownFiles, getPostInformation } from "@/utils/file";
import type { CompletePost } from "@/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const files = getMarkdownFiles();
  const posts = files
    .map(getPostInformation)
    .filter((post): post is CompletePost => !!post)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <h2 className="pt-2 border-t-2 border-neutral-900 dark:border-neutral-300 font-semibold text-sm leading-tight w-fit mb-2">
        Blog
      </h2>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 mb-4">
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <h3>
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline text-foreground font-medium"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-neutral-400 text-xs">
              {formatDate(post.date)} · {post.author}
            </p>
            <p className="text-neutral-500 text-sm">{post.summary}</p>
          </li>
        ))}
      </ol>
      <p>
        <Link href="/blog" className="text-foreground hover:underline">
          View all →
        </Link>
      </p>
>>>>>>> origin/migration
    </section>
  );
}
