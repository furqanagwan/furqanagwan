// Blog feature constants
// Extracted from app/blog/page.tsx per architecture rules

export const BLOG_CATEGORIES = [
  { label: "All", href: "/blog" },
  { label: "Career", href: "/blog?category=career" },
  { label: "Finance", href: "/blog?category=finance" },
  { label: "Food", href: "/blog?category=food" },
  { label: "Travel", href: "/blog?category=travel" },
  { label: "Health", href: "/blog?category=health" },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]["label"];

export const POSTS_PER_PAGE = 9;
export const INITIAL_VISIBLE_COUNT = 9;
