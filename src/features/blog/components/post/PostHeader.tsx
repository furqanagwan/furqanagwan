import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../utils";
import { ShareButton } from "../header/ShareButton";
import { AudioPlayer } from "../media/AudioPlayer";
import { CTAButtons } from "../header/CTAButtons";
import { HeaderCodeSnippet } from "../header/HeaderCodeSnippet";
import { getCategoryGradient } from "@/lib/categories";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface PostHeaderProps {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime?: string;
  slug?: string;
  audio?: string;
  image?: string;
  heroVideo?: string;
  ctaButtons?: CTAButton[];
  headerCodeSnippet?: string;
}

export function PostHeader({
  title,
  description,
  date,
  category,
  readTime,
  slug,
  audio,
  image,
  heroVideo,
  ctaButtons,
  headerCodeSnippet,
}: PostHeaderProps) {
  const hasHero = Boolean(image || heroVideo);
  const gradient = getCategoryGradient(category, slug ?? title);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">
      {/* Centered meta + title + subtitle */}
      <div className="max-w-[56rem] mx-auto text-center pt-8 md:pt-16">
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm font-medium mb-8">
          <span className="text-foreground">{formatDate(date)}</span>
          <span aria-hidden="true" className="text-muted-foreground">·</span>
          <Link
            href={`/blog?category=${category.toLowerCase()}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`View all posts in ${category}`}
          >
            {category}
          </Link>
          {readTime && (
            <>
              <span aria-hidden="true" className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{readTime}</span>
            </>
          )}
        </div>

        <h1
          className="text-balance text-foreground font-medium tracking-[-0.03em] leading-[1.02]"
          style={{
            fontSize: "clamp(2.5rem, 1.6rem + 4vw, 5rem)",
          }}
        >
          {title}
        </h1>

        {description && (
          <p className="mt-6 text-balance text-[17px] md:text-[19px] leading-[1.55] text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {(ctaButtons?.length || headerCodeSnippet) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {ctaButtons && ctaButtons.length > 0 && (
              <CTAButtons buttons={ctaButtons} />
            )}
            {headerCodeSnippet && (
              <HeaderCodeSnippet code={headerCodeSnippet} />
            )}
          </div>
        )}
      </div>

      {/* Hero: image, video, or category gradient */}
      <div className="mt-12 md:mt-16 w-full">
        {heroVideo ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
            <iframe
              src={heroVideo}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : image ? (
          <div className="relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : (
          <div
            className="gradient-card w-full aspect-[16/9] md:aspect-[2.4/1] flex items-center justify-center p-6"
            style={{ background: gradient }}
            aria-hidden="true"
          >
            <span className="gradient-hero-pill text-[20px] md:text-[28px] max-w-[80%] text-center">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Listen / Share bar */}
      <div className="pt-10 md:pt-12 max-w-3xl mx-auto">
        <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
          {audio ? (
            <div className="flex-1 min-w-0">
              <AudioPlayer src={audio} />
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              {readTime ?? ""}
            </span>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
          >
            <ShareButton className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Spacer when no hero to keep rhythm tight */}
      {!hasHero && <div className="h-2" aria-hidden="true" />}
    </div>
  );
}
