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
          "shadow-[var(--shadow-xl)]",
          "max-w-[90vw] max-h-[90vh]",
          "flex flex-col",
          centered && "mx-auto",
          className
        )}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)'
        }}
        onClick={handleModalContentClick}
        {...props}
      >
        {/* Header */}
        {(title || closable) && (
          <div 
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--border-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold"
                style={{ color: 'var(--primary)' }}
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
                  "focus:outline-none",
                  "cursor-pointer",
                  "relative z-50"
                )}
                style={{
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 50,
                  width: '28px',
                  height: '28px',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--neutral)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
                aria-label="Close modal"
              >
                <Icon 
                  name="cross" 
                  size={20} 
                  style={{ 
                    color: 'var(--tertiary)', 
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    padding: 0,
                  }} 
                />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {showFigmaBadge && (
            <div className="mb-4">
              <FigmaBadge />
            </div>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div 
            className="flex items-center justify-end gap-2 px-6 py-4"
            style={{ borderTop: '1px solid var(--border-secondary)' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
