import { motion } from 'framer-motion'
import { Monitor, Download, Shield, Wifi } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

const DOWNLOAD_URL = 'https://github.com/LucasBatista37/petzara-desktop/releases/latest/download/Petzara-Setup.exe'

const features = [
    { icon: Monitor, text: 'Atalho na área de trabalho' },
    { icon: Wifi,    text: 'Funciona offline (tela de espera)' },
    { icon: Shield,  text: 'Sem dados locais — tudo na nuvem' },
]

export default function DesktopAppSection() {
    const { ref, isInView } = useResponsiveInView()

    return (
        <section ref={ref} className="py-16 sm:py-20 bg-cream relative overflow-hidden">

            {/* Blob de fundo */}
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
                    {/* Ícone / ilustração */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.55, delay: 0.15, ease }}
                        className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-terracotta/10 to-sage/10 border border-sand/40 flex items-center justify-center"
                    >
                        <Monitor size={44} className="text-terracotta" strokeWidth={1.5} />
                    </motion.div>

                    {/* Texto */}
                    <div className="flex-1 text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.2, ease }}
                        >
                            <span className="inline-block bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wide uppercase">
                                Aplicativo para Windows
                            </span>
                            <h2 className="font-accent text-2xl sm:text-3xl font-extrabold text-espresso mb-2">
                                Petzara no seu computador
                            </h2>
                            <p className="text-taupe/70 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto sm:mx-0">
                                Acesse o sistema direto da área de trabalho, sem abrir o navegador.
                                Instale uma vez e tenha o Petzara sempre a um clique.
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

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.35, ease }}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-3"
                        >
                            <a
                                href={DOWNLOAD_URL}
                                className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 active:bg-terracotta/80 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-terracotta/20 text-sm"
                            >
                                <Download size={16} />
                                Baixar para Windows
                            </a>
                            <span className="text-xs text-taupe/45 self-center">
                                Windows 10 / 11 · 64-bit · ~74 MB · Gratuito
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
