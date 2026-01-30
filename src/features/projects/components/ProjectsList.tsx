"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import FilterSortBar from "@/components/ui/FilterSortBar";
import PostListItem from "@/components/ui/PostListItem";
import type { Project } from "../types";

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Format date to match blog style (e.g., "Dec 31, 2024")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    // Sort logic
    filtered.sort((a, b) => {
      // Simple string comparison for dates
      if (a.date > b.date) return activeSort === "newest" ? -1 : 1;
      if (a.date < b.date) return activeSort === "newest" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, activeCategory, activeSort]);

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  // Pagination persists across filter changes for simplicity

  return (
    <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight heading-display">
          Projects
        </h1>
        <p className="text-muted-foreground mt-4">
          {projects.length} projects from GitHub and curated work
        </p>
      </div>

      {/* Filter Bar */}
      <FilterSortBar
        categories={categories.map((cat) => ({
          label: cat,
          active: activeCategory === cat,
          onClick: () => setActiveCategory(cat),
        }))}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFilterClick={() => {}} // Placeholder
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      {/* Projects Grid */}
      <div className="py-10">
        {filteredProjects.length > 0 ? (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects
                  .slice(0, visibleCount)
                  .map((project, index) => (
                    <article
                      key={project.title}
                      className="group animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                    >
                      {/* Image */}
                      <div
                        className={`aspect-video rounded-xl mb-4 overflow-hidden gradient-${(index % 6) + 1} flex items-center justify-center`}
                      >
                        <span className="text-white/90 text-xl font-semibold">
                          {project.title.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold group-hover:opacity-70 transition-opacity">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-[15px] mt-1 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[13px] text-muted-foreground">
                            <span>{project.category}</span>
                            {project.featured && (
                              <>
                                <span>·</span>
                                <span className="text-foreground">
                                  Featured
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="View on GitHub"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="View live"
                            >
                              <ArrowUpRight size={18} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[11px] rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="flex flex-col mb-20 animate-fade-in">
                {filteredProjects.slice(0, visibleCount).map((project) => (
                  <PostListItem
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    href={project.githubUrl || project.liveUrl}
                    category={project.category}
                    date={formatDate(project.date)}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProjects.length > visibleCount && (
              <div className="flex justify-center pt-12">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="text-sm font-medium items-center bg-black/0 gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap px-5 py-0 rounded-[40px] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
