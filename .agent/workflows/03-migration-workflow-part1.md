---
description: Migration workflow - Steps 0-4 (Pre-flight through Data Layer)
series: 3/5
---

# Feature Migration Workflow - Part 1

## Pre-Migration Checklist

- [ ] Read `01-architecture-core.md`
- [ ] Identify the feature boundary clearly
- [ ] Ensure test suite is passing (establish baseline)
- [ ] Create branch: `refactor/[feature-name]`
- [ ] Estimate: 1 session or needs feature flags?

---

## Step 0: Pre-Flight Analysis

**Goal:** Understand what you're moving and what depends on it.

### Actions

// turbo

1. **Create feature directory:**

   ```bash
   mkdir -p src/features/[feature-name]/{components,__tests__}
   touch src/features/[feature-name]/{utils.ts,types.ts,README.md}
   ```

2. **Document current state:**

   ```markdown
   # Migration Plan: [Feature Name]

   ## Current Location

   - Routes: app/[routes]
   - Components: components/[components]
   - Utils: utils/[files]

   ## Files to Move

   - [ ] ComponentA.tsx
   - [ ] ComponentB.tsx
   - [ ] utils.ts functions: fn1, fn2

   ## External Dependencies

   - file1.tsx imports ComponentA
   - file2.tsx imports fn1
   ```

// turbo 3. **Run dependency analysis:**

```bash
# Find all imports of target files
grep -r "import.*from.*components/OldComponent" src/
grep -r "import.*from.*utils/oldUtil" src/
```

4. **Assess risk:**
   - **Low Risk:** <5 external imports
   - **Medium Risk:** 5-15 external imports
   - **High Risk:** >15 imports or core utilities

   **If High Risk:** Consider gradual migration with barrel exports.

---

## Step 1: Domain Discovery

**Goal:** Define clear feature boundaries.

### Actions

1. **Identify the feature's scope:**
   - What business capability does this serve?
   - What are the main user actions?
   - What data models does it work with?

2. **Find all content/data sources:**
   - Look for: `allProjects`, `allBlogPosts`, `getUsers`, etc.

3. **Map the feature's API surface:**
   - What does this feature export?
   - What does it import from other features?
   - Are there circular dependencies?

4. **List all UI components:**
   - Page-level components
   - Shared components (may stay shared)
   - Feature-specific components (move these)

### Output

Document in `src/features/[feature]/README.md`:

```markdown
# [Feature Name]

## Scope

[What this feature does]

## Components

- `ComponentA`: Main view
- `ComponentB`: Card display

## Data Sources

- Content: `allProjects` from content-collections
- API: `/api/projects`

## Exports (Public API)

- `<ProjectsView />`: Main view
- `getProjects()`: Data fetching
- `ProjectType`: TypeScript type

## Internal Only

- `ProjectCard`: Used only within
- `sortProjects()`: Internal utility
```

---

## Step 2: Type Extraction

**Goal:** Establish type safety before moving logic.

### Actions

1. **Create `types.ts`:**

   ```typescript
   // src/features/projects/types.ts
   export interface Project {
     id: string;
     title: string;
     description: string;
     date: string;
     category: string;
   }

   export type ProjectCategory = "web" | "mobile" | "design";

   export interface ProjectFilters {
     category?: ProjectCategory;
     search?: string;
   }
   ```

2. **Export types from feature index (optional):**

   ```typescript
   // src/features/projects/index.ts
   export type { Project, ProjectCategory } from "./types";
   ```

3. **Update imports across codebase:**

   ```typescript
   // Before
   import { Project } from "@/types/project";

   // After
   import { Project } from "@/features/projects/types";
   ```

4. **Commit:**
   ```bash
   git commit -m "refactor: move [feature] types"
   ```

---

## Step 3: Utility Extraction

**Goal:** Move data transformation logic to testable utilities.

### Actions

1. **Identify utility functions in routes:**
   - Look for: `.map()`, `.filter()`, `.sort()`, `.reduce()`
   - Look for: formatting, calculations, transformations

