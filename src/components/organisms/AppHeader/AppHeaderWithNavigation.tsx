"use client";
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { NavigationPopover } from '../NavigationPopover/NavigationPopover';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';

export interface AppHeaderNavigationProps {
  user: {
    name: string;
    avatar?: string;
    email?: string;
  };
  /**
   * Navigation sections for the popover
   */
  navigationSections?: React.ReactNode;
  /**
   * Callback when navigation opens
   */
  onNavigationOpen?: () => void;
  /**
   * Callback when navigation closes
   */
  onNavigationClose?: () => void;
  /**
   * Notification badge count
   */
  notificationCount?: number;
  /**
   * Additional className for avatar button
   */
  className?: string;
}

/**
 * AppHeaderNavigation Component
 * 
 * Renders a user avatar button in AppHeader that opens a NavigationPopover.
 * Automatically handles open/close state and click-outside behavior.
 * 
 * @example
 * ```tsx
 * <AppHeaderNavigation
 *   user={{ name: 'John Doe', email: 'john@example.com' }}
 *   notificationCount={3}
 *   navigationSections={
 *     <>
 *       <NavigationPopover.Section id="profile" label="Profile" icon="user">
 *         <NavigationPopover.SubCategory
 *           items={[{ label: 'Settings', icon: 'settings' }]}
 *         />
 *       </NavigationPopover.Section>
 *     </>
 *   }
 *   onNavigationOpen={() => console.log('opened')}
 *   onNavigationClose={() => console.log('closed')}
 * />
 * ```
 */
export const AppHeaderNavigation = React.forwardRef<
  HTMLDivElement,
  AppHeaderNavigationProps
>(
  (
    {
      user,
      navigationSections,
      onNavigationOpen,
      onNavigationClose,
      notificationCount,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle open state changes
    const handleOpen = () => {
      setOpen(true);
      onNavigationOpen?.();
    };

    const handleClose = () => {
      setOpen(false);
      onNavigationClose?.();
    };

    // Close on click outside
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open]);

    const initials = user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        ref={ref || containerRef}
        className={cn('relative inline-block', className)}
      >
        {/* Avatar Button */}
        <button
          onClick={handleOpen}
          className={cn(
            'relative',
            'bg-[var(--bg-primary)]',
            'rounded-full',
            'p-4',
            'flex items-center justify-center',
            'w-[54px] h-[54px]',
            'hover:opacity-80',
            'hover:shadow-lg',
            'transition-all duration-200',
            'cursor-pointer',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[var(--primary)]',
            'focus-visible:ring-offset-2'
          )}
          aria-label={`Open menu for ${user.name}`}
          title={user.name}
        >
          {/* Avatar with initials or image */}
          <Avatar
            src={user.avatar}
            fallback={initials}
            alt={user.name}
            className="w-full h-full"
          />

          {/* Notification Badge */}
          {notificationCount && notificationCount > 0 && (
            <Badge
              variant="danger"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-semibold"
            >
              {notificationCount > 99 ? '99+' : notificationCount}
            </Badge>
          )}
        </button>

        {/* Navigation Popover */}
        <NavigationPopover open={open} onClose={handleClose}>
          {navigationSections}
        </NavigationPopover>
      </div>
    );
  }
);

AppHeaderNavigation.displayName = 'AppHeaderNavigation';
