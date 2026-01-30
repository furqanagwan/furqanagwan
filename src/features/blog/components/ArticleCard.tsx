import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  category: string;
  date: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({
  title,
  category,
  date,
  href,
  imageUrl,
  imageAlt,
  variant = "default",
}: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <article>
      <Link
        href={href}
        className={cn(
          "group relative block animate-fade-in",
          isCompact ? "" : "",
        )}
        aria-label={`${title} - ${category} - ${date}`}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-black/10 dark:bg-white/10 mb-4 rounded-[6.08px]",
            isFeatured
              ? "aspect-[4/5] md:aspect-video" // Featured: Portrait mobile, Video desktop
              : "aspect-square", // Default/Grid: Square (1:1)
            // Compact gets handled by parent grid usually, or we can force aspect
            isCompact && "aspect-[4/5] mb-4",
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, hsl(${(title.length * 15) % 360}, 70%, 60%) 0%, hsl(${(title.length * 25) % 360}, 70%, 70%) 100%)`,
              }}
            />
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-medium mb-2 transition-opacity group-hover:opacity-70 text-foreground",
            isFeatured
              ? "text-[32px] tracking-[-0.64px] leading-[36.48px] md:text-[45.5962px] md:tracking-[-1.31981px] md:leading-[52.7955px] md:pr-20 mb-4"
              : "text-base tracking-[-0.16px] leading-5 md:text-[17.6995px] md:tracking-[-0.176995px] md:leading-[23.1951px]",
          )}
        >
          {title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium tracking-[normal] leading-[19.6px]">
          <span className="text-foreground">{category}</span>
          <span className="text-black/40 dark:text-white/40">{date}</span>
        </div>
      </Link>
    </article>
  );
}
