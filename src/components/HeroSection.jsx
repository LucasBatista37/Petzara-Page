import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { ease } from '../animations/variants'
import OptimizedImage from './OptimizedImage'
import { useLinks } from '../lib/links'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'
import { useHydrated } from '../lib/useHydrated'
import StoreBadges from './StoreBadges'
import { LaptopFrame, PhoneFrame } from './DeviceFrames'
import { isPaidVisit } from '../lib/attribution'

/** Android → o CTA principal leva à Play; iPhone → à App Store; nos demais, ao cadastro web (L3). */
const detectAndroid = () => typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent || '')
const detectIPhone = () => typeof navigator !== 'undefined' && /iphone|ipod/i.test(navigator.userAgent || '')

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

            {/* ── Notebook ────────────────────────────────────────────────────── */}
            <LaptopFrame>
                {/* Barra do navegador */}
                <div className="bg-cream-warm px-3 py-1.5 flex items-center gap-2 border-b border-sand/30">
                    <div className="flex gap-1.5 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-terracotta/60" />
                        <div className="w-2 h-2 rounded-full bg-sage/60" />
                        <div className="w-2 h-2 rounded-full bg-sand" />
                    </div>
                    <div className="flex-1 mx-2">
                        <div className="bg-white rounded px-2 py-0.5 text-[8px] sm:text-[9px] text-taupe/50 border border-sand/30 truncate max-w-[180px]">
                            app.petzara.app/dashboard
                        </div>
                    </div>
                </div>
                <OptimizedImage
                    src="/prints/v2/app/dashboard.webp"
                    srcSet="/prints/v2/app/dashboard-800.webp 800w, /prints/v2/app/dashboard.webp 1600w"
                    sizes="(min-width: 1024px) 480px, 92vw"
                    alt={t('hero.dashboardAlt')}
                    className="w-full h-auto block"
                    loading="eager"
                />
            </LaptopFrame>

            {/* ── Celular ─────────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.65, type: 'spring', damping: 16, stiffness: 120 }}
                className="absolute bottom-0 -right-1 sm:-right-3 lg:-right-6 rotate-[3deg] z-10"
            >
                <PhoneFrame style={{ width: 'clamp(96px, 24vw, 140px)' }}>
                    <OptimizedImage
                        src="/prints/v2/app/mobile/dashboard.webp"
                        srcSet="/prints/v2/app/mobile/dashboard-360.webp 360w, /prints/v2/app/mobile/dashboard.webp 900w"
                        sizes="140px"
                        alt={t('hero.mobileAlt')}
                        className="w-full h-auto block"
                        loading="eager"
                    />
                </PhoneFrame>
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
    const { t, tm } = useI18n()
    const links = useLinks()
    // HTML pré-renderizado = versão "desktop, nem Android nem iPhone"; o navegador ajusta logo após hidratar.
    const hydrated = useHydrated()
    const isAndroid = hydrated && detectAndroid()
    const isIPhone = hydrated && !isAndroid && detectIPhone()
    // No celular, o botão principal leva à loja do aparelho — menos em visita de anúncio: aí o principal é o
    // cadastro pelo navegador, que leva o clique do anúncio até a conta (a loja não leva); as lojas ficam ao lado.
    const paid = hydrated && isPaidVisit()
    const store = paid ? null : isAndroid
        ? { href: links.play, label: t('hero.playCta') }
        : isIPhone ? { href: links.appStore, label: t('hero.appStoreCta') } : null
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
                        <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-terracotta/20">
                            <Sparkles size={15} aria-hidden="true" />
                            {t('hero.badge')}
                        </div>

                        {/* O que é, nas palavras de quem pesquisou (anúncio → página) */}
                        <p className="text-sm sm:text-base font-bold text-espresso/80 mb-2">{t('hero.eyebrow')}</p>

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
                            {store ? (
                                <>
                                    <motion.a
                                        href={store.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="hero_principal"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-shine inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20"
                                    >
                                        <Download size={18} aria-hidden="true" />
                                        {store.label}
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
                                    <StoreBadges
                                        size="lg"
                                        eager
                                        trackPrefix="hero_secundario"
                                        playAlt={t('hero.playBadgeAlt')}
                                        appStoreAlt={t('hero.appStoreBadgeAlt')}
                                    />
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
