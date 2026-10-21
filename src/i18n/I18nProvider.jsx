import { createContext, useContext, useMemo } from 'react'
import { createTranslator } from './catalogs.js'
import { DEFAULT_LOCALE, LOCALE_META, pathFor } from './config.js'

const I18nContext = createContext(null)

/** Idioma vem da URL (ver AppRoutes); o provider só expõe t/tm e helpers de caminho. */
export function I18nProvider({ locale = DEFAULT_LOCALE, children }) {
    const value = useMemo(() => {
        const { t, tm } = createTranslator(locale)
        return {
            locale,
            meta: LOCALE_META[locale],
            t,
            tm,
            /** Caminho de uma página no idioma atual (fallback: a página em pt-BR). */
            path: (page) => pathFor(page, locale) ?? pathFor(page, DEFAULT_LOCALE),
        }
    }, [locale])
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
    const ctx = useContext(I18nContext)
    if (!ctx) throw new Error('useI18n precisa de <I18nProvider>')
    return ctx
}

/**
 * Título com destaque: "antes <span>destaque</span> depois" — a ordem das partes pode mudar
 * por idioma (qualquer parte pode ser vazia).
 */
export function Highlighted({ parts, className = 'gradient-text', as: Tag = 'span' }) {
    const { before = '', highlight = '', after = '' } = parts || {}
    return (
        <>
            {before}
            {before && highlight ? ' ' : null}
            {highlight ? <Tag className={className}>{highlight}</Tag> : null}
            {after ? ` ${after}` : null}
        </>
    )
}
