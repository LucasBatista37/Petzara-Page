import { motion } from 'framer-motion'
import { CalendarCheck, Clock, LineChart, Users, PawPrint, BarChart3 } from 'lucide-react'
import { APP_HOST } from '../siteConfig'
import { ease, useResponsiveInView, getCardViewport } from '../animations/variants'

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
    const { ref, isInView, isMobile } = useResponsiveInView()

    return (
        <section id="solucao" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Dark premium background — espresso warm */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0c] via-[#2c1a14] to-[#1a1208]" />
            <div className="absolute -top-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                 style={{ background: 'var(--color-terracotta)', opacity: 0.08 }} />
            <div className="absolute bottom-0 left-[10%] w-[500px] h-[200px] rounded-full blur-[120px] pointer-events-none"
                 style={{ background: 'var(--color-sage)', opacity: 0.06 }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block bg-white/10 border border-white/15 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                        A solução
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                        Conheça o{' '}
                        <span className="gradient-text">Petzara</span>
                    </h2>
                    <p className="text-white/55 text-lg leading-relaxed">
                        Tudo que você precisa para organizar, crescer e lucrar — em uma única plataforma feita para quem vive de banho e tosa.
                    </p>
                </motion.div>

                {/* Two-column layout: features + mockup */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Feature cards — cada uma anima individualmente */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={getCardViewport()}
                                    transition={{ duration: 0.55, ease }}
                                    className="bg-white/8 rounded-2xl p-5 border border-white/12 backdrop-blur-sm hover:bg-white/12 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-accent font-bold text-white/90 mb-1">{feature.title}</h3>
                                    <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Mockup — delay pequeno para sequenciar após os primeiros cards no desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.7, delay: isMobile ? 0 : 0.2, ease }}
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
