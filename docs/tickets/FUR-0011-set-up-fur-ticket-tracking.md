---
id: FUR-0011
title: Set up FUR ticket tracking
type: docs
status: done
priority: P2
created: 2026-11-05
---

## Problem

Work wasn't tracked anywhere, so there was no backlog, no history of why
changes were made, and no shared convention for branches and commits.

## Research

- GitHub, "About merge methods on GitHub": squash merging turns a branch's
  commits into one commit on the default branch, giving a clear history.
  Caveats: per-commit timing is lost, and branches must not be reused after
  squashing (old commits reappear) — hence one short-lived branch per ticket.
  https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github
- Tim Pope, "A Note About Git Commit Messages": short summary line, blank
  line, then a body explaining what and why — the shape used for the
  squashed commit / PR description.
  https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
- Issue-key prefixes (`KEY-123`) in branch names and commit titles follow the
  common tracker convention so tools and people can link work to tickets.

## Acceptance criteria

- [x] `docs/tickets/` with one Markdown file per ticket and a conventions README
- [x] `FUR-0001`-style IDs that only increase; `bun run ticket:new` and `bun run ticket:list`
- [x] Branch = ticket ID in capitals; commits and PR titles start with the ID
- [x] Past work backfilled (FUR-0001 to FUR-0003) and known issues filed
- [x] AGENTS.md documents tickets and the no-comments rule
- [x] Research-first, squash-merge, sole-author and PR description rules documented

## Notes

- Unit tests: `tests/unit/scripts/ticket.test.ts`.
