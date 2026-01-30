import { describe, it, expect } from "vitest";
import {
  reposToProjects,
  getFeaturedProjects,
  sortProjectsByDate,
} from "./utils";
import type { GitHubRepo, Project } from "./types";

describe("reposToProjects", () => {
  const mockRepo: GitHubRepo = {
    id: 1,
    name: "test-repo",
    full_name: "user/test-repo",
    description: "A test repo",
    html_url: "https://github.com/user/test-repo",
    homepage: "https://example.com",
    topics: ["typescript", "react"],
    language: "TypeScript",
    stargazers_count: 10,
    forks_count: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    pushed_at: "2024-06-15T00:00:00Z",
    archived: false,
    fork: false,
    private: false,
  };

  it("transforms repo to project format", () => {
    const projects = reposToProjects([mockRepo]);
    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject({
      title: "test-repo",
      description: "A test repo",
      category: "TypeScript",
      date: "2024-06-15",
      githubUrl: "https://github.com/user/test-repo",
      liveUrl: "https://example.com",
      technologies: ["typescript", "react"],
      featured: true, // 10 stars >= 5
    });
  });

  it("handles repo with no description", () => {
    const repoNoDesc = { ...mockRepo, description: null };
    const projects = reposToProjects([repoNoDesc]);
    expect(projects[0]!.description).toBe("");
  });

  it("handles repo with no topics (uses language)", () => {
    const repoNoTopics = { ...mockRepo, topics: [] };
    const projects = reposToProjects([repoNoTopics]);
    expect(projects[0]!.technologies).toEqual([]);
  });

  it("handles repo with low stars (not featured)", () => {
    const lowStarsRepo = { ...mockRepo, stargazers_count: 2, topics: [] };
    const projects = reposToProjects([lowStarsRepo]);
    expect(projects[0]!.featured).toBe(false);
  });

  it("marks repo as featured if it has 'featured' topic", () => {
    const featuredTopicRepo = {
      ...mockRepo,
      stargazers_count: 1,
      topics: ["featured"],
    };
    const projects = reposToProjects([featuredTopicRepo]);
    expect(projects[0]!.featured).toBe(true);
  });
});

describe("getFeaturedProjects", () => {
  const projects: Project[] = [
    {
      title: "Old Featured",
      description: "Test",
      category: "TypeScript",
      date: "2023-01-01",
      githubUrl: "https://github.com/test",
      technologies: [],
      featured: true,
    },
    {
      title: "New Featured",
      description: "Test",
      category: "JavaScript",
      date: "2024-06-01",
      githubUrl: "https://github.com/test2",
      technologies: [],
      featured: true,
    },
    {
      title: "Not Featured",
      description: "Test",
      category: "Python",
      date: "2024-12-01",
      githubUrl: "https://github.com/test3",
      technologies: [],
      featured: false,
    },
  ];

  it("returns only featured projects sorted by date (newest first)", () => {
    const featured = getFeaturedProjects(projects);
    expect(featured).toHaveLength(2);
    expect(featured[0]!.title).toBe("New Featured");
    expect(featured[1]!.title).toBe("Old Featured");
  });

  it("respects the limit parameter", () => {
    const featured = getFeaturedProjects(projects, 1);
    expect(featured).toHaveLength(1);
    expect(featured[0]!.title).toBe("New Featured");
  });

  it("returns empty array when no featured projects", () => {
    const noFeatured = projects.filter((p) => !p.featured);
    expect(getFeaturedProjects(noFeatured)).toEqual([]);
  });
});

describe("sortProjectsByDate", () => {
  const projects: Project[] = [
    {
      title: "Middle",
      description: "Test",
      category: "TypeScript",
      date: "2024-06-01",
      githubUrl: "",
      technologies: [],
      featured: false,
    },
    {
      title: "Oldest",
      description: "Test",
      category: "TypeScript",
      date: "2023-01-01",
      githubUrl: "",
      technologies: [],
      featured: false,
    },
    {
      title: "Newest",
      description: "Test",
      category: "TypeScript",
      date: "2024-12-01",
      githubUrl: "",
      technologies: [],
      featured: false,
    },
  ];

  it("sorts projects newest first", () => {
    const sorted = sortProjectsByDate(projects);
    expect(sorted[0]!.title).toBe("Newest");
    expect(sorted[1]!.title).toBe("Middle");
    expect(sorted[2]!.title).toBe("Oldest");
  });

  it("does not mutate original array", () => {
    const original = [...projects];
    sortProjectsByDate(projects);
    expect(projects).toEqual(original);
  });

  it("handles empty array", () => {
    expect(sortProjectsByDate([])).toEqual([]);
  });
});
