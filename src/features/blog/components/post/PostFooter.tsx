import Link from "next/link";

interface PostFooterProps {
  tags: string[];
}

export function PostFooter({ tags }: PostFooterProps) {
  return (
    <section className="max-w-[1440px] w-full mx-auto px-6 md:px-8">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <div className="bg-black/[0.03] dark:bg-white/[0.05] rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Tags - Pill style */}
              <div className="flex-1">
                <h3 className="text-[13px] font-medium text-black/50 dark:text-white/50 mb-3">
                  Filed under
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tags=${tag}`}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[13px] font-medium bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author - Simple text */}
              <div className="md:text-right">
                <h3 className="text-[13px] font-medium text-black/50 dark:text-white/50 mb-1">
                  Author
                </h3>
                <span className="text-[14px] text-black dark:text-white">
                  Furqan Agwan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
