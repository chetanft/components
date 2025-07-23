import React, { useState } from 'react';
import { User, Settings, Refresh, Password, Logout } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logos';
import { CompanyInfo } from '../../../types/company';

export interface UserProfileProps {
  company?: CompanyInfo;
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  userAvatar?: string;
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
  isOpen = false,
  onToggle = () => {},
  onMenuItemClick = () => {},
  className,
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '20px',
        position: 'relative',
        width: isOpen ? '400px' : '229px',
      }}
      className={className}
    >
      {/* User Profile Default State */}
      <div 
        style={{
          backgroundColor: 'var(--border-primary)',
          borderRadius: '8px',
          width: '229px',
          height: '51px',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onToggle}
      >
        {/* Company Logo */}
        <div style={{
          position: 'absolute',
          left: '19px',
          top: '12px',
          width: '155px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px 20px',
          boxSizing: 'border-box',
        }}>
          <Logo name={company.name} width={155} height={26} />
        </div>

        {/* User Avatar */}
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          width: '30px',
          height: '30px',
          backgroundColor: 'var(--border-primary)',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={userName} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          ) : (
            <User />
          )}
        </div>
      </div>

      {/* User Info Dropdown - Only show when open */}
      {isOpen && (
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '8px',
          width: '400px',
          position: 'absolute',
          top: '71px',
          right: '0px',
          zIndex: 1000,
          boxShadow: '6px 6px 12px 0px rgba(0, 0, 0, 0.1), -6px -6px 12px 0px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '20px',
          boxSizing: 'border-box',
        }}>
          {/* User Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
          }}>
            {/* User Container */}
            <div style={{
              display: 'flex',
              gap: '20px',
              width: '100%',
            }}>
              {/* Large User Avatar */}
              <div style={{
                width: '58px',
                height: '58px',
                backgroundColor: 'var(--border-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                ) : (
                  <div style={{ width: '32px', height: '32px', color: 'var(--primary)' }}>
                    <User />
                  </div>
                )}
              </div>

              {/* User Text Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}>
                {/* User Name and Badge */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                }}>
                  <span style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '1.4em',
                    color: 'var(--primary)',
                  }}>
                    {userName}
                  </span>
                  <div style={{
                    backgroundColor: 'var(--border-secondary)',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '2px 8px',
                  }}>
                    <span style={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '1.4em',
                      color: 'var(--primary)',
                    }}>
                      {userBadge}
                    </span>
                  </div>
                </div>

                {/* User Role and Location */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '8px',
                  width: '100%',
                }}>
                  <span style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.4em',
                    color: 'var(--primary)',
                  }}>
                    {userRole}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '1.4em',
                    color: 'var(--tertiary)',
                  }}>
                    {userLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--border-secondary)',
          }} />

          {/* Menu Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '0px',
          }}>
            {/* View Profile */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onMenuItemClick('view-profile')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: 'var(--primary)' }}>
                <User />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: 'var(--primary)',
              }}>
                View Profile
              </span>
            </div>

            {/* Settings */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onMenuItemClick('settings')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: 'var(--primary)' }}>
                <Settings />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: 'var(--primary)',
              }}>
                Settings
              </span>
            </div>

            {/* Change Desk */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onMenuItemClick('change-desk')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: 'var(--primary)' }}>
                <Refresh />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: 'var(--primary)',
              }}>
                Change Desk
              </span>
            </div>

            {/* Change Password */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onMenuItemClick('change-password')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: 'var(--primary)' }}>
                <Password />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: 'var(--primary)',
              }}>
                Change Password
              </span>
            </div>

            {/* Divider */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'var(--border-secondary)',
              margin: '8px 0',
            }} />

            {/* Logout */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onMenuItemClick('logout')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--critical-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: 'var(--critical)' }}>
                <Logout />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: 'var(--critical)',
              }}>
                Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

UserProfile.displayName = 'UserProfile'; 