import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getCategoryGradient } from "@/lib/categories";

interface ArticleCardProps {
  title: string;
  category: string;
  date: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  readTime?: string;
  /**
   * default   — square thumbnail above meta (grid row)
   * featured  — wide hero; uses pill-on-gradient when no image
   * compact   — 4:5 thumb above meta (dense list)
   * gradient  — full-bleed gradient square card with title overlaid
   *             (the solid-colour cards in the OpenAI home right rail)
   */
  variant?: "default" | "featured" | "compact" | "gradient";
  /** Stable slug used to seed the deterministic gradient. */
  slug?: string;
}

export default function ArticleCard({
  title,
  category,
  date,
  href,
  imageUrl,
  imageAlt,
  readTime,
  variant = "default",
  slug,
}: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const isGradient = variant === "gradient";

  const gradient = getCategoryGradient(category, slug ?? title);

  // Full-bleed gradient card — title overlaid in white, meta below in muted.
  if (isGradient) {
    return (
      <article>
        <Link
          href={href}
          aria-label={`${title} — ${category}${readTime ? ` — ${readTime}` : ""}`}
          className="group block animate-fade-in"
        >
          <div
            className="gradient-card aspect-square w-full p-6 md:p-8 flex items-start transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ background: gradient }}
          >
            <h3 className="text-white text-[26px] md:text-[32px] font-medium leading-[1.1] tracking-[-0.02em] pr-4">
              {title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-sm font-medium">
            <span className="text-foreground">{category}</span>
            {readTime && (
              <span className="text-black/40 dark:text-white/40">
                {readTime}
              </span>
            )}
            {!readTime && (
              <span className="text-black/40 dark:text-white/40">{date}</span>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article>
      <Link
        href={href}
        className="group relative block animate-fade-in"
        aria-label={`${title} - ${category} - ${date}`}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden mb-4 rounded-2xl",
            isFeatured
              ? "aspect-[4/5] md:aspect-[16/10]"
              : "aspect-square",
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
              className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ background: gradient }}
              aria-hidden="true"
            >
              {isFeatured && (
                <div className="w-full h-full flex items-center justify-center p-6">
                  <span className="gradient-hero-pill text-[18px] md:text-[22px] max-w-[80%] text-center">
                    {title}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <h3
          className={cn(
            "font-medium mb-2 transition-opacity group-hover:opacity-70 text-foreground",
            isFeatured
              ? "text-[32px] tracking-[-0.02em] leading-[1.1] md:text-[44px] md:leading-[1.08] md:pr-20 mb-4"
              : "text-base tracking-[-0.01em] leading-[1.3] md:text-[18px]",
          )}
        >
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium">
          <span className="text-foreground">{category}</span>
          <span className="text-black/40 dark:text-white/40">
            {readTime ?? date}
          </span>
        </div>
      </Link>
    </article>
  );
}
