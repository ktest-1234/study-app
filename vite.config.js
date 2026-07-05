import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 👈 Import path module

export default defineConfig({
  plugins: [react()],
  base: '/static/', 
  build: {
    sourcemap: true,
    // 👈 Force the absolute path inside your codespace directory
    outDir: '/workspaces/study-app/django_study_project/static', 
    emptyOutDir: true, 
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
