import type { Metadata } from "next";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readingTime } from "reading-time-estimator";
import Link from "next/link";
import { plugins, remarkRehypeOptions } from "@/utils/mdx";
import { getMarkdownFromSlug, getMarkdownFiles } from "@/utils/file";
import type { Frontmatter } from "@/types";
import { components } from "@/components/mdxComponents";

type Params = {
  slug: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const file = await getMarkdownFromSlug(slugPath);
  if (!file) return {};

  const { frontmatter } = getFrontmatter<Frontmatter>(file.source);
  return {
    title: frontmatter.title ?? "Article",
  };
}

export default async function Post({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const result = await getMarkdownFromSlug(slugPath);
  if (!result) {
    return "The source could not be found!";
  }

  const { source, format } = result;
  const { frontmatter } = getFrontmatter<Frontmatter>(source);
  const reading = readingTime(source, 100).text;

  const options: MDXRemoteOptions = {
    disableImports: true,
    parseFrontmatter: true,
    scope: { readingTime: reading },
    vfileDataIntoScope: "toc",
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions: format === "md" ? remarkRehypeOptions : undefined,
    },
  };

  return (
    <article className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto pt-20 px-4 w-full mb-8">
        <h1 className="font-extrabold text-[clamp(2rem,8vw,3rem)] leading-tight mb-2 text-foreground">
          {frontmatter.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {frontmatter.author && (
            <>
              {" "}
              · by <strong>{frontmatter.author}</strong>
            </>
          )}
          {frontmatter.type && (
            <>
              {" "}
              · <span className="font-medium">{frontmatter.type}</span>
            </>
          )}
          {frontmatter.diet?.includes("Vegan") && (
            <>
              {" "}
              · <span className="text-green-600 font-semibold">🌱 Vegan</span>
            </>
          )}
          {!frontmatter.diet?.includes("Vegan") &&
            frontmatter.diet?.includes("Vegetarian") && (
              <>
                {" "}
                ·{" "}
                <span className="text-orange-500 font-semibold">
                  🥕 Vegetarian
                </span>
              </>
            )}
          {frontmatter.reviewedOn === "PC" && frontmatter.distribution && (
            <>
              {" "}
              ·{" "}
              <span className="font-medium">
                Reviewed on PC ({frontmatter.distribution})
              </span>
            </>
          )}
          {frontmatter.reviewedOn === "Console" &&
            frontmatter.console &&
            frontmatter.distribution && (
              <>
                {" "}
                ·{" "}
                <span className="font-medium">
                  Reviewed on {frontmatter.console} ({frontmatter.distribution})
                </span>
              </>
            )}
          {reading && <> · {reading}</>}
        </p>
      </header>
      <main className="max-w-5xl mx-auto w-full px-4 prose prose-neutral dark:prose-invert mb-20">
        <MDXRemote source={source} options={options} components={components} />
      </main>
      <footer className="max-w-5xl mx-auto w-full px-4 py-8 text-xs text-muted-foreground flex flex-col sm:flex-row gap-3 justify-between mt-auto border-t border-border">
        <span>© {new Date().getFullYear()} Furqan Agwan</span>
      </footer>
    </article>
  );
}

export async function generateStaticParams() {
  const files = getMarkdownFiles();

  return files.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, "").split("/"),
  }));
}
