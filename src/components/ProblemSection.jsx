import { motion } from 'framer-motion'
import { CalendarX2, DollarSign, Smartphone, Users, Clock, BarChart3 } from 'lucide-react'
import { ease, useResponsiveInView, getCardViewport } from '../animations/variants'

const problems = [
    {
        icon: CalendarX2,
        emoji: '⏰',
        title: 'O horário duplo que estraga o dia',
        description: 'Dois tutores chegam ao mesmo tempo. Um vai embora irritado. Você ainda vai ouvir sobre isso no Google.',
    },
    {
        icon: DollarSign,
        emoji: '💸',
        title: 'Você fecha o caixa no chute',
        description: 'No fim do mês soma as entradas no celular e reza pra dar lucro. Nunca tem certeza.',
    },
    {
        icon: Smartphone,
        emoji: '📱',
        title: 'O WhatsApp virou o sistema',
        description: 'Agendamentos, confirmações, reclamações e áudios de voz misturados. Qualquer hora você perde um horário importante.',
    },
    {
        icon: Users,
        emoji: '👥',
        title: 'Banhista chega sem saber a agenda',
        description: 'Sua equipe depende de você para saber o que tem no dia. Você responde mensagem antes de tomar café.',
    },
    {
        icon: Clock,
        emoji: '🕐',
        title: 'Horas que poderiam ser pets atendidos',
        description: 'Cada hora atualizando planilha é um banho que não foi feito e um cliente que esperou.',
    },
    {
        icon: BarChart3,
        emoji: '📊',
        title: 'Você não sabe o que mais lucra',
        description: 'Tosa completa ou banho simples? Terça ou sábado? Sem dados é chute, e chute custa dinheiro.',
    },
]

export default function ProblemSection() {
    // ref apenas para o cabeçalho
    const { ref, isInView } = useResponsiveInView()

    return (
        <section id="problema" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
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

                {/* Cards — cada um anima individualmente ao entrar na tela */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {problems.map((problem) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={getCardViewport()}
                            transition={{ duration: 0.55, ease }}
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

                {/* Callout — usa whileInView próprio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={getCardViewport()}
                    transition={{ duration: 0.6, ease }}
                    className="mt-12 max-w-2xl mx-auto"
                >
                    <div className="flex gap-4 items-start">
                        <span className="text-2xl mt-0.5 shrink-0">💬</span>
                        <p className="text-taupe text-base italic leading-relaxed">
                            "Na prática: você anota no caderno, agenda pelo WhatsApp, fecha o caixa no Excel — e no fim do mês ainda não sabe se teve lucro."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
