import React from 'react'
import { NavLink } from 'react-router-dom'
import { Stack, Button, Text } from '@mantine/core'
import { IconHome, IconEdit, IconSettings } from '@tabler/icons-react'

const Navigation = ({ closeMenu }) => {
  const links = [
    { to: '/', label: 'Home', icon: <IconHome size={18} /> },
    { to: '/editor', label: 'New Note', icon: <IconEdit size={18} /> },
    { to: '/settings', label: 'Settings', icon: <IconSettings size={18} /> }
  ]

  return (
    <Stack spacing="xs">
      {links.map((link) => (
        <NavLink 
          key={link.to} 
          to={link.to}
          onClick={closeMenu}
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          {({ isActive }) => (
            <Button 
              variant={isActive ? "filled" : "subtle"}
              fullWidth
              leftIcon={link.icon}
            >
              {link.label}
            </Button>
          )}
        </NavLink>
      ))}
    </Stack>
  )
}

export default Navigation
