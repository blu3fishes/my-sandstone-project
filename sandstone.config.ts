import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'datapack',
  description: [ 'A ', { text: 'Craft Legend', color: 'gold' }, ' data pack.' ],
  formatVersion: 7,
  namespace: 'cflegend',
  packUid: 'DLz1g4TW',
  saveOptions: { path: '.' },
  onConflict: {
    default: 'warn',
  },
} as SandstoneConfig
