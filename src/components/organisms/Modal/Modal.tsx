"use client";

import React, { useEffect, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { ModalContextProvider } from './ModalContext';

/**
 * Modal component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalTrigger>
 *     <Button>Open Modal</Button>
 *   </ModalTrigger>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Confirm Action</ModalTitle>
 *       <ModalDescription>
 *         Are you sure you want to proceed?
 *       </ModalDescription>
 *       <ModalClose />
 *     </ModalHeader>
 *     <ModalBody>
 *       <p>Modal content goes here</p>
 *     </ModalBody>
 *     <ModalFooter>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * 
 * // Declarative API (deprecated)
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm Action"
 *   footer={
 *     <>
 *       <Button onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * ```
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether modal is open/visible
   * @required
   */
  open: boolean;
  
  /**
   * Callback when modal open state changes
   * Use this for controlled modals with composable API
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * Callback when modal should close
   * Called on close button click, mask click (if maskClosable), or ESC key
   * @deprecated Use onOpenChange instead for composable API
   */
  onClose?: () => void;
  
  /**
   * Modal title displayed in header (for declarative API)
   * @deprecated Use ModalTitle component within ModalHeader instead
   */
  title?: string;
  
  /**
   * Footer content (typically action buttons) (for declarative API)
   * Rendered at bottom of modal
   * @deprecated Use ModalFooter component instead
   */
  footer?: React.ReactNode;
  
  /**
   * Show close button in header
   * @default true
   */
  closable?: boolean;
  
  /**
   * Allow closing modal by clicking the backdrop/mask
   * @default true
   */
  maskClosable?: boolean;
  
  /**
   * Modal size preset
   * @default 'md'
   * 
   * - `sm`: 400px width
   * - `md`: 520px width
   * - `lg`: 720px width
   * - `xl`: 960px width
   * - `full`: 90vw width
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Custom modal width (overrides size)
   * CSS value (e.g., "600px", "50%") or number (pixels)
   */
  width?: string | number;
  
  /**
   * Center modal vertically
   * @default true
   */
  centered?: boolean;
  
  /**
   * Modal content
   * @required
   */
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
 * Modal Component
 * 
 * A composable modal dialog component that displays content in an overlay.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'ft-design-system';
 * 
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 * 
 *   return (
 *     <Modal open={open} onOpenChange={setOpen}>
 *       <ModalTrigger>
 *         <Button>Open Modal</Button>
 *       </ModalTrigger>
 *       <ModalContent>
 *         <ModalHeader>
 *           <ModalTitle>Modal Title</ModalTitle>
 *           <ModalClose />
 *         </ModalHeader>
 *         <ModalBody>
 *           <p>Modal content goes here</p>
 *         </ModalBody>
 *         <ModalFooter>
 *           <Button onClick={() => setOpen(false)}>Close</Button>
 *         </ModalFooter>
 *       </ModalContent>
 *     </Modal>
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (ModalTrigger, ModalContent, ModalHeader, etc.) support `asChild`
 * - Prevents body scroll when open
 * - Closes on ESC key press and backdrop click
 * - Accessible: includes ARIA attributes and focus management
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  onClose,
  title,
  footer,
  closable = true,
  maskClosable = true,
  size = 'md',
  width,
  centered = true,
  children,
  className,
  onClick,
  ...props
}) => {
  // Check if using composable API (has ModalContent, ModalTrigger, etc. as children)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
    child?.type?.displayName?.startsWith('Modal')
  );
  
  // If using composable API, wrap with context provider
  if (hasComposableChildren) {
    // Show deprecation warning if using old props with composable API
    if (process.env.NODE_ENV !== 'production' && (title || footer)) {
      console.warn(
        'Modal: Using deprecated props (title, footer) with composable API. ' +
        'Please use ModalTitle, ModalHeader, ModalFooter components instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    
    return (
      <ModalContextProvider 
        open={open} 
        onOpenChange={onOpenChange || (onClose ? () => onClose() : undefined)}
        onClose={onClose}
      >
        {children}
      </ModalContextProvider>
    );
  }
  
  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Modal: Declarative API (title, footer props) is deprecated. ' +
      'Please migrate to composable API using ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter components. ' +
      'See migration guide: docs/migrations/composable-migration.md'
    );
  }
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
      onOpenChange?.(false);
      onClose?.();
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }, [closable, onOpenChange, onClose]);

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
    <ModalContextProvider open={open} onOpenChange={onOpenChange || (onClose ? () => onClose() : undefined)} onClose={onClose}>
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
    </ModalContextProvider>
  );
};

Modal.displayName = 'Modal';
