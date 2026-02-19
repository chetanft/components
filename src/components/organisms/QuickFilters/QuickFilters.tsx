import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, getGlassInnerBg, type GlassVariant } from '../../../lib/glass';
import { Icon } from '../../atoms/Icons';

export type FilterType = 'normal' | 'alert' | 'warning' | 'success' | 'neutral';
export type FilterState = 'default' | 'selected';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  type?: FilterType;
}

export interface QuickFilter {
  id: string;
  label: string;
  count?: number;
  type?: FilterType;
  options?: FilterOption[];
  selected?: boolean;
  selectedOption?: string;
}

export interface QuickFiltersProps {
  /**
   * Filters array (for declarative API)
   * @deprecated Use QuickFilter components as children instead
   */
  filters?: QuickFilter[];
  onFilterClick?: (filterId: string, optionId?: string) => void;
  onFilterRemove?: (filterId: string, optionId?: string) => void;
  className?: string;
  scrollable?: boolean;
  /**
   * Additional className for filter chip wrapper.
   */
  chipClassName?: string;
  /**
   * Additional className for chip label text.
   */
  labelClassName?: string;
  /**
   * Additional className for count badge text.
   */
  countClassName?: string;
  /**
   * Glass morphism variant
   * When enabled, applies glass/frosted-glass styling to the filter chips
   */
  glass?: GlassVariant;
  /**
   * Filter components (for composable API)
   */
  children?: React.ReactNode;
}

export interface QuickFilterComponentProps {
  /**
   * Filter ID (required)
   */
  id: string;
  /**
   * Filter label
   */
  label?: string;
  /**
   * Filter count
   */
  count?: number;
  /**
   * Filter type
   */
  type?: FilterType;
  /**
   * Whether filter is selected
   */
  selected?: boolean;
  /**
   * Selected option ID (for multi-option filters)
   */
  selectedOption?: string;
  /**
   * Filter options (for composable API)
   */
  children?: React.ReactNode;
}

export interface FilterOptionComponentProps {
  /**
   * Option ID (required)
   */
  id: string;
  /**
   * Option label
   */
  label?: string;
  /**
   * Option count
   */
  count?: number;
  /**
   * Option type
   */
  type?: FilterType;
  /**
   * Option content (for composable API)
   */
  children?: React.ReactNode;
}

