# Qualifications Feature

## Purpose

Displays educational qualifications and certifications.

## Components

- `QualificationsList`: Main component for listing all qualifications.
- `QualificationItem`: Individual qualification card.
- `EducationPageContent`: Client component for the education page (filtered view).

## API

- `sortQualificationsByDate(qualifications)`: Sorts qualifications by date descending.

## Data

Uses `allQualifications` from `content-collections`.

## Testing

```bash
bun test src/features/qualifications
```
