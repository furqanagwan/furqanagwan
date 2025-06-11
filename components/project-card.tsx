"use client";

import TechnologyBadge from "./ui/technology-badge";

interface Project {
  title: string;
  href?: string;
  description: string;
  role: string;
  period?: string;
  achievements: string[];
  technologies: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h2>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {project.description}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
        {project.role}
        {project.period && ` (${project.period})`}
      </p>
      <section>
        <h3 className="text-xs font-semibold text-foreground mb-1">
          Achievements
        </h3>
        <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
          {project.achievements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-xs font-semibold text-foreground mb-1">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <TechnologyBadge key={t} tech={t} />
          ))}
        </div>
      </section>
    </article>
  );
}
