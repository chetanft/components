export interface Registry {
  [key: string]: {
    name: string
    type: "components:ui"
    dependencies?: string[]
    registryDependencies?: string[]
    files: Array<{
      name: string
      content: string
    }>
    tailwind?: {
      config?: {
        theme?: Record<string, any>
      }
    }
  }
}

export const registry: Registry = {
  // ATOMS
  "button": {
    name: "button",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "button.tsx",
        content: `import { Button } from "ft-design-system"

export { Button }`
      }
    ]
  },
  "input": {
    name: "input", 
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "input.tsx",
        content: `import { Input } from "ft-design-system"

export { Input }`
      }
    ]
  },
  "badge": {
    name: "badge",
    type: "components:ui", 
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "badge.tsx",
        content: `import { Badge } from "ft-design-system"

export { Badge }`
      }
    ]
  },
  "checkbox": {
    name: "checkbox",
    type: "components:ui",
    dependencies: ["ft-design-system"], 
    files: [
      {
        name: "checkbox.tsx",
        content: `import { Checkbox } from "ft-design-system"

export { Checkbox }`
      }
    ]
  },
  "label": {
    name: "label",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "label.tsx", 
        content: `import { Label } from "ft-design-system"

export { Label }`
      }
    ]
  },
  "switch": {
    name: "switch",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "switch.tsx",
        content: `import { Switch } from "ft-design-system"

export { Switch }`
      }
    ]
  },

  // MOLECULES  
  "dropdown-menu": {
    name: "dropdown-menu",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "dropdown-menu.tsx",
        content: `import { Dropdown } from "ft-design-system"

export { Dropdown as DropdownMenu }`
      }
    ]
  },
  "progress": {
    name: "progress",
    type: "components:ui", 
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "progress.tsx",
        content: `import { ProgressBar } from "ft-design-system"

export { ProgressBar as Progress }`
      }
    ]
  },
  "tabs": {
    name: "tabs",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "tabs.tsx",
        content: `import { SegmentedTabs } from "ft-design-system"

export { SegmentedTabs as Tabs }`
      }
    ]
  },
  "tooltip": {
    name: "tooltip", 
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "tooltip.tsx",
        content: `import { Tooltip } from "ft-design-system"

export { Tooltip }`
      }
    ]
  },

  // ORGANISMS
  "card": {
    name: "card",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "card.tsx", 
        content: `import { Card } from "ft-design-system"

export { Card }`
      }
    ]
  },
  "table": {
    name: "table",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "table.tsx",
        content: `import { Table } from "ft-design-system"

export { Table }`
      }
    ]
  },
  "collapsible": {
    name: "collapsible",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [
      {
        name: "collapsible.tsx",
        content: `import { Collapsible } from "ft-design-system"

export { Collapsible }`
      }
    ]
  }
}

export function getRegistryComponent(name: string) {
  return registry[name]
}

export function getAllRegistryComponents() {
  return Object.values(registry)
}
