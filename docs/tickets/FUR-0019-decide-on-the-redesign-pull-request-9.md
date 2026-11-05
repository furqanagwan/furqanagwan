---
id: FUR-0019
title: Decide on the redesign pull request #9
type: design
status: done
priority: P2
created: 2026-11-05
---

## Problem

PR #9 (April 2026, branch `redesign/openai-style`) replaces the site's
left sidebar with a top navigation bar and overlay menu, adds gradient
category cards and an editorial article layout across 23 files, and adds
four blog posts. It predates FUR-0001 and FUR-0012 and conflicts with both.

## Research

- The site's design reference is openai.com, which uses a collapsible left
  sidebar under a slim top bar on desktop and a full-screen dark slide-in
  menu on mobile. The current site already mirrors that (its layout was
  built from an openai.com clone); the PR's top-nav layout moves away from
  the reference.
- The four posts are placeholders: each says it is sample content to be
  replaced, and two describe first-person experiences (a first engineering
  role, two weeks in Lisbon) that aren't Furqan's. Publishing them would
  put invented personal claims on his site.

## Acceptance criteria

- [x] Decision made: close PR #9 without merging
- [x] Layout: keep the current sidebar layout, which matches openai.com
- [x] Content: don't publish the placeholder posts; the blog keeps its
      empty state until real posts exist (FUR-0005)
- [x] Worthwhile ideas kept as separate tickets: reading time from word
      count (FUR-0023) and editorial article typography (FUR-0024)

## Notes

- Decision taken under Furqan's instruction to make design decisions
  autonomously with openai.com as the reference.
- PR #9 needs closing by someone with GitHub access to PRs.
