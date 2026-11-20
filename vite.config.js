import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

/**
 * <link rel="preload"> das duas fontes latinas (título e texto). Sem isso a fonte chega depois do 1º quadro,
 * o título troca de fonte, quebra em outra linha e empurra a página (salto de layout).
 */
function preloadLatinFonts() {
    return {
        name: 'petzara-preload-fonts',
        transformIndexHtml: {
            order: 'post',
            handler(html, ctx) {
                const files = Object.keys(ctx.bundle || {}).filter((f) => /(outfit|plus-jakarta-sans)-latin-wght-normal-.*\.woff2$/.test(f))
                return files.map((f) => ({
                    tag: 'link',
                    attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${f}`, crossorigin: '' },
                    injectTo: 'head-prepend',
                }))
            },
        },
    }
}

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [
        react(),
        tailwindcss(),
        !isSsrBuild && preloadLatinFonts(),
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
