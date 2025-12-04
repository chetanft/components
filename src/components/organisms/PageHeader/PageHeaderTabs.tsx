"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * Represents a tab entry for the deprecated declarative API.
 */
export interface PageHeaderTab {
  label: string;
  key: string;
  disabled?: boolean;
}

const TabsContext = createContext<{
  value: string;
  setValue: (nextValue: string) => void;
  registerValue: (value: string) => void;
  unregisterValue: (value: string) => void;
} | null>(null);

const TabsAppearanceContext = createContext<'underline' | 'segmented'>('underline');

const useTabsContext = (component: string) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used within <PageHeaderTabs>.`);
  }
  return context;
};

const useAppearance = () => useContext(TabsAppearanceContext);

export interface PageHeaderTabsBaseProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface LegacyProps {
  items: PageHeaderTab[];
  variant?: 'underline' | 'segmented';
  defaultValue?: string;
}

const PageHeaderTabsBase = forwardRef<HTMLDivElement, PageHeaderTabsBaseProps>(
  ({ className, children, asChild, value, defaultValue, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [registeredValues, setRegisteredValues] = useState<string[]>([]);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const registerValue = useCallback((val: string) => {
      setRegisteredValues((prev) => (prev.includes(val) ? prev : [...prev, val]));
    }, []);

    const unregisterValue = useCallback(
      (val: string) => {
        setRegisteredValues((prev) => prev.filter((item) => item !== val));
        if (!isControlled && currentValue === val) {
          setInternalValue('');
        }
      },
      [currentValue, isControlled]
    );

    useEffect(() => {
      if (!isControlled && !currentValue && registeredValues.length) {
        setInternalValue(registeredValues[0]);
      }
    }, [registeredValues, isControlled, currentValue]);

    const handleValueChange = useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange]
    );

    const contextValue = useMemo(
      () => ({
        value: currentValue,
        setValue: handleValueChange,
        registerValue,
        unregisterValue,
      }),
      [currentValue, handleValueChange, registerValue, unregisterValue]
    );

    const Comp = asChild ? Slot : 'div';

    return (
      <TabsContext.Provider value={contextValue}>
        <Comp
          ref={ref}
          className={cn('flex w-full flex-col gap-[var(--spacing-x2)]', className)}
          {...props}
        >
          {children}
        </Comp>
      </TabsContext.Provider>
    );
  }
);

PageHeaderTabsBase.displayName = 'PageHeaderTabsBase';

export interface PageHeaderTabsProps extends Omit<PageHeaderTabsBaseProps, 'children'> {
  children?: React.ReactNode;
  /** @deprecated Compose tabs as children instead. */
  items?: PageHeaderTab[];
  /** @deprecated Choose `<PageHeaderTabs.List>` or `<PageHeaderTabs.SegmentedList>`. */
  variant?: 'underline' | 'segmented';
  /** @deprecated Renamed to `onValueChange`. */
  onChange?: (value: string) => void;
}

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
};

const PageHeaderTabsComponent = forwardRef<HTMLDivElement, PageHeaderTabsProps>(
  (
    { items, variant = 'underline', onChange, onValueChange, children, defaultValue, ...props },
    ref
  ) => {
    const hasLegacyItems = Array.isArray(items) && items.length > 0;

    if (hasLegacyItems) {
      warn('PageHeaderTabs: `items` + `variant` are deprecated. Compose triggers as children.');
      return (
        <LegacyPageHeaderTabsRenderer
          ref={ref}
          items={items}
          variant={variant}
          defaultValue={defaultValue ?? items?.[0]?.key}
          onValueChange={(value) => {
            onValueChange?.(value);
            onChange?.(value);
          }}
          {...props}
        />
      );
    }

    if (onChange) {
      warn('PageHeaderTabs: `onChange` is deprecated. Use `onValueChange`.');
    }

    return (
      <PageHeaderTabsBase
        ref={ref}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          onValueChange?.(value);
          onChange?.(value);
        }}
        {...props}
      >
        {children}
      </PageHeaderTabsBase>
    );
  }
);

PageHeaderTabsComponent.displayName = 'PageHeaderTabs';

export interface PageHeaderTabsListProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * PageHeaderTabs.List — underline style tab list.
 *
 * @example
 * ```tsx
 * <PageHeaderTabs.List>
 *   <PageHeaderTabs.Trigger value="tracking">Tracking</PageHeaderTabs.Trigger>
 * </PageHeaderTabs.List>
 * ```
 *
 * @remarks
 * - Wraps triggers with a horizontal underline treatment.
 * - Renders `role="tablist"` for accessibility.
 */
export const PageHeaderTabsList = forwardRef<HTMLDivElement, PageHeaderTabsListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <TabsAppearanceContext.Provider value="underline">
        <Comp
          ref={ref}
          role="tablist"
          aria-orientation="horizontal"
          className={cn(
            'relative flex w-full items-end gap-[var(--spacing-x1)] border-b border-[var(--border-secondary)]',
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      </TabsAppearanceContext.Provider>
    );
  }
);

PageHeaderTabsList.displayName = 'PageHeaderTabsList';

/**
 * PageHeaderTabs.SegmentedList — pill style tab container.
 *
 * @example
 * ```tsx
 * <PageHeaderTabs.SegmentedList>
 *   <PageHeaderTabs.Trigger value="timeline">Timeline</PageHeaderTabs.Trigger>
 * </PageHeaderTabs.SegmentedList>
 * ```
 *
 * @remarks
 * - **Props:** Inherits div props, wraps children with padded background.
 * - **Accessibility:** Emits `role="tablist"` with horizontal orientation.
 */
export const PageHeaderTabsSegmentedList = forwardRef<HTMLDivElement, PageHeaderTabsListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <TabsAppearanceContext.Provider value="segmented">
        <Comp
          ref={ref}
          role="tablist"
          aria-orientation="horizontal"
          className={cn(
            'inline-flex items-center gap-[var(--spacing-x1)] rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] p-[var(--spacing-x1)]',
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      </TabsAppearanceContext.Provider>
    );
  }
);

PageHeaderTabsSegmentedList.displayName = 'PageHeaderTabsSegmentedList';

export interface PageHeaderTabsTriggerProps extends ComposableProps<'button'> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * PageHeaderTabs.Trigger — interactive tab button.
 *
 * @example
 * ```tsx
 * <PageHeaderTabs.Trigger value="activity">Activity</PageHeaderTabs.Trigger>
 * ```
 *
 * @remarks
 * - **Props:** Button props via `ComposableProps<'button'>` + Slot support.
 * - **Accessibility:** Renders `role="tab"` with `aria-selected` and `aria-disabled`.
 */
export const PageHeaderTabsTrigger = forwardRef<HTMLButtonElement, PageHeaderTabsTriggerProps>(
  ({ className, value, disabled, children, asChild, ...props }, ref) => {
    const { value: activeValue, setValue, registerValue, unregisterValue } = useTabsContext(
      'PageHeaderTabs.Trigger'
    );
    const appearance = useAppearance();

    useEffect(() => {
      registerValue(value);
      return () => unregisterValue(value);
    }, [registerValue, unregisterValue, value]);

    const Comp = asChild ? Slot : 'button';
    const isActive = activeValue === value;

    const appearanceClasses =
      appearance === 'segmented'
        ? [
            'rounded-[var(--radius-md)] border border-transparent bg-transparent px-[var(--spacing-x4)] py-[var(--spacing-x2)]',
            'text-sm-rem font-medium leading-[1.4] data-[state=active]:bg-[var(--bg-primary)] data-[state=active]:text-[color:var(--primary)]',
            'data-[state=inactive]:text-[var(--secondary)] data-[state=inactive]:hover:bg-[var(--bg-secondary)]',
          ]
        : [
            'rounded-none border-b-2 border-transparent px-[var(--spacing-x6)] py-[var(--spacing-x2)]',
            'text-md-rem font-medium leading-[1.4] data-[state=inactive]:text-[var(--secondary)]',
            'data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)]',
            'data-[state=inactive]:hover:bg-[var(--bg-secondary)] data-[state=inactive]:hover:text-[var(--primary)]',
          ];

    return (
      <Comp
        ref={ref}
        role="tab"
        type={asChild ? undefined : 'button'}
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        data-state={isActive ? 'active' : 'inactive'}
        disabled={disabled}
        className={cn(
          'relative inline-flex min-h-[var(--spacing-x10)] items-center justify-center gap-[var(--spacing-x2)] text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-60',
          appearanceClasses,
          className
        )}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          props.onClick?.(event);
          if (disabled) return;
          if (!asChild) {
            event.preventDefault();
          }
          setValue(value);
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PageHeaderTabsTrigger.displayName = 'PageHeaderTabsTrigger';

const LegacyPageHeaderTabsRenderer = forwardRef<
  HTMLDivElement,
  PageHeaderTabsProps & LegacyProps & { onValueChange?: (value: string) => void }
>(({ items, variant = 'underline', onValueChange, defaultValue, ...props }, ref) => (
  <PageHeaderTabsBase ref={ref} defaultValue={defaultValue} onValueChange={onValueChange} {...props}>
    {variant === 'segmented' ? (
      <PageHeaderTabsSegmentedList>
        {items.map((tab) => (
          <PageHeaderTabsTrigger key={tab.key} value={tab.key} disabled={tab.disabled}>
            {tab.label}
          </PageHeaderTabsTrigger>
        ))}
      </PageHeaderTabsSegmentedList>
    ) : (
      <PageHeaderTabsList>
        {items.map((tab) => (
          <PageHeaderTabsTrigger key={tab.key} value={tab.key} disabled={tab.disabled}>
            {tab.label}
          </PageHeaderTabsTrigger>
        ))}
      </PageHeaderTabsList>
    )}
  </PageHeaderTabsBase>
));

LegacyPageHeaderTabsRenderer.displayName = 'LegacyPageHeaderTabsRenderer';

export const PageHeaderTabs = Object.assign(PageHeaderTabsComponent, {
  List: PageHeaderTabsList,
  SegmentedList: PageHeaderTabsSegmentedList,
  Trigger: PageHeaderTabsTrigger,
});

export default PageHeaderTabs;
