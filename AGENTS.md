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
scripts/                 # One-off/CLI scripts (e.g. generate-post.ts)
tests/
├── unit/                # Vitest tests for shared components
└── *.spec.ts            # Playwright end-to-end tests (incl. iPhone Duo viewports)
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
7. **Mobile and foldables** - Layouts must work from 382px wide (iPhone Duo outer
   screen) to desktop; use the `--safe-*` inset variables in `globals.css` for
   anything fixed to a screen edge

## Anti-Patterns

❌ Business logic in route files
❌ Data transformations in components
❌ Overly nested directories (max 2-3 levels)
❌ Circular dependencies between features
❌ Client components wrapping server components
❌ Duplicated config or data (e.g. nav links defined in two places)
❌ Committing generated files, screenshots or local tool output

## After Every Change

1. `bun run typecheck`
2. `bun run lint`
3. `bun run test:unit`
4. `bun run build`
5. Check for console errors in the browser

---

_See `.agent/rules/` for detailed documentation._
