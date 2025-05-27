import { ScrambleText } from "@/components/scramble-text";
import { ProjectCard } from "@/components/project-card";
import { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://furqanagwan.vercel.app/",
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>
      {/* 
      <p className="text-gray-700 dark:text-gray-400 mb-12 leading-relaxed">
        Here are some of the projects I've worked on. I love building tools
        that make developers' lives easier and exploring new technologies
        along the way.
      </p>
      */}
      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  );
}
