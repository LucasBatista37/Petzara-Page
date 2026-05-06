import { motion } from 'framer-motion'
import { UserPlus, Settings, CalendarPlus } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

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
    const { ref, isInView, isMobile } = useResponsiveInView()
    // Mobile: delays mais curtos para que todos os steps sejam vistos no scroll
    const stepDelays = isMobile ? [0, 0.28, 0.56] : [0, 0.52, 1.04]

    return (
        <section id="como-funciona" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/4 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sage/4 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
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

                        {/* Linha conectora animada — "se desenha" da esquerda para a direita */}
                        <div className="hidden md:block absolute top-10 left-[16.666%] right-[16.666%] h-0.5 overflow-hidden">
                            <motion.div
                                className="h-full origin-left bg-gradient-to-r from-terracotta via-sage to-terracotta opacity-30"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 1.0, ease, delay: 0.3 }}
                            />
                        </div>

                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 32 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.48, delay: stepDelays[index], ease }}
                                    className="relative"
                                >
                                    {/* Ícone com spring pop encadeado */}
                                    <div className="relative z-10 mb-6 flex justify-center">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -16 }}
                                            animate={isInView ? { scale: 1, rotate: 0 } : {}}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 200,
                                                damping: 13,
                                                delay: stepDelays[index] + 0.1,
                                            }}
                                            className="w-20 h-20 bg-white rounded-2xl shadow-lg shadow-terracotta/10 border border-sand/50 flex items-center justify-center relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <Icon size={32} className="text-terracotta" strokeWidth={1.5} />
                                            {/* Badge numérico com pop próprio */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={isInView ? { scale: 1 } : {}}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 260,
                                                    damping: 14,
                                                    delay: stepDelays[index] + 0.25,
                                                }}
                                                className="absolute -top-2 -right-2 w-7 h-7 bg-terracotta text-white rounded-lg flex items-center justify-center text-xs font-extrabold shadow-md"
                                            >
                                                {step.number}
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Texto do step */}
                                    <div className="text-center pt-2">
                                        <h3 className="font-accent font-bold text-xl text-espresso mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-taupe text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
