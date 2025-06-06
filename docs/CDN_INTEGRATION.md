# CDN Integration Guide - Solving window.FTDesignSystem Loading Issues

## 🚨 The Problem

When using FT Design System via CDN, you may encounter issues where `window.FTDesignSystem` is undefined, causing components to not render. This happens because:

1. **CDN hasn't loaded yet**: The script is still downloading/parsing
2. **Network issues**: CDN is unavailable or blocked
3. **Timing issues**: JavaScript executes before the UMD script loads

## ✅ Solutions

### 1. **Robust CDN Loading with Fallback** (Recommended)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
  
  <script>
    // Robust CDN loader with fallback
    function waitForDesignSystem(callback, timeout = 5000) {
      const startTime = Date.now();
      
      function check() {
        if (window.FTDesignSystem) {
          callback(window.FTDesignSystem);
        } else if (Date.now() - startTime < timeout) {
          setTimeout(check, 100);
        } else {
          console.error('FT Design System failed to load from CDN');
          callback(null);
        }
      }
      
      check();
    }
    
    // Use the design system
    waitForDesignSystem((FTDesignSystem) => {
      if (!FTDesignSystem) {
        document.getElementById('root').innerHTML = 
          '<p>Design System failed to load. Please check your connection.</p>';
        return;
      }
      
      const { Button, Input, Table, Badge } = FTDesignSystem;
      
      // Your app code here
      const App = () => React.createElement('div', null,
        React.createElement(Button, { variant: 'primary' }, 'Hello World'),
        React.createElement(Badge, { variant: 'success' }, 'Loaded!')
      );
      
      ReactDOM.render(React.createElement(App), document.getElementById('root'));
    });
  </script>
</body>
</html>
```

### 2. **Promise-Based CDN Loader**

```javascript
function loadDesignSystem() {
  return new Promise((resolve, reject) => {
    if (window.FTDesignSystem) {
      resolve(window.FTDesignSystem);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/ft-design-system@latest/dist/index.umd.js';
    
    script.onload = () => {
      if (window.FTDesignSystem) {
        resolve(window.FTDesignSystem);
      } else {
        reject(new Error('FT Design System not found on window'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load FT Design System'));
    };
    
    document.head.appendChild(script);
  });
}

// Usage
loadDesignSystem()
  .then((FTDesignSystem) => {
    const { Button, Input, Badge } = FTDesignSystem;
    // Your app code here
  })
  .catch((error) => {
    console.error('Design System loading failed:', error);
    // Fallback UI or manual components
  });
```

### 3. **React-Specific CDN Integration**

```jsx
// For tools like Lovable.dev, bolt.new, etc.
function useDesignSystem() {
  const [designSystem, setDesignSystem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    if (window.FTDesignSystem) {
      setDesignSystem(window.FTDesignSystem);
      setLoading(false);
      return;
    }
    
    const timeout = setTimeout(() => {
      setError('Design System loading timeout');
      setLoading(false);
    }, 10000);
    
    const checkInterval = setInterval(() => {
      if (window.FTDesignSystem) {
        setDesignSystem(window.FTDesignSystem);
        setLoading(false);
        clearTimeout(timeout);
        clearInterval(checkInterval);
      }
    }, 100);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(checkInterval);
    };
  }, []);
  
  return { designSystem, loading, error };
}

// Usage in your component
function App() {
  const { designSystem, loading, error } = useDesignSystem();
  
  if (loading) return <div>Loading Design System...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!designSystem) return <div>Design System not available</div>;
  
  const { Button, Badge, Table } = designSystem;
  
  return (
    <div>
      <Button variant="primary">Hello World</Button>
      <Badge variant="success">Loaded!</Badge>
    </div>
  );
}
```

### 4. **Module Federation Alternative** (Advanced)

For production applications, consider using Module Federation instead of CDN:

```javascript
// webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        'ft-design-system': 'ft_design_system@https://your-cdn.com/remoteEntry.js',
      },
    }),
  ],
};

// Usage
const { Button } = await import('ft-design-system/Button');
```

## 🔧 Debugging CDN Issues

### Check if CDN is loaded:
```javascript
console.log('FTDesignSystem available:', !!window.FTDesignSystem);
console.log('Available components:', window.FTDesignSystem ? Object.keys(window.FTDesignSystem) : 'Not loaded');
```

### Network debugging:
```javascript
// Check if CDN script exists
const scripts = Array.from(document.scripts);
const ftScript = scripts.find(s => s.src.includes('ft-design-system'));
console.log('FT Script loaded:', !!ftScript);
console.log('Script src:', ftScript?.src);
```

### Manual fallback loader:
```javascript
function createFallbackComponents() {
  return {
    Button: ({ children, variant = 'primary', ...props }) => 
      React.createElement('button', {
        className: `px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`,
        ...props
      }, children),
    
    Badge: ({ children, variant = 'default', ...props }) =>
      React.createElement('span', {
        className: `px-2 py-1 rounded text-sm ${variant === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`,
        ...props
      }, children)
  };
}
```

## 🎯 Best Practices

1. **Always include timeout handling** - Don't wait indefinitely
2. **Provide fallback UI** - Show something if CDN fails
3. **Use specific versions** - Avoid `@latest` in production
4. **Cache CDN resources** - Use proper HTTP headers
5. **Monitor CDN health** - Track loading success rates

## 📱 Platform-Specific Solutions

### Lovable.dev
```javascript
// In Lovable, use the React hook approach
import { useDesignSystem } from './hooks/useDesignSystem';

