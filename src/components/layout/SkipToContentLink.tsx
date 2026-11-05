import { MAIN_CONTENT_ID } from "./landmarkIds";

export function SkipToContentLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-[calc(0.75rem+var(--safe-top))] focus:left-[max(0.75rem,var(--safe-left))] focus:z-[200] focus:rounded-full focus:bg-black focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-black"
    >
      Skip to content
    </a>
  );
}
