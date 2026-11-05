---
id: FUR-0019
title: Decide on the redesign pull request #9
type: design
status: blocked
priority: P2
created: 2026-11-05
owner: Furqan
blocked-by: Furqan's decision on the design and the four blog posts it adds
---

## Problem

PR #9 (April 2026, branch `redesign/openai-style`) redesigns the site with
an OpenAI-style top navigation, gradient cards and an editorial layout,
touching 23 files, and adds four blog posts to `content/posts/`. It
predates FUR-0001 and FUR-0012, so it now conflicts in the header, menus,
layout, global CSS and blog post body.

## Research

## Acceptance criteria

- [ ] Furqan decides: land the redesign, land parts of it, or close it
- [ ] If landing: rebased onto `main`, conflicts resolved keeping the iPhone
      Duo safe-area and fold handling, before/after screenshots, CI green
- [ ] Decision on the four blog posts recorded (see FUR-0005)

## Notes
