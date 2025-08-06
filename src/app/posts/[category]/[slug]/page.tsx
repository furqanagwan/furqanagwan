import { notFound } from "next/navigation";
import { format } from "date-fns";
import { allPosts } from "content-collections";
import { MdxRenderer } from "@/components/mdx/mdxrenderer";

interface BlogPostPageProps {
  params: { category: string; slug: string };
}

// Optional SSG if you want:
// export async function generateStaticParams() {
//   return allPosts.map((p) => ({ category: p.category, slug: p.slug }));
// }

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = allPosts.find(
    (p) => p.category === params.category && p.slug === params.slug,
  );
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>

      <p className="text-sm text-muted-foreground">
        {format(new Date(post.date), "MMMM dd, yyyy")}
        {post.readTime ? ` · ${post.readTime}` : ""}
      </p>

      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {/* Render MDX on the client so custom components (Lead, Separator, etc.) work */}
      <MdxRenderer code={post.mdxCode} />

      <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
        <p>
          Enjoyed this post?{" "}
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              `${post.title} by @furqanagwan https://furqanagwan.com/posts/${post.category}/${post.slug}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Share it on X
          </a>
          .
        </p>
      </div>
    </article>
  );
}
