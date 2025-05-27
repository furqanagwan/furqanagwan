import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  period?: string;
  achievements: string[];
  technologies: string[];
  href?: string;
};

export function ProjectCard({
  title,
  description,
  role,
  period,
  achievements,
  technologies,
  href,
}: ProjectCardProps) {
  // Content for the header section
  const HeaderContent = (
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold text-black dark:text-white group-hover:text-accent transition-colors">
        {title}
      </h2>
      <ArrowUpRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
    </div>
  );

  return (
    <div className="group border border-gray-300 dark:border-gray-800 p-6 transition-colors hover:border-accent/50 bg-white dark:bg-[#1a1a1a] rounded-xl shadow">
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {HeaderContent}
        </Link>
      ) : (
        HeaderContent
      )}

      <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
        {role} {period && `(${period})`}
      </p>

      <p className="text-gray-800 dark:text-gray-300 mb-6">{description}</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-black dark:text-white font-semibold mb-2">
            achievements
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-400">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-black dark:text-white font-semibold mb-2">
            technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-200 dark:bg-gray-800/50 rounded"
              >
                {tech.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
