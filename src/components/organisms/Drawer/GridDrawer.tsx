"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export type GridDrawerSize = 16 | 12 | 7;

export interface GridDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  size?: GridDrawerSize;
  closable?: boolean;
  maskClosable?: boolean;
  showFigmaBadge?: boolean;
  children: React.ReactNode;
}

/**
 * GridDrawer component built using FT Design System tokens.
 * Uses a 24-column grid system with responsive margins and gaps.
 * 
 * Grid specifications:
 * - Desktop (>1440px): 20px margin, 20px gaps
 * - Tablet (<1440px): 16px margin, 16px gaps
 * - Mobile: 4-column grid, 16px gaps and margin
 * 
 * Available sizes:
 * - 16 columns (66.67% width)
 * - 12 columns (50% width)
 * - 7 columns (29.17% width)
 */
export const GridDrawer: React.FC<GridDrawerProps> = ({
  open,
  onClose,
  title,
  size = 16,
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

  // Grid calculation:
  // For a 24-column grid with margins and gaps:
  // Available width = 100vw - left_margin - right_margin
  // In a proper grid, if we have 24 columns with gaps between them:
  // - We have 23 gaps between 24 columns
  // Column width = (available_width - 23*gaps) / 24
  // Drawer width = N * column_width + (N-1) * gap
  // = N * ((available_width - 23*gaps) / 24) + (N-1) * gap
  // = (N/24) * available_width - (N*23/24) * gaps + (N-1) * gap
  // = (N/24) * available_width + gap * ((N-1) - 23N/24)
  // = (N/24) * (100vw - 2*margin) + gap * (24N - 24 - 23N) / 24
  // = (N/24) * (100vw - 2*margin) + gap * (N - 24) / 24
  // 
  // However, for a simpler and more intuitive calculation:
  // We'll use: width = (N/24) * (100vw - 2*margin) + (N-1) * gap
  // This treats gaps as spacing between columns within the drawer

  useEffect(() => {
    const styleId = 'grid-drawer-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .grid-drawer-container {
        --drawer-margin: 20px;
        --drawer-gap: 20px;
      }
      
      .grid-drawer-container .grid-drawer-16 {
        width: calc((100vw - 2 * var(--drawer-margin)) * 16 / 24 + 15 * var(--drawer-gap));
      }
      
      .grid-drawer-container .grid-drawer-12 {
        width: calc((100vw - 2 * var(--drawer-margin)) * 12 / 24 + 11 * var(--drawer-gap));
      }
      
      .grid-drawer-container .grid-drawer-7 {
        width: calc((100vw - 2 * var(--drawer-margin)) * 7 / 24 + 6 * var(--drawer-gap));
      }
      
      @media (max-width: 1440px) {
        .grid-drawer-container {
          --drawer-margin: 16px;
          --drawer-gap: 16px;
        }
      }
      
      @media (max-width: 768px) {
        .grid-drawer-container {
          --drawer-margin: 16px;
          --drawer-gap: 16px;
        }
        
        .grid-drawer-container .grid-drawer-16,
        .grid-drawer-container .grid-drawer-12,
        .grid-drawer-container .grid-drawer-7 {
          width: calc(100vw - 2 * var(--drawer-margin));
        }
      }
    `;
    document.head.appendChild(style);
    // Don't remove on unmount - styles are shared across all instances
  }, []);

  if (!open) return null;

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid-drawer-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'grid-drawer-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity"
        onClick={handleMaskClick}
        aria-hidden="true"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Drawer Content */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0",
          "flex flex-col",
          `grid-drawer-${size}`,
          className
        )}
        style={{
          backgroundColor: 'var(--bg-primary)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          borderRadius: 'var(--radius-md)',
          marginRight: 'var(--drawer-margin)',
          marginTop: 'var(--drawer-margin)',
          marginBottom: 'var(--drawer-margin)',
          maxWidth: 'calc(100vw - 2 * var(--drawer-margin))',
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
          <div
            className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
            style={{
              borderColor: 'var(--border-primary)',
            }}
          >
            {title && (
              <h2
                id="grid-drawer-title"
                className="text-xl font-semibold"
                style={{
                  color: 'var(--primary)',
                }}
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
                  "transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-opacity-20"
                )}
                style={{
                  backgroundColor: 'transparent',
                  transitionDuration: '200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close drawer"
              >
                <Icon name="cross" size={20} style={{ color: 'var(--color-tertiary)' }} />
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

GridDrawer.displayName = 'GridDrawer';
