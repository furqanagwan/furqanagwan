---
id: FUR-0032
title: Add an Apple touch icon and web app manifest icons
type: feature
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

The only icon is a 64px `favicon.ico`. iPhone (including iPhone Duo)
home-screen bookmarks fall back to a screenshot, and the web app manifest
lists no PNG icons, so installed shortcuts look broken.

## Research


## Acceptance criteria

- [ ] Research recorded: Apple HIG app icons / web clip guidance, Next.js
      `icon` and `apple-icon` file conventions, MDN web app manifest icons
- [ ] `apple-icon` (180x180) and manifest icons (192, 512, maskable) in the
      site's black/white style
- [ ] Rendered HTML includes the icon links; manifest validates

## Notes

