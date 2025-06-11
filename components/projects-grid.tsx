"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./project-card";

export default function ProjectsGrid() {
  return (
    <section
      className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12"
      aria-label="Projects"
    >
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
}
