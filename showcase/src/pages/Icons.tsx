import { Icon } from 'ft-design-system';
import type { IconName } from 'ft-design-system';

// All available icon names from the iconMap
const iconNames: IconName[] = [
  'add', 'add-trip', 'aeroplane', 'airtel', 'alert-critical-fill', 'alert-critical',
  'alert-informational-fill', 'alert-informational', 'arrow-bottom-left', 'arrow-down-right',
  'arrow-down', 'arrow-top-left', 'arrow-top-right', 'arrow-up', 'backward', 'bell',
  'bsnl', 'bulk-actions', 'bulk-trip', 'bundle', 'calendar-clock', 'calendar', 'cheap',
  'check-alt', 'check-fill', 'check', 'chevron-down', 'chevron-left', 'chevron-right',
  'chevron-up', 'clock', 'close-filled', 'comment', 'control-tower', 'copy', 'cross-icon',
  'cross', 'cursor-pointer', 'dashboard', 'data-stack', 'default-icon', 'delete',
  'detention-at-origin', 'diversion', 'division', 'document-reuse', 'document', 'download',
  'drag', 'edit', 'eway-bill-expired', 'excel', 'expand', 'export-file', 'eye-invisible',
  'file-alt', 'file-upload', 'file-uploader', 'file', 'fill-details', 'filter', 'forward',
  'ft-colour', 'ft-gray', 'google-colour', 'google-gray', 'gps', 'hamburger-menu', 'home',
  'inbound', 'indent', 'jio', 'light-bulb', 'link', 'loading', 'location', 'lock', 'logout',
  'long-stoppage', 'mail', 'map', 'more', 'mtnl', 'multiple-location', 'multiple-time',
  'multiple-weight', 'my-trip', 'navigator', 'notification', 'organisation', 'outbound',
  'password', 'pen', 'phone-alt', 'phone', 'plant-alt', 'plant', 'planning', 'play-fill',
  'play', 'portable-tracking', 'preview-fill', 'preview', 'recommended', 'refresh', 'remove',
  'reports', 'road', 'rocket', 'route-deviation', 'round-trip', 'rupee-coin', 'save', 'search',
  'send', 'settlement', 'settings', 'shake-hand', 'share', 'ship', 'sim', 'sort', 'star',
  'strength-high', 'strength-low', 'strength-medium', 'strength-no-tracking', 'subtract',
  'success', 'tata', 'temperature-cold', 'temperature-default', 'temperature-hot',
  'three-dot-menu', 'time', 'tracker', 'tracking-interrupted', 'train', 'transit-delay',
  'truck', 'untracked', 'user', 'vehicle', 'vodafone', 'warehouse', 'weight',
  'contracted-bill', 'upload-document', 'part-truck-load', 'reconciliation', 'burger', 'menu'
];

export default function Icons() {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '2rem 1.5rem'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: '#111827'
          }}>
            Icons
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: '#6b7280',
            margin: 0
          }}>
            Browse all {iconNames.length} icons from the design system
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {iconNames.map((iconName) => (
            <div
              key={iconName}
              onClick={() => copyToClipboard(iconName)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              title={`Click to copy: ${iconName}`}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem'
              }}>
                <Icon name={iconName} size={24} color="#111827" />
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: '#374151',
                textAlign: 'center',
                wordBreak: 'break-word',
                fontWeight: '500'
              }}>
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

