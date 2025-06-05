export type RecipeType = "Breakfast" | "Lunch" | "Dinner" | "Dessert";
export type Diet = "Vegan" | "Vegetarian";

export type Post = {
  title: string;
  date: string;
  author?: string;
  summary?: string;
  description?: string;
  cities?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  calories?: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  type?: RecipeType;
  diet?: Diet[];
  slug: string;
  stars?: number;
  readingTime?: string;
};

export type CompletePost = Post & {
  category?: string;
  subcategory?: string;
  path: string;
  readingTime: string;
};

export type Frontmatter = Omit<Post, "slug" | "stars" | "readingTime">;
