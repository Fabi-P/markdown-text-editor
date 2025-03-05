import React from 'react'
import { Container, Title, Text, Button, Group, Space } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import NotesList from '../components/NotesList'
import { useNotes } from '../contexts/NotesContext'

const Home = () => {
  const { notes, loading } = useNotes()
  
  return (
    <Container size="lg" py="xl">
      <Group position="apart" mb="xl">
        <div>
          <Title order={2}>Your Notes</Title>
          <Text color="dimmed">Manage your markdown notes</Text>
        </div>
        <Button 
          component={Link} 
          to="/editor" 
          leftIcon={<IconPlus size={16} />}
        >
          New Note
        </Button>
      </Group>
      
      {loading ? (
        <Text align="center">Loading notes...</Text>
      ) : (
        <NotesList />
      )}
      
      <Space h="xl" />
    </Container>
  )
}

export default Home
