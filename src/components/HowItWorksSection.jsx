import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Settings, CalendarPlus } from 'lucide-react'

const steps = [
    {
        icon: UserPlus,
        number: '1',
        title: 'Crie sua conta',
        description: 'Cadastro rápido com e-mail. Sem cartão de crédito, sem burocracia.',
    },
    {
        icon: Settings,
        number: '2',
        title: 'Configure seu petshop',
        description: 'Adicione serviços, horários de funcionamento e convide sua equipe.',
    },
    {
        icon: CalendarPlus,
        number: '3',
        title: 'Comece a agendar',
        description: 'Crie o primeiro agendamento e ative sua página pública.',
    },
]

export default function HowItWorksSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="como-funciona" className="py-20 sm:py-28 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cream-warm via-cream to-cream pointer-events-none" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        É simples
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Comece em{' '}
                        <span className="gradient-text">3 passos</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Do cadastro ao primeiro agendamento em minutos.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-16 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-terracotta via-sage to-terracotta opacity-20" />

                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative text-center"
                                >
                                    {/* Step number circle */}
                                    <div className="relative z-10 mx-auto mb-6">
                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg shadow-terracotta/10 border border-sand/50 flex items-center justify-center mx-auto relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                            <Icon size={32} className="text-terracotta" strokeWidth={1.5} />
                                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-terracotta text-white rounded-lg flex items-center justify-center text-xs font-extrabold shadow-md">
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="font-accent font-bold text-xl text-espresso mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-taupe text-sm leading-relaxed max-w-xs mx-auto">
                                        {step.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
