# Constants Folder

This folder contains all configuration data and constants used throughout the application. By centralizing constants here, we ensure maintainability, consistency, and type safety.

## 📁 Structure

```
constants/
├── index.ts           # Central export point
├── icons.tsx          # Icon mappings for categories and navigation
├── status.ts          # Status configurations for prompts
├── navigation.ts      # Navigation item definitions
├── categories.ts      # Category definitions and metadata
└── prompts.ts         # Prompt data and types
```

## 🎯 Benefits

- **Single Source of Truth**: Change once, update everywhere
- **Type Safety**: TypeScript infers types from constants
- **Maintainability**: Easy to add, remove, or modify values
- **Consistency**: No duplicate or conflicting values
- **Readability**: Clear, centralized configuration

## 📚 Usage Examples

### Importing Constants

```tsx
// Import from the central index
import { STATUS_CONFIG, NAV_ITEMS, CATEGORY_ICONS } from "@/constants";

// Or import specific files
import { getStatusConfig } from "@/constants/status";
import { CATEGORIES } from "@/constants/categories";
```

### Using Icon Mappings

```tsx
import { CATEGORY_ICONS, NAV_ICONS } from "@/constants";

// Render category icon
<div>{CATEGORY_ICONS["Coding & Development"]}</div>

// Render navigation icon
<div>{NAV_ICONS.home}</div>
```

### Using Status Configuration

```tsx
import { STATUS_CONFIG, getStatusConfig } from "@/constants";

// Get status config
const statusConfig = getStatusConfig("clean");

// Render badge with status
<Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;

// Map over all statuses
{
  Object.keys(STATUS_CONFIG).map((statusKey) => {
    const config = STATUS_CONFIG[statusKey];
    return (
      <Badge key={statusKey} variant={config.variant}>
        {config.label}
      </Badge>
    );
  });
}
```

### Using Navigation Items

```tsx
import { NAV_ITEMS, NAV_ICONS } from "@/constants";

// Map navigation items
{
  NAV_ITEMS.map((item) => (
    <Link key={item.path} to={item.path}>
      {NAV_ICONS[item.icon]}
      <span>{item.label}</span>
    </Link>
  ));
}
```

### Using Categories

```tsx
import { CATEGORIES, CATEGORY_ICONS } from "@/constants";

// Map categories
{
  CATEGORIES.map((category) => (
    <div key={category}>
      {CATEGORY_ICONS[category]}
      <span>{category}</span>
    </div>
  ));
}
```

## ✅ Best Practices

### ✅ DO

- Import from `@/constants` or `@/constants/[file]`
- Use mapping (`map()`, `Object.keys()`) to iterate over constants
- Add new constants to appropriate files
- Export types alongside constants
- Document new constants with JSDoc comments

### ❌ DON'T

- Hardcode values that should be in constants
- Duplicate constant definitions across files
- Import from the old `contants` folder (typo - deprecated)
- Create switch statements when you can use config objects
- Store constant data directly in components

## 🔄 Migration from Old Structure

The old `contants` folder (with typo) is deprecated. Use the new `constants` folder:

```tsx
// ❌ Old (deprecated)
import { prebuiltPrompts } from "@/contants/prompts";

// ✅ New (correct)
import { prebuiltPrompts } from "@/constants/prompts";
```

## 📝 Adding New Constants

1. Choose the appropriate file (or create a new one)
2. Define the constant with proper TypeScript types
3. Add JSDoc comments for documentation
4. Export from the file
5. Add to `index.ts` if it should be globally available
6. Update this README

### Example: Adding New Status

```tsx
// In constants/status.ts
export const STATUS_CONFIG = {
  // ... existing statuses
  archived: {
    variant: "ghost" as const,
    label: "ARCHIVED",
    description: "No longer active",
  },
} as const;
```

## 🔍 Related Documentation

- See [UI_DOCUMENTATION.md](../../UI_DOCUMENTATION.md) for design guidelines
- See component examples in `/src/components/sections/`
