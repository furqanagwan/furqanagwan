export type { Post } from "content-collections";
import type { BLOG_VIEW_MODES } from "./constants";

export interface BlogFilters {
  category?: string;
  search?: string;
}

export interface FormattedPost {
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  category: string;
  image?: string;
}

export type BlogSearchParams = Record<string, string | string[] | undefined>;

export type BlogViewMode = (typeof BLOG_VIEW_MODES)[number];

export interface ParsedBlogSearchParams {
  category: string | null;
  view: BlogViewMode | null;
}
