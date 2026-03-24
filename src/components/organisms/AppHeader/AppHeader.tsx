"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { UserProfile, type UserProfileProps } from '../UserProfile/UserProfile';
import { UserProfileDropdown } from '../UserProfileDropdown/UserProfileDropdown';
import { Rocket, Bell, ThreeDotMenu, Settings } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logos';
import { CompanyInfo } from '../../../types/company';

export interface User {
  name: string;
  avatar?: string;
  role?: string;
  location?: string;
  badge?: string;
}

export type AppHeaderSize = 'xl' | 'lg' | 'md' | 'Default';
export type AppHeaderDevice = 'Desktop' | 'Mobile';

export interface AppHeaderProps extends Omit<ComposableProps<'header'>, 'children'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  size?: AppHeaderSize;
  device?: AppHeaderDevice;
  user?: User;
  userCompany?: CompanyInfo;
  onNotificationClick?: (type: 'rocket' | 'bell' | 'menu') => void;
  onUserClick?: () => void;
  onUserMenuItemClick?: (item: string) => void;
  /** Click handler for optional theme icon shown on the right side. */
  onThemeIconClick?: () => void;
  className?: string;
  leftAddon?: () => React.ReactNode;
  /**
   * Pass-through props for UserProfile (e.g., avatarSize/avatarClassName)
   */
  userProfileProps?: Partial<UserProfileProps>;
  /**
   * Optional custom icon for desktop/tablet primary action slot (defaults to Rocket).
   */
  rocketIcon?: React.ReactNode;
  /**
   * Optional custom icon for desktop/tablet secondary action slot (defaults to Bell).
   */
  bellIcon?: React.ReactNode;
  /**
   * Optional custom icon for mobile action slot (defaults to ThreeDotMenu).
   */
  menuIcon?: React.ReactNode;
  /**
   * Optional custom icon for theme action slot (defaults to Settings).
   */
  themeIcon?: React.ReactNode;
  /**
   * Whether to show the theme action icon on the right side.
   * @default false
   */
  showThemeIcon?: boolean;
}

