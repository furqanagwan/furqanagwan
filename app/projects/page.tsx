import { ScrambleText } from "../../components/scramble-text"
import { ProjectCard } from "../../components/project-card"
import { Metadata } from "next"

const projects = [
    {
        title: "Digital Apprenntice Service",
        description: "a simplified implementation of git built from scratch",
        role: "Dev-Ops Engineer",
        period: "jul 2024",
        achievements: [
            "successfully implemented core git commands",
            "implemented efficient blob storage and compression",
            "learned about git's internal object model and data structures like merkle trees",
        ],
        technologies: ["go", "sha-1"],
        href: "https://github.com/nexxeln/mini-git",
    },
    {
        title: "Home Office",
        description:
            "cli tool to bootstrap full-stack type-safe next.js applications",
        role: "Full-Stack engineer",
        period: "jun 2022 - present",
        achievements: [
            "grew project to 24k+ github stars",
            "wrote education blog posts with over 100k views",
            "maintained comprehensive, up-to-date documentation",
        ],
        technologies: [
            "typescript",
            "next.js",
            "trpc",
            "prisma",
            "tailwind css",
            "auth.js",
        ],
        href: "https://create.t3.gg",
    },
    {
        title: "HM Revenue and Customs",
        description: "cli tool to create licenses for your projects",
        role: "Software/Data Engineer",
        period: "mar 2022 - present",
        achievements: [
            "grew project to over 3.2k downloads",
            "built a robust cli interface with fuzzy search",
            "added support for all github licenses with auto-filling",
        ],
        technologies: ["rust", "github api"],
        href: "https://github.com/nexxeln/license-generator",
    }
]

export default function ProjectsPage() {
    return (
        <main className="animate-fade-in-up">
            <h1 className="text-4xl font-bold mb-8 text-white">
                <span className="text-accent mr-2">*</span>
                <ScrambleText text="projects" />
            </h1>

            {/* <p className="text-gray-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i love building tools
        that make developers&apos; lives easier and exploring new technologies
        along the way.
      </p> */}

            <div className="space-y-12">
                {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </div>
        </main>
    )
}

export const metadata: Metadata = {
    title: "Projects",
    description: "Some of the projects I've worked on.",
    openGraph: {
        images: [
            {
                url: "https://www.nexxel.dev/og/home?title=projects",
            },
        ],
    },
}
