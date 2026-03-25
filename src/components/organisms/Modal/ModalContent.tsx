"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import type { ComposableProps } from '../../../lib/slot';

const modalSizes = {
  sm: '25rem',
  md: '32.5rem',
  lg: '45rem',
  xl: '60rem',
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

  /**
   * Apply glassmorphism effect to the modal surface.
   * @default false
   */
  glass?: GlassVariant;
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
    glass,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    return (
      <DialogPrimitive.Portal>
        {/* Backdrop / Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />

        {/* Modal Content */}
        <DialogPrimitive.Content
          ref={ref}
          asChild={asChild}
          onPointerDownOutside={(e) => {
            if (!maskClosable) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (!maskClosable) {
              e.preventDefault();
            }
          }}
          className={cn(
            "fixed z-50",
            "left-[50%] translate-x-[-50%]",
            centered ? "top-[50%] translate-y-[-50%]" : "top-[5vh]",
            "rounded-[var(--radius-lg)]",
            "max-w-[90vw] max-h-[90vh]",
            "flex flex-col",
            getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-primary)]"),
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "focus:outline-none",
            className
          )}
          style={{
            width: width || modalSizes[size],
            boxShadow: 'var(--shadow-xl)',
          }}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

ModalContent.displayName = 'ModalContent';
