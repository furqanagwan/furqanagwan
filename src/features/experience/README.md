# Experience Feature

## Purpose

Displays professional experience timeline, grouping roles by company and showing client information.

## Components

- `ExperienceTimeline`: Main component rendering the list of grouped experiences.
- `ExperienceItem`: Individual experience card with company, roles, clients, achievements, and technologies.

## API

- `getGroupedExperiences()`: Groups raw experience data by company and calculates date ranges.

## Data

Uses `allExperiences` from `content-collections`.

## Testing

```bash
bun test src/features/experience
```
