// Centralized category config + deterministic gradient palette.
// Used by footer, blog index, cards, and any future surface that needs
// category-consistent theming.

export const CATEGORY_ORDER = [
  "Career",
  "Finance",
  "Travel",
  "Food",
  "Health",
  "Technology",
  "Lifestyle",
] as const;

export type CanonicalCategory = (typeof CATEGORY_ORDER)[number];

// HSL stops per category. Three stops per palette produce the layered
// radial+linear gradient in getCategoryGradient below.
const CATEGORY_PALETTES: Record<string, [string, string, string]> = {
  Career: ["240 85% 62%", "260 80% 55%", "275 75% 48%"],
  Finance: ["160 75% 45%", "175 70% 40%", "190 70% 38%"],
  Travel: ["18 95% 60%", "340 85% 62%", "30 95% 65%"],
  Food: ["35 95% 58%", "15 90% 60%", "350 80% 60%"],
  Health: ["340 80% 65%", "355 85% 62%", "10 90% 65%"],
  Technology: ["215 60% 35%", "220 55% 25%", "230 50% 18%"],
  Lifestyle: ["280 70% 60%", "295 70% 55%", "310 70% 58%"],
};

const FALLBACK_PALETTE: [string, string, string] = [
  "220 60% 50%",
  "250 65% 55%",
  "280 65% 60%",
];

// Tiny deterministic hash so the same slug within a category always
// gets the same rotation/shift.
function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getCategoryPalette(category: string): [string, string, string] {
  return CATEGORY_PALETTES[category] ?? FALLBACK_PALETTE;
}

// Returns a CSS `background` value for a category-themed card.
// Deterministic by (category, slug) so a given post always renders
// the same gradient. No images, pure CSS.
export function getCategoryGradient(category: string, slug = ""): string {
  const [c1, c2, c3] = getCategoryPalette(category);
  const seed = hash(`${category}:${slug}`);
  const angle = 110 + (seed % 60); // 110–170deg
  const x1 = 15 + (seed % 30); // 15–45%
  const y1 = 20 + ((seed >> 3) % 40); // 20–60%
  const x2 = 60 + ((seed >> 5) % 30); // 60–90%
  const y2 = 55 + ((seed >> 7) % 35); // 55–90%

  return [
    `radial-gradient(at ${x1}% ${y1}%, hsl(${c1} / 0.9), transparent 55%)`,
    `radial-gradient(at ${x2}% ${y2}%, hsl(${c3} / 0.85), transparent 60%)`,
    `linear-gradient(${angle}deg, hsl(${c1}), hsl(${c2}) 55%, hsl(${c3}))`,
  ].join(", ");
}

// Sorted list of categories actually present in a set of posts.
// Canonical categories appear in CATEGORY_ORDER first, unknown ones
// fall to the end alphabetically.
export function sortCategories(categories: Iterable<string>): string[] {
  return Array.from(new Set(categories)).sort((a, b) => {
    const ia = (CATEGORY_ORDER as readonly string[]).indexOf(a);
    const ib = (CATEGORY_ORDER as readonly string[]).indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}
