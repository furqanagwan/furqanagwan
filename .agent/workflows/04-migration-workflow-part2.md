---
description: Migration workflow - Steps 5-10 (Components through Completion)
series: 4/5
---

# Feature Migration Workflow - Part 2

## Step 5: Component Migration

**Goal:** Move UI components to the feature directory.

### Actions

1. **Identify component types:**
   - **Presentational:** Pure UI, receives data via props
   - **Container:** Fetches data, manages state
   - **Hybrid:** Both logic and UI (consider splitting)

2. **Start with presentational components:**

   ```typescript
   // src/features/projects/components/ProjectCard.tsx
   import type { Project } from '../types';

   interface ProjectCardProps {
     project: Project;
   }

   export function ProjectCard({ project }: ProjectCardProps) {
     return (
       <article>
         <h3>{project.title}</h3>
         <p>{project.description}</p>
         <time>{project.date}</time>
       </article>
     );
   }
   ```

3. **Create main view component:**

   ```typescript
   // src/features/projects/components/ProjectsView.tsx
   import type { Project } from '../types';
   import { ProjectCard } from './ProjectCard';

   interface ProjectsViewProps {
     projects: Project[];
   }

   export function ProjectsView({ projects }: ProjectsViewProps) {
     if (projects.length === 0) {
       return <p>No projects found.</p>;
     }

     return (
       <div>
         <h2>Projects</h2>
         <div className="grid">
           {projects.map(project => (
             <ProjectCard key={project.id} project={project} />
           ))}
         </div>
       </div>
     );
   }
   ```

4. **Handle client components:**

   ```typescript
   // src/features/projects/components/ProjectFilter.tsx
   'use client';

   import { useState } from 'react';
   import type { ProjectCategory } from '../types';

   interface ProjectFilterProps {
     onFilterChange: (category: ProjectCategory | 'all') => void;
   }

   export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
     const [selected, setSelected] = useState<ProjectCategory | 'all'>('all');

     const handleChange = (category: ProjectCategory | 'all') => {
       setSelected(category);
       onFilterChange(category);
     };

     return (
       <div>
         <button onClick={() => handleChange('all')}>All</button>
         <button onClick={() => handleChange('web')}>Web</button>
         <button onClick={() => handleChange('mobile')}>Mobile</button>
       </div>
     );
   }
   ```

5. **Create feature barrel export (optional):**

   ```typescript
   // src/features/projects/index.ts
   export { ProjectsView } from "./components/ProjectsView";
   export { getProjects, getProjectBySlug } from "./queries";
   export type { Project, ProjectCategory } from "./types";
   ```

6. **Commit after each component:**
   ```bash
   git commit -m "refactor: move ProjectCard to feature"
   ```

---

## Step 6: Route Cleanup

**Goal:** Simplify route files to thin orchestration layers.

### Actions

1. **Refactor route:**

   ```typescript
   // app/projects/page.tsx - BEFORE
   export default async function ProjectsPage() {
     const projects = allProjects;
     const sorted = projects.sort((a, b) =>
       new Date(b.date).getTime() - new Date(a.date).getTime()
     );

     return (
       <div>
         <h1>Projects</h1>
         {sorted.map(project => (
           <div key={project.id}>
             <h3>{project.title}</h3>
             <p>{project.description}</p>
           </div>
         ))}
       </div>
     );
   }
   ```

   ```typescript
   // app/projects/page.tsx - AFTER
   import { ProjectsView } from '@/features/projects/components/ProjectsView';
   import { getProjects } from '@/features/projects/queries';

   export default async function ProjectsPage() {
     const projects = await getProjects();
     return <ProjectsView projects={projects} />;
   }
   ```

2. **Add error boundary:**

   ```typescript
   // app/projects/error.tsx
   'use client';

   export default function ProjectsError({
     error,
     reset,
   }: {
     error: Error;
     reset: () => void;
   }) {
     return (
       <div>
         <h2>Failed to load projects</h2>
         <p>{error.message}</p>
         <button onClick={reset}>Try again</button>
       </div>
     );
   }
   ```

3. **Add loading state:**

   ```typescript
   // app/projects/loading.tsx
   export default function ProjectsLoading() {
     return (
       <div>
         <h2>Loading projects...</h2>
         <div className="skeleton" />
       </div>
     );
   }
   ```

