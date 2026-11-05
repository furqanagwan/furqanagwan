import type { Metadata } from "next";
import { SITE_LOCALE, SITE_NAME, SITE_RSS_FEED_PATH } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
};

export function siteAlternates(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    types: { "application/rss+xml": SITE_RSS_FEED_PATH },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: siteAlternates(path),
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      ...openGraph,
    } as NonNullable<Metadata["openGraph"]>,
  };
}