const FilterChip: React.FC<{
  filter: QuickFilter;
  option?: FilterOption;
  isSelected: boolean;
  onSelect: () => void;
  onRemove?: () => void;
  showBorder?: boolean;
  isMainLabel?: boolean;
  chipClassName?: string;
  labelClassName?: string;
  countClassName?: string;
  resolvedGlass?: GlassVariant;
}> = ({ filter, option, isSelected, onSelect, onRemove, showBorder = true, isMainLabel = false, chipClassName, labelClassName, countClassName, resolvedGlass }) => {
  const displayLabel = option?.label || filter.label;
  const displayCount = option?.count || filter.count;
  const displayType = option?.type || filter.type || 'normal';

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[var(--spacing-x2)] px-[var(--spacing-x2)] h-[34px] rounded-[var(--radius-md)] cursor-pointer transition-all duration-200",
        "text-sm font-semibold font-inter",
        // Background based on Figma design
        isMainLabel
          ? getGlassInnerBg(resolvedGlass, "bg-[var(--color-border-secondary)]", "bg-white/10")
          : isSelected
            ? getGlassInnerBg(resolvedGlass, "bg-[var(--color-border-secondary)]", "bg-white/10")
            : getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]"),
        // Border: always show border except for main labels without border
        showBorder && !isMainLabel ? "box-border border border-[var(--color-border-primary)]" : "",
        chipClassName
      )}
      onClick={!isMainLabel ? onSelect : undefined}
      role={!isMainLabel ? "button" : undefined}
      tabIndex={!isMainLabel ? 0 : undefined}
      aria-pressed={!isMainLabel ? isSelected : undefined}
      onKeyDown={!isMainLabel ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      } : undefined}
    >
      {/* Count badge - shows before label when present */}
      {displayCount !== undefined && (
        <span
          className={cn(
            "inline-flex items-center justify-center px-[var(--spacing-x2)] py-[var(--spacing-x1)] text-sm font-semibold min-w-[var(--spacing-x6)] h-[var(--spacing-x5)]",
            // Count badge border radius
            "rounded-[var(--radius-full)]",
            // Count badge styling based on state and type
            isSelected
              ? cn(
                getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]"),
                displayType === 'alert' ? "text-[var(--color-critical)]" :
                  displayType === 'warning' ? "text-[var(--color-warning)]" :
                    displayType === 'success' ? "text-[var(--color-positive)]" :
                      displayType === 'neutral' ? "text-[var(--color-neutral)]" :
                        "text-[var(--color-primary)]"
              )
              : cn(
                getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-secondary)]"),
                displayType === 'alert' ? "text-[var(--color-critical)]" :
                  displayType === 'warning' ? "text-[var(--color-warning)]" :
                    displayType === 'success' ? "text-[var(--color-positive)]" :
                      displayType === 'neutral' ? "text-[var(--color-neutral)]" :
                        "text-[var(--color-primary)]",
            countClassName
              )
          )}
        >
          {displayCount}
        </span>
      )}

      {/* Label */}
      <span className={cn("text-[var(--color-primary)]", labelClassName)}>
        {displayLabel}
      </span>

      {/* Space for tick icon - only show when not a main label */}
      {!isMainLabel && (
        <div className="flex items-center justify-center w-[14px] h-full ml-[var(--spacing-x1)]">
          {isSelected && onRemove && (
            <div
              className="cursor-pointer flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${displayLabel} filter`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove();
                }
              }}
            >
              <Icon
                name="check-alt"
                size={14}
                className="text-[var(--color-primary)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MultiOptionFilter: React.FC<{
  filter: QuickFilter;
  onFilterClick: (filterId: string, optionId?: string) => void;
  onFilterRemove: (filterId: string, optionId?: string) => void;
  chipClassName?: string;
  labelClassName?: string;
  countClassName?: string;
  resolvedGlass?: GlassVariant;
}> = ({ filter, onFilterClick, onFilterRemove, chipClassName, labelClassName, countClassName, resolvedGlass }) => {
  return (
    <div className={cn("inline-flex items-center h-[36px] rounded-[var(--radius-md)] overflow-hidden", getGlassClasses(resolvedGlass, "bg-[var(--color-bg-primary)]", "border border-[var(--color-border-primary)]"))}>
      {/* Main filter section - non-clickable label with gray background */}
      <div className={cn("h-full flex items-center px-[var(--spacing-x2)]", getGlassInnerBg(resolvedGlass, "bg-[var(--color-border-secondary)]", "bg-white/10"))}>
        <FilterChip
          filter={filter}
          isSelected={false}
          onSelect={() => { }}
          onRemove={undefined}
          showBorder={false}
          isMainLabel={true}
          chipClassName={chipClassName}
          labelClassName={labelClassName}
          countClassName={countClassName}
          resolvedGlass={resolvedGlass}
        />
      </div>

      {/* Options section with separators */}
      {filter.options?.map((option, index) => (
        <React.Fragment key={option.id}>
          {index > 0 && <div className="w-px h-[36px] bg-[var(--color-border-primary)]" />}
          <div className="px-[var(--spacing-x1)] h-full flex items-center">
            <FilterChip
              filter={filter}
              option={option}
              isSelected={filter.selectedOption === option.id}
              onSelect={() => onFilterClick(filter.id, option.id)}
              onRemove={filter.selectedOption === option.id ?
                () => onFilterRemove(filter.id, option.id) : undefined
              }
              showBorder={false}
              chipClassName={chipClassName}
              labelClassName={labelClassName}
              countClassName={countClassName}
              resolvedGlass={resolvedGlass}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters = [],
  onFilterClick = () => { },
  onFilterRemove = () => { },
  className,
  scrollable = false,
  chipClassName,
  labelClassName,
  countClassName,
  glass,
  children,
}) => {
  const resolvedGlass = useResolvedGlass(glass);
  // Extract filters from children if using composable API
  const filtersFromChildren = React.useMemo(() => {
    if (!children) return [];
    return React.Children.toArray(children)
      .filter((child): child is React.ReactElement<QuickFilterComponentProps> => 
        React.isValidElement(child) && child.type === QuickFilter
      )
      .map(child => {
        // Extract FilterOption children
        const optionChildren = React.Children.toArray(child.props.children)
          .filter((opt): opt is React.ReactElement<FilterOptionComponentProps> => 
            React.isValidElement(opt) && opt.type === FilterOption
          );
        
        const options: FilterOption[] = optionChildren.map(opt => ({
          id: opt.props.id,
          label: String(opt.props.children || opt.props.label || opt.props.id),
          count: opt.props.count,
          type: opt.props.type,
        }));

        // Label comes from props.label, not children (children are FilterOptions for multi-option filters)
        return {
          id: child.props.id,
          label: String(child.props.label || child.props.id),
          count: child.props.count,
          type: child.props.type,
          options: options.length > 0 ? options : undefined,
          selected: child.props.selected,
          selectedOption: child.props.selectedOption,
        } as QuickFilter;
      });
  }, [children]);

  // Use children filters if available, otherwise use filters prop
  const allFilters: QuickFilter[] = filtersFromChildren.length > 0 ? filtersFromChildren : filters;

  // Check if using composable API
  const hasComposableChildren = React.Children.count(children) > 0 && filtersFromChildren.length > 0;

  // Show deprecation warning
  if (process.env.NODE_ENV !== 'production') {
    if (hasComposableChildren && filters.length > 0) {
          } else if (!hasComposableChildren && filters.length > 0) {
          }
  }
  return (
    <div
      className={cn(
        'flex gap-[var(--spacing-x2)]',
        scrollable ? 'overflow-x-auto overflow-y-hidden flex-nowrap' : 'flex-wrap',
        className
      )}
      role="group"
      aria-label="Quick filters"
      style={scrollable ? {
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
      } : undefined}
    >
      {allFilters.map((filter) => {
        if (filter.options && filter.options.length > 0) {
          // Multi-option filter
          return (
            <div key={filter.id} className={scrollable ? 'flex-shrink-0' : ''}>
              <MultiOptionFilter
                filter={filter}
                onFilterClick={onFilterClick}
                onFilterRemove={onFilterRemove}
                chipClassName={chipClassName}
                labelClassName={labelClassName}
                countClassName={countClassName}
                resolvedGlass={resolvedGlass}
              />
            </div>
          );
        } else {
          // Single option filter - wrap FilterChip in container
          return (
            <div
              key={filter.id}
              className={cn(
                "box-border h-[36px] flex items-center px-[var(--spacing-x1)] py-0 rounded-[var(--radius-md)]",
                "border border-solid",
                filter.selected
                  ? cn(getGlassInnerBg(resolvedGlass, "bg-[var(--color-border-secondary)]", "bg-white/10"), "border-[var(--color-border-primary)]")
                  : cn(getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]"), "border-[var(--color-border-primary)]"),
                scrollable ? 'flex-shrink-0' : ''
              )}
            >
              <FilterChip
                filter={filter}
                isSelected={filter.selected || false}
                onSelect={() => onFilterClick(filter.id)}
                onRemove={filter.selected ? () => onFilterRemove(filter.id) : undefined}
                showBorder={false}
                chipClassName={chipClassName}
                labelClassName={labelClassName}
                countClassName={countClassName}
                resolvedGlass={resolvedGlass}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

QuickFilters.displayName = 'QuickFilters';

/**
 * QuickFilter Component
 *
 * A composable component for individual filters in a QuickFilters component.
 *
 * @public
 *
 * @example
 * ```tsx
 * <QuickFilters onFilterClick={handleClick}>
 *   <QuickFilter id="all" label="All Items" />
 *   <QuickFilter id="active" label="Active" count={12} />
 *   <QuickFilter id="status" label="Status">
 *     <FilterOption id="active" label="Active" count={12} />
 *     <FilterOption id="pending" label="Pending" count={5} />
 *   </QuickFilter>
 * </QuickFilters>
 * ```
 */
export const QuickFilter: React.FC<QuickFilterComponentProps> = () => {
  // This component is used for composition only - it doesn't render anything itself
  // The QuickFilters component extracts props from QuickFilter children
  return null;
};

QuickFilter.displayName = 'QuickFilter';

/**
 * FilterOption Component
 *
 * A composable component for individual options within a QuickFilter.
 *
 * @public
 *
 * @example
 * ```tsx
 * <QuickFilter id="status" label="Status">
 *   <FilterOption id="active" label="Active" count={12} />
 *   <FilterOption id="pending" label="Pending" count={5} />
 * </QuickFilter>
 * ```
 */
export const FilterOption: React.FC<FilterOptionComponentProps> = () => {
  // This component is used for composition only - it doesn't render anything itself
  // The QuickFilters component extracts props from FilterOption children
  return null;
};

FilterOption.displayName = 'FilterOption'; 
