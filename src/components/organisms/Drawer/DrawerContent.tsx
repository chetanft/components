"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDrawerContext } from './DrawerContext';
import type { DrawerPlacement } from './Drawer';

/**
 * DrawerContent component props
 * 
 * @public
 */
export interface DrawerContentProps extends ComposableProps<'div'> {
  /**
   * Content children
   */
  children: React.ReactNode;
  
  /**
   * Side from which drawer slides in
   * @default 'right'
   */
  placement?: DrawerPlacement;
  
  /**
   * Drawer width (for left/right placement)
   * CSS value (e.g., "400px", "50%") or number (pixels)
   * @default 400
   */
  width?: string | number;
  
  /**
   * Drawer height (for top/bottom placement)
   * CSS value (e.g., "300px", "50vh") or number (pixels)
   * @default '100%'
   */
  height?: string | number;
  
  /**
   * Allow closing drawer by clicking the backdrop
   * @default true
   */
  maskClosable?: boolean;
  
  /**
   * Custom background color class
   * Overrides default bg-[var(--bg-primary)]
   */
  background?: string;
}

/**
 * DrawerContent Component
 * 
 * The main content wrapper for the drawer panel.
 * Handles backdrop, positioning, and close behavior.
 * Must be used within a Drawer component.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent placement="right" width={400}>
 *     <DrawerHeader>
 *       <DrawerTitle>Title</DrawerTitle>
 *     </DrawerHeader>
 *     <DrawerBody>Content</DrawerBody>
 *   </DrawerContent>
 * </Drawer>
 * ```
 * 
 * @remarks
 * - Handles backdrop click and ESC key to close
 * - Prevents body scroll when open
 * - Supports `asChild` prop for custom element composition
 * - Uses design tokens for consistent styling
 * - Slides in from specified side (left, right, top, bottom)
 */
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ 
    children, 
    className, 
    asChild,
    placement = 'right',
    width = 400,
    height = '100%',
    maskClosable = true,
    background,
    ...props 
  }, ref) => {
    const { open, setOpen } = useDrawerContext();
    
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
    
    if (!open) return null;
    
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
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <div
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleMaskClick}
          aria-hidden="true"
        />
        
        {/* Drawer Content */}
        <div
          ref={ref}
          className={cn(
            "absolute",
            background || "bg-[var(--bg-primary)]",
            "flex flex-col",
            styles.container,
            className
          )}
          style={{
            width: styles.width,
            height: styles.height,
            boxShadow: 'var(--shadow-xl)',
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';

