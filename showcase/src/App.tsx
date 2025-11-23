import 'ft-design-system/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Icons from './pages/Icons'
import Charts from './pages/Charts'

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
  return (
    <BrowserRouter>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#ffffff', 
        fontFamily: 'Inter, system-ui, sans-serif',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App