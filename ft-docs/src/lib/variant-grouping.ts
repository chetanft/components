/**
 * Variant Grouping Utilities
 * 
 * Normalizes, deduplicates, and groups stories by variant metadata
 * for the Variant Explorer view.
 */

import type { StoryDefinition } from "./story-loader";
import { getVariantPriority } from "@/config/variant-display-order";

/**
 * Group metadata extracted from story
 */
export interface GroupMeta {
  type?: string;      // Primary, Secondary, etc.
  state?: string;     // Default, Disabled, Loading, etc.
  size?: string;      // SM, MD, LG, etc.
  icon?: string;      // WithIcon, IconOnly, etc.
  theme?: string;     // Light, Dark, Night
  other?: string[];   // Any other dimensions
}

/**
 * Normalized story with stable ID and group metadata
 */
export interface NormalizedStory {
  id: string;
  name: string;
  story: StoryDefinition;
  groupMeta: GroupMeta;
}

/**
 * Grouped stories by category
 */
export interface GroupedStories {
  [groupKey: string]: {
    label: string;           // "Type", "State", "Size"
    items: NormalizedStory[];
  };
}

/**
 * Convert string to URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Infer group metadata from story
 * Priority: parameters.variantMeta > story name parsing > args inference
 */
export function inferMeta(
  story: StoryDefinition,
  componentName: string
): GroupMeta {
  const meta: GroupMeta = {};

  // Approach A: Check for explicit variantMeta in parameters
  const variantMeta = story.story?.parameters?.variantMeta;
  if (variantMeta && typeof variantMeta === 'object') {
    if (variantMeta.type) meta.type = String(variantMeta.type);
    if (variantMeta.state) meta.state = String(variantMeta.state);
    if (variantMeta.size) meta.size = String(variantMeta.size);
    if (variantMeta.icon) meta.icon = String(variantMeta.icon);
    if (variantMeta.theme) meta.theme = String(variantMeta.theme);
    if (variantMeta.other && Array.isArray(variantMeta.other)) {
      meta.other = variantMeta.other.map(String);
    }
    // If we got explicit metadata, return early
    if (meta.type || meta.state || meta.size || meta.icon || meta.theme) {
      return meta;
    }
  }

  // Approach B: Parse from story name
  const nameParts = story.name.split(/[/\-_]/).map(part => part.trim());
  const nameLower = story.name.toLowerCase();

  // Common patterns in story names
  const typePatterns = ['primary', 'secondary', 'tertiary', 'destructive', 'text', 'link', 'normal', 'danger', 'success', 'warning', 'neutral'];
  const statePatterns = ['default', 'disabled', 'loading', 'error', 'success', 'warning', 'hover', 'active', 'checked', 'indeterminate'];
  const sizePatterns = ['xs', 'sm', 'md', 'lg', 'xl', 'xxs', 'xxl'];
  const iconPatterns = ['icon', 'withicon', 'icononly', 'leadingicon', 'trailingicon'];

  // Check name parts for type
  for (const part of nameParts) {
    const partLower = part.toLowerCase();
    if (typePatterns.some(p => partLower.includes(p))) {
      meta.type = part;
      break;
    }
  }

  // Check name parts for state
  for (const part of nameParts) {
    const partLower = part.toLowerCase();
    if (statePatterns.some(p => partLower.includes(p))) {
      meta.state = part;
      break;
    }
  }

  // Check name parts for size
  for (const part of nameParts) {
    const partLower = part.toLowerCase();
    if (sizePatterns.some(p => partLower === p || partLower.includes(p))) {
      meta.size = part.toUpperCase();
      break;
    }
  }

  // Check name parts for icon
  for (const part of nameParts) {
    const partLower = part.toLowerCase();
    if (iconPatterns.some(p => partLower.includes(p))) {
      meta.icon = part;
      break;
    }
  }

  // Approach C: Infer from args
  if (story.args) {
    // Check variant prop
    if (!meta.type && story.args.variant) {
      meta.type = String(story.args.variant);
    }

    // Check size prop
    if (!meta.size && story.args.size) {
      const size = String(story.args.size).toUpperCase();
      meta.size = size;
    }

    // Check state props
    if (!meta.state) {
      if (story.args.disabled) meta.state = 'Disabled';
      else if (story.args.loading) meta.state = 'Loading';
      else if (story.args.error) meta.state = 'Error';
      else if (story.args.success) meta.state = 'Success';
      else if (story.args.checked !== undefined) meta.state = story.args.checked ? 'Checked' : 'Unchecked';
    }

    // Check icon props
    if (!meta.icon) {
      if (story.args.icon || story.args.iconLeft || story.args.iconRight) {
        meta.icon = 'WithIcon';
      }
      if (story.args.iconOnly) {
        meta.icon = 'IconOnly';
      }
    }
  }

  return meta;
}

