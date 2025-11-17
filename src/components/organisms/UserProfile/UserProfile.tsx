import React from 'react';
import { User, Settings, Refresh, Password, Logout } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logos';
import { Avatar } from '../../atoms/Avatar';
import { CompanyInfo } from '../../../types/company';

export interface UserProfileProps {
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

const baseContainer = 'bg-[var(--bg-primary,#ffffff)] box-border content-stretch flex rounded-[var(--x2,8px)] cursor-pointer';
const avatarClass = 'content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[40px]';

export const UserProfile: React.FC<UserProfileProps> = ({
  company = {
    name: 'tata-motors',
    displayName: 'Tata Motors'
  },
  userName = 'Santosh Kumar',
  userRole = 'Dispatch Manager',
  userLocation = 'SPD-Santoshnagar',
  userBadge = 'Admin',
  userAvatar,
  companyName = true,
  onClick = () => {},
  className,
}) => {
  const containerClassName = `${baseContainer} ${companyName ? 'gap-[15px] items-center p-[var(--x2,8px)]' : 'gap-[10px] items-center justify-center overflow-clip p-[var(--x2,8px)]'}${className ? ` ${className}` : ''}`;

  return (
    <div 
      className={containerClassName}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {companyName ? (
        <>
      <div className="flex items-center self-stretch">
        <div className="h-[26px] relative shrink-0 w-[155px]">
          <Logo name={company.name} width={155} height={26} />
        </div>
      </div>
      <Avatar 
        src={userAvatar}
        alt={userName}
        size="md"
            className={avatarClass}
          />
        </>
      ) : (
        <Avatar 
          src={userAvatar}
          alt={userName}
          size="md"
          className={avatarClass}
        />
      )}
    </div>
  );
};

UserProfile.displayName = 'UserProfile';