/**
 * AppHeader Component
 *
 * A header component for application navigation and user profile.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AppHeader
 *   size="xl"
 *   device="Desktop"
 *   user={user}
 *   onNotificationClick={handleNotification}
 * />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<header>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>((props, ref) => {
  const {
  glass,
  size = 'xl',
  device = 'Desktop',
  user = {
    name: 'Santosh Kumar',
    role: 'Dispatch Manager',
    location: 'SPD-Santoshnagar',
    badge: 'Admin',
  },
  userCompany = {
    name: 'tata-motors',
    displayName: 'Tata Motors'
  },
  onNotificationClick = () => { },
  onUserClick = () => { },
  onUserMenuItemClick = () => { },
  onThemeIconClick = () => { },
  className,
  leftAddon,
  userProfileProps,
  rocketIcon,
  bellIcon,
  menuIcon,
  themeIcon,
  showThemeIcon = false,
  asChild,
    ...htmlProps
  } = props;
  const resolvedGlass = useResolvedGlass(glass);
  const Comp = asChild ? Slot : 'header';
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const userProfileRef = useRef<HTMLDivElement>(null);

  const handleUserProfileClick = () => {
    setIsUserProfileOpen((prev) => !prev);
    onUserClick();
  };

  const handleUserMenuItemClick = (item: string) => {
    onUserMenuItemClick(item);
    setIsUserProfileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isUserProfileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
        setIsUserProfileOpen(false);
      }
    };

    // Also close on Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isUserProfileOpen]);

  type UserProfileSectionOptions = {
    companyName?: boolean;
    triggerClassName?: string;
  };

  const renderUserProfileSection = (options?: UserProfileSectionOptions) => {
    const { companyName = true, triggerClassName } = options ?? {};

    const mergedUserProfileClassName = cn(triggerClassName, userProfileProps?.className);

    return (
      <div ref={userProfileRef} className="relative inline-flex w-fit">
        <UserProfile
          company={userCompany}
          userName={user.name}
          userRole={user.role}
          userLocation={user.location}
          userBadge={user.badge}
          userAvatar={user.avatar}
          companyName={companyName}
          onClick={handleUserProfileClick}
          className={mergedUserProfileClassName}
          {...userProfileProps}
        />
        <UserProfileDropdown
          isOpen={isUserProfileOpen}
          userName={user.name}
          userRole={user.role}
          userLocation={user.location}
          userBadge={user.badge}
          userAvatar={user.avatar}
          onMenuItemClick={handleUserMenuItemClick}
        />
      </div>
    );
  };

  const renderThemeActionIcon = (sizeRem: string) => {
    if (!showThemeIcon) return null;

    return (
      <div
        style={{
          width: sizeRem,
          height: sizeRem,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
        }}
        onClick={onThemeIconClick}
      >
        {themeIcon ?? <Settings />}
      </div>
    );
  };

  // Size xl, Device Desktop (default)
  if (size === 'xl' && device === 'Desktop') {
    return (
      <Comp
        ref={ref}
        className={cn(
          getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', 'border-b border-[var(--border-primary)]'), "rounded-none flex justify-between items-center px-[var(--spacing-x5)] py-[var(--spacing-x3)] w-full max-w-[108rem] h-[4.875rem]",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        {/* Logo Section */}
        <div className="flex items-center gap-[var(--spacing-x5)]">
          {/* Layout Grid Icon / Custom Addon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-full p-[var(--spacing-x4)] flex items-center justify-center w-[3.375rem] h-[3.375rem]">
              <svg
                className="shrink-0"
                width="24"
                height="24"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 'var(--spacing-x6)', height: 'var(--spacing-x6)' }}
              >
                <path
                  d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-7 w-[11.89rem]">
            <Logo name="ft" width={191} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        {/* Notification Icons and User Profile */}
        <div className="flex items-center gap-[var(--spacing-x4)]">
          {/* Notification Container */}
          {/* Notification Container */}
          <div className="flex items-center gap-[var(--spacing-x9)]">
            {/* Rocket Icon */}
            <div
              style={{
                width: 'var(--spacing-x6)',
                height: 'var(--spacing-x6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              {rocketIcon ?? <Rocket />}
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: 'var(--spacing-x6)',
                height: 'var(--spacing-x6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              {bellIcon ?? <Bell />}
            </div>

            {renderThemeActionIcon('var(--spacing-x6)')}
          </div>

          {/* User Profile */}
          {renderUserProfileSection()}
        </div>
      </Comp>
    );
  }

  // Size lg, Device Desktop
  if (size === 'lg' && device === 'Desktop') {
    return (
      <Comp
        ref={ref}
        className={cn(
          getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', 'border-b border-[var(--border-primary)]'), "rounded-none flex justify-between items-center px-[var(--spacing-x4)] py-[var(--spacing-x3)] w-full max-w-[90rem] h-16",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-x5)',
        }}>
          {/* Layout Grid Icon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-full p-[var(--spacing-x4)] flex items-center justify-center w-10 h-10">
              <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-7 w-[10.1875rem]">
            <Logo name="ft" width={163} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-x4)',
        }}>
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-x9)',
          }}>
            {/* Rocket Icon */}
            <div
              style={{
                width: 'var(--spacing-x5)',
                height: 'var(--spacing-x5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              {rocketIcon ?? <Rocket />}
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: 'var(--spacing-x5)',
                height: 'var(--spacing-x5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              {bellIcon ?? <Bell />}
            </div>

            {renderThemeActionIcon('var(--spacing-x5)')}
          </div>

          {/* User Profile */}
          {renderUserProfileSection()}
        </div>
      </Comp>
    );
  }

  // Size md, Device Desktop
  if (size === 'md' && device === 'Desktop') {
    return (
      <Comp
        ref={ref}
        className={cn(
          getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', 'border-b border-[var(--border-primary)]'), "rounded-none flex justify-between items-center px-[var(--spacing-x4)] py-[var(--spacing-x3)] w-full max-w-[75rem] h-12",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-x5)',
        }}>
          {/* Layout Grid Icon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '6.25rem',
              padding: 'var(--spacing-x4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--spacing-x8)',
              height: 'var(--spacing-x8)',
              boxSizing: 'border-box',
            }}>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-[1.125rem] w-[8.875rem]">
            <Logo name="ft" width={142} height={18} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-x4)',
        }}>
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-x9)',
          }}>
            {/* Rocket Icon */}
            <div
              style={{
                width: 'var(--spacing-x5)',
                height: 'var(--spacing-x5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              {rocketIcon ?? <Rocket />}
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: 'var(--spacing-x5)',
                height: 'var(--spacing-x5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              {bellIcon ?? <Bell />}
            </div>

            {renderThemeActionIcon('var(--spacing-x5)')}
          </div>

          {/* User Profile */}
          {renderUserProfileSection({ triggerClassName: 'h-[var(--spacing-x9)]' })}
        </div>
      </Comp>
    );
  }

  // Size Default, Device Mobile
  if (size === 'Default' && device === 'Mobile') {
    return (
      <Comp
        ref={ref}
        className={cn(
          getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', 'border-b border-[var(--border-primary)]'), "rounded-none flex justify-between items-center p-[var(--spacing-x3)] w-full max-w-[22.5rem]",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        {/* Logo Section */}
        <div className="flex items-center gap-[var(--spacing-x3)]">
          {/* Layout Grid Icon */}
          <div className="bg-[var(--bg-primary)] rounded-full p-[var(--spacing-x4)] flex items-center justify-center w-8 h-8">
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* FreightTiger Logo */}
          <div className="h-7 w-[11.64rem]">
            <Logo name="ft" width={186} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        {/* Notification Icons and User Profile */}
        <div className="flex items-center gap-[var(--spacing-x2)]">
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-x9)',
          }}>
            {/* Three Dot Menu Icon */}
            <div
              style={{
                width: 'var(--spacing-x6)',
                height: 'var(--spacing-x6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('menu')}
            >
              {menuIcon ?? <ThreeDotMenu />}
            </div>

            {renderThemeActionIcon('var(--spacing-x6)')}
          </div>

          {/* User Profile - Mobile version */}
          {renderUserProfileSection({ companyName: false })}
        </div>
      </Comp>
    );
  }

  // Fallback to xl Desktop
  return (
    <Comp
      ref={ref}
      className={cn(
        getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', 'border-b border-[var(--border-primary)]'), "rounded-none flex justify-between items-center px-[var(--spacing-x5)] py-[var(--spacing-x3)] w-full max-w-[108rem] h-[4.875rem]",
        className
      )}
      {...htmlProps}
    >
      {/* Logo Section */}
      {/* Logo Section */}
      <div className="flex items-center gap-[var(--spacing-x5)]">
        {/* Layout Grid Icon */}
        <div className="bg-[var(--bg-primary)] rounded-full p-[var(--spacing-x4)] flex items-center justify-center w-[3.375rem] h-[3.375rem]">
          <svg
            className="shrink-0"
            width="24"
            height="24"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 'var(--spacing-x6)', height: 'var(--spacing-x6)' }}
          >
            <path
              d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* FreightTiger Logo */}
        <div className="h-7 w-[11.89rem]">
          <Logo name="ft" width={191} height={28} />
        </div>
      </div>

      {/* Notification Icons and User Profile */}
      {/* Notification Icons and User Profile */}
      <div className="flex items-center gap-[var(--spacing-x4)]">
        {/* Notification Container */}
        {/* Notification Container */}
        <div className="flex items-center gap-[var(--spacing-x9)]">
          {/* Rocket Icon */}
          <div
            style={{
              width: 'var(--spacing-x6)',
              height: 'var(--spacing-x6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
            onClick={() => onNotificationClick('rocket')}
          >
            {rocketIcon ?? <Rocket />}
          </div>

          {/* Bell Icon */}
          <div
            style={{
              width: 'var(--spacing-x6)',
              height: 'var(--spacing-x6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
            onClick={() => onNotificationClick('bell')}
          >
            {bellIcon ?? <Bell />}
          </div>

          {renderThemeActionIcon('var(--spacing-x6)')}
        </div>

        {/* User Profile */}
        {renderUserProfileSection()}
      </div>
    </Comp>
  );
});

AppHeader.displayName = 'AppHeader'; 
