# PROMPTU - UI Documentation

> Terminal-inspired prompt management system

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Design System](#design-system)
3. [Component Guidelines](#component-guidelines)
4. [Loading & Error States](#loading--error-states)
5. [Component Library](#component-library)

---

## Tech Stack

| Technology               | Purpose                            |
| ------------------------ | ---------------------------------- |
| React 19                 | UI Framework                       |
| TypeScript               | Type Safety                        |
| Tailwind CSS v4          | Styling (use Tailwind colors only) |
| shadcn/ui                | Component Primitives               |
| Lucide React             | Icon Library                       |
| Framer Motion            | Animations                         |
| Zustand                  | State Management (if needed)       |
| TanStack Query           | Data Fetching (if needed)          |
| class-variance-authority | Component Variants                 |

---

## Design System

### Color Palette (Tailwind Only)

Use Tailwind's built-in color palette. Create CSS variables only when necessary.

```css
/* Custom variables (only if needed) */
:root {
  --terminal-cursor: theme("colors.white");
}

.dark {
  --background: theme("colors.neutral.950"); /* #0a0a0a */
  --foreground: theme("colors.neutral.500"); /* #737373 */
  --card: theme("colors.neutral.900"); /* #171717 */
  --border: theme("colors.neutral.800"); /* #262626 */
  --muted: theme("colors.neutral.600"); /* #525252 */
}
```

#### Status Colors (Tailwind)

| Status      | Tailwind Class        | Usage                 |
| ----------- | --------------------- | --------------------- |
| Default     | `bg-white text-black` | Primary buttons       |
| Active      | `bg-white text-black` | Active/selected state |
| Muted       | `text-neutral-500`    | Secondary text        |
| Destructive | `bg-red-500`          | Errors                |
| Warning     | `bg-yellow-500`       | Warnings              |
| Success     | `bg-green-400`        | Success states        |

### Typography

| Element | Font        | Class                           |
| ------- | ----------- | ------------------------------- |
| Body    | `Fira Code` | `font-mono`                     |
| Headers | `VT323`     | `font-display` / `.header-font` |

### Design Principles

1. **No Border Radius** — All corners sharp (0px)
2. **White Buttons** — Primary and active buttons are white, not green/grey
3. **Connected Layout** — No outer padding, elements should touch
4. **Inner Padding** — Use padding inside components, not outside
5. **Terminal Aesthetic** — Use `>`, `$`, `//`, `#` prefixes
6. **Uppercase Labels** — Navigation and status in uppercase
7. **Constants & Mapping** — Store configuration in `constants/` folder, use mapping over hardcoded values

---

## Component Guidelines

### Button Styling

```tsx
// ✅ Primary/Active Button — WHITE
<Button className="bg-white text-black hover:bg-neutral-200">
  RUN
</Button>

// ✅ Secondary Button — Outline
<Button variant="outline" className="border-neutral-700 hover:bg-neutral-800">
  COPY
</Button>

// ❌ AVOID: Green or grey buttons
<Button className="bg-green-400">...</Button>  // Don't use
```

### Spacing Rules

```tsx
// ❌ WRONG: Outer padding/margin
<div className="p-4">
  <Card className="p-4">...</Card>
</div>

// ✅ CORRECT: Inner padding only, connected layout
<Card className="p-4">
  <CardContent>...</CardContent>
</Card>
```

### Componentization

Break down into reusable components:

```
components/
├── ui/                 # shadcn primitives
├── common/             # Shared components
│   ├── PageHeader.tsx
│   ├── StatusBadge.tsx
│   ├── TerminalOutput.tsx
│   └── ActionBar.tsx
├── prompts/            # Feature components
│   ├── PromptCard.tsx
│   ├── PromptCardSkeleton.tsx
│   └── PromptGrid.tsx
└── layout/
    ├── Sidebar.tsx
    └── Header.tsx
```

### Constants & Data Mapping

**Always use constants files for configuration data. Never hardcode values.**

Create a `constants/` folder to store all configuration data:

```
src/
├── constants/
│   ├── icons.tsx          # Icon mappings
│   ├── status.ts          # Status configurations
│   ├── navigation.ts      # Navigation items
│   ├── colors.ts          # Color constants
│   └── index.ts           # Central export
```

#### Example: Icon Mapping

```tsx
// constants/icons.tsx
import { Terminal, FolderCode, FileCode2, Cpu } from "lucide-react";

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Coding & Development": <FileCode2 className="h-4 w-4" />,
  "Content Writing": <Terminal className="h-4 w-4" />,
  "AI Tools": <Cpu className="h-4 w-4" />,
  // ...
};

export const NAV_ICONS = {
  home: <Terminal className="h-4 w-4" />,
  library: <FolderCode className="h-4 w-4" />,
  editor: <FileCode2 className="h-4 w-4" />,
  generate: <Cpu className="h-4 w-4" />,
} as const;
```

#### Example: Status Configuration

```tsx
// constants/status.ts
import type { BadgeProps } from "@/components/ui/badge";

export const STATUS_CONFIG = {
  clean: { variant: "clean" as const, label: "CLEAN" },
  warning: { variant: "warning" as const, label: "WARNING" },
  critical: { variant: "critical" as const, label: "CRITICAL" },
  new: { variant: "new" as const, label: "NEW" },
  priority: { variant: "priority" as const, label: "PRIORITY" },
} as const;

export type StatusType = keyof typeof STATUS_CONFIG;
```

#### Example: Navigation Configuration

```tsx
// constants/navigation.ts
export const NAV_ITEMS = [
  { path: "/", label: "HOME", icon: "home" },
  { path: "/library", label: "LIBRARY", icon: "library" },
  { path: "/editor", label: "EDITOR", icon: "editor" },
  { path: "/generate", label: "AI GENERATE", icon: "generate" },
] as const;
```

#### Usage in Components

```tsx
// ✅ CORRECT: Using constants with mapping
import { STATUS_CONFIG } from "@/constants/status";
import { CATEGORY_ICONS } from "@/constants/icons";

function PromptCard({ status, category }: Props) {
  const statusConfig = STATUS_CONFIG[status];
  const icon = CATEGORY_ICONS[category];

  return (
    <Card>
      {icon}
      <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
    </Card>
  );
}

// ❌ WRONG: Hardcoded values
function PromptCard({ status }: Props) {
  return (
    <Badge variant={status === "clean" ? "clean" : "warning"}>
      {status === "clean" ? "CLEAN" : "WARNING"}
    </Badge>
  );
}
```

#### Benefits

- **Maintainability**: Change once, update everywhere
- **Type Safety**: TypeScript can infer types from constants
- **Consistency**: No duplicate or conflicting values
- **Readability**: Clear, centralized configuration
- **Scalability**: Easy to add new options

### Animation with Framer Motion

```tsx
import { motion } from "framer-motion";

// Page transitions
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
  {children}
</motion.div>

// Staggered list
<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      <PromptCard {...item} />
    </motion.div>
  ))}
</motion.div>
```

---

## Loading & Error States

### Skeleton Components

```tsx
// PromptCardSkeleton.tsx
export function PromptCardSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="h-4 w-3/4 bg-neutral-800" />
      <Skeleton className="h-3 w-1/2 mt-2 bg-neutral-800" />
      <Skeleton className="h-20 w-full mt-4 bg-neutral-800" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-16 bg-neutral-800" />
        <Skeleton className="h-8 w-8 bg-neutral-800" />
      </div>
    </Card>
  );
}

// PromptGridSkeleton.tsx
export function PromptGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0">
      {Array.from({ length: count }).map((_, i) => (
        <PromptCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

### Error State Component

```tsx
// ErrorState.tsx
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "ERROR",
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-red-500/30 bg-neutral-900">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-red-500 font-mono">&gt; {title}</p>
      <p className="text-neutral-500 text-sm mt-2">// {message}</p>
      {onRetry && (
        <Button
          variant="outline"
          className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          RETRY
        </Button>
      )}
    </div>
  );
}
```

### Empty State Component

```tsx
// EmptyState.tsx
import { Terminal } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({
  icon = <Terminal className="h-12 w-12" />,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-neutral-800 bg-neutral-900">
      <div className="text-neutral-600 mb-4">{icon}</div>
      <p className="text-neutral-500">&gt; {title}</p>
      {description && <p className="text-neutral-600 text-sm mt-2">// {description}</p>}
    </div>
  );
}
```

### Usage with TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query";

function PromptLibrary() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["prompts"],
    queryFn: fetchPrompts,
  });

  if (isLoading) return <PromptGridSkeleton count={6} />;

  if (isError) return <ErrorState onRetry={refetch} />;

  if (!data?.length) return <EmptyState title="No prompts found" />;

  return <PromptGrid prompts={data} />;
}
```

---

## Component Library

### Badge Variants

| Variant       | Tailwind Classes                      | Usage    |
| ------------- | ------------------------------------- | -------- |
| `default`     | `bg-neutral-700 text-white`           | General  |
| `outline`     | `border-neutral-700 text-neutral-400` | Tags     |
| `success`     | `bg-green-400 text-black`             | Success  |
| `warning`     | `bg-yellow-500 text-black`            | Warning  |
| `destructive` | `bg-red-500 text-white`               | Error    |
| `priority`    | `bg-violet-500 text-white`            | Priority |

### Button Variants

| Variant       | Tailwind Classes                                         |
| ------------- | -------------------------------------------------------- |
| `default`     | `bg-white text-black hover:bg-neutral-200`               |
| `outline`     | `border-neutral-700 bg-transparent hover:bg-neutral-800` |
| `ghost`       | `bg-transparent hover:bg-neutral-800`                    |
| `destructive` | `bg-red-500 text-white hover:bg-red-600`                 |

### Icons (Lucide)

Common icons used:

```tsx
import {
  Terminal, // App logo, empty states
  FolderCode, // Library
  FileCode2, // Editor, files
  Cpu, // AI features
  Search, // Search inputs
  Copy, // Copy action
  Play, // Run action
  RefreshCw, // Refresh/retry
  AlertTriangle, // Errors
  Settings, // Settings
  Home, // Home nav
} from "lucide-react";
```

---

## Accessibility

- Keyboard: `Tab`, `Enter`, `Escape`
- Sidebar toggle: `Ctrl/Cmd + B`
- Focus rings via `focus-visible:`
- ARIA from shadcn/Radix primitives
