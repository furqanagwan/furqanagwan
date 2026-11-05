---
id: FUR-0034
title: Render components on the server where they don't need the browser
type: perf
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

25 components are marked `"use client"`, including some that look purely
presentational (e.g. `Separator`, `CategoryPill`, `BrandLogo`). Every
client component ships JavaScript to the browser and can't render on the
server alone. The project rule is "push 'use client' as deep as possible".

## Research


## Acceptance criteria

- [ ] Research recorded: Next.js Server and Client Components guidance
      (when a component needs to be a client component; composition patterns)
- [ ] Each client component reviewed; ones that don't use state, effects,
      event handlers or browser APIs become server components
- [ ] Interactive parts split into small client leaves where possible
- [ ] Before/after client JavaScript size from the build output; E2E green

## Notes

