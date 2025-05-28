import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" style={{ width: 80, height: 80 }} />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" style={{ width: 80, height: 80 }} />
        </a>
      </div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#3730a3',
        marginBottom: '1rem',
        letterSpacing: '0.02em'
      }}>
        Vite + React
      </h1>
      <div
        className="card"
        style={{
          background: '#fff',
          borderRadius: '1.25rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '2rem 2.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.75rem',
            padding: '0.75rem 2rem',
            fontSize: '1.25rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
            transition: 'background 0.2s',
            marginBottom: '1rem'
          }}
        >
          count is {count}
        </button>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
          Edit <code style={{ background: '#f1f5f9', borderRadius: '0.3em', padding: '0.1em 0.4em' }}>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" style={{ color: '#6366f1', fontSize: '1.1rem', marginTop: 0 }}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
