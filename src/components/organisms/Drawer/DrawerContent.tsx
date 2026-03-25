"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
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
   * CSS value (e.g., "25rem", "50%") or number (in CSS px units)
   * @default 400
   */
  width?: string | number;

  /**
   * Drawer height (for top/bottom placement)
   * CSS value (e.g., "18.75rem", "50vh") or number (in CSS px units)
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

  /**
   * Apply glassmorphism effect to the drawer surface.
   * @default false
   */
  glass?: GlassVariant;
}

/** CSS keyframes injected once for drawer slide animations */
const drawerAnimationStyles = `
@keyframes ft-drawer-slide-in-from-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes ft-drawer-slide-out-to-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
@keyframes ft-drawer-slide-in-from-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
@keyframes ft-drawer-slide-out-to-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@keyframes ft-drawer-slide-in-from-top {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}
@keyframes ft-drawer-slide-out-to-top {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}
@keyframes ft-drawer-slide-in-from-bottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes ft-drawer-slide-out-to-bottom {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
@keyframes ft-drawer-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ft-drawer-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
`;

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-ft-drawer-animations', '');
  style.textContent = drawerAnimationStyles;
  document.head.appendChild(style);
  stylesInjected = true;
}

const slideAnimations: Record<DrawerPlacement, { open: string; closed: string }> = {
  right: {
    open: 'ft-drawer-slide-in-from-right',
    closed: 'ft-drawer-slide-out-to-right',
  },
  left: {
    open: 'ft-drawer-slide-in-from-left',
    closed: 'ft-drawer-slide-out-to-left',
  },
  top: {
    open: 'ft-drawer-slide-in-from-top',
    closed: 'ft-drawer-slide-out-to-top',
  },
  bottom: {
    open: 'ft-drawer-slide-in-from-bottom',
    closed: 'ft-drawer-slide-out-to-bottom',
  },
};

const placementClasses: Record<DrawerPlacement, string> = {
  left: 'left-0 top-0 bottom-0',
  right: 'right-0 top-0 bottom-0',
  top: 'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
};

/**
 * DrawerContent Component
 *
 * The main content wrapper for the drawer panel.
 * Handles backdrop, positioning, and close behavior.
 * Must be used within a Drawer component.
 *
 * Uses Radix Dialog primitives for:
 * - Focus trapping
 * - Scroll lock
 * - ESC key handling
 * - Portal rendering
 * - Auto-generated unique ARIA IDs
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
    glass,
    style,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    // Inject animation keyframes on first render
    React.useEffect(() => {
      injectStyles();
    }, []);

    const isHorizontal = placement === 'left' || placement === 'right';
    const computedWidth = isHorizontal
      ? (typeof width === 'number' ? `${width}px` : width)
      : '100%';
    const computedHeight = isHorizontal
      ? '100%'
      : (typeof height === 'number' ? `${height}px` : height);

    const animations = slideAnimations[placement];

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (!maskClosable) {
        e.preventDefault();
      }
    };

    if (asChild) {
      return (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Content asChild>
            <Slot
              ref={ref}
              className={cn(className)}
              {...props}
            >
              {children}
            </Slot>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      );
    }

    return (
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          style={{
            animationDuration: '200ms',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
          data-ft-drawer-overlay=""
          onClick={handleOverlayClick}
        />

        {/* Drawer panel */}
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed z-50",
            resolvedGlass ? getGlassClasses(resolvedGlass) : (background || "bg-[var(--bg-primary)]"),
            "flex flex-col",
            placementClasses[placement],
            className
          )}
          style={{
            width: computedWidth,
            height: computedHeight,
            boxShadow: 'var(--shadow-xl)',
            animationDuration: '250ms',
            animationTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            animationFillMode: 'forwards',
            ...style,
          }}
          data-ft-drawer-content=""
          data-placement={placement}
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
          {...props}
        >
          {children}

          {/* Inline style for animation based on data-state */}
          <style>{`
            [data-ft-drawer-overlay][data-state="open"] {
              animation: ft-drawer-overlay-in 200ms ease-out forwards;
            }
            [data-ft-drawer-overlay][data-state="closed"] {
              animation: ft-drawer-overlay-out 200ms ease-in forwards;
            }
            [data-ft-drawer-content][data-placement="${placement}"][data-state="open"] {
              animation: ${animations.open} 250ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
            }
            [data-ft-drawer-content][data-placement="${placement}"][data-state="closed"] {
              animation: ${animations.closed} 200ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
            }
          `}</style>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';
