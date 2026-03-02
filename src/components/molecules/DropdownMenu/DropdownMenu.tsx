"use client";
import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { DropdownMenuItem } from './DropdownMenuItem';
import { SegmentedTabs, SegmentedTabItem, type SegmentedTabItem as SegmentedTabItemType } from '../SegmentedTabs';
import { DropdownMenuProvider, type DropdownMenuContextType } from './DropdownMenuContext';
import { DropdownMenuList } from './DropdownMenuList';
import { DropdownMenuSearch } from './DropdownMenuSearch';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import type { ComposableProps } from '../../../lib/slot';

const dropdownMenuVariants = cva(
  'box-border flex flex-col items-start overflow-clip p-[var(--spacing-x2)] relative rounded-[var(--radius-md)] shadow-lg',
  {
    variants: {
      property: {
        default: 'gap-[var(--spacing-x1)] w-[calc(var(--spacing-x10)*7.5)]',
        search: 'gap-[var(--spacing-x4)] w-[calc(var(--spacing-x10)*7.5)]',
        'search-segmented': 'gap-[var(--spacing-x4)] w-[calc(var(--spacing-x10)*7.5)]',
        'disabled-info': 'gap-[var(--spacing-x1)] w-[calc(var(--spacing-x10)*7.5+var(--spacing-x1))]',
        groups: 'gap-[var(--spacing-x3)] w-[calc(var(--spacing-x10)*7.5+var(--spacing-x1))]',
      },
    },
    defaultVariants: {
      property: 'default',
    },
  }
);

export interface DropdownMenuProps
  extends Omit<ComposableProps<'div'>, 'onSelect' | 'property'> {
  /**
   * Menu property type
   * @default 'default'
   */
  property?: VariantProps<typeof dropdownMenuVariants>['property'];
  /**
   * Show scroll bar
   * @default false
   */
  showScrollBar?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Select handler
   */
  onSelect?: (value: string) => void;
  /**
   * Segments for segmented search
   */
  segments?: SegmentedTabItemType[];
  /**
   * Selected segment
   */
  selectedSegment?: string;
  /**
   * Segment change handler
   */
  onSegmentChange?: (value: string) => void;
  /**
   * DropdownMenu content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Glass morphism variant
   */
  glass?: GlassVariant;
}

/**
 * DropdownMenu Component
 *
 * A dropdown menu component with options, search, and groups support.
 * Uses a composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DropdownMenu property="search">
 *   <DropdownMenuSearch />
 *   <DropdownMenuList>
 *     <DropdownMenuItem value="1">Option 1</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem value="2">Option 2</DropdownMenuItem>
 *   </DropdownMenuList>
 * </DropdownMenu>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (DropdownMenuList, DropdownMenuItem, etc.) support `asChild`
 * - Supports search, groups, segmented tabs, and keyboard navigation
 */
const DropdownMenuBase = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      property = 'default',
      showScrollBar = false,
      className,
      onSelect,
      segments,
      selectedSegment,
      onSegmentChange,
      children,
      glass,
      asChild: _asChild,
      ...props
    },
    ref
  ) => {
    const resolvedGlass = useResolvedGlass(glass);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Create context value
    const contextValue: DropdownMenuContextType = {
      property: property || 'default',
      selectedValue,
      setSelectedValue,
      searchQuery,
      setSearchQuery,
      focusedIndex,
      setFocusedIndex,
      onSelect,
      segments,
      selectedSegment,
      onSegmentChange,
      showScrollBar,
      glass: resolvedGlass,
    };

    const renderSegmentedControl = () => {
      if (property !== 'search-segmented' || !segments) return null;

      return (
        <SegmentedTabs
          value={selectedSegment}
          onChange={onSegmentChange}
          className="w-full"
        >
          {segments.map((segment) => (
            <SegmentedTabItem key={segment.value} value={segment.value} icon={segment.icon}>
              {segment.label}
            </SegmentedTabItem>
          ))}
        </SegmentedTabs>
      );
    };

    const renderScrollBar = () => {
      if (!showScrollBar) return null;

      return (
        <div className="h-[calc(var(--spacing-x11)+var(--spacing-x1))] relative shrink-0 w-[var(--spacing-x1)]">
          <div className="w-full h-full bg-[var(--color-border-secondary)] rounded-full">
            <div className="w-full h-[40%] bg-[var(--color-border-primary)] rounded-full" />
          </div>
        </div>
      );
    };

    return (
      <DropdownMenuProvider value={contextValue}>
        <div
          ref={ref}
          role="menu"
          className={cn(dropdownMenuVariants({ property }), getGlassClasses(resolvedGlass, 'bg-[var(--color-bg-primary)]', 'border border-solid border-[var(--color-border-primary)]'), className)}
          {...props}
        >
          {/* Segmented Control */}
          {renderSegmentedControl()}

          {/* List Container - Render children directly */}
          <div className="content-stretch flex gap-[var(--spacing-x4)] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-1 flex-col gap-[var(--spacing-x1)] items-start min-w-0 relative shrink-0">
              {children}
            </div>
            {/* Scroll Bar */}
            {renderScrollBar()}
          </div>
        </div>
      </DropdownMenuProvider>
    );
  }
);

DropdownMenuBase.displayName = 'DropdownMenu';

// Attach subcomponents for composable API
(DropdownMenuBase as any).DropdownMenuItem = DropdownMenuItem;
(DropdownMenuBase as any).DropdownMenuLabel = DropdownMenuLabel;
(DropdownMenuBase as any).DropdownMenuSeparator = DropdownMenuSeparator;
(DropdownMenuBase as any).DropdownMenuList = DropdownMenuList;
(DropdownMenuBase as any).DropdownMenuSearch = DropdownMenuSearch;

// Type for DropdownMenu with subcomponents
type DropdownMenuWithSubcomponents = typeof DropdownMenuBase & {
  DropdownMenuItem: typeof DropdownMenuItem;
  DropdownMenuLabel: typeof DropdownMenuLabel;
  DropdownMenuSeparator: typeof DropdownMenuSeparator;
  DropdownMenuList: typeof DropdownMenuList;
  DropdownMenuSearch: typeof DropdownMenuSearch;
};

// Export with proper typing
export const DropdownMenu = DropdownMenuBase as DropdownMenuWithSubcomponents;
export default DropdownMenu;
