---
description: Rollback strategies, complexity patterns, and common pitfalls
series: 5/5
---

# Migration Strategies & Troubleshooting

## Rollback Strategy

If something goes wrong during migration:

### Immediate Issues (During Development)

```bash
# Revert last commit
git reset --hard HEAD~1

# Revert specific file
git checkout HEAD -- src/file.tsx

# Stash changes and test clean state
git stash
npm run build
```

### Post-Merge Issues (Production)

1. **Quick Fix:** Revert the merge commit

   ```bash
   git revert -m 1 <merge-commit-hash>
   ```

2. **Feature Flag Approach (Gradual Migration):**

   ```typescript
   // Use during high-risk migrations
   const USE_NEW = process.env.NEXT_PUBLIC_USE_NEW_PROJECTS === 'true';

   export default function Page() {
     if (USE_NEW) {
       return <NewProjectsView />;
     }
     return <OldProjectsView />;
   }
   ```

---

## Migration Patterns by Complexity

### Small Feature (< 1 hour)

- Single page/component
- Follow all steps in one session
- Single PR

**Example:** Contact form, About page

### Medium Feature (1-4 hours)

- Multiple components
- Break into 2-3 PRs:
  1. Types + Utils + Tests
  2. Components
  3. Route cleanup + Imports

**Example:** Blog system, Project portfolio

### Large Feature (> 4 hours)

- Complex domain with many dependencies
- Use feature flags
- Break into 5-10 PRs
- Migrate one sub-feature at a time
- Keep old code until fully verified

**Example:** E-commerce checkout, Admin dashboard

---

## Common Pitfalls & Solutions

### 1. Circular Dependencies

**Problem:** Feature A → Feature B → Feature A

**Solution:**

1. Extract shared logic to `src/shared/`
2. Use dependency inversion (interfaces)
3. Reconsider feature boundaries

```typescript
// BAD: Circular dependency
// features/users/utils.ts
import { getOrder } from "@/features/orders/queries";

// features/orders/utils.ts
import { getUser } from "@/features/users/queries";

// GOOD: Extract to shared
// shared/utils/data.ts
export async function getUserWithOrders(userId: string) {
  const user = await getUser(userId);
  const orders = await getOrders(userId);
  return { user, orders };
}
```

### 2. Breaking Type Changes

**Problem:** Changing type imports breaks 50 files

**Solution:**

1. Use type re-exports temporarily
   ```typescript
   // @deprecated Use @/features/projects/types
   export type { Project } from "@/features/projects/types";
   ```
2. Migrate gradually
3. Remove deprecated exports in next version

### 3. Test Path Issues

**Problem:** Tests can't find moved modules

**Solution:**
Update `tsconfig.json` and `vitest.config.ts` paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### 4. Import Cycles in Barrel Exports

**Problem:** `index.ts` creates circular imports

**Solution:**

- Avoid barrel exports if causing issues
- Import directly: `@/features/projects/utils`
- Use separate barrel exports for types vs runtime:

  ```typescript
  // features/projects/types.ts (safe to barrel export)
  export * from "./types";

  // features/projects/index.ts (avoid runtime cycles)
  export { ProjectsView } from "./components/ProjectsView";
  ```

### 5. Client/Server Boundary Violations

**Problem:** Server Component imported in Client Component

**Solution:**

```typescript
// BAD
'use client';
import { ServerComponent } from './ServerComponent';

export function ClientWrapper() {
  return <div><ServerComponent /></div>; // Error!
}

// GOOD: Use composition
export function ClientWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>;
}

// Usage in page.tsx
<ClientWrapper>
  <ServerComponent />
</ClientWrapper>
```

### 6. State Management Confusion

**Problem:** Mixing URL state, client state, and server state

**Solution:**

- **URL State:** Filters, search, pagination (shareable)
- **Client State:** UI toggles, form inputs (ephemeral)
- **Server State:** Database data (use TanStack Query/SWR)

