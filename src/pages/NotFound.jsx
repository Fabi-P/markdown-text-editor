import React from 'react'
import { Container, Title, Text, Button, Group } from '@mantine/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container size="md" py="xl" style={{ textAlign: 'center' }}>
      <Title order={1} size="3rem">404</Title>
      <Title order={2} mb="md">Page Not Found</Title>
      <Text mb="xl">The page you are looking for doesn't exist or has been moved.</Text>
      <Group position="center">
        <Button component={Link} to="/" size="md">
          Back to Home
        </Button>
      </Group>
    </Container>
  )
}

export default NotFound
