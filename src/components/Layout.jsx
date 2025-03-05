import React from 'react'
import { AppShell, Header, Navbar, Footer, MediaQuery, Burger, useMantineTheme } from '@mantine/core'
import { useTheme } from '../contexts/ThemeContext'
import Navigation from './Navigation'
import ThemeToggle from './ThemeToggle'

const Layout = ({ children }) => {
  const [opened, setOpened] = React.useState(false)
  const mantineTheme = useMantineTheme()
  const { theme } = useTheme()

  return (
    <AppShell
      styles={{
        main: {
          background: theme === 'dark' ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}>
          <Navigation closeMenu={() => setOpened(false)} />
        </Navbar>
      }
      header={
        <Header height={60} p="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={mantineTheme.colors.gray[6]}
                  mr="xl"
                  aria-label="Toggle navigation"
                />
              </MediaQuery>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Markdown Editor</h1>
            </div>
            <ThemeToggle />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default Layout
