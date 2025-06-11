"use client";

export default function TechnologyBadge({ tech }: { tech: string }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      {tech}
    </span>
  );
}
