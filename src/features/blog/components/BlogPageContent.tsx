"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { allPosts } from "content-collections";

import FilterSortBar from "@/components/ui/FilterSortBar";
import PostListItem from "@/components/ui/PostListItem";
import ArticleCard from "./ArticleCard";

const categories = [
  { label: "All", href: "/blog" },
  { label: "Career", href: "/blog?category=career" },
  { label: "Finance", href: "/blog?category=finance" },
  { label: "Food", href: "/blog?category=food" },
  { label: "Travel", href: "/blog?category=travel" },
  { label: "Health", href: "/blog?category=health" },
];

const CATEGORY_ORDER = ["Career", "Finance", "Travel", "Food", "Health"];
const INITIAL_LIST_COUNT = 6;
const CARDS_PER_SECTION = 3;

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const viewParam = searchParams.get("view");

  const activeCategory = useMemo(() => {
    if (!categoryParam) return "All";
    const found = categories.find(
      (c) => c.label.toLowerCase() === categoryParam.toLowerCase(),
    );
    return found ? found.label : "All";
  }, [categoryParam]);

  const [activeSort, setActiveSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    viewParam === "list" ? "list" : viewParam === "grid" ? "grid" : "grid",
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIST_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...allPosts];

    if (activeCategory !== "All") {
      posts = posts.filter(
        (post) =>
          post.category?.toLowerCase() === activeCategory.toLowerCase() ||
          post.tags?.some(
            (tag) => tag.toLowerCase() === activeCategory.toLowerCase(),
          ),
      );
    }

    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return activeSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [activeCategory, activeSort]);

  // Group posts by category for section display
  const postsByCategory = useMemo(() => {
    const grouped: Record<string, typeof allPosts> = {};

    for (const post of allPosts) {
      const cat = post.category || "Uncategorized";
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(post);
    }

    // Sort within each category by date
    for (const cat of Object.keys(grouped)) {
      grouped[cat].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return activeSort === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return grouped;
  }, [activeSort]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextVisibleCount = visibleCount + INITIAL_LIST_COUNT;
      setVisibleCount(nextVisibleCount);
      setIsLoadingMore(false);
    }, 300);
  };

  // Sync viewMode with URL parameter
  React.useEffect(() => {
    if (viewParam === "grid" || viewParam === "list") {
      setViewMode(viewParam);
    }
  }, [viewParam]);

  React.useEffect(() => {
    setVisibleCount(INITIAL_LIST_COUNT);
  }, [activeCategory, activeSort, viewMode]);

  const featuredPost =
    filteredAndSortedPosts.find((p) => p.featured) || filteredAndSortedPosts[0];

  const recentPosts = featuredPost
    ? filteredAndSortedPosts
        .filter((p) => p.slug !== featuredPost.slug)
        .slice(0, 3)
    : filteredAndSortedPosts.slice(0, 3);

  const otherPosts = filteredAndSortedPosts.slice(
    featuredPost ? 4 : 3,
    visibleCount,
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const categoriesWithPosts = CATEGORY_ORDER.filter(
    (cat) => postsByCategory[cat] && postsByCategory[cat].length > 0,
  );

  return (
    <div className="gap-x-5 flex flex-col max-w-full gap-y-5 mx-auto pt-20 px-6 md:max-w-[1440px] md:pt-10 md:px-8">
      {/* Title - changes based on active category */}
      <div className="gap-x-3 flex flex-col gap-y-3">
        <h2 className="text-[32px] font-medium shrink-0 tracking-[-0.64px] leading-[36.48px] md:text-[45.5962px] md:tracking-[-1.31981px] md:leading-[52.7955px]">
          {activeCategory === "All" ? "Blog" : activeCategory}
        </h2>
      </div>

      {/* Category Nav + Filter/Sort */}
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
        className="mb-0 md:mb-2"
      />

      {/* Grid View - Featured + Cards */}
      {viewMode === "grid" && featuredPost && (
        <div className="relative gap-x-6 flex flex-col min-h-[600px] gap-y-6">
          <div className="mb-20">
            <div className="w-full">
              <div className="gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] max-w-none gap-y-6 w-full mx-0 px-0 md:grid-cols-[repeat(4,minmax(0px,1fr))] md:max-w-[1440px] md:mx-auto">
                <div
                  className="static self-start col-end-auto col-start-auto grid-cols-[repeat(1,minmax(0px,1fr))] mb-6 top-auto md:sticky md:col-end-[span_3] md:col-start-[span_3] md:mb-0 md:top-16 animate-fade-in"
                  style={{ animationDelay: "0s", opacity: 0 }}
                >
                  <ArticleCard
                    title={featuredPost.title}
                    category={featuredPost.category}
                    date={formatDate(featuredPost.date)}
                    href={`/blog/${featuredPost.slug}`}
                    imageUrl={featuredPost.image}
                    variant="featured"
                  />
                </div>

                <div className="gap-x-4 grid col-end-[span_1] col-start-[span_1] grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-16 px-0">
                  {recentPosts.map((post, index) => (
                    <div
                      key={post.slug}
                      className="animate-fade-in"
                      style={{
                        animationDelay: `${(index + 1) * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      <ArticleCard
                        title={post.title}
                        category={post.category}
                        date={formatDate(post.date)}
                        href={`/blog/${post.slug}`}
                        imageUrl={post.image}
                        variant="default"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="gap-x-4 grid grid-cols-2 gap-y-10 md:gap-x-6 md:gap-y-20 md:grid-cols-[repeat(3,minmax(0px,1fr))]">
            {otherPosts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 0.1}s`, opacity: 0 }}
              >
                <ArticleCard
                  title={post.title}
                  category={post.category}
                  date={formatDate(post.date)}
                  href={`/blog/${post.slug}`}
                  imageUrl={post.image}
                  variant="default"
                />
              </div>
            ))}
          </div>

          {filteredAndSortedPosts.length > visibleCount && (
            <div className="flex justify-center pt-12">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="text-sm font-medium items-center bg-black/5 dark:bg-white/10 gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap px-5 py-0 rounded-[40px] border-0 hover:bg-black/10 dark:hover:bg-white/15 transition-colors disabled:opacity-50"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}

      {/* List View - All Posts (flat list with title only, then category sections after Load More) */}
      {viewMode === "list" && activeCategory === "All" && (
        <div className="flex flex-col mb-20">
          {/* List view - title only, no description */}
          <div className="flex flex-col animate-fade-in">
            {filteredAndSortedPosts.slice(0, visibleCount).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block outline-none border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors"
              >
                <article className="py-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8">
                  <div className="flex flex-row md:flex-col gap-2 md:gap-0.5">
                    <span className="text-[13px] font-medium text-black dark:text-white">
                      {post.category}
                    </span>
                    <span className="text-[13px] text-black/40 dark:text-white/40">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="text-base md:text-[17px] font-medium leading-tight tracking-[-0.2px] text-black dark:text-white">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>

          {/* Load more button - shows when there are more list items to load */}
          {filteredAndSortedPosts.length > visibleCount && (
            <div className="flex justify-center pt-12">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="text-sm font-medium items-center border border-black/10 dark:border-white/10 gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap px-5 py-0 rounded-[40px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Load more
              </button>
            </div>
          )}

          {/* Category sections with cards (always shown below the list view) */}
          <div className="flex flex-col gap-20 mt-16">
            {categoriesWithPosts.map((category) => {
              const posts = postsByCategory[category] || [];
              const visiblePosts = posts.slice(0, CARDS_PER_SECTION);

              return (
                <section key={category} className="animate-fade-in">
                  {/* Category Header with View all - navigates to grid view */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[22px] font-medium tracking-[-0.4px]">
                      {category}
                    </h3>
                    <Link
                      href={`/blog?category=${category.toLowerCase()}&view=grid`}
                      className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                    >
                      View all
                    </Link>
                  </div>

                  {/* Cards grid for this category */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visiblePosts.map((post, index) => (
                      <div
                        key={post.slug}
                        className="animate-fade-in"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          opacity: 0,
                        }}
                      >
                        <ArticleCard
                          title={post.title}
                          category={post.category}
                          date={formatDate(post.date)}
                          href={`/blog/${post.slug}`}
                          imageUrl={post.image}
                          variant="default"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* List View - Filtered by Category (shows title + description) */}
      {viewMode === "list" && activeCategory !== "All" && (
        <div className="flex flex-col mb-20 animate-fade-in">
          {filteredAndSortedPosts.slice(0, visibleCount).map((post) => (
            <PostListItem
              key={post.slug}
              title={post.title}
              description={post.description}
              href={`/blog/${post.slug}`}
              category={post.category}
              date={formatDate(post.date)}
              className=""
            />
          ))}
          {filteredAndSortedPosts.length > visibleCount && (
            <div className="flex justify-center pt-12">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="text-sm font-medium items-center border border-black/10 dark:border-white/10 gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap px-5 py-0 rounded-[40px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}

      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/40 dark:text-white/40">No posts found.</p>
        </div>
      )}
    </div>
  );
}

export function BlogPageContent() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
