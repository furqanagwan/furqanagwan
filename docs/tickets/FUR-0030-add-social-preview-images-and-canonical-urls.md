---
id: FUR-0030
title: Add social preview images and canonical URLs
type: feature
status: backlog
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


## Acceptance criteria

- [ ] Research recorded: Next.js Metadata API (`metadataBase`,
      `alternates.canonical`, `opengraph-image` / `twitter-image` file
      conventions, `ImageResponse`), Open Graph protocol, X card docs
- [ ] Site-wide preview image in the openai.com style (black/white,
      Inter), 1200x630
- [ ] Per-page canonical URLs; per-post preview images generated from
      the post title
- [ ] Verified in the rendered HTML of the preview deployment

## Notes

