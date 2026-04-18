import Link from "next/link";

interface PostFooterProps {
  tags: string[];
}

export function PostFooter({ tags }: PostFooterProps) {
  if (!tags?.length) return null;

  return (
    <section className="max-w-[1440px] w-full mx-auto px-6 md:px-8">
      <div className="max-w-3xl mx-auto pt-10 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-3">
              Filed under
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tags=${tag}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-black/5 dark:bg-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:text-right">
            <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">
              Author
            </h2>
            <span className="text-sm text-foreground">Furqan Agwan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
