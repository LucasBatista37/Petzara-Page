/**
 * Idiomas e rotas do site (fonte única para o app, o pré-render, o sitemap e os testes).
 *
 * - pt-BR continua na raiz: nenhuma URL existente muda.
 * - es em /es/, en em /en/, com slugs traduzidos nas páginas principais.
 * - O blog existe só em pt-BR (não é traduzido; es/en não o listam).
 * - Termos e privacidade em es/en são traduções de referência: noindex, fora do sitemap e
 *   fora do hreflang até a revisão jurídica (`indexable: false`).
 *
 * Para acrescentar um idioma: uma entrada em LOCALE_META, um catálogo em ./locales e o caminho
 * de cada página em PAGES. Ver LANDING-SEO.md.
 */

export const SITE_ORIGIN = 'https://petzara.app'
export const DEFAULT_LOCALE = 'pt-BR'
export const LOCALES = ['pt-BR', 'es', 'en']

/** x-default = inglês: quem não fala pt nem es entende melhor inglês (contrato §1: outro idioma → en). */
export const X_DEFAULT_LOCALE = 'en'

export const LOCALE_META = {
    'pt-BR': {
        htmlLang: 'pt-BR',
        hreflang: 'pt-BR',
        ogLocale: 'pt_BR',
        intl: 'pt-BR',
        prefix: '',
        label: 'Português',
        short: 'PT',
        /** parâmetro ?lang= para o cadastro / &hl= para a Play (null = não manda nada; pt continua idêntico) */
        appLang: null,
        playHl: null,
        playBadge: 'https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png',
        suggest: { question: 'Ver esta página em português?', action: 'Ver em português', dismiss: 'Agora não' },
    },
    es: {
        htmlLang: 'es',
        hreflang: 'es',
        ogLocale: 'es_LA',
        intl: 'es-419',
        prefix: '/es',
        label: 'Español',
        short: 'ES',
        appLang: 'es',
        playHl: 'es',
        playBadge: 'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png',
        suggest: { question: '¿Ver esta página en español?', action: 'Ver en español', dismiss: 'No, gracias' },
    },
    en: {
        htmlLang: 'en',
        hreflang: 'en',
        ogLocale: 'en_US',
        intl: 'en-US',
        prefix: '/en',
        label: 'English',
        short: 'EN',
        appLang: 'en',
        playHl: 'en',
        playBadge: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
        suggest: { question: 'View this page in English?', action: 'View in English', dismiss: 'No thanks' },
    },
}

/**
 * Páginas por idioma. `indexable[locale] === false` → noindex, fora do sitemap e do hreflang.
 * `lastmod` alimenta o sitemap (atualize quando o conteúdo mudar de verdade).
 */
export const PAGES = {
    home: {
        paths: { 'pt-BR': '/', es: '/es/', en: '/en/' },
        lastmod: '2026-10-21',
        changefreq: 'weekly',
        priority: { 'pt-BR': '1.0', es: '0.9', en: '0.9' },
    },
    download: {
        paths: { 'pt-BR': '/download', es: '/es/descargar', en: '/en/download' },
        lastmod: '2026-10-21',
        changefreq: 'monthly',
        priority: { 'pt-BR': '0.5', es: '0.4', en: '0.4' },
    },
    terms: {
        paths: { 'pt-BR': '/termos-de-uso', es: '/es/terminos-de-uso', en: '/en/terms-of-use' },
        indexable: { es: false, en: false },
        lastmod: '2026-10-16',
        changefreq: 'monthly',
        priority: { 'pt-BR': '0.6' },
    },
    privacy: {
        paths: { 'pt-BR': '/politica-de-privacidade', es: '/es/politica-de-privacidad', en: '/en/privacy-policy' },
        indexable: { es: false, en: false },
        lastmod: '2026-10-16',
        changefreq: 'monthly',
        priority: { 'pt-BR': '0.6' },
    },
    blog: {
        paths: { 'pt-BR': '/blog' },
        lastmod: '2026-07-01',
        changefreq: 'weekly',
        priority: { 'pt-BR': '0.8' },
    },
}

export const BLOG_POST_PREFIX = '/blog/'

export function isLocale(value) {
    return LOCALES.includes(value)
}

/** Caminho da página no idioma (null se a página não existe nesse idioma). */
export function pathFor(page, locale) {
    return PAGES[page]?.paths?.[locale] ?? null
}

export function absoluteUrl(path) {
    return `${SITE_ORIGIN}${path}`
}

export function isIndexable(page, locale) {
    if (!pathFor(page, locale)) return false
    return PAGES[page].indexable?.[locale] !== false
}

/** Idioma pelo caminho da URL: /es… → es, /en… → en, o resto → pt-BR. */
export function localeFromPath(pathname = '/') {
    for (const locale of LOCALES) {
        const { prefix } = LOCALE_META[locale]
        if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) return locale
    }
    return DEFAULT_LOCALE
}

function normalize(pathname) {
    if (!pathname) return '/'
    const clean = pathname.split(/[?#]/)[0]
    return clean.length > 1 ? clean.replace(/\/+$/, '') || '/' : clean
}

/** Qual página é esta URL? → { page, locale } (page = 'blogPost' para artigos; null se desconhecida). */
export function pageFromPath(pathname = '/') {
    const target = normalize(pathname)
    for (const [page, def] of Object.entries(PAGES)) {
        for (const [locale, path] of Object.entries(def.paths)) {
            if (normalize(path) === target) return { page, locale }
        }
    }
    if (target.startsWith(BLOG_POST_PREFIX)) return { page: 'blogPost', locale: DEFAULT_LOCALE }
    return { page: null, locale: localeFromPath(target) }
}

/**
 * Alternates hreflang de uma página: só idiomas indexáveis, e só quando há 2 ou mais
 * (página só em um idioma não leva hreflang). Inclui x-default quando o idioma x-default existe.
 */
export function alternatesFor(page) {
    if (!PAGES[page]) return []
    const list = LOCALES
        .filter((locale) => isIndexable(page, locale))
        .map((locale) => ({ hreflang: LOCALE_META[locale].hreflang, href: absoluteUrl(pathFor(page, locale)) }))
    if (list.length < 2) return []
    const xDefault = isIndexable(page, X_DEFAULT_LOCALE) ? X_DEFAULT_LOCALE : DEFAULT_LOCALE
    list.push({ hreflang: 'x-default', href: absoluteUrl(pathFor(page, xDefault)) })
    return list
}

/**
 * Link do seletor de idioma: a página equivalente no outro idioma; se ela não existir
 * (ex.: blog), a página inicial desse idioma.
 */
export function switchPath(currentPage, targetLocale) {
    return (currentPage && pathFor(currentPage, targetLocale)) || pathFor('home', targetLocale)
}

/**
 * Idioma do navegador → idioma do site (contrato §1): pt* → pt-BR, es* → es, en* → en, outro → en.
 */
export function matchBrowserLocale(language) {
    const tag = String(language || '').toLowerCase()
    if (!tag) return null
    if (tag.startsWith('pt')) return 'pt-BR'
    if (tag.startsWith('es')) return 'es'
    return 'en'
}

/** Todas as rotas pré-renderizadas (sem os artigos do blog, que vêm de data/blogPosts.js). */
export function staticRoutes() {
    const routes = []
    for (const [page, def] of Object.entries(PAGES)) {
        for (const [locale, path] of Object.entries(def.paths)) {
            routes.push({ page, locale, path })
        }
    }
    return routes
}
