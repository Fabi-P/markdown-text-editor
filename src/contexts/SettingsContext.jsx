import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const defaultSettings = {
  frontmatterFields: ['title', 'date'],
  autosave: true,
  autosaveInterval: 30, // seconds
  defaultStorage: 'local', // 'local', 'gdrive', 'onedrive', 'github'
  fontSize: 16,
  lineHeight: 1.6,
  spellcheck: true,
  wordWrap: true
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('editor-settings')
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('editor-settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const addFrontmatterField = (field) => {
    if (!settings.frontmatterFields.includes(field)) {
      updateSettings({
        frontmatterFields: [...settings.frontmatterFields, field]
      })
    }
  }

  const removeFrontmatterField = (field) => {
    // Don't allow removing title or date
    if (field === 'title' || field === 'date') return
    
    updateSettings({
      frontmatterFields: settings.frontmatterFields.filter(f => f !== field)
    })
  }

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      resetSettings,
      addFrontmatterField,
      removeFrontmatterField
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
