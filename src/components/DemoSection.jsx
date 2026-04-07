import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react'
import { APP_HOST, MARKETING_HOST } from '../siteConfig'

/** Barra de endereço dos mocks: app para o sistema, domínio principal para página pública */
function mockBrowserLine(screenTitle) {
    if (screenTitle === 'Página Pública') {
        return `${MARKETING_HOST}/petshop-da-ana`
    }
    const slug = screenTitle.toLowerCase().replace(/ /g, '-')
    return `${APP_HOST}/${slug}`
}

const screens = [
    {
        title: 'Dashboard',
        description: 'Visão completa do seu negócio em tempo real',
        content: (
            <div className="p-5">
                <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                        { label: 'Faturamento', value: 'R$8.450', sub: '+12%', color: 'bg-sage/10 text-sage-dark' },
                        { label: 'Agendamentos', value: '156', sub: 'este mês', color: 'bg-terracotta/10 text-terracotta' },
                        { label: 'Pets Atendidos', value: '89', sub: 'únicos', color: 'bg-sage/10 text-sage-dark' },
                        { label: 'Ticket Médio', value: 'R$54', sub: '+8%', color: 'bg-terracotta/10 text-terracotta' },
                    ].map((s) => (
                        <div key={s.label} className={`rounded-xl p-3 ${s.color}`}>
                            <div className="text-[9px] font-medium opacity-70">{s.label}</div>
                            <div className="text-base font-extrabold font-accent">{s.value}</div>
                            <div className="text-[9px] font-medium opacity-50">{s.sub}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-cream rounded-xl p-4">
                    <div className="text-xs font-bold text-espresso mb-3">Faturamento — Últimos 7 dias</div>
                    <div className="flex items-end gap-2 h-24">
                        {[65, 80, 45, 90, 70, 100, 85].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full bg-terracotta/20 rounded-t-md" style={{ height: `${h}%` }}>
                                    <div className="w-full bg-terracotta rounded-t-md transition-all" style={{ height: '60%' }} />
                                </div>
                                <span className="text-[8px] text-taupe">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: 'Agenda Visual',
        description: 'Veja todos os atendimentos do dia em cards',
        content: (
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-accent font-bold text-sm">Hoje — 12/03</h4>
                    <div className="flex gap-1">
                        <span className="px-2 py-1 bg-terracotta text-white text-[10px] font-bold rounded-lg">Cards</span>
                        <span className="px-2 py-1 bg-cream text-taupe text-[10px] font-bold rounded-lg">Tabela</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { pet: 'Rex', breed: 'Golden Retriever', time: '09:00', service: 'Banho + Tosa', status: 'Concluído', sc: 'border-l-sage' },
                        { pet: 'Luna', breed: 'Shih Tzu', time: '10:30', service: 'Banho', status: 'Em atend.', sc: 'border-l-terracotta' },
                        { pet: 'Bob', breed: 'Poodle', time: '11:00', service: 'Tosa Higiênica', status: 'Agendado', sc: 'border-l-sand' },
                        { pet: 'Mel', breed: 'Yorkshire', time: '14:00', service: 'Banho + Tosa', status: 'Agendado', sc: 'border-l-sand' },
                    ].map((c) => (
                        <div key={c.pet} className={`bg-cream rounded-xl p-3 border-l-4 ${c.sc}`}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-[10px] font-bold text-terracotta">{c.time}</span>
                                <span className="text-[9px] font-bold text-taupe bg-white px-1.5 py-0.5 rounded">{c.status}</span>
                            </div>
                            <div className="font-bold text-xs text-espresso">{c.pet}</div>
                            <div className="text-[10px] text-taupe">{c.breed}</div>
                            <div className="text-[10px] text-taupe mt-1">{c.service}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: 'Financeiro',
        description: 'Receitas e despesas com gráficos por categoria',
        content: (
            <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-sage/10 rounded-xl p-3">
                        <div className="text-[10px] text-sage-dark font-medium">Receitas</div>
                        <div className="text-lg font-extrabold font-accent text-sage-dark">R$8.450</div>
                    </div>
                    <div className="bg-terracotta/10 rounded-xl p-3">
                        <div className="text-[10px] text-terracotta font-medium">Despesas</div>
                        <div className="text-lg font-extrabold font-accent text-terracotta">R$2.180</div>
                    </div>
                </div>
                <div className="bg-cream rounded-xl p-4">
                    <div className="text-xs font-bold text-espresso mb-3">Transações Recentes</div>
                    {[
                        { desc: 'Banho + Tosa — Rex', value: '+R$85', color: 'text-sage-dark', method: 'PIX' },
                        { desc: 'Shampoo Profissional', value: '-R$45', color: 'text-terracotta', method: 'Cartão' },
                        { desc: 'Banho — Luna', value: '+R$55', color: 'text-sage-dark', method: 'Dinheiro' },
                        { desc: 'Tosa Higiênica — Bob', value: '+R$40', color: 'text-sage-dark', method: 'PIX' },
                    ].map((t) => (
                        <div key={t.desc} className="flex items-center justify-between py-2 border-b border-sand/30 last:border-0 text-xs">
                            <div>
                                <div className="font-semibold text-espresso">{t.desc}</div>
                                <div className="text-[10px] text-taupe">{t.method}</div>
                            </div>
                            <span className={`font-bold ${t.color}`}>{t.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: 'Página Pública',
        description: 'Clientes agendam sozinhos via WhatsApp',
        content: (
            <div className="p-5">
                <div className="bg-cream rounded-xl p-4 text-center mb-4">
                    <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-terracotta" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                            <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                        </svg>
                    </div>
                    <div className="font-accent font-bold text-sm text-espresso">PetShop da Ana</div>
                    <div className="text-[10px] text-taupe">{MARKETING_HOST}/petshop-da-ana</div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-bold text-espresso">Horários Disponíveis — Manhã</div>
                    <div className="grid grid-cols-3 gap-2">
                        {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'].map((t) => (
                            <div key={t} className="bg-white border border-sand rounded-lg py-2 text-center text-xs font-bold text-espresso hover:border-terracotta cursor-pointer transition-colors">
                                {t}
                            </div>
                        ))}
                    </div>
                    <div className="text-xs font-bold text-espresso mt-3">Tarde</div>
                    <div className="grid grid-cols-3 gap-2">
                        {['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map((t) => (
                            <div key={t} className="bg-white border border-sand rounded-lg py-2 text-center text-xs font-bold text-espresso hover:border-terracotta cursor-pointer transition-colors">
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
]

export default function DemoSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((c) => (c - 1 + screens.length) % screens.length)
    const next = () => setCurrent((c) => (c + 1) % screens.length)

    return (
        <section id="demo" className="py-20 sm:py-28 relative overflow-hidden">
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
                    className="max-w-3xl mx-auto"
                >
                    {/* Screen title tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap" role="tablist">
                        {screens.map((screen, i) => (
                            <button
                                key={screen.title}
                                role="tab"
                                aria-selected={current === i}
                                aria-controls={`panel-${i}`}
                                id={`tab-${i}`}
                                onClick={() => setCurrent(i)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${current === i
                                        ? 'bg-terracotta text-white shadow-md'
                                        : 'bg-white text-taupe border border-sand hover:border-terracotta/30'
                                    }`}
                            >
                                {screen.title}
                            </button>
                        ))}
                    </div>

                    {/* Browser frame */}
                    <div className="relative">
                        <div className="absolute -inset-3 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-3xl blur-xl" />
                        <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
                            {/* Browser bar */}
                            <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50" aria-hidden="true">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-terracotta/60" />
                                    <div className="w-3 h-3 rounded-full bg-sage/60" />
                                    <div className="w-3 h-3 rounded-full bg-sand" />
                                </div>
                                <div className="flex-1 mx-3">
                                    <div className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs mx-auto">
                                        {mockBrowserLine(screens[current].title)}
                                    </div>
                                </div>
                            </div>

                            {/* Screen content */}
                            <div
                                id={`panel-${current}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${current}`}
                                className="min-h-[320px]"
                            >
                                {screens[current].content}
                            </div>
                        </div>

                        {/* Nav arrows */}
                        <button
                            onClick={prev}
                            aria-label="Tela anterior"
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all hidden sm:flex"
                        >
                            <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Próxima tela"
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-sand flex items-center justify-center text-espresso hover:text-terracotta hover:scale-110 transition-all hidden sm:flex"
                        >
                            <ChevronRight size={20} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Description */}
                    <div className="text-center mt-6">
                        <h3 className="font-accent font-bold text-lg text-espresso">{screens[current].title}</h3>
                        <p className="text-taupe text-sm">{screens[current].description}</p>
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
                                className={`w-2.5 h-2.5 rounded-full transition-all ${current === i ? 'bg-terracotta w-6' : 'bg-sand'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
