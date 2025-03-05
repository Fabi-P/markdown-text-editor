import React from 'react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Tooltip label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <ActionIcon
        onClick={toggleTheme}
        size="lg"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  )
}

export default ThemeToggle
