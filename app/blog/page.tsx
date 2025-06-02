<<<<<<< HEAD
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
=======
import {
  getMarkdownFiles,
  getPostInformation,
  getSourceSync,
} from "@/utils/file";
import { readingTime } from "reading-time-estimator";
import BlogFilter from "./blog-filter";
import Footer from "@/components/footer";
import type { CompletePost } from "@/types";

export default function BlogPage() {
  const files = getMarkdownFiles();

  const posts: CompletePost[] = files
    .map((filename) => {
      const post = getPostInformation(filename);
      const source = getSourceSync(filename);
      if (!post || !source) return undefined;
      return {
        ...post, // includes path, category, subcategory, etc
        readingTime: readingTime(source, 100).text,
      };
    })
    .filter((post): post is CompletePost => Boolean(post)); // this type guard now matches the type above

  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full">
        <h1 className="font-extrabold text-[clamp(2.5rem,10vw,5rem)] leading-none mb-3 text-foreground">
          Blog
        </h1>
        <p className="text-lg sm:text-2xl text-muted-foreground mb-6">
          Travel, reviews, fashion & real-life experiences
        </p>
      </header>
      <BlogFilter posts={posts} />
      <Footer />
    </div>
  );
}
>>>>>>> origin/migration
