"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useModalContext } from './ModalContext';

const modalSizes = {
  sm: '400px',
  md: '520px',
  lg: '720px',
  xl: '960px',
  full: '90vw'
};

/**
 * ModalContent component props
 * 
 * @public
 */
export interface ModalContentProps extends ComposableProps<'div'> {
  /**
   * Content children
   */
  children: React.ReactNode;
  
  /**
   * Modal size preset
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Custom modal width (overrides size)
   */
  width?: string | number;
  
  /**
   * Center modal vertically
   * @default true
   */
  centered?: boolean;
  
  /**
   * Allow closing modal by clicking the backdrop
   * @default true
   */
  maskClosable?: boolean;
}

/**
 * ModalContent Component
 * 
 * The main content wrapper for the modal dialog.
 * Handles backdrop, positioning, and close behavior.
 * Must be used within a Modal component.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Modal>
 *   <ModalTrigger>Open</ModalTrigger>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Title</ModalTitle>
 *     </ModalHeader>
 *     <ModalBody>Content</ModalBody>
 *   </ModalContent>
 * </Modal>
 * ```
 * 
 * @remarks
 * - Handles backdrop click and ESC key to close
 * - Prevents body scroll when open
 * - Supports `asChild` prop for custom element composition
 * - Uses design tokens for consistent styling
 */
export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ 
    children, 
    className, 
    asChild,
    size = 'md',
    width,
    centered = true,
    maskClosable = true,
    onClick,
    ...props 
  }, ref) => {
    const { open, setOpen, onClose: _onClose } = useModalContext();
    
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
    
    // Handle ESC key
    useEffect(() => {
      if (!open) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, setOpen]);
    
    const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (maskClosable && e.target === e.currentTarget) {
        setOpen(false);
      }
    };
    
    const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        e.stopPropagation();
      }
      onClick?.(e);
    };
    
    if (!open) return null;
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(className)}
          onClick={handleModalContentClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-overlay backdrop-blur-sm"
          onClick={handleMaskClick}
          aria-hidden="true"
        />
        
        {/* Modal Content */}
        <div
          ref={ref}
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
          {children}
        </div>
      </div>
    );
  }
);

ModalContent.displayName = 'ModalContent';

