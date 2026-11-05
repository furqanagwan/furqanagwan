---
id: FUR-0015
title: Remove no-op brandDomain expression in ExperienceItem
type: bug
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

`src/features/experience/components/ExperienceItem.tsx` passes
`brandDomain={group.website ? undefined : undefined}`, which is always
`undefined`. Either the logo lookup was meant to use the company website
and is silently broken, or the prop is dead code.

## Research

## Acceptance criteria

- [ ] Work out what the logo is meant to use (check `BrandLogo` and how
      qualifications pass `brandDomain`)
- [ ] Either pass the intended value or drop the prop
- [ ] Experience page logos verified on the preview (before/after screenshots)

## Notes
