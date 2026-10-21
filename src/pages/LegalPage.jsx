import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Info } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { usePageHead } from '../i18n/usePageHead'
import { useHydrated } from '../lib/useHydrated'
import LanguageSwitcher from '../components/LanguageSwitcher'

/**
 * Termos e privacidade. O texto vem dos Markdown em docs/ (pt-BR, original e válido) e
 * docs/legal/{es,en}/ (traduções de referência, noindex até a revisão jurídica). Cada idioma
 * tem um wrapper em pages/legal/ que passa `docs`, para o chunk de um idioma não levar os outros.
 *
 * docs = { terms: string, privacy: string, files: { 'ARQUIVO.md': 'terms' | 'privacy' } }
 */
function prepare(raw, files, path) {
    // Links entre os documentos (./ARQUIVO.md) → rota da página no idioma.
    return raw.replace(/\]\(\.\/([A-Z_]+\.md)\)/g, (match, file) => (files[file] ? `](${path(files[file])})` : match))
}

function MarkdownLink({ href, children }) {
    const isMail = href?.startsWith('mailto:')
    if (href?.startsWith('/')) {
        return (
            <Link
                to={href}
                className="text-terracotta font-medium underline underline-offset-2 hover:text-terracotta-dark"
            >
                {children}
            </Link>
        )
    }
    return (
        <a
            href={href}
            className="text-terracotta font-medium underline underline-offset-2 hover:text-terracotta-dark"
            {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
            {children}
        </a>
    )
}

const mdComponents = {
    h1: ({ children }) => (
        <h1 className="font-accent text-3xl sm:text-4xl font-extrabold text-espresso mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-accent text-xl sm:text-2xl font-bold text-espresso mt-10 mb-4 scroll-mt-24 first:mt-0">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-accent text-lg font-bold text-espresso mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="font-accent text-base font-bold text-espresso mt-4 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
        <p className="text-taupe leading-relaxed mb-4 text-[15px] sm:text-base">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 space-y-2 text-taupe text-[15px] sm:text-base">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-taupe text-[15px] sm:text-base">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-espresso">{children}</strong>,
    hr: () => <hr className="my-8 border-sand" />,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-terracotta/40 pl-4 my-4 text-taupe italic">{children}</blockquote>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto my-6 rounded-xl border border-sand bg-white/60">
            <table className="min-w-full text-left text-sm text-taupe">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-cream-warm text-espresso font-accent font-semibold">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-sand/80 last:border-0">{children}</tr>,
    th: ({ children }) => (
        <th className="px-4 py-3 font-semibold text-espresso">{children}</th>
    ),
    td: ({ children }) => <td className="px-4 py-3 align-top">{children}</td>,
    a: MarkdownLink,
}

const LOGO = (
    <>
        <svg
            width="32"
            height="32"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:scale-105 transition-transform"
        >
            <path
                d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z"
                fill="#E07A5F"
            />
            <circle cx="160" cy="220" r="45" fill="#81B29A" />
            <circle cx="256" cy="170" r="50" fill="#E07A5F" />
            <circle cx="352" cy="220" r="45" fill="#81B29A" />
        </svg>
        <span className="font-accent font-bold text-lg text-espresso">
            Pet<span className="text-terracotta">zara</span>
        </span>
    </>
)

export default function LegalPage({ variant, docs }) {
    const { t, path } = useI18n()
    usePageHead(variant)
    // Aberta pelo app (?origem=app): a página não leva à página inicial, onde ficam preços e
    // contratação pela web (política de pagamentos do Google Play). Só depois da hidratação:
    // o HTML pré-renderizado é a versão do site.
    const [searchParams] = useSearchParams()
    const hydrated = useHydrated()
    const fromApp = hydrated && searchParams.get('origem') === 'app'
    const qs = fromApp ? '?origem=app' : ''
    const termsPath = path('terms')
    const privacyPath = path('privacy')
    const notice = t('legal.notice')
    const content = useMemo(() => {
        const md = prepare(docs[variant], docs.files, path)
        if (!fromApp) return md
        return md
            .split(`](${termsPath})`).join(`](${termsPath}?origem=app)`)
            .split(`](${privacyPath})`).join(`](${privacyPath}?origem=app)`)
    }, [variant, docs, path, fromApp, termsPath, privacyPath])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [variant])

    return (
        <div className="min-h-screen bg-cream text-espresso">
            <header className="sticky top-0 z-50 glass border-b border-sand/50 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    {fromApp ? (
                        <>
                            <span />
                            <span className="flex items-center gap-2 shrink-0" aria-label="Petzara">
                                {LOGO}
                            </span>
                        </>
                    ) : (
                        <>
                            <Link
                                to={path('home')}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-taupe hover:text-terracotta transition-colors"
                            >
                                <ArrowLeft size={18} aria-hidden="true" />
                                {t('legal.back')}
                            </Link>
                            <Link to={path('home')} className="flex items-center gap-2 shrink-0 group" aria-label={t('nav.homeAria')}>
                                {LOGO}
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-16">
                {notice && (
                    <div role="note" data-legal-notice className="mb-8 flex gap-3 items-start rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        <Info size={18} aria-hidden="true" className="shrink-0 mt-0.5" />
                        <p className="leading-relaxed font-medium">{notice}</p>
                    </div>
                )}
                <article className="legal-prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {content}
                    </ReactMarkdown>
                </article>
            </main>

            <footer className="border-t border-sand bg-cream-warm/80 py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-taupe">
                    <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Petzara</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link to={`${termsPath}${qs}`} className="hover:text-terracotta transition-colors">
                            {t('legal.terms')}
                        </Link>
                        <Link to={`${privacyPath}${qs}`} className="hover:text-terracotta transition-colors">
                            {t('legal.privacy')}
                        </Link>
                        <LanguageSwitcher className="text-xs sm:text-sm" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
