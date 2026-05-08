import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react'
import { APP_HOST } from '../siteConfig'
import { ease, useResponsiveInView } from '../animations/variants'

const FADE = { duration: 0.28, ease }

const screens = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Visão completa do seu negócio em tempo real',
        desktopImage: '/prints/dashboard.webp',
        mobileImage: '/prints/mobile/dashboard.webp',
        imageAlt: 'Dashboard Petzara',
        browserPath: `${APP_HOST}/dashboard`,
    },
    {
        id: 'agendamentos',
        title: 'Agendamentos',
        description: 'Visualize e gerencie todos os atendimentos do dia',
        desktopImage: '/prints/agendamentos-calendario.webp',
        mobileImage: '/prints/mobile/agendamentos.webp',
        imageAlt: 'Calendário de agendamentos Petzara',
        browserPath: `${APP_HOST}/agendamentos`,
    },
    {
        id: 'servicos',
        title: 'Serviços',
        description: 'Configure serviços, preços e duração de cada atendimento',
        desktopImage: '/prints/servicos.webp',
        mobileImage: '/prints/mobile/servicos.webp',
        imageAlt: 'Serviços configurados no Petzara',
        browserPath: `${APP_HOST}/servicos`,
    },
    {
        id: 'clientes',
        title: 'Clientes',
        description: 'Ficha completa de cada tutor com histórico de atendimentos',
        desktopImage: '/prints/clientes-lista.webp',
        mobileImage: '/prints/mobile/clientes.webp',
        imageAlt: 'Lista de clientes Petzara',
        browserPath: `${APP_HOST}/clientes`,
    },
    {
        id: 'pets',
        title: 'Pets',
        description: 'Cadastro detalhado com raça, porte e observações especiais',
        desktopImage: '/prints/pets-card.webp',
        mobileImage: '/prints/mobile/pets.webp',
        imageAlt: 'Pets cadastrados no Petzara',
        browserPath: `${APP_HOST}/pets`,
    },
    {
        id: 'colaboradores',
        title: 'Colaboradores',
        description: 'Gerencie sua equipe e distribua a agenda entre banhistas',
        desktopImage: '/prints/colaboradores-lista.webp',
        mobileImage: '/prints/mobile/colaboradores.webp',
        imageAlt: 'Colaboradores Petzara',
        browserPath: `${APP_HOST}/colaboradores`,
    },
    {
        id: 'financeiro',
        title: 'Financeiro',
        description: 'Dashboard financeiro com receitas e despesas',
        desktopImage: '/prints/financeiro-dashboard.webp',
        mobileImage: '/prints/mobile/financeiro-dashboard.webp',
        imageAlt: 'Dashboard financeiro Petzara',
        browserPath: `${APP_HOST}/financeiro`,
    },
    {
        id: 'contas-receber',
        title: 'Contas a Receber',
        description: 'Controle de todas as receitas e pagamentos pendentes',
        desktopImage: '/prints/financeiro-contas-a-receber.webp',
        mobileImage: '/prints/mobile/financeiro-contas-a-receber.webp',
        imageAlt: 'Contas a receber Petzara',
        browserPath: `${APP_HOST}/financeiro/contas-a-receber`,
    },
    {
        id: 'despesas',
        title: 'Despesas',
        description: 'Registre e categorize todas as saídas do negócio',
        desktopImage: '/prints/financeiro-despesas.webp',
        mobileImage: '/prints/mobile/financeiro-despesas.webp',
        imageAlt: 'Despesas Petzara',
        browserPath: `${APP_HOST}/financeiro/despesas`,
    },
    {
        id: 'pagina-publica',
        title: 'Página Pública',
        description: 'Clientes agendam sozinhos via link exclusivo do petshop',
        desktopImage: '/prints/pagina-publica.webp',
        mobileImage: '/prints/mobile/pagina-publica.webp',
        imageAlt: 'Página pública de agendamento Petzara',
        browserPath: `${APP_HOST}/agendar/petshop-da-ana`,
    },
]


