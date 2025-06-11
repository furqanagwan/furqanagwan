import Footer from "@/components/footer";
import ProjectsGrid from "@/components/projects-grid";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full">
        <h1 className="font-extrabold text-[clamp(2rem,12vw,5rem)] leading-none mb-3 text-foreground">
          Projects
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mt-2 mb-6">
          A selection of professional projects I've worked on.
        </p>
      </header>
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
