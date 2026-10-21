/**
 * Links de conversão por idioma (cadastro, login, Play, WhatsApp), com a UTM da visita.
 *
 * - pt-BR: exatamente como antes (sem ?lang, sem &hl).
 * - es/en: cadastro e login com ?lang=es|en (o sistema web pode usar para abrir no idioma;
 *   se ainda não ler, o parâmetro é inofensivo) e Play com &hl=es|en.
 *
 * Use o hook useLinks() nos componentes: na hidratação ele devolve os links sem UTM (iguais ao
 * HTML pré-renderizado) e, logo depois, com a UTM guardada.
 */
import { useMemo } from 'react'
import { APP_ORIGIN, PLAY_STORE_BASE_URL } from '../siteConfig'
import { resolveUtm, withParams, playUrlWithReferrer } from './attribution'
import { LOCALE_META, DEFAULT_LOCALE } from '../i18n/config.js'
import { createTranslator } from '../i18n/catalogs.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useHydrated } from './useHydrated'

export const WHATSAPP_NUMBER = '5513996830085'

let cachedUtm = null
function visitUtm() {
    if (typeof window === 'undefined') return {}
    if (!cachedUtm) cachedUtm = resolveUtm()
    return cachedUtm
}

export function buildLinks(locale = DEFAULT_LOCALE, utm = {}) {
    const meta = LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE]
    const { t } = createTranslator(locale)
    const lang = meta.appLang ? { lang: meta.appLang } : {}
    const register = withParams(`${APP_ORIGIN}/register`, { ...utm, ...lang })
    let play = playUrlWithReferrer(PLAY_STORE_BASE_URL, utm)
    if (meta.playHl) play = withParams(play, { hl: meta.playHl })
    const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    return {
        register,
        registerMonthly: withParams(register, { plan: 'monthly' }),
        registerAnnual: withParams(register, { plan: 'annual' }),
        login: meta.appLang ? withParams(`${APP_ORIGIN}/login`, lang) : `${APP_ORIGIN}/login`,
        play,
        playBadge: meta.playBadge,
        whatsappSupport: `https://wa.me/${WHATSAPP_NUMBER}`,
        whatsappDemo: wa(t('whatsapp.demoMessage')),
        whatsappFloating: wa(t('whatsapp.floatingMessage')),
    }
}

export function useLinks() {
    const { locale } = useI18n()
    const hydrated = useHydrated()
    return useMemo(() => buildLinks(locale, hydrated ? visitUtm() : {}), [locale, hydrated])
}
