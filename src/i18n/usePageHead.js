import { useEffect } from 'react'
import { useI18n } from './I18nProvider.jsx'
import { buildHead, applyHead } from './seo.js'

/**
 * Atualiza o <head> nas navegações internas do SPA. No primeiro carregamento o HTML
 * pré-renderizado já traz o mesmo <head> (applyHead só o reescreve igual).
 */
export function usePageHead(page, extra) {
    const { locale } = useI18n()
    const post = extra?.post
    useEffect(() => {
        applyHead(buildHead({ page, locale, post }))
    }, [page, locale, post])
}
