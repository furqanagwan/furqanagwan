import { z } from "zod";
import {
  BLOG_CATEGORIES,
  BLOG_SEARCH_PARAM_MAX_LENGTH,
  BLOG_VIEW_MODES,
  type BlogCategory,
} from "./constants";
import type { BlogSearchParams, ParsedBlogSearchParams } from "./types";

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

const blogCategoryParamSchema = z
  .string()
  .trim()
  .min(1)
  .max(BLOG_SEARCH_PARAM_MAX_LENGTH);

const blogViewModeSchema = z.enum(BLOG_VIEW_MODES);

const firstSearchParamValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const parseBlogSearchParams = (
  searchParams: BlogSearchParams,
): ParsedBlogSearchParams => {
  const category = blogCategoryParamSchema.safeParse(
    firstSearchParamValue(searchParams.category),
  );
  const view = blogViewModeSchema.safeParse(
    firstSearchParamValue(searchParams.view),
  );

  return {
    category: category.success ? category.data : null,
    view: view.success ? view.data : null,
  };
};
