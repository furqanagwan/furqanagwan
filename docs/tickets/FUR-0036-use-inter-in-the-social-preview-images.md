---
id: FUR-0036
title: Use Inter in the social preview images
type: design
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

The social preview images from FUR-0030 (`src/app/opengraph-image.tsx`,
`src/app/blog/[slug]/opengraph-image.tsx`) render with `next/og`'s bundled
default font, not Inter, so the cards don't match the site's typography.

## Research

## Acceptance criteria

- [ ] Research recorded: `ImageResponse` font loading (`fonts` option,
      supported formats — TTF/OTF/WOFF, not WOFF2), bundle size limits
- [ ] Inter (regular and medium/bold) loaded from a local font file at
      build time, no runtime network fetch
- [ ] Both preview images use it; checked on the preview deployment

## Notes
