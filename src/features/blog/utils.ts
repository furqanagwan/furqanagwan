import { BLOG_CATEGORIES, type BlogCategory } from "./constants";

// Date formatting - long format
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Date formatting - short format (for blog listing)
export const formatDateShort = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Get active category from URL param
export const getActiveCategory = (
  categoryParam: string | null,
): BlogCategory => {
  if (!categoryParam) return "All";
  const found = BLOG_CATEGORIES.find(
    (c) => c.label.toLowerCase() === categoryParam.toLowerCase(),
  );
  return found ? (found.label as BlogCategory) : "All";
};
