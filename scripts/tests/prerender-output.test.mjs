/**
 * HTML pré-renderizado em dist/ (rode `npm run build` antes).
 * node --test scripts/tests/prerender-output.test.mjs
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { staticRoutes, alternatesFor, isIndexable, absoluteUrl, LOCALE_META, PAGES, LOCALES, pathFor } from '../../src/i18n/config.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const dist = path.join(root, 'dist')
const blogSlugs = [...readFileSync(path.join(root, 'src/data/blogPosts.js'), 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

if (!existsSync(path.join(dist, 'es', 'index.html'))) {
    throw new Error('dist/ sem o pré-render. Rode `npm run build` antes deste teste.')
}

const fileFor = (urlPath) => {
    const clean = urlPath.replace(/^\/+|\/+$/g, '')
    return path.join(dist, clean, 'index.html')
}
const read = (urlPath) => readFileSync(fileFor(urlPath), 'utf8')
const headOf = (html) => html.slice(html.indexOf('<head>'), html.indexOf('</head>'))
const attr = (html, re) => html.match(re)?.[1]
/** Texto visível (sem tags, atributos e separadores <!-- --> do React). */
const visibleText = (html) => html
    .slice(html.indexOf('<body>'))
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
const decode = (s) => s?.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const catalogs = Object.fromEntries(LOCALES.map((l) => [l, JSON.parse(readFileSync(path.join(root, 'src/i18n/locales', `${l}.json`), 'utf8'))]))

const routes = [
    ...staticRoutes(),
    ...blogSlugs.map((slug) => ({ page: 'blogPost', locale: 'pt-BR', path: `/blog/${slug}` })),
]

test('cada rota tem HTML próprio com lang, title, canonical, robots e og:locale corretos', () => {
    for (const r of routes) {
        assert.ok(existsSync(fileFor(r.path)), `falta ${fileFor(r.path)}`)
        const html = read(r.path)
        const head = headOf(html)
        const meta = LOCALE_META[r.locale]
        assert.equal(attr(html, /<html lang="([^"]+)"/), meta.htmlLang, `${r.path}: <html lang>`)
        assert.equal((head.match(/<title/g) || []).length, 1, `${r.path}: um <title>`)
        const title = decode(attr(head, /<title[^>]*>([^<]+)<\/title>/))
        assert.ok(title && title.includes('Petzara'), `${r.path}: title`)
        if (PAGES[r.page]) assert.equal(title, catalogs[r.locale].seo[r.page]?.title ?? title, `${r.path}: title do catálogo`)
        const canonical = attr(head, /<link rel="canonical" href="([^"]+)"/)
        assert.equal(canonical, absoluteUrl(r.path), `${r.path}: canonical`)
        assert.equal(attr(head, /<meta property="og:locale" content="([^"]+)"/), meta.ogLocale, `${r.path}: og:locale`)
        assert.ok(attr(head, /<meta name="description" content="([^"]+)"/), `${r.path}: description`)
        assert.ok(attr(head, /<meta property="og:title" content="([^"]+)"/), `${r.path}: og:title`)
        assert.ok(attr(head, /<meta name="twitter:title" content="([^"]+)"/), `${r.path}: twitter:title`)
        const robots = attr(head, /<meta name="robots" content="([^"]+)"/)
        const indexable = r.page === 'blogPost' || isIndexable(r.page, r.locale)
        assert.equal(robots, indexable ? 'index, follow' : 'noindex, follow', `${r.path}: robots`)
        for (const m of head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
            assert.doesNotThrow(() => JSON.parse(m[1]), `${r.path}: JSON-LD inválido`)
        }
        assert.ok(html.includes('<div id="root"><'), `${r.path}: conteúdo pré-renderizado no #root`)
        assert.doesNotMatch(html, /<!--app-(head|html)-->/, `${r.path}: marcador sobrando`)
    }
})

test('hreflang recíproco entre pt-BR, es e en (+ x-default = /en/)', () => {
    for (const r of routes) {
        const head = headOf(read(r.path))
        const found = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({ hreflang: m[1], href: m[2] }))
        const expected = PAGES[r.page] && isIndexable(r.page, r.locale) ? alternatesFor(r.page) : []
        assert.deepEqual(found, expected, `${r.path}: alternates`)
        // Reciprocidade: cada alternate aponta para uma página que lista o mesmo conjunto.
        for (const alt of found.filter((a) => a.hreflang !== 'x-default')) {
            const other = headOf(read(new URL(alt.href).pathname))
            for (const a of found) assert.ok(other.includes(`hreflang="${a.hreflang}" href="${a.href}"`), `${alt.href} não lista ${a.hreflang}`)
        }
    }
    const home = headOf(read('/'))
    assert.ok(home.includes('<link rel="alternate" hreflang="x-default" href="https://petzara.app/en/"'))
})

