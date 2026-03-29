import type { NavIconKey } from "./icons";

/**
 * Main navigation items configuration
 * Used for sidebar navigation and routing
 */
export const NAV_ITEMS = [
  {
    path: "/",
    label: "HOME",
    icon: "home" as NavIconKey,
    description: "Dashboard and overview",
  },
  {
    path: "/library",
    label: "LIBRARY",
    icon: "library" as NavIconKey,
    description: "Browse prompt library",
  },
  {
    path: "/editor",
    label: "EDITOR",
    icon: "editor" as NavIconKey,
    description: "Edit and customize prompts",
  },
  {
    path: "/generate",
    label: "AI GENERATE",
    icon: "generate" as NavIconKey,
    description: "Generate prompts with AI",
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavPath = NavItem["path"];
