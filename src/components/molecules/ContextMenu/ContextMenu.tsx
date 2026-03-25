"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export interface ContextMenuProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root> {
  children?: React.ReactNode;
}

/**
 * ContextMenu Component
 *
 * Root wrapper for the context menu. Provides state management
 * for the right-click triggered menu.
 *
 * @public
 */
const ContextMenu: React.FC<ContextMenuProps> = ({ children, ...props }) => {
  return (
    <ContextMenuPrimitive.Root {...props}>
      {children}
    </ContextMenuPrimitive.Root>
  );
};

ContextMenu.displayName = 'ContextMenu';

export { ContextMenu };
