import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],

    base: '/static/',

    build: {
        outDir: '/workspaces/study-app/django_study_project/static',
        emptyOutDir: true,
    },
})