import React from 'react'
import { Container, Title, Text, Card, Switch, NumberInput, Select, MultiSelect, Button, Group, Stack, Divider } from '@mantine/core'
import { useSettings } from '../contexts/SettingsContext'

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings()
  
  const frontmatterOptions = [
    { value: 'title', label: 'Title', disabled: true },
    { value: 'date', label: 'Date', disabled: true },
    { value: 'author', label: 'Author' },
    { value: 'tags', label: 'Tags' },
    { value: 'category', label: 'Category' },
    { value: 'description', label: 'Description' },
    { value: 'status', label: 'Status' }
  ]
  
  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md">Settings</Title>
      
      <Card withBorder p="xl" radius="md">
        <Stack spacing="xl">
          <div>
            <Title order={4} mb="sm">Editor Settings</Title>
            <Stack spacing="md">
              <NumberInput
                label="Font Size (px)"
                value={settings.fontSize}
                onChange={(val) => updateSettings({ fontSize: val })}
                min={12}
                max={24}
                aria-label="Font size"
              />
              
              <NumberInput
                label="Line Height"
                value={settings.lineHeight}
                onChange={(val) => updateSettings({ lineHeight: val })}
                min={1}
                max={2.5}
                step={0.1}
                precision={1}
                aria-label="Line height"
              />
              
              <Switch
                label="Spell Check"
                checked={settings.spellcheck}
                onChange={(e) => updateSettings({ spellcheck: e.currentTarget.checked })}
              />
              
              <Switch
                label="Word Wrap"
                checked={settings.wordWrap}
                onChange={(e) => updateSettings({ wordWrap: e.currentTarget.checked })}
              />
            </Stack>
          </div>
          
          <Divider />
          
          <div>
            <Title order={4} mb="sm">Autosave Settings</Title>
            <Stack spacing="md">
              <Switch
                label="Enable Autosave"
                checked={settings.autosave}
                onChange={(e) => updateSettings({ autosave: e.currentTarget.checked })}
              />
              
              <NumberInput
                label="Autosave Interval (seconds)"
                value={settings.autosaveInterval}
                onChange={(val) => updateSettings({ autosaveInterval: val })}
                min={5}
                max={300}
                disabled={!settings.autosave}
                aria-label="Autosave interval"
              />
            </Stack>
          </div>
          
          <Divider />
          
          <div>
            <Title order={4} mb="sm">Storage Settings</Title>
            <Select
              label="Default Storage Location"
              value={settings.defaultStorage}
              onChange={(val) => updateSettings({ defaultStorage: val })}
              data={[
                { value: 'local', label: 'Local Download' },
                { value: 'gdrive', label: 'Google Drive' },
                { value: 'onedrive', label: 'OneDrive' },
                { value: 'github', label: 'GitHub' }
              ]}
              aria-label="Default storage location"
            />
          </div>
          
          <Divider />
          
          <div>
            <Title order={4} mb="sm">Frontmatter Settings</Title>
            <Text size="sm" color="dimmed" mb="md">
              Select which fields to include in the frontmatter of your markdown files.
              Title and date are required.
            </Text>
            
            <MultiSelect
              data={frontmatterOptions}
              value={settings.frontmatterFields}
              onChange={(val) => {
                // Ensure title and date are always included
                if (!val.includes('title')) val.push('title')
                if (!val.includes('date')) val.push('date')
                updateSettings({ frontmatterFields: val })
              }}
              aria-label="Frontmatter fields"
            />
          </div>
          
          <Divider />
          
          <Group position="apart">
            <Button color="red" variant="outline" onClick={resetSettings}>
              Reset to Defaults
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  )
}

export default Settings
