import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarX2, DollarSign, Smartphone, Users, Clock, BarChart3 } from 'lucide-react'

const problems = [
    {
        icon: CalendarX2,
        emoji: '⏰',
        title: 'Conflitos de horário',
        description: 'Dois pets marcados para o mesmo horário sem saber. Clientes irritados e retrabalho.',
    },
    {
        icon: DollarSign,
        emoji: '💸',
        title: 'Sem visão financeira',
        description: 'Não sabe quanto entra e quanto sai por mês. Decisões no escuro.',
    },
    {
        icon: Smartphone,
        emoji: '📱',
        title: 'WhatsApp lotado',
        description: 'Mensagens pessoais misturadas com agendamentos. Informações se perdem.',
    },
    {
        icon: Users,
        emoji: '👥',
        title: 'Equipe no escuro',
        description: 'Colaboradores dependem do dono para ver a agenda. Gargalo operacional.',
    },
    {
        icon: Clock,
        emoji: '🕐',
        title: 'Tempo desperdiçado',
        description: 'Horas gastas organizando cadernos e planilhas em vez de atender mais pets.',
    },
    {
        icon: BarChart3,
        emoji: '📊',
        title: 'Sem dados',
        description: 'Não sabe qual serviço mais vende, qual horário é pico ou se está lucrando.',
    },
]

export default function ProblemSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="problema" className="py-20 sm:py-28 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-warm to-cream pointer-events-none" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Reconhece essa rotina?
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        A desorganização está{' '}
                        <span className="text-terracotta">custando clientes</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        A maioria dos petshops perde dinheiro por falta de organização — não por falta de clientes.
                    </p>
                </motion.div>

                {/* Problem Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-2xl p-6 border border-sand/60 hover:border-terracotta/30 hover:shadow-lg hover:shadow-terracotta/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">{problem.emoji}</div>
                                <div>
                                    <h3 className="font-accent font-bold text-espresso text-lg mb-1">
                                        {problem.title}
                                    </h3>
                                    <p className="text-taupe text-sm leading-relaxed">
                                        {problem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-taupe text-base italic">
                        "Você anota no caderno, recebe mensagens no WhatsApp, e no final do mês não sabe se deu lucro ou prejuízo."
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
