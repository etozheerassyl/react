import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { aegisPublicApi } from './api/vite-plugin-public-api.js'
import { aegisServiceWorker } from './sw/vite-plugin-service-worker.js'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the same build works under /react/task-7/ on GitHub Pages
  // (and under any other sub-path). The manifest + service worker also use
  // relative URLs, so their scope is always the folder the app is served from.
  base: './',
  plugins: [
    react(),
    // Read-only public REST API (api/assets.json, api/assets/:id.json)
    aegisPublicApi(),
    // Generates dist/sw.js with a versioned precache manifest of the built app shell
    aegisServiceWorker(),
  ],
})
