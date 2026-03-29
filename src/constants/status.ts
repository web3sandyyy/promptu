/**
 * Status configuration for prompts and system states
 * Defines badge variants and labels for each status type
 */
export const STATUS_CONFIG = {
  clean: {
    variant: "clean" as const,
    label: "CLEAN",
    description: "Ready to use, no issues",
  },
  warning: {
    variant: "warning" as const,
    label: "WARNING",
    description: "May need attention",
  },
  critical: {
    variant: "critical" as const,
    label: "CRITICAL",
    description: "Requires immediate action",
  },
  new: {
    variant: "new" as const,
    label: "NEW",
    description: "Recently added",
  },
  priority: {
    variant: "priority" as const,
    label: "PRIORITY",
    description: "High priority item",
  },
} as const;

export type StatusType = keyof typeof STATUS_CONFIG;

/**
 * Get status configuration by status key
 */
export const getStatusConfig = (status?: StatusType) => {
  if (!status) return null;
  return STATUS_CONFIG[status];
};
