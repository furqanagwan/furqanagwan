import { unstable_cache } from "next/cache";
import type { GitHubRepo } from "./types";

async function fetchReposFromGitHub(username: string): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_PAT;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = token
    ? `https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner`
    : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error("Failed to fetch GitHub repos:", response.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await response.json();

  return repos.filter((repo) => !repo.fork && !repo.archived);
}

export const fetchGitHubRepos = unstable_cache(
  async (username: string = process.env.GITHUB_USERNAME || "furqanagwan") => {
    return fetchReposFromGitHub(username);
  },
  ["github-repos", "v2"],
  { revalidate: 60, tags: ["github"] },
);
