import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { stripeMonthlyUrl, stripeAnnualUrl } from '../siteConfig'

const features = [
    'Agendamentos ilimitados',
    'Cadastro completo de pets e clientes',
    'Dashboard financeiro com receitas e despesas',
    'Gestão de equipe e colaboradores',
    'Página pública para agendamento online',
    'Suporte por email e WhatsApp',
    'Atualizações automáticas',
    'Dados seguros na nuvem',
]

const plans = [
    {
        name: 'Mensal',
        price: '49,90',
        period: '/mês',
        description: 'Flexibilidade para pagar mês a mês',
        cta: 'Começar Teste Grátis',
        url: stripeMonthlyUrl,
        highlighted: false,
    },
    {
        name: 'Anual',
        price: '499',
        period: '/ano',
        description: 'Equivale a R$ 41,58/mês',
        savings: 'Economize R$ 99,80 (17%)',
        cta: 'Começar Teste Grátis',
        url: stripeAnnualUrl,
        highlighted: true,
    },
]

export default function PricingSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="precos" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sage/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <span className="inline-block bg-sage/10 text-sage-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Preços
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Simples e <span className="gradient-text">justo</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Comece grátis. Escolha o plano quando estiver pronto. Cancele quando quiser.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                            className={`relative bg-white rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                                plan.highlighted
                                    ? 'border-2 border-terracotta shadow-xl shadow-terracotta/15'
                                    : 'border border-sand/60 shadow-md'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    <Sparkles size={12} />
                                    Mais Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="font-accent font-bold text-2xl text-espresso mb-1">{plan.name}</h3>
                                <p className="text-taupe text-sm">{plan.description}</p>
                            </div>

                            <div className="mb-2 flex items-baseline gap-1">
                                <span className="text-taupe font-bold">R$</span>
                                <span className="font-accent text-5xl font-extrabold text-espresso">{plan.price}</span>
                                <span className="text-taupe">{plan.period}</span>
                            </div>

                            {plan.savings ? (
                                <div className="mb-6 inline-flex items-center gap-1 bg-sage/10 text-sage-dark text-xs font-bold px-3 py-1 rounded-full">
                                    {plan.savings}
                                </div>
                            ) : (
                                <div className="mb-6 h-6" aria-hidden="true" />
                            )}

                            <ul className="space-y-3 mb-8">
                                {features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-espresso">
                                        <span
                                            className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                                plan.highlighted
                                                    ? 'bg-terracotta/15 text-terracotta'
                                                    : 'bg-sage/15 text-sage-dark'
                                            }`}
                                        >
                                            <Check size={12} strokeWidth={3} />
                                        </span>
                                        <span className="leading-snug">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={plan.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                                    plan.highlighted
                                        ? 'bg-terracotta hover:bg-terracotta-dark text-white shadow-lg shadow-terracotta/20 hover:-translate-y-0.5'
                                        : 'bg-espresso hover:bg-espresso/90 text-white'
                                }`}
                            >
                                {plan.cta}
                                <ArrowRight size={16} />
                            </a>

                            <p className="mt-4 text-center text-taupe text-xs">
                                7 dias grátis · Sem cartão · Cancele quando quiser
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-taupe text-sm mt-10"
                >
                    Pagamentos processados com segurança via Stripe. Mesmo conjunto de funcionalidades nos dois planos.
                </motion.p>
            </div>
        </section>
    )
}
