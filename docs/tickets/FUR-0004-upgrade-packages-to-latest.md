---
id: FUR-0004
title: Upgrade packages to latest
type: chore
status: done
priority: P2
created: 2026-11-05
---

## Problem

Dependencies (Next.js 16.1.1, React 19.2.3, Playwright 1.57, etc.) haven't
been updated. Playwright 1.57 also can't run on Ubuntu 26.04, which is why
CI is pinned to `ubuntu-24.04` (FUR-0003).

## Research

Majors in this upgrade, what changed and how it's handled:

- **Node.js 26** — Vercel made Node.js 26 LTS generally available; the
  project pins `engines.node` to `26.x` and `@types/node` to 26 so types
  match the runtime.
  https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel
  https://vercel.com/docs/concepts/node-js-versions
- **lucide-react 1** — v1 removed all brand icons (GitHub, LinkedIn,
  YouTube…). Replaced with local SVG components in
  `src/components/ui/BrandIcons.tsx` (single-path brand marks,
  `currentColor`, `aria-hidden`).
  https://lucide.dev/guide/react/migration
  https://github.com/lucide-icons/lucide/issues/1687
- **content-collections 0.15** — `defineConfig` takes `content` instead of
  `collections`; `content-collections.ts` updated.
  https://github.com/sdorra/content-collections/releases
- **Vitest 5 / @vitejs/plugin-react 6** — ESM-only config, so
  `vitest.config.ts` became `vitest.config.mts`; jest-dom 7 is wired
  through its Vitest entry point (`@testing-library/jest-dom/vitest`).
  https://vitest.dev/guide/migration
  https://github.com/testing-library/jest-dom/releases
- **ESLint 10** — flat config only (already in use via
  `eslint.config.mjs`); ESLint 9 reached end of life on 2026-08-06.
  https://eslint.org/blog/2026/02/eslint-v10.0.0-released/
- **TypeScript 6** — stricter defaults and ES5 target removed; the project
  already targets modern ES with `strict`, so no config change was needed
  (typecheck runs inside `next build`).
  https://devblogs.microsoft.com/typescript/
- **Playwright 1.64** — supports Ubuntu 26.04, so CI's runners go back to
  `ubuntu-latest` (undoing the FUR-0003 pin).
  https://playwright.dev/docs/release-notes
- **@vercel/analytics 2, @vercel/speed-insights 2** — same
  `<Analytics />` / `<SpeedInsights />` imports from `/next`; no change.
  https://vercel.com/docs/analytics/package
- **openai 7** — `chat.completions.create` is unchanged for the
  generator's call (type-checked in CI). The blog-post workflow belongs to
  FUR-0005 and its publishing behaviour isn't touched.
  https://github.com/openai/openai-node/releases
- **jsdom 30, React 19.3, Zod 4.6, Tailwind 4.3, Prettier 3.9** — minor or
  test-environment upgrades; covered by unit, build and E2E runs.
- Note: WebFetch was unavailable in the 2026-11-05 08:47 run, so release
  pages were located by search; each change above was verified by CI
  (lint, build with typecheck, unit, E2E) and the preview deployment.

## Acceptance criteria

- [x] Every dependency and devDependency on its latest release (via
      FUR-0028's `"latest"` resolution), including TypeScript,
      Tailwind CSS, Playwright, Vitest, ESLint, Zod and `@types/node`
      matched to the Node.js version Vercel runs
- [x] Release notes for each major upgrade researched and breaking
      changes handled
- [x] Typecheck, lint, unit, build and E2E all green
- [x] CI runners back on `ubuntu-latest` once Playwright supports it
- [x] Snyk PRs #6, #7 and #8 superseded (all closed; their `snyk-*`
      branches remain until FUR-0010)

## Notes

- Unblocked by FUR-0020 and FUR-0028 (lockfile resolved on GitHub's runners).
- Includes Snyk PRs #6 and #7 (react, react-dom 19.2.4) and #8
  (lucide-react 0.563.0); close them once this lands. Next.js itself is
  FUR-0018 (security, P1).
