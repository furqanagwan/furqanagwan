# AI Agent Instructions

Coding standards and a map of this codebase, for people and AI agents alike.
`.clinerules`, `.cursorrules` and `.windsurfrules` are symlinks to this file,
so edit it here only. Longer guides live in `.agent/rules/`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Bun ·
content-collections (MDX) · Vitest + Testing Library · Playwright · Vercel.

## Where things live

```
src/
├── app/                 # Routes only — thin files that fetch data and render a feature
├── features/            # One folder per area of the site (vertical slices)
│   ├── blog/
│   ├── experience/
│   ├── projects/
│   ├── qualifications/
│   └── ai-generator/    # Script-side blog post generator (used by scripts/)
├── components/
│   ├── layout/          # Header, sidebar, mobile menu, footer; navigation.ts is the nav config
│   ├── providers/       # React context providers (theme)
│   └── ui/              # Generic, reusable UI building blocks
└── lib/                 # Small cross-cutting helpers (cn(), JSON-LD schema)
content/                 # MDX content: experiences, qualifications
public/                  # Static files
scripts/                 # CLI scripts: generate-post.ts, ticket.ts
docs/tickets/            # FUR-#### tickets: one Markdown file per piece of work
tests/
├── unit/                # Vitest tests for shared components
└── *.spec.ts            # Playwright end-to-end tests (incl. iPhone Duo and Galaxy Z viewports)
```

Each feature folder follows the same shape:

```
src/features/[feature-name]/
├── components/          # UI components for this feature
├── utils.ts             # Data transformation (MUST have tests)
├── utils.test.ts        # Unit tests (REQUIRED)
├── types.ts             # TypeScript types
├── queries.ts           # Server-side data fetching
├── actions.ts           # Server mutations (when needed)
├── constants.ts         # Feature-specific constants
└── README.md            # What the feature does
```

## Where does new code go?

| What                                | Where                                 |
| ----------------------------------- | ------------------------------------- |
| A new page                          | `app/[route]/page.tsx` (thin)         |
| Component used by one feature       | `features/[name]/components/`         |
| Component used by several features  | `components/ui/`                      |
| Site chrome (header, menus, footer) | `components/layout/`                  |
| Add/rename a page in the menus      | `components/layout/navigation.ts`     |
| Data transformation                 | `features/[name]/utils.ts` + tests    |
| Server data fetching                | `features/[name]/queries.ts`          |
| Constants / magic numbers           | `features/[name]/constants.ts`        |
| Global styles and design tokens     | `app/globals.css`                     |

### Server vs Client Component?

- **No hooks/events needed** → Server Component (default)
- **useState, useEffect, onClick** → Client Component (`'use client'`)
- **Mixed** → Compose both, push `'use client'` as deep as possible

### State Management

| State Type                      | Use                                   |
| ------------------------------- | ------------------------------------- |
| Shareable (filters, pagination) | URL State (`useSearchParams`)         |
| Ephemeral (toggles, forms)      | Client State (`useState`)             |

## Key Rules

1. **Route files are thin** - Fetch data, render feature component, nothing else
2. **Always validate user input** - Use Zod for runtime validation
3. **Utilities must have tests** - Target >90% coverage for `utils.ts`
4. **No magic numbers** - Put in `constants.ts`
5. **Push 'use client' deep** - Maximize server rendering
6. **One source of truth** - Don't copy data or config between components; import it
7. **No comments in code** - Names say what things do. If code needs a
   comment to be understood, rename or split it instead. (Markdown docs and
   tool directives such as `eslint-disable` are fine.)
8. **Mobile and foldables** - Layouts must work from 320px wide (WCAG reflow;
   Galaxy Z Flip covers are 322px) to desktop, and on short landscape screens
   down to 256px tall: no fixed or absolute element may cover content that
   scrolls. Use the `--safe-*` inset variables in `globals.css` for anything
   fixed to a screen edge. `tests/iphone-duo.spec.ts` and
   `tests/foldables.spec.ts` check this
9. **Strict TypeScript** - `tsconfig.json` runs `strict` plus
   `noUncheckedIndexedAccess`, `noImplicitReturns`, `noUnusedLocals`,
   `noUnusedParameters` and `verbatimModuleSyntax`. No `any`, `@ts-ignore`
   or non-null `!`; narrow `unknown` with Zod or type guards instead. Import
   types with `import type { X }` (or `type X` inside a mixed import). Delete
   unused variables and parameters rather than prefixing them with `_`.
   TypeScript files only (`allowJs` is off); tool configs may stay `.mjs`

## Anti-Patterns

❌ Business logic in route files
❌ Data transformations in components
❌ Overly nested directories (max 2-3 levels)
❌ Circular dependencies between features
❌ Client components wrapping server components
❌ Duplicated config or data (e.g. nav links defined in two places)
❌ Committing generated files, screenshots or local tool output
❌ Comments explaining what code does (use clearer names instead)

## Tickets and branches

All work is tracked as a ticket in `docs/tickets/` (see its README):

- IDs are `FUR-0001`, `FUR-0002`, … — create with `bun run ticket:new --title "..."`.
- Research the correct approach from primary sources before implementing,
  and record it in the ticket (see the README for which sources).
- The branch for a ticket is its ID in capitals: `FUR-0012`.
- Commit messages and PR titles start with the ID: `FUR-0012: ...`.
- Author and committer: `furqanagwan <furqanagwan@outlook.com>` only, with no
  co-author trailers or tool signatures.
- Each ticket is squash-merged into `main` as one commit carrying the
  detailed PR description (before/after screenshots for UI changes).
- A ticket closes on merge: the squashed commit landing on `main` sets it to
  `done` and ends with `Closes FUR-####`.
- Check open PRs regularly; rebase them onto `main`, merge them as soon as
  they're green and verified, and keep stale PRs to a minimum.

## Dependencies

- Keep every package on its latest release; check release notes and
  security advisories before upgrading a major version.
- To upgrade, set the package's version to `"latest"` in `package.json` on
  the ticket branch and push. The "Sync lockfile" workflow resolves it to
  the newest version, rewrites `package.json` with a real range, regenerates
  `bun.lock` and re-runs CI.
- Never edit `bun.lock` by hand; CI installs with `--frozen-lockfile`.

## After Every Change

1. `bun run typecheck`
2. `bun run lint`
3. `bun run test:unit`
4. `bun run build`
5. Check for console errors in the browser

---

_See `.agent/rules/` for detailed documentation._
