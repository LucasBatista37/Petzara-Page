/**
 * Catálogos de texto por idioma (JSON simples, sem biblioteca).
 *
 * Cada catálogo é um chunk próprio, baixado antes da hidratação (main.jsx): a página já chega
 * pronta no HTML pré-renderizado, então o texto não precisa estar no bundle principal.
 * Em es/en o catálogo pt-BR também é carregado (em paralelo) para o fallback de chave ausente
 * (contrato §1: pt-BR → texto, nunca a chave técnica; o teste de catálogos impede que falte).
 */
import { DEFAULT_LOCALE } from './config.js'

const loaded = {}

const loaders = {
    'pt-BR': () => import('./locales/pt-BR.json'),
    es: () => import('./locales/es.json'),
    en: () => import('./locales/en.json'),
}

export function registerCatalog(locale, catalog) {
    loaded[locale] = catalog
}

export function getCatalog(locale) {
    return loaded[locale] || null
}

async function loadOne(locale) {
    if (loaded[locale]) return loaded[locale]
    const loader = loaders[locale] || loaders[DEFAULT_LOCALE]
    const mod = await loader()
    loaded[locale] = mod.default || mod
    return loaded[locale]
}

/** Carrega o catálogo do idioma (e o pt-BR, usado como fallback). */
export async function loadCatalog(locale) {
    const [catalog] = await Promise.all([loadOne(locale), loadOne(DEFAULT_LOCALE)])
    return catalog
}

function lookup(catalog, key) {
    if (!catalog) return undefined
    let node = catalog
    for (const part of key.split('.')) {
        if (node == null || typeof node !== 'object') return undefined
        node = node[part]
    }
    return node
}

export function interpolate(text, params) {
    if (!params || typeof text !== 'string') return text
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match))
}

/** Funções de tradução para um idioma. Chave ausente → texto em pt-BR; nunca a chave. */
export function createTranslator(locale) {
    const catalog = loaded[locale] || loaded[DEFAULT_LOCALE]
    const fallback = loaded[DEFAULT_LOCALE]
    const raw = (key) => {
        const value = lookup(catalog, key)
        return value === undefined ? lookup(fallback, key) : value
    }
    const t = (key, params) => {
        const value = raw(key)
        if (typeof value === 'string') return interpolate(value, params)
        if (value === undefined || value === null) return ''
        return String(value)
    }
    /** Valor cru (lista/objeto) — para listas de FAQ, cards etc. */
    const tm = (key) => raw(key)
    return { t, tm }
}
