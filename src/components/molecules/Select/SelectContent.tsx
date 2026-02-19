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
    const resolvedGlass = useResolvedGlass(glass);
    const { open, onOpenChange } = useSelectContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    // Create portal container
    useEffect(() => {
      const containerElement = container || document.body;
      setPortalContainer(containerElement);
    }, [container]);

    // Get position from trigger
    useEffect(() => {
      if (open) {
        const positionData = document.querySelector('[data-select-position]');
        if (positionData) {
          try {
            const pos = JSON.parse(positionData.getAttribute('data-select-position') || '{}');
            setPosition(pos);
          } catch (e) {
            // Fallback to default position
          }
        }
      }
    }, [open]);

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
          top: position.top || 0,
          left: position.left || 0,
          width: position.width || 'var(--radix-select-trigger-width)',
          maxHeight: '300px',
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

