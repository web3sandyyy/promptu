/**
 * Available prompt categories
 * Used for filtering and categorization throughout the app
 */
export const CATEGORIES = [
  {
    id: 1,
    name: "coding-development",
    title: "Coding & Development",
    description: "Code review, debugging, refactoring, and development prompts",
  },
  {
    id: 2,
    name: "content-writing",
    title: "Content Writing",
    description: "Blog posts, articles, and content creation",
  },
  {
    id: 3,
    name: "business-marketing",
    title: "Business & Marketing",
    description: "Marketing strategies, business plans, and analysis",
  },
  {
    id: 4,
    name: "data-analysis",
    title: "Data Analysis",
    description: "Data processing, analysis, and visualization",
  },
  {
    id: 5,
    name: "creative-writing",
    title: "Creative Writing",
    description: "Story writing, creative content, and narratives",
  },
  {
    id: 6,
    name: "education-learning",
    title: "Education & Learning",
    description: "Educational content and learning materials",
  },
  {
    id: 7,
    name: "problem-solving",
    title: "Problem Solving",
    description: "Analytical thinking and problem-solving approaches",
  },
  {
    id: 8,
    name: "communication",
    title: "Communication",
    description: "Professional and personal communication templates",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryName = Category["name"];
export type CategoryTitle = Category["title"];

/**
 * Helper to get category by name (slug)
 */
export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.name === name);
}

/**
 * Helper to get category by title
 */
export function getCategoryByTitle(title: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.title === title);
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use CATEGORIES directly
 */
export const CATEGORY_CONFIG = Object.fromEntries(
  CATEGORIES.map((cat) => [
    cat.title,
    {
      name: cat.title,
      description: cat.description,
    },
  ])
);
