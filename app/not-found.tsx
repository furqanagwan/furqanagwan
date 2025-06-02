import Link from "next/link";

export default function NotFound() {
  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <pre className="font-mono text-accent whitespace-pre">
          {`
       _             _            _
   _  /\\ \\         / /\\       _  /\\ \\
  /\\_\\\\ \\ \\       / /  \\     /\\_\\\\ \\ \\
 / / / \\ \\ \\     / / /\\ \\   / / / \\ \\ \\
/ / /   \\ \\ \\   / / /\\ \\ \\ / / /   \\ \\ \\
\\ \\ \\____\\ \\ \\ /_/ /  \\ \\ \\\\ \\ \\____\\ \\ \\
 \\ \\________\\ \\\\ \\ \\   \\ \\ \\\\ \\________\\ \\
  \\/________/\\ \\\\ \\ \\   \\ \\ \\/________/\\ \\
            \\ \\ \\\\ \\ \\___\\ \\ \\         \\ \\ \\
             \\ \\_\\\\ \\/____\\ \\ \\         \\ \\_\\
              \\/_/ \\_________\\/          \\/_/

          `}
        </pre>
        <p className="text-gray-400">
          looks like you've wandered into uncharted territory
        </p>
        <Link
          href="/"
          className="inline-block text-gray-400 hover:text-accent transition-colors"
        >
          return home
        </Link>
      </div>
    </div>
=======
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
        <Link href="/colophon" className="hover:underline text-foreground">
          Colophon
        </Link>
      </footer>
    </main>
>>>>>>> origin/migration
  );
}
