/**
 * Pré-render estático (roda depois de `vite build` e `vite build --ssr`):
 *
 * 1. lê dist/index.html (template com <!--app-head--> e <!--app-html-->);
 * 2. para cada rota de cada idioma (+ artigos do blog), renderiza o React no servidor
 *    (react-dom/static, espera os lazy/Suspense) e grava dist/<rota>/index.html com
 *    <html lang>, <title>, description, canonical, hreflang, robots, OG/Twitter e JSON-LD;
 * 3. gera dist/sitemap.xml com todos os idiomas e os alternates xhtml:link.
 *
 * Sem navegador headless: só Node (funciona offline e no build da Vercel).
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const templatePath = path.join(dist, 'index.html')
const template = await readFile(templatePath, 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('dist/index.html sem os marcadores <!--app-head--> / <!--app-html-->. Rode `npm run build` (não só o pré-render).')
}

const entry = path.join(ssrDir, 'entry-server.js')
if (!existsSync(entry)) throw new Error('dist-ssr/entry-server.js não existe. Rode `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.')
const ssr = await import(pathToFileURL(entry).href)
await ssr.ready
const { render, buildHead, renderHeadHtml, staticRoutes, blogPosts, PAGES, LOCALES, alternatesFor, isIndexable, absoluteUrl, pathFor } = ssr

// Comentário explicativo do template não vai para produção.
const baseTemplate = template.replace(/\s*<!--\s*Título, descrição[\s\S]*?-->/, '')

// Chunks dos catálogos (manifest do Vite) → <link rel="modulepreload"> no <head> de cada página,
// para o catálogo chegar junto com o JS principal (sem uma ida e volta a mais antes da hidratação).
const manifestPath = path.join(dist, '.vite', 'manifest.json')
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}
function catalogPreloads(locale) {
    const files = [...new Set([locale, 'pt-BR'])]
        .map((l) => manifest[`src/i18n/locales/${l}.json`]?.file)
        .filter(Boolean)
    return files.map((f) => `<link rel="modulepreload" href="/${f}" />`).join('\n  ')
}

function outFile(urlPath) {
    const clean = urlPath.replace(/^\/+|\/+$/g, '')
    return clean ? path.join(dist, clean, 'index.html') : path.join(dist, 'index.html')
}

/**
 * O React 19 põe <link rel="preload" as="image"> no início do HTML de cada imagem "eager"
 * (inclusive as da paleta, abaixo da dobra). Fora do <head> e sem prioridade real, isso só
 * compete com a imagem principal — que o template já pré-carrega no <head>. Tiramos.
 */
function stripHoistedPreloads(html) {
    return html.replace(/<link rel="preload" as="image"[^>]*\/>/g, '')
}

async function writePage(urlPath, head) {
    const appHtml = stripHoistedPreloads(await render(urlPath))
    const html = baseTemplate
        .replace(/<html lang="[^"]*">/, `<html lang="${head.lang}">`)
        .replace('<!--app-head-->', `${renderHeadHtml(head)}\n  ${catalogPreloads(head.locale)}`)
        .replace('<!--app-html-->', appHtml)
    const file = outFile(urlPath)
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, html, 'utf8')
    return path.relative(dist, file)
}

const written = []

for (const { page, locale, path: urlPath } of staticRoutes()) {
    written.push(await writePage(urlPath, buildHead({ page, locale })))
}
for (const post of blogPosts) {
    written.push(await writePage(`/blog/${post.slug}`, buildHead({ page: 'blogPost', locale: 'pt-BR', post })))
}

// ─── sitemap.xml ─────────────────────────────────────────────────────────────
const latestPost = blogPosts.map((p) => p.updatedAt || p.publishedAt).sort().at(-1)
const urls = []
for (const [page, def] of Object.entries(PAGES)) {
    const alternates = alternatesFor(page)
    for (const locale of LOCALES) {
        if (!isIndexable(page, locale)) continue
        urls.push({
            loc: absoluteUrl(pathFor(page, locale)),
            lastmod: page === 'blog' ? latestPost : def.lastmod,
            changefreq: def.changefreq,
            priority: def.priority?.[locale] ?? '0.5',
            alternates,
        })
    }
}
for (const post of blogPosts) {
    urls.push({ loc: absoluteUrl(`/blog/${post.slug}`), lastmod: post.updatedAt || post.publishedAt, changefreq: 'monthly', priority: '0.7', alternates: [] })
}

const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls.map((u) => [
        '  <url>',
        `    <loc>${u.loc}</loc>`,
        ...u.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
        `    <lastmod>${u.lastmod}</lastmod>`,
        `    <changefreq>${u.changefreq}</changefreq>`,
        `    <priority>${u.priority}</priority>`,
        '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
].join('\n')
await writeFile(path.join(dist, 'sitemap.xml'), xml, 'utf8')

await rm(ssrDir, { recursive: true, force: true })
await rm(path.join(dist, '.vite'), { recursive: true, force: true })

console.log(`pré-render: ${written.length} páginas`)
for (const f of written) console.log(`  dist/${f}`)
console.log(`sitemap: ${urls.length} URLs → dist/sitemap.xml`)
