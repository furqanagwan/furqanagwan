import fs from "fs";
import path from "path";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import type { Post, Frontmatter } from "@/types";
import { getMarkdownExtension } from ".";

export const RE = /\.mdx?$/;

/**
 * Recursively walk through the 'data' directory to collect all .mdx/.md files.
 */
export const getMarkdownFiles = (): string[] => {
  const walkDir = (dir: string): string[] =>
    fs.readdirSync(dir).flatMap((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) return walkDir(fullPath);
      if (RE.test(file)) {
        return [path.relative(path.join(process.cwd(), "content"), fullPath)];
      }
      return [];
    });

  return walkDir(path.join(process.cwd(), "content"));
};

/**
 * Reads a file from the data folder asynchronously.
 */
export const getSource = async (
  filename: string,
): Promise<string | undefined> => {
  const sourcePath = path.join(process.cwd(), "content", filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

/**
 * Reads a file from the data folder synchronously.
 */
export const getSourceSync = (filename: string): string | undefined => {
  const sourcePath = path.join(process.cwd(), "content", filename);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
};

/**
 * Gets a markdown source + format from a hyphenated slug like 'recipes-pancakes'
 */
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
  const fullPath = path.join(process.cwd(), "content", filename);
  if (!fs.existsSync(fullPath)) return;

  const source = await getSource(filename);
  if (!source) return;

  return {
    source,
    format: getMarkdownExtension(filename as `${string}.md` | `${string}.mdx`),
  };
};

/**
 * Parses frontmatter from a given markdown file.
 * Validates presence of required fields and returns typed Post data.
 * Adds category/subcategory info from path for filtering.
 */
export const getPostInformation = (
  filename: string,
):
  | (Post & {
      category?: string;
      subcategory?: string;
      path: string;
    })
  | undefined => {
  const source = getSourceSync(filename);
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
