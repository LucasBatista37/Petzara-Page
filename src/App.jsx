import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SiteOverlays from './components/SiteOverlays'
import LanguageSuggestion from './components/LanguageSuggestion'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import { PAGES, localeFromPath } from './i18n/config.js'
import { setSiteLanguage } from './lib/analytics'

// Páginas fora da home em chunks próprios: react-markdown/remark-gfm, os textos
// legais e os artigos do blog não pesam no carregamento da página inicial (L8).
const LEGAL_PAGES = {
    'pt-BR': lazy(() => import('./pages/legal/LegalPt')),
    es: lazy(() => import('./pages/legal/LegalEs')),
    en: lazy(() => import('./pages/legal/LegalEn')),
}
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const DownloadPage = lazy(() => import('./pages/DownloadPage'))

function PageFallback() {
    return <div className="min-h-screen bg-cream" />
}

function legal(variant, locale) {
    const Legal = LEGAL_PAGES[locale]
    return <Legal variant={variant} />
}

const ELEMENTS = {
    home: () => <HomePage />,
    download: () => <DownloadPage />,
    terms: (locale) => legal('terms', locale),
    privacy: (locale) => legal('privacy', locale),
    blog: () => <BlogPage />,
}

/** Rotas de todos os idiomas, geradas da tabela PAGES (i18n/config.js). */
const ROUTES = Object.entries(PAGES).flatMap(([page, def]) =>
    Object.entries(def.paths).map(([locale, path]) => ({ key: `${page}-${locale}`, path, element: ELEMENTS[page](locale) })),
)

/**
 * App sem o roteador: o navegador usa BrowserRouter (main.jsx) e o pré-render usa
 * StaticRouter (entry-server.jsx). O idioma sai da URL: / (pt-BR), /es/…, /en/….
 */
export default function App() {
    const location = useLocation()
    const locale = localeFromPath(location.pathname)

    useEffect(() => { setSiteLanguage(locale) }, [locale])

    return (
        <I18nProvider locale={locale}>
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    {ROUTES.map((r) => <Route key={r.key} path={r.path} element={r.element} />)}
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                </Routes>
            </Suspense>
            <SiteOverlays />
            <LanguageSuggestion />
        </I18nProvider>
    )
}