/**
 * Normalize stories: generate stable IDs and deduplicate
 */
export function normalizeStories(
  stories: StoryDefinition[],
  componentName: string
): NormalizedStory[] {
  // Generate normalized stories with IDs
  const normalized = stories.map(story => ({
    id: slugify(story.name),
    name: story.name,
    story,
    groupMeta: inferMeta(story, componentName),
  }));

  // Deduplicate by ID
  const idMap = new Map<string, NormalizedStory>();

  for (const normStory of normalized) {
    const existing = idMap.get(normStory.id);

    if (!existing) {
      idMap.set(normStory.id, normStory);
    } else {
      // Prefer story with richer data (component/render > args only)
      const existingRich = existing.story.component || existing.story.render;
      const currentRich = normStory.story.component || normStory.story.render;

      if (currentRich && !existingRich) {
        // Current has richer data, replace
        idMap.set(normStory.id, normStory);
      } else if (!currentRich && existingRich) {
        // Existing has richer data, keep it
        // Do nothing
      } else {
        // Both have same richness, prefer the one with better groupMeta
        const existingHasMeta = existing.groupMeta.type || existing.groupMeta.state || existing.groupMeta.size;
        const currentHasMeta = normStory.groupMeta.type || normStory.groupMeta.state || normStory.groupMeta.size;

        if (currentHasMeta && !existingHasMeta) {
          idMap.set(normStory.id, normStory);
        }
        // Otherwise keep existing
      }
    }
  }

  // Sort by variant priority
  const sorted = Array.from(idMap.values()).sort((a, b) => {
    const priorityA = getVariantPriority(componentName, a.name);
    const priorityB = getVariantPriority(componentName, b.name);
    return priorityA - priorityB;
  });

  return sorted;
}

/**
 * Group normalized stories by category
 * Returns groups organized by category (Type, State, Size, etc.)
 * Each group contains items that belong to that category
 */
export function groupStories(
  stories: NormalizedStory[]
): GroupedStories {
  const groups: GroupedStories = {};

  // Group priority: type → state → size → icon → theme → other
  const groupOrder = ['type', 'state', 'size', 'icon', 'theme', 'other'] as const;
  const groupLabels: Record<string, string> = {
    type: 'Type',
    state: 'State',
    size: 'Size',
    icon: 'Icon',
    theme: 'Theme',
    other: 'Other',
  };

  // Initialize groups
  for (const groupKey of groupOrder) {
    groups[groupKey] = {
      label: groupLabels[groupKey],
      items: [],
    };
  }

  // Distribute stories to groups based on priority
  for (const story of stories) {
    let added = false;

    // Try to add to group in priority order (first matching category)
    for (const groupKey of groupOrder) {
      const value = story.groupMeta[groupKey];
      if (value && groupKey !== 'other') {
        groups[groupKey].items.push(story);
        added = true;
        break; // Only add to first matching group
      }
    }

    // If no group matched, add to "Other"
    if (!added) {
      groups['other'].items.push(story);
    }
  }

  // Remove empty groups
  const filteredGroups: GroupedStories = {};
  for (const [key, group] of Object.entries(groups)) {
    if (group.items.length > 0) {
      filteredGroups[key] = group;
    }
  }

  return filteredGroups;
}
