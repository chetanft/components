"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  placement?: DrawerPlacement;
  width?: string | number;
  height?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
  showFigmaBadge?: boolean;
  children: React.ReactNode;
}

/**
 * Drawer component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
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
        className="absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity"
        onClick={handleMaskClick}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div
        className={cn(
          "absolute",
          "bg-[var(--color-bg-primary)]",
          "shadow-[var(--shadow-xl)]",
          "flex flex-col",
          styles.container,
          className
        )}
        style={{
          width: styles.width,
          height: styles.height,
        }}
        {...props}
      >
        {showFigmaBadge && (
          <div className="absolute top-2 right-2 z-20">
            <FigmaBadge />
          </div>
        )}

        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-secondary)] flex-shrink-0">
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
                  "p-1 rounded-[var(--radius-sm)]",
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
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Drawer.displayName = 'Drawer';
