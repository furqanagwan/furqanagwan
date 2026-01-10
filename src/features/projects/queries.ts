import { unstable_cache } from "next/cache";
import type { GitHubRepo } from "./types";

/**
 * Internal function to fetch repos from GitHub API
 */
async function fetchReposFromGitHub(username: string): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_PAT;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Use /user/repos for authenticated requests (includes private repos)
  // Fall back to /users/{username}/repos for public-only
  const url = token
    ? `https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner`
    : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error("Failed to fetch GitHub repos:", response.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await response.json();

  // Filter out forks and archived repos
  return repos.filter((repo) => !repo.fork && !repo.archived);
}

/**
 * Cached version of fetchGitHubRepos using Next.js unstable_cache
 * Revalidates every hour (3600 seconds)
 */
export const fetchGitHubRepos = unstable_cache(
  async (username: string = process.env.GITHUB_USERNAME || "furqanagwan") => {
    return fetchReposFromGitHub(username);
  },
  ["github-repos", "v2"], // Cache bust to ensure private repos are picked up
  { revalidate: 60, tags: ["github"] },
);
