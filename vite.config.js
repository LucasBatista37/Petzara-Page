import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [
        react(),
        tailwindcss(),
        // Só no build do navegador: o build SSR (pré-render) não gera imagens nem copia /public.
        !isSsrBuild && ViteImageOptimizer({
            png: { quality: 82 },
            jpg: { quality: 85 },
            jpeg: { quality: 85 },
            webp: { quality: 82 },
            svg: false,
            includePublic: true,
        }),
    ].filter(Boolean),
    publicDir: isSsrBuild ? false : 'public',
    // manifest: o pré-render usa para pôr <link rel="modulepreload"> do catálogo do idioma (e apaga depois).
    build: { manifest: !isSsrBuild },
}))
