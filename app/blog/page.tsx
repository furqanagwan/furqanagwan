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
