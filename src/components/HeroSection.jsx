import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { appRegisterUrl, APP_HOST, whatsappDemoUrl } from '../siteConfig'
import { ease, wordVariant } from '../animations/variants'
import OptimizedImage from './OptimizedImage'

function AnimatedWords({ children, delay = 0 }) {
    const words = String(children).split(' ')
    return (
        <motion.span
            variants={{ animate: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
        >
            {words.flatMap((word, i) => i < words.length - 1
                ? [<motion.span key={i} className="inline-block" variants={wordVariant}>{word}</motion.span>, ' ']
                : [<motion.span key={i} className="inline-block" variants={wordVariant}>{word}</motion.span>]
            )}
        </motion.span>
    )
}

const trustItems = [
    { text: 'Teste grátis por 30 dias', icon: '✓' },
    { text: 'Sem cartão de crédito', icon: '✓' },
    { text: 'Cancele quando quiser', icon: '✓' },
]

// ─── Dual Device Mockup ────────────────────────────────────────────────────────
// MacBook ao fundo + iPhone sobreposto com leve rotação.
// Responsivo: aparece centralizado abaixo do copy no mobile,
// lado a lado com o copy no desktop (lg+).
function DualDeviceMockup({ mockupY, isDesktop }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: mockupY, willChange: isDesktop ? 'transform' : 'auto' }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            // pb-16: espaço para o iPhone e o card flutuante que saem do limite inferior
            className="relative w-full max-w-lg mx-auto lg:mx-0 pb-16 mt-14 lg:mt-0"
        >

            {/* ── MacBook ─────────────────────────────────────────────────────── */}
            <div className="relative">
                {/* Bezel do ecrã */}
                <div className="bg-espresso rounded-t-[18px] px-[3.5%] pt-[3%] shadow-2xl shadow-espresso/20">
                    <div className="rounded-t-xl overflow-hidden">
                        {/* Browser chrome */}
                        <div className="bg-cream-warm px-3 py-2 flex items-center gap-2 border-b border-sand/30">
                            <div className="flex gap-1.5 shrink-0">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-terracotta/60" />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sage/60" />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sand" />
                            </div>
                            <div className="flex-1 mx-2">
                                <div className="bg-white rounded px-2 py-0.5 text-[8px] sm:text-[9px] text-taupe/50 border border-sand/30 truncate max-w-[180px]">
                                    app.petzara.app/dashboard
                                </div>
                            </div>
                        </div>
                        <OptimizedImage
                            src="/prints/dashboard.png"
                            alt="Dashboard Petzara"
                            className="w-full block"
                            loading="eager"
                        />
                    </div>
                </div>

                {/* Câmera / webcam notch */}
                <div className="bg-espresso h-3 flex items-center justify-center">
                    <div className="w-6 h-[3px] rounded-full bg-black/25" />
                </div>

                {/* Dobradiça */}
                <div className="h-[4px] bg-black/35" />

                {/* Base / teclado */}
                <div className="bg-espresso/90 h-4 sm:h-5 rounded-b-xl mx-[1.5%]" />

                {/* Sombra no chão */}
                <div className="h-px bg-black/10 mx-[10%] rounded-full mt-0.5 blur-sm" />
            </div>

            {/* ── iPhone ──────────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.65, type: 'spring', damping: 16, stiffness: 120 }}
                className="absolute bottom-0 -right-3 sm:-right-5 lg:-right-8 rotate-[3deg] z-10"
            >
                <div
                    className="relative bg-espresso p-[7px] shadow-md shadow-espresso/20 lg:shadow-[0_20px_48px_-8px_rgba(44,36,33,0.55)]"
                    style={{ borderRadius: '28px', width: 'clamp(88px, 22vw, 128px)' }}
                >
                    {/* Dynamic island */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 bg-espresso rounded-full z-10"
                        style={{ top: '11px', width: '44%', height: '12px' }}
                    />

                    {/* Tela */}
                    <div className="overflow-hidden" style={{ borderRadius: '22px' }}>
                        <OptimizedImage
                            src="/prints/mobile/dashboard.png"
                            alt="Petzara Mobile"
                            className="w-full block"
                            loading="eager"
                        />
                    </div>

                    {/* Botão lateral */}
                    <div className="absolute -right-[3px] top-14 w-[3px] h-7 bg-espresso/70 rounded-r-sm" />
                    {/* Botões de volume */}
                    <div className="absolute -left-[3px] top-10 w-[3px] h-4 bg-espresso/70 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-16 w-[3px] h-4 bg-espresso/70 rounded-l-sm" />
                </div>
            </motion.div>

            {/* ── Card flutuante de notificação ────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.0, type: 'spring', damping: 14, stiffness: 120 }}
                className="absolute bottom-2 -left-3 sm:-left-5 lg:-left-8 z-10"
            >
                <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ delay: 2.0, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white rounded-xl shadow-xl shadow-espresso/10 border border-sand/50 p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5"
                    style={{ width: 'clamp(138px, 36vw, 168px)' }}
                >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-sage/20 rounded-lg flex items-center justify-center text-sage-dark shrink-0">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-espresso">Novo agendamento!</div>
                        <div className="text-[8px] sm:text-[9px] text-taupe">Luna — Banho às 10:30</div>
                    </div>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    const { scrollY } = useScroll()
    const mockupY   = useTransform(scrollY, [0, 600], isDesktop ? [0, -50] : [0, 0])
    const pawBigY   = useTransform(scrollY, [0, 600], isDesktop ? [0, -25] : [0, 0])
    const pawSmallY = useTransform(scrollY, [0, 600], isDesktop ? [0, -75] : [0, 0])
    const blobY     = useTransform(scrollY, [0, 600], isDesktop ? [0, -35] : [0, 0])

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">


            {/* Dot pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Parallax decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y: blobY, willChange: isDesktop ? 'transform' : 'auto' }}
                    className="hidden lg:block absolute top-1/3 right-[20%] w-48 h-48 bg-terracotta/3 rounded-full blur-2xl animate-float-slow"
                />
                <motion.svg style={{ y: pawBigY, willChange: isDesktop ? 'transform' : 'auto' }} aria-hidden="true" className="absolute top-[25%] left-[5%] w-8 h-8 text-terracotta/10 animate-float" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </motion.svg>
                <motion.svg style={{ y: pawBigY, willChange: isDesktop ? 'transform' : 'auto' }} aria-hidden="true" className="absolute top-[60%] right-[8%] w-12 h-12 text-sage/10 animate-float-slow" viewBox="0 0 512 512" fill="currentColor" initial={false}>
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </motion.svg>
                <motion.svg style={{ y: pawSmallY, willChange: isDesktop ? 'transform' : 'auto' }} aria-hidden="true" className="absolute bottom-[20%] left-[15%] w-6 h-6 text-terracotta/8 animate-float" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </motion.svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ── Copy ──────────────────────────────────────────────────── */}
                    <motion.div
                        variants={{ animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, scale: 0.88, y: 8 },
                                animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease } },
                            }}
                            className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-terracotta/20"
                        >
                            <Sparkles size={15} />
                            Sistema para petshops — 30 dias grátis, sem cartão
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="font-accent text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6"
                            variants={{ animate: { transition: { staggerChildren: 0.045 } } }}
                            style={{ perspective: 1000 }}
                        >
                            <motion.span
                                className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-terracotta tracking-tight mb-2"
                                variants={wordVariant}
                            >
                                Petzara
                            </motion.span>
                            <AnimatedWords delay={0.08}>Seu petshop</AnimatedWords>
                            {' '}
                            <motion.span className="gradient-text" variants={wordVariant}>organizado</motion.span>
                            <motion.span variants={wordVariant}>.</motion.span>
                            {' '}
                            <br className="hidden sm:block" />
                            <AnimatedWords delay={0.22}>Seus clientes</AnimatedWords>
                            {' '}
                            <motion.span className="gradient-text" variants={wordVariant}>felizes</motion.span>
                            <motion.span variants={wordVariant}>.</motion.span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            variants={{
                                initial: { opacity: 0, y: 16 },
                                animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                            }}
                            className="text-taupe text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
                        >
                            Agenda, clientes, pets e finanças em um único lugar. Feito especialmente para petshops de banho e tosa — do caderno para profissional em minutos.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 16 },
                                animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                            }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.a
                                href={appRegisterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-shine inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20"
                            >
                                Começar Teste Grátis
                                <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href={whatsappDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-sand hover:border-terracotta/40 text-espresso font-bold text-base px-8 py-4 rounded-2xl transition-all"
                            >
                                Agendar demonstração
                            </motion.a>
                        </motion.div>

                        {/* Trust signals */}
                        <motion.div
                            variants={{ animate: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
                            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm"
                        >
                            {trustItems.map((item, i) => (
                                <motion.span
                                    key={item.text}
                                    variants={{
                                        initial: { opacity: 0, x: -10 },
                                        animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                                    }}
                                    className="flex items-center gap-1.5"
                                >
                                    <span className="w-4 h-4 bg-sage/20 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-2.5 h-2.5 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-espresso/70 font-medium">{item.text}</span>
                                    {i < trustItems.length - 1 && (
                                        <span className="hidden sm:block w-px h-3 bg-sand mx-1" aria-hidden="true" />
                                    )}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Dual Device Mockup ────────────────────────────────────── */}
                    <DualDeviceMockup mockupY={mockupY} isDesktop={isDesktop} />

                </div>
            </div>
        </section>
    )
}
