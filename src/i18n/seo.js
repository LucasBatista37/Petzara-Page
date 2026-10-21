/**
 * <head> por página e idioma: título, descrição, canonical, hreflang, robots, Open Graph,
 * Twitter e JSON-LD. Mesma função no build (pré-render → HTML estático) e no navegador
 * (navegação interna do SPA → applyHead).
 */
import {
    SITE_ORIGIN, DEFAULT_LOCALE, LOCALE_META, LOCALES,
    absoluteUrl, alternatesFor, isIndexable, pathFor,
} from './config.js'
import { createTranslator } from './catalogs.js'
import { pricingFor } from '../config/pricingByLocale.js'

const OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`

/** Blog: só pt-BR (conteúdo editorial brasileiro, não traduzido). */
const BLOG_META = {
    title: 'Blog — Petzara',
    description: 'Guias práticos para donos de petshop: agendamento, finanças, gestão de equipe e atendimento ao cliente.',
}

function homeJsonLd(locale, t, faqs) {
    const url = absoluteUrl(pathFor('home', locale))
    const pricing = pricingFor(locale)
    const software = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Petzara',
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: pricing.schemaCurrency },
        description: t('seo.home.appDescription'),
    }
    const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Petzara', url }
    // pt-BR: JSON-LD idêntico ao que já estava publicado (sem inLanguage) — nada muda para o Brasil.
    if (locale !== DEFAULT_LOCALE) {
        software.inLanguage = LOCALE_META[locale].htmlLang
        website.inLanguage = LOCALE_META[locale].htmlLang
    }
    const organization = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Petzara',
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/favicon.svg`,
    }
    const faq = Array.isArray(faqs) && faqs.length ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    } : null
    return [software, website, organization, faq].filter(Boolean)
}

/**
 * @param {object} opts
 * @param {string} opts.page  home | download | terms | privacy | blog | blogPost
 * @param {string} opts.locale
 * @param {object} [opts.post] artigo do blog (page = blogPost)
 */
