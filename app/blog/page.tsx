import {
  getMarkdownFiles,
  getPostInformation,
  getSource, // use async
} from "@/utils/file";
import { readingTime } from "reading-time-estimator";
import BlogFilter from "../../components/blog-filter";
import Footer from "@/components/footer";
import type { CompletePost } from "@/types";

export default async function BlogPage() {
  // now async
  const files = await getMarkdownFiles();

  // Gather all post info and content (async!)
  const postsArr = await Promise.all(
    files.map(async (filename) => {
      const post = await getPostInformation(filename);
      const source = await getSource(filename);
      if (!post || !source) return undefined;
      return {
        ...post,
        readingTime: readingTime(source, 100).text,
      };
    }),
  );

  // Filter out any undefined posts
  const posts: CompletePost[] = postsArr.filter((post): post is CompletePost =>
    Boolean(post),
  );

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
