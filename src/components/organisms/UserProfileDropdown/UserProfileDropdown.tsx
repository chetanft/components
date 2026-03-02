import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface UserProfileDropdownProps extends ComposableProps<'div'> {
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  userAvatar?: string;
  isOpen?: boolean;
  onMenuItemClick?: (item: string) => void;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Apply glassmorphism effect to the dropdown panel
   */
  glass?: GlassVariant;
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
  glass,
  asChild,
  ...props
}) => {
  const resolvedGlass = useResolvedGlass(glass);

  if (!isOpen) {
    return null;
  }

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + var(--spacing-x3))',
    right: 0,
    left: 'auto',
    zIndex: 1000,
    ...style,
  };
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', ''),
        'flex flex-col items-center overflow-hidden px-0 py-[var(--spacing-x5)] rounded-[var(--spacing-x2)] shadow-[-6px_-6px_12px_0px_rgba(0,0,0,0.1),6px_6px_12px_0px_rgba(0,0,0,0.1)] w-[25rem]',
        className
      )}
      style={baseStyles}
      {...props}
    >
      {/* User Info Section */}
      <div className="flex flex-col gap-[var(--spacing-x5)] items-start justify-center px-[var(--spacing-x5)] py-0 w-full">
        <div className="flex gap-[var(--spacing-x5)] items-center w-full">
          <Avatar 
            src={userAvatar}
            alt={userName}
            size="xl"
            className="flex items-center justify-center size-[var(--spacing-x14)] shrink-0"
          />
          <div className="flex flex-1 flex-col gap-[var(--spacing-x2)] items-start min-w-0">
            <div className="flex items-center justify-between w-full">
              <Typography variant="display-primary" color="primary">
                {userName}
              </Typography>
              <div className="bg-[var(--border-secondary)] flex gap-[var(--spacing-x2)] items-center justify-center px-[var(--spacing-x2)] py-[0.125rem] rounded-[var(--spacing-x1)] shrink-0">
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
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[var(--spacing-x9)] py-[var(--spacing-x5)] relative shrink-0 w-full">
        <div className="flex-1 h-0 min-h-px min-w-px mr-[calc(var(--spacing-x9)*-1)] relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.13%]" style={{ borderTop: '1px solid var(--border-primary)' }} />
        </div>
      </div>

      {/* Menu Items */}
      <div className="box-border content-stretch flex flex-col gap-[var(--spacing-x4)] items-start px-[var(--spacing-x5)] py-0 relative shrink-0 w-full">
        {menuItems.map(({ id, label, iconName }) => (
          <button
            key={id}
            onClick={() => onMenuItemClick(id)}
            className="bg-[var(--bg-primary)] box-border content-stretch flex gap-[0.625rem] items-center p-[var(--spacing-x3)] relative rounded-[var(--spacing-x2)] shrink-0 w-full hover:bg-[var(--bg-secondary)] transition-colors text-left"
          >
            <div className="max-h-[var(--spacing-x7)] max-w-[var(--spacing-x7)] min-h-[var(--spacing-x4)] min-w-[var(--spacing-x4)] relative shrink-0 size-[var(--spacing-x4)]">
              <Icon
                name={iconName}
                size={16}
                className="absolute inset-0"
                color="var(--primary)"
              />
            </div>
            <p className="font-[family-name:var(--font-family-primary,'Inter',sans-serif)] font-[var(--font-weight-regular,normal)] font-normal leading-[1.4] relative shrink-0 text-[color:var(--primary)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
              {/* text-md-rem (responsive) */}
              {label}
            </p>
          </button>
        ))}
      </div>

      {/* Divider before Logout */}
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[var(--spacing-x9)] py-[var(--spacing-x5)] relative shrink-0 w-full">
        <div className="flex-1 h-0 min-h-px min-w-px mr-[calc(var(--spacing-x9)*-1)] relative shrink-0">
          <div className="absolute inset-[-0.5px_-0.13%]" style={{ borderTop: '1px solid var(--border-primary)' }} />
        </div>
      </div>

      {/* Logout Item */}
      <button
        onClick={() => onMenuItemClick(logoutItem.id)}
        className="bg-[var(--bg-primary)] box-border content-stretch flex gap-[0.625rem] items-center px-[var(--spacing-x8)] py-[var(--spacing-x3)] relative rounded-[var(--spacing-x2)] shrink-0 w-full hover:bg-[var(--bg-secondary)] transition-colors text-left"
      >
        <div className="max-h-[var(--spacing-x7)] max-w-[var(--spacing-x7)] min-h-[var(--spacing-x4)] min-w-[var(--spacing-x4)] overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
          <Icon
            name={logoutItem.iconName}
            size={16}
            className="absolute inset-[12.5%]"
            color="var(--critical)"
          />
        </div>
        <p className="font-[family-name:var(--font-family-primary,'Inter',sans-serif)] font-[var(--font-weight-regular,normal)] font-normal leading-[1.4] relative shrink-0 text-[color:var(--critical)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
          {/* text-md-rem (responsive) */}
          {logoutItem.label}
        </p>
      </button>
    </Comp>
  );
};

UserProfileDropdown.displayName = 'UserProfileDropdown';
