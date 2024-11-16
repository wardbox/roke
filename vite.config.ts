import { resolveProjectPath } from 'wasp/dev'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    open: true,
    fs: {
      allow: [
        // Keeping the original behaviour how Vite searches for the workspace root
        // https://vitejs.dev/config/server-options#server-fs-allow
        searchForWorkspaceRoot(process.cwd()),
        // Allow serving files from the node_modules/@fontsource directory
        // (using Wasp's helper to resolve project path)
        resolveProjectPath('./node_modules/@fontsource-variable'),
        // resolveProjectPath('./node_modules/@fontsource'), // If you use a non-variable font
      ],
    },
  },
})
