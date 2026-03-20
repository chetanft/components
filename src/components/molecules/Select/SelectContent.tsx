"use client";

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { useSelectContext } from './SelectContext';

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Select content children
   */
  children: React.ReactNode;
  
  /**
   * Portal container (defaults to document.body)
   */
  container?: HTMLElement;
  /**
   * Glass morphism variant
   */
  glass?: GlassVariant;
}

/**
 * SelectContent Component
 * 
 * Shadcn-compatible select dropdown content wrapper.
 * Renders in a portal and positions relative to trigger.
 * 
 * @public
 */
export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({
    children,
    className,
    container,
    glass,
    ...props
  }, ref) => {
    const { open, onOpenChange, triggerPosition, glass: contextGlass } = useSelectContext();
    const resolvedGlass = useResolvedGlass(glass ?? contextGlass);
    const contentRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    // Create portal container
    useEffect(() => {
      const containerElement = container || document.body;
      setPortalContainer(containerElement);
    }, [container]);

    // Close on outside click
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          onOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    // Close on ESC key
    useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    if (!open || !portalContainer) return null;

    const content = (
      <div
        ref={contentRef}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-lg shadow-lg',
          getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', 'border border-[var(--border-primary)]'),
          className
        )}
        style={{
          position: 'fixed',
          top: triggerPosition.top || 0,
          left: triggerPosition.left || 0,
          width: triggerPosition.width || 'var(--radix-select-trigger-width)',
          maxHeight: 'calc(var(--spacing-x20) + var(--spacing-x20) + var(--spacing-x20) + var(--spacing-x15))',
          overflowY: 'auto'
        }}
        role="listbox"
        {...props}
      >
        {children}
      </div>
    );

    return ReactDOM.createPortal(content, portalContainer);
  }
);

SelectContent.displayName = 'SelectContent';
