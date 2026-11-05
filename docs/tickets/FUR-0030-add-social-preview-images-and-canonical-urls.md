---
id: FUR-0030
title: Add social preview images and canonical URLs
type: feature
status: done
priority: P2
created: 2026-11-05
---

## Problem

Sharing furqanagwan.com shows no image: metadata asks for a
`summary_large_image` Twitter card and Open Graph data but provides no
`og:image` or `twitter:image`. There's also no `metadataBase` or canonical
URL, so Next.js can't produce absolute URLs and search engines get no
canonical signal; and blog posts have no per-post preview image.

## Research

- Next.js `opengraph-image` / `twitter-image` file conventions: a route
  segment file exporting a default `ImageResponse` plus `alt`, `size` and
  `contentType`; Next adds `og:image` / `twitter:image` (with type, width,
  height, alt) to that segment and its children, and generates the image at
  build time unless it uses request data. In Next 16 `params` is a promise.
  https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- `ImageResponse` (`next/og`, Satori): flexbox layout only, every element
  with more than one child needs `display: flex`; 1200x630 is the common
  card size.
  https://nextjs.org/docs/app/api-reference/functions/image-response
- Metadata API: `metadataBase` turns relative URLs into absolute ones;
  `title.template` / `title.absolute`; `alternates.canonical`. Metadata
  objects are merged **shallowly** from layout to page, so a page that sets
  `openGraph`, `twitter` or `alternates` replaces the layout's whole object.
  A page-level `alternates: { canonical }` therefore drops the layout's RSS
  `alternates.types`, and a page without its own `openGraph` reports the
  home page as its `og:url` and title. Each page needs the full objects.
  https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Open Graph protocol: required `og:title`, `og:type`, `og:image`,
  `og:url`; `og:locale` uses `language_TERRITORY` (`en_GB`).
  https://ogp.me/
- X cards: `summary_large_image` uses `twitter:title`, `twitter:description`
  and `twitter:image`, falling back to Open Graph; 2:1-ish large images
  (1200x630 works).
  https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image
- Note: WebFetch was unavailable in the 2026-11-05 08:47 run, so the pages
  above were located by search and the details checked against the
  rendered HTML of the preview deployment rather than re-read.


## Acceptance criteria

- [x] Research recorded: Next.js Metadata API (`metadataBase`,
      `alternates.canonical`, `opengraph-image` / `twitter-image` file
      conventions, `ImageResponse`), Open Graph protocol, X card docs
- [x] Site-wide preview image in the openai.com style (black/white,
      1200x630 (Inter in the image itself is follow-up FUR-0036)
- [x] Per-page canonical URLs; per-post preview images generated from
      the post title
- [x] Verified in the rendered HTML of the preview deployment

## Notes

- Site constants (URL, name, tagline, locale, feed path, X handle) live in
  `src/lib/site.ts`; `src/lib/metadata.ts` builds each page's metadata so
  every page gets its own canonical URL, `og:url`, `og:title`, X card and
  keeps the RSS `<link rel="alternate">`.
- The first preview (baf0380) was checked and showed the shallow-merge
  problem on `/projects`: no RSS link, `og:url` = home page,
  `og:title` = "Furqan Agwan". Fixed with `buildPageMetadata` and covered by
  `tests/seo.spec.ts` and `tests/unit/lib/metadata.test.ts`.

- Setting `twitter` on a page dropped the root `twitter-image` (CI caught
  it: no `twitter:image` on /projects). Pages therefore leave `twitter` to
  the layout, which now sets only the card type and creator so X falls
  back to each page's Open Graph title, description and image.
- The same shallow merge drops a parent segment's file-based `og:image`
  when a page sets its own `openGraph`, so each top-level route
  (`blog`, `contact`, `experiences`, `projects`, `qualifications`) re-exports
  the root `opengraph-image` in its own segment, the documented way to
  attach file-based images to a segment.
