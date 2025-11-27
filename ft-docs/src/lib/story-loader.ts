/**
 * Story Loader - Direct Storybook Story Imports
 * 
 * This module provides utilities to load and render Storybook stories
 * directly without parsing/converting them. Stories are imported as
 * native ES modules and rendered using their original structure.
 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType, ReactNode } from 'react';

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
// This will be populated dynamically or statically
const storyPathMap: Record<string, () => Promise<any>> = {
  // Atoms
  'Button': () => import('../../../src/components/atoms/Button/Button.stories'),
  'Badge': () => import('../../../src/components/atoms/Badge/Badge.stories'),
  'Checkbox': () => import('../../../src/components/atoms/Checkbox/Checkbox.stories'),
  'Switch': () => import('../../../src/components/atoms/Switch/Switch.stories'),
  'Avatar': () => import('../../../src/components/atoms/Avatar/Avatar.stories'),
  'Divider': () => import('../../../src/components/atoms/Divider/Divider.stories'),
  'Text': () => import('../../../src/components/atoms/Text/Text.stories'),
  'Typography': () => import('../../../src/components/atoms/Typography/Typography.stories'),
  'Spacer': () => import('../../../src/components/atoms/Spacer/Spacer.stories'),
  'Spin': () => import('../../../src/components/atoms/Spin/Spin.stories'),
  'Statistic': () => import('../../../src/components/atoms/Statistic/Statistic.stories'),
  'SubText': () => import('../../../src/components/atoms/SubText/SubText.stories'),
  'RadioGroup': () => import('../../../src/components/atoms/RadioGroup/RadioGroup.stories'),
  'Textarea': () => import('../../../src/components/atoms/Textarea/Textarea.stories'),
  'Illustration': () => import('../../../src/components/atoms/Illustration/Illustration.stories'),
  'Logo': () => import('../../../src/components/atoms/Logos/Logo.stories'),
  'Icon': () => import('../../../src/components/atoms/Icons/Icon.stories'),
  
  // Molecules
  'Alert': () => import('../../../src/components/molecules/Alert/Alert.stories'),
  'Chicklet': () => import('../../../src/components/molecules/Chicklet/Chicklet.stories'),
  'ColorPicker': () => import('../../../src/components/molecules/ColorPicker/ColorPicker.stories'),
  'Transfer': () => import('../../../src/components/molecules/Transfer/Transfer.stories'),
  'Mentions': () => import('../../../src/components/molecules/Mentions/Mentions.stories'),
  'Watermark': () => import('../../../src/components/molecules/Watermark/Watermark.stories'),
  'Tour': () => import('../../../src/components/molecules/Tour/Tour.stories'),
  'FloatButton': () => import('../../../src/components/molecules/FloatButton/FloatButton.stories'),
  'BackTop': () => import('../../../src/components/molecules/BackTop/BackTop.stories'),
  'Affix': () => import('../../../src/components/molecules/Affix/Affix.stories'),
  'Anchor': () => import('../../../src/components/molecules/Anchor/Anchor.stories'),
  'DatePicker': () => import('../../../src/components/molecules/DatePicker/DatePicker.stories'),
  'Dropdown': () => import('../../../src/components/molecules/Dropdown/Dropdown.stories'),
  'DropdownMenu': () => import('../../../src/components/molecules/DropdownMenu/DropdownMenu.stories'),
  'UploadThumbnail': () => import('../../../src/components/molecules/UploadThumbnail/UploadThumbnail.stories'),
  'UploadItem': () => import('../../../src/components/molecules/UploadItem/UploadItem.stories'),
  'ButtonGroup': () => import('../../../src/components/molecules/ButtonGroup/ButtonGroup.stories'),
  'ProgressBar': () => import('../../../src/components/molecules/ProgressBar/ProgressBar.stories'),
  'Calendar': () => import('../../../src/components/molecules/Calendar/Calendar.stories'),
  'Image': () => import('../../../src/components/molecules/Image/Image.stories'),
  'Tree': () => import('../../../src/components/molecules/Tree/Tree.stories'),
  'Carousel': () => import('../../../src/components/molecules/Carousel/Carousel.stories'),
  'Cascader': () => import('../../../src/components/molecules/Cascader/Cascader.stories'),
  'Timeline': () => import('../../../src/components/molecules/Timeline/Timeline.stories'),
  'TimePicker': () => import('../../../src/components/molecules/TimePicker/TimePicker.stories'),
  'Empty': () => import('../../../src/components/molecules/Empty/Empty.stories'),
  'Slider': () => import('../../../src/components/molecules/Slider/Slider.stories'),
  'InputNumber': () => import('../../../src/components/molecules/InputNumber/InputNumber.stories'),
  'Rate': () => import('../../../src/components/molecules/Rate/Rate.stories'),
  'Pagination': () => import('../../../src/components/molecules/Pagination/Pagination.stories'),
  'Tooltip': () => import('../../../src/components/molecules/Tooltip/Tooltip.stories'),
  'Breadcrumb': () => import('../../../src/components/molecules/Breadcrumb/Breadcrumb.stories'),
  'SimpleColumnLayout': () => import('../../../src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories'),
  'Steps': () => import('../../../src/components/molecules/Steps/Steps.stories'),
  'StackedBarChart': () => import('../../../src/components/molecules/StackedBarChart/StackedBarChart.stories'),
  
  // Organisms
  'Tabs': () => import('../../../src/components/organisms/Tabs/Tabs.stories'),
  'Form': () => import('../../../src/components/organisms/Form/Form.stories'),
  'Grid': () => import('../../../src/components/organisms/Grid/Grid.stories'),
  'Result': () => import('../../../src/components/organisms/Result/Result.stories'),
  'Collapsible': () => import('../../../src/components/organisms/Collapsible/Collapsible.stories'),
  'Modal': () => import('../../../src/components/organisms/Modal/Modal.stories'),
  'PageHeader': () => import('../../../src/components/organisms/PageHeader/PageHeader.stories'),
  'QuickFilters': () => import('../../../src/components/organisms/QuickFilters/QuickFilters.stories'),
  
  // Stories folder (standalone stories)
  'Input': () => import('../../../src/stories/Input.stories'),
  'Label': () => import('../../../src/stories/Label.stories'),
  'Card': () => import('../../../src/stories/Card.stories'),
  'Table': () => import('../../../src/stories/Table.stories'),
  'Upload': () => import('../../../src/stories/Upload.stories'),
  'UploadButton': () => import('../../../src/stories/UploadButton.stories'),
  'UploadZone': () => import('../../../src/stories/UploadZone.stories'),
  'RadioSelector': () => import('../../../src/stories/RadioSelector.stories'),
  'AppHeader': () => import('../../../src/stories/AppHeader.stories'),
  'ProgressList': () => import('../../../src/stories/ProgressList.stories'),
  'FileCard': () => import('../../../src/stories/FileCard.stories'),
  'FileThumbnail': () => import('../../../src/stories/FileThumbnail.stories'),
  'FileValidationCard': () => import('../../../src/stories/FileValidationCard.stories'),
  'FileTypeIcon': () => import('../../../src/stories/FileTypeIcon.stories'),
  'SegmentedTabs': () => import('../../../src/stories/SegmentedTabs.stories'),
  'UserProfile': () => import('../../../src/stories/UserProfile.stories'),
  'UserProfileDropdown': () => import('../../../src/stories/UserProfileDropdown.stories'),
  'NavigationLauncher': () => import('../../../src/stories/NavigationLauncher.stories'),
  'NavigationPopover': () => import('../../../src/stories/NavigationPopover.stories'),
  'Footer': () => import('../../../src/stories/Footer.stories'),
  'ReadOnly': () => import('../../../src/stories/ReadOnly.stories'),
  
  // Charts
  'AreaChart': () => import('../../../src/stories/AreaChart.stories'),
  'LineChart': () => import('../../../src/stories/LineChart.stories'),
  'PieChart': () => import('../../../src/stories/PieChart.stories'),
  'RadarChart': () => import('../../../src/stories/RadarChart.stories'),
  'RadialChart': () => import('../../../src/stories/RadialChart.stories'),
};

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
    const module = await loader();
    const meta = module.default as StoryMeta;
    
    // Extract all story exports (everything except 'default')
    const stories: StoryDefinition[] = [];
    
    for (const [exportName, exportValue] of Object.entries(module)) {
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
      rawModule: module,
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

