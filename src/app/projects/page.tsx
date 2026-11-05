import { fetchGitHubRepos } from "@/features/projects/queries";
import { reposToProjects } from "@/features/projects/utils";
import type { Project } from "@/features/projects/types";
import { allProjects as mdxProjects } from "content-collections";
import ProjectsList from "@/features/projects/components/ProjectsList";

export const revalidate = 60;

export const metadata = {
  title: "Furqan Agwan Projects",
  description: "Discover my software projects and open source contributions",
};

export default async function ProjectsPage() {
  const repos = await fetchGitHubRepos();
  const githubProjects = reposToProjects(repos);

  const mdxTitles = new Set(mdxProjects.map((p) => p.title.toLowerCase()));
  const uniqueGithubProjects = githubProjects.filter(
    (p) => !mdxTitles.has(p.title.toLowerCase()),
  );

  const allProjects: Project[] = [
    ...mdxProjects.map((p) => ({
      title: p.title,
      description: p.description,
      category: p.category,
      date: p.date,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl || "",
      technologies: p.technologies,
      featured: p.featured || false,
    })),
    ...uniqueGithubProjects,
  ];

  return <ProjectsList projects={allProjects} />;
}
