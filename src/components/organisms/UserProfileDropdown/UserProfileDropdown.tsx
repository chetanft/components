import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';

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

const logoutItem = { id: 'logout', label: 'Logout', iconName: 'logout' as const };

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
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[var(--x5,20px)] relative shrink-0 w-full">
        <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.13%]" style={{ borderTop: '1px solid var(--border-primary)' }} />
        </div>
      </div>

      {/* Menu Items */}
      <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[var(--x5,20px)] py-0 relative shrink-0 w-full">
        {menuItems.map(({ id, label, iconName }) => (
          <button
            key={id}
            onClick={() => onMenuItemClick(id)}
            className="bg-[var(--bg-primary)] box-border content-stretch flex gap-[10px] items-center p-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full hover:bg-[var(--bg-secondary)] transition-colors text-left"
          >
            <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] relative shrink-0 size-[16px]">
              <Icon
                name={iconName}
                size={16}
                className="absolute inset-0"
                color="var(--primary)"
              />
            </div>
            <p className="font-[family-name:var(--font-family-primary,'Inter',sans-serif)] font-[var(--font-weight-regular,normal)] font-normal leading-[1.4] relative shrink-0 text-[color:var(--primary)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
              {/* 16px → 1.143rem (responsive) */}
              {label}
            </p>
          </button>
        ))}
      </div>

      {/* Divider before Logout */}
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[var(--x5,20px)] relative shrink-0 w-full">
        <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.13%]" style={{ borderTop: '1px solid var(--border-primary)' }} />
        </div>
      </div>

      {/* Logout Item */}
      <button
        onClick={() => onMenuItemClick(logoutItem.id)}
        className="bg-[var(--bg-primary)] box-border content-stretch flex gap-[10px] items-center px-[32px] py-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full hover:bg-[var(--bg-secondary)] transition-colors text-left"
      >
        <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] overflow-clip relative shrink-0 size-[16px]">
          <Icon
            name={logoutItem.iconName}
            size={16}
            className="absolute inset-[12.5%]"
            color="var(--critical)"
          />
        </div>
        <p className="font-[family-name:var(--font-family-primary,'Inter',sans-serif)] font-[var(--font-weight-regular,normal)] font-normal leading-[1.4] relative shrink-0 text-[color:var(--critical)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
          {/* 16px → 1.143rem (responsive) */}
          {logoutItem.label}
        </p>
      </button>
    </div>
  );
};

UserProfileDropdown.displayName = 'UserProfileDropdown';
