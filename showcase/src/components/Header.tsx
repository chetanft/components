import { Badge, Icon, Input } from 'ft-design-system';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkStyle = (path: string) => ({
    fontSize: '0.875rem',
    fontWeight: '500',
    color: isActive(path) ? '#3b82f6' : '#374151',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: isActive(path) ? '2px solid #3b82f6' : '2px solid transparent',
    paddingBottom: '4px',
    transition: 'all 0.2s'
  });

  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 1.5rem', 
        height: '64px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#111827' }}>FT/ui</h1>
          <Badge variant="neutral">v4.10.1</Badge>
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', margin: '0 2rem' }}>
          <Input
            placeholder="Search components, icons, charts..."
            leadingIcon="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: '400px', width: '100%' }}
          />
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={linkStyle('/')}>
            <Icon name="home" size={16} />
            Home
          </Link>
          <Link to="/icons" style={linkStyle('/icons')}>
            <Icon name="star" size={16} />
            Icons
          </Link>
          <Link to="/charts" style={linkStyle('/charts')}>
            Charts
          </Link>
          <a 
            href="http://localhost:6006" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Icon name="preview" size={16} />
            Storybook
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Icon name="link" size={16} />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

