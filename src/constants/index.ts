/**
 * Central exports for all constants
 * Import from here to access any constant throughout the app
 *
 * Example usage:
 * import { STATUS_CONFIG, NAV_ITEMS, CATEGORY_ICONS } from '@/constants';
 */

// Icons
export { CATEGORY_ICONS, NAV_ICONS } from "./icons";
export type { NavIconKey } from "./icons";

// Status
export { STATUS_CONFIG, getStatusConfig } from "./status";
export type { StatusType } from "./status";

// Navigation
export { NAV_ITEMS } from "./navigation";
export type { NavItem, NavPath } from "./navigation";

// Categories
export { CATEGORIES, CATEGORY_CONFIG, getCategoryByName, getCategoryByTitle } from "./categories";
export type { Category, CategoryName, CategoryTitle } from "./categories";

// Utils
export { getCategoryBySlug, categoryToSlug, slugToCategory } from "./utils";