test('pt-BR: metas da home iguais às publicadas antes (sem regressão de SEO no Brasil)', () => {
    const head = headOf(read('/'))
    assert.match(head, /<title[^>]*>Petzara — Sistema de Gestão para Petshops \| Agendamento Online<\/title>/)
    assert.ok(head.includes('content="Petzara: gerencie agendamentos, clientes, pets e finanças em um único lugar — feito para petshops de banho e tosa. Teste grátis, sem cartão."'))
    assert.ok(head.includes('<link rel="canonical" href="https://petzara.app/"'))
    assert.ok(head.includes('<meta property="og:title" content="Petzara — Seu petshop organizado. Seus clientes felizes."'))
    assert.ok(head.includes('<meta name="twitter:title" content="Petzara — Seu petshop organizado."'))
    assert.ok(head.includes('"priceCurrency":"BRL"'))
    assert.ok(head.includes('google-site-verification'))
    assert.match(read('/').replace(/<!-- -->/g, ''), /<h1[^>]*>Agenda de banho e tosa <span class="gradient-text">sem horário duplicado<\/span> — e sem caderno<\/h1>/)
})

test('conteúdo traduzido no HTML: hero, preços sem R$ e FAQ em es/en', () => {
    const es = read('/es/')
    const en = read('/en/')
    assert.ok(es.includes(catalogs.es.hero.title.highlight) && es.includes(catalogs.es.faq.items[0].question))
    assert.ok(en.includes(catalogs.en.hero.title.highlight) && en.includes(catalogs.en.faq.items[0].question))
    for (const [name, html] of [['es', es], ['en', en]]) {
        const body = html.slice(html.indexOf('<body>'))
        // A barra de endereço simulada mostra a rota real do sistema (app.petzara.app/agendamentos) — fica.
        const text = visibleText(html).replace(/app\.petzara\.app\/\S*/g, '')
        assert.doesNotMatch(text, /R\$|49,90|Começar teste grátis|agendamento|você/i, `${name}: texto/preço do Brasil na página`)
        assert.ok(body.includes(catalogs[name].pricing.noPrice), `${name}: "preço na sua moeda na Google Play"`)
        assert.ok(body.includes(LOCALE_META[name].playBadge), `${name}: selo da Play no idioma`)
        assert.doesNotMatch(body, /href="\/blog/, `${name}: não lista o blog em pt`)
    }
    const pt = read('/')
    assert.ok(pt.includes('49,90') && pt.includes('499,00') && pt.includes('Equivale a R$'), 'pt: preços atuais')
    assert.ok(pt.includes('href="/blog"'), 'pt: blog no rodapé')
    // FAQ no HTML (o FAQPage do JSON-LD precisa estar visível na página).
    assert.ok(pt.includes(catalogs['pt-BR'].faq.items.at(-1).question))
})

test('CTAs: cadastro com ?lang=es|en e Play com &hl=es|en; pt-BR sem parâmetros novos', () => {
    const es = read('/es/')
    const en = read('/en/')
    const pt = read('/')
    assert.ok(es.includes('https://app.petzara.app/register?lang=es'))
    assert.ok(es.includes('register?lang=es&amp;plan=monthly') && es.includes('register?lang=es&amp;plan=annual'))
    assert.ok(/play\.google\.com\/store\/apps\/details\?id=app\.petzara\.twa&amp;referrer=[^"]*&amp;hl=es"/.test(es))
    assert.ok(en.includes('https://app.petzara.app/register?lang=en'))
    assert.ok(/details\?id=app\.petzara\.twa&amp;referrer=[^"]*&amp;hl=en"/.test(en))
    assert.ok(pt.includes('href="https://app.petzara.app/register"'))
    assert.ok(pt.includes('https://app.petzara.app/register?plan=monthly'))
    assert.doesNotMatch(pt, /[?&](amp;)?lang=|[?&](amp;)?hl=/, 'pt: sem lang/hl')
    assert.ok(pt.includes('wa.me/5513996830085?text=Ol%C3%A1!%20Vi%20o%20site%20do%20Petzara%20e%20gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o.'))
})

test('legais em es/en: aviso de tradução de referência + noindex', () => {
    for (const [p, notice] of [
        ['/es/terminos-de-uso', catalogs.es.legal.notice],
        ['/es/politica-de-privacidad', catalogs.es.legal.notice],
        ['/en/terms-of-use', catalogs.en.legal.notice],
        ['/en/privacy-policy', catalogs.en.legal.notice],
    ]) {
        const html = read(p)
        assert.ok(html.includes(notice), `${p}: aviso`)
        assert.ok(headOf(html).includes('<meta name="robots" content="noindex, follow"'), `${p}: noindex`)
    }
    assert.ok(read('/es/terminos-de-uso').includes('href="/es/politica-de-privacidad"'), 'links internos no idioma')
    assert.ok(read('/en/privacy-policy').includes('href="/en/terms-of-use"'))
    assert.doesNotMatch(read('/termos-de-uso'), /Tradução de referência/)
})

test('sitemap.xml: todos os idiomas indexáveis com xhtml:link, sem legais traduzidos', () => {
    const xml = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
    assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'))
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    assert.equal(new Set(locs).size, locs.length, 'sem URLs repetidas')
    const expected = [
        ...Object.keys(PAGES).flatMap((page) => LOCALES.filter((l) => isIndexable(page, l)).map((l) => absoluteUrl(pathFor(page, l)))),
        ...blogSlugs.map((s) => absoluteUrl(`/blog/${s}`)),
    ]
    assert.deepEqual([...locs].sort(), [...expected].sort())
    for (const bad of ['/es/terminos-de-uso', '/en/terms-of-use', '/es/politica-de-privacidad', '/en/privacy-policy']) {
        assert.ok(!xml.includes(bad), `sitemap não deve ter ${bad}`)
    }
    const homeEntry = xml.split('<url>').find((u) => u.includes('<loc>https://petzara.app/es/</loc>'))
    for (const h of ['pt-BR', 'es', 'en', 'x-default']) assert.ok(homeEntry.includes(`hreflang="${h}"`), `home es: xhtml:link ${h}`)
    // URLs antigas do Brasil continuam no sitemap.
    for (const old of ['/', '/blog', '/termos-de-uso', '/politica-de-privacidade']) assert.ok(locs.includes(absoluteUrl(old)), old)
})

test('robots.txt aponta para o sitemap', () => {
    const robots = readFileSync(path.join(dist, 'robots.txt'), 'utf8')
    assert.match(robots, /Sitemap: https:\/\/petzara\.app\/sitemap\.xml/)
})

/** Simula as rewrites da Vercel (arquivo existente vence; depois a 1ª regra que casar). */
function resolveVercel(urlPath) {
    const direct = path.join(dist, urlPath)
    if (existsSync(direct) && statSync(direct).isFile()) return direct
    const { rewrites } = JSON.parse(readFileSync(path.join(root, 'vercel.json'), 'utf8'))
    for (const { source, destination } of rewrites) {
        const names = []
        const re = new RegExp('^' + source
            .replace(/:(\w+)\(([^)]+)\)/g, (m, name, rx) => { names.push(name); return `(${rx})` })
            .replace(/\((\.\*)\)/g, '(.*)') + '$')
        const m = urlPath.match(re)
        if (!m) continue
        let dest = destination
        names.forEach((name, i) => { dest = dest.replace(`:${name}`, m[i + 1]) })
        return path.join(dist, dest)
    }
    return null
}

test('vercel.json: cada URL (com e sem barra final) entrega o HTML do idioma certo', () => {
    const urls = routes.map((r) => r.path).concat(['/es', '/en'])
    for (const u of urls) {
        const file = resolveVercel(u)
        assert.ok(file && existsSync(file), `${u} → ${file}`)
        const expected = fileFor(u === '/es' ? '/es/' : u === '/en' ? '/en/' : u)
        assert.equal(path.normalize(file), path.normalize(expected), `${u} → ${file}`)
    }
    assert.equal(resolveVercel('/es/qualquer-coisa'), path.join(dist, 'es/index.html'))
    assert.equal(resolveVercel('/qualquer-coisa'), path.join(dist, 'index.html'))
})
