import React, { useState } from 'react';
import { UserProfile } from '../UserProfile/UserProfile';
import { Rocket, Bell } from '../../atoms/Icons';
import { Logo, type LogoName } from '../../atoms/Logos';
import { CompanyInfo } from '../../../types/company';

export interface User {
  name: string;
  avatar?: string;
  role?: string;
  location?: string;
  badge?: string;
}

export interface AppHeaderProps {
  company?: CompanyInfo;
  user?: User;
  onNotificationClick?: (type: 'rocket' | 'bell') => void;
  onUserClick?: () => void;
  onUserMenuItemClick?: (item: string) => void;
  className?: string;
}

// Available company configurations (only FT and Tata Motors)
const companyConfigs: Record<LogoName, CompanyInfo> = {
  'ft': {
    name: 'ft',
    displayName: 'FreightTiger'
  },
  'tata-motors': {
    name: 'tata-motors',
    displayName: 'Tata Motors'
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  company = companyConfigs['ft'], // Default to FT as shown in Figma
  user = {
    name: 'Santosh Kumar',
    role: 'Dispatch Manager',
    location: 'SPD-Santoshnagar',
    badge: 'Admin',
  },
  onNotificationClick = () => {},
  onUserClick = () => {},
  onUserMenuItemClick = () => {},
  className,
}) => {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
  return (
    <header 
      style={{
        backgroundColor: '#F8F8F9',
        borderBottom: '1px solid #CED1D7',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '298px',
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
          backgroundColor: '#FFFFFF',
          borderRadius: '100px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '53px',
          height: '53px',
          boxSizing: 'border-box',
        }}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z" stroke="#434F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Company Logo Section - Using Logo component */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <Logo name={company.name} width={191} height={28} />
        </div>
      </div>

      {/* Notification Icons and User Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
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
            }}
            onClick={() => onNotificationClick('rocket')}
          >
            <div style={{ width: '24px', height: '24px', color: '#434F64' }}>
              <Rocket />
            </div>
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
            }}
            onClick={() => onNotificationClick('bell')}
          >
            <div style={{ width: '24px', height: '24px', color: '#434F64' }}>
              <Bell />
            </div>
          </div>
        </div>

        {/* User Profile */}
        <UserProfile
          company={company}
          userName={user.name}
          userRole={user.role}
          userLocation={user.location}
          userBadge={user.badge}
          userAvatar={user.avatar}
          isOpen={isUserProfileOpen}
          onToggle={() => {
            setIsUserProfileOpen(!isUserProfileOpen);
            onUserClick();
          }}
          onMenuItemClick={onUserMenuItemClick}
        />
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

// Export only available configurations
export { companyConfigs }; 