export default function DemoSection() {
    const { ref, isInView } = useResponsiveInView()
    const [current, setCurrent] = useState(0)
    const [viewMode, setViewMode] = useState('desktop')

    useEffect(() => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            setViewMode('mobile')
        }
    }, [])

    const navigate = (nextIdx) => setCurrent(nextIdx)
    const prev = () => navigate((current - 1 + screens.length) % screens.length)
    const next = () => navigate((current + 1) % screens.length)

    const screen = screens[current]

    return (
        <section id="demo" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <span className="inline-block bg-sage/10 text-sage-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Veja em ação
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Simples por fora,{' '}
                        <span className="gradient-text">poderoso</span> por dentro
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Cada tela foi pensada para o dia a dia do petshop — sem complicação.
                    </p>
                </motion.div>

                {/* Demo carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.65, delay: 0.25, ease }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Desktop / Mobile toggle com layoutId */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex bg-white border border-sand rounded-2xl p-1 gap-1 shadow-sm">
                            {[
                                { mode: 'desktop', Icon: Monitor, label: 'Desktop' },
                                { mode: 'mobile',  Icon: Smartphone, label: 'Mobile' },
                            ].map(({ mode, Icon, label }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors z-10"
                                    style={{ color: viewMode === mode ? 'white' : undefined }}
                                >
                                    {viewMode === mode && (
                                        <motion.span
                                            layoutId="demo-device-pill"
                                            className="absolute inset-0 bg-espresso rounded-xl shadow-sm"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2" style={{ color: viewMode === mode ? 'white' : '' }}>
                                        <Icon size={15} aria-hidden="true" />
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Frame area */}
                    {viewMode === 'desktop' ? (
                        /* ── Browser frame ── */
                        <div className="relative">
                            <div
                                className="absolute -inset-3 rounded-3xl blur-xl opacity-40"
                                style={{
                                    background: 'linear-gradient(225deg, var(--color-terracotta), var(--color-sage))',
                                    transition: 'background 0.6s ease',
                                }}
                            />
                            <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
                                <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50" aria-hidden="true">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-terracotta/60" />
                                        <div className="w-3 h-3 rounded-full bg-sage/60" />
                                        <div className="w-3 h-3 rounded-full bg-sand" />
                                    </div>
                                    <div className="flex-1 mx-3">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={screen.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs mx-auto"
                                            >
                                                {screen.browserPath}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                                {/* Cross-fade: todas as imagens empilhadas, só a ativa é opaca */}
                                <div className="grid" role="tabpanel" aria-labelledby={`tab-${current}`}>
                                    {screens.map(s => (
                                        <motion.img
                                            key={s.id + '-desktop'}
                                            src={s.desktopImage}
                                            alt={s.imageAlt}
                                            className="w-full object-cover"
                                            style={{ gridArea: '1 / 1' }}
                                            animate={{ opacity: s.id === screen.id ? 1 : 0 }}
                                            transition={FADE}
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button onClick={prev} aria-label="Tela anterior" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all">
                                <ChevronLeft size={20} aria-hidden="true" />
                            </button>
                            <button onClick={next} aria-label="Próxima tela" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all">
                                <ChevronRight size={20} aria-hidden="true" />
                            </button>
                        </div>
                    ) : (
                        /* ── Phone frame ── */
                        <div className="flex justify-center">
                            <div className="relative">
                                <div
                                    className="absolute -inset-4 rounded-[3.5rem] blur-xl opacity-40"
                                    style={{
                                        background: 'linear-gradient(225deg, var(--color-terracotta), var(--color-sage))',
                                        transition: 'background 0.6s ease',
                                    }}
                                />
                                <div className="relative bg-espresso rounded-[2.8rem] p-[10px] shadow-2xl shadow-espresso/30 w-[300px]">
                                    <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[96px] h-[28px] bg-espresso rounded-full z-10" />
                                    {/* Cross-fade: todas as imagens mobile empilhadas */}
                                    <div className="grid rounded-[2.3rem] overflow-hidden" role="tabpanel" aria-labelledby={`tab-${current}`}>
                                        {screens.map(s => (
                                            <motion.img
                                                key={s.id + '-mobile'}
                                                src={s.mobileImage}
                                                alt={`${s.imageAlt} — mobile`}
                                                className="w-full object-cover"
                                                style={{ gridArea: '1 / 1' }}
                                                animate={{ opacity: s.id === screen.id ? 1 : 0 }}
                                                transition={FADE}
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button onClick={prev} aria-label="Tela anterior" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-full sm:-ml-2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all">
                                    <ChevronLeft size={20} aria-hidden="true" />
                                </button>
                                <button onClick={next} aria-label="Próxima tela" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-full sm:ml-2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all">
                                    <ChevronRight size={20} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Description com fade na troca */}
                    <div className="text-center mt-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={screen.id + '-desc'}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2, ease }}
                            >
                                <h3 className="font-accent font-bold text-lg text-espresso">{screen.title}</h3>
                                <p className="text-taupe text-sm">{screen.description}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-4" role="tablist">
                        {screens.map((s, i) => (
                            <button
                                key={s.id}
                                role="tab"
                                aria-label={`Ir para ${s.title}`}
                                aria-selected={current === i}
                                onClick={() => navigate(i)}
                                className={`h-2.5 rounded-full transition-all ${current === i ? 'bg-terracotta w-6' : 'bg-sand w-2.5'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
