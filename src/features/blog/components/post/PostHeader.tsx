import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../utils";
import { ShareButton } from "../header/ShareButton";
import { AudioPlayer } from "../media/AudioPlayer";
import { CTAButtons } from "../header/CTAButtons";
import { HeaderCodeSnippet } from "../header/HeaderCodeSnippet";

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
  audio,
  image,
  heroVideo,
  ctaButtons,
  headerCodeSnippet,
}: PostHeaderProps) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          {/* Main Content Container */}
          <div className="relative flex flex-col items-center text-center w-full">
            {/* Date and Category */}
            <div className="mb-8 gap-2 flex flex-wrap justify-center items-center">
              <span className="text-[13px] font-medium leading-[20px] text-black dark:text-white">
                {formatDate(date)}
              </span>
              <Link
                href={`/blog?category=${category.toLowerCase()}`}
                className="transition ease-out duration-250 text-[13px] font-medium leading-[20px] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
                aria-label={`View all posts in ${category}`}
              >
                {category}
              </Link>
            </div>

            {/* Title - Using OpenAI's exact fluid typography */}
            <h1
              className="max-w-[62.5rem] text-balance scroll-mt-[calc(var(--header-h)+var(--toc-button-h))] text-black dark:text-white"
              style={{
                fontSize:
                  "clamp(2rem, calc(2rem + 2 * ((100vw - 23.4375rem) / 66.5625)), 4rem)",
                lineHeight:
                  "clamp(2.28rem, calc(2.28rem + 1.72 * ((100vw - 23.4375rem) / 66.5625)), 4rem)",
                letterSpacing: "-0.03em",
                fontWeight: 500,
              }}
            >
              {title}
            </h1>

            {/* Description/Subtitle - Using OpenAI's exact typography */}
            {description && (
              <div className="mt-3 w-full">
                <p
                  className="text-balance text-black dark:text-white text-center"
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: "1.75rem",
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                  }}
                >
                  {description}
                </p>
              </div>
            )}

            {/* CTA Buttons & Code Snippet */}
            {(ctaButtons?.length || headerCodeSnippet) && (
              <div className="mt-8 min-h-[40px] flex justify-center w-full">
                <div className="gap-2 flex flex-row flex-wrap items-center justify-center">
                  {ctaButtons && ctaButtons.length > 0 && (
                    <CTAButtons buttons={ctaButtons} />
                  )}
                  {headerCodeSnippet && (
                    <HeaderCodeSnippet code={headerCodeSnippet} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Media (Image or Video) */}
      {(image || heroVideo) && (
        <div className="mt-8 md:mt-12 w-full">
          {heroVideo ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
              <iframe
                src={heroVideo}
                title="Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : image ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[2.4/1] overflow-hidden bg-black/5 dark:bg-white/5">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Share Bar & Meta - Divider */}
      <div className="pt-12 md:pt-16 w-full grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <div className="pt-3 border-t border-black/10 dark:border-white/10">
            <div className="flex justify-between items-center">
              {/* Audio Player if present */}
              {audio && (
                <div className="flex-1 mr-4">
                  <AudioPlayer src={audio} />
                </div>
              )}

              {/* Share Button matched to OpenAI style - Left aligned */}
              <div className={audio ? "" : "mr-auto"}>
                <button
                  type="button"
                  className="flex items-center gap-2 text-[14px] font-medium hover:text-black/60 dark:hover:text-white/60 transition-colors"
                >
                  <ShareButton className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
