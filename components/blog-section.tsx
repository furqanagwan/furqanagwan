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
    </section>
  );
}
