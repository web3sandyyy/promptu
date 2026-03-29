import { CATEGORIES } from "./categories";

/**
 * Get category by slug (name)
 * Example: "business-marketing" → Category object
 */
export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((cat) => cat.name === slug);
}

/**
 * Get category by title
 * Example: "Business & Marketing" → Category object
 */
export function getCategoryByTitle(title: string) {
  return CATEGORIES.find((cat) => cat.title === title);
}

/**
 * Legacy functions for backward compatibility
 * @deprecated Use category.name directly
 */
export function categoryToSlug(categoryTitle: string): string {
  const category = getCategoryByTitle(categoryTitle);
  return category
    ? category.name
    : categoryTitle.toLowerCase().replace(/ & /g, "-and-").replace(/ /g, "-");
}

/**
 * @deprecated Use getCategoryBySlug instead
 */
export function slugToCategory(slug: string): string | null {
  const category = getCategoryBySlug(slug);
  return category ? category.title : null;
}
