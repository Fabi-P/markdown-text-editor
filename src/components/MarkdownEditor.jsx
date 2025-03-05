import React, { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Button, Group, TextInput, Stack, Select, Tooltip } from '@mantine/core'
import { IconDeviceFloppy, IconDownload, IconRefresh } from '@tabler/icons-react'
import { useSettings } from '../contexts/SettingsContext'
import { parseFrontmatter, updateFrontmatter } from '../utils/markdown'
import { saveToStorage } from '../utils/storage'
import { useTheme } from '../contexts/ThemeContext'

const MarkdownEditor = ({ note, onSave, onTitleChange }) => {
  const [content, setContent] = useState(note?.content || '')
  const [title, setTitle] = useState(note?.title || '')
  const [storageType, setStorageType] = useState('local')
  const { settings } = useSettings()
  const { theme } = useTheme()
  const autoSaveTimerRef = useRef(null)
  
  useEffect(() => {
    if (note) {
      setContent(note.content)
      setTitle(note.title)
    }
  }, [note])
  
  useEffect(() => {
    // Set up autosave
    if (settings.autosave && note) {
      autoSaveTimerRef.current = setInterval(() => {
        handleSave()
      }, settings.autosaveInterval * 1000)
    }
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current)
      }
    }
  }, [settings.autosave, settings.autosaveInterval, content, title])
  
  const handleContentChange = (newContent) => {
    setContent(newContent)
  }
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    
    if (onTitleChange) {
      onTitleChange(newTitle)
    }
    
    // Update title in frontmatter
    if (content) {
      const updatedContent = updateFrontmatter(
        content, 
        { title: newTitle }, 
        settings.frontmatterFields
      )
      setContent(updatedContent)
    }
  }
  
  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        content
      })
    }
  }
  
  const handleExport = () => {
    if (note) {
      saveToStorage({ ...note, title, content }, storageType)
    }
  }
  
  return (
    <Stack spacing="md">
      <Group position="apart">
        <TextInput
          placeholder="Note title"
          value={title}
          onChange={handleTitleChange}
          style={{ flexGrow: 1 }}
          aria-label="Note title"
        />
        
        <Group spacing="xs">
          <Select
            value={storageType}
            onChange={setStorageType}
            data={[
              { value: 'local', label: 'Local Download' },
              { value: 'gdrive', label: 'Google Drive' },
              { value: 'onedrive', label: 'OneDrive' },
              { value: 'github', label: 'GitHub' }
            ]}
            style={{ width: 150 }}
            aria-label="Storage location"
          />
          
          <Tooltip label="Save to storage">
            <Button
              onClick={handleExport}
              leftIcon={<IconDownload size={16} />}
              aria-label="Save to storage"
            >
              Save
            </Button>
          </Tooltip>
          
          <Tooltip label="Save changes">
            <Button
              onClick={handleSave}
              leftIcon={<IconDeviceFloppy size={16} />}
              aria-label="Save changes"
            >
              Update
            </Button>
          </Tooltip>
        </Group>
      </Group>
      
      <div data-color-mode={theme}>
        <MDEditor
          value={content}
          onChange={handleContentChange}
          height={500}
          preview="edit"
          spellCheck={settings.spellcheck}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight
          }}
        />
      </div>
    </Stack>
  )
}

export default MarkdownEditor
