import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarCheck, PawPrint, Wallet, Globe, Users, BarChart3 } from 'lucide-react'

const benefits = [
    {
        icon: CalendarCheck,
        title: 'Fim do conflito de horário',
        description: 'Nunca mais dois tutores no mesmo slot. O sistema bloqueia automaticamente — você nem precisa checar.',
        color: 'terracotta',
    },
    {
        icon: PawPrint,
        title: 'Histórico sempre à mão',
        description: 'Raça, porte, observações do tutor e serviços anteriores do pet — tudo em um clique, sem depender de memória.',
        color: 'sage',
    },
    {
        icon: Wallet,
        title: 'Caixa que se fecha sozinho',
        description: 'Agendamento finalizado → transação financeira criada automaticamente. Você fecha o dia sem digitar nada.',
        color: 'terracotta',
    },
    {
        icon: Globe,
        title: 'Cliente agenda enquanto você dorme',
        description: 'Sua página fica disponível 24h. Clientes escolhem horário, confirmam e pronto — sem mensagem nenhuma.',
        color: 'sage',
    },
    {
        icon: Users,
        title: 'Equipe que funciona sem você',
        description: 'Cada banhista vê sua própria agenda. Permissões por função. Você para de ser o intermediário de tudo.',
        color: 'terracotta',
    },
    {
        icon: BarChart3,
        title: 'Decisões sem achismo',
        description: 'Saiba qual serviço mais lucra, qual dia é pico e onde estão os buracos — antes que virem problema.',
        color: 'sage',
    },
]

export default function BenefitsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="beneficios" className="py-20 sm:py-28 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-warm pointer-events-none" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Resultados reais
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Mais organização.{' '}
                        <span className="gradient-text">Mais lucro.</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Não é só tecnologia — é tempo de volta, dinheiro no bolso e tranquilidade para cuidar do que importa.
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon
                        const isTerracotta = benefit.color === 'terracotta'
                        return (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl p-7 border border-sand/60 hover:border-terracotta/30 hover:shadow-xl hover:shadow-terracotta/5 transition-all duration-300 hover:-translate-y-1.5"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${isTerracotta ? 'bg-terracotta/10 text-terracotta' : 'bg-sage/10 text-sage-dark'
                                    }`}>
                                    <Icon size={26} strokeWidth={2} />
                                </div>
                                <h3 className="font-accent font-bold text-lg text-espresso mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-taupe text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
