import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { blogPosts, categoryColors } from '../data/blogPosts'
import { fadeUp, cardVariant, staggerContainer, getCardViewport } from '../animations/variants'
import { appRegisterUrl } from '../siteConfig'

function MarkdownLink({ href, children }) {
    const isMail = href?.startsWith('mailto:')
    if (href?.startsWith('/')) {
        return (
            <Link
                to={href}
                className="text-terracotta font-medium underline underline-offset-2 hover:text-terracotta-dark"
            >
                {children}
            </Link>
        )
    }
    return (
        <a
            href={href}
            className="text-terracotta font-medium underline underline-offset-2 hover:text-terracotta-dark"
            {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
            {children}
        </a>
    )
}

const mdComponents = {
    h1: ({ children }) => (
        <h1 className="font-accent text-3xl sm:text-4xl font-extrabold text-espresso mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-accent text-xl sm:text-2xl font-bold text-espresso mt-10 mb-4 scroll-mt-24 first:mt-0">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-accent text-lg font-bold text-espresso mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="font-accent text-base font-bold text-espresso mt-4 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
        <p className="text-taupe leading-relaxed mb-4 text-[15px] sm:text-base">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 space-y-2 text-taupe text-[15px] sm:text-base">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-taupe text-[15px] sm:text-base">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-espresso">{children}</strong>,
    hr: () => <hr className="my-8 border-sand" />,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-terracotta/40 pl-4 my-4 text-taupe italic">{children}</blockquote>
    ),
    a: MarkdownLink,
}

export default function BlogPostPage() {
    const { slug } = useParams()
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) return <Navigate to="/blog" replace />

    const colors = categoryColors[post.category] ?? categoryColors['Organização']

    const sameCat = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)
    const otherCat = blogPosts.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 3 - sameCat.length)
    const relatedPosts = [...sameCat, ...otherCat].slice(0, 3)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `${post.title} — Petzara`

        const desc = document.querySelector('meta[name="description"]')
        const ogTitle = document.querySelector('meta[property="og:title"]')
        const ogDesc = document.querySelector('meta[property="og:description"]')

        const prevDesc = desc?.getAttribute('content') ?? ''
        const prevOgTitle = ogTitle?.getAttribute('content') ?? ''
        const prevOgDesc = ogDesc?.getAttribute('content') ?? ''

        if (desc) desc.setAttribute('content', post.description)
        if (ogTitle) ogTitle.setAttribute('content', `${post.title} — Blog Petzara`)
        if (ogDesc) ogDesc.setAttribute('content', post.description)

        return () => {
            document.title = 'Petzara — Sistema de Gestão para Petshops | Agendamento Online'
            if (desc) desc.setAttribute('content', prevDesc)
            if (ogTitle) ogTitle.setAttribute('content', prevOgTitle)
            if (ogDesc) ogDesc.setAttribute('content', prevOgDesc)
        }
    }, [post])

    return (
        <div className="min-h-screen bg-cream text-espresso">

            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-sand/50 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-taupe hover:text-terracotta transition-colors"
                    >
                        <ArrowLeft size={18} aria-hidden="true" />
                        Voltar ao blog
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
                {/* Article hero */}
                <section className="py-10 sm:py-14 border-b border-sand/50 bg-cream-warm">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        <motion.div {...fadeUp(0)}>
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${colors.bg} ${colors.text} ${colors.border}`}>
                                {post.category}
                            </span>
                            <h1 className="font-accent text-3xl sm:text-4xl font-extrabold text-espresso mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-5 text-sm text-taupe">
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} aria-hidden="true" />
                                    {post.readingTime}
                                </span>
                                <span>
                                    {new Date(post.publishedAt + 'T12:00:00').toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Article body */}
                <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* CTA card */}
                <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.55 }}
                        className="bg-cream-warm rounded-2xl border border-sand p-7 text-center"
                    >
                        <p className="font-accent font-bold text-espresso text-lg mb-1">Conheça o Petzara</p>
                        <p className="text-taupe text-sm mb-5">
                            Sistema completo de agendamento e gestão para petshops. 30 dias grátis, sem cartão.
                        </p>
                        <a
                            href={appRegisterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-terracotta/20"
                        >
                            Testar grátis — sem cartão
                            <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </section>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <section className="border-t border-sand/50 bg-cream-warm py-12 sm:py-16">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6">
                            <h2 className="font-accent font-bold text-xl text-espresso mb-6">Outros artigos</h2>
                            <motion.div
                                variants={staggerContainer(0.08)}
                                initial="initial"
                                whileInView="animate"
                                viewport={getCardViewport()}
                                className="grid sm:grid-cols-2 gap-5"
                            >
                                {relatedPosts.map(related => {
                                    const rc = categoryColors[related.category] ?? categoryColors['Organização']
                                    return (
                                        <motion.article
                                            key={related.id}
                                            variants={cardVariant}
                                            className="bg-white rounded-2xl border border-sand/60 hover:border-terracotta/30 p-5 transition-all hover:shadow-md flex flex-col gap-3"
                                        >
                                            <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${rc.bg} ${rc.text}`}>
                                                {related.category}
                                            </span>
                                            <h3 className="font-accent font-bold text-base text-espresso leading-snug">
                                                {related.title}
                                            </h3>
                                            <Link
                                                to={`/blog/${related.slug}`}
                                                className="inline-flex items-center gap-1 text-terracotta font-semibold text-sm hover:gap-2 transition-all mt-auto"
                                            >
                                                Ler artigo <ArrowRight size={13} />
                                            </Link>
                                        </motion.article>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-sand bg-cream-warm/80 py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-taupe">
                    <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Petzara. Todos os direitos reservados.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link to="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
                        <Link to="/termos-de-uso" className="hover:text-terracotta transition-colors">Termos de Uso</Link>
                        <Link to="/politica-de-privacidade" className="hover:text-terracotta transition-colors">Política de Privacidade</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}
