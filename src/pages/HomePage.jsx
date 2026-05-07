import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import HowItWorksSection from '../components/HowItWorksSection'
import DemoSection from '../components/DemoSection'
import ColorPaletteSection from '../components/ColorPaletteSection'
import MultiDeviceSection from '../components/MultiDeviceSection'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

// Aurora global — 5 blobs grandes espalhados pela altura da página.
// Usam CSS variables (var(--color-terracotta) / var(--color-sage)) para que
// a troca de paleta na ColorPaletteSection propague automaticamente via
// applyPaletteGlobally(). Animações de deriva em CSS puro (compositor thread).
function AuroraBackground() {
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

            {/* Blob 2 — sage, problem — oculto no mobile para poupar GPU */}
            <div className="hidden sm:block"
                 style={blob('sage',       '20%', { key: 'right', value: '-100px' }, 500, 'aurora-drift-2 28s')} />

            {/* Blob 3 — terracotta, solution/benefits */}
            <div style={blob('terracotta', '42%', { key: 'left',  value: '5%'     }, 700, 'aurora-drift-3 18s')} />

            {/* Blob 4 — sage, demo/palette — oculto no mobile */}
            <div className="hidden sm:block"
                 style={blob('sage',       '63%', { key: 'right', value: '5%'     }, 550, 'aurora-drift-1 25s', 4)} />

            {/* Blob 5 — terracotta, pricing/CTA */}
            <div style={blob('terracotta', '82%', { key: 'left',  value: '-80px'  }, 600, 'aurora-drift-2 20s', 8)} />
        </div>
    )
}

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-cream">
            <AuroraBackground />
            <Navbar />
            <main className="bg-gradient-to-b from-cream via-cream-warm to-cream">
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <HowItWorksSection />
                <MultiDeviceSection />
                <DemoSection />
                <ColorPaletteSection />
                <PricingSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
