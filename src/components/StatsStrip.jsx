import { motion } from 'framer-motion'
import { Clock, CalendarCheck, CreditCard, LayoutDashboard } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

const stats = [
    {
        icon: Clock,
        value: 'Até 5h',
        label: 'economizadas por semana em agendamentos manuais',
        color: 'terracotta',
    },
    {
        icon: CalendarCheck,
        value: '0 conflitos',
        label: 'de horário com a agenda inteligente do Petzara',
        color: 'sage',
    },
    {
        icon: CreditCard,
        value: '30 dias',
        label: 'de teste grátis, sem cartão de crédito',
        color: 'terracotta',
    },
    {
        icon: LayoutDashboard,
        value: '1 sistema',
        label: 'para agenda, clientes, equipe e financeiro',
        color: 'sage',
    },
]

export default function StatsStrip() {
    const { ref, isInView } = useResponsiveInView()

    return (
        <section className="py-10 sm:py-12 border-y border-sand/60 bg-cream-warm relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D10 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />
            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon
                        const isTerracotta = stat.color === 'terracotta'
                        return (
                            <motion.div
                                key={stat.value}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                                className="flex flex-col items-center text-center gap-3"
                            >
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                                    isTerracotta ? 'bg-terracotta/10 text-terracotta' : 'bg-sage/15 text-sage-dark'
                                }`}>
                                    <Icon size={22} strokeWidth={1.75} />
                                </div>
                                <div>
                                    <div className={`font-accent font-extrabold text-2xl sm:text-3xl leading-none mb-1 ${
                                        isTerracotta ? 'text-terracotta' : 'text-sage-dark'
                                    }`}>
                                        {stat.value}
                                    </div>
                                    <p className="text-taupe text-xs sm:text-sm leading-snug max-w-[160px] mx-auto">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
