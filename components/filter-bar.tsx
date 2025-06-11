"use client";
import type { RecipeType } from "@/types";

interface FilterBarProps {
  category: string;
  type: RecipeType | "all";
  reviewType: "all" | "Movie" | "Game" | "Music";
  query: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTypeChange: (val: RecipeType | "all") => void;
  onReviewTypeChange: (val: "all" | "Movie" | "Game" | "Music") => void;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  CATEGORIES: { label: string; value: string }[];
  RECIPE_TYPES: { label: string; value: RecipeType | "all" }[];
  REVIEW_TYPES: { label: string; value: string }[];
}

export default function FilterBar({
  category,
  type,
  reviewType,
  query,
  onCategoryChange,
  onTypeChange,
  onReviewTypeChange,
  onQueryChange,
  CATEGORIES,
  RECIPE_TYPES,
  REVIEW_TYPES,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <select
        className="px-2 py-1 rounded border text-sm bg-background"
        value={category}
        onChange={onCategoryChange}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      {category === "recipes" && (
        <div className="flex items-center gap-2 flex-wrap">
          {RECIPE_TYPES.map((t) => (
            <label
              key={t.value}
              className={`px-2 py-1 rounded border text-sm cursor-pointer transition-all
                  ${
                    type === t.value
                      ? "bg-blue-100 border-blue-400 font-semibold text-blue-700"
                      : "bg-background border"
                  }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="recipe-type"
                value={t.value}
                checked={type === t.value}
                onChange={() => onTypeChange(t.value as RecipeType | "all")}
              />
              {t.label}
            </label>
          ))}
        </div>
      )}
      {category === "reviews" && (
        <div className="flex items-center gap-2 flex-wrap">
          {REVIEW_TYPES.map((t) => (
            <label
              key={t.value}
              className={`px-2 py-1 rounded border text-sm cursor-pointer transition-all
                  ${
                    reviewType === t.value
                      ? "bg-purple-100 border-purple-400 font-semibold text-purple-700"
                      : "bg-background border"
                  }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="review-type"
                value={t.value}
                checked={reviewType === t.value}
                onChange={() => onReviewTypeChange(t.value as any)}
              />
              {t.label}
            </label>
          ))}
        </div>
      )}
      <input
        className="px-2 py-1 rounded border text-sm"
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={onQueryChange}
      />
    </div>
  );
}