export default function MyComponent() {
  const { designSystem, loading, error } = useDesignSystem();
  
  if (loading) return <div className="animate-pulse">Loading...</div>;
  if (error || !designSystem) return <div>Using fallback components</div>;
  
  const { Button, Badge } = designSystem;
  return <Button variant="primary">Lovable + FT Design System</Button>;
}
```

### Bolt.new
```javascript
// For bolt.new, use the promise-based approach
window.initializeApp = async function() {
  try {
    const FTDesignSystem = await loadDesignSystem();
    const { Button, Table } = FTDesignSystem;
    // Initialize your app
  } catch (error) {
    console.warn('Using fallback components');
    const { Button, Table } = createFallbackComponents();
    // Initialize with fallbacks
  }
};
```

## 🚀 Production Recommendations

1. **Use npm installation** instead of CDN for production apps
2. **Self-host CDN files** for better reliability
3. **Implement proper error boundaries** in React apps
4. **Use service workers** to cache CDN resources
5. **Monitor CDN performance** with tools like Pingdom or DataDog

## 📊 CDN Status Check

Test CDN availability:
```javascript
fetch('https://unpkg.com/ft-design-system@latest/package.json')
  .then(r => r.json())
  .then(pkg => console.log('CDN Version:', pkg.version))
  .catch(e => console.error('CDN unavailable:', e));
```

## 🎨 Design Tokens for Consistent Styling

When using FT Design System components or creating fallbacks, use these EXACT design tokens:

### Colors
```css
/* Primary colors */
--ft-primary: #1890ff;
--ft-primary-dark: #006ed3;
--ft-primary-light: #ecf6ff;

/* Status colors */
--ft-error: #ff3533;
--ft-warning: #ff6c19;
--ft-success: #00c638;

/* Text colors */
--ft-text-heading: #434f64;
--ft-text-body: #5f697b;
--ft-text-muted: #838c9d;

/* UI colors */
--ft-border: #ced1d7;
--ft-divider: #f0f1f7;
--ft-background: #f8f8f9;
--ft-surface: #ffffff;
```

### Typography
```css
--ft-font-family: Inter;
--ft-font-weight-regular: 400;
--ft-font-weight-medium: 500;
--ft-font-weight-semibold: 600;

/* Font sizes */
--ft-text-sm: 14px;
--ft-text-md: 16px;
--ft-text-lg: 20px;
--ft-text-xl: 24px;
--ft-text-xxl: 28px;
```

### Spacing (8px base system)
```css
--ft-space-xs: 4px;
--ft-space-sm: 8px;
--ft-space-md: 12px;
--ft-space-lg: 16px;
--ft-space-xl: 20px;
--ft-space-2xl: 24px;
--ft-space-3xl: 32px;
```

### Border Radius
```css
--ft-radius-sm: 4px;    /* badges, checkboxes */
--ft-radius-md: 8px;    /* buttons, inputs */
--ft-radius-lg: 12px;   /* cards, modals */
--ft-radius-xl: 16px;   /* hero sections */
--ft-radius-pill: 9999px; /* fully rounded */
```

### Shadows
```css
--ft-shadow-sm: 0 1px 2px 0 rgba(67, 79, 100, 0.05);
--ft-shadow-md: 0 4px 6px -1px rgba(67, 79, 100, 0.1);
--ft-shadow-lg: 0 10px 15px -3px rgba(67, 79, 100, 0.1);
--ft-shadow-xl: 0 20px 25px -5px rgba(67, 79, 100, 0.1);
```

### Fallback Component Examples
```css
/* Primary button */
.ft-button-primary {
  background: var(--ft-primary);
  color: white;
  border-radius: var(--ft-radius-md);
  padding: 12px 20px;
  box-shadow: var(--ft-shadow-sm);
  font-weight: var(--ft-font-weight-medium);
}

/* Input field */
.ft-input {
  border: 1px solid var(--ft-border);
  border-radius: var(--ft-radius-md);
  padding: 8px 12px;
  font-family: var(--ft-font-family);
}

.ft-input:focus {
  border-color: var(--ft-primary);
  box-shadow: 0 0 0 2px var(--ft-primary-light);
}

/* Card */
.ft-card {
  background: var(--ft-surface);
  border-radius: var(--ft-radius-lg);
  box-shadow: var(--ft-shadow-md);
  padding: var(--ft-space-2xl);
}
```

**CRITICAL:** Always use these exact values to maintain perfect brand consistency. Never use generic Tailwind colors or arbitrary values.

This guide ensures your FT Design System integration is robust and handles all edge cases gracefully! 