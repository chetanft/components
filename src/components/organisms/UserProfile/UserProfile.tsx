import React, { useState } from 'react';
import { User, Settings, Refresh, Password, Logout } from '../../atoms/Icons';

export interface UserProfileProps {
  userName?: string;
  userRole?: string;
  userLocation?: string;
  userBadge?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onMenuItemClick?: (item: string) => void;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName = 'Santosh Kumar',
  userRole = 'Dispatch Manager',
  userLocation = 'SPD-Santoshnagar',
  userBadge = 'Admin',
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
          backgroundColor: '#FFFFFF',
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
        {/* Company Logo/Background */}
        <div style={{
          position: 'absolute',
          left: '19px',
          top: '12px',
          width: '155px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '5px 20px',
          borderRadius: '4px',
          backgroundImage: 'linear-gradient(90deg, #FFBE07 0%, #211F1F 100%)',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600',
          boxSizing: 'border-box',
        }}>
          Tata Motors
        </div>

        {/* User Avatar */}
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          width: '30px',
          height: '30px',
          backgroundColor: '#E5E7EB',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <User />
        </div>
      </div>

      {/* User Info Dropdown - Only show when open */}
      {isOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
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
                backgroundColor: '#E5E7EB',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: '32px', height: '32px', color: '#434F64' }}>
                <User />
              </div>
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
                    color: '#434F64',
                  }}>
                    {userName}
                  </span>
                  <div style={{
                    backgroundColor: '#F0F1F7',
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
                      color: '#434F64',
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
                    color: '#434F64',
                  }}>
                    {userRole}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '1.4em',
                    color: '#838C9D',
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
            backgroundColor: '#F0F1F7',
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
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: '#434343' }}>
                <User />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: '#434F64',
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
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: '#434343' }}>
                <Settings />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: '#434F64',
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
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: '#434343' }}>
                <Refresh />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: '#434F64',
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
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: '#434F64' }}>
                <Password />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: '#434F64',
              }}>
                Change Password
              </span>
            </div>

            {/* Divider */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#F0F1F7',
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
                e.currentTarget.style.backgroundColor = '#FEF2F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '16px', height: '16px', color: '#FF3533' }}>
                <Logout />
              </div>
              <span style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4em',
                color: '#FF3533',
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