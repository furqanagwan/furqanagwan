import { MDXContent } from "@content-collections/mdx/react";
import type { Qualification } from "../utils";

interface QualificationItemProps {
  qual: Qualification;
  index: number;
}

export function QualificationItem({ qual, index }: QualificationItemProps) {
  return (
    <article
      className="group py-6 border-b border-black/15 dark:border-white/15 last:border-b-0 hover:border-black dark:hover:border-white transition-colors animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold group-hover:opacity-70 transition-opacity">
            {qual.title}
          </h3>
          <p className="text-muted-foreground text-[15px] mt-0.5">
            {qual.institution}
          </p>
          {qual.description && (
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              {qual.description}
            </p>
          )}
          {qual.mdx && (
            <div className="mt-4 text-sm text-muted-foreground prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-ul:my-2 prose-li:my-0">
              <MDXContent code={qual.mdx} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
