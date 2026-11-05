import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string().optional(),
    heroVideo: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
    ctaButtons: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          variant: z.enum(["primary", "secondary"]).optional(),
        }),
      )
      .optional(),
    headerCodeSnippet: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      slug: document._meta.path.split("/").pop(),
      readTime: "5 min read",
      mdx,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    technologies: z.array(z.string()),
    category: z.string(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().default(false),
    date: z.string(),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      id: document._meta.path,
      mdx,
    };
  },
});

const experiences = defineCollection({
  name: "experiences",
  directory: "content/experiences",
  include: "**/*.mdx",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional().nullable(),
    description: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()),
    image: z.string().optional(),
    clients: z
      .array(
        z.object({
          name: z.string(),
          domain: z.string(),
          location: z.string(),
        }),
      )
      .optional(),
    website: z.string().optional(),
    current: z.boolean().default(false),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      id: document._meta.path,
      mdx,
    };
  },
});

const qualifications = defineCollection({
  name: "qualifications",
  directory: "content/qualifications",
  include: "**/*.mdx",
  schema: z.object({
    type: z.enum([
      "education",
      "certification",
      "award",
      "Education",
      "Certification",
      "Award",
    ]),
    title: z.string(),
    institution: z.string(),
    date: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    brandDomain: z.string().optional(),
    useLocalLogo: z.boolean().default(false),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const typeMap: Record<string, string> = {
      education: "Education",
      certification: "Certification",
      award: "Award",
    };
    const type = typeMap[document.type.toLowerCase()] || document.type;

    return {
      ...document,
      type,
      id: document._meta.path,
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts, projects, experiences, qualifications],
});
