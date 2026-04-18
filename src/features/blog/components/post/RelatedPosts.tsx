import Link from "next/link";
import { type Post } from "content-collections";
import { formatDate } from "../../utils";
import ArticleCard from "../ArticleCard";

interface RelatedPostsProps {
  relatedPosts: Post[];
  category: string;
}

export function RelatedPosts({ relatedPosts, category }: RelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <section className="max-w-[1440px] w-full mx-auto px-6 md:px-8 pt-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-[22px] md:text-[28px] font-medium tracking-[-0.02em]">
          Keep reading
        </h2>
        <Link
          href={`/blog?category=${category.toLowerCase()}`}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {relatedPosts.map((p) => (
          <ArticleCard
            key={p.slug}
            title={p.title}
            category={p.category}
            date={formatDate(p.date)}
            readTime={p.readTime}
            href={`/blog/${p.slug}`}
            imageUrl={p.image}
            slug={p.slug}
            variant={p.image ? "default" : "gradient"}
          />
        ))}
      </div>
    </section>
  );
}
