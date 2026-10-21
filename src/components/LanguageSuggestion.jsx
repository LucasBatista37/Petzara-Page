import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Globe, X } from 'lucide-react'
import { LOCALE_META, matchBrowserLocale, pageFromPath, switchPath } from '../i18n/config.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { LANG_CHOICE_KEY } from './LanguageSwitcher'

const DISMISS_KEY = 'pz_lang_suggest_dismissed'

function read(key) {
    try { return window.localStorage.getItem(key) } catch { return null }
}
function write(key, value) {
    try { window.localStorage.setItem(key, value) } catch { /* armazenamento bloqueado */ }
}

/**
 * Sugestão discreta de idioma ("¿Ver esta página en español?").
 * Nunca redireciona (robôs e quem compartilhou o link veem sempre a URL pedida).
 * Só aparece no navegador, depois da hidratação, quando o idioma do navegador é outro,
 * e some para sempre ao escolher um idioma ou fechar.
 */
export default function LanguageSuggestion() {
    const location = useLocation()
    const { locale } = useI18n()
    const [target, setTarget] = useState(null)

    useEffect(() => {
        if (new URLSearchParams(location.search).get('origem') === 'app') return
        if (read(DISMISS_KEY) || read(LANG_CHOICE_KEY)) return
        const browser = matchBrowserLocale(navigator.languages?.[0] || navigator.language)
        setTarget(browser && browser !== locale ? browser : null)
    }, [locale, location.search])

    if (!target) return null

    const meta = LOCALE_META[target]
    const href = switchPath(pageFromPath(location.pathname).page, target)
    const dismiss = () => { write(DISMISS_KEY, '1'); setTarget(null) }

    return (
        <div
            role="region"
            aria-label={meta.suggest.question}
            lang={meta.htmlLang}
            data-lang-suggestion
            className="fixed z-[70] top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md bg-white/95 backdrop-blur border border-sand shadow-lg shadow-espresso/10 rounded-2xl pl-4 pr-2 py-2.5 flex items-center gap-3 text-sm"
        >
            <Globe size={16} aria-hidden="true" className="text-terracotta shrink-0" />
            <span className="text-espresso/80 flex-1 min-w-0">{meta.suggest.question}</span>
            <a
                href={href}
                hrefLang={meta.hreflang}
                onClick={() => write(LANG_CHOICE_KEY, target)}
                className="shrink-0 font-bold text-terracotta hover:text-terracotta-dark whitespace-nowrap"
            >
                {meta.suggest.action}
            </a>
            <button
                type="button"
                onClick={dismiss}
                aria-label={meta.suggest.dismiss}
                title={meta.suggest.dismiss}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:bg-cream hover:text-espresso"
            >
                <X size={16} aria-hidden="true" />
            </button>
        </div>
    )
}
