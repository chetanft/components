import React from 'react';
import { Logo } from '../../atoms/Logos';
import { Avatar } from '../../atoms/Avatar';
import { CompanyInfo } from '../../../types/company';
import { Slot, type ComposableProps } from '../../../lib/slot';

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
}

const baseContainer = 'bg-[var(--bg-primary)] box-border content-stretch flex rounded-[var(--x2,8px)]';
const avatarClass = 'content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[40px] cursor-pointer';

export const UserProfile: React.FC<UserProfileProps> = ({
  company = {
    name: 'tata-motors',
    displayName: 'Tata Motors'
  },
  userName = 'Santosh Kumar',
  userRole,
  userLocation,
  userBadge,
  userAvatar,
  companyName = true,
  onClick = () => { },
  className,
  asChild,
  ...props
}) => {
  const containerClassName = `${baseContainer} ${companyName ? 'gap-[15px] items-center p-[var(--x2,8px)]' : 'gap-[10px] items-center justify-center overflow-clip p-[var(--x2,8px)]'}${className ? ` ${className}` : ''}`;
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
            <div className="h-[26px] relative shrink-0 w-[155px] flex items-center">
              <Logo name={company.name} width={155} height={26} />
            </div>
          </div>
          <Avatar
            src={userAvatar}
            alt={userName}
            size="md"
            className={avatarClass}
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
          size="md"
          className={avatarClass}
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
