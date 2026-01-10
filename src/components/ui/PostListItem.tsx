import Link from "next/link";

interface PostListItemProps {
  title: string;
  description?: string;
  href?: string;
  category?: string;
  code?: string;
  date?: string;
  className?: string;
}

export default function PostListItem({
  title,
  description,
  href,
  category,
  code,
  date,
  className,
}: PostListItemProps) {
  const wrapperClasses = `group block outline-none border-b border-black/15 dark:border-white/15 last:border-b-0 ${href ? "hover:border-black dark:hover:border-white cursor-pointer" : ""} transition-colors ${className || ""}`;

  const content = (
    <article className="py-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8">
      {/* Meta Column (Category & Date) - stacked on desktop */}
      <div className="flex flex-row md:flex-col gap-2 md:gap-0.5">
        {category && (
          <span className="text-[13px] font-medium text-black dark:text-white">
            {category}
          </span>
        )}

        {code && (
          <span className="text-[13px] text-black/40 dark:text-white/40">
            {code}
          </span>
        )}

        {date && (
          <span className="text-[13px] text-black/40 dark:text-white/40">
            {date}
          </span>
        )}
      </div>

      {/* Title & Description Column */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base md:text-[17px] font-medium leading-tight tracking-[-0.2px] text-black dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-[14px] leading-relaxed text-black/60 dark:text-white/60">
            {description}
          </p>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClasses}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClasses}>{content}</div>;
}
