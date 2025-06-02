import { projects } from "@/data/projects";
import Link from "next/link";
import Footer from "@/components/footer";

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-start gap-2 min-w-[160px]">
      <h2 className="pt-2 border-t-2 border-black dark:border-white font-semibold text-[13px] leading-tight w-fit mb-0">
        {title}
      </h2>
      <div className="text-sm text-foreground">{children}</div>
    </section>
  );
}

function formatTechnologies(tech: string[]) {
  return tech.map((t) => (
    <span
      key={t}
      className="px-2 py-0.5 text-xs rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {t}
    </span>
  ));
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full">
        <h1 className="font-extrabold text-[clamp(2rem,12vw,5rem)] leading-none mb-3 text-foreground">
          Projects
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mt-2 mb-6">
          A selection of professional projects I've worked on.
        </p>
      </header>

      {/* Projects Grid */}
      <section className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col gap-4">
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
              {project.role} {project.period && `(${project.period})`}
            </p>
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-1">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {project.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-1">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {formatTechnologies(project.technologies)}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
