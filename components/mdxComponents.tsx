import Link from "next/link";
import type { MDXComponents } from "next-mdx-remote-client";

// Mapping for custom callout types
const calloutTypeStyles: Record<string, string> = {
  note: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200",
  tip: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200",
  warning:
    "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600 text-yellow-900 dark:text-yellow-100",
  danger:
    "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200",
  info: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700 text-sky-800 dark:text-sky-200",
};

export const components: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold text-foreground" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mt-8 mb-4 text-3xl font-semibold text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-3 text-2xl font-medium text-foreground" {...props} />
  ),
  p: (props) => (
    <p
      className="mb-4 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  a: ({ href = "#", children, ...rest }) => (
    <Link
      href={href}
      className="text-primary underline hover:text-primary/80"
      {...rest}
    >
      {children}
    </Link>
  ),
  ul: (props) => (
    <ul
      className="mb-4 list-disc list-inside space-y-2 text-muted-foreground"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-decimal list-inside space-y-2 text-muted-foreground"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props) => <em className="italic text-muted-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  img: ({ alt = "", ...props }) => (
    <img
      className="my-6 mx-auto rounded-md shadow-md"
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  ),
  figure: (props) => <figure className="my-6 text-center" {...props} />,
  figcaption: (props) => (
    <figcaption
      className="mt-2 text-sm text-muted-foreground italic"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-white"
      {...props}
    />
  ),
  code: ({ className = "", ...props }) => (
    <code
      className={`rounded px-1 py-0.5 font-mono text-sm text-pink-600 dark:text-pink-400 bg-muted ${className}`}
      {...props}
    />
  ),
  // This is the wrapper around :::containers
  admonition: ({ "data-type": type, "data-title": title, ...props }) => {
    const style =
      calloutTypeStyles[type?.toLowerCase() || "note"] ||
      calloutTypeStyles.note;

    return (
      <div
        className={`not-prose my-6 border-l-4 px-4 py-3 rounded-md ${style}`}
        {...props}
      >
        {title && <div className="font-semibold mb-2">{title}</div>}
        <div>{props.children}</div>
      </div>
    );
  },
  wrapper: ({ children }) => (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </div>
  ),
};
