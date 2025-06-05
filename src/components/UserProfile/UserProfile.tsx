import React, { useState } from 'react';

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
        minWidth: '229px',
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
        }}
        onClick={onToggle}
      >
        {/* Company Background */}
        <div style={{
          position: 'absolute',
          left: '19px',
          top: '12px',
          width: '155px',
          height: '26px',
          backgroundImage: `url('./src/components/UserProfile/assets/company-bg.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '4px',
          gap: '12px',
          padding: '5px 20px',
          boxSizing: 'border-box',
        }} />

        {/* User Avatar */}
        <div style={{
          position: 'absolute',
          left: '189px',
          top: '10px',
          width: '30px',
          height: '30px',
          backgroundColor: '#FFFFFF',
          borderRadius: '1000px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'relative',
            left: '-3px',
            top: '0px',
            width: '38.33px',
            height: '55px',
          }}>
            <img 
              src="./src/components/UserProfile/assets/user-avatar.png"
              alt={userName}
              style={{
                width: '38.33px',
                height: '55px',
                objectFit: 'fill',
              }}
            />
          </div>
        </div>
      </div>

      {/* User Info Dropdown - Only show when open */}
      {isOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          width: '360px',
          position: 'absolute',
          top: '71px',
          right: '0px',
          zIndex: 1000,
          border: '1px solid #E5E7EB',
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
                backgroundColor: '#FFFFFF',
                borderRadius: '1000px',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'relative',
                  left: '-3px',
                  top: '0px',
                  width: '66.33px',
                  height: '83px',
                }}>
                  <img 
                    src="./src/components/UserProfile/assets/user-avatar.png"
                    alt={userName}
                    style={{
                      width: '66.33px',
                      height: '83px',
                      objectFit: 'fill',
                    }}
                  />
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

            {/* Divider Line */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#F0F1F7',
            }} />

            {/* Menu Items */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* View Profile */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onClick={() => onMenuItemClick('view-profile')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F1F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="5.5" r="2.5" stroke="#434343" strokeWidth="1.5"/>
                    <path d="M3 13.5c0-3 2.5-5.5 5-5.5s5 2.5 5 5.5" stroke="#434343" strokeWidth="1.5"/>
                  </svg>
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
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onClick={() => onMenuItemClick('settings')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F1F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="#434343"/>
                    <path d="M14 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" stroke="#434343" strokeWidth="1.5"/>
                  </svg>
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
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onClick={() => onMenuItemClick('change-desk')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F1F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 6.5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-6ZM4.5 3.5v2M11.5 3.5v2M8 8.5l2.5 2.5M8 11l-2.5-2.5" stroke="#434343" strokeWidth="1.5"/>
                  </svg>
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
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onClick={() => onMenuItemClick('change-password')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F1F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="7" width="10" height="6" rx="1" stroke="#434F64" strokeWidth="1.33"/>
                    <path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="#434F64" strokeWidth="1.33"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.4em',
                  color: '#434F64',
                }}>
                  Change Password
                </span>
              </div>

              {/* Divider Line */}
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
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onClick={() => onMenuItemClick('logout')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F1F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M10 11l3-3-3-3M7 8h6" stroke="#FF3533" strokeWidth="1.33"/>
                  </svg>
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
        </div>
      )}
    </div>
  );
};

UserProfile.displayName = 'UserProfile'; 