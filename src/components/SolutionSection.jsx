import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarCheck, PawPrint, LineChart, Globe, Users, Shield } from 'lucide-react'
import { APP_HOST } from '../siteConfig'

const features = [
    {
        icon: CalendarCheck,
        title: 'Agenda inteligente',
        description: 'Controle visual de todos os agendamentos com prevenção automática de conflitos de horário.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: PawPrint,
        title: 'Cadastro completo',
        description: 'Ficha detalhada com espécie, raça, porte, observações especiais e vínculo com o tutor.',
        color: 'bg-sage/10 text-sage-dark',
    },
    {
        icon: LineChart,
        title: 'Financeiro integrado',
        description: 'Receitas e despesas lado a lado, gráficos por categoria e saldo em tempo real.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: Globe,
        title: 'Página pública',
        description: 'URL exclusiva onde clientes veem horários disponíveis e agendam via WhatsApp.',
        color: 'bg-sage/10 text-sage-dark',
    },
    {
        icon: Users,
        title: 'Gestão de equipe',
        description: 'Convide colaboradores, defina permissões e distribua a agenda entre banhistas.',
        color: 'bg-terracotta/10 text-terracotta',
    },
    {
        icon: Shield,
        title: 'Seguro e confiável',
        description: 'Dados na nuvem com criptografia. Nunca mais perca informações em cadernos.',
        color: 'bg-sage/10 text-sage-dark',
    },
]

export default function SolutionSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="solucao" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background */}
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
                        <div className="absolute -inset-4 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-3xl blur-2xl" />
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

                            {/* Appointments mock */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-accent font-bold text-sm text-espresso">Agendamentos — Hoje</h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 bg-terracotta text-white text-[10px] font-bold rounded-lg">+ Novo</div>
                                    </div>
                                </div>

                                {/* Table header */}
                                <div className="grid grid-cols-5 gap-2 text-[10px] font-bold text-taupe uppercase tracking-wider pb-2 border-b border-sand/50">
                                    <span>Horário</span>
                                    <span>Pet</span>
                                    <span>Tutor</span>
                                    <span>Serviço</span>
                                    <span>Status</span>
                                </div>

                                {/* Table rows */}
                                {[
                                    { time: '08:30', pet: 'Thor', tutor: 'Maria S.', service: 'Banho', status: 'Concluído', statusColor: 'bg-sage/20 text-sage-dark' },
                                    { time: '09:00', pet: 'Bella', tutor: 'João P.', service: 'Banho + Tosa', status: 'Concluído', statusColor: 'bg-sage/20 text-sage-dark' },
                                    { time: '10:30', pet: 'Luna', tutor: 'Ana C.', service: 'Tosa Higiênica', status: 'Em atend.', statusColor: 'bg-terracotta/20 text-terracotta' },
                                    { time: '11:00', pet: 'Bob', tutor: 'Carlos M.', service: 'Banho', status: 'Agendado', statusColor: 'bg-sand text-taupe' },
                                    { time: '14:00', pet: 'Mel', tutor: 'Paula R.', service: 'Banho + Tosa', status: 'Agendado', statusColor: 'bg-sand text-taupe' },
                                    { time: '15:30', pet: 'Max', tutor: 'Lucas F.', service: 'Tosa Completa', status: 'Agendado', statusColor: 'bg-sand text-taupe' },
                                ].map((row) => (
                                    <div key={row.time + row.pet} className="grid grid-cols-5 gap-2 py-2.5 border-b border-sand/30 text-xs items-center">
                                        <span className="font-mono font-bold text-terracotta">{row.time}</span>
                                        <span className="font-semibold text-espresso">{row.pet}</span>
                                        <span className="text-taupe">{row.tutor}</span>
                                        <span className="text-taupe">{row.service}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-center ${row.statusColor}`}>
                                            {row.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
