import {
  Code2,
  FileText,
  Briefcase,
  BarChart3,
  Palette,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Terminal,
  FolderCode,
  FileCode2,
  Cpu,
  Home,
} from "lucide-react";

/**
 * Category icon mappings
 * Maps category names to their corresponding Lucide icons
 */
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Coding & Development": <Code2 className="h-4 w-4" />,
  "Content Writing": <FileText className="h-4 w-4" />,
  "Business & Marketing": <Briefcase className="h-4 w-4" />,
  "Data Analysis": <BarChart3 className="h-4 w-4" />,
  "Creative Writing": <Palette className="h-4 w-4" />,
  "Education & Learning": <GraduationCap className="h-4 w-4" />,
  "Problem Solving": <Lightbulb className="h-4 w-4" />,
  Communication: <MessageSquare className="h-4 w-4" />,
} as const;

/**
 * Navigation icon mappings
 * Maps route keys to their corresponding Lucide icons
 */
export const NAV_ICONS = {
  home: <Home className="h-4 w-4" />,
  library: <FolderCode className="h-4 w-4" />,
  editor: <FileCode2 className="h-4 w-4" />,
  generate: <Cpu className="h-4 w-4" />,
  terminal: <Terminal className="h-4 w-4" />,
} as const;

export type NavIconKey = keyof typeof NAV_ICONS;
