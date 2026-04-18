"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { allPosts } from "content-collections";

import FilterSortBar from "@/components/ui/FilterSortBar";
import ArticleCard from "./ArticleCard";
import { sortCategories } from "@/lib/categories";

const INITIAL_COUNT = 8;
const LOAD_STEP = 8;

function getCategories() {
  const cats = sortCategories(
    allPosts.map((p) => p.category).filter(Boolean),
  );
  return [
    { label: "All", href: "/blog" },
    ...cats.map((c) => ({
      label: c,
      href: `/blog?category=${c.toLowerCase()}`,
    })),
  ];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const viewParam = searchParams.get("view");

  const categories = useMemo(() => getCategories(), []);

  const activeCategory = useMemo(() => {
    if (!categoryParam) return "All";
    const found = categories.find(
      (c) => c.label.toLowerCase() === categoryParam.toLowerCase(),
    );
    return found ? found.label : "All";
  }, [categoryParam, categories]);

  const [activeSort, setActiveSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    viewParam === "grid" ? "grid" : "list",
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const posts = useMemo(() => {
    let list = [...allPosts];
    if (activeCategory !== "All") {
      list = list.filter(
        (p) =>
          p.category?.toLowerCase() === activeCategory.toLowerCase() ||
          p.tags?.some(
            (t) => t.toLowerCase() === activeCategory.toLowerCase(),
          ),
      );
    }
    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return activeSort === "newest" ? db - da : da - db;
    });
    return list;
  }, [activeCategory, activeSort]);

  React.useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeCategory, activeSort, viewMode]);

  React.useEffect(() => {
    if (viewParam === "grid" || viewParam === "list") {
      setViewMode(viewParam);
    }
  }, [viewParam]);

  const visible = posts.slice(0, visibleCount);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-24">
      {/* Editorial heading */}
      <h1 className="text-[48px] md:text-[80px] font-medium tracking-[-0.03em] leading-[0.95] mb-12 md:mb-16">
        {activeCategory === "All" ? "Blog" : activeCategory}
      </h1>

      {/* Tabs + Filter/Sort/View toggle */}
      <FilterSortBar
        categories={categories.map((c) => ({
          label: c.label,
          href: c.href,
          active:
            c.href === "/blog"
              ? activeCategory === "All"
              : c.href.includes(`category=${activeCategory.toLowerCase()}`),
        }))}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      {/* List view — mirrors the research index */}
      {viewMode === "list" && (
        <ul className="flex flex-col">
          {visible.map((post) => (
            <li
              key={post.slug}
              className="border-t border-border last:border-b"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-8 md:py-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-10 hover:opacity-80 transition-opacity"
              >
                <div className="flex md:flex-col gap-2 md:gap-1 text-sm">
                  <span className="font-medium text-foreground">
                    {post.category}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(post.date)}
                  </span>
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-[22px] md:text-[28px] font-medium tracking-[-0.02em] leading-[1.15] mb-3">
                    {post.title}
                  </h2>
                  <p className="text-base md:text-[17px] leading-[1.5] text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Grid view — gradient/image cards */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {visible.map((post, i) => (
            <div
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <ArticleCard
                title={post.title}
                category={post.category}
                date={formatDate(post.date)}
                href={`/blog/${post.slug}`}
                imageUrl={post.image}
                readTime={post.readTime}
                slug={post.slug}
                variant={post.image ? "default" : "gradient"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {posts.length > visibleCount && (
        <div className="flex justify-center pt-16">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + LOAD_STEP)}
            className="inline-flex items-center h-10 px-5 rounded-full bg-black/5 dark:bg-white/10 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
          >
            Load more
          </button>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          No posts found.
        </div>
      )}
    </div>
  );
}

export function BlogPageContent() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center text-muted-foreground">
          Loading…
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
