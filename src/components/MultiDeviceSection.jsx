import { motion } from 'framer-motion'
import { Monitor, Smartphone, Download, RefreshCw } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

const pills = [
    { icon: Smartphone,  label: 'Android & iOS' },
    { icon: Monitor,     label: 'Qualquer navegador' },
    { icon: Download,    label: 'Instala como app (PWA)' },
    { icon: RefreshCw,   label: 'Sincronização em tempo real' },
]

// ─── MacBook Frame ─────────────────────────────────────────────────────────────
function MacBookFrame({ src, alt }) {
    return (
        <div className="relative">
            {/* Screen + bezel */}
            <div className="bg-espresso rounded-t-[14px] sm:rounded-t-[18px] px-[3%] pt-[2.5%]">
                <div className="rounded-t-lg overflow-hidden">
                    {/* Browser chrome */}
                    <div className="bg-cream-warm px-2 sm:px-3 py-1.5 flex items-center gap-1.5 border-b border-sand/20">
                        <div className="flex gap-1 shrink-0">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terracotta/50" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sage/50" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sand/70" />
                        </div>
                        <div className="flex-1 mx-1 sm:mx-2">
                            <div className="bg-white/70 rounded px-1.5 py-0.5 text-[6px] sm:text-[8px] text-taupe/40 border border-sand/20 max-w-[120px] truncate">
                                app.petzara.app/dashboard
                            </div>
                        </div>
                    </div>
                    <img src={src} alt={alt} className="w-full block" loading="lazy" />
                </div>
            </div>
            {/* Camera notch */}
            <div className="bg-espresso h-2 sm:h-2.5 flex items-center justify-center">
                <div className="w-4 h-[2px] rounded-full bg-black/20" />
            </div>
            {/* Hinge */}
            <div className="h-[3px] bg-black/30" />
            {/* Base */}
            <div className="bg-espresso/90 h-3 sm:h-4 rounded-b-[8px] sm:rounded-b-[10px] mx-[2%]" />
            {/* Ground shadow */}
            <div className="h-px bg-black/20 mx-[10%] rounded-full mt-0.5 blur-sm" />
        </div>
    )
}

// ─── iPad Frame (landscape) ────────────────────────────────────────────────────
function IPadFrame({ src, alt }) {
    return (
        <div
            className="relative bg-espresso"
            style={{
                borderRadius: '10px',
                padding: '7px',
                boxShadow: '0 24px 48px -6px rgba(0,0,0,0.55)',
            }}
        >
            {/* Câmera (lado esquerdo no landscape) */}
            <div
                className="absolute left-[5px] top-1/2 -translate-y-1/2 bg-black/20 rounded-full"
                style={{ width: '3px', height: '3px' }}
            />
            {/* Tela */}
            <div className="overflow-hidden" style={{ borderRadius: '5px' }}>
                <img src={src} alt={alt} className="w-full block" loading="lazy" />
            </div>
        </div>
    )
}

// ─── iPhone Frame (portrait) ──────────────────────────────────────────────────
function IPhoneFrame({ src, alt }) {
    return (
        <div
            className="relative bg-espresso"
            style={{
                borderRadius: '20px',
                padding: '6px',
                boxShadow: '0 30px 60px -8px rgba(0,0,0,0.70)',
            }}
        >
            {/* Dynamic island */}
            <div
                className="absolute left-1/2 -translate-x-1/2 bg-espresso rounded-full z-10"
                style={{ top: '9px', width: '44%', height: '9px' }}
            />
            {/* Tela */}
            <div className="overflow-hidden" style={{ borderRadius: '15px' }}>
                <img src={src} alt={alt} className="w-full block" loading="lazy" />
            </div>
            {/* Botão lateral */}
            <div className="absolute -right-[2px] top-12 w-[2px] h-5 bg-espresso/60 rounded-r-sm" />
            {/* Volume */}
            <div className="absolute -left-[2px] top-9   w-[2px] h-3.5 bg-espresso/60 rounded-l-sm" />
            <div className="absolute -left-[2px] top-[54px] w-[2px] h-3.5 bg-espresso/60 rounded-l-sm" />
        </div>
    )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function MultiDeviceSection() {
    const { ref, isInView } = useResponsiveInView()

    return (
        <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">

            {/* Dark premium background — espresso warm */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0c] via-[#2c1a14] to-[#1a1208]" />

            {/* Glow orbs — respondem à paleta via CSS vars */}
            <div
                className="absolute -top-[8%] left-[8%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
                style={{ background: 'var(--color-terracotta)', opacity: 0.12 }}
            />
            <div
                className="absolute top-[15%] -right-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: 'var(--color-sage)', opacity: 0.08 }}
            />
            <div
                className="absolute bottom-0 left-[20%] w-[600px] h-[250px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'var(--color-terracotta)', opacity: 0.06 }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
                    className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                >
                    <span className="inline-block bg-white/10 border border-white/15 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                        Acesse de onde quiser
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                        Funciona em{' '}
                        <span className="gradient-text">qualquer dispositivo</span>
                    </h2>
                    <p className="text-white/55 text-lg leading-relaxed">
                        Celular, tablet e computador. Instala como app no Android sem precisar da Play Store.
                        Sua equipe acessa de onde estiver.
                    </p>
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
                                src="/prints/clientes-lista.png"
                                alt="Gestão de clientes no tablet"
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
                            src="/prints/dashboard.png"
                            alt="Dashboard Petzara no computador"
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
                                src="/prints/mobile/agendamentos.png"
                                alt="Agendamentos no celular"
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
                            className="inline-flex items-center gap-2 bg-white/8 border border-white/12 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm text-white/65 font-medium backdrop-blur-sm"
                        >
                            <Icon size={13} className="text-white/45 shrink-0" />
                            {label}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}
