# Projects Feature

## Purpose

Displays portfolio projects with filtering and sorting capabilities.

## Components

- `ProjectsList`: Main client component for rendering and filtering projects.

## API

- `getProjects()`: Fetches all projects.
- `sortProjects(projects, sortBy)`: Sorts projects by date or name.
- `filterProjects(projects, category)`: Filters projects by category.

## Data

Uses `allProjects` from `content-collections`.

## Testing

```bash
bun test src/features/projects
```
