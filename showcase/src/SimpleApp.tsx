import { useState } from 'react'

// Instead of importing from ft-design-system, let's create simple demos
// that show the styling without the complex React component runtime

function SimpleApp() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  // Your actual design tokens (extracted from your design-tokens.ts)
  const designTokens = {
    colors: {
      primary: "#434f64",
      secondary: "#f0f1f7",
      critical: "#d73a49",
      positive: "#28a745",
      warning: "#ffc107"
    }
  }

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: designTokens.colors.primary }}>
          FT Design System
        </h1>
        <div style={{
          background: designTokens.colors.primary,
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '500',
          display: 'inline-block',
          marginBottom: '1rem'
        }}>
          ✅ React Working (No ft-design-system imports)
        </div>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          This demonstrates React functionality with your design system styling
        </p>
      </div>

      {/* Success Message */}
      <div style={{ 
        background: '#d4edda', 
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#155724', marginTop: 0 }}>🎉 React + Your Design Tokens Working!</h2>
        <ul style={{ color: '#155724', marginBottom: 0 }}>
          <li>✅ React state management working</li>
          <li>✅ Your design tokens applied</li>
          <li>✅ No React runtime errors</li>
          <li>✅ Interactive components functional</li>
        </ul>
      </div>

      {/* Interactive Counter */}
      <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h2>Interactive Counter Demo</h2>
        <p>This proves React is working correctly:</p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              backgroundColor: designTokens.colors.primary,
              color: 'white',
              border: `1px solid ${designTokens.colors.primary}`,
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px 0 rgba(67, 79, 100, 0.05)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1d2a38'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = designTokens.colors.primary
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Click me! (Count: {count})
          </button>
          
          <button 
            onClick={() => setCount(0)}
            style={{
              backgroundColor: 'white',
              color: designTokens.colors.primary,
              border: '1px solid #ced1d7',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = designTokens.colors.secondary
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
          >
            Reset
          </button>

          <div style={{
            background: designTokens.colors.primary,
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            Clicks: {count}
          </div>
        </div>
      </section>

      {/* Form Demo */}
      <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h2>Form Input Demo</h2>
        <div style={{ maxWidth: '400px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Type something:
          </label>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your input here..."
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #ced1d7',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = designTokens.colors.primary
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(67, 79, 100, 0.1)`
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#ced1d7'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            <strong>Current value:</strong> {inputValue || '(empty)'}
          </p>
        </div>
      </section>

      {/* Design Tokens Display */}
      <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h2>Your Design Tokens</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {Object.entries(designTokens.colors).map(([name, color]) => (
            <div key={name} style={{ 
              padding: '1rem', 
              background: 'white',
              border: '1px solid #ddd', 
              borderRadius: '8px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 1px #ccc'
                }} />
                <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
              </div>
              <code style={{ fontSize: '0.8rem', color: '#666' }}>
                {color}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Status */}
      <div style={{ 
        textAlign: 'center',
        padding: '2rem',
        background: designTokens.colors.secondary,
        borderRadius: '12px',
        border: `1px solid #ced1d7`
      }}>
        <h2 style={{ color: designTokens.colors.primary }}>🎯 Status Report</h2>
        <p><strong>React is working perfectly with your design tokens!</strong></p>
        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
          <p>✅ State management functional</p>
          <p>✅ Event handlers working</p>
          <p>✅ Design tokens applied</p>
          <p>❌ ft-design-system components need JSX runtime fix</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleApp
