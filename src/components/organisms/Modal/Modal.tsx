"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  footer?: React.ReactNode;
  closable?: boolean;
  maskClosable?: boolean;
  width?: string | number;
  centered?: boolean;
  showFigmaBadge?: boolean;
  children: React.ReactNode;
}

/**
 * Modal component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  footer,
  closable = true,
  maskClosable = true,
  width = 520,
  centered = true,
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

  // Prevent body scroll when modal is open
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={handleMaskClick}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative z-10",
          "bg-[var(--color-bg-primary)]",
          "rounded-[var(--radius-lg)]",
          "shadow-[var(--shadow-xl)]",
          "max-w-[90vw] max-h-[90vh]",
          "flex flex-col",
          centered && "mx-auto",
          className
        )}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        {...props}
      >
        {showFigmaBadge && (
          <div className="absolute top-2 right-2 z-20">
            <FigmaBadge />
          </div>
        )}

        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-secondary)]">
            {title && (
              <h2
                id="modal-title"
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
                aria-label="Close modal"
              >
                <Icon name="cross" size={20} className="text-[#838c9d]" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--color-border-secondary)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

