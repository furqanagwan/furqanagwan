---
id: FUR-0029
title: Enforce strict TypeScript conventions
type: chore
status: done
priority: P2
created: 2026-11-05
---

## Problem

TypeScript already runs with `strict` and `noUncheckedIndexedAccess`, and
the code has no `any`, `@ts-ignore` or non-null assertions. But the
conventions aren't enforced:

- ~~CI never runs `tsc`~~ (fixed in FUR-0014).
- ESLint uses `eslint-config-next/typescript` (typescript-eslint's basic
  recommended rules), not the type-aware rule sets that catch unsafe
  `any` flows, floating promises, unnecessary conditions and inconsistent
  type imports.
- Useful compiler checks are off: `noImplicitReturns`,
  `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`,
  `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`,
  `verbatimModuleSyntax`. `allowJs` is on although the project is
  TypeScript-only.

## Research

Scope was split: this ticket covers the compiler options, `allowJs` and the
AGENTS.md conventions; the type-checked ESLint configs moved to
[FUR-0044](FUR-0044-lint-with-typescript-eslint-s-type-checked-strict-and-stylis.md)
so each merge stays reviewable.

The project is on TypeScript 6. Option behaviour below is from the
[TSConfig reference](https://www.typescriptlang.org/tsconfig/) and the
TypeScript 6.0 compiler's own `tsc --all` descriptions:

- [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig/#noImplicitReturns)
  — "error reporting for codepaths that do not explicitly return in a
  function". Enabled: no current violations.
- [`noFallthroughCasesInSwitch`](https://www.typescriptlang.org/tsconfig/#noFallthroughCasesInSwitch)
  — errors on non-empty `case` clauses that fall through. Enabled: the two
  `switch` statements (AI provider and news source selection) all return.
- [`noUnusedLocals`](https://www.typescriptlang.org/tsconfig/#noUnusedLocals) /
  [`noUnusedParameters`](https://www.typescriptlang.org/tsconfig/#noUnusedParameters)
  — errors when a local or parameter isn't read. Enabled: two unused
  default `React` imports (ShareButton, VideoPlayer) were removed.
- [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax)
  — "Do not transform or elide any imports or exports not marked as
  type-only". Anything without `type` stays in the output, so type-only
  imports must say so. It supersedes `isolatedModules`' import checks and
  matches how SWC (Next.js) and Bun strip types file by file. Six imports
  were fixed (`Post`, `ThemeProviderProps`, `ReactNode`, `MetadataRoute`);
  `import { type X }` became `import type { X }` so no empty side-effect
  import is left behind.
- [`allowJs`](https://www.typescriptlang.org/tsconfig/#allowJs) — "Allow
  JavaScript files to be a part of your program". Turned off: the only JS
  files are `eslint.config.mjs` and `postcss.config.mjs`, which `include`
  never matched. CI's `next build` log is checked to confirm Next.js does
  not rewrite the value.

Left off, with reasons:

- [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes)
  — "Interpret optional property types as written, rather than adding
  'undefined'". A trial run gave errors at ~15 call sites, all of the same
  shape: an optional content-collections field (`string | undefined`)
  passed straight into an optional prop. The fix is to add `| undefined` to
  every optional prop, which is churn without catching a real bug here;
  React's own types treat optional props as accepting `undefined`.
- [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig/#noPropertyAccessFromIndexSignature)
  — forces `obj["key"]` for index-signature keys, including
  `process.env["X"]`. The [Next.js environment variable docs](https://nextjs.org/docs/app/guides/environment-variables)
  use `process.env.X`, and the codebase reads as more natural with dot
  access; `noUncheckedIndexedAccess` already makes those reads
  `T | undefined`, which is the safety that matters.


## Acceptance criteria

- [x] Research recorded: TypeScript TSConfig reference for each option
- [x] tsconfig enables the extra checks that fit the codebase (with reasons
      for any left off); `allowJs` off
- [x] All resulting errors fixed properly (no blanket disables)
- [x] CI runs `bun run typecheck` (done in FUR-0014)
- [x] TypeScript conventions written into AGENTS.md (Key Rule 9)
- [x] ESLint type-checked configs split out to FUR-0044

## Notes

Do after FUR-0004 so the rules target the newest TypeScript and typescript-eslint.
