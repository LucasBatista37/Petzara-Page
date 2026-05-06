import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarCheck, Clock, LineChart, Users, PawPrint, BarChart3 } from 'lucide-react'
import { APP_HOST } from '../siteConfig'

const features = [
    {
        icon: CalendarCheck,
        title: 'Agenda inteligente',
        description: 'Controle visual em tempo real de todos os agendamentos com prevenção automática de conflitos. Atualizações sincronizadas entre dispositivos.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: Clock,
        title: 'Agendamento 24h',
        description: 'Página pública com URL do seu petshop. Clientes escolhem o horário e agendam sozinhos — sem te chamar no WhatsApp.',
        color: 'bg-sage/10 text-sage-dark',
    },
    {
        icon: LineChart,
        title: 'Financeiro integrado',
        description: 'Receitas e despesas com gráficos por categoria. Cada agendamento finalizado já cria a transação financeira automaticamente.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: Users,
        title: 'Gestão de equipe',
        description: 'Convide colaboradores com permissões granulares (ler/criar/editar/excluir) por módulo. Cada banhista vê só o que precisa.',
        color: 'bg-sage/10 text-sage-dark',
    },
    {
        icon: PawPrint,
        title: 'Histórico do pet',
        description: 'Raça, porte, observações do tutor e serviços anteriores de cada pet — tudo em um clique, sem depender de memória.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: BarChart3,
        title: 'Decisões sem achismo',
        description: 'Saiba qual serviço mais lucra, qual dia é pico e onde estão os buracos — antes que virem problema.',
        color: 'bg-sage/10 text-sage-dark',
    },
]

export default function SolutionSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="solucao" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-terracotta/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block bg-sage/10 text-sage-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        A solução
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Conheça o{' '}
                        <span className="gradient-text">Petzara</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Tudo que você precisa para organizar, crescer e lucrar — em uma única plataforma feita para quem vive de banho e tosa.
                    </p>
                </motion.div>

                {/* Two-column layout: features + mockup */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Features list */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="bg-white rounded-2xl p-5 border border-sand/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-accent font-bold text-espresso mb-1">{feature.title}</h3>
                                    <p className="text-taupe text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
                            {/* Browser bar */}
                            <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-terracotta/60" />
                                    <div className="w-3 h-3 rounded-full bg-sage/60" />
                                    <div className="w-3 h-3 rounded-full bg-sand" />
                                </div>
                                <div className="flex-1 mx-3">
                                    <div className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs">
                                        {APP_HOST}/agendamentos
                                    </div>
                                </div>
                            </div>

                            {/* Agendamentos screenshot */}
                            <img
                                src="/prints/agendamentos-lista.png"
                                alt="Lista de agendamentos Petzara"
                                className="w-full"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
