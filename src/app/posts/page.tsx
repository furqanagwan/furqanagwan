import BlurFade from "@/components/magicui/blur-fade";
import { getAllPosts } from "@/lib/github";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>

      {posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post, id) => (
          <BlurFade
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            key={`${post.category}/${post.slug}`}
          >
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/${post.category}/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight font-semibold">{post.title}</p>

                <div className="text-xs text-muted-foreground flex gap-2">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.readTime && <span>• {post.readTime}</span>}
                </div>

                {post.tags.length > 0 && (
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
                )}
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
