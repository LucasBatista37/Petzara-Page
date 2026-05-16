import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Download, Shield, Wifi, Info, X } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

const DOWNLOADS = {
    windows: {
        url:   'https://github.com/LucasBatista37/petzara-desktop/releases/latest/download/Petzara-Setup.exe',
        label: 'Baixar para Windows',
        hint:  'Windows 10 / 11 · 64-bit',
    },
    mac: {
        url:   'https://github.com/LucasBatista37/petzara-desktop/releases/latest/download/Petzara.dmg',
        label: 'Baixar para macOS',
        hint:  'macOS 11+ · Apple Silicon & Intel',
    },
    linux: {
        url:   'https://github.com/LucasBatista37/petzara-desktop/releases/latest/download/Petzara.AppImage',
        label: 'Baixar para Linux',
        hint:  'AppImage · 64-bit',
    },
}

const OS_ORDER = {
    windows: ['windows', 'mac', 'linux'],
    mac:     ['mac', 'windows', 'linux'],
    linux:   ['linux', 'windows', 'mac'],
}

function detectOS() {
    if (typeof navigator === 'undefined') return 'windows'
    const ua = navigator.userAgent
    if (/Win/i.test(ua))   return 'windows'
    if (/Mac/i.test(ua))   return 'mac'
    if (/Linux/i.test(ua)) return 'linux'
    return 'windows'
}

const features = [
    { icon: Monitor, text: 'Atalho na área de trabalho' },
    { icon: Wifi,    text: 'Funciona offline (tela de espera)' },
    { icon: Shield,  text: 'Sem dados locais — tudo na nuvem' },
]

function MacWarning({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-left max-w-md mx-auto sm:mx-0"
        >
            <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs text-amber-800 leading-relaxed">
                <strong className="block mb-0.5">Primeira abertura no macOS</strong>
                O macOS pode bloquear o app por não ter assinatura Apple.
                Abra o arquivo baixado, e se aparecer aviso, vá em{' '}
                <strong>Configurações do Sistema → Privacidade e Segurança</strong>{' '}
                e clique em <strong>"Abrir assim mesmo"</strong>.
            </div>
            <button
                onClick={onClose}
                className="text-amber-400 hover:text-amber-600 shrink-0 transition-colors"
                aria-label="Fechar aviso"
            >
                <X size={14} />
            </button>
        </motion.div>
    )
}

export default function DesktopAppSection() {
    const { ref, isInView } = useResponsiveInView()
    const [detectedOS, setDetectedOS] = useState('windows')
    const [showMacWarning, setShowMacWarning] = useState(false)

    useEffect(() => {
        const os = detectOS()
        setDetectedOS(os)
        if (os === 'mac') setShowMacWarning(true)
    }, [])

    const order = OS_ORDER[detectedOS]
    const primary = DOWNLOADS[order[0]]
    const secondaries = order.slice(1).map(os => DOWNLOADS[os])

    return (
        <section ref={ref} className="py-16 sm:py-20 bg-cream relative overflow-hidden">

            <div
                className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: 'var(--color-terracotta)', opacity: 0.05 }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
                    className="bg-white border border-sand/60 rounded-2xl sm:rounded-3xl shadow-sm px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-center gap-8 sm:gap-12"
                >
                    {/* Ícone */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.55, delay: 0.15, ease }}
                        className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-terracotta/10 to-sage/10 border border-sand/40 flex items-center justify-center"
                    >
                        <Monitor size={44} className="text-terracotta" strokeWidth={1.5} />
                    </motion.div>

                    {/* Texto + CTAs */}
                    <div className="flex-1 text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.2, ease }}
                        >
                            <span className="inline-block bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wide uppercase">
                                App Desktop
                            </span>
                            <h2 className="font-accent text-2xl sm:text-3xl font-extrabold text-espresso mb-2">
                                Petzara no seu computador
                            </h2>
                            <p className="text-taupe/70 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto sm:mx-0">
                                Acesse o sistema direto da área de trabalho, sem abrir o navegador.
                                Disponível para Windows, macOS e Linux.
                            </p>

                            {/* Feature pills */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                                {features.map(({ icon: Icon, text }) => (
                                    <span
                                        key={text}
                                        className="inline-flex items-center gap-1.5 bg-cream border border-sand/50 text-espresso/65 px-3 py-1.5 rounded-full text-xs font-medium"
                                    >
                                        <Icon size={11} className="text-terracotta shrink-0" />
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Botão primário — SO detectado */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.35, ease }}
                            className="flex flex-col items-center sm:items-start gap-4"
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <a
                                    href={primary.url}
                                    className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 active:bg-terracotta/80 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-terracotta/20 text-sm"
                                >
                                    <Download size={16} />
                                    {primary.label}
                                </a>
                                <span className="text-xs text-taupe/45 self-center">
                                    {primary.hint} · ~74 MB · Gratuito
                                </span>
                            </div>

                            {/* Botões secundários — outros SOs */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                {secondaries.map(({ url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        onClick={() => label.includes('macOS') && setShowMacWarning(true)}
                                        className="inline-flex items-center gap-1.5 bg-cream hover:bg-sand/30 border border-sand/60 text-espresso/60 hover:text-espresso/80 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                                    >
                                        <Download size={11} />
                                        {label}
                                    </a>
                                ))}
                            </div>

                            {/* Aviso macOS */}
                            <AnimatePresence>
                                {showMacWarning && (
                                    <MacWarning onClose={() => setShowMacWarning(false)} />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
