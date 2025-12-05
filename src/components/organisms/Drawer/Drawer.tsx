"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { DrawerContextProvider } from './DrawerContext';

/**
 * Drawer placement position
 * 
 * @public
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Drawer component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Drawer open={open} onOpenChange={setOpen}>
 *   <DrawerTrigger>
 *     <Button>Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent placement="right" width={400}>
 *     <DrawerHeader>
 *       <DrawerTitle>Settings</DrawerTitle>
 *       <DrawerClose />
 *     </DrawerHeader>
 *     <DrawerBody>
 *       <p>Drawer content goes here</p>
 *     </DrawerBody>
 *     <DrawerFooter>
 *       <Button onClick={() => setOpen(false)}>Close</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * 
 * // Declarative API (deprecated)
 * <Drawer
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Settings"
 *   placement="right"
 *   width={400}
 *   footer={<Button onClick={() => setOpen(false)}>Close</Button>}
 * >
 *   <p>Drawer content goes here</p>
 * </Drawer>
 * ```
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether drawer is open/visible
   * @required
   */
  open: boolean;

  /**
   * Callback when drawer open state changes
   * Use this for controlled drawers with composable API
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback when drawer should close
   * Called on close button click, mask click (if maskClosable), or ESC key
   * @deprecated Use onOpenChange instead for composable API
   */
  onClose?: () => void;

  /**
   * Drawer title displayed in header (for declarative API)
   * @deprecated Use DrawerTitle component within DrawerHeader instead
   */
  title?: string;

  /**
   * Side from which drawer slides in
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Drawer width (for left/right placement)
   * CSS value (e.g., "400px", "50%") or number (pixels)
   * @default 400
   */
  width?: string | number;

  /**
   * Drawer height (for top/bottom placement)
   * CSS value (e.g., "300px", "50vh") or number (pixels)
   * @default '100%'
   */
  height?: string | number;

  /**
   * Show close button in header
   * @default true
   */
  closable?: boolean;

  /**
   * Allow closing drawer by clicking the backdrop/mask
   * @default true
   */
  maskClosable?: boolean;

  /**
   * Footer content (typically action buttons) (for declarative API)
   * Rendered at bottom of drawer
   * @deprecated Use DrawerFooter component instead
   */
  footer?: React.ReactNode;

  /**
   * Custom background color class
   * Overrides default bg-[var(--bg-primary)]
   * Example: "bg-white", "bg-gray-100"
   */
  background?: string;

  /**
   * Drawer content
   * @required
   */
  children: React.ReactNode;
}

