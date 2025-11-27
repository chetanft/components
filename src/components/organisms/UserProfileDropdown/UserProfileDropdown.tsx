import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Divider } from '../../atoms/Divider';
import { DropdownMenu } from '../../molecules/DropdownMenu';

export interface UserProfileDropdownProps {
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  userAvatar?: string;
  isOpen?: boolean;
  onMenuItemClick?: (item: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const menuItems = [
  { id: 'view-profile', label: 'View Profile', iconName: 'user' as const },
  { id: 'settings', label: 'Settings', iconName: 'settings' as const },
  { id: 'change-desk', label: 'Change Desk', iconName: 'refresh' as const },
  { id: 'change-password', label: 'Change Password', iconName: 'password' as const },
];

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  userName = 'Santosh Kumar',
  userRole = 'Dispatch Manager',
  userLocation = 'SPD-Santoshnagar',
  userBadge = 'Admin',
  userAvatar,
  isOpen = false,
  onMenuItemClick = () => {},
  className = '',
  style,
}) => {
  if (!isOpen) {
    return null;
  }

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    left: 'auto',
    zIndex: 1000,
    ...style,
  };

  return (
    <div
      className={`bg-[var(--bg-primary)] flex flex-col items-center overflow-hidden px-0 py-[20px] rounded-[var(--x2,8px)] shadow-[-6px_-6px_12px_0px_rgba(0,0,0,0.1),6px_6px_12px_0px_rgba(0,0,0,0.1)] w-[400px] ${className}`}
      style={baseStyles}
    >
      {/* User Info Section */}
      <div className="flex flex-col gap-[20px] items-start justify-center px-[var(--x5,20px)] py-0 w-full">
        <div className="flex gap-[var(--x5,20px)] items-center w-full">
          <Avatar 
            src={userAvatar}
            alt={userName}
            size="xl"
            className="flex items-center justify-center size-[56px] shrink-0"
          />
          <div className="flex flex-1 flex-col gap-[var(--x2,8px)] items-start min-w-0">
            <div className="flex items-center justify-between w-full">
              <Typography variant="display-primary" color="primary">
                {userName}
              </Typography>
              <div className="bg-[var(--border-secondary)] flex gap-[8px] items-center justify-center px-[8px] py-[2px] rounded-[var(--x1,4px)] shrink-0">
                <Typography variant="body-secondary-semibold" color="primary">
                  {userBadge}
                </Typography>
              </div>
            </div>
            <div className="flex items-end justify-between w-full">
              <Typography variant="body-primary-regular" color="primary">
                {userRole}
              </Typography>
              <Typography variant="body-secondary-medium" color="muted">
                {userLocation}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full py-[var(--x5,20px)]">
        <Divider type="primary" className="w-full" />
      </div>

      {/* Menu Items */}
      <div className="px-[var(--x5,20px)] py-0 w-full">
        <DropdownMenu
          property="default"
          options={menuItems.map(({ id, label, iconName }) => ({
            value: id,
            label,
            prefix: 'icon' as const,
            iconName,
            state: 'default' as const,
          }))}
          onSelect={(value) => onMenuItemClick(value)}
        />
      </div>

      {/* Divider */}
      <div className="w-full py-[var(--x5,20px)]">
        <Divider type="primary" className="w-full" />
      </div>

      {/* Logout */}
      <div className="px-[var(--x5,20px)] py-0 w-full">
        <DropdownMenu
          property="default"
          options={[{
            value: 'logout',
            label: 'Logout',
            prefix: 'icon' as const,
            iconName: 'logout' as const,
            state: 'default' as const,
          }]}
          onSelect={() => onMenuItemClick('logout')}
        />
      </div>
    </div>
  );
};

UserProfileDropdown.displayName = 'UserProfileDropdown';