export function buildHead({ page, locale = DEFAULT_LOCALE, post } = {}) {
    const { t, tm } = createTranslator(locale)
    const meta = LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE]
    const head = {
        locale: LOCALE_META[locale] ? locale : DEFAULT_LOCALE,
        lang: meta.htmlLang,
        title: '',
        description: '',
        keywords: '',
        canonical: '',
        robots: 'index, follow',
        alternates: [],
        og: { type: 'website', locale: meta.ogLocale, alternateLocales: [], image: OG_IMAGE, imageAlt: '' },
        twitter: {},
        jsonLd: [],
    }

    if (page === 'blogPost' && post) {
        const url = absoluteUrl(`/blog/${post.slug}`)
        head.title = `${post.title} — Petzara`
        head.description = post.description
        head.canonical = url
        head.og = {
            ...head.og,
            type: 'article',
            url,
            title: `${post.title} — Blog Petzara`,
            description: post.description,
            // capa em SVG não serve de og:image (redes sociais não leem SVG) → imagem padrão
            image: post.coverImage && !/\.svg$/i.test(post.coverImage) ? absoluteUrl(post.coverImage) : OG_IMAGE,
            imageAlt: post.title,
        }
        head.twitter = { title: `${post.title} — Blog Petzara`, description: post.description, image: head.og.image }
        head.jsonLd = [{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            inLanguage: 'pt-BR',
            mainEntityOfPage: url,
            author: { '@type': 'Organization', name: 'Petzara' },
            publisher: { '@type': 'Organization', name: 'Petzara', logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/favicon.svg` } },
        }]
        return head
    }

    if (page === 'blog') {
        const url = absoluteUrl(pathFor('blog', DEFAULT_LOCALE))
        head.title = BLOG_META.title
        head.description = BLOG_META.description
        head.canonical = url
        head.og = { ...head.og, url, title: BLOG_META.title, description: BLOG_META.description, imageAlt: BLOG_META.title }
        head.twitter = { title: BLOG_META.title, description: BLOG_META.description, image: OG_IMAGE }
        return head
    }

    const key = ['home', 'download', 'terms', 'privacy'].includes(page) ? page : 'home'
    const path = pathFor(key, locale) ?? pathFor(key, DEFAULT_LOCALE)
    const url = absoluteUrl(path)
    head.title = t(`seo.${key}.title`)
    head.description = t(`seo.${key}.description`)
    head.canonical = url
    head.alternates = alternatesFor(key)
    if (!isIndexable(key, locale)) head.robots = 'noindex, follow'
    head.og.alternateLocales = head.alternates.length
        ? LOCALES.filter((l) => l !== locale && isIndexable(key, l)).map((l) => LOCALE_META[l].ogLocale)
        : []

    if (key === 'home') {
        head.keywords = t('seo.home.keywords')
        head.og = {
            ...head.og,
            url,
            title: t('seo.home.ogTitle'),
            description: t('seo.home.ogDescription'),
            imageAlt: t('seo.home.ogImageAlt'),
            imageWidth: 1376,
            imageHeight: 768,
        }
        head.twitter = { title: t('seo.home.twitterTitle'), description: t('seo.home.twitterDescription'), image: OG_IMAGE }
        head.jsonLd = homeJsonLd(locale, t, tm('faq.items'))
    } else {
        head.og = { ...head.og, url, title: head.title, description: head.description, imageAlt: head.title }
        head.twitter = { title: head.title, description: head.description, image: OG_IMAGE }
    }
    return head
}

// ─── Serialização (build) ────────────────────────────────────────────────────

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function jsonForScript(data) {
    return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Lista neutra de tags; usada para gerar HTML (build) e DOM (navegador). */
export function headTags(head) {
    const tags = []
    const meta = (attrs) => tags.push({ tag: 'meta', attrs })
    const link = (attrs) => tags.push({ tag: 'link', attrs })
    tags.push({ tag: 'title', text: head.title })
    meta({ name: 'description', content: head.description })
    if (head.keywords) meta({ name: 'keywords', content: head.keywords })
    meta({ name: 'robots', content: head.robots })
    link({ rel: 'canonical', href: head.canonical })
    for (const alt of head.alternates) link({ rel: 'alternate', hreflang: alt.hreflang, href: alt.href })
    meta({ property: 'og:type', content: head.og.type })
    meta({ property: 'og:site_name', content: 'Petzara' })
    meta({ property: 'og:locale', content: head.og.locale })
    for (const alt of head.og.alternateLocales || []) meta({ property: 'og:locale:alternate', content: alt })
    if (head.og.url) meta({ property: 'og:url', content: head.og.url })
    meta({ property: 'og:title', content: head.og.title })
    meta({ property: 'og:description', content: head.og.description })
    meta({ property: 'og:image', content: head.og.image })
    if (head.og.imageWidth) meta({ property: 'og:image:width', content: String(head.og.imageWidth) })
    if (head.og.imageHeight) meta({ property: 'og:image:height', content: String(head.og.imageHeight) })
    if (head.og.imageAlt) meta({ property: 'og:image:alt', content: head.og.imageAlt })
    meta({ name: 'twitter:card', content: 'summary_large_image' })
    meta({ name: 'twitter:title', content: head.twitter.title })
    meta({ name: 'twitter:description', content: head.twitter.description })
    meta({ name: 'twitter:image', content: head.twitter.image })
    for (const data of head.jsonLd) tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, json: data })
    return tags
}

export const HEAD_ATTR = 'data-pz-head'

export function renderHeadHtml(head) {
    return headTags(head).map(({ tag, attrs = {}, text, json }) => {
        const attrHtml = Object.entries({ ...attrs, [HEAD_ATTR]: '' })
            .map(([k, v]) => (v === '' ? ` ${k}` : ` ${k}="${esc(v)}"`))
            .join('')
        if (tag === 'title') return `<title${attrHtml}>${esc(text)}</title>`
        if (tag === 'script') return `<script${attrHtml}>${jsonForScript(json)}</script>`
        return `<${tag}${attrHtml} />`
    }).join('\n  ')
}

// ─── Navegador (navegação interna) ───────────────────────────────────────────

export function applyHead(head) {
    if (typeof document === 'undefined') return
    document.documentElement.lang = head.lang
    document.head.querySelectorAll(`[${HEAD_ATTR}]`).forEach((el) => el.remove())
    const frag = document.createDocumentFragment()
    for (const { tag, attrs = {}, text, json } of headTags(head)) {
        const el = document.createElement(tag)
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
        el.setAttribute(HEAD_ATTR, '')
        if (tag === 'title') el.textContent = text
        if (json) el.textContent = jsonForScript(json)
        frag.appendChild(el)
    }
    document.head.appendChild(frag)
}
