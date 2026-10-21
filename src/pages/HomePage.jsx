import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import { SHOW_CASE } from '../siteConfig'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { usePageHead } from '../i18n/usePageHead'

// Below-fold sections — loaded on demand as the user scrolls
const ProblemSection      = lazy(() => import('../components/ProblemSection'))
const SolutionSection     = lazy(() => import('../components/SolutionSection'))
const HowItWorksSection   = lazy(() => import('../components/HowItWorksSection'))
const MultiDeviceSection  = lazy(() => import('../components/MultiDeviceSection'))
const DemoSection         = lazy(() => import('../components/DemoSection'))
const ColorPaletteSection = lazy(() => import('../components/ColorPaletteSection'))
const CaseSection         = lazy(() => import('../components/CaseSection'))
const PricingSection      = lazy(() => import('../components/PricingSection'))
const FAQSection          = lazy(() => import('../components/FAQSection'))
const CTASection          = lazy(() => import('../components/CTASection'))
const Footer              = lazy(() => import('../components/Footer'))

// Aurora global — blobs grandes espalhados pela altura da página.
// Usam CSS variables (var(--color-terracotta) / var(--color-sage)) para que
// a troca de paleta na ColorPaletteSection propague automaticamente via
// applyPaletteGlobally(). Animações de deriva em CSS puro (compositor thread).
// Desligados no celular (< 640px): blur de 180px em elementos de 600px+ custa
// GPU/bateria e quase não aparece em tela pequena (L8).
function AuroraBackground() {
    // false no pré-render e na hidratação (HTML igual para todos); liga logo depois no desktop.
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 640px)')
        setIsDesktop(mq.matches)
        const handler = (e) => setIsDesktop(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    if (!isDesktop) return null

    const blob = (color, top, side, size, anim, delay = 0) => ({
        position: 'absolute',
        [side.key]: side.value,
        top,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: `var(--color-${color})`,
        filter: 'blur(180px)',
        opacity: 0.06,
        transform: 'translateZ(0)',
        transition: 'background-color 0.8s ease',
        animation: `${anim} ease-in-out infinite${delay ? ` ${delay}s` : ''}`,
    })

    return (
        <div
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
        >
            {/* Blob 1 — terracotta, hero */}
            <div style={blob('terracotta', '2%',  { key: 'left',  value: '-120px' }, 650, 'aurora-drift-1 22s')} />

            {/* Blob 2 — sage, problem */}
            <div style={blob('sage', '20%', { key: 'right', value: '-100px' }, 500, 'aurora-drift-2 28s')} />

            {/* Blob 3 — terracotta, solution/benefits */}
            <div style={blob('terracotta', '42%', { key: 'left',  value: '5%'     }, 700, 'aurora-drift-3 18s')} />

            {/* Blob 4 — sage, demo/palette */}
            <div style={blob('sage', '63%', { key: 'right', value: '5%' }, 550, 'aurora-drift-1 25s', 4)} />

            {/* Blob 5 — terracotta, pricing/CTA */}
            <div style={blob('terracotta', '82%', { key: 'left',  value: '-80px'  }, 600, 'aurora-drift-2 20s', 8)} />
        </div>
    )
}

// Fallback invisível com altura mínima para evitar CLS
function SectionFallback() {
    return <div className="min-h-[200px]" />
}

// Prévia do layout da prova social só no `npm run dev` (?previewCase=1); nunca em produção.
const previewCase = import.meta.env.DEV && typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).has('previewCase')

export default function HomePage() {
    const { locale } = useI18n()
    usePageHead('home')
    // Prova social: dados reais só do Brasil por enquanto (CASE_STUDY em pt) → só na página pt-BR.
    const showCase = (SHOW_CASE || previewCase) && locale === 'pt-BR'
    return (
        <div className="relative min-h-screen bg-cream">
            <AuroraBackground />
            <Navbar />
            <main className="bg-gradient-to-b from-cream via-cream-warm to-cream">
                <HeroSection />
                <Suspense fallback={<SectionFallback />}><ProblemSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><SolutionSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><HowItWorksSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><MultiDeviceSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><DemoSection /></Suspense>
                {/* Prova social (L9): desligada até o Lucas preencher CASE_STUDY com dados reais */}
                {showCase && (
                    <Suspense fallback={<SectionFallback />}><CaseSection preview={previewCase} /></Suspense>
                )}
                <Suspense fallback={<SectionFallback />}><PricingSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><FAQSection /></Suspense>
                {/* Paleta de cores: depois do FAQ, fora do caminho até os preços */}
                <Suspense fallback={<SectionFallback />}><ColorPaletteSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><CTASection /></Suspense>
            </main>
            <Suspense fallback={null}><Footer /></Suspense>
        </div>
    )
}
