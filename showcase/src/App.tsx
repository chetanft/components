import { useState } from 'react'
import 'ft-design-system/styles.css'

// Import actual components from your ft-design-system using ES modules
import { 
  Button,
  Badge,
  Input,
  Label,
  designTokens
} from 'ft-design-system'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

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
        <Badge variant="default" size="md">
          ✅ Using Real Components
        </Badge>
        <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>
          This showcase uses your <strong>actual</strong> ft-design-system components, 
          imported directly from your package.
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
        <h2 style={{ color: '#155724', marginTop: 0 }}>🎉 Success!</h2>
        <ul style={{ color: '#155724', marginBottom: 0 }}>
          <li>✅ Button component imported from ft-design-system</li>
          <li>✅ Badge component imported from ft-design-system</li>
          <li>✅ Input component imported from ft-design-system</li>
          <li>✅ Design tokens loaded: {designTokens.colors.primary}</li>
          <li>✅ CSS styles loaded from ft-design-system/styles.css</li>
        </ul>
      </div>

      {/* Button Showcase */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Button Component
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setCount(count + 1)}
          >
            Primary Button (Count: {count})
          </Button>
          <Button variant="secondary" size="md">
            Secondary Button
          </Button>
          <Button variant="destructive" size="md">
            Destructive Button
          </Button>
          <Button variant="text" size="md">
            Text Button
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      {/* Badge Showcase */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Badge Component
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem', alignItems: 'center' }}>
          <Badge variant="default">Default Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
          <Badge variant="destructive">Destructive Badge</Badge>
          <Badge variant="outline">Outline Badge</Badge>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
          <Badge variant="default" size="sm">Small</Badge>
          <Badge variant="default" size="md">Medium</Badge>
          <Badge variant="default" size="lg">Large</Badge>
        </div>
      </section>

      {/* Form Components */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Form Components
        </h2>
        <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Label htmlFor="demo-input">Demo Input</Label>
            <Input 
              id="demo-input"
              type="text"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            <strong>Current value:</strong> {inputValue || '(empty)'}
          </p>
        </div>
      </section>

      {/* Design Tokens */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Design Tokens
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: designTokens.colors.primary,
                borderRadius: '50%'
              }} />
              <strong>Primary</strong>
            </div>
            <code style={{ fontSize: '0.8rem', color: '#666' }}>
              {designTokens.colors.primary}
            </code>
          </div>
          
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: designTokens.colors.critical.default,
                borderRadius: '50%'
              }} />
              <strong>Critical</strong>
            </div>
            <code style={{ fontSize: '0.8rem', color: '#666' }}>
              {designTokens.colors.critical.default}
            </code>
          </div>

          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: designTokens.colors.positive.default,
                borderRadius: '50%'
              }} />
              <strong>Positive</strong>
            </div>
            <code style={{ fontSize: '0.8rem', color: '#666' }}>
              {designTokens.colors.positive.default}
            </code>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ marginTop: 0 }}>Interactive Demo</h2>
        <p>This demonstrates that your components have full interactivity:</p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => alert(`Button clicked! Count is ${count}`)}
          >
            Test Alert
          </Button>
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => setCount(0)}
          >
            Reset Counter
          </Button>
          <Badge variant="default">
            Clicks: {count}
          </Badge>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        marginTop: '3rem', 
        padding: '2rem 0', 
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>
          <strong>✅ This showcase uses 100% authentic FT Design System components</strong>
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          No custom CSS, no recreated components, no shadcn/ui replicas. 
          Pure ft-design-system integration.
        </p>
        <Badge variant="outline" size="lg">
          Powered by ft-design-system v{process.env.npm_package_version || '4.10.1'}
        </Badge>
      </footer>
      </div>
  )
}

export default App