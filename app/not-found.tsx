import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto pt-32 px-4 text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-[clamp(3rem,16vw,7.5rem)] font-extrabold leading-none mb-4 text-foreground">
          404
        </h1>
        <p className="text-2xl text-muted-foreground mb-6">
          Oops, the page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-foreground hover:underline"
        >
          ← Go back home
        </Link>
      </div>

      <footer className="max-w-5xl mx-auto w-full px-4 py-8 text-xs text-muted-foreground flex flex-col sm:flex-row gap-3 justify-between mt-auto border-t border-border">
        <span>© {new Date().getFullYear()} Furqan Agwan</span>
      </footer>
    </main>
  );
}