/**
 * Drawer Component
 * 
 * A composable slide-out panel component that displays content from the side of the screen.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * Useful for settings panels, filters, navigation menus, and supplementary content.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, Button } from 'ft-design-system';
 * 
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 * 
 *   return (
 *     <Drawer open={open} onOpenChange={setOpen}>
 *       <DrawerTrigger>
 *         <Button>Open Drawer</Button>
 *       </DrawerTrigger>
 *       <DrawerContent placement="right" width={400}>
 *         <DrawerHeader>
 *           <DrawerTitle>Settings</DrawerTitle>
 *           <DrawerClose />
 *         </DrawerHeader>
 *         <DrawerBody>
 *           <p>Drawer content goes here</p>
 *         </DrawerBody>
 *         <DrawerFooter>
 *           <Button onClick={() => setOpen(false)}>Close</Button>
 *         </DrawerFooter>
 *       </DrawerContent>
 *     </Drawer>
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (DrawerTrigger, DrawerContent, DrawerHeader, etc.) support `asChild`
 * - Slides in from specified side (left, right, top, bottom)
 * - Prevents body scroll when open
 * - Closes on ESC key press and backdrop click
 * - Accessible: includes ARIA attributes and focus management
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({
  open,
  onOpenChange,
  onClose,
  title,
  placement = 'right',
  width = 400,
  height = '100%',
  closable = true,
  maskClosable = true,
  footer,
  background,
  children,
  className,
  ...props
}, ref) => {
  // Deprecation warning for dual handlers
  if (process.env.NODE_ENV !== 'production' && onClose && onOpenChange) {
    console.warn(
      'Drawer: Both `onClose` and `onOpenChange` provided. ' +
      '`onClose` is deprecated - use `onOpenChange` only. ' +
      'onClose will be removed in v4.0.'
    );
  }

  // Unified handler (prefer onOpenChange)
  const handleOpenChange = React.useCallback((value: boolean) => {
    onOpenChange?.(value);
    if (!value) {
      onClose?.();
    }
  }, [onOpenChange, onClose]);

  // Check if using composable API (has DrawerContent, DrawerTrigger, etc. as children)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) =>
    child?.type?.displayName?.startsWith('Drawer')
  );

  // If using composable API, wrap with context provider
  if (hasComposableChildren) {
    // Show deprecation warning if using old props with composable API
    if (process.env.NODE_ENV !== 'production' && (title || footer)) {
      console.warn(
        'Drawer: Using deprecated props (title, footer) with composable API. ' +
        'Please use DrawerTitle, DrawerHeader, DrawerFooter components instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

    return (
      <DrawerContextProvider
        open={open}
        onOpenChange={onOpenChange || (onClose ? () => onClose() : undefined)}
        onClose={onClose}
      >
        {children}
      </DrawerContextProvider>
    );
  }

  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Drawer: Declarative API (title, footer props) is deprecated. ' +
      'Please migrate to composable API using DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter components. ' +
      'See migration guide: docs/migrations/composable-migration.md'
    );
  }
  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closable, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget) {
      onOpenChange?.(false);
      onClose?.();
    }
  };

  const handleClose = () => {
    if (!closable) return;
    onOpenChange?.(false);
    onClose?.();
  };

  const placementStyles = {
    left: {
      container: 'left-0 top-0 bottom-0',
      width: typeof width === 'number' ? `${width}px` : width,
      height: '100%',
    },
    right: {
      container: 'right-0 top-0 bottom-0',
      width: typeof width === 'number' ? `${width}px` : width,
      height: '100%',
    },
    top: {
      container: 'top-0 left-0 right-0',
      width: '100%',
      height: typeof height === 'number' ? `${height}px` : height,
    },
    bottom: {
      container: 'bottom-0 left-0 right-0',
      width: '100%',
      height: typeof height === 'number' ? `${height}px` : height,
    },
  };

  const styles = placementStyles[placement];

  return (
    <DrawerContextProvider open={open} onOpenChange={onOpenChange || (onClose ? () => onClose() : undefined)} onClose={onClose}>
      <div
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleMaskClick}
          aria-hidden="true"
        />

        {/* Drawer Content */}
        <div
          className={cn(
            "absolute",
            background || "bg-[var(--bg-primary)]",
            "flex flex-col",
            styles.container,
            className
          )}
          style={{
            width: styles.width,
            height: styles.height,
            boxShadow: 'var(--shadow-xl)',
          }}
          {...props}
        >
          {/* Header */}
          {(title || closable) && (
            <div className="flex items-center justify-between px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-b border-[var(--color-border-secondary)] flex-shrink-0">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-xl font-semibold text-[var(--color-primary)]"
                >
                  {title}
                </h2>
              )}
              {closable && (
                <button
                  type="button"
                  onClick={handleClose}
                  className={cn(
                    "p-[var(--spacing-x1)] rounded-[var(--radius-sm)]",
                    "hover:bg-[var(--color-bg-secondary)]",
                    "transition-colors duration-[var(--transition-fast)]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20"
                  )}
                  aria-label="Close drawer"
                >
                  <Icon name="cross" size={20} className="text-[var(--color-tertiary)]" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn(
            "flex-1 overflow-y-auto px-[var(--spacing-x6)] py-[var(--spacing-x4)]",
            background ? "" : "bg-[var(--bg-secondary)]/30"
          )}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex-shrink-0 px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-t border-[var(--color-border-secondary)]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </DrawerContextProvider>
  );
});

Drawer.displayName = 'Drawer';
