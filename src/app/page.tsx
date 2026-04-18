import Link from "next/link";
import Image from "next/image";
import { allProjects } from "content-collections";
import ArticleCard from "@/features/blog/components/ArticleCard";
import { getFeaturedPost, getRecentPosts } from "@/features/blog/queries";
import { getCategoryGradient } from "@/lib/categories";

export const metadata = {
  title: "Furqan Agwan",
  description:
    "Portfolio and blog of Furqan Agwan, a Cloud & Software Engineer based in the UK.",
};

function formatYear(date: string) {
  return new Date(date.split(" - ")[0]!).getFullYear().toString();
}

export default function Home() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(3);

  const topProjects = allProjects
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.date.split(" - ")[0]!).getTime() -
        new Date(a.date.split(" - ")[0]!).getTime(),
    )
    .slice(0, 2);

  const heroGradient = getCategoryGradient(
    featuredPost?.category ?? "Technology",
    featuredPost?.slug ?? "home-hero",
  );

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 pt-8 md:pt-12 pb-24 space-y-20 md:space-y-28">
      {/* Hero: big gradient card + side stack */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
        {/* Primary hero card — pill title on gradient/image */}
        <Link
          href={featuredPost ? `/blog/${featuredPost.slug}` : "/blog"}
          className="group gradient-card aspect-[4/3] md:aspect-[16/10] p-6 md:p-10 flex items-center justify-center relative overflow-hidden"
          style={
            featuredPost?.image
              ? undefined
              : { background: heroGradient }
          }
          aria-label={
            featuredPost
              ? `Read: ${featuredPost.title}`
              : "Browse the blog"
          }
        >
          {featuredPost?.image && (
            <Image
              src={featuredPost.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
          )}
          <span className="gradient-hero-pill text-[20px] md:text-[32px] max-w-[85%] text-center tracking-[-0.02em]">
            {featuredPost?.title ?? "Furqan Agwan"}
          </span>
        </Link>

        {/* Side stack — two square gradient cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {topProjects.slice(0, 1).map((project) => (
            <Link
              key={project._meta.path}
              href={`/projects/${project.id.split("/").pop()!}`}
              className="group gradient-card aspect-square md:aspect-[5/4] lg:aspect-square p-6 md:p-8 flex items-start transition-transform duration-300 hover:scale-[1.01]"
              style={{
                background: getCategoryGradient(
                  project.category,
                  project.id,
                ),
              }}
            >
              <h3 className="text-white text-[24px] md:text-[28px] font-medium leading-[1.1] tracking-[-0.02em] pr-4">
                {project.title}
              </h3>
            </Link>
          ))}

          {recentPosts[0] && (
            <Link
              href={`/blog/${recentPosts[0].slug}`}
              className="group gradient-card aspect-square md:aspect-[5/4] lg:aspect-square p-6 md:p-8 flex items-start transition-transform duration-300 hover:scale-[1.01]"
              style={{
                background: getCategoryGradient(
                  recentPosts[0].category,
                  recentPosts[0].slug,
                ),
              }}
            >
              <h3 className="text-white text-[24px] md:text-[28px] font-medium leading-[1.1] tracking-[-0.02em] pr-4">
                {recentPosts[0].title}
              </h3>
            </Link>
          )}
        </div>
      </section>

      {/* Intro — editorial */}
      <section className="max-w-3xl">
        <h1 className="text-[44px] md:text-[72px] font-medium tracking-[-0.03em] leading-[0.98] mb-8">
          Documenting my journey in engineering &amp; life.
        </h1>
        <p className="text-[18px] md:text-[20px] text-muted-foreground leading-[1.55] max-w-2xl mb-10">
          I&apos;m Furqan, a software engineer based in the UK. This site is
          where I share projects, writing, and what I&apos;m learning along the
          way.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center h-11 px-6 rounded-full border border-border text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Selected work */}
      {topProjects.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-10 border-b border-border pb-5">
            <h2 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em]">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-12">
            {topProjects.map((project) => (
              <ArticleCard
                key={project._meta.path}
                title={project.title}
                category={project.category}
                date={formatYear(project.date)}
                imageUrl={project.image}
                slug={project.id}
                href={`/projects/${project.id.split("/").pop()!}`}
                variant="featured"
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest writing — editorial list like the research index */}
      <section>
        <div className="flex items-end justify-between mb-10 border-b border-border pb-5">
          <h2 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em]">
            Latest writing
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Read the blog
          </Link>
        </div>

        <ul className="flex flex-col">
          {[featuredPost, ...recentPosts].filter(Boolean).slice(0, 4).map(
            (post) =>
              post && (
                <li
                  key={post.slug}
                  className="border-t border-border last:border-b"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-6 md:py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-10 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex md:flex-col gap-2 md:gap-1 text-sm">
                      <span className="font-medium">{post.category}</span>
                      <span className="text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="max-w-3xl">
                      <h3 className="text-[20px] md:text-[24px] font-medium tracking-[-0.02em] leading-[1.2] mb-2">
                        {post.title}
                      </h3>
                      <p className="text-base leading-[1.5] text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </section>
    </div>
  );
}
