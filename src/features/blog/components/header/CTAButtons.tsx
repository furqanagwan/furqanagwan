import Link from "next/link";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface CTAButtonsProps {
  buttons: CTAButton[];
}

export function CTAButtons({ buttons }: CTAButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {buttons.map((button, index) => {
        const isPrimary = button.variant === "primary" || index === 0;

        return (
          <Link
            key={button.label}
            href={button.href}
            target={button.href.startsWith("http") ? "_blank" : undefined}
            rel={
              button.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className={`
              inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-colors
              ${
                isPrimary
                  ? "bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80"
                  : "bg-transparent border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
              }
            `}
          >
            {button.label}
            {button.href.startsWith("http") && (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            )}
          </Link>
        );
      })}
    </div>
  );
}
