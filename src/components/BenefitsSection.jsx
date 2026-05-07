import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { CalendarCheck, PawPrint, Wallet, Globe, Users, BarChart3, ArrowRight } from 'lucide-react'
import { ease, useResponsiveInView, getCardViewport } from '../animations/variants'
import { appRegisterUrl } from '../siteConfig'

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

function BenefitCard({ benefit }) {
    const isTerracotta = benefit.color === 'terracotta'
    const Icon = benefit.icon
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const tilt = useTilt(isTouchDevice)
    // Cada card tem seu próprio viewport — anima quando ELE entra na tela, não a seção inteira
    const viewport = getCardViewport()

    return (
        <motion.div
            ref={tilt.ref}
            style={tilt.style}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
                hidden: { opacity: 0, y: 28 },
                // Mobile: 0.65s — mais lento para ser perceptível em tela menor
                // Desktop: 0.5s — elegante e rápido
                visible: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.65 : 0.5, ease } },
            }}
            className="group bg-white rounded-2xl p-7 border border-sand/60 hover:border-terracotta/30 hover:shadow-xl hover:shadow-terracotta/5 transition-colors duration-300 cursor-default"
        >
            {/* Ícone com spring pop — herdado do estado do pai via variants */}
            <motion.div
                variants={{
                    hidden: { scale: 0, rotate: -12 },
                    // delay: 0.12 — entra logo após o card começar a subir
                    visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 12, delay: 0.12 } },
                }}
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
    // ref apenas para o cabeçalho da seção — não afeta mais os cards
    const { ref, isInView } = useResponsiveInView()

    return (
        <section id="beneficios" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho — seção-level está correto: o título fica no topo e é visível primeiro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
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

                {/* Grid — cada card dispara ao entrar na tela; o scroll é o stagger */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {benefits.map((benefit) => (
                        <BenefitCard key={benefit.title} benefit={benefit} />
                    ))}
                </div>

                {/* CTA ao final — momento de menor resistência após ver os benefícios */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={getCardViewport()}
                    transition={{ duration: 0.55, ease }}
                    className="mt-14 text-center"
                >
                    <a
                        href={appRegisterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Quero esses benefícios — testar grátis
                        <ArrowRight size={18} />
                    </a>
                    <p className="mt-3 text-taupe text-sm">
                        30 dias grátis · Sem cartão · Cancele quando quiser
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
