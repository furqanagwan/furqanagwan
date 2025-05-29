import { ScrambleText } from "../../components/scramble-text";
import { PostsList } from "../../components/posts-list";
import { getAllPosts } from "../../lib/blog";
import { Metadata } from "next";

const posts = getAllPosts().sort(
  (a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
);

export default function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="blog" />
      </h1>
      <PostsList posts={posts} />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "",
  openGraph: {
    images: [
      {
        url: "https://furqanagwan.com",
      },
    ],
  },
};
