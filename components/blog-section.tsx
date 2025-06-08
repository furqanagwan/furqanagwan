import Link from "next/link";
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
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline text-foreground font-medium text-base block mb-1"
            >
              {post.title}
            </Link>
            <div className="text-neutral-400 text-xs mb-1">
              {formatDate(post.date)} &middot; {post.author}
            </div>
            <p className="text-neutral-500 text-sm line-clamp-3">
              {post.summary}
            </p>
          </li>
        ))}
      </ol>
      <p>
        <Link href="/blog" className="text-foreground hover:underline">
          View all &rarr;
        </Link>
      </p>
    </section>
  );
}
