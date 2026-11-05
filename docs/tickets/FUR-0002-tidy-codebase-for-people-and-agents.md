---
id: FUR-0002
title: Tidy codebase for people and agents
type: chore
status: done
priority: P2
created: 2026-11-05
---

## Problem

Navigation links were defined twice (sidebar and mobile menu), AGENTS.md
described folders and commands that didn't exist, and ~4.7 MB of debugging
screenshots were committed.

## Research

## Acceptance criteria

- [x] One navigation config (`src/components/layout/navigation.ts`) with unit tests
- [x] AGENTS.md has an accurate folder map, where-does-code-go table and Bun commands
- [x] Stale `npm` / `shared/` references fixed in `.agent/rules`
- [x] `.playwright-mcp/` screenshots removed and ignored

## Notes

- Shipped in the FUR-0002 commit.
