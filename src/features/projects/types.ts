export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

export interface Project {
  title: string;
  description: string;
  category: string;
  date: string;
  liveUrl?: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
}
