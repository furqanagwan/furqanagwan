import fs from "fs";
import path from "path";

// --- Types ---
export type Metadata = {
  title: string;
  description: string;
  date: string;
  slug?: string;
  [key: string]: any;
};

export type MDXFileData = {
  metadata: Metadata;
  content: string;
  slug: string; // always posts-relative, no extension, e.g. "recipes/pancakes"
  type: string;
  subType?: string;
  url: string; // always `/${slug}`
};

// --- Helpers ---

function getMDXFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getMDXFiles(filePath));
    } else if (file.endsWith(".mdx")) {
      results.push(filePath);
    }
  }
  return results;
}

function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error("No frontmatter found");
  const frontmatter = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontmatterLines = frontmatter.trim().split("\n");
  const metadata: Partial<Metadata> = {};
  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ");
    let value = values.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    if (key && value) {
      metadata[key.trim()] = value;
    }
  });
  return { metadata: metadata as Metadata, content };
}

function getMDXData(
  dir: string,
  type: string,
  subType?: string,
): MDXFileData[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((filePath) => {
    const { metadata, content } = parseFrontmatter(
      fs.readFileSync(filePath, "utf-8"),
    );
    // always get posts-relative path, e.g. "reviews/movies/barbie-2023"
    const relSlug = path
      .relative(path.join(process.cwd(), "posts"), filePath)
      .replace(/\\/g, "/")
      .replace(/\.mdx$/, "");
    const slug = metadata.slug || relSlug;
    const url = `/${slug}`;
    return { metadata, content, slug, type, subType, url };
  });
}

// --- Main Getters ---

export function getReviews(): MDXFileData[] {
  const reviews: MDXFileData[] = [];
  for (const subType of ["movies", "games", "music"]) {
    const dir = path.join(process.cwd(), "posts", "reviews", subType);
    reviews.push(...getMDXData(dir, "reviews", subType));
  }
  return reviews;
}

export function getRecipes(): MDXFileData[] {
  const dir = path.join(process.cwd(), "posts", "recipes");
  return getMDXData(dir, "recipes");
}

export function getHolidays(): MDXFileData[] {
  const dir = path.join(process.cwd(), "posts", "holidays");
  return getMDXData(dir, "holidays");
}

export function getFashion(): MDXFileData[] {
  const dir = path.join(process.cwd(), "posts", "fashion");
  return getMDXData(dir, "fashion");
}

export function getFitness(): MDXFileData[] {
  const dir = path.join(process.cwd(), "posts", "fitness");
  return getMDXData(dir, "fitness");
}

export function getPolitics(): MDXFileData[] {
  const dir = path.join(process.cwd(), "posts", "politics");
  return getMDXData(dir, "politics");
}

export function getAllPosts(): MDXFileData[] {
  return [
    ...getReviews(),
    ...getRecipes(),
    ...getHolidays(),
    ...getFashion(),
    ...getFitness(),
    ...getPolitics(),
  ];
}
