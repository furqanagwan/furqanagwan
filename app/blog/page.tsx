"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { allPosts } from "content-collections";

import FilterSortBar from "@/components/ui/FilterSortBar";
import PostListItem from "@/components/ui/PostListItem";
import ArticleCard from "@/components/ui/ArticleCard";

const categories = [
  { label: "All", href: "/blog" },
  { label: "Career", href: "/blog?category=career" },
  { label: "Finance", href: "/blog?category=finance" },
  { label: "Food", href: "/blog?category=food" },
  { label: "Travel", href: "/blog?category=travel" },
  { label: "Health", href: "/blog?category=health" },
];

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Determine active category label from URL param
  const activeCategory = useMemo(() => {
    if (!categoryParam) return "All";
    const found = categories.find(
      (c) => c.label.toLowerCase() === categoryParam.toLowerCase(),
    );
    return found ? found.label : "All";
  }, [categoryParam]);

  const [activeSort, setActiveSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...allPosts];

    // Filter by category
    if (activeCategory !== "All") {
      posts = posts.filter(
        (post) =>
          post.category?.toLowerCase() === activeCategory.toLowerCase() ||
          post.tags?.some(
            (tag) => tag.toLowerCase() === activeCategory.toLowerCase(),
          ),
      );
    }

    // Sort
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return activeSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [activeCategory, activeSort]);

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setIsLoadingMore(false);
    }, 300);
  };

  // Reset pagination when category/sort changes
  React.useEffect(() => {
    setVisibleCount(9);
  }, [activeCategory, activeSort]);

  // Fallback to the first post as featured if no post is explicitly marked as featured
  const featuredPost =
    filteredAndSortedPosts.find((p) => p.featured) || filteredAndSortedPosts[0];

  const recentPosts = featuredPost
    ? filteredAndSortedPosts
        .filter((p) => p.slug !== featuredPost.slug)
        .slice(0, 3)
    : filteredAndSortedPosts.slice(0, 3);

  // For grid view: "Other" posts starts after featured (1) + recent (3) = 4
  // We limit the displayed "other" posts based on visibleCount, accounting for the 4 already shown
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

  return (
    <div className="gap-x-5 flex flex-col max-w-full gap-y-5 mx-auto pt-20 px-6 md:max-w-[1440px] md:pt-10 md:px-8">
      {/* Title */}
      <div className="gap-x-3 flex flex-col gap-y-3">
        <h2 className="text-[32px] font-medium shrink-0 tracking-[-0.64px] leading-[36.48px] md:text-[45.5962px] md:tracking-[-1.31981px] md:leading-[52.7955px]">
          {activeCategory === "All" ? "Blog" : activeCategory}
        </h2>
      </div>

      {/* Category Nav + Filter/Sort on same row */}
      <FilterSortBar
        categories={categories
          .map((c) => ({
            ...c,
            active:
              activeCategory ===
              (c.label === "All" ? "All" : c.label.toLowerCase()), // Adjust active logic if needed
          }))
          .map((c) => ({
            // Re-map to ensure active logic is correct based on original implementation
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
        // Removed generic onSortClick toggle in favor of specific sort selection
      />

      {/* Featured + Recent Grid - matching OpenAI structure */}
      {viewMode === "grid" && featuredPost && (
        <div className="relative gap-x-6 flex flex-col min-h-[600px] gap-y-6">
          <div className="mb-20 -mx-6 md:-mx-8">
            <div className="w-full">
              <div className="gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] max-w-none gap-y-6 w-full mx-0 px-0 md:grid-cols-[repeat(4,minmax(0px,1fr))] md:max-w-[1440px] md:mx-auto md:px-8">
                {/* Featured Article - 3 columns */}
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

                {/* Right sidebar - 1 column with recent articles */}
                <div className="gap-x-4 grid col-end-[span_1] col-start-[span_1] grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-16 px-6 md:px-0">
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

          {/* Other posts - 2 column on mobile, 3 column on desktop */}
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

          {/* Load more button */}
          {filteredAndSortedPosts.length > visibleCount && (
            <div
              className={`flex justify-center pt-12 transition-opacity duration-300 ${isLoadingMore ? "opacity-0" : "opacity-100"}`}
            >
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

      {/* List View */}
      {viewMode === "list" && (
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
            <div
              className={`flex justify-center pt-12 transition-opacity duration-300 ${isLoadingMore ? "opacity-0" : "opacity-100"}`}
            >
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

      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/40 dark:text-white/40">No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
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
