/**
 * Machine-readable spec builder for the Migrations page.
 * Shared by the interactive UI toggle and the /machine/docs/migrations route.
 */

interface Migration {
  component: string;
  version: string;
  status: string;
  description: string;
  changes: string[];
  file: string;
}

const migrations: Migration[] = [
  {
    component: "Table",
    version: "v2",
    status: "complete",
    description:
      "Column header props, render functions, and data access patterns updated",
    changes: [
      "`title`/`label` → `header`",
      "`render` → `cell`",
      "Updated render signature: `(row, context)` instead of `(value, row, index)`",
      "Added `accessorKey` for explicit data access",
    ],
    file: "docs/migrations/table-v2.md",
  },
  {
    component: "Card",
    version: "v2",
    status: "complete",
    description: "Size prop standardization and composable API improvements",
    changes: [
      '`size="default"` → `size="md"`',
      '`size="small"` → `size="sm"`',
      "Legacy props (`title`, `content`, `extra`) deprecated",
      "New composable API with `headerTitle`, `bodySections`",
    ],
    file: "docs/migrations/card-v2.md",
  },
  {
    component: "Badge",
    version: "v2",
    status: "complete",
    description: "Variant name standardization for consistency",
    changes: [
      '`variant="normal"` → `variant="default"`',
      '`variant="danger"` → `variant="error"`',
      "All changes backward compatible with deprecation warnings",
    ],
    file: "docs/migrations/badge-v2.md",
  },
  {
    component: "Dropdown",
    version: "v2",
    status: "complete",
    description: "Options API enhancement and improved accessibility",
    changes: [
      "Enhanced `options` prop with better typing",
      "Improved keyboard navigation",
      "Better ARIA support",
    ],
    file: "docs/migrations/dropdown-v2.md",
  },
  {
    component: "Modal",
    version: "v2",
    status: "complete",
    description: "Size presets and API consistency improvements",
    changes: [
      "Standardized size presets",
      "Improved prop naming consistency",
      "Better event handler patterns",
    ],
    file: "docs/migrations/modal-v2.md",
  },
];

export function buildMigrationsSpec(): string {
  return [
    "# FT Design System — Migration Guides",
    "PURPOSE: component API migration reference",
    "",
    ...migrations.flatMap((migration) => [
      `## ${migration.component} ${migration.version}`,
      `STATUS: ${migration.status}`,
      `DESCRIPTION: ${migration.description}`,
      "CHANGES:",
      ...migration.changes.map((change) => `- ${change}`),
      `GUIDE_FILE: ${migration.file}`,
      "",
    ]),
  ].join("\n");
}
