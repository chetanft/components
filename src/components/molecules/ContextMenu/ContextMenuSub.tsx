"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export interface ContextMenuSubProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub> {
  children?: React.ReactNode;
}

/**
 * ContextMenuSub Component
 *
 * Root wrapper for a sub-menu within the context menu.
 *
 * @public
 */
const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children, ...props }) => {
  return (
    <ContextMenuPrimitive.Sub {...props}>
      {children}
    </ContextMenuPrimitive.Sub>
  );
};

ContextMenuSub.displayName = 'ContextMenuSub';

export { ContextMenuSub };
