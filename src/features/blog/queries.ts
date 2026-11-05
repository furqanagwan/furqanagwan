import { allPosts, type Post } from "content-collections";
import { type BlogCategory } from "./constants";

export const getSortedPosts = (): Post[] => {
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getFeaturedPost = (): Post | null => {
  const sorted = getSortedPosts();
  return sorted.length > 0 ? sorted[0]! : null;
};

export const getRecentPosts = (limit: number = 3): Post[] => {
  const sorted = getSortedPosts();
  return sorted.slice(1, limit + 1);
};

export const getRelatedPosts = (
  currentSlugs: string | string[],
  category: string,
  limit: number = 3,
): Post[] => {
  const excludeSlugs = Array.isArray(currentSlugs)
    ? currentSlugs
    : [currentSlugs];
  return allPosts
    .filter(
      (p) =>
        p.slug && !excludeSlugs.includes(p.slug) && p.category === category,
    )
    .slice(0, limit);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return allPosts.find((p) => p.slug === slug);
};

export const filterAndSortPosts = (
  category: BlogCategory,
  sortOrder: "newest" | "oldest" = "newest",
): Post[] => {
  let posts = [...allPosts];

  if (category !== "All") {
    posts = posts.filter(
      (post) =>
        post.category?.toLowerCase() === category.toLowerCase() ||
        post.tags?.some((tag) => tag.toLowerCase() === category.toLowerCase()),
    );
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return posts;
};
