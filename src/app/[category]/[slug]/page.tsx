// src/app/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";

import { getPost } from "@/lib/github";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/components/mdx/mdx";

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.category, params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description:
      post.excerpt ||
      post.summary ||
      post.content.slice(0, 160).replace(/\n/g, " "),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.summary || post.content.slice(0, 160),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.category, params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>

      {/* Metadata: Date + Reading Time */}
      <p className="text-sm text-muted-foreground">
        {format(new Date(post.date), "MMMM dd, yyyy")} · {post.readTime}
      </p>

      {/* Tags */}
      {post.tags?.length > 0 && (
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
      )}

      {/* MDX Content */}
      <MDXRemote source={post.content} components={mdxComponents} />

      {/* Footer */}
      <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
        <p>
          Enjoyed this post?{" "}
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              `${post.title} by @furqanagwan https://furqanagwan.com/${post.category}/${post.slug}`,
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
