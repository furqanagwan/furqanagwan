export type { Post } from "content-collections";

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
