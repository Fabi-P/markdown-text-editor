import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useTheme } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  const { theme } = useTheme()
  
  return (
    <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles withNormalizeCSS>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Layout>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Layout>
    </MantineProvider>
  )
}

export default App
