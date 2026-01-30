import type { GitHubRepo, Project } from "./types";
import { FEATURED_STARS_THRESHOLD } from "./constants";

export function reposToProjects(repos: GitHubRepo[]): Project[] {
  return repos.map((repo) => ({
    title: repo.name,
    description: repo.description || "",
    category: repo.language || "Other",
    date: repo.pushed_at.split("T")[0]!, // YYYY-MM-DD
    liveUrl: repo.homepage || undefined,
    githubUrl: repo.private ? "" : repo.html_url,
    technologies: repo.topics.length > 0 ? repo.topics : [],
    featured:
      repo.stargazers_count >= FEATURED_STARS_THRESHOLD ||
      repo.topics.includes("featured"),
  }));
}

/**
 * Get featured projects sorted by date (newest first)
 */
export function getFeaturedProjects(
  projects: Project[],
  limit: number = 2,
): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Sort projects by date (newest first)
 */
export function sortProjectsByDate(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
