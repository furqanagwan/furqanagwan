// src/app/posts/page.tsx
import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>

      {sortedPosts.map((post, id) => (
        <BlurFade
          delay={BLUR_FADE_DELAY * 2 + id * 0.05}
          key={`${post.category}/${post.slug}`}
        >
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/posts/${post.category}/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="tracking-tight font-semibold">{post.title}</p>
              <div className="text-xs text-muted-foreground flex gap-2">
                <span>
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
                {post.readTime ? <span>• {post.readTime}</span> : null}
              </div>
              {post.tags?.length ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        </BlurFade>
      ))}
    </section>
  );
}
