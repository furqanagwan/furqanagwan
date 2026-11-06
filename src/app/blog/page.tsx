import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { BlogPageContent } from "@/features/blog/components/BlogPageContent";
import { parseBlogSearchParams } from "@/features/blog/utils";
import type { BlogSearchParams } from "@/features/blog/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Thoughts, stories, and ideas on career, finance, and life.",
  path: "/blog",
});

type BlogPageProps = {
  searchParams: Promise<BlogSearchParams>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, view } = parseBlogSearchParams(await searchParams);
  return <BlogPageContent categoryParam={category} viewParam={view} />;
}
