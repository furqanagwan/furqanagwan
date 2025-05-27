// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, createElement, isValidElement } from "react";
import { codeToHtml } from "shiki";
import React from "react";

// Table: Only if you use custom MDX tables (optional)
function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} className="p-2 text-left">
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="p-2 text-left">
          {cell}
        </td>
      ))}
    </tr>
  ));
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Custom Link (internal, anchor, external)
function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  if (href.startsWith("/")) {
    const { children, ...rest } = props;
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" />;
}

// Custom Image
function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={props.alt}
      className="rounded-xl my-6 shadow-lg mx-auto max-w-full"
      {...props}
    />
  );
}

// Syntax Highlighted Code Block
async function Pre({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === "code",
  ) as React.ReactElement<HTMLPreElement> | undefined;
  const className = codeElement?.props?.className ?? "";
  const isCodeBlock =
    typeof className === "string" && className.startsWith("language-");
  if (isCodeBlock) {
    const lang = className.split(" ")[0]?.split("-")[1] ?? "";
    if (!lang) {
      return <code {...props}>{children}</code>;
    }
    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        dark: "vesper",
        light: "vitesse-light",
      },
    });
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <pre {...props}>{children}</pre>;
}

// Heading Slugify (for anchors)
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Heading with Hover Anchor
function createHeading(level: number) {
  const HeadingComponent = (
    props: React.HTMLAttributes<HTMLHeadingElement>,
  ) => {
    // Always support all props!
    const childrenString = Children.toArray(props.children).join("");
    const slug = slugify(childrenString);

    // style = Example: "# Heading" = big, bold, white, no green
    return createElement(
      `h${level}`,
      {
        id: slug,
        className: [
          // Tailwind: white text, bold, spacing like example
          "group font-bold text-white",
          level === 1
            ? "text-4xl mb-6 mt-10"
            : level === 2
              ? "text-3xl mb-5 mt-8"
              : level === 3
                ? "text-2xl mb-4 mt-6"
                : level === 4
                  ? "text-xl mb-3 mt-6"
                  : "mb-2 mt-6",
          props.className ?? "",
        ].join(" "),
        ...props,
      },
      [
        createElement(
          "a",
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className:
              "anchor mr-2 opacity-0 group-hover:opacity-100 transition-opacity",
            "aria-label": `Link to this section`,
            tabIndex: -1,
          },
          "#",
        ),
        props.children,
      ],
    );
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

// Main MDX mapping export
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    a: CustomLink,
    img: CustomImage,
    pre: Pre,
    Table,
    ...components,
  };
}
