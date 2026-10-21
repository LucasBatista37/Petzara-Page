import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { ease } from '../animations/variants'
import OptimizedImage from './OptimizedImage'
import { useLinks } from '../lib/links'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'
import { useHydrated } from '../lib/useHydrated'

/** Android → o CTA principal leva à Play; nos demais, ao cadastro web (L3). */
const detectAndroid = () => typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent || '')

// ─── Dual Device Mockup ────────────────────────────────────────────────────────
// MacBook ao fundo + iPhone sobreposto com leve rotação.
// Responsivo: aparece centralizado abaixo do copy no mobile,
// lado a lado com o copy no desktop (lg+).
function DualDeviceMockup({ mockupY, isDesktop }) {
    const { t } = useI18n()
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
                            alt={t('hero.dashboardAlt')}
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
                            alt={t('hero.mobileAlt')}
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
                        <div className="text-[9px] sm:text-[10px] font-bold text-espresso">{t('hero.notificationTitle')}</div>
                        <div className="text-[8px] sm:text-[9px] text-taupe">{t('hero.notificationText')}</div>
                    </div>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
    const { t, tm, meta } = useI18n()
    const links = useLinks()
    // HTML pré-renderizado = versão "desktop, não Android"; o navegador ajusta logo após hidratar.
    const hydrated = useHydrated()
    const isAndroid = hydrated && detectAndroid()
    const isDesktop = hydrated && window.innerWidth >= 1024
    const trustItems = (tm('hero.trust') || []).map((text) => ({ text }))
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
                    {/* Sem animação de entrada: H1, texto e botões aparecem já no 1º quadro (LCP). */}
                    <div>
                        {/* Selo */}
                        <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-terracotta/20">
                            <Sparkles size={15} aria-hidden="true" />
                            {t('hero.badge')}
                        </div>

                        {/* Headline — resultado + palavra-chave */}
                        <h1 className="font-accent text-[2.1rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] mb-6 text-espresso">
                            <Highlighted parts={tm('hero.title')} />
                        </h1>

                        {/* Subheading */}
                        <p className="text-taupe text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
                            {t('hero.subtitle')}
                        </p>

                        {/* CTAs — o principal depende do aparelho */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {isAndroid ? (
                                <>
                                    <motion.a
                                        href={links.play}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="hero_principal"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-shine inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20"
                                    >
                                        <Download size={18} aria-hidden="true" />
                                        {t('hero.playCta')}
                                    </motion.a>
                                    <a
                                        href={links.register}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="hero_secundario"
                                        className="inline-flex items-center justify-center gap-2 bg-white border-2 border-sand hover:border-terracotta/40 text-espresso font-bold text-base px-8 py-4 rounded-2xl transition-all"
                                    >
                                        {t('hero.webCtaAndroid')}
                                    </a>
                                </>
                            ) : (
                                <>
                                    <motion.a
                                        href={links.register}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="hero_principal"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-shine inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20"
                                    >
                                        {t('hero.webCta')}
                                        <ArrowRight size={18} aria-hidden="true" />
                                    </motion.a>
                                    <a
                                        href={links.play}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="hero_secundario"
                                        aria-label={t('hero.playCta')}
                                        className="inline-flex justify-center sm:justify-start transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <img
                                            src={meta.playBadge}
                                            alt={t('hero.playBadgeAlt')}
                                            width={155}
                                            height={60}
                                            className="h-[60px] w-auto"
                                            loading="eager"
                                        />
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Bônus de uso */}
                        <p className="mt-5 text-sm text-espresso/70 font-medium">
                            <span className="text-sage-dark font-bold">{t('hero.bonusStrong')}</span> {t('hero.bonusText')}
                        </p>

                        {/* Trust signals */}
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm">
                            {trustItems.map((item, i) => (
                                <span key={item.text} className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 bg-sage/20 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-2.5 h-2.5 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-espresso/70 font-medium">{item.text}</span>
                                    {i < trustItems.length - 1 && (
                                        <span className="hidden sm:block w-px h-3 bg-sand mx-1" aria-hidden="true" />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── Dual Device Mockup ────────────────────────────────────── */}
                    <DualDeviceMockup mockupY={mockupY} isDesktop={isDesktop} />

                </div>
            </div>
        </section>
    )
}
