import { motion } from 'framer-motion'
import { Monitor, Smartphone, Download, RefreshCw } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'
import OptimizedImage from './OptimizedImage'
import { LaptopFrame, PhoneFrame, TabletFrame } from './DeviceFrames'
import StoreBadges from './StoreBadges'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'

const PILL_ICONS = [Smartphone, Monitor, Download, RefreshCw]

// ─── Molduras ──────────────────────────────────────────────────────────────────
function MacBookFrame({ src, alt }) {
    return (
        <LaptopFrame shadow="0 4cqw 9cqw -3cqw rgba(0,0,0,0.6)">
            <div className="bg-cream-warm px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 border-b border-sand/20">
                <div className="flex gap-1 shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terracotta/50" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sage/50" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sand/70" />
                </div>
                <div className="flex-1 mx-1 sm:mx-2">
                    <div className="bg-white/70 rounded px-1.5 py-0.5 text-[6px] sm:text-[8px] text-taupe/40 border border-sand/20 max-w-[120px] truncate">
                        app.petzara.app/appointments
                    </div>
                </div>
            </div>
            <OptimizedImage src={src} alt={alt} className="w-full h-auto block" />
        </LaptopFrame>
    )
}

function IPadFrame({ src, alt }) {
    return (
        <TabletFrame>
            <OptimizedImage src={src} alt={alt} className="w-full h-auto block" />
        </TabletFrame>
    )
}

function IPhoneFrame({ src, alt }) {
    return (
        <PhoneFrame shadow="0 6cqw 12cqw -3cqw rgba(0,0,0,0.7)">
            <OptimizedImage src={src} alt={alt} className="w-full h-auto block" />
        </PhoneFrame>
    )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function MultiDeviceSection() {
    const { ref, isInView } = useResponsiveInView()
    const { t, tm } = useI18n()
    const pills = (tm('multiDevice.pills') || []).map((label, i) => ({ icon: PILL_ICONS[i], label }))

    return (
        <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">

            {/* Dark premium background — espresso warm */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0c] via-[#2c1a14] to-[#1a1208]" />
            <div className="absolute -top-[8%] left-[8%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
                 style={{ background: 'var(--color-terracotta)', opacity: 0.12 }} />
            <div className="absolute top-[15%] -right-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                 style={{ background: 'var(--color-sage)', opacity: 0.08 }} />
            <div className="absolute bottom-0 left-[20%] w-[600px] h-[250px] rounded-full blur-[120px] pointer-events-none"
                 style={{ background: 'var(--color-terracotta)', opacity: 0.06 }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
                    className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                >
                    <span className="inline-block bg-white/10 border border-white/15 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                        {t('multiDevice.badge')}
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                        <Highlighted parts={tm('multiDevice.title')} />
                    </h2>
                    <p className="text-white/65 text-lg leading-relaxed">
                        {t('multiDevice.subtitle')}
                    </p>
                    <StoreBadges
                        size="md"
                        center
                        className="mt-6"
                        playAlt={t('multiDevice.playBadgeAlt')}
                        appStoreAlt={t('multiDevice.appStoreBadgeAlt')}
                    />
                </motion.div>

                {/* ── Three-device showcase ─────────────────────────────────── */}
                {/*
                    Ordem visual (de trás para frente):
                    1. MacBook  — z-0, opacidade reduzida (fundo)
                    2. iPad     — z-10, landscape, -2° de rotação
                    3. iPhone   — z-20, portrait,  +3° de rotação, flutuante
                    items-end alinha as bases, criando perspectiva natural.
                    Dispositivos menores ficam "na frente" do MacBook.
                */}
                <div className="flex items-end justify-center gap-1 sm:gap-2 lg:gap-3">

                    {/* iPad — oculto no mobile para não poluir telas pequenas */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.28, ease }}
                        className="hidden sm:block relative z-10 flex-shrink-0 -rotate-[2deg]"
                        style={{ width: 'clamp(140px, 22vw, 240px)' }}
                    >
                        {/* Float suave — começa após a entrada */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ delay: 2.2, duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <IPadFrame
                                src="/prints/v2/app/clientes.webp"
                                alt={t('multiDevice.tabletAlt')}
                            />
                        </motion.div>
                    </motion.div>

                    {/* MacBook — fundo, levemente dimmed */}
                    <motion.div
                        initial={{ opacity: 0, y: 55 }}
                        animate={isInView ? { opacity: 0.88, y: 0 } : { opacity: 0, y: 55 }}
                        transition={{ duration: 0.85, delay: 0.1, ease }}
                        className="relative z-0 flex-shrink-0"
                        style={{ width: 'clamp(210px, 58vw, 640px)' }}
                    >
                        <MacBookFrame
                            src="/prints/v2/app/agenda-calendario-semana.webp"
                            alt={t('multiDevice.desktopAlt')}
                        />
                    </motion.div>

                    {/* iPhone — primeiro plano, mais destaque */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.45, ease }}
                        className="relative z-20 flex-shrink-0 rotate-[3deg]"
                        style={{ width: 'clamp(76px, 14vw, 120px)' }}
                    >
                        {/* Float suave — timing diferente do iPad */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ delay: 1.8, duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <IPhoneFrame
                                src="/prints/v2/app/mobile/agendamentos.webp"
                                alt={t('multiDevice.phoneAlt')}
                            />
                        </motion.div>
                    </motion.div>

                </div>

                {/* ── Feature pills ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.55, ease }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-12"
                >
                    {pills.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="inline-flex items-center gap-2 bg-white border border-sand/60 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm text-espresso/70 font-medium shadow-sm"
                        >
                            <Icon size={13} className="text-terracotta shrink-0" />
                            {label}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}
