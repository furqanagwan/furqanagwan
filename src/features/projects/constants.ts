// Projects feature constants
// See: .agent/rules/00-quick-reference.md

export const FEATURED_STARS_THRESHOLD = 5;
export const GITHUB_API_BASE = "https://api.github.com";

export const PROJECT_CATEGORIES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
