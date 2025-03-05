// Local storage functions
export const saveToLocal = (note) => {
  // Create a blob and trigger download
  const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${note.title.replace(/\s+/g, '-').toLowerCase()}.md`
  document.body.appendChild(a)
  a.click()
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

// Google Drive integration
export const saveToGDrive = async (note) => {
  // This would require Google Drive API integration
  // For now, we'll just show a placeholder message
  alert('Google Drive integration is not implemented in this demo')
}

// OneDrive integration
export const saveToOneDrive = async (note) => {
  // This would require Microsoft Graph API integration
  // For now, we'll just show a placeholder message
  alert('OneDrive integration is not implemented in this demo')
}

// GitHub integration
export const saveToGitHub = async (note) => {
  // This would require GitHub API integration
  // For now, we'll just show a placeholder message
  alert('GitHub integration is not implemented in this demo')
}

// Export function that handles different storage options
export const saveToStorage = async (note, storageType) => {
  switch (storageType) {
    case 'local':
      return saveToLocal(note)
    case 'gdrive':
      return saveToGDrive(note)
    case 'onedrive':
      return saveToOneDrive(note)
    case 'github':
      return saveToGitHub(note)
    default:
      return saveToLocal(note)
  }
}