2. **Create `utils.ts`:**

   ```typescript
   // src/features/projects/utils.ts
   import type { Project, ProjectCategory } from "./types";

   export function sortProjectsByDate(projects: Project[]): Project[] {
     return [...projects].sort(
       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
     );
   }

   export function filterProjectsByCategory(
     projects: Project[],
     category: ProjectCategory,
   ): Project[] {
     return projects.filter((p) => p.category === category);
   }

   export function groupProjectsByYear(
     projects: Project[],
   ): Record<string, Project[]> {
     return projects.reduce(
       (acc, project) => {
         const year = new Date(project.date).getFullYear().toString();
         acc[year] = [...(acc[year] || []), project];
         return acc;
       },
       {} as Record<string, Project[]>,
     );
   }
   ```

3. **Write tests IMMEDIATELY:**

   ```typescript
   // src/features/projects/utils.test.ts
   import { describe, it, expect } from "vitest";
   import { sortProjectsByDate } from "./utils";

   describe("sortProjectsByDate", () => {
     it("sorts projects newest first", () => {
       const projects = [
         {
           id: "1",
           title: "A",
           date: "2023-01-01",
           category: "web",
           description: "",
         },
         {
           id: "2",
           title: "B",
           date: "2024-01-01",
           category: "web",
           description: "",
         },
       ];

       const sorted = sortProjectsByDate(projects);
       expect(sorted[0].id).toBe("2");
       expect(sorted[1].id).toBe("1");
     });

     it("handles empty array", () => {
       expect(sortProjectsByDate([])).toEqual([]);
     });
   });
   ```

4. **Run tests:**

   ```bash
   npm test src/features/[feature]/utils.test.ts
   ```

5. **Update route to use utilities:**

   ```typescript
   // Before
   const sorted = projects.sort(
     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
   );

   // After
   import { sortProjectsByDate } from "@/features/projects/utils";
   const sorted = sortProjectsByDate(projects);
   ```

6. **Commit:**
   ```bash
   git commit -m "refactor: extract [feature] utilities with tests"
   ```

---

## Step 4: Query/Data Layer Extraction

**Goal:** Centralize data fetching logic.

### Actions

1. **Create `queries.ts`:**

   ```typescript
   // src/features/projects/queries.ts
   import { allProjects } from "content-collections";
   import type { Project } from "./types";
   import { sortProjectsByDate } from "./utils";

   export async function getProjects(): Promise<Project[]> {
     return sortProjectsByDate(allProjects);
   }

   export async function getProjectBySlug(
     slug: string,
   ): Promise<Project | null> {
     return allProjects.find((p) => p.slug === slug) || null;
   }

   export async function getFeaturedProjects(): Promise<Project[]> {
     return allProjects.filter((p) => p.featured);
   }
   ```

2. **Create `actions.ts` for mutations:**

   ```typescript
   // src/features/contact/actions.ts
   "use server";

   import { z } from "zod";

   const contactSchema = z.object({
     name: z.string().min(1, "Name is required"),
     email: z.string().email("Invalid email"),
     message: z.string().min(10, "Message must be at least 10 characters"),
   });

   export async function submitContactForm(formData: FormData) {
     const rawData = {
       name: formData.get("name"),
       email: formData.get("email"),
       message: formData.get("message"),
     };

     const result = contactSchema.safeParse(rawData);

     if (!result.success) {
       return {
         success: false,
         error: result.error.flatten().fieldErrors,
       };
     }

     await saveContactMessage(result.data);
     return { success: true };
   }
   ```

3. **Write integration tests:**

   ```typescript
   // src/features/projects/queries.test.ts
   import { describe, it, expect } from "vitest";
   import { getProjects } from "./queries";

   describe("getProjects", () => {
     it("returns sorted projects", async () => {
       const projects = await getProjects();
       expect(projects.length).toBeGreaterThan(0);

       // Verify sorting
       for (let i = 0; i < projects.length - 1; i++) {
         const current = new Date(projects[i].date);
         const next = new Date(projects[i + 1].date);
         expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
       }
     });
   });
   ```

4. **Commit:**
   ```bash
   git commit -m "refactor: extract [feature] data layer"
   ```

---

**Next:** See `04-migration-workflow-part2.md` for component migration and verification.
