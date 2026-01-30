// Re-export Post type from content-collections for feature consistency
// This allows feature consumers to import from @/src/features/blog/types
export type { Post } from "content-collections";

// Blog-specific types
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
