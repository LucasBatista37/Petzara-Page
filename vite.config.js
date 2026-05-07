import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            png: { quality: 82 },
            jpg: { quality: 85 },
            jpeg: { quality: 85 },
            webp: { quality: 82 },
            svg: false,
            includePublic: true,
        }),
    ],
})
