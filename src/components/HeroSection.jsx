import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { appRegisterUrl, APP_HOST } from '../siteConfig'

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-[10%] w-72 h-72 bg-terracotta/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-[20%] w-48 h-48 bg-terracotta/3 rounded-full blur-2xl animate-float-slow" />

                {/* Floating paw prints */}
                <svg aria-hidden="true" className="absolute top-[25%] left-[5%] w-8 h-8 text-terracotta/10 animate-float" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </svg>
                <svg aria-hidden="true" className="absolute top-[60%] right-[8%] w-12 h-12 text-sage/10 animate-float-slow" style={{ animationDelay: '2s' }} viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </svg>
                <svg aria-hidden="true" className="absolute bottom-[20%] left-[15%] w-6 h-6 text-terracotta/8 animate-float" style={{ animationDelay: '4s' }} viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" />
                    <circle cx="160" cy="220" r="45" /><circle cx="256" cy="170" r="50" /><circle cx="352" cy="220" r="45" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        >
                            <Sparkles size={16} />
                            Teste Grátis • Sem Cartão
                        </motion.div>

                        <h1 className="font-accent text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
                            <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-terracotta tracking-tight mb-2">
                                Petzara
                            </span>
                            Seu petshop{' '}
                            <span className="gradient-text">organizado</span>.{' '}
                            <br className="hidden sm:block" />
                            Seus clientes{' '}
                            <span className="gradient-text">felizes</span>.
                        </h1>

                        <p className="text-taupe text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
                            Gerencie agendamentos, clientes, pets e finanças em um único lugar — feito especialmente para petshops de banho e tosa. De caderno para profissional em minutos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href={appRegisterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-lg shadow-terracotta/20"
                            >
                                Começar Teste Grátis
                                <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#solucao"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-sand hover:border-terracotta/40 text-espresso font-bold text-base px-8 py-4 rounded-2xl transition-all"
                            >
                                Ver Demonstração
                            </motion.a>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-taupe">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-sage rounded-full"></span>
                                Teste grátis por 7 dias
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-sage rounded-full"></span>
                                Sem cartão de crédito
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-sage rounded-full"></span>
                                Cancele a qualquer momento
                            </span>
                        </div>
                    </motion.div>

                    {/* Right — Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main dashboard card */}
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
                                            {APP_HOST}/dashboard
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard screenshot */}
                                <img
                                    src="/prints/dashboard.png"
                                    alt="Dashboard Petzara"
                                    className="w-full"
                                    loading="eager"
                                />
                            </div>

                            {/* Floating notification card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 1.2, type: 'spring' }}
                                className="absolute -bottom-4 -left-8 bg-white rounded-xl shadow-xl shadow-espresso/10 border border-sand/50 p-3 flex items-center gap-3 max-w-[200px]"
                            >
                                <div className="w-9 h-9 bg-sage/20 rounded-lg flex items-center justify-center text-sage-dark shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-espresso">Novo agendamento!</div>
                                    <div className="text-[9px] text-taupe">Luna — Banho às 10:30</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
