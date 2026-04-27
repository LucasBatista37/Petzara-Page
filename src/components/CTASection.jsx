import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check, Shield, Headphones, RefreshCw, CreditCard, Mail, Smartphone } from 'lucide-react'
import { appRegisterUrl } from '../siteConfig'

const trustItems = [
    { icon: Shield, label: 'Dados seguros na nuvem com criptografia' },
    { icon: Headphones, label: 'Suporte técnico por e-mail e WhatsApp' },
    { icon: RefreshCw, label: 'Atualizações constantes com novas funcionalidades' },
    { icon: CreditCard, label: 'Pagamento seguro processado pelo Stripe' },
    { icon: Mail, label: 'Verificação de e-mail para proteção da conta' },
    { icon: Smartphone, label: 'Instala como app no Android (PWA + TWA)' },
]

export default function CTASection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="cta" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-espresso via-[#3a302c] to-espresso" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — CTA copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                            Seu petshop merece uma gestão{' '}
                            <span className="text-terracotta">profissional</span>
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                            Crie sua conta gratuitamente e tenha acesso completo a todas as funcionalidades. Sem cartão de crédito, sem burocracia.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <motion.a
                                href={appRegisterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/30"
                            >
                                Criar Conta Grátis
                                <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#demo"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all hover:bg-white/15"
                            >
                                Ver demonstração
                            </motion.a>
                        </div>

                        {/* Trust checklist */}
                        <div className="space-y-2.5">
                            {['Teste grátis por 30 dias', 'Sem cartão de crédito', 'Cancele quando quiser', 'Suporte técnico incluso'].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 text-white/80 text-sm">
                                    <div className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-sage" />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Trust section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                            <h3 className="font-accent font-bold text-xl text-white mb-6">
                                Segurança e confiança
                            </h3>
                            <div className="space-y-4">
                                {trustItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.label} className="flex items-center gap-4 text-white/80">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <Icon size={20} className="text-terracotta" />
                                            </div>
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
