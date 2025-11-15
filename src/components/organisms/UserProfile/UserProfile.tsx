import React from 'react';
import { User, Settings, Refresh, Password, Logout } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logos';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { CompanyInfo } from '../../../types/company';

export interface UserProfileProps {
  company?: CompanyInfo;
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  userAvatar?: string;
  state?: 'Default' | 'Open';
  companyName?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  onMenuItemClick?: (item: string) => void;
  className?: string;
}

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
  state,
  companyName = true,
  isOpen,
  onToggle = () => {},
  onMenuItemClick = () => {},
  className,
}) => {
  const currentState = state ?? (isOpen ? 'Open' : 'Default');

  // State=Default, Company name=False
  if (currentState === 'Default' && !companyName) {
    return (
      <div 
        className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[var(--x2,8px)] rounded-[var(--x2,8px)] cursor-pointer"
        onClick={onToggle}
      >
        <Avatar 
          src={userAvatar}
          alt={userName}
          size="md"
          className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[40px]"
        />
      </div>
    );
  }

  // State=Open, Company name=True
  if (currentState === 'Open' && companyName) {
    return (
      <div className="content-stretch flex flex-col gap-[var(--x5,20px)] items-end w-[400px]">
        <div 
          className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[15px] items-center overflow-clip p-[var(--x2,8px)] relative rounded-[var(--x2,8px)] shrink-0 cursor-pointer"
          onClick={onToggle}
        >
          <div className="h-[26px] relative shrink-0 w-[155px]">
            <Logo name={company.name} width={155} height={26} />
          </div>
          <Avatar 
            src={userAvatar}
            alt={userName}
            size="md"
            className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[40px]"
          />
        </div>

        <div className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex flex-col gap-[var(--x0,0px)] items-center overflow-clip px-0 py-[20px] relative rounded-[var(--x2,8px)] shadow-[-6px_-6px_12px_0px_rgba(0,0,0,0.1),6px_6px_12px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
          
          <div className="box-border content-stretch flex flex-col gap-[20px] items-start justify-center px-[var(--x5,20px)] py-0 relative shrink-0 w-full">
            <div className="content-stretch flex gap-[var(--x5,20px)] items-center relative shrink-0 w-full">
              <Avatar 
                src={userAvatar}
                alt={userName}
                size="xl"
                className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[56px]"
              />
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x2,8px)] items-start min-h-px min-w-px relative shrink-0">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <Typography variant="display-primary" color="primary" className="relative shrink-0">
                    {userName}
                  </Typography>
                  <div className="bg-[var(--border_secondary,#f0f1f7)] box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[var(--x1,4px)] shrink-0">
                    <Typography variant="body-secondary-semibold" color="primary" className="relative shrink-0">
                      {userBadge}
                    </Typography>
                  </div>
                </div>
                <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
                  <Typography variant="body-primary-regular" color="primary" className="relative shrink-0">
                    {userRole}
                  </Typography>
                  <Typography variant="body-secondary-medium" color="muted" className="relative shrink-0">
                    {userLocation}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[var(--x5,20px)] relative shrink-0 w-full">
            <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
              <div className="absolute inset-[-0.5px_-0.13%] border-t border-[var(--border-primary,#ced1d7)]" />
            </div>
          </div>

          <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[var(--x5,20px)] py-0 relative shrink-0 w-full">
            <div 
              className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center p-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full cursor-pointer hover:bg-[var(--border_secondary,#f0f1f7)] transition-colors"
              onClick={() => onMenuItemClick('view-profile')}
            >
              <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] relative shrink-0 size-[16px]">
                <User className="w-full h-full text-[color:var(--primary,#434f64)]" />
              </div>
              <Typography variant="body-primary-regular" color="primary" className="relative shrink-0">
                View Profile
              </Typography>
            </div>

            <div 
              className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center p-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full cursor-pointer hover:bg-[var(--border_secondary,#f0f1f7)] transition-colors"
              onClick={() => onMenuItemClick('settings')}
            >
              <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] relative shrink-0 size-[16px]">
                <Settings className="w-full h-full text-[color:var(--primary,#434f64)]" />
              </div>
              <Typography variant="body-primary-regular" color="primary" className="relative shrink-0">
                Settings
              </Typography>
            </div>

            <div 
              className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center p-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full cursor-pointer hover:bg-[var(--border_secondary,#f0f1f7)] transition-colors"
              onClick={() => onMenuItemClick('change-desk')}
            >
              <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] relative shrink-0 size-[16px]">
                <Refresh className="w-full h-full text-[color:var(--primary,#434f64)]" />
              </div>
              <Typography variant="body-primary-regular" color="primary" className="relative shrink-0">
                Change Desk
              </Typography>
            </div>

            <div 
              className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center p-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full cursor-pointer hover:bg-[var(--border_secondary,#f0f1f7)] transition-colors"
              onClick={() => onMenuItemClick('change-password')}
            >
              <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] overflow-clip relative shrink-0 size-[16px]">
                <Password className="w-full h-full text-[color:var(--primary,#434f64)]" />
              </div>
              <Typography variant="body-primary-regular" color="primary" className="relative shrink-0">
                Change Password
              </Typography>
            </div>
          </div>

          <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[var(--x5,20px)] relative shrink-0 w-full">
            <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
              <div className="absolute inset-[-0.5px_-0.13%] border-t border-[var(--border-primary,#ced1d7)]" />
            </div>
          </div>

          <div 
            className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[10px] items-center px-[32px] py-[var(--x3,12px)] relative rounded-[var(--x2,8px)] shrink-0 w-full cursor-pointer hover:bg-[var(--critical-light)] transition-colors"
            onClick={() => onMenuItemClick('logout')}
          >
            <div className="max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] overflow-clip relative shrink-0 size-[16px]">
              <Logout className="w-full h-full text-[color:var(--critical,#ff3533)]" />
            </div>
            <Typography variant="body-primary-regular" color="danger" className="relative shrink-0">
              Logout
            </Typography>
          </div>

        </div>
      </div>
    );
  }

  // State=Default, Company name=True
  return (
    <div 
      className="bg-[var(--bg_primary,#ffffff)] box-border content-stretch flex gap-[15px] items-center p-[var(--x2,8px)] rounded-[var(--x2,8px)] cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center self-stretch">
        <div className="h-[26px] relative shrink-0 w-[155px]">
          <Logo name={company.name} width={155} height={26} />
        </div>
      </div>
      <Avatar 
        src={userAvatar}
        alt={userName}
        size="md"
        className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 size-[40px]"
      />
    </div>
  );
};

UserProfile.displayName = 'UserProfile';
