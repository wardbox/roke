import { wasp } from 'wasp/client/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [wasp(), tailwindcss()],
  server: {
    open: true,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.resolve('./node_modules/@fontsource-variable'),
      ],
    },
  },
})
