---
description: Scaffold a new feature following vertical slice architecture
---

# Create Feature Workflow

This workflow scaffolds a new feature directory following vertical slice architecture principles.

## Prerequisites

- Feature name identified
- Feature scope defined

## Steps

// turbo

1. **Create directory structure:**

```bash
mkdir -p src/features/[feature-name]/{components,__tests__}
```

// turbo 2. **Create base files:**

```bash
touch src/features/[feature-name]/{types.ts,utils.ts,utils.test.ts,queries.ts,constants.ts,README.md}
```

3. **Initialize types.ts:**

```typescript
// src/features/[feature-name]/types.ts
export interface [FeatureName] {
  id: string;
  // Add type properties
}
```

4. **Initialize constants.ts:**

```typescript
// src/features/[feature-name]/constants.ts
export const [FEATURE_NAME]_PER_PAGE = 12;
```

5. **Initialize utils.ts with a sorting function:**

```typescript
// src/features/[feature-name]/utils.ts
import type { [FeatureName] } from './types';

export function sort[FeatureName]sByDate(items: [FeatureName][]): [FeatureName][] {
  return [...items].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

6. **Write initial test:**

```typescript
// src/features/[feature-name]/utils.test.ts
import { describe, it, expect } from 'vitest';
import { sort[FeatureName]sByDate } from './utils';

describe('sort[FeatureName]sByDate', () => {
  it('handles empty array', () => {
    expect(sort[FeatureName]sByDate([])).toEqual([]);
  });
});
```

// turbo 7. **Run tests to verify setup:**

```bash
npm test src/features/[feature-name]/utils.test.ts
```

8. **Initialize README.md:**

```markdown
# [Feature Name]

## Purpose

[Brief description of what this feature does]

## Components

- `[Component]View`: Main view component

## Data

- `get[Feature]s()`: Fetches all items

## Routes

- `/[feature]`: Main listing
- `/[feature]/[slug]`: Detail page

## Testing

Run: `npm test src/features/[feature-name]`
```

9. **Create initial component:**

```typescript
// src/features/[feature-name]/components/[FeatureName]View.tsx
import type { [FeatureName] } from '../types';

interface [FeatureName]ViewProps {
  items: [FeatureName][];
}

export function [FeatureName]View({ items }: [FeatureName]ViewProps) {
  if (items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div>
      {items.map(item => (
        <article key={item.id}>
          {/* Render item */}
        </article>
      ))}
    </div>
  );
}
```

// turbo 10. **Verify build:**

```bash
npm run build
```

11. **Commit scaffold:**

```bash
git add src/features/[feature-name]
git commit -m "feat: scaffold [feature-name] feature"
```
