import { MetadataRoute } from "next";
import { allPosts } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://furqanagwan.com";

  // Static pages
  const staticPages = [
    "",
    "/experiences",
    "/qualifications",
    "/projects",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog posts
  const blogPosts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts];
}
