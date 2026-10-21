/**
 * Entrada do pré-render (build). Gera o HTML de cada rota com o texto do idioma, para que
 * robôs e a primeira pintura recebam a página pronta. Usado só por scripts/prerender.mjs.
 */
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { loadCatalog } from './i18n/catalogs.js'
import { LOCALES } from './i18n/config.js'

// Todos os catálogos na memória antes de renderizar (o navegador carrega só o da página).
const catalogsReady = Promise.all(LOCALES.map((locale) => loadCatalog(locale)))
/** O pré-render espera isto antes de montar <head> e HTML. */
export const ready = catalogsReady

export { buildHead, renderHeadHtml } from './i18n/seo.js'
export { PAGES, LOCALES, LOCALE_META, staticRoutes, alternatesFor, isIndexable, absoluteUrl, pathFor } from './i18n/config.js'
export { blogPosts } from './data/blogPosts.js'

async function renderOnce(url) {
    const { prelude } = await prerenderToNodeStream(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>,
        { onError: (err) => { throw err }, progressiveChunkSize: Number.MAX_SAFE_INTEGER },
    )
    const chunks = []
    for await (const chunk of prelude) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    return Buffer.concat(chunks).toString('utf8')
}

/**
 * HTML completo da rota. A 1ª passada carrega os componentes lazy (seções da home, páginas);
 * na 2ª eles já estão resolvidos e o React escreve tudo no lugar, sem fallbacks + scripts de
 * troca ($RC) — HTML limpo para robôs e para a hidratação.
 */
export async function render(url) {
    await catalogsReady
    let html = await renderOnce(url)
    if (html.includes('<template id="B:')) html = await renderOnce(url)
    if (html.includes('<template id="B:')) throw new Error(`pré-render de ${url} ainda com Suspense pendente`)
    return html
}
