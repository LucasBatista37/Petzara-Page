import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react'
import { APP_HOST } from '../siteConfig'

const screens = [
    {
        title: 'Dashboard',
        description: 'Visão completa do seu negócio em tempo real',
        desktopImage: '/prints/dashboard.png',
        mobileImage: '/prints/mobile/dashboard.png',
        imageAlt: 'Dashboard Petzara',
        browserPath: `${APP_HOST}/dashboard`,
    },
    {
        title: 'Agendamentos',
        description: 'Visualize e gerencie todos os atendimentos do dia',
        desktopImage: '/prints/agendamentos_calendario.png',
        mobileImage: '/prints/mobile/agendamentos.png',
        imageAlt: 'Calendário de agendamentos Petzara',
        browserPath: `${APP_HOST}/agendamentos`,
    },
    {
        title: 'Serviços',
        description: 'Configure serviços, preços e duração de cada atendimento',
        desktopImage: '/prints/servicos.png',
        mobileImage: '/prints/mobile/servicos.png',
        imageAlt: 'Serviços configurados no Petzara',
        browserPath: `${APP_HOST}/servicos`,
    },
    {
        title: 'Clientes',
        description: 'Ficha completa de cada tutor com histórico de atendimentos',
        desktopImage: '/prints/clientes_lista.png',
        mobileImage: '/prints/mobile/clientes.png',
        imageAlt: 'Lista de clientes Petzara',
        browserPath: `${APP_HOST}/clientes`,
    },
    {
        title: 'Pets',
        description: 'Cadastro detalhado com raça, porte e observações especiais',
        desktopImage: '/prints/pets_card.png',
        mobileImage: '/prints/mobile/pets.png',
        imageAlt: 'Pets cadastrados no Petzara',
        browserPath: `${APP_HOST}/pets`,
    },
    {
        title: 'Colaboradores',
        description: 'Gerencie sua equipe e distribua a agenda entre banhistas',
        desktopImage: '/prints/colaboradores_lista.png',
        mobileImage: '/prints/mobile/colaboradores.png',
        imageAlt: 'Colaboradores Petzara',
        browserPath: `${APP_HOST}/colaboradores`,
    },
    {
        title: 'Financeiro',
        description: 'Dashboard financeiro com receitas e despesas',
        desktopImage: '/prints/gestao_financeira_dashboard.png',
        mobileImage: '/prints/mobile/gestao_financeira_dashboard.png',
        imageAlt: 'Dashboard financeiro Petzara',
        browserPath: `${APP_HOST}/financeiro`,
    },
    {
        title: 'Contas a Receber',
        description: 'Controle de todas as receitas e pagamentos pendentes',
        desktopImage: '/prints/gestao_financeira_contas_a_receber.png',
        mobileImage: '/prints/mobile/gestao_financeira_contas_a_receber.png',
        imageAlt: 'Contas a receber Petzara',
        browserPath: `${APP_HOST}/financeiro/contas-a-receber`,
    },
    {
        title: 'Despesas',
        description: 'Registre e categorize todas as saídas do negócio',
        desktopImage: '/prints/gestao_financeira_despesas.png',
        mobileImage: '/prints/mobile/gestao_financeira_despesas.png',
        imageAlt: 'Despesas Petzara',
        browserPath: `${APP_HOST}/financeiro/despesas`,
    },
    {
        title: 'Página Pública',
        description: 'Clientes agendam sozinhos via link exclusivo do petshop',
        desktopImage: '/prints/pagina_publica.png',
        mobileImage: null,
        imageAlt: 'Página pública de agendamento Petzara',
        browserPath: `${APP_HOST}/agendar/petshop-da-ana`,
    },
]

export default function DemoSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [current, setCurrent] = useState(0)
    const [viewMode, setViewMode] = useState('desktop')

    useEffect(() => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            setViewMode('mobile')
        }
    }, [])

    const prev = () => setCurrent((c) => (c - 1 + screens.length) % screens.length)
    const next = () => setCurrent((c) => (c + 1) % screens.length)

    const screen = screens[current]
    const activeImage = viewMode === 'desktop' ? screen.desktopImage : screen.mobileImage

    return (
        <section id="demo" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-terracotta/3 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Desktop / Mobile toggle */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex bg-white border border-sand rounded-2xl p-1 gap-1 shadow-sm">
                            <button
                                onClick={() => setViewMode('desktop')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    viewMode === 'desktop'
                                        ? 'bg-espresso text-white shadow-sm'
                                        : 'text-taupe hover:text-espresso'
                                }`}
                            >
                                <Monitor size={15} />
                                Desktop
                            </button>
                            <button
                                onClick={() => setViewMode('mobile')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    viewMode === 'mobile'
                                        ? 'bg-espresso text-white shadow-sm'
                                        : 'text-taupe hover:text-espresso'
                                }`}
                            >
                                <Smartphone size={15} />
                                Mobile
                            </button>
                        </div>
                    </div>

                    {/* Frame area */}
                    {viewMode === 'desktop' ? (
                        /* ── Browser frame ── */
                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-3xl blur-xl" />
                            <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
                                <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50" aria-hidden="true">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-terracotta/60" />
                                        <div className="w-3 h-3 rounded-full bg-sage/60" />
                                        <div className="w-3 h-3 rounded-full bg-sand" />
                                    </div>
                                    <div className="flex-1 mx-3">
                                        <div className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs mx-auto">
                                            {screen.browserPath}
                                        </div>
                                    </div>
                                </div>
                                <div id={`panel-${current}`} role="tabpanel" aria-labelledby={`tab-${current}`}>
                                    <img src={screen.desktopImage} alt={screen.imageAlt} className="w-full" loading="lazy" />
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
                                <div className="absolute -inset-4 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-[3.5rem] blur-xl" />
                                <div className="relative bg-espresso rounded-[2.8rem] p-[10px] shadow-2xl shadow-espresso/30 w-[300px]">
                                    {/* Dynamic island */}
                                    <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[96px] h-[28px] bg-espresso rounded-full z-10" />
                                    {/* Screen */}
                                    <div
                                        className="bg-white rounded-[2.3rem] overflow-hidden"
                                        id={`panel-${current}`}
                                        role="tabpanel"
                                        aria-labelledby={`tab-${current}`}
                                    >
                                        {activeImage ? (
                                            <img src={activeImage} alt={`${screen.imageAlt} — mobile`} className="w-full" loading="lazy" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-24 px-8 gap-4 text-center">
                                                <div className="w-14 h-14 bg-terracotta/10 rounded-2xl flex items-center justify-center">
                                                    <Smartphone size={26} className="text-terracotta" />
                                                </div>
                                                <div>
                                                    <p className="font-accent font-bold text-espresso text-sm mb-1">Preview mobile</p>
                                                    <p className="text-taupe text-xs leading-relaxed">Mockups em preparação</p>
                                                </div>
                                            </div>
                                        )}
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

                    {/* Description */}
                    <div className="text-center mt-8">
                        <h3 className="font-accent font-bold text-lg text-espresso">{screen.title}</h3>
                        <p className="text-taupe text-sm">{screen.description}</p>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-4" role="tablist">
                        {screens.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-label={`Ir para a tela ${i + 1}`}
                                aria-selected={current === i}
                                onClick={() => setCurrent(i)}
                                className={`h-2.5 rounded-full transition-all ${current === i ? 'bg-terracotta w-6' : 'bg-sand w-2.5'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
