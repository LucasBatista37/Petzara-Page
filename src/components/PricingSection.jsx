import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Star, Zap } from 'lucide-react'
import { stripeMonthlyUrl, stripeAnnualUrl } from '../siteConfig'
import { ease, useResponsiveInView, getCardViewport } from '../animations/variants'

const sharedFeatures = [
    'Agendamentos ilimitados',
    'Cadastro completo de pets e clientes',
    'Dashboard financeiro com receitas e despesas',
    'Gestão de equipe e colaboradores',
    'Página pública para agendamento online',
    'Suporte por email e WhatsApp',
    'Atualizações automáticas',
    'Dados seguros na nuvem',
]

export default function PricingSection() {
    const { ref, isInView } = useResponsiveInView()

    return (
        <section id="precos" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Dark premium background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0c] via-[#2c1a14] to-[#1a1208]" />
            <div className="absolute -top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                 style={{ background: 'var(--color-terracotta)', opacity: 0.08 }} />
            <div className="absolute bottom-0 right-[10%] w-[500px] h-[200px] rounded-full blur-[120px] pointer-events-none"
                 style={{ background: 'var(--color-sage)', opacity: 0.06 }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="inline-block bg-white/10 border border-white/15 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                        Preços
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                        Simples e <span className="gradient-text">justo</span>
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed mb-5">
                        Comece grátis. Escolha o plano quando estiver pronto.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-terracotta/20 border border-terracotta/35 text-terracotta px-4 py-2 rounded-full text-sm font-bold">
                        <Zap size={14} />
                        Preço de fundador para os 10 primeiros petshops
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Plano Mensal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.6, ease }}
                        className="relative rounded-2xl p-8 backdrop-blur-sm border border-white/12 bg-white/8 shadow-md shadow-black/20 transition-all hover:-translate-y-1"
                    >
                        <div className="mb-6">
                            <h3 className="font-accent font-bold text-2xl text-white mb-1">Mensal</h3>
                            <p className="text-white/65 text-sm">Flexibilidade para pagar mês a mês</p>
                        </div>

                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-white/65 font-bold">R$</span>
                            <span className="font-accent text-5xl font-extrabold text-white">49,90</span>
                            <span className="text-white/65">/mês</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {sharedFeatures.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                                    <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-white/15 text-white/70">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={stripeMonthlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all bg-white/15 hover:bg-white/25 text-white border border-white/20"
                        >
                            Testar grátis por 30 dias
                            <ArrowRight size={16} />
                        </a>

                        <p className="mt-4 text-center text-white/40 text-xs">
                            30 dias grátis · Sem cartão · Cancele quando quiser
                        </p>
                    </motion.div>

                    {/* Plano Anual — destacado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.6, delay: 0.08, ease }}
                        className="relative rounded-2xl p-8 backdrop-blur-sm border-2 border-terracotta/70 bg-white/12 shadow-xl shadow-terracotta/20 transition-all hover:-translate-y-1"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            <Star size={11} fill="currentColor" />
                            Mais Popular
                        </div>

                        <div className="mb-6">
                            <h3 className="font-accent font-bold text-2xl text-white mb-1">Anual</h3>
                            <p className="text-white/65 text-sm">Equivale a R$ 41,58/mês</p>
                        </div>

                        <div className="mb-2 flex items-baseline gap-1">
                            <span className="text-white/65 font-bold">R$</span>
                            <span className="font-accent text-5xl font-extrabold text-white">499</span>
                            <span className="text-white/65">/ano</span>
                        </div>

                        <div className="mb-8 inline-flex items-center gap-1 bg-sage/20 text-sage text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles size={11} />
                            Economize R$ 99,80 — 2 meses grátis
                        </div>

                        <ul className="space-y-3 mb-8">
                            {sharedFeatures.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                                    <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-terracotta/25 text-terracotta">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={stripeAnnualUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all bg-terracotta hover:bg-terracotta-dark text-white shadow-lg shadow-terracotta/30 hover:-translate-y-0.5"
                        >
                            Garantir preço de fundador
                            <ArrowRight size={16} />
                        </a>

                        <p className="mt-4 text-center text-white/40 text-xs">
                            30 dias grátis · Sem cartão · Cancele quando quiser
                        </p>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={getCardViewport()}
                    transition={{ duration: 0.6, ease }}
                    className="text-center text-white/40 text-sm mt-10"
                >
                    Pagamentos processados com segurança via Stripe. Mesmo plano de funcionalidades nos dois planos.
                </motion.p>
            </div>
        </section>
    )
}
