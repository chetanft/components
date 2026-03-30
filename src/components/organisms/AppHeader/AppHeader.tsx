"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useGlass } from '../../FTProvider';
import { Button } from '../../atoms/Button';
import { UserProfile, type UserProfileProps } from '../UserProfile/UserProfile';
import { UserProfileDropdown } from '../UserProfileDropdown/UserProfileDropdown';
import { Rocket, Bell, ThreeDotMenu, Settings, Glass, Expand, Compress } from '../../atoms/Icons';
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
  /** Click handler for optional glass action icon shown on the right side. */
  onGlassToggleClick?: () => void;
  /** Called whenever the fullscreen/expand state changes. */
  onExpandToggle?: (isExpanded: boolean) => void;
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
   * Optional custom icon for theme action slot.
   */
  themeIcon?: React.ReactNode;
  /**
   * Whether to show the theme action icon on the right side.
   * @default false
   */
  showThemeIcon?: boolean;
  /**
   * Whether to show the glass action icon on the right side.
   * @default false
   */
  showGlassToggle?: boolean;
  /**
   * Whether to show the expand/fullscreen action button on the right side.
   * @default false
   */
  showExpandButton?: boolean;
  /**
   * Controlled fullscreen/expanded state. When omitted, AppHeader manages
   * fullscreen state from the browser Fullscreen API.
   */
  isExpanded?: boolean;
  /**
   * Visual state for the glass action button.
   * @default false
   */
  isGlassActive?: boolean;
  /**
   * Optional custom icon for expand action slot.
   */
  expandIcon?: React.ReactNode;
  /**
   * Optional custom icon for collapse action slot.
   */
  compressIcon?: React.ReactNode;
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
  onGlassToggleClick = () => { },
  onExpandToggle,
  className,
  leftAddon,
  userProfileProps,
  rocketIcon,
  bellIcon,
  menuIcon,
  themeIcon,
  showThemeIcon = false,
  showGlassToggle = false,
  showExpandButton = false,
  isExpanded,
  isGlassActive,
  expandIcon,
  compressIcon,
  asChild,
    ...htmlProps
  } = props;
  const resolvedGlass = useResolvedGlass(glass);
  const { glassMode, setGlassMode } = useGlass();
  const Comp = asChild ? Slot : 'header';
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [internalIsFullscreen, setInternalIsFullscreen] = useState(false);
  const userProfileRef = useRef<HTMLDivElement>(null);
  const isFullscreen = isExpanded ?? internalIsFullscreen;
  const hasActiveGlass = isGlassActive ?? Boolean(glassMode);

  const syncFullscreenState = () => {
    if (typeof document === 'undefined') return;
    const nextValue = !!document.fullscreenElement;
    setInternalIsFullscreen(nextValue);
    onExpandToggle?.(nextValue);
  };

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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    syncFullscreenState();
    document.addEventListener('fullscreenchange', syncFullscreenState);
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, []);

  const handleExpandClick = async () => {
    if (typeof document === 'undefined') return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  };

  const handleGlassToggleClick = () => {
    const nextMode = glassMode ? false : true;
    setGlassMode(nextMode);
    onGlassToggleClick();
  };

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

  const renderHeaderIconButton = (
    iconNode: React.ReactNode,
    onClick: () => void,
    ariaLabel: string,
    isActive = false
  ) => (
    <Button
      variant="text"
      size="sm"
      shape="rounded"
      icon={iconNode}
      iconPosition="only"
      aria-label={ariaLabel}
      aria-pressed={isActive || undefined}
      onClick={onClick}
      className={cn("min-w-0", isActive && "bg-[var(--bg-primary)]")}
    >
    </Button>
  );

  const renderUtilityActions = () => {
    if (!showThemeIcon && !showGlassToggle && !showExpandButton) return null;

    return (
      <div className="flex items-center gap-[var(--spacing-x2)]">
        {showThemeIcon && renderHeaderIconButton(themeIcon ?? <Settings />, onThemeIconClick, 'Toggle theme')}
        {showGlassToggle && renderHeaderIconButton(<Glass />, handleGlassToggleClick, 'Toggle glass mode', hasActiveGlass)}
        {showExpandButton &&
          renderHeaderIconButton(
            isFullscreen ? (compressIcon ?? <Compress />) : (expandIcon ?? <Expand />),
            handleExpandClick,
            isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
            isFullscreen
          )}
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
          <div className="flex items-center gap-[var(--spacing-x2)]">
            {/* Rocket Icon */}
            {renderHeaderIconButton(rocketIcon ?? <Rocket />, () => onNotificationClick('rocket'), 'Rocket notifications')}

            {/* Bell Icon */}
            {renderHeaderIconButton(bellIcon ?? <Bell />, () => onNotificationClick('bell'), 'Notifications')}

            {renderUtilityActions()}
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
            gap: 'var(--spacing-x2)',
          }}>
            {/* Rocket Icon */}
            {renderHeaderIconButton(rocketIcon ?? <Rocket />, () => onNotificationClick('rocket'), 'Rocket notifications')}

            {/* Bell Icon */}
            {renderHeaderIconButton(bellIcon ?? <Bell />, () => onNotificationClick('bell'), 'Notifications')}

            {renderUtilityActions()}
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
            gap: 'var(--spacing-x2)',
          }}>
            {/* Rocket Icon */}
            {renderHeaderIconButton(rocketIcon ?? <Rocket />, () => onNotificationClick('rocket'), 'Rocket notifications')}

            {/* Bell Icon */}
            {renderHeaderIconButton(bellIcon ?? <Bell />, () => onNotificationClick('bell'), 'Notifications')}

            {renderUtilityActions()}
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
            gap: 'var(--spacing-x2)',
          }}>
            {/* Three Dot Menu Icon */}
            {renderHeaderIconButton(menuIcon ?? <ThreeDotMenu />, () => onNotificationClick('menu'), 'Open menu')}

            {renderUtilityActions()}
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
        <div className="flex items-center gap-[var(--spacing-x2)]">
          {/* Rocket Icon */}
          {renderHeaderIconButton(rocketIcon ?? <Rocket />, () => onNotificationClick('rocket'), 'Rocket notifications')}

          {/* Bell Icon */}
          {renderHeaderIconButton(bellIcon ?? <Bell />, () => onNotificationClick('bell'), 'Notifications')}

          {renderUtilityActions()}
        </div>

        {/* User Profile */}
        {renderUserProfileSection()}
      </div>
    </Comp>
  );
});

AppHeader.displayName = 'AppHeader'; 
