/**
 * Post Writer
 *
 * Writes generated blog posts as MDX files to the content directory.
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { GeneratedPost } from "./types";

// ============================================================================
// MDX Generation
// ============================================================================

interface WriteOptions {
    /** Output directory (relative to project root) */
    directory?: string;
    /** Add AI attribution notice */
    includeAttribution?: boolean;
    /** Mark as draft (featured: false) */
    asDraft?: boolean;
    /** Add specific tag */
    additionalTags?: string[];
}

/**
 * Generate MDX frontmatter
 */
function generateFrontmatter(
    post: GeneratedPost,
    options: WriteOptions,
): string {
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Combine tags, add AI-Generated tag
    const tags = [...new Set([...post.tags, ...(options.additionalTags || []), "AI-Generated"])];

    const frontmatter: Record<string, unknown> = {
        title: post.title,
        description: post.description,
        date,
        tags,
        category: post.category,
        featured: options.asDraft === false, // Default to draft (featured: false)
    };

    // Convert to YAML-like format
    const lines = Object.entries(frontmatter)
        .map(([key, value]) => {
            if (typeof value === "string") {
                // Escape quotes in strings
                return `${key}: "${value.replace(/"/g, '\\"')}"`;
            }
            if (Array.isArray(value)) {
                return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
            }
            if (typeof value === "boolean") {
                return `${key}: ${value}`;
            }
            return `${key}: ${JSON.stringify(value)}`;
        })
        .join("\n");

    return `---\n${lines}\n---`;
}

/**
 * Generate attribution section
 */
function generateAttribution(sources: Array<{ title: string; url: string }>): string {
    if (sources.length === 0) return "";

    const sourcesList = sources
        .map((s) => `- [${s.title}](${s.url})`)
        .join("\n");

    return `
---

*This post was created with AI assistance based on current news and trends.*

## Sources

${sourcesList}
`;
}

/**
 * Generate the full MDX content
 */
function generateMDX(post: GeneratedPost, options: WriteOptions): string {
    const frontmatter = generateFrontmatter(post, options);
    const attribution = options.includeAttribution !== false
        ? generateAttribution(post.sources)
        : "";

    return `${frontmatter}

${post.content}
${attribution}
`;
}

// ============================================================================
// File Writing
// ============================================================================

/**
 * Write a generated post to the content directory
 * Returns the path to the created file
 */
export function writePost(
    post: GeneratedPost,
    projectRoot: string,
    options: WriteOptions = {},
): string {
    const directory = options.directory || "content/posts";
    const fullDir = join(projectRoot, directory);

    // Ensure directory exists
    if (!existsSync(fullDir)) {
        mkdirSync(fullDir, { recursive: true });
    }

    // Generate filename
    const filename = `${post.slug}.mdx`;
    const filepath = join(fullDir, filename);

    // Check for existing file
    if (existsSync(filepath)) {
        // Add timestamp to avoid collision
        const timestamp = Date.now();
        const newFilename = `${post.slug}-${timestamp}.mdx`;
        const newFilepath = join(fullDir, newFilename);
        console.log(`[PostWriter] File exists, using: ${newFilename}`);

        const content = generateMDX(post, options);
        writeFileSync(newFilepath, content, "utf-8");
        console.log(`[PostWriter] Created: ${newFilepath}`);
        return newFilepath;
    }

    // Write the file
    const content = generateMDX(post, options);
    writeFileSync(filepath, content, "utf-8");

    console.log(`[PostWriter] Created: ${filepath}`);
    return filepath;
}

/**
 * Preview the generated MDX without writing to disk
 * Returns the content that would be written
 */
export function previewPost(
    post: GeneratedPost,
    options: WriteOptions = {},
): { content: string; filename: string } {
    const content = generateMDX(post, options);
    const filename = `${post.slug}.mdx`;

    return { content, filename };
}
