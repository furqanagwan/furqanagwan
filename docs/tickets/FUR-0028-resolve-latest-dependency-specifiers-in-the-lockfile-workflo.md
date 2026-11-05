---
id: FUR-0028
title: Resolve latest dependency specifiers in the lockfile workflow
type: ci
status: done
priority: P1
created: 2026-11-05
---

## Problem

Upgrading dependencies needs the newest version of each package, but the
automation environment can't reach the npm registry. The lockfile workflow
(FUR-0020) runs on GitHub's runners, which can.

## Research

- Bun, `bun update`: dist-tags such as `"latest"` are left as written by a
  plain update, but `--latest` rewrites them to a range of the same style on
  the newest version; it can target named packages.
  https://bun.sh/docs/pm/cli/update

## Acceptance criteria

- [x] When `package.json` on a non-main branch has any dependency set to
      `"latest"`, the lockfile workflow runs `bun install` then
      `bun update --latest <those names>` (Bun errors on names not yet in
      `bun.lock`, hence the install first), which rewrites them to real
      version ranges; it then commits `package.json` and `bun.lock` and
      dispatches CI
- [x] Branches without `"latest"` specifiers behave exactly as before
- [x] Documented in AGENTS.md (Dependencies section)

## Notes

- Exercised end to end by FUR-0004.

