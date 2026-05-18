import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'

// Below-fold sections — loaded on demand as the user scrolls
const ProblemSection      = lazy(() => import('../components/ProblemSection'))
const SolutionSection     = lazy(() => import('../components/SolutionSection'))
const HowItWorksSection   = lazy(() => import('../components/HowItWorksSection'))
const MultiDeviceSection  = lazy(() => import('../components/MultiDeviceSection'))
const DesktopAppSection   = lazy(() => import('../components/DesktopAppSection'))
const DemoSection         = lazy(() => import('../components/DemoSection'))
const ColorPaletteSection = lazy(() => import('../components/ColorPaletteSection'))
const PricingSection      = lazy(() => import('../components/PricingSection'))
const FAQSection          = lazy(() => import('../components/FAQSection'))
const CTASection          = lazy(() => import('../components/CTASection'))
const Footer              = lazy(() => import('../components/Footer'))

// Aurora global — 5 blobs grandes espalhados pela altura da página.
// Usam CSS variables (var(--color-terracotta) / var(--color-sage)) para que
// a troca de paleta na ColorPaletteSection propague automaticamente via
// applyPaletteGlobally(). Animações de deriva em CSS puro (compositor thread).
function AuroraBackground() {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' && window.innerWidth >= 640
    )

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 640px)')
        const handler = (e) => setIsDesktop(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

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

            {/* Blob 2 — sage, problem — só renderiza no desktop */}
            {isDesktop && (
                <div style={blob('sage', '20%', { key: 'right', value: '-100px' }, 500, 'aurora-drift-2 28s')} />
            )}

            {/* Blob 3 — terracotta, solution/benefits */}
            <div style={blob('terracotta', '42%', { key: 'left',  value: '5%'     }, 700, 'aurora-drift-3 18s')} />

            {/* Blob 4 — sage, demo/palette — só renderiza no desktop */}
            {isDesktop && (
                <div style={blob('sage', '63%', { key: 'right', value: '5%' }, 550, 'aurora-drift-1 25s', 4)} />
            )}

            {/* Blob 5 — terracotta, pricing/CTA */}
            <div style={blob('terracotta', '82%', { key: 'left',  value: '-80px'  }, 600, 'aurora-drift-2 20s', 8)} />
        </div>
    )
}

// Fallback invisível com altura mínima para evitar CLS
function SectionFallback() {
    return <div className="min-h-[200px]" />
}

export default function HomePage() {
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
                <Suspense fallback={<SectionFallback />}><DesktopAppSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><DemoSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><ColorPaletteSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><PricingSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><FAQSection /></Suspense>
                <Suspense fallback={<SectionFallback />}><CTASection /></Suspense>
            </main>
            <Suspense fallback={null}><Footer /></Suspense>
        </div>
    )
}
