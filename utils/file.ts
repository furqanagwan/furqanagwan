import { getFrontmatter } from "next-mdx-remote-client/utils";
import type { Post, Frontmatter } from "@/types";
import { getMarkdownExtension } from ".";
import { getRemoteMarkdownFiles, getRemoteSource } from "./remoteFile";

export const RE = /\.mdx?$/;

export const getMarkdownFiles = async (): Promise<string[]> => {
  return getRemoteMarkdownFiles();
};

export const getSource = async (
  filename: string,
): Promise<string | undefined> => {
  return getRemoteSource(filename);
};

export const getMarkdownFromSlug = async (
  slug: string,
): Promise<
  | {
      source: string;
      format: "md" | "mdx";
    }
  | undefined
> => {
  const filename = `${slug}.mdx`;
  const source = await getSource(filename);
  if (!source) return;
  return {
    source,
    format: getMarkdownExtension(filename as `${string}.md` | `${string}.mdx`),
  };
};

export const getPostInformation = async (
  filename: string,
): Promise<
  | (Post & {
      category?: string;
      subcategory?: string;
      path: string;
    })
  | undefined
> => {
  const source = await getSource(filename);
  if (!source) return;

  try {
    const { frontmatter } = getFrontmatter<Frontmatter>(source);

    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`Skipping invalid post: ${filename}`, frontmatter);
      return;
    }

    // Determine category/subcategory from file path
    const pathParts = filename.replace(/\\/g, "/").split("/");
    let category, subcategory;
    if (pathParts.length >= 2) {
      category = pathParts[0];
      subcategory =
        pathParts[1] && !pathParts[1].endsWith(".mdx")
          ? pathParts[1]
          : undefined;
    }

    const post: Post & {
      category?: string;
      subcategory?: string;
      path: string;
    } = {
      ...frontmatter,
      slug: filename.replace(/\.mdx?$/, ""),
      category,
      subcategory,
      path: filename,
    };

    return post;
  } catch (err) {
    console.warn(`Skipping invalid post: ${filename}`, err);
    return;
  }
};
