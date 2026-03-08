import React from 'react';
import { Logo } from '../../atoms/Logos';
import { Avatar } from '../../atoms/Avatar';
import { CompanyInfo } from '../../../types/company';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface UserProfileProps extends Omit<ComposableProps<'div'>, 'company' | 'userName' | 'userRole' | 'userLocation' | 'userBadge' | 'userAvatar' | 'companyName' | 'onClick'> {
  company?: CompanyInfo;
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  userAvatar?: string;
  companyName?: boolean;
  onClick?: () => void;
  className?: string;
  /** Glass morphism variant */
  glass?: GlassVariant;
  /**
   * Override avatar size.
   */
  avatarSize?: React.ComponentProps<typeof Avatar>['size'];
  /**
   * Additional className for avatar container.
   */
  avatarClassName?: string;
}

const baseContainer = 'bg-[var(--bg-primary)] box-border content-stretch flex rounded-[var(--radius-md)]';
const avatarClass = 'content-stretch flex gap-[var(--spacing-x3)] items-center justify-center relative shrink-0 size-[var(--spacing-x10)] cursor-pointer';

export const UserProfile: React.FC<UserProfileProps> = ({
  company = {
    name: 'tata-motors',
    displayName: 'Tata Motors'
  },
  userName = 'Santosh Kumar',
  userRole: _userRole,
  userLocation: _userLocation,
  userBadge: _userBadge,
  userAvatar,
  companyName = true,
  onClick = () => { },
  className,
  glass,
  avatarSize,
  avatarClassName,
  asChild,
  ...props
}) => {
  const resolvedGlass = useResolvedGlass(glass);
  const containerClassName = cn(baseContainer, getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', ''), companyName ? 'gap-[var(--spacing-x4)] items-center p-[var(--spacing-x2)]' : 'gap-[var(--spacing-x2-5)] items-center justify-center overflow-clip p-[var(--spacing-x2)]', className);
  const Comp = asChild ? Slot : 'div';

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleAvatarKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Comp
      className={containerClassName}
      {...props}
    >
      {companyName ? (
        <>
          <div className="flex items-center">
            <div className="h-[1.625rem] relative shrink-0 w-[9.6875rem] flex items-center">
              <Logo name={company.name} width={155} height={26} />
            </div>
          </div>
          <Avatar
            src={userAvatar}
            alt={userName}
            size={avatarSize ?? "md"}
            className={cn(avatarClass, avatarClassName)}
            onClick={handleAvatarClick}
            onKeyDown={handleAvatarKeyDown}
            role="button"
            tabIndex={0}
          />
        </>
      ) : (
        <Avatar
          src={userAvatar}
          alt={userName}
          size={avatarSize ?? "md"}
          className={cn(avatarClass, avatarClassName)}
          onClick={handleAvatarClick}
          onKeyDown={handleAvatarKeyDown}
          role="button"
          tabIndex={0}
        />
      )}
    </Comp>
  );
};

UserProfile.displayName = 'UserProfile';
