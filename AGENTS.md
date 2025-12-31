# AI Agent Instructions

This document provides coding standards and architectural guidelines for AI agents working on this project.

## Architecture: Vertical Slice

**Features, not layers.** Organize code by business capability. Each feature should be self-contained.

```
src/features/[feature-name]/
├── components/          # UI components for this feature
├── utils.ts            # Data transformation (MUST have tests)
├── utils.test.ts       # Unit tests (REQUIRED)
├── types.ts            # TypeScript types
├── queries.ts          # Server-side data fetching
├── actions.ts          # Server mutations
├── constants.ts        # Feature-specific constants
└── README.md           # Feature documentation
```

## Decision Framework

### Where Does Code Go?

| What                       | Where                         |
| -------------------------- | ----------------------------- |
| Feature-specific component | `features/[name]/components/` |
| Used by 3+ features        | `shared/components/`          |
| Data transformation        | `features/[name]/utils.ts`    |
| API call (server)          | `features/[name]/queries.ts`  |
| Mutation                   | `features/[name]/actions.ts`  |

### Server vs Client Component?

- **No hooks/events needed** → Server Component (default)
- **useState, useEffect, onClick** → Client Component (`'use client'`)
- **Mixed** → Compose both, push `'use client'` as deep as possible

### State Management

| State Type                      | Use                                   |
| ------------------------------- | ------------------------------------- |
| Shareable (filters, pagination) | URL State (`nuqs`, `useSearchParams`) |
| Ephemeral (toggles, forms)      | Client State (`useState`)             |
| Server data                     | TanStack Query / SWR                  |

## Key Rules

1. **Route files are thin** - Fetch data, render feature component, nothing else
2. **Always validate user input** - Use Zod or Valibot for runtime validation
3. **Utilities must have tests** - Target >90% coverage for `utils.ts`
4. **No magic numbers** - Put in `constants.ts`
5. **Push 'use client' deep** - Maximize server rendering

## Anti-Patterns

❌ Business logic in route files
❌ Data transformations in components
❌ Overly nested directories (max 2-3 levels)
❌ Circular dependencies between features
❌ Client components wrapping server components

## After Every Change

1. `npm run build`
2. `npm run lint`
3. `npm test`
4. Check for console errors in browser

---

_See `.agent/rules/` for detailed documentation._
