import * as path from 'path';  // 👈 Use namespace import
// OR (if you prefer default import)
import path from 'path';  // Works with `esModuleInterop: true`

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ... other config
});