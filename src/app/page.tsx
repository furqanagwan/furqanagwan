import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allProjects } from "content-collections";
import ArticleCard from "@/features/blog/components/ArticleCard";
import { Button } from "@/components/ui/Button";
import { getFeaturedPost, getRecentPosts } from "@/features/blog/queries";
import { siteAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: { absolute: "Furqan Agwan" },
  description:
    "Portfolio and blog of Furqan Agwan, a Cloud & Software Engineer based in the UK.",
  alternates: siteAlternates("/"),
};

export default function Home() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(3);

  const sortedFeaturedMdx = allProjects
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.date.split(" - ")[0]!).getTime() -
        new Date(a.date.split(" - ")[0]!).getTime(),
    )
    .slice(0, 2);

  return (
    <div className="max-w-full mx-auto px-6 md:max-w-[1440px] md:px-8 py-12 md:py-20 space-y-24">
      <section className="max-w-4xl">
        <h1 className="text-page-title md:text-7xl font-bold tracking-tight mb-8 heading-display">
          Documenting my journey in engineering & life.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
          I&apos;m Furqan, a software engineer and curious mind based in the UK.
          This site is my digital garden—a place where I share my projects,
          writings, and the things I&apos;m learning along the way.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild className="rounded-full px-8">
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full px-8"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {sortedFeaturedMdx.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Selected Work
            </h2>
            <Link
              href="/projects"
              className="group flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              View all projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {sortedFeaturedMdx.map((project) => (
              <ArticleCard
                key={project._meta.path}
                title={project.title}
                category={project.category}
                date={new Date(project.date.split(" - ")[0]!)
                  .getFullYear()
                  .toString()}
                imageUrl={project.image}
                href={`/projects/${project.id.split("/").pop()!}`}
                variant="featured"
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Latest Writing
          </h2>
          <Link
            href="/blog"
            className="group flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            Read the blog
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {featuredPost && (
            <div className="md:col-span-2">
              <ArticleCard
                title={featuredPost.title}
                category={featuredPost.category}
                date={featuredPost.date}
                imageUrl={featuredPost.image}
                href={`/blog/${featuredPost.slug}`}
                variant="featured"
              />
            </div>
          )}

          {recentPosts.map((post) => (
            <ArticleCard
              key={post._meta.path}
              title={post.title}
              category={post.category}
              date={post.date}
              imageUrl={post.image}
              href={`/blog/${post.slug}`}
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
