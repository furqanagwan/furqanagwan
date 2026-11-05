---
id: FUR-0005
title: Blog has no posts; AI post workflow failing
type: bug
status: blocked
priority: P2
created: 2026-11-05
owner: Furqan
blocked-by: needs a decision and the OPENAI_API_KEY repository secret
---

## Problem

`content/posts/` doesn't exist, so /blog shows no posts and the footer's
Blog column is empty. The weekly "Generate AI Blog Post" workflow, which
writes posts there, has failed every run since at least May 2026. The
script exits early when no AI API key is set, so the likely cause is a
missing or expired `OPENAI_API_KEY` secret (logs have expired, so this
isn't confirmed).

## Research

## Acceptance criteria

- [ ] Furqan decides whether AI-written posts should appear on the site
- [ ] If yes: secret set and the workflow runs green; if no: workflow removed or disabled
- [ ] Blog shows posts, or a deliberate empty state

## Notes

- Agents must not write blog content or change secrets for this ticket.
