import React, { useState } from 'react';
import { UserProfile } from '../UserProfile/UserProfile';
import { Rocket, Bell, Tata, FtColour, GoogleColour, Vodafone, Airtel, Jio } from '../../atoms/Icons';

export interface CompanyInfo {
  name: string;
  logoType: 'tata' | 'ft' | 'google' | 'vodafone' | 'airtel' | 'jio' | 'custom';
  colors?: {
    primary: string;
    secondary: string;
  };
  customLogo?: React.ReactNode;
}

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

// Company configurations
const companyConfigs: Record<string, CompanyInfo> = {
  'tata': {
    name: 'Tata Motors',
    logoType: 'tata',
    colors: { primary: '#FFBE07', secondary: '#211F1F' }
  },
  'ft': {
    name: 'Freight Tiger',
    logoType: 'ft',
    colors: { primary: '#FFBE07', secondary: '#211F1F' }
  },
  'google': {
    name: 'Google',
    logoType: 'google',
    colors: { primary: '#4285F4', secondary: '#34A853' }
  },
  'vodafone': {
    name: 'Vodafone',
    logoType: 'vodafone',
    colors: { primary: '#E60000', secondary: '#FFFFFF' }
  },
  'airtel': {
    name: 'Airtel',
    logoType: 'airtel',
    colors: { primary: '#E60000', secondary: '#FFFFFF' }
  },
  'jio': {
    name: 'Jio',
    logoType: 'jio',
    colors: { primary: '#0066CC', secondary: '#FFFFFF' }
  }
};

const getCompanyLogo = (logoType: string) => {
  switch (logoType) {
    case 'tata': return <Tata />;
    case 'ft': return <FtColour />;
    case 'google': return <GoogleColour />;
    case 'vodafone': return <Vodafone />;
    case 'airtel': return <Airtel />;
    case 'jio': return <Jio />;
    default: return <Tata />;
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  company = companyConfigs.tata,
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

        {/* Company Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {/* Company Logo with Icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            {/* Company Icon */}
            <div style={{ 
              width: '24px', 
              height: '24px',
              color: company.colors?.primary || '#434F64'
            }}>
              {company.customLogo || getCompanyLogo(company.logoType)}
            </div>
            
            {/* Company Name */}
            <span style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#434F64',
              whiteSpace: 'nowrap',
            }}>
              {company.name}
            </span>
          </div>
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
          isOpen={isUserProfileOpen}
          onToggle={() => {
            setIsUserProfileOpen(!isUserProfileOpen);
            onUserClick();
          }}
          onMenuItemClick={(item) => {
            onUserMenuItemClick(item);
            if (item === 'logout') {
              setIsUserProfileOpen(false);
            }
          }}
        />
      </div>
    </header>
  );
};

// Export company configs for use in other components
export { companyConfigs };

AppHeader.displayName = 'AppHeader'; 