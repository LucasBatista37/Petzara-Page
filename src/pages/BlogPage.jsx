import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, ArrowLeft } from 'lucide-react'
import { blogPosts, categoryColors } from '../data/blogPosts'
import { fadeUp, staggerContainer, cardVariant, getCardViewport } from '../animations/variants'
import { appRegisterUrl } from '../siteConfig'

function BlogCard({ post }) {
    const colors = categoryColors[post.category] ?? categoryColors['Organização']
    return (
        <motion.article
            variants={cardVariant}
            className="group bg-white rounded-2xl border border-sand/60 hover:border-terracotta/30 hover:shadow-lg hover:shadow-terracotta/5 transition-all duration-300 overflow-hidden flex flex-col"
        >
            <div className="px-6 pt-5">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {post.category}
                </span>
            </div>
            <div className="p-6 flex flex-col flex-1 gap-3">
                <h2 className="font-accent font-bold text-lg text-espresso leading-snug group-hover:text-terracotta transition-colors">
                    {post.title}
                </h2>
                <p className="text-taupe text-sm leading-relaxed flex-1">
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-taupe/70 pt-1">
                    <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" />
                        {post.readingTime}
                    </span>
                    <span>
                        {new Date(post.publishedAt + 'T12:00:00').toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                </div>
                <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-terracotta font-semibold text-sm hover:gap-2.5 transition-all mt-1"
                    aria-label={`Ler artigo: ${post.title}`}
                >
                    Ler artigo
                    <ArrowRight size={14} />
                </Link>
            </div>
        </motion.article>
    )
}

export default function BlogPage() {
    const categories = ['Todos', ...new Set(blogPosts.map(p => p.category))]
    const [activeCategory, setActiveCategory] = useState('Todos')
    const filtered = activeCategory === 'Todos'
        ? blogPosts
        : blogPosts.filter(p => p.category === activeCategory)

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Blog — Petzara'
        const desc = document.querySelector('meta[name="description"]')
        const prev = desc?.getAttribute('content') ?? ''
        if (desc) {
            desc.setAttribute('content', 'Guias práticos para donos de petshop: agendamento, finanças, gestão de equipe e atendimento ao cliente.')
        }
        return () => {
            document.title = 'Petzara — Sistema de Gestão para Petshops | Agendamento Online'
            if (desc) desc.setAttribute('content', prev)
        }
    }, [])

    return (
        <div className="min-h-screen bg-cream text-espresso">

            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-sand/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-taupe hover:text-terracotta transition-colors"
                    >
                        <ArrowLeft size={18} aria-hidden="true" />
                        Voltar ao início
                    </Link>
                    <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="Petzara — página inicial">
                        <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform">
                            <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" fill="#E07A5F" />
                            <circle cx="160" cy="220" r="45" fill="#81B29A" />
                            <circle cx="256" cy="170" r="50" fill="#E07A5F" />
                            <circle cx="352" cy="220" r="45" fill="#81B29A" />
                        </svg>
                        <span className="font-accent font-bold text-lg text-espresso">
                            Pet<span className="text-terracotta">zara</span>
                        </span>
                    </Link>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="py-16 sm:py-20 bg-cream-warm border-b border-sand/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div {...fadeUp(0)}>
                            <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-5">
                                Blog Petzara
                            </span>
                            <h1 className="font-accent text-4xl sm:text-5xl font-extrabold text-espresso mb-4 leading-tight">
                                Guias para seu petshop crescer
                            </h1>
                            <p className="text-taupe text-lg max-w-2xl mx-auto leading-relaxed">
                                Conteúdo prático sobre agendamento, finanças, equipe e atendimento — para donos de petshop que querem sair do improviso.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter + Cards */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Category pills */}
                        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-10">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                                        activeCategory === cat
                                            ? 'bg-terracotta text-white border-terracotta shadow-sm'
                                            : 'bg-white text-taupe border-sand hover:border-terracotta/40 hover:text-espresso'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>

                        {/* Cards grid */}
                        <motion.div
                            key={activeCategory}
                            variants={staggerContainer(0.07)}
                            initial="initial"
                            animate="animate"
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filtered.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA discreto */}
                <section className="py-14 border-t border-sand/60">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={getCardViewport()}
                            transition={{ duration: 0.55 }}
                        >
                            <p className="text-taupe text-base mb-4">
                                Pronto para colocar em prática? Conheça o Petzara.
                            </p>
                            <a
                                href={appRegisterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-terracotta/20"
                            >
                                Teste grátis por 30 dias
                                <ArrowRight size={16} />
                            </a>
                            <p className="mt-2 text-taupe text-xs">Sem cartão de crédito · Cancele quando quiser</p>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-sand bg-cream-warm/80 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-taupe">
                    <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Petzara. Todos os direitos reservados.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link to="/" className="hover:text-terracotta transition-colors">Início</Link>
                        <Link to="/termos-de-uso" className="hover:text-terracotta transition-colors">Termos de Uso</Link>
                        <Link to="/politica-de-privacidade" className="hover:text-terracotta transition-colors">Política de Privacidade</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}
