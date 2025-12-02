"use client";

import React, { useEffect, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  footer?: React.ReactNode;
  closable?: boolean;
  maskClosable?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  width?: string | number;
  centered?: boolean;
  showFigmaBadge?: boolean;
  children: React.ReactNode;
}

const modalSizes = {
  sm: '400px',
  md: '520px',
  lg: '720px',
  xl: '960px',
  full: '90vw'
};

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
  size = 'md',
  width,
  centered = true,
  showFigmaBadge = true,
  children,
  className,
  onClick,
  ...props
}) => {
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

  const handleClose = useCallback(() => {
    if (!closable) return;
    try {
      onClose?.();
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }, [closable, onClose]);

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closable, handleClose]);

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCloseClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    handleClose();
  }, [handleClose]);

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only stop propagation if clicking the modal content itself, not children
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (!open) return null;

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
          "rounded-[var(--radius-lg)]",
          "max-w-[90vw] max-h-[90vh]",
          "flex flex-col",
          "bg-[var(--bg-primary)] border border-[var(--border-primary)]",
          centered && "mx-auto",
          className
        )}
        style={{
          width: width || modalSizes[size],
          boxShadow: 'var(--shadow-xl)',
        }}
        onClick={handleModalContentClick}
        {...props}
      >
        {/* Header */}
        {(title || closable) && (
          <div
            className="flex items-center justify-between px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-b border-[var(--border-secondary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-[var(--primary)]"
              >
                {title}
              </h2>
            )}
            {closable && (
              <button
                type="button"
                onClick={handleCloseClick}
                className={cn(
                  "rounded-[var(--radius-sm)]",
                  "flex items-center justify-center",
                  "transition-colors duration-[var(--transition-fast)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--neutral)] focus:ring-offset-2",
                  "cursor-pointer",
                  "relative z-50",
                  "w-[var(--spacing-x7)] h-[var(--spacing-x7)] p-0 m-0",
                  "hover:bg-[var(--bg-secondary)]"
                )}
                aria-label="Close modal"
              >
                <Icon
                  name="cross"
                  size="md"
                  className="text-[var(--tertiary)] pointer-events-none flex items-center justify-center m-0 p-0"
                />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[var(--spacing-x6)] py-[var(--spacing-x4)]">
          {showFigmaBadge && (
            <div className="mb-[var(--spacing-x4)]">
              <FigmaBadge />
            </div>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-[var(--spacing-x2)] px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-t border-[var(--border-secondary)]"
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