4. **Remove unused imports and old code**

5. **Commit:**
   ```bash
   git commit -m "refactor: simplify projects route"
   ```

---

## Step 7: Import Path Updates

**Goal:** Update all external references to moved code.

### Actions

1. **Find all files importing from old locations:**

   ```bash
   grep -r "from '@/components/ProjectCard'" src/
   grep -r "from '@/utils/projects'" src/
   ```

2. **Update imports systematically:**

   ```typescript
   // Before
   import { ProjectCard } from "@/components/ProjectCard";

   // After
   import { ProjectCard } from "@/features/projects/components/ProjectCard";
   // or if using barrel export
   import { ProjectCard } from "@/features/projects";
   ```

3. **Commit each file or logical group:**
   ```bash
   git add src/app/about/page.tsx src/app/contact/page.tsx
   git commit -m "refactor: update imports in about/contact"
   ```

---

## Step 8: Test Updates

**Goal:** Ensure all tests pass with new structure.

### Actions

1. **Update test imports:**

   ```typescript
   // Before
   import { sortProjects } from "@/utils/projects";

   // After
   import { sortProjectsByDate } from "@/features/projects/utils";
   ```

2. **Update mock paths:**

   ```typescript
   vi.mock("@/features/projects/queries", () => ({
     getProjects: vi.fn(),
   }));
   ```

3. **Run full test suite:**

   ```bash
   npm test
   ```

4. **Fix any broken tests**

5. **Commit:**
   ```bash
   git commit -m "test: update imports after refactor"
   ```

---

## Step 9: Comprehensive Verification

**Goal:** Ensure nothing broke during migration.

### Build & Type Check

```bash
# 1. Clean build
rm -rf .next
npm run build

# 2. Type check
npm run type-check

# 3. Lint
npm run lint

# 4. Format check
npm run format:check
```

### Testing

```bash
# 5. Unit tests
npm test

# 6. Integration tests
npm run test:integration

# 7. E2E tests
npm run test:e2e
```

### Manual Verification

- [ ] Navigate to feature in browser
- [ ] Test all interactive elements
- [ ] Verify data displays correctly
- [ ] Check for console errors/warnings
- [ ] Test error states (disconnect network)
- [ ] Test loading states (slow 3G)
- [ ] Verify responsive design
- [ ] Check accessibility (keyboard, screen reader)

### Performance Check

```bash
# 8. Bundle size analysis
npm run analyze

# Check:
# - Bundle size didn't increase
# - No duplicate dependencies
# - Code splitting works
```

---

## Step 10: Cleanup & Documentation

**Goal:** Remove old code and document migration.

### Actions

1. **Delete old files:**

   ```bash
   # Only after verifying everything works!
   rm src/components/OldProjectCard.tsx
   rm src/utils/projects.ts
   ```

2. **Update feature README:**

   ```markdown
   # Projects Feature

   ## Overview

   Displays portfolio projects with filtering.

   ## Components

   - `ProjectsView`: Main view (server)
   - `ProjectCard`: Individual project
   - `ProjectFilter`: Category filtering (client)

   ## Data

   - `getProjects()`: Fetches all projects, sorted
   - `getProjectBySlug()`: Fetches single project

   ## Routes

   - `/projects`: Projects listing
   - `/projects/[slug]`: Individual project

   ## Testing

   Run: `npm test src/features/projects`
   Coverage: 92%
   ```

3. **Create PR with summary:**

   ```markdown
   ## Migration: Projects Feature

   ### Changes

   - ✅ Moved components to `src/features/projects/`
   - ✅ Extracted utilities with tests (94% coverage)
   - ✅ Simplified route files
   - ✅ Added error/loading states
   - ✅ Updated 12 import paths

   ### Verification

   - ✅ All tests pass
   - ✅ Build succeeds
   - ✅ Manual testing complete
   - ✅ Bundle size unchanged

   ### Breaking Changes

   None
   ```

4. **Final commit:**
   ```bash
   git add .
   git commit -m "refactor: complete projects migration"
   ```

---

**Next:** See `05-migration-strategies.md` for rollback and complexity patterns.
