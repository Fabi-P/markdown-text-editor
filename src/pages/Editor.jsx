import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Title, Text, Alert, Group, Button } from '@mantine/core'
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react'
import MarkdownEditor from '../components/MarkdownEditor'
import { useNotes } from '../contexts/NotesContext'

const Editor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getNote, createNote, updateNote } = useNotes()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadNote = async () => {
      if (id) {
        try {
          setLoading(true)
          const foundNote = await getNote(parseInt(id))
          
          if (!foundNote) {
            setError('Note not found')
            return
          }
          
          setNote(foundNote)
        } catch (err) {
          setError('Failed to load note')
          console.error(err)
        } finally {
          setLoading(false)
        }
      } else {
        // Create a new note
        try {
          const newNote = await createNote()
          setNote(newNote)
          // Update URL to include the new note ID
          navigate(`/editor/${newNote.id}`, { replace: true })
        } catch (err) {
          setError('Failed to create new note')
          console.error(err)
        }
      }
    }
    
    loadNote()
  }, [id])
  
  const handleSave = async (updatedNote) => {
    try {
      const saved = await updateNote(note.id, updatedNote)
      setNote(saved)
    } catch (err) {
      setError('Failed to save note')
      console.error(err)
    }
  }
  
  const handleTitleChange = (newTitle) => {
    setNote(prev => ({ ...prev, title: newTitle }))
  }
  
  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Text>Loading note...</Text>
      </Container>
    )
  }
  
  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
        <Group mt="md">
          <Button leftIcon={<IconArrowLeft size={16} />} onClick={() => navigate('/')}>
            Back to Notes
          </Button>
        </Group>
      </Container>
    )
  }
  
  return (
    <Container size="lg" py="xl">
      <Group mb="md">
        <Button 
          variant="subtle" 
          leftIcon={<IconArrowLeft size={16} />} 
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Group>
      
      {note && (
        <MarkdownEditor 
          note={note} 
          onSave={handleSave}
          onTitleChange={handleTitleChange}
        />
      )}
    </Container>
  )
}

export default Editor
