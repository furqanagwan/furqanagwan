import { BLOG_CATEGORIES, type BlogCategory } from "./constants";

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateShort = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getActiveCategory = (
  categoryParam: string | null,
): BlogCategory => {
  if (!categoryParam) return "All";
  const found = BLOG_CATEGORIES.find(
    (c) => c.label.toLowerCase() === categoryParam.toLowerCase(),
  );
  return found ? (found.label as BlogCategory) : "All";
};
