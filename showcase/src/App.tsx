import 'ft-design-system/index.css'
import { Button, Badge, Input, Label } from 'ft-design-system'

// Add global CSS reset for full width
const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
  }
`

// Inject global styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = globalStyles
  document.head.appendChild(styleElement)
}

function App() {
  const handleNavigation = (section: string) => {
    console.log(`Navigate to: ${section}`)
    // Scroll to section or navigate
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    console.log('Get Started clicked')
    // Navigate to components section
    handleNavigation('components')
  }

  const handleBrowseComponents = () => {
    console.log('Browse Components clicked')
    handleNavigation('components')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      fontFamily: 'Inter, system-ui, sans-serif',
      width: '100%',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#111827' }}>FT/ui</h1>
            <Badge variant="secondary">v4.10.1</Badge>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button 
              onClick={() => handleNavigation('documentation')}
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Documentation
            </button>
            <button 
              onClick={() => handleNavigation('components')}
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Components
            </button>
            <button 
              onClick={() => handleNavigation('examples')}
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Examples
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textDecoration: 'none' }}>GitHub</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '4rem 1.5rem 6rem', 
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            letterSpacing: '-0.025em', 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            color: '#111827'
          }}>
            Build your component library with{' '}
            <span style={{ color: '#434f64' }}>FT Design System</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            marginBottom: '2rem',
            lineHeight: '1.75'
          }}>
            Beautifully designed components that you can copy and paste into your apps.
            Accessible. Customizable. Open Source.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={handleGetStarted}>Get Started</Button>
            <Button variant="secondary" size="lg" onClick={handleBrowseComponents}>Browse Components</Button>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section 
        id="components"
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '2rem 1.5rem 4rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.5rem', 
            padding: '2rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '1.5rem' 
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#111827' }}>Components</h2>
              <Badge variant="outline">React</Badge>
            </div>
            
            {/* Button Examples */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem', color: '#374151' }}>Button</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="text">Text</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Badge Examples */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem', color: '#374151' }}>Badge</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            {/* Input Examples */}
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem', color: '#374151' }}>Input</h3>
              <div style={{ maxWidth: '24rem' }}>
                <Label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid #e5e7eb', 
        marginTop: '4rem',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '1.5rem 1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            Built with FT Design System. The source code is available on GitHub.
          </p>
          <Badge variant="outline" style={{ fontSize: '0.75rem' }}>
            MIT License
          </Badge>
        </div>
      </footer>
    </div>
  )
}

export default App