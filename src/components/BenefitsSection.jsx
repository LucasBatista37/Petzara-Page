import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { CalendarCheck, PawPrint, Wallet, Globe, Users, BarChart3 } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'

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

// Hook de tilt 3D — desativado em touch para não interferir com scroll
function useTilt(disabled = false) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5])
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5])

    if (disabled) return { ref, style: {}, onMouseMove: undefined, onMouseLeave: undefined }

    const onMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    const onMouseLeave = () => { x.set(0); y.set(0) }

    return { ref, style: { rotateX, rotateY, transformPerspective: 900 }, onMouseMove, onMouseLeave }
}

function BenefitCard({ benefit, index, isInView, isMobile }) {
    const isTerracotta = benefit.color === 'terracotta'
    const Icon = benefit.icon
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
    const tilt = useTilt(isTouchDevice)

    // Mobile: stagger mais curto para não perder a animação no scroll
    const cardDelay  = isMobile ? index * 0.06        : index * 0.1
    const iconDelay  = isMobile ? index * 0.06 + 0.10 : index * 0.1 + 0.18

    return (
        <motion.div
            ref={tilt.ref}
            style={tilt.style}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: cardDelay, ease }}
            className="group bg-white rounded-2xl p-7 border border-sand/60 hover:border-terracotta/30 hover:shadow-xl hover:shadow-terracotta/5 transition-colors duration-300 cursor-default"
        >
            {/* Ícone com spring pop */}
            <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', stiffness: 220, damping: 12, delay: iconDelay }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                    isTerracotta ? 'bg-terracotta/10 text-terracotta' : 'bg-sage/10 text-sage-dark'
                }`}
            >
                <Icon size={26} strokeWidth={2} />
            </motion.div>

            <h3 className="font-accent font-bold text-lg text-espresso mb-2">
                {benefit.title}
            </h3>
            <p className="text-taupe text-sm leading-relaxed">
                {benefit.description}
            </p>
        </motion.div>
    )
}

export default function BenefitsSection() {
    const { ref, isInView, isMobile } = useResponsiveInView()

    return (
        <section id="beneficios" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-sage/4 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-terracotta/4 rounded-full blur-3xl" />
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
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={benefit.title}
                            benefit={benefit}
                            index={index}
                            isInView={isInView}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
