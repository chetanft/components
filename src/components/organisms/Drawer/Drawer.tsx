"use client";

import React from 'react';
import { DrawerContextProvider } from './DrawerContext';

/**
 * Drawer placement position
 *
 * @public
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Drawer component props
 *
 * @public
 *
 * @example
 * ```tsx
 * <Drawer open={open} onOpenChange={setOpen}>
 *   <DrawerTrigger>
 *     <Button>Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent placement="right" width={400}>
 *     <DrawerHeader>
 *       <DrawerTitle>Settings</DrawerTitle>
 *       <DrawerClose />
 *     </DrawerHeader>
 *     <DrawerBody>
 *       <p>Drawer content goes here</p>
 *     </DrawerBody>
 *     <DrawerFooter>
 *       <Button onClick={() => setOpen(false)}>Close</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether drawer is open/visible
   * @required
   */
  open: boolean;

  /**
   * Callback when drawer open state changes
   * Use this for controlled drawers
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Drawer content
   * @required
   */
  children: React.ReactNode;
}

/**
 * Drawer Component
 *
 * A composable slide-out panel component that displays content from the side of the screen.
 * Uses sub-components (DrawerTrigger, DrawerContent, DrawerHeader, etc.) for maximum flexibility.
 * Useful for settings panels, filters, navigation menus, and supplementary content.
 *
 * @public
 *
 * @example
 * ```tsx
 * import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, Button } from 'ft-design-system';
 *
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <Drawer open={open} onOpenChange={setOpen}>
 *       <DrawerTrigger>
 *         <Button>Open Drawer</Button>
 *       </DrawerTrigger>
 *       <DrawerContent placement="right" width={400}>
 *         <DrawerHeader>
 *           <DrawerTitle>Settings</DrawerTitle>
 *           <DrawerClose />
 *         </DrawerHeader>
 *         <DrawerBody>
 *           <p>Drawer content goes here</p>
 *         </DrawerBody>
 *         <DrawerFooter>
 *           <Button onClick={() => setOpen(false)}>Close</Button>
 *         </DrawerFooter>
 *       </DrawerContent>
 *     </Drawer>
 *   );
 * }
 * ```
 *
 * @remarks
 * - All sub-components (DrawerTrigger, DrawerContent, DrawerHeader, etc.) support `asChild`
 * - Slides in from specified side (left, right, top, bottom)
 * - Prevents body scroll when open
 * - Closes on ESC key press and backdrop click
 * - Accessible: includes ARIA attributes and focus management
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({
  open,
  onOpenChange,
  children,
}, _ref) => {
  return (
    <DrawerContextProvider
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </DrawerContextProvider>
  );
});

Drawer.displayName = 'Drawer';
