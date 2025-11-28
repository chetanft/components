/**
 * Story Loader - Direct Storybook Story Imports
 * 
 * This module provides utilities to load and render Storybook stories
 * directly without parsing/converting them. Stories are imported as
 * native ES modules and rendered using their original structure.
 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType, ReactNode } from 'react';
import { storyPathMap } from './story-manifest';

// Type definitions for story modules
export interface StoryMeta<T extends ComponentType<any> = ComponentType<any>> {
  title: string;
  component: T;
  tags?: string[];
  parameters?: Record<string, any>;
  argTypes?: Record<string, any>;
  args?: Record<string, any>;
}

export interface StoryDefinition {
  name: string;
  // For args-based stories
  args?: Record<string, any>;
  // For render-based stories
  render?: (args: any) => ReactNode;
  // For function stories (already a component)
  component?: ComponentType<any>;
  // Raw story object
  story: any;
}

export interface LoadedStoryModule {
  meta: StoryMeta;
  stories: StoryDefinition[];
  rawModule: Record<string, any>;
}

// Map of component names to their story module paths
// (auto-generated via scripts/sync-doc-stories.cjs, see story-manifest.ts)

/**
 * Convert camelCase/PascalCase to display name
 */
export function formatStoryName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Check if a story export is a function component (not an args-based story)
 */
function isFunctionStory(story: any): story is ComponentType<any> {
  return typeof story === 'function' && !story.args && !story.render;
}

/**
 * Check if a story has a render function
 */
function hasRenderFunction(story: any): boolean {
  return typeof story?.render === 'function';
}

/**
 * Check if a story is args-based
 */
function isArgsBasedStory(story: any): boolean {
  return story && typeof story === 'object' && 'args' in story;
}

/**
 * Load a story module by component name
 */
export async function loadStoryModule(componentName: string): Promise<LoadedStoryModule | null> {
  const loader = storyPathMap[componentName];

  if (!loader) {
    console.warn(`No story found for component: ${componentName}`);
    return null;
  }

  try {
    const loadedModule = await loader();
    const meta = loadedModule.default as StoryMeta;

    // Extract all story exports (everything except 'default')
    const stories: StoryDefinition[] = [];

    for (const [exportName, exportValue] of Object.entries(loadedModule)) {
      if (exportName === 'default') continue;

      const storyDef: StoryDefinition = {
        name: exportName,
        story: exportValue,
      };

      if (isFunctionStory(exportValue)) {
        // Function component story
        storyDef.component = exportValue as ComponentType<any>;
      } else if (hasRenderFunction(exportValue)) {
        // Render function story
        storyDef.render = (exportValue as any).render;
        storyDef.args = (exportValue as any).args;
      } else if (isArgsBasedStory(exportValue)) {
        // Args-based story
        storyDef.args = (exportValue as any).args;
      }

      stories.push(storyDef);
    }

    return {
      meta,
      stories,
      rawModule: loadedModule,
    };
  } catch (error) {
    console.error(`Failed to load story module for ${componentName}:`, error);
    return null;
  }
}

/**
 * Get list of all available component names with stories
 */
export function getAvailableStoryComponents(): string[] {
  return Object.keys(storyPathMap).sort();
}

/**
 * Check if a component has a story
 */
export function hasStory(componentName: string): boolean {
  return componentName in storyPathMap;
}
