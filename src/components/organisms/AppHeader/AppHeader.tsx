import React, { useState, useEffect, useRef } from 'react';
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

export interface AppHeaderProps {
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

export const AppHeader: React.FC<AppHeaderProps> = ({
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
  onNotificationClick = () => {},
  onUserClick = () => {},
  onUserMenuItemClick = () => {},
  className,
  leftAddon,
}) => {
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
      <div ref={userProfileRef} style={{ position: 'relative', display: 'inline-flex', width: 'fit-content' }}>
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
      <header 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 20px',
          width: '100%',
          maxWidth: '1728px',
          height: '78px',
          boxSizing: 'border-box',
        }}
        className={className}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Layout Grid Icon / Custom Addon */}
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
            width: '54px',
            height: '54px',
            boxSizing: 'border-box',
          }}>
            <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          )}

          {/* FreightTiger Logo */}
          <div style={{
            height: '28px',
            width: '190.242px',
          }}>
            <Logo name="ft" width={191} height={28} />
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
      </header>
    );
  }

  // Size lg, Device Desktop
  if (size === 'lg' && device === 'Desktop') {
    return (
      <header 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 16px',
          width: '100%',
          maxWidth: '1440px',
          height: '64px',
          boxSizing: 'border-box',
        }}
        className={className}
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
            width: '40px',
            height: '40px',
            boxSizing: 'border-box',
          }}>
            <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          )}

          {/* FreightTiger Logo */}
          <div style={{
            height: '28px',
            width: '163px',
          }}>
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
      </header>
    );
  }

  // Size md, Device Desktop
  if (size === 'md' && device === 'Desktop') {
    return (
      <header 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 16px',
          width: '100%',
          maxWidth: '1200px',
          height: '48px',
          boxSizing: 'border-box',
        }}
        className={className}
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
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          )}

          {/* FreightTiger Logo */}
          <div style={{
            height: '18px',
            width: '142px',
          }}>
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
      </header>
    );
  }

  // Size Default, Device Mobile
  if (size === 'Default' && device === 'Mobile') {
    return (
      <header 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          width: '100%',
          maxWidth: '360px',
          boxSizing: 'border-box',
        }}
        className={className}
      >
        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {/* Layout Grid Icon */}
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
              <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* FreightTiger Logo */}
          <div style={{
            height: '28px',
            width: '186.242px',
          }}>
            <Logo name="ft" width={186} height={28} />
          </div>
        </div>

        {/* Notification Icons and User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
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
      </header>
    );
  }

  // Fallback to xl Desktop
  return (
    <header 
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 20px',
        width: '100%',
        maxWidth: '1728px',
        height: '78px',
        boxSizing: 'border-box',
      }}
      className={className}
    >
      {/* Logo Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Layout Grid Icon */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '100px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          boxSizing: 'border-box',
        }}>
          <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* FreightTiger Logo */}
        <div style={{
          height: '28px',
          width: '190.242px',
        }}>
          <Logo name="ft" width={191} height={28} />
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
    </header>
  );
};

AppHeader.displayName = 'AppHeader'; 