```typescript
// Clear separation
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function ProjectsClient() {
  // URL state
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Client state
  const [isGridView, setIsGridView] = useState(true);

  // Server state
  const { data: projects } = useQuery({
    queryKey: ["projects", category],
    queryFn: () => getProjects(category),
  });

  // ...
}
```

---

## Performance Optimization Tips

### 1. Code Splitting

```typescript
// Dynamic import for heavy features
const AdminDashboard = dynamic(
  () => import('@/features/admin/components/Dashboard'),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### 2. Image Optimization

```typescript
// Always use next/image
import Image from 'next/image';

export function ProjectCard({ project }) {
  return (
    <Image
      src={project.image}
      alt={project.title}
      width={400}
      height={300}
      loading="lazy"
    />
  );
}
```

### 3. Data Fetching Patterns

```typescript
// Parallel fetching
export default async function Page() {
  const [projects, featured] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
  ]);

  return <ProjectsView projects={projects} featured={featured} />;
}

// Sequential only when dependent
export default async function Page({ params }) {
  const project = await getProject(params.slug);
  const related = await getRelatedProjects(project.category);

  return <ProjectDetail project={project} related={related} />;
}
```

### 4. Caching Strategies

```typescript
// Next.js specific
export const revalidate = 3600; // Revalidate every hour

export async function getProjects() {
  return fetch("https://api.example.com/projects", {
    next: { revalidate: 3600 },
  });
}

// React Query
const { data } = useQuery({
  queryKey: ["projects"],
  queryFn: getProjects,
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30, // 30 minutes
});
```

---

## Accessibility Checklist

During migration, ensure:

- [ ] Semantic HTML (use `<article>`, `<nav>`, `<main>`)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Alt text on all images
- [ ] Color contrast meets WCAG AA
- [ ] Form labels properly associated
- [ ] Error messages announced by screen readers

```typescript
// Good accessibility example
export function ProjectFilter({ onFilterChange }) {
  return (
    <nav aria-label="Project filters">
      <button
        onClick={() => onFilterChange('web')}
        aria-pressed={selected === 'web'}
      >
        Web Projects
      </button>
    </nav>
  );
}
```

---

## Final Checklist

Before considering migration complete:

### Code Quality

- [ ] No `any` types in TypeScript
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No TODO comments without tickets
- [ ] Consistent naming conventions
- [ ] No magic numbers (use constants)

### Testing

- [ ] Unit test coverage >90% for utils
- [ ] Integration tests for mutations
- [ ] E2E tests for critical paths
- [ ] Visual regression tests (if applicable)
- [ ] No skipped/disabled tests

### Documentation

- [ ] Feature README complete
- [ ] Complex functions have JSDoc comments
- [ ] Breaking changes documented
- [ ] Migration notes in PR

### Performance

- [ ] Bundle size stable or reduced
- [ ] No duplicate dependencies
- [ ] Images optimized
- [ ] Lighthouse score maintained

### Deployment

- [ ] Tested in staging environment
- [ ] Rollback plan documented
- [ ] Monitoring/alerts in place
- [ ] Team notified of changes

---

## Success Criteria

Migration is successful when:

1. ✅ All tests pass
2. ✅ Build succeeds without warnings
3. ✅ Manual testing complete
4. ✅ Code review approved
5. ✅ Documentation updated
6. ✅ Performance metrics stable
7. ✅ Team can navigate new structure
8. ✅ AI agents can work with code effectively

---

## Reference Links

- **Architecture:** `01-architecture-core.md`
- **Testing:** `02-validation-testing.md`
- **Migration Part 1:** `03-migration-workflow-part1.md`
- **Migration Part 2:** `04-migration-workflow-part2.md`

---

**Remember:**

- Test often, commit frequently
- One feature at a time
- Verify before deleting old code
- Document as you go
- When in doubt, optimize for feature cohesion
