import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Text, Group, Button, Stack, Badge } from '@mantine/core'
import { IconEdit, IconTrash, IconDownload } from '@tabler/icons-react'
import { format } from 'date-fns'
import { useNotes } from '../contexts/NotesContext'
import { saveToStorage } from '../utils/storage'
import { useSettings } from '../contexts/SettingsContext'

const NotesList = () => {
  const { notes, deleteNote } = useNotes()
  const { settings } = useSettings()
  
  if (notes.length === 0) {
    return (
      <Card p="lg" radius="md" withBorder>
        <Text align="center">No notes yet. Create your first note!</Text>
        <Group position="center" mt="md">
          <Button component={Link} to="/editor">Create Note</Button>
        </Group>
      </Card>
    )
  }
  
  return (
    <Stack spacing="md">
      {notes.map(note => (
        <Card key={note.id} p="lg" radius="md" withBorder>
          <Group position="apart" mb="xs">
            <Text weight={500}>{note.title}</Text>
            <Badge>{format(new Date(note.created), 'MMM d, yyyy')}</Badge>
          </Group>
          
          <Text size="sm" color="dimmed" lineClamp={2}>
            {note.content.replace(/---[\s\S]*?---/, '').trim().substring(0, 150)}...
          </Text>
          
          <Group position="right" mt="md">
            <Button 
              variant="outline" 
              size="xs"
              leftIcon={<IconDownload size={16} />}
              onClick={() => saveToStorage(note, settings.defaultStorage)}
            >
              Save
            </Button>
            <Button 
              component={Link} 
              to={`/editor/${note.id}`} 
              variant="subtle" 
              size="xs"
              leftIcon={<IconEdit size={16} />}
            >
              Edit
            </Button>
            <Button 
              color="red" 
              variant="subtle" 
              size="xs"
              leftIcon={<IconTrash size={16} />}
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  )
}

export default NotesList
