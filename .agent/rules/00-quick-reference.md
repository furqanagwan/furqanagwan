---
trigger: always_on
description: Quick reference cheat sheet for common architectural decisions
series: 0/5
---

# Quick Reference

## Where Does This Code Go?

| What                       | Where                          | Why                 |
| -------------------------- | ------------------------------ | ------------------- |
| Feature-specific component | `features/[name]/components/`  | Colocation          |
| Used by 3+ features        | `shared/components/`           | Genuine reuse       |
| Data transformation        | `features/[name]/utils.ts`     | Testability         |
| API call (server)          | `features/[name]/queries.ts`   | Server-side caching |
| Mutation                   | `features/[name]/actions.ts`   | Server actions      |
| TypeScript types           | `features/[name]/types.ts`     | Type safety         |
| Feature constants          | `features/[name]/constants.ts` | No magic values     |

---

## Server vs Client Component?

```
┌─────────────────────────────────┐
│  Need hooks or events?          │
│  (useState, onClick, etc.)      │
└───────────────┬─────────────────┘
                │
        ┌───────▼───────┐
        │      NO       │──────► Server Component (default)
        └───────────────┘
                │
              YES
                │
        ┌───────▼───────┐
        │ 'use client'  │──────► Client Component
        └───────────────┘
```

**Server Component:** Data fetching, no interactivity, SEO-critical
**Client Component:** Event handlers, browser APIs, React hooks

**Mixed?** Compose both - push `'use client'` as deep as possible.

---

## State Management Decision Tree

| State Type      | Storage                         | Examples                     |
| --------------- | ------------------------------- | ---------------------------- |
| **Shareable**   | URL (`nuqs`, `useSearchParams`) | Filters, pagination, search  |
| **Ephemeral**   | Client (`useState`)             | Toggles, modals, form inputs |
| **Server Data** | TanStack Query / SWR            | API responses, database data |

---

## Constants Guidelines

**Put in `constants.ts`:**

- API endpoints
- Route paths
- Feature flag keys
- Magic numbers (timeouts, limits)
- Enum-like objects

```typescript
// features/projects/constants.ts
export const PROJECTS_PER_PAGE = 12;
export const PROJECT_CATEGORIES = ["web", "mobile", "design"] as const;
export const ROUTES = {
  list: "/projects",
  detail: (slug: string) => `/projects/${slug}`,
} as const;
```

---

## Barrel Export Guidelines

**DO use barrel exports when:**

- Exporting public API of a feature
- Exporting types only

**DON'T use barrel exports when:**

- It creates circular imports
- Bundle size becomes an issue

**Prefer direct imports for internal feature code:**

```typescript
// Good - direct import
import { sortProjects } from "@/features/projects/utils";

// Good - barrel for public API
import { ProjectsView, getProjects } from "@/features/projects";
```

---

## Quick Commands

```bash
# Create new feature scaffold
mkdir -p src/features/[name]/{components,__tests__}
touch src/features/[name]/{types.ts,utils.ts,utils.test.ts,queries.ts,constants.ts,README.md}

# Find all imports of a module
grep -r "from '@/components/X'" src/

# Run feature tests
npm test src/features/[name]
```

---

**Reference:** See `01-architecture-core.md` for full architecture principles.
