import { notFound } from "next/navigation";
import { allPosts } from "content-collections";
import { getPostBySlug, getRelatedPosts } from "@/features/blog/queries";
import {
  PostHeader,
  PostBody,
  PostFooter,
  RelatedPosts,
} from "@/features/blog/components";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `Furqan Agwan ${post.title}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = getRelatedPosts(slug, post.category);

  return (
    <div className="relative">
      {/* Main Article */}
      <article className="flex flex-col gap-y-8 md:gap-y-12 mt-6 md:mt-10">
        <PostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          category={post.category}
          audio={post.audio}
          image={post.image}
          heroVideo={post.heroVideo}
          ctaButtons={post.ctaButtons}
          headerCodeSnippet={post.headerCodeSnippet}
        />

        <PostBody code={post.mdx} />

        <PostFooter tags={post.tags} />

        <RelatedPosts relatedPosts={relatedPosts} category={post.category} />
      </article>
    </div>
  );
}
