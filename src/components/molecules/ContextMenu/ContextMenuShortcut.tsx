"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

/**
 * ContextMenuShortcut Component
 *
 * Displays a keyboard shortcut hint aligned to the right of a menu item.
 *
 * @public
 */
const ContextMenuShortcut: React.FC<ContextMenuShortcutProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs text-[var(--tertiary)]',
        className
      )}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
};

ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export { ContextMenuShortcut };
