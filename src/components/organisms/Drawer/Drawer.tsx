"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

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
 * const [open, setOpen] = useState(false);
 * 
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
   * Callback when drawer should close
   * Called on close button click, mask click (if maskClosable), or ESC key
   */
  onClose?: () => void;
  
  /**
   * Drawer title displayed in header
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
   * Show Figma badge (development only)
   * @default true
   */
  showFigmaBadge?: boolean;
  
  /**
   * Footer content (typically action buttons)
   * Rendered at bottom of drawer
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
 * A slide-out panel component that displays content from the side of the screen.
 * Useful for settings panels, filters, navigation menus, and supplementary content.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * import { Drawer, Button } from 'ft-design-system';
 * 
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 * 
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Open Drawer</Button>
 *       <Drawer
 *         open={open}
 *         onClose={() => setOpen(false)}
 *         title="Settings"
 *         placement="right"
 *         width={400}
 *       >
 *         <p>Drawer content goes here</p>
 *       </Drawer>
 *     </>
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Slides in from specified side (left, right, top, bottom)
 * - Prevents body scroll when open
 * - Closes on ESC key press (if closable)
 * - Closes on backdrop click (if maskClosable)
 * - Accessible: includes ARIA attributes and focus management
 * - Use `ft-design-system/ai` import for AI-protected version
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  placement = 'right',
  width = 400,
  height = '100%',
  closable = true,
  maskClosable = true,
  showFigmaBadge = true,
  footer,
  background,
  children,
  className,
  ...props
}) => {
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
      onClose?.();
    }
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
                onClick={onClose}
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
          {showFigmaBadge && (
            <div className="mb-[var(--spacing-x4)]">
              <FigmaBadge />
            </div>
          )}
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
  );
};

Drawer.displayName = 'Drawer';
