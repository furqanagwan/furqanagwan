export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  content: string;
  readTime: string;
  excerpt?: string;
  coverImage?: string;
  updatedAt?: string;
}
