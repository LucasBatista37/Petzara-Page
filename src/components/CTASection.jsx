import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Check, Shield, Headphones, RefreshCw, CreditCard, Mail, Smartphone } from 'lucide-react'
import { appRegisterUrl, whatsappDemoUrl } from '../siteConfig'
import { ease, wordVariant, useResponsiveInView } from '../animations/variants'

const trustItems = [
    { icon: Shield, label: 'Dados seguros na nuvem com criptografia' },
    { icon: Headphones, label: 'Suporte técnico por e-mail e WhatsApp' },
    { icon: RefreshCw, label: 'Atualizações constantes com novas funcionalidades' },
    { icon: CreditCard, label: 'Pagamento seguro processado pelo Stripe' },
    { icon: Mail, label: 'Verificação de e-mail para proteção da conta' },
    { icon: Smartphone, label: 'Instala como app no Android (PWA + TWA)' },
]

const checkItems = [
    'Teste grátis por 30 dias',
    'Sem cartão de crédito',
    'Cancele quando quiser',
    'Suporte técnico incluso',
]

// Divide o título em palavras para o word-by-word reveal
function HeadlineWords({ children, className }) {
    const parts = String(children).split(' ')
    return (
        <motion.span
            className={className}
            variants={{ animate: { transition: { staggerChildren: 0.045 } } }}
        >
            {parts.flatMap((word, i) => i < parts.length - 1
                ? [<motion.span key={i} className="inline-block" variants={wordVariant}>{word}</motion.span>, ' ']
                : [<motion.span key={i} className="inline-block" variants={wordVariant}>{word}</motion.span>]
            )}
        </motion.span>
    )
}

export default function CTASection() {
    const { ref, isInView } = useResponsiveInView()
    const [showPulse, setShowPulse] = useState(false)

    // Pulse de atenção no botão após 3s de permanência na seção
    useEffect(() => {
        if (!isInView) return
        const t = setTimeout(() => setShowPulse(true), 3000)
        return () => clearTimeout(t)
    }, [isInView])

    return (
        <section id="cta" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background com gradient-shift */}
            <div className="absolute inset-0 cta-gradient-bg" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left — CTA copy */}
                    <motion.div
                        variants={{ animate: { transition: { staggerChildren: 0.14 } } }}
                        initial="initial"
                        animate={isInView ? 'animate' : 'initial'}
                    >
                        {/* Headline word-by-word */}
                        <motion.h2
                            className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
                            variants={{ animate: { transition: { staggerChildren: 0.045 } } }}
                            style={{ perspective: 1000 }}
                        >
                            <HeadlineWords>Seu petshop merece uma gestão</HeadlineWords>
                            {' '}
                            <motion.span className="text-terracotta" variants={wordVariant}>
                                profissional
                            </motion.span>
                        </motion.h2>

                        <motion.p
                            variants={{
                                initial: { opacity: 0, y: 16 },
                                animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                            }}
                            className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg"
                        >
                            Crie sua conta gratuitamente e tenha acesso completo a todas as funcionalidades. Sem cartão de crédito, sem burocracia.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 16 },
                                animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                            }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            {/* Botão primário com glow + pulse de atenção */}
                            <motion.a
                                href={appRegisterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                    scale: 1.04,
                                    y: -3,
                                    boxShadow: '0 0 28px rgba(224, 122, 95, 0.5), 0 0 56px rgba(224, 122, 95, 0.2)',
                                }}
                                whileTap={{ scale: 0.97, y: 0 }}
                                animate={showPulse ? {
                                    scale: [1, 1.04, 1, 1.04, 1],
                                    boxShadow: [
                                        '0 0 0px rgba(224,122,95,0)',
                                        '0 0 24px rgba(224,122,95,0.45)',
                                        '0 0 0px rgba(224,122,95,0)',
                                        '0 0 24px rgba(224,122,95,0.45)',
                                        '0 0 0px rgba(224,122,95,0)',
                                    ],
                                } : {}}
                                transition={showPulse ? { duration: 1.2, ease: 'easeInOut' } : { duration: 0.2 }}
                                onAnimationComplete={() => setShowPulse(false)}
                                className="btn-shine inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-terracotta/30"
                            >
                                Criar Conta Grátis
                                <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href={whatsappDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-base px-8 py-4 rounded-2xl"
                            >
                                Agendar demonstração
                            </motion.a>
                        </motion.div>

                        {/* Checklist com stagger individual */}
                        <motion.div
                            variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
                            className="space-y-2.5"
                        >
                            {checkItems.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={{
                                        initial: { opacity: 0, x: -16 },
                                        animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                                    }}
                                    className="flex items-center gap-2.5 text-white/80 text-sm"
                                >
                                    <div className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-sage" />
                                    </div>
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — Trust section com stagger nos itens */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3, ease }}
                    >
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                            <h3 className="font-accent font-bold text-xl text-white mb-6">
                                Segurança e confiança
                            </h3>
                            <motion.div
                                variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
                                initial="initial"
                                animate={isInView ? 'animate' : 'initial'}
                                className="space-y-4"
                            >
                                {trustItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.div
                                            key={item.label}
                                            variants={{
                                                initial: { opacity: 0, x: 16 },
                                                animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                                            }}
                                            className="flex items-center gap-4 text-white/80"
                                        >
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <Icon size={20} className="text-terracotta" />
                                            </div>
                                            <span className="text-sm">{item.label}</span>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
