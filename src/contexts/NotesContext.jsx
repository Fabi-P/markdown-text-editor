import React, { createContext, useContext, useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useSettings } from './SettingsContext'
import { db } from '../utils/db'
import { generateFrontmatter } from '../utils/markdown'

const NotesContext = createContext()

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const { settings } = useSettings()

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const allNotes = await db.notes.toArray()
        setNotes(allNotes)
      } catch (error) {
        console.error('Failed to load notes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadNotes()
  }, [])

  const createNote = async (title = 'Untitled Note') => {
    try {
      const date = format(new Date(), 'yyyy-MM-dd')
      const frontmatter = generateFrontmatter({ title, date }, settings.frontmatterFields)
      
      const newNote = {
        title,
        content: `${frontmatter}\n\n# ${title}\n\nStart writing here...`,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      }
      
      const id = await db.notes.add(newNote)
      const noteWithId = { ...newNote, id }
      
      setNotes(prev => [...prev, noteWithId])
      return noteWithId
    } catch (error) {
      console.error('Failed to create note:', error)
      throw error
    }
  }

  const updateNote = async (id, updates) => {
    try {
      const note = await db.notes.get(id)
      if (!note) throw new Error('Note not found')
      
      const updatedNote = {
        ...note,
        ...updates,
        updated: new Date().toISOString()
      }
      
      await db.notes.update(id, updatedNote)
      
      setNotes(prev => 
        prev.map(note => note.id === id ? updatedNote : note)
      )
      
      return updatedNote
    } catch (error) {
      console.error('Failed to update note:', error)
      throw error
    }
  }

  const deleteNote = async (id) => {
    try {
      await db.notes.delete(id)
      setNotes(prev => prev.filter(note => note.id !== id))
    } catch (error) {
      console.error('Failed to delete note:', error)
      throw error
    }
  }

  const getNote = async (id) => {
    try {
      return await db.notes.get(id)
    } catch (error) {
      console.error('Failed to get note:', error)
      throw error
    }
  }

  return (
    <NotesContext.Provider value={{
      notes,
      loading,
      createNote,
      updateNote,
      deleteNote,
      getNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)
