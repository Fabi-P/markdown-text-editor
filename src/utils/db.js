import Dexie from 'dexie'

export const db = new Dexie('markdown-editor')

db.version(1).stores({
  notes: '++id, title, created, updated'
})
