
export const FEATURED_STARS_THRESHOLD = 5;

export const PROJECT_CATEGORIES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
