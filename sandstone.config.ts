import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'Craft Legend',
  description: [ 'A ', { text: 'Craft Legend', color: 'gold' }, ' data pack.' ],
  formatVersion: 8,
  namespace: 'cflegend',
  packUid: 'DLz1g4TW',
  saveOptions: { path: './dist/' },
  onConflict: {
    default: 'warn',
  }
} as SandstoneConfig
