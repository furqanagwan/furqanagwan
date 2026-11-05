import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { BlogPageContent } from "@/features/blog/components/BlogPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Thoughts, stories, and ideas on career, finance, and life.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogPageContent />;
}
