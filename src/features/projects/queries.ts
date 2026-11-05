import { unstable_cache } from "next/cache";
import type { GitHubRepo } from "./types";

function readGitHubApiToken(): string | undefined {
  return process.env.GITHUB_PAT || process.env.GITHUB_API_TOKEN || undefined;
}

async function fetchReposFromGitHub(username: string): Promise<GitHubRepo[]> {
  const token = readGitHubApiToken();

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const publicReposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`;

  const response = await fetch(publicReposUrl, { headers });

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
