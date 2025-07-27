// src/lib/github.ts

import { Octokit } from "octokit";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost } from "@/app/types/post";

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
  userAgent: "furqanagwan",
});

const REPO_OWNER = "furqanagwan";
const REPO_NAME = "furqanagwan-content";

const CATEGORY_FOLDERS = [
  "fitness",
  "travel",
  "recipes",
  "opinions",
  "finance",
  "career",
];

/**
 * Fetches a single post by category and slug from GitHub
 */
export async function getPost(
  category: string,
  slug: string,
): Promise<BlogPost> {
  const filePath = `content/${category}/${slug}.mdx`;

  const { data } = await octokit.rest.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: filePath,
  });

  if (!("content" in data)) {
    throw new Error(`No content found at ${filePath}`);
  }

  const file = Buffer.from(data.content, "base64").toString("utf8");
  const { data: frontmatter, content } = matter(file);
  const stats = readingTime(content);

  return {
    title: frontmatter.title ?? slug,
    slug,
    category,
    date: frontmatter.date ?? new Date().toISOString(),
    tags: frontmatter.tags ?? [],
    content,
    readTime: stats.text,
  };
}

/**
 * Fetches all blog posts from all category folders
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const category of CATEGORY_FOLDERS) {
    try {
      const res = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `content/${category}`,
      });

      if (!Array.isArray(res.data)) continue;

      const mdxFiles = res.data.filter(
        (file) => file.type === "file" && file.name.endsWith(".mdx"),
      );

      for (const file of mdxFiles) {
        const slug = file.name.replace(/\.mdx$/, "");
        const post = await getPost(category, slug);
        posts.push(post);
      }
    } catch (error) {
      console.warn(`Failed to load posts from category: ${category}`, error);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
