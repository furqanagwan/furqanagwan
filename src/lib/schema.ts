// JSON-LD structured data schemas for SEO

interface WithContext {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export function generatePersonSchema(): WithContext {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Furqan Agwan",
    url: "https://furqanagwan.com",
    jobTitle: "Cloud & Software Engineer",
    sameAs: [
      "https://github.com/furqanagwan",
      "https://linkedin.com/in/furqanagwan",
    ],
    knowsAbout: [
      "Cloud Computing",
      "Software Engineering",
      "Data Engineering",
      "TypeScript",
      "React",
      "Next.js",
      "AWS",
      "Azure",
    ],
  };
}

export function generateWebsiteSchema(): WithContext {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Furqan Agwan",
    url: "https://furqanagwan.com",
    description:
      "Personal website and blog of Furqan Agwan - Cloud & Software Engineer",
    author: {
      "@type": "Person",
      name: "Furqan Agwan",
    },
  };
}

interface BlogPostingParams {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
}

export function generateBlogPostSchema(post: BlogPostingParams) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://furqanagwan.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Furqan Agwan",
      url: "https://furqanagwan.com",
    },
    publisher: {
      "@type": "Person",
      name: "Furqan Agwan",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://furqanagwan.com/blog/${post.slug}`,
    },
    articleSection: post.category,
  };
}
