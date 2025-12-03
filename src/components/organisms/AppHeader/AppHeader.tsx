"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { UserProfile } from '../UserProfile/UserProfile';
import { UserProfileDropdown } from '../UserProfileDropdown/UserProfileDropdown';
import { Rocket, Bell, ThreeDotMenu } from '../../atoms/Icons';
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
  size?: AppHeaderSize;
  device?: AppHeaderDevice;
  user?: User;
  userCompany?: CompanyInfo;
  onNotificationClick?: (type: 'rocket' | 'bell' | 'menu') => void;
  onUserClick?: () => void;
  onUserMenuItemClick?: (item: string) => void;
  className?: string;
  leftAddon?: () => React.ReactNode;
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
  className,
  leftAddon,
  asChild,
    ...htmlProps
  } = props;
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
          className={triggerClassName}
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

  // Size xl, Device Desktop (default)
  if (size === 'xl' && device === 'Desktop') {
    return (
      <Comp
        ref={ref}
        className={cn(
          "bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex justify-between items-center px-5 py-[13px] w-full max-w-[1728px] h-[78px]",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        {/* Logo Section */}
        <div className="flex items-center gap-5">
          {/* Layout Grid Icon / Custom Addon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-[54px] h-[54px]">
              <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-7 w-[190.242px]">
            <Logo name="ft" width={191} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        {/* Notification Icons and User Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Container */}
          {/* Notification Container */}
          <div className="flex items-center gap-9">
            {/* Rocket Icon */}
            <div
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              <Rocket />
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              <Bell />
            </div>
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
          "bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex justify-between items-center px-4 py-[13px] w-full max-w-[1440px] h-16",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Layout Grid Icon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-10 h-10">
              <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-7 w-[163px]">
            <Logo name="ft" width={163} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
          }}>
            {/* Rocket Icon */}
            <div
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              <Rocket />
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              <Bell />
            </div>
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
          "bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex justify-between items-center px-4 py-[13px] w-full max-w-[1200px] h-12",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Layout Grid Icon */}
          {leftAddon ? (
            leftAddon()
          ) : (
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '100px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              boxSizing: 'border-box',
            }}>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* FreightTiger Logo */}
          <div className="h-[18px] w-[142px]">
            <Logo name="ft" width={142} height={18} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
          }}>
            {/* Rocket Icon */}
            <div
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('rocket')}
            >
              <Rocket />
            </div>

            {/* Bell Icon */}
            <div
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('bell')}
            >
              <Bell />
            </div>
          </div>

          {/* User Profile */}
          {renderUserProfileSection({ triggerClassName: 'h-[36px]' })}
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
          "bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex justify-between items-center p-3 w-full max-w-[360px]",
          className
        )}
        {...htmlProps}
      >
        {/* Logo Section */}
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          {/* Layout Grid Icon */}
          <div className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-8 h-8">
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* FreightTiger Logo */}
          <div className="h-7 w-[186.242px]">
            <Logo name="ft" width={186} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        {/* Notification Icons and User Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
          }}>
            {/* Three Dot Menu Icon */}
            <div
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onClick={() => onNotificationClick('menu')}
            >
              <ThreeDotMenu />
            </div>
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
        "bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex justify-between items-center px-5 py-[13px] w-full max-w-[1728px] h-[78px]",
        className
      )}
      {...htmlProps}
    >
      {/* Logo Section */}
      {/* Logo Section */}
      <div className="flex items-center gap-5">
        {/* Layout Grid Icon */}
        <div className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-[54px] h-[54px]">
          <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* FreightTiger Logo */}
        <div className="h-7 w-[190.242px]">
          <Logo name="ft" width={191} height={28} />
        </div>
      </div>

      {/* Notification Icons and User Profile */}
      {/* Notification Icons and User Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Container */}
        {/* Notification Container */}
        <div className="flex items-center gap-9">
          {/* Rocket Icon */}
          <div
            style={{
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
            onClick={() => onNotificationClick('rocket')}
          >
            <Rocket />
          </div>

          {/* Bell Icon */}
          <div
            style={{
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
            onClick={() => onNotificationClick('bell')}
          >
            <Bell />
          </div>
        </div>

        {/* User Profile */}
        {renderUserProfileSection()}
      </div>
    </Comp>
  );
});

AppHeader.displayName = 'AppHeader'; 
