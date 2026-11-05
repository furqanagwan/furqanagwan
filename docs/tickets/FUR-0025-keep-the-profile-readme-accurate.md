---
id: FUR-0025
title: Keep the profile README accurate
type: docs
status: done
priority: P2
created: 2026-11-05
---

## Problem

README.md is Furqan's GitHub profile page. Its "Latest Blog Posts" section
linked to three posts that don't exist (/blog/career-lessons-tech,
/blog/university, /blog/long-term-investing-stocks all return 404 "Post
Not Found"), and it still called X "Twitter" while the website uses X.

## Research

- GitHub, "Managing your profile README": a public repository named after
  the username with a README.md at the root is shown on the profile; its
  purpose is to tell people about yourself.
  https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Production check: each listed post URL returns the site's 404 page.

## Acceptance criteria

- [x] Dead blog post links removed; a single Blog link added under Let's Connect
- [x] Twitter badge and link renamed to X (x.com), matching the site footer
- [x] No personal details added or changed
- [x] The daily routine re-checks the README every run (links, stack, projects, posts)

## Notes

- When real posts exist (FUR-0005), a "Latest posts" list can come back,
  generated from content/posts so it can't go stale.
