import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional(),
  }),
  transform: async (post, ctx) => {
    const full = post._meta.path ?? "";
    const parts = full.split("/");
    const category = post.category ?? parts[2] ?? "uncategorized";
    const filename = parts.at(-1) ?? "";
    const slug = filename.replace(/\.mdx?$/i, "");

    const mdxCode = await compileMDX(ctx, {
      _meta: post._meta,
      content: post.content,
    });

    return {
      ...post,
      category,
      slug,
      mdxCode,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
