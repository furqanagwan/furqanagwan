import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../utils";
import { type Post } from "content-collections";

interface RelatedPostsProps {
  relatedPosts: Post[];
  category: string;
}

export function RelatedPosts({ relatedPosts, category }: RelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <div className="w-full">
      <div className="items-baseline flex justify-between max-w-full mb-8 mx-auto px-6 md:max-w-[1440px] md:px-8">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.2px] leading-6 md:text-[21.6995px] md:tracking-[-0.216995px] md:leading-[27.1611px]">
            Keep reading
          </h2>
        </div>
        <Link
          href={`/blog?category=${category.toLowerCase()}`}
          className="text-sm font-medium items-center gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-nowrap"
        >
          View all
        </Link>
      </div>
      <div className="flex max-w-none mx-0 px-0 md:max-w-[1440px] md:mx-auto md:px-8">
        <div className="overflow-x-auto overflow-y-hidden w-full">
          <div className="gap-x-[normal] grid shrink-0 grid-cols-[repeat(3,minmax(0px,1fr))] min-w-[896px] gap-y-[normal] px-6 md:gap-x-6 md:min-w-0 md:gap-y-6 md:px-0">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="flex flex-col group"
              >
                {relatedPost.image && (
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-base font-medium leading-tight group-hover:underline">
                  {relatedPost.title}
                </h3>
                <div className="text-sm text-black/40 dark:text-white/40 mt-2">
                  {relatedPost.category} · {formatDate(relatedPost.date)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
