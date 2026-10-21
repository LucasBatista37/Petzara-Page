import { useLocation } from 'react-router-dom'
import { Globe, ChevronDown } from 'lucide-react'
import { LOCALES, LOCALE_META, pageFromPath, switchPath } from '../i18n/config.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useHydrated } from '../lib/useHydrated'

export const LANG_CHOICE_KEY = 'pz_lang_choice'

function rememberChoice(locale) {
    try { window.localStorage.setItem(LANG_CHOICE_KEY, locale) } catch { /* armazenamento bloqueado */ }
}

/**
 * Links para a MESMA página nos outros idiomas (não só troca o texto): cada idioma tem URL
 * própria e HTML próprio. Página sem versão no idioma (blog) → página inicial do idioma.
 * Mantém ?origem=app nas páginas legais abertas pelo app.
 */
export function useLanguageLinks() {
    const location = useLocation()
    const { locale } = useI18n()
    const hydrated = useHydrated()
    const { page } = pageFromPath(location.pathname)
    const fromApp = hydrated && new URLSearchParams(location.search).get('origem') === 'app'
    return LOCALES.map((target) => {
        const meta = LOCALE_META[target]
        const path = switchPath(page, target)
        return {
            locale: target,
            href: fromApp && (page === 'terms' || page === 'privacy') ? `${path}?origem=app` : path,
            label: meta.label,
            short: meta.short,
            hreflang: meta.hreflang,
            lang: meta.htmlLang,
            active: target === locale,
        }
    })
}

/** variant: 'dropdown' (barra do topo, desktop) | 'list' (menu do celular) | 'inline' (rodapés) */
export default function LanguageSwitcher({ variant = 'inline', tone = 'dark', className = '' }) {
    const { t, meta } = useI18n()
    const links = useLanguageLinks()

    const anchor = (l, cls) => (
        <a
            key={l.locale}
            href={l.href}
            hrefLang={l.hreflang}
            lang={l.lang}
            aria-current={l.active ? 'true' : undefined}
            aria-label={l.active ? undefined : t('language.switchTo', { language: l.label })}
            onClick={() => rememberChoice(l.locale)}
            className={cls(l)}
        >
            {l.label}
        </a>
    )

    if (variant === 'dropdown') {
        return (
            <details className={`relative group/lang ${className}`}>
                <summary
                    className="list-none [&::-webkit-details-marker]:hidden cursor-pointer select-none inline-flex items-center gap-1.5 text-taupe hover:text-espresso font-medium text-sm transition-colors rounded-lg px-2 py-1.5"
                    aria-label={t('language.label')}
                >
                    <Globe size={16} aria-hidden="true" />
                    <span>{meta.short}</span>
                    <ChevronDown size={14} aria-hidden="true" className="transition-transform group-open/lang:rotate-180" />
                </summary>
                <div className="absolute right-0 mt-2 min-w-[150px] bg-white border border-sand rounded-xl shadow-lg shadow-espresso/10 p-1.5 z-50 flex flex-col">
                    {links.map((l) => anchor(l, (x) => `px-3 py-2 rounded-lg text-sm transition-colors ${x.active ? 'bg-terracotta/10 text-terracotta font-bold' : 'text-espresso hover:bg-cream'}`))}
                </div>
            </details>
        )
    }

    if (variant === 'list') {
        return (
            <div className={className}>
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-taupe flex items-center gap-1.5">
                    <Globe size={13} aria-hidden="true" /> {t('language.label')}
                </p>
                <div className="flex flex-wrap gap-2 px-4">
                    {links.map((l) => anchor(l, (x) => `px-3 py-2 rounded-xl text-sm border transition-colors ${x.active ? 'border-terracotta bg-terracotta/10 text-terracotta font-bold' : 'border-sand text-espresso hover:border-terracotta/40'}`))}
                </div>
            </div>
        )
    }

    const base = tone === 'light'
        ? (x) => `transition-colors ${x.active ? 'text-white font-semibold' : 'hover:text-terracotta'}`
        : (x) => `transition-colors ${x.active ? 'text-espresso font-semibold' : 'hover:text-terracotta'}`
    return (
        <nav aria-label={t('language.label')} className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
            <Globe size={14} aria-hidden="true" className="shrink-0" />
            {links.map((l) => anchor(l, base))}
        </nav>
    )
}
