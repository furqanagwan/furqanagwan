import { describe, expect, it } from "vitest";
import { buildPageMetadata, siteAlternates } from "@/lib/metadata";

describe("siteAlternates", () => {
  it("keeps the RSS feed link alongside the page's canonical URL", () => {
    expect(siteAlternates("/projects")).toEqual({
      canonical: "/projects",
      types: { "application/rss+xml": "/feed.xml" },
    });
  });
});

describe("buildPageMetadata", () => {
  const metadata = buildPageMetadata({
    title: "Projects",
    description: "Things I've built",
    path: "/projects",
  });

  it("uses the page's own title, description and canonical URL", () => {
    expect(metadata.title).toBe("Projects");
    expect(metadata.description).toBe("Things I've built");
    expect(metadata.alternates?.canonical).toBe("/projects");
  });

  it("gives every page its own Open Graph URL and title with the site defaults", () => {
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      locale: "en_GB",
      siteName: "Furqan Agwan",
      url: "/projects",
      title: "Projects",
      description: "Things I've built",
    });
  });

  it("leaves the X card to the layout so its preview image is kept", () => {
    expect(metadata.twitter).toBeUndefined();
  });

  it("lets a page extend its Open Graph data", () => {
    const article = buildPageMetadata({
      title: "A post",
      description: "About something",
      path: "/blog/a-post",
      openGraph: { type: "article", publishedTime: "2026-01-01" },
    });

    expect(article.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-01-01",
      url: "/blog/a-post",
    });
  });
